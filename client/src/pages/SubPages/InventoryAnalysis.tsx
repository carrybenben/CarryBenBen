import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { ArrowLeft, BarChart3, TrendingUp, Scale, Clock, RefreshCw, Database, Info, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Mock3DVisualizer from '@/components/demo/Mock3DVisualizer';

export default function InventoryAnalysis() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  
  const features = [
    {
      id: 1,
      icon: <BarChart3 className="h-5 w-5"/>,
      titleEn: 'Real-Time Inventory Tracking',
      titleCn: '实时库存跟踪',
      descriptionEn: 'Continuously monitor coal inventory levels with automatic updates as stockpiles change through 3D scanning and weighing systems.',
      descriptionCn: '通过3D扫描和称重系统持续监控煤炭库存水平，随着煤堆变化自动更新。',
    },
    {
      id: 2,
      icon: <TrendingUp className="h-5 w-5"/>,
      titleEn: 'Consumption & Flow Analysis',
      titleCn: '消耗与流量分析',
      descriptionEn: 'Track coal consumption patterns, identify usage trends, and analyze flow rates to optimize operations and planning.',
      descriptionCn: '跟踪煤炭消耗模式，识别使用趋势，分析流量以优化运营和规划。',
    },
    {
      id: 3,
      icon: <Scale className="h-5 w-5"/>,
      titleEn: 'Weight Estimation Integration',
      titleCn: '重量估算集成',
      descriptionEn: 'Combines data from 3D scanning and weighing systems to provide highly accurate volumetric and weight measurements.',
      descriptionCn: '结合3D扫描和称重系统的数据，提供高精度的体积和重量测量。',
    },
    {
      id: 4,
      icon: <Clock className="h-5 w-5"/>,
      titleEn: 'Historical Comparison',
      titleCn: '历史比较',
      descriptionEn: 'Compare current inventory levels with historical data to identify seasonal patterns and optimize restocking schedules.',
      descriptionCn: '将当前库存水平与历史数据进行比较，识别季节性模式并优化补货计划。',
    },
    {
      id: 5,
      icon: <RefreshCw className="h-5 w-5"/>,
      titleEn: 'Stock Rotation Management',
      titleCn: '库存轮换管理',
      descriptionEn: 'Track coal age in storage to facilitate first-in-first-out practices and minimize quality degradation and spontaneous combustion risks.',
      descriptionCn: '追踪存储中的煤炭年龄，促进先进先出实践，最小化质量退化和自燃风险。',
    },
    {
      id: 6,
      icon: <Database className="h-5 w-5"/>,
      titleEn: 'Data Integration',
      titleCn: '数据集成',
      descriptionEn: 'Seamlessly integrates with ERP, logistics, and financial systems to provide comprehensive business intelligence.',
      descriptionCn: '与ERP、物流和财务系统无缝集成，提供全面的商业智能。',
    },
  ];

  const stats = [
    { 
      labelEn: 'Inventory Accuracy', 
      labelCn: '库存精确度', 
      valueEn: '±2.5% typical', 
      valueCn: '通常±2.5%',
      descriptionEn: 'Accuracy of volume and weight estimation compared to actual measurements',
      descriptionCn: '与实际测量相比的体积和重量估算准确性'
    },
    { 
      labelEn: 'Scan Frequency', 
      labelCn: '扫描频率', 
      valueEn: 'Every 2-4 hours', 
      valueCn: '每2-4小时',
      descriptionEn: 'Standard frequency of automated 3D scans for inventory updates',
      descriptionCn: '用于库存更新的自动3D扫描的标准频率'
    },
    { 
      labelEn: 'Change Detection Threshold', 
      labelCn: '变化检测阈值', 
      valueEn: '100 tons / 150 m³', 
      valueCn: '100吨 / 150立方米',
      descriptionEn: 'Minimum detectable inventory change for triggering automatic updates',
      descriptionCn: '触发自动更新的最小可检测库存变化'
    },
    { 
      labelEn: 'Reporting Latency', 
      labelCn: '报告延迟', 
      valueEn: '<5 minutes', 
      valueCn: '<5分钟',
      descriptionEn: 'Time from scan completion to availability of analyzed inventory data',
      descriptionCn: '从扫描完成到分析库存数据可用的时间'
    },
  ];

  const benefits = [
    {
      titleEn: 'Operational Efficiency',
      titleCn: '运营效率',
      percentEn: '15-20% increase',
      percentCn: '提升15-20%',
      descriptionEn: 'Through optimized scheduling and resource allocation based on accurate inventory data',
      descriptionCn: '通过基于准确库存数据的优化调度和资源分配'
    },
    {
      titleEn: 'Financial Reporting Accuracy',
      titleCn: '财务报告准确性',
      percentEn: '±3% vs. industry avg. ±8%',
      percentCn: '±3%（行业平均±8%）',
      descriptionEn: 'Improved financial planning, tax compliance and auditing',
      descriptionCn: '改进财务规划、税务合规和审计'
    },
    {
      titleEn: 'Stockout Prevention',
      titleCn: '缺货预防',
      percentEn: '95% reduction',
      percentCn: '减少95%',
      descriptionEn: 'Nearly eliminates unexpected inventory shortages through predictive analytics',
      descriptionCn: '通过预测分析几乎消除意外库存短缺'
    },
    {
      titleEn: 'Labor Cost Savings',
      titleCn: '劳动力成本节约',
      percentEn: '40-60% reduction',
      percentCn: '减少40-60%',
      descriptionEn: 'Reduced need for manual inventory counts and measurements',
      descriptionCn: '减少对手动库存计数和测量的需求'
    },
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
            {lang === 'cn' ? '库存与变动分析系统' : 'Inventory & Change Analysis System'}
          </h1>
          
          <div className="flex gap-2 mb-6">
            <Badge variant="outline" className="bg-primary/10">
              {lang === 'cn' ? '库存管理' : 'Inventory Management'}
            </Badge>
            <Badge variant="outline" className="bg-primary/10">
              {lang === 'cn' ? '数据分析' : 'Data Analytics'}
            </Badge>
            <Badge variant="outline" className="bg-primary/10">
              {lang === 'cn' ? '供应链优化' : 'Supply Chain Optimization'}
            </Badge>
          </div>
          
          <p className="text-lg mb-6">
            {lang === 'cn' 
              ? '我们的库存与变动分析系统结合了3D激光扫描、重量估算和先进的数据分析，提供煤炭存储设施的精确库存管理解决方案。系统实时跟踪煤炭库存水平和流动情况，支持高效的供应链管理和业务决策。'
              : 'Our Inventory and Change Analysis System combines 3D laser scanning, weight estimation, and advanced data analytics to provide a precise inventory management solution for coal storage facilities. The system tracks coal inventory levels and movements in real-time, supporting efficient supply chain management and business decision-making.'}
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
              {lang === 'cn' ? '系统性能指标' : 'System Performance Metrics'}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="border-gray-200">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">{lang === 'cn' ? stat.labelCn : stat.labelEn}</span>
                      <span className="text-sm font-bold text-primary">{lang === 'cn' ? stat.valueCn : stat.valueEn}</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {lang === 'cn' ? stat.descriptionCn : stat.descriptionEn}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {lang === 'cn' ? '商业价值及效益' : 'Business Value & Benefits'}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-gray-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-full w-1 bg-primary/20"></div>
                  <CardContent className="pt-6">
                    <h3 className="font-medium mb-2">
                      {lang === 'cn' ? benefit.titleCn : benefit.titleEn}
                    </h3>
                    <div className="text-lg font-bold text-primary mb-2">
                      {lang === 'cn' ? benefit.percentCn : benefit.percentEn}
                    </div>
                    <p className="text-sm text-gray-500">
                      {lang === 'cn' ? benefit.descriptionCn : benefit.descriptionEn}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <Card className="mb-8">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <Info className="h-5 w-5 mr-2 text-amber-500" />
                {lang === 'cn' ? '集成与实施' : 'Integration & Implementation'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                {lang === 'cn' 
                  ? '库存与变动分析系统设计为与现有的煤场管理系统无缝集成。典型的实施周期为6-8周，包括硬件安装、软件配置、系统校准和人员培训。'
                  : 'The Inventory and Change Analysis System is designed to integrate seamlessly with existing coal yard management systems. Typical implementation cycle is 6-8 weeks, including hardware installation, software configuration, system calibration, and personnel training.'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2 text-sm">
                    {lang === 'cn' ? '集成接口' : 'Integration Interfaces'}
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>{lang === 'cn' ? 'ERP系统连接' : 'ERP system connectivity'}</li>
                    <li>{lang === 'cn' ? '称重系统数据' : 'Weighing system data'}</li>
                    <li>{lang === 'cn' ? '物流管理平台' : 'Logistics management platforms'}</li>
                    <li>{lang === 'cn' ? '财务报告软件' : 'Financial reporting software'}</li>
                    <li>{lang === 'cn' ? '定制API接口' : 'Custom API interfaces'}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-sm">
                    {lang === 'cn' ? '数据导出格式' : 'Data Export Formats'}
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>CSV, Excel, JSON, XML</li>
                    <li>SQL Database Connections</li>
                    <li>REST API</li>
                    <li>MQTT Protocol</li>
                    <li>Custom Format Options</li>
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
                {lang === 'cn' ? '库存分析系统样例展示' : 'Inventory analysis system sample display'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="wireframe">
                <TabsList className="mb-4">
                  <TabsTrigger value="standard">
                    {lang === 'cn' ? '标准视图' : 'Standard View'}
                  </TabsTrigger>
                  <TabsTrigger value="wireframe">
                    {lang === 'cn' ? '分析视图' : 'Analysis View'}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="standard">
                  <Mock3DVisualizer 
                    title={lang === 'cn' ? '煤堆分析 - 标准视图' : 'Coal Pile Analysis - Standard View'} 
                    mode="default"
                  />
                  <p className="text-sm text-gray-500 mt-4">
                    {lang === 'cn' 
                      ? '标准视图显示煤堆的物理形状和大小，便于直观评估。'
                      : 'Standard view shows the physical shape and size of coal pile for intuitive assessment.'}
                  </p>
                </TabsContent>
                
                <TabsContent value="wireframe">
                  <Mock3DVisualizer 
                    title={lang === 'cn' ? '煤堆分析 - 分析视图' : 'Coal Pile Analysis - Analysis View'} 
                    mode="wireframe"
                  />
                  <p className="text-sm text-gray-500 mt-4">
                    {lang === 'cn' 
                      ? '分析视图使用网格模型进行精确的体积计算和变化分析。'
                      : 'Analysis view uses wireframe model for precise volume calculation and change analysis.'}
                  </p>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 border-t pt-6">
                <h3 className="font-medium mb-3">
                  {lang === 'cn' ? '当前系统状态' : 'Current System Status'}
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{lang === 'cn' ? '上次扫描' : 'Last Scan'}</span>
                      <span className="font-medium">12:45 PM</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{lang === 'cn' ? '总库存量' : 'Total Inventory'}</span>
                      <span className="font-medium">24,506 tons</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{lang === 'cn' ? '24小时变化' : '24h Change'}</span>
                      <span className="font-medium text-green-600">+1,250 tons</span>
                    </div>
                  </div>
                  
                  <Card className="bg-gray-50 border-dashed">
                    <CardHeader className="py-3 px-4">
                      <CardTitle className="text-sm flex items-center">
                        <PieChart className="h-4 w-4 mr-2 text-primary" />
                        {lang === 'cn' ? '库存细分' : 'Inventory Breakdown'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="py-0 px-4 pb-4">
                      <div className="text-xs space-y-2">
                        <div className="flex justify-between">
                          <span>{lang === 'cn' ? '焦煤' : 'Coking Coal'}</span>
                          <span>12,350 tons (50.4%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{lang === 'cn' ? '动力煤' : 'Thermal Coal'}</span>
                          <span>8,920 tons (36.4%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{lang === 'cn' ? '无烟煤' : 'Anthracite'}</span>
                          <span>3,236 tons (13.2%)</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-gray-50 justify-center">
              <Button variant="outline" size="sm" className="text-xs">
                {lang === 'cn' ? '查看详细报告' : 'View Detailed Report'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Call to action */}
      <div className="bg-gradient rounded-xl p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            {lang === 'cn' ? '准备优化您的煤炭库存管理？' : 'Ready to optimize your coal inventory management?'}
          </h2>
          <p className="mb-6">
            {lang === 'cn' 
              ? '我们的库存与变动分析系统能够为您提供前所未有的库存可见性和控制能力，实现精确的财务计划和运营优化。'
              : 'Our Inventory and Change Analysis System can provide you with unprecedented inventory visibility and control, enabling precise financial planning and operational optimization.'}
          </p>
          <Link href="/consultation">
            <Button variant="outline" className="bg-white text-primary hover:bg-gray-100">
              {lang === 'cn' ? '安排系统演示' : 'Schedule a System Demo'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}