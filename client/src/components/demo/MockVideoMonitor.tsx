import { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, AlertCircle, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';

interface MockVideoMonitorProps {
  title?: string;
  showControls?: boolean;
  alertMode?: boolean;
  className?: string;
}

export default function MockVideoMonitor({ 
  title, 
  showControls = true, 
  alertMode = false,
  className = ""
}: MockVideoMonitorProps) {
  const { i18n } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [isAlertActive, setIsAlertActive] = useState(alertMode);
  const [selectedCamera, setSelectedCamera] = useState('camera1');

  // Simulate video playback
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => (prev + 1) % 100);
        
        // Randomly trigger alert if in alert mode (10% chance every 5 seconds)
        if (alertMode && Math.random() < 0.002) {
          setIsAlertActive(true);
          setTimeout(() => setIsAlertActive(false), 5000);
        }
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, alertMode]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleCameraChange = (camera: string) => {
    setSelectedCamera(camera);
  };

  const getVideoFeed = () => {
    // Return different placeholder images based on selected camera
    switch (selectedCamera) {
      case 'camera1':
        return "https://images.unsplash.com/photo-1581093804661-b0441856ade7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80";
      case 'camera2':
        return "https://images.unsplash.com/photo-1581093805715-ca345c0e1ba5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80";
      case 'camera3':
        return "https://images.unsplash.com/photo-1581093804475-577d72e35330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80";
      case 'camera4':
        return "https://images.unsplash.com/photo-1581094378626-aa9fa6f24c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80";
      default:
        return "https://images.unsplash.com/photo-1581093804661-b0441856ade7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80";
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

  return (
    <div className={`border rounded-lg overflow-hidden bg-gray-900 text-white ${className}`}>
      {/* Video title bar */}
      <div className="flex justify-between items-center p-2 bg-gray-800">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <span className="text-sm font-medium">
            {title || (i18n.language === 'cn' ? '煤场监控摄像头 ' : 'Coal Yard Camera ') + selectedCamera.replace('camera', '')}
          </span>
        </div>
        <div className="text-xs text-gray-400">{formattedDate}</div>
      </div>
      
      {/* Video feed */}
      <div className="relative">
        <img 
          src={getVideoFeed()} 
          alt="Video feed" 
          className={`w-full h-64 object-cover ${isPlaying ? '' : 'opacity-90'}`}
        />
        
        {/* Overlay camera information */}
        <div className="absolute top-2 left-2 text-xs bg-black/50 px-2 py-1 rounded">
          {i18n.language === 'cn' ? '实时监控' : 'LIVE'} • {selectedCamera.replace('camera', i18n.language === 'cn' ? '摄像头 ' : 'CAM ')}
        </div>
        
        {/* Timestamp overlay */}
        <div className="absolute bottom-2 left-2 text-xs bg-black/50 px-2 py-1 rounded">
          {formatTime(Math.floor(Date.now() / 1000))}
        </div>
        
        {/* Alert overlay */}
        {isAlertActive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-red-500/70 p-4 rounded-md flex items-center animate-pulse">
              <AlertCircle className="mr-2 h-6 w-6" />
              <span className="font-bold">{i18n.language === 'cn' ? '检测到异常活动' : 'Anomalous Activity Detected'}</span>
            </div>
          </div>
        )}
        
        {/* Pause overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="bg-black/50 p-3 rounded-full">
              <Play className="h-8 w-8" />
            </div>
          </div>
        )}
      </div>
      
      {/* Controls */}
      {showControls && (
        <div className="p-2 bg-gray-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={() => setCurrentTime(prev => Math.max(0, prev - 10))}>
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={togglePlayPause}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setCurrentTime(prev => Math.min(100, prev + 10))}>
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-xs">
              {i18n.language === 'cn' ? '画质：1080p' : 'Quality: 1080p'}
            </div>
            <Button variant="ghost" size="icon">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs">{formatTime(currentTime)}</span>
            <Slider 
              value={[currentTime]} 
              max={100} 
              step={1} 
              className="flex-grow" 
              onValueChange={(value) => setCurrentTime(value[0])}
            />
            <span className="text-xs">-{formatTime(100 - currentTime)}</span>
          </div>
        </div>
      )}
      
      {/* Camera selection */}
      <div className="p-2 bg-gray-800 border-t border-gray-700">
        <Tabs defaultValue="camera1" value={selectedCamera} onValueChange={handleCameraChange}>
          <TabsList className="grid grid-cols-4 h-8">
            <TabsTrigger value="camera1" className="text-xs">
              {i18n.language === 'cn' ? '摄像头 1' : 'Camera 1'}
            </TabsTrigger>
            <TabsTrigger value="camera2" className="text-xs">
              {i18n.language === 'cn' ? '摄像头 2' : 'Camera 2'}
            </TabsTrigger>
            <TabsTrigger value="camera3" className="text-xs">
              {i18n.language === 'cn' ? '摄像头 3' : 'Camera 3'}
            </TabsTrigger>
            <TabsTrigger value="camera4" className="text-xs">
              {i18n.language === 'cn' ? '摄像头 4' : 'Camera 4'}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}