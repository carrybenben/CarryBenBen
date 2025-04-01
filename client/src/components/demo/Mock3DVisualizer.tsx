import { useState, useEffect } from 'react';
import { Camera, RotateCw, Boxes, Layers, ZoomIn, ZoomOut, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { useTranslation } from 'react-i18next';

interface Mock3DVisualizerProps {
  title?: string;
  mode?: 'default' | 'thermal' | 'wireframe';
  showControls?: boolean;
  showStats?: boolean;
  className?: string;
}

export default function Mock3DVisualizer({
  title,
  mode = 'default',
  showControls = true,
  showStats = true,
  className = ''
}: Mock3DVisualizerProps) {
  const { t, i18n } = useTranslation();
  const [currentMode, setCurrentMode] = useState<'default' | 'thermal' | 'wireframe'>(mode);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(50);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStats, setCurrentStats] = useState({
    volume: Math.floor(Math.random() * 10000) + 5000,
    height: Math.floor(Math.random() * 10) + 5,
    density: (Math.random() * 0.5 + 0.8).toFixed(2)
  });

  // Simulate rotation animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAnimating) {
      interval = setInterval(() => {
        setRotation(prev => (prev + 1) % 360);
      }, 50);
    }
    
    return () => clearInterval(interval);
  }, [isAnimating]);

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  const handleModeChange = (newMode: string) => {
    setCurrentMode(newMode as 'default' | 'thermal' | 'wireframe');
  };

  const getModelImage = () => {
    // Return different images based on selected mode
    switch (currentMode) {
      case 'default':
        return "https://images.unsplash.com/photo-1559028006-448665bd7c7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80";
      case 'thermal':
        return "https://cdn.pixabay.com/photo/2016/08/26/05/30/thermal-image-1621562_1280.jpg";
      case 'wireframe':
        return "https://cdn.pixabay.com/photo/2018/06/06/18/10/mesh-3458897_1280.jpg";
      default:
        return "https://images.unsplash.com/photo-1559028006-448665bd7c7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80";
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(i18n.language === 'cn' ? 'zh-CN' : 'en-US').format(num);
  };

  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

  return (
    <div className={`border rounded-lg overflow-hidden bg-gray-900 text-white ${className}`}>
      {/* 3D visualization title bar */}
      <div className="flex justify-between items-center p-2 bg-gray-800">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm font-medium">
            {title || (i18n.language === 'cn' ? '煤堆3D可视化' : '3D Coal Pile Visualization')}
          </span>
        </div>
        <div className="text-xs text-gray-400">{formattedDate}</div>
      </div>
      
      {/* 3D visualization display */}
      <div className="relative">
        <img 
          src={getModelImage()} 
          alt="3D model" 
          className="w-full h-64 object-cover"
          style={{ 
            transform: `rotate(${rotation}deg) scale(${zoom / 50})`,
            transformOrigin: 'center center',
            transition: 'transform 0.1s ease-out'
          }}
        />
        
        {/* Overlay model info */}
        <div className="absolute top-2 left-2 text-xs bg-black/50 px-2 py-1 rounded">
          {i18n.language === 'cn' ? '模型分辨率：高' : 'Model Resolution: High'} 
          • {i18n.language === 'cn' ? '上次扫描：2小时前' : 'Last Scan: 2hrs ago'}
        </div>
        
        {/* Stats overlay */}
        {showStats && (
          <div className="absolute bottom-2 right-2 text-xs bg-black/70 px-3 py-2 rounded grid grid-cols-2 gap-x-4 gap-y-1">
            <span className="text-gray-400">{i18n.language === 'cn' ? '体积:' : 'Volume:'}</span>
            <span className="font-medium">{formatNumber(currentStats.volume)} m³</span>
            <span className="text-gray-400">{i18n.language === 'cn' ? '最大高度:' : 'Max Height:'}</span>
            <span className="font-medium">{currentStats.height} m</span>
            <span className="text-gray-400">{i18n.language === 'cn' ? '密度:' : 'Density:'}</span>
            <span className="font-medium">{currentStats.density} t/m³</span>
            <span className="text-gray-400">{i18n.language === 'cn' ? '估计重量:' : 'Est. Weight:'}</span>
            <span className="font-medium text-yellow-300">
              {formatNumber(Math.round(currentStats.volume * parseFloat(currentStats.density)))} t
            </span>
          </div>
        )}
      </div>
      
      {/* Controls */}
      {showControls && (
        <div className="p-2 bg-gray-800">
          {/* Mode selection */}
          <div className="mb-2">
            <Tabs value={currentMode} onValueChange={handleModeChange} className="w-full">
              <TabsList className="grid grid-cols-3 h-8">
                <TabsTrigger value="default" className="text-xs flex items-center">
                  <Boxes className="h-3 w-3 mr-1" />
                  {i18n.language === 'cn' ? '标准' : 'Standard'}
                </TabsTrigger>
                <TabsTrigger value="thermal" className="text-xs flex items-center">
                  <Camera className="h-3 w-3 mr-1" />
                  {i18n.language === 'cn' ? '热成像' : 'Thermal'}
                </TabsTrigger>
                <TabsTrigger value="wireframe" className="text-xs flex items-center">
                  <Layers className="h-3 w-3 mr-1" />
                  {i18n.language === 'cn' ? '框架' : 'Wireframe'}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Rotation and zoom controls */}
          <div className="flex items-center space-x-2 mb-2">
            <Button 
              variant={isAnimating ? "default" : "ghost"} 
              size="icon" 
              className="h-7 w-7" 
              onClick={toggleAnimation}
            >
              <RotateCw className="h-4 w-4" />
            </Button>
            <div className="flex-grow">
              <Slider 
                value={[rotation]} 
                max={360} 
                step={1} 
                onValueChange={(value) => setRotation(value[0])}
              />
            </div>
            <span className="text-xs w-10 text-right">{rotation}°</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setZoom(Math.max(10, zoom - 10))}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <div className="flex-grow">
              <Slider 
                value={[zoom]} 
                min={10} 
                max={100} 
                step={1} 
                onValueChange={(value) => setZoom(value[0])}
              />
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setZoom(Math.min(100, zoom + 10))}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Export button */}
          <div className="mt-2 flex justify-end">
            <Button variant="outline" size="sm" className="text-xs h-7">
              <Download className="h-3 w-3 mr-1" />
              {i18n.language === 'cn' ? '导出数据' : 'Export Data'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}