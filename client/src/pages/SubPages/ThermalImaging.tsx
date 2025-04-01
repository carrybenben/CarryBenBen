import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { ArrowLeft, Thermometer, Flame, Cpu, BellRing, BarChart3, Zap, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Mock3DVisualizer from '@/components/demo/Mock3DVisualizer';

export default function ThermalImaging() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  
  const features = [
    {
      id: 1,
      icon: <Thermometer className="h-5 w-5"/>,
      titleEn: 'Temperature Monitoring',
      titleCn: '温度监测',
      descriptionEn: 'Continuous monitoring of coal pile surface temperatures with precision of ±0.5°C for early detection of hotspots.',
      descriptionCn: '持续监测煤堆表面温度，精度为±0.5°C，可及早发现热点。',
    },
    {
      id: 2,
      icon: <Flame className="h-5 w-5"/>,
      titleEn: 'Spontaneous Combustion Prevention',
      titleCn: '自燃预防',
      descriptionEn: 'Early warning system detects temperature anomalies before they develop into dangerous combustion conditions.',
      descriptionCn: '预警系统在温度异常发展为危险的燃烧条件之前检测到它们。',
    },
    {
      id: 3,
      icon: <Cpu className="h-5 w-5"/>,
      titleEn: 'AI-Powered Analysis',
      titleCn: '人工智能分析',
      descriptionEn: 'Advanced algorithms analyze thermal patterns to distinguish between normal temperature variations and potential hazards.',
      descriptionCn: '先进算法分析热模式，区分正常温度变化和潜在危险。',
    },
    {
      id: 4,
      icon: <BellRing className="h-5 w-5"/>,
      titleEn: 'Multi-Level Alerts',
      titleCn: '多级警报',
      descriptionEn: 'Customizable alert thresholds with escalating notification protocols based on temperature severity levels.',
      descriptionCn: '可定制的警报阈值，基于温度严重程度级别的升级通知协议。',
    },
    {
      id: 5,
      icon: <BarChart3 className="h-5 w-5"/>,
      titleEn: 'Historical Data Analysis',
      titleCn: '历史数据分析',
      descriptionEn: 'Track temperature trends over time to identify patterns and optimize storage conditions for different coal types.',
      descriptionCn: '跟踪随时间变化的温度趋势，识别模式并优化不同煤种的存储条件。',
    },
    {
      id: 6,
      icon: <Zap className="h-5 w-5"/>,
      titleEn: 'Low-Light Effectiveness',
      titleCn: '低光效能',
      descriptionEn: 'Thermal imaging functions equally well day or night, unaffected by lighting conditions or weather.',
      descriptionCn: '热成像在白天或夜间同样有效，不受照明条件或天气影响。',
    },
  ];

  const specs = [
    { labelEn: 'Temperature Range', labelCn: '温度范围', valueEn: '-20°C to +600°C', valueCn: '-20°C 至 +600°C' },
    { labelEn: 'Thermal Sensitivity', labelCn: '热灵敏度', valueEn: '<0.05°C at 30°C', valueCn: '<0.05°C（30°C时）' },
    { labelEn: 'Detector Resolution', labelCn: '探测器分辨率', valueEn: '640 × 480 pixels', valueCn: '640 × 480 像素' },
    { labelEn: 'Field of View', labelCn: '视场角', valueEn: '45° × 34°', valueCn: '45° × 34°' },
    { labelEn: 'Image Refresh Rate', labelCn: '图像刷新率', valueEn: '30 Hz', valueCn: '30 赫兹' },
    { labelEn: 'Early Warning Time', labelCn: '预警时间', valueEn: 'Up to 24 hours before combustion', valueCn: '燃烧前最长24小时' },
    { labelEn: 'IP Rating', labelCn: 'IP防护等级', valueEn: 'IP67 (Dustproof, Waterproof)', valueCn: 'IP67（防尘防水）' },
    { labelEn: 'Operating Environment', labelCn: '操作环境', valueEn: '-40°C to +60°C, 0-100% humidity', valueCn: '-40°C 至 +60°C，0-100%湿度' },
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
            {lang === 'cn' ? '热成像与温度感应系统' : 'Thermal Imaging & Temperature Sensing System'}
          </h1>
          
          <div className="flex gap-2 mb-6">
            <Badge variant="outline" className="bg-primary/10">
              {lang === 'cn' ? '热点检测' : 'Hotspot Detection'}
            </Badge>
            <Badge variant="outline" className="bg-primary/10">
              {lang === 'cn' ? '自燃预防' : 'Combustion Prevention'}
            </Badge>
            <Badge variant="outline" className="bg-primary/10">
              {lang === 'cn' ? '安全管理' : 'Safety Management'}
            </Badge>
          </div>
          
          <p className="text-lg mb-6">
            {lang === 'cn' 
              ? '我们的热成像与温度感应系统采用高精度红外传感技术，为煤炭存储设施提供全面的温度监测解决方案。通过实时监测煤堆表面和内部温度变化，系统能够及早发现潜在的自燃风险，确保存储安全。'
              : 'Our Thermal Imaging and Temperature Sensing System uses high-precision infrared sensing technology to provide a comprehensive temperature monitoring solution for coal storage facilities. By monitoring surface and internal temperature changes in real-time, the system can identify potential spontaneous combustion risks early, ensuring storage safety.'}
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
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {lang === 'cn' ? '温度风险级别指示' : 'Temperature Risk Level Indicators'}
            </h2>
            
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{lang === 'cn' ? '正常' : 'Normal'}</span>
                    <span className="text-sm text-gray-500">&lt; 40°C</span>
                  </div>
                  <Progress value={25} className="h-2 bg-gray-100" />
                  <p className="text-xs text-gray-500 mt-2">
                    {lang === 'cn' 
                      ? '煤堆处于正常温度范围内，无需特别关注。'
                      : 'Coal pile is within normal temperature range, no special attention required.'}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{lang === 'cn' ? '注意' : 'Attention'}</span>
                    <span className="text-sm text-gray-500">40°C - 60°C</span>
                  </div>
                  <Progress value={50} className="h-2 bg-gray-100" />
                  <p className="text-xs text-gray-500 mt-2">
                    {lang === 'cn' 
                      ? '温度略高，建议增加监控频率，检查通风状况。'
                      : 'Slightly elevated temperature, increased monitoring frequency recommended, check ventilation.'}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{lang === 'cn' ? '警告' : 'Warning'}</span>
                    <span className="text-sm text-gray-500">60°C - 80°C</span>
                  </div>
                  <Progress value={75} className="h-2 bg-gray-100" />
                  <p className="text-xs text-gray-500 mt-2">
                    {lang === 'cn' 
                      ? '温度显著升高，可能存在自燃风险。应立即进行主动冷却措施，准备应急预案。'
                      : 'Significantly elevated temperature, spontaneous combustion risk possible. Immediate active cooling measures should be taken, prepare emergency plans.'}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{lang === 'cn' ? '危险' : 'Danger'}</span>
                    <span className="text-sm text-gray-500">&gt; 80°C</span>
                  </div>
                  <Progress value={100} className="h-2 bg-gray-100" />
                  <p className="text-xs text-gray-500 mt-2">
                    {lang === 'cn' 
                      ? '高度危险状态，自燃风险极高。应启动紧急处理流程，可能需要隔离和专业处理。'
                      : 'Highly dangerous state, extreme spontaneous combustion risk. Emergency procedures should be initiated, isolation and professional handling may be required.'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Card className="mb-8">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <Info className="h-5 w-5 mr-2 text-amber-500" />
                {lang === 'cn' ? '煤炭自燃风险管理' : 'Coal Spontaneous Combustion Risk Management'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                {lang === 'cn' 
                  ? '煤炭自燃是煤炭储存过程中的主要安全隐患之一。当煤炭接触氧气并产生热量积累时，如果散热不足，温度会逐渐升高，最终导致自燃。我们的热成像系统能够在问题发展为严重火灾前检测到温度异常。'
                  : 'Coal spontaneous combustion is one of the main safety hazards in coal storage. When coal comes into contact with oxygen and generates accumulated heat, if heat dissipation is insufficient, the temperature gradually rises, eventually leading to spontaneous combustion. Our thermal imaging system can detect temperature anomalies before the problem develops into a serious fire.'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2 text-sm">
                    {lang === 'cn' ? '预防措施' : 'Preventive Measures'}
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>{lang === 'cn' ? '确保适当的通风' : 'Ensure proper ventilation'}</li>
                    <li>{lang === 'cn' ? '避免煤堆过高' : 'Avoid excessive pile heights'}</li>
                    <li>{lang === 'cn' ? '定期压实煤堆' : 'Regularly compact coal piles'}</li>
                    <li>{lang === 'cn' ? '考虑"先入先出"原则' : 'Consider "first-in, first-out" principle'}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-sm">
                    {lang === 'cn' ? '应对措施' : 'Response Measures'}
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>{lang === 'cn' ? '隔离热点区域' : 'Isolate hotspot areas'}</li>
                    <li>{lang === 'cn' ? '应用水雾冷却' : 'Apply water mist cooling'}</li>
                    <li>{lang === 'cn' ? '加速使用热点区域的煤炭' : 'Accelerate the use of coal in hotspot areas'}</li>
                    <li>{lang === 'cn' ? '在极端情况下移除受影响的煤炭' : 'Remove affected coal in extreme cases'}</li>
                  </ul>
                </div>
              </div>
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
                {lang === 'cn' ? '热成像系统样例展示' : 'Thermal imaging system sample display'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="thermal">
                <TabsList className="mb-4">
                  <TabsTrigger value="standard">
                    {lang === 'cn' ? '标准视图' : 'Standard View'}
                  </TabsTrigger>
                  <TabsTrigger value="thermal">
                    {lang === 'cn' ? '热成像视图' : 'Thermal View'}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="standard">
                  <Mock3DVisualizer 
                    title={lang === 'cn' ? '煤堆监测 - 标准视图' : 'Coal Pile Monitoring - Standard View'} 
                    mode="default"
                  />
                  <p className="text-sm text-gray-500 mt-4">
                    {lang === 'cn' 
                      ? '标准可视化视图显示煤堆的物理形状和表面细节。'
                      : 'Standard visualization view shows the physical shape and surface details of the coal pile.'}
                  </p>
                </TabsContent>
                
                <TabsContent value="thermal">
                  <Mock3DVisualizer 
                    title={lang === 'cn' ? '煤堆监测 - 热成像视图' : 'Coal Pile Monitoring - Thermal View'} 
                    mode="thermal"
                  />
                  <p className="text-sm text-gray-500 mt-4">
                    {lang === 'cn' 
                      ? '热成像视图显示煤堆的温度分布，帮助快速识别热点区域。'
                      : 'Thermal view shows temperature distribution of the coal pile, helping to quickly identify hotspot areas.'}
                  </p>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 border-t pt-6">
                <h3 className="font-medium mb-3">
                  {lang === 'cn' ? '系统适用性' : 'System Applicability'}
                </h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex justify-between">
                    <span>{lang === 'cn' ? '煤种兼容性' : 'Coal Type Compatibility'}</span>
                    <span className="font-medium">{lang === 'cn' ? '所有类型' : 'All Types'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{lang === 'cn' ? '最大监测面积' : 'Maximum Monitoring Area'}</span>
                    <span className="font-medium">20,000 m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{lang === 'cn' ? '最佳监测高度' : 'Optimal Monitoring Height'}</span>
                    <span className="font-medium">15-30 m</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-gray-50">
              <div className="w-full">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{lang === 'cn' ? '当前系统精确度' : 'Current System Accuracy'}</span>
                  <span className="text-sm text-gray-500">98.7%</span>
                </div>
                <Progress value={98.7} className="h-1" />
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Call to action */}
      <div className="bg-gradient rounded-xl p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            {lang === 'cn' ? '提升您的煤场安全管理' : 'Enhance Your Coal Yard Safety Management'}
          </h2>
          <p className="mb-6">
            {lang === 'cn' 
              ? '我们的热成像系统可以为您的煤炭存储设施提供全天候的温度监测和自燃风险管理，大幅降低安全隐患。'
              : 'Our thermal imaging system can provide round-the-clock temperature monitoring and spontaneous combustion risk management for your coal storage facilities, significantly reducing safety hazards.'}
          </p>
          <Link href="/consultation">
            <Button variant="outline" className="bg-white text-primary hover:bg-gray-100">
              {lang === 'cn' ? '预约技术演示' : 'Schedule a Technical Demo'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}