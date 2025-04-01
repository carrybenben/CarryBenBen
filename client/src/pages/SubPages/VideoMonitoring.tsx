import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { ArrowLeft, AlertTriangle, Eye, ShieldCheck, Video, Info, Settings, CloudLightning } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import MockVideoMonitor from '@/components/demo/MockVideoMonitor';

export default function VideoMonitoring() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  
  const features = [
    {
      id: 1,
      icon: <Eye className="h-5 w-5"/>,
      titleEn: '24/7 HD Monitoring',
      titleCn: '全天候高清监控',
      descriptionEn: 'High resolution cameras with night vision capabilities ensure continuous monitoring regardless of time or weather conditions.',
      descriptionCn: '配备夜视功能的高分辨率摄像头，确保无论时间或天气条件如何，都能持续监控。',
    },
    {
      id: 2,
      icon: <AlertTriangle className="h-5 w-5"/>,
      titleEn: 'Anomaly Detection',
      titleCn: '异常检测',
      descriptionEn: 'AI-powered anomaly detection immediately identifies unauthorized access, equipment malfunctions, or safety hazards.',
      descriptionCn: '人工智能异常检测立即识别未授权访问、设备故障或安全隐患。',
    },
    {
      id: 3,
      icon: <ShieldCheck className="h-5 w-5"/>,
      titleEn: 'Security Integration',
      titleCn: '安全集成',
      descriptionEn: 'Seamlessly integrates with existing security systems and can trigger automated responses to security events.',
      descriptionCn: '与现有安全系统无缝集成，可以触发对安全事件的自动响应。',
    },
    {
      id: 4,
      icon: <Video className="h-5 w-5"/>,
      titleEn: 'Remote Access',
      titleCn: '远程访问',
      descriptionEn: 'Access live and recorded footage from anywhere via secure web portal or mobile application.',
      descriptionCn: '通过安全的网络门户或移动应用程序从任何地方访问实时和录制的画面。',
    },
    {
      id: 5,
      icon: <CloudLightning className="h-5 w-5"/>,
      titleEn: 'Weather Resistant',
      titleCn: '耐候性',
      descriptionEn: 'Specialized cameras designed to withstand harsh industrial environments, extreme temperatures, and coal dust.',
      descriptionCn: '专用摄像头设计用于承受恶劣的工业环境、极端温度和煤尘。',
    },
    {
      id: 6,
      icon: <Settings className="h-5 w-5"/>,
      titleEn: 'Customizable Alerts',
      titleCn: '可定制警报',
      descriptionEn: 'Set custom alert parameters based on your specific security and operational needs.',
      descriptionCn: '根据您的特定安全和运营需求设置自定义警报参数。',
    },
  ];

  const specs = [
    { labelEn: 'Camera Resolution', labelCn: '摄像头分辨率', valueEn: '4K Ultra HD (3840×2160)', valueCn: '4K超高清 (3840×2160)' },
    { labelEn: 'Frame Rate', labelCn: '帧率', valueEn: '30 FPS', valueCn: '30 帧/秒' },
    { labelEn: 'Night Vision Range', labelCn: '夜视范围', valueEn: 'Up to 100 meters', valueCn: '最远100米' },
    { labelEn: 'IP Rating', labelCn: 'IP防护等级', valueEn: 'IP66 (Dust-tight, Water Resistant)', valueCn: 'IP66（防尘防水）' },
    { labelEn: 'Operating Temperature', labelCn: '工作温度', valueEn: '-30°C to +60°C', valueCn: '-30°C 至 +60°C' },
    { labelEn: 'Storage Capacity', labelCn: '存储容量', valueEn: 'Up to 30 days of footage', valueCn: '最多30天的录像' },
    { labelEn: 'Detection Algorithms', labelCn: '检测算法', valueEn: 'Motion, Object, Facial, Activity', valueCn: '动作、物体、面部、活动' },
    { labelEn: 'Connectivity', labelCn: '连接方式', valueEn: 'Wired Ethernet, 4G/5G Cellular', valueCn: '有线以太网，4G/5G蜂窝网络' },
  ];

  return (
    <div className="container py-8 max-w-7xl">
      {/* Back link */}
      <Link href="/services/storage-monitoring">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {lang === 'cn' ? '返回煤仓监管服务' : 'Back to Coal Storage Monitoring'}
        </Button>
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Content section */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">
            {lang === 'cn' ? '智能视频监控系统' : 'Intelligent Video Monitoring System'}
          </h1>
          
          <div className="flex gap-2 mb-6">
            <Badge variant="outline" className="bg-primary/10">
              {lang === 'cn' ? '安全监控' : 'Security Monitoring'}
            </Badge>
            <Badge variant="outline" className="bg-primary/10">
              {lang === 'cn' ? '人工智能分析' : 'AI Analysis'}
            </Badge>
            <Badge variant="outline" className="bg-primary/10">
              {lang === 'cn' ? '全天候监测' : '24/7 Surveillance'}
            </Badge>
          </div>
          
          <p className="text-lg mb-6">
            {lang === 'cn' 
              ? '我们的智能视频监控系统为煤炭存储设施提供全面的可视化管理和安全保障。利用先进的人工智能技术，系统不仅能实时监控煤堆情况，还能识别潜在的安全风险和异常活动。'
              : 'Our Intelligent Video Monitoring System provides comprehensive visual management and security assurance for coal storage facilities. Leveraging advanced AI technology, the system not only monitors coal piles in real-time but also identifies potential safety risks and abnormal activities.'}
          </p>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {lang === 'cn' ? '主要功能' : 'Key Features'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature) => (
                <Card key={feature.id} className="border-gray-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="p-2 rounded-md bg-primary/10 text-primary mr-4">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">
                          {lang === 'cn' ? feature.titleCn : feature.titleEn}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {lang === 'cn' ? feature.descriptionCn : feature.descriptionEn}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {lang === 'cn' ? '技术参数' : 'Technical Specifications'}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specs.map((spec, index) => (
                <div key={index} className="flex justify-between p-3 rounded-lg border border-gray-200">
                  <span className="text-gray-600">{lang === 'cn' ? spec.labelCn : spec.labelEn}</span>
                  <span className="font-medium">{lang === 'cn' ? spec.valueCn : spec.valueEn}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Card className="mb-8">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <Info className="h-5 w-5 mr-2 text-amber-500" />
                {lang === 'cn' ? '重要安全信息' : 'Important Safety Information'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {lang === 'cn' 
                  ? '我们的视频监控系统满足所有相关的安全标准和法规。所有录制的视频内容均进行加密存储，并设有严格的访问控制措施，以确保数据安全和隐私保护。请确保系统的安装和使用符合当地的法律法规要求。'
                  : 'Our video monitoring system complies with all relevant safety standards and regulations. All recorded video content is encrypted in storage and subject to strict access control measures to ensure data security and privacy protection. Please ensure that the installation and use of the system comply with local legal and regulatory requirements.'}
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Demo preview section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>
                {lang === 'cn' ? '系统演示' : 'System Demo'}
              </CardTitle>
              <CardDescription>
                {lang === 'cn' ? '视频监控系统样例展示' : 'Video monitoring system sample display'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="standard">
                <TabsList className="mb-4">
                  <TabsTrigger value="standard">
                    {lang === 'cn' ? '标准视图' : 'Standard View'}
                  </TabsTrigger>
                  <TabsTrigger value="alert">
                    {lang === 'cn' ? '警报模式' : 'Alert Mode'}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="standard">
                  <MockVideoMonitor 
                    title={lang === 'cn' ? '煤场监控中心' : 'Coal Yard Monitoring Center'} 
                    alertMode={false}
                  />
                  <p className="text-sm text-gray-500 mt-4">
                    {lang === 'cn' 
                      ? '标准监控模式提供清晰的煤场实时画面，便于日常监控和管理。'
                      : 'Standard monitoring mode provides clear real-time footage of the coal yard for routine monitoring and management.'}
                  </p>
                </TabsContent>
                
                <TabsContent value="alert">
                  <MockVideoMonitor 
                    title={lang === 'cn' ? '煤场监控中心' : 'Coal Yard Monitoring Center'} 
                    alertMode={true}
                  />
                  <p className="text-sm text-gray-500 mt-4">
                    {lang === 'cn' 
                      ? '警报模式在检测到异常活动时自动触发，即时通知操作人员关注潜在问题。'
                      : 'Alert mode is automatically triggered when abnormal activity is detected, instantly notifying operators of potential issues.'}
                  </p>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 border-t pt-6">
                <h3 className="font-medium mb-3">
                  {lang === 'cn' ? '兼容系统' : 'Compatible Systems'}
                </h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex justify-between">
                    <span>{lang === 'cn' ? '控制中心软件' : 'Control Center Software'}</span>
                    <span className="font-medium">v5.2+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{lang === 'cn' ? '移动应用' : 'Mobile App'}</span>
                    <span className="font-medium">iOS 12+, Android 10+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{lang === 'cn' ? 'API集成' : 'API Integration'}</span>
                    <span className="font-medium">REST, RTSP</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Call to action */}
      <div className="bg-gradient rounded-xl p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            {lang === 'cn' ? '准备升级您的煤场监控系统？' : 'Ready to upgrade your coal yard monitoring system?'}
          </h2>
          <p className="mb-6">
            {lang === 'cn' 
              ? '联系我们了解更多关于智能视频监控系统的信息，并获取适合您特定需求的定制解决方案。'
              : 'Contact us to learn more about our Intelligent Video Monitoring System and get a customized solution tailored to your specific needs.'}
          </p>
          <Link href="/consultation">
            <Button variant="outline" className="bg-white text-primary hover:bg-gray-100">
              {lang === 'cn' ? '预约咨询' : 'Schedule a Consultation'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}