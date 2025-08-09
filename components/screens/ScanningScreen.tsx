import React, { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Conditional imports based on platform
let Camera: any = null;
let useCameraDevices: any = null;
let useFrameProcessor: any = null;
let runOnJS: any = null;

if (Platform.OS !== 'web') {
  try {
    const VisionCamera = require('react-native-vision-camera');
    const Reanimated = require('react-native-reanimated');
    
    Camera = VisionCamera.Camera;
    useCameraDevices = VisionCamera.useCameraDevices;
    useFrameProcessor = VisionCamera.useFrameProcessor;
    runOnJS = Reanimated.runOnJS;
  } catch (error) {
    console.warn('VisionCamera not available:', error);
  }
}

interface ScanningScreenProps {
  scanProgress: number;
  isScanning: boolean;
  merchantName: string | number;
  paymentAmount: string | number;
  onCancelPress: () => void;
  onFaceDetected?: (faceData: any) => void;
  onScanComplete?: (biometricData: any) => void;
}

const { width: screenWidth } = Dimensions.get('window');

// Web Camera Component (fallback for web platform)
const WebCamera: React.FC<{ onFaceDetected: (faces: any[]) => void; isScanning: boolean }> = ({ 
  onFaceDetected, 
  isScanning 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (Platform.OS === 'web') {
      startWebCamera();
    }
    return () => {
      stopWebCamera();
    };
  }, []);

  useEffect(() => {
    if (isScanning && Platform.OS === 'web') {
      // Simulate face detection for web
      const interval = setInterval(() => {
        const mockFace = {
          bounds: { x: 144, y: 160, width: 100, height: 120 },
          confidence: 0.95
        };
        onFaceDetected([mockFace]);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isScanning, onFaceDetected]);

  const startWebCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      Alert.alert('Camera Error', 'Unable to access camera on web');
    }
  };

  const stopWebCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 32, overflow: 'hidden' }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          borderRadius: 32,
          transform: 'scaleX(-1)' // Mirror effect like front camera
        }}
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

const ScanningScreen: React.FC<ScanningScreenProps> = ({
  scanProgress,
  isScanning,
  merchantName,
  paymentAmount,
  onCancelPress,
  onFaceDetected,
  onScanComplete
}) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [facePosition, setFacePosition] = useState<{ x: number; y: number } | null>(null);
  const cameraRef = useRef<any>(null);

  // Get camera device (only for mobile)
  const device = Platform.OS !== 'web' && useCameraDevices ? 
    useCameraDevices().find((d: any) => d.position === 'front') : null;

  // Request camera permissions
  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'web') {
        // For web, check if getUserMedia is available
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          setHasPermission(true);
        } else {
          setHasPermission(false);
        }
        return;
      }

      // For mobile platforms
      if (Camera) {
        const cameraPermission = await Camera.requestCameraPermission() as 'authorized' | 'denied';
        setHasPermission(cameraPermission === 'authorized');
      } else {
        setHasPermission(false);
      }
    };
    
    requestPermissions();
  }, []);

  // Face detection callback
  const handleFaceDetected = (faces: any[]) => {
    if (faces && faces.length > 0) {
      const face = faces[0];
      setFaceDetected(true);
      setFacePosition({
        x: face.bounds.x,
        y: face.bounds.y
      });
      
      // Callback to parent component
      onFaceDetected?.(face);
      
      // If scanning progress is complete, trigger biometric capture
      if (scanProgress >= 100 && isScanning) {
        captureBiometricData(face);
      }
    } else {
      setFaceDetected(false);
      setFacePosition(null);
    }
  };

  // Frame processor for face detection (mobile only)
  const frameProcessor = useFrameProcessor && runOnJS ? useFrameProcessor((frame: any) => {
    'worklet';
    
    // Basic face detection logic
    const mockFaceDetection = () => {
      const simulatedFaces = isScanning ? [{
        bounds: { x: 144, y: 160, width: 100, height: 120 },
        confidence: 0.95
      }] : [];
      
      runOnJS(handleFaceDetected)(simulatedFaces);
    };
    
    mockFaceDetection();
  }, [isScanning, scanProgress]) : null;

  // Capture biometric data when scan is complete
  const captureBiometricData = async (faceData: any) => {
    try {
      let biometricData: any = {
        faceData: faceData,
        timestamp: new Date().toISOString(),
        quality: faceData.confidence || 0.95
      };

      if (Platform.OS === 'web') {
        // For web, we could capture from video element
        biometricData.imagePath = 'web-capture-simulated';
        biometricData.platform = 'web';
      } else if (cameraRef.current && Camera) {
        // For mobile, take actual photo
        const photo = await cameraRef.current.takePhoto({
          flash: 'off',
        });
        
        biometricData.imagePath = photo.path;
        biometricData.platform = Platform.OS;
      }
      
      onScanComplete?.(biometricData);
    } catch (error) {
      console.error('Error capturing biometric data:', error);
      Alert.alert('Error', 'Failed to capture biometric data');
    }
  };

  // Handle permission states
  if (hasPermission === null) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.permissionText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.permissionText}>Camera permission denied</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={onCancelPress}>
          <Text style={styles.permissionButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (Platform.OS !== 'web' && !device) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.permissionText}>No front camera available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancelPress} style={styles.backButton}>
          <View style={styles.backArrow} />
        </TouchableOpacity>
        <Text style={styles.title}>Face Scan {Platform.OS === 'web' ? '(Web Demo)' : ''}</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.cameraView}>
        <View style={styles.faceFrame}>
          {/* Conditional Camera Component */}
          {Platform.OS === 'web' ? (
            <WebCamera 
              onFaceDetected={handleFaceDetected}
              isScanning={isScanning}
            />
          ) : Camera && device ? (
            <Camera
              ref={cameraRef}
              style={styles.camera}
              device={device}
              isActive={true}
              frameProcessor={frameProcessor}
              photo={true}
              enableZoomGesture={false}
            />
          ) : (
            <View style={[styles.camera, styles.centerContent]}>
              <Text style={styles.permissionText}>Camera not available</Text>
            </View>
          )}

          {/* Corner markers */}
          <View style={[styles.cornerMarker, styles.topLeft]} />
          <View style={[styles.cornerMarker, styles.topRight]} />
          <View style={[styles.cornerMarker, styles.bottomLeft]} />
          <View style={[styles.cornerMarker, styles.bottomRight]} />

          {/* Scanning Line */}
          {isScanning && (
            <View style={[styles.scanningLine, { top: (scanProgress / 100) * 280 }]} />
          )}

          {/* Face Detection Indicator */}
          {faceDetected && (
            <View style={styles.faceDetectionIndicator}>
              <View style={styles.faceDetectionCircle} />
            </View>
          )}

          {/* Face Detection Guide Overlay */}
          {!faceDetected && (
            <View style={styles.faceGuideOverlay}>
              <View style={styles.faceGuideCircle}>
                <Text style={styles.faceGuideText}>👤</Text>
              </View>
            </View>
          )}
        </View>
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionsTitle}>
          {!faceDetected
            ? 'Position your face in the frame'
            : scanProgress < 50
            ? 'Face detected - Hold still'
            : scanProgress < 100
            ? 'Scanning...'
            : 'Scan complete!'
          }
        </Text>
        <Text style={styles.instructionsSubtitle}>
          {!faceDetected
            ? 'Look directly at the camera'
            : scanProgress < 100
            ? `${scanProgress}% complete`
            : 'Verifying identity...'
          }
        </Text>

        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${scanProgress}%` }]} />
        </View>

        {/* Biometric Status Indicators */}
        <View style={styles.statusIndicators}>
          <View style={styles.statusItem}>
            <View style={[styles.statusDot, { backgroundColor: faceDetected ? '#10b981' : '#6b7280' }]} />
            <Text style={styles.statusText}>Face Detected</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusDot, { backgroundColor: scanProgress > 50 ? '#10b981' : '#6b7280' }]} />
            <Text style={styles.statusText}>Quality Check</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusDot, { backgroundColor: scanProgress >= 100 ? '#10b981' : '#6b7280' }]} />
            <Text style={styles.statusText}>Biometric Match</Text>
          </View>
        </View>
      </View>

      <View style={styles.paymentInfo}>
        <Text style={styles.paymentInfoText}>Paying to {merchantName}</Text>
        <Text style={styles.paymentInfoAmount}>${paymentAmount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  backArrow: {
    width: 12,
    height: 12,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'white',
    transform: [{ rotate: '45deg' }],
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  cameraView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceFrame: {
    width: 288,
    height: 320,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.6)',
    position: 'relative',
    overflow: 'hidden',
  },
  camera: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
  },
  cornerMarker: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: '#818cf8',
    zIndex: 10,
  },
  topLeft: {
    top: 16,
    left: 16,
    borderLeftWidth: 4,
    borderTopWidth: 4,
    borderTopLeftRadius: 12,
  },
  topRight: {
    top: 16,
    right: 16,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderTopRightRadius: 12,
  },
  bottomLeft: {
    bottom: 16,
    left: 16,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderBottomLeftRadius: 12,
  },
  bottomRight: {
    bottom: 16,
    right: 16,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderBottomRightRadius: 12,
  },
  scanningLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#818cf8',
    opacity: 0.8,
    zIndex: 10,
    shadowColor: '#818cf8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  faceDetectionIndicator: {
    position: 'absolute',
    inset: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  faceDetectionCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#10b981',
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  faceGuideOverlay: {
    position: 'absolute',
    inset: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  faceGuideCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  faceGuideText: {
    fontSize: 48,
    opacity: 0.8,
  },
  instructions: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },
  instructionsTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  instructionsSubtitle: {
    color: '#d1d5db',
    textAlign: 'center',
    marginBottom: 12,
  },
  progressBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    marginBottom: 16,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  statusIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 8,
  },
  statusItem: {
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  statusText: {
    color: '#9ca3af',
    fontSize: 12,
    textAlign: 'center',
  },
  paymentInfo: {
    backgroundColor: '#1f2937',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentInfoText: {
    color: '#9ca3af',
  },
  paymentInfoAmount: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
  },
  permissionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default ScanningScreen;