import { useEffect } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

// Import SVG assets
import CoalStorageSvg from '@/assets/images/coal-storage.svg';
import FirePreventionSvg from '@/assets/images/fire-prevention.svg';
import InventoryManagementSvg from '@/assets/images/inventory-management.svg';
import SecurityMonitoringSvg from '@/assets/images/security-monitoring.svg';
import SiteAssessmentSvg from '@/assets/implementation/site-assessment.svg';
import SystemDesignSvg from '@/assets/implementation/system-design.svg';
import EquipmentInstallationSvg from '@/assets/implementation/equipment-installation.svg';
import TrainingSvg from '@/assets/implementation/training.svg';

export default function CoalStorageMonitoring() {
  const { t, i18n } = useTranslation();

  // Set document title
  useEffect(() => {
    document.title = i18n.language === 'cn' ? '煤仓监管服务 | 煤炭服务' : 'Coal Storage Monitoring | Coal Services';
  }, [i18n.language]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {i18n.language === 'cn' ? '煤仓监管服务' : 'Coal Storage Monitoring Service'}
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              {i18n.language === 'cn' 
                ? '利用先进技术实时监测煤炭库存，防止损失并确保安全' 
                : 'Real-time monitoring of coal stockpiles using advanced technology to prevent losses and ensure security'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="#features">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100">
                  {i18n.language === 'cn' ? '了解更多' : 'Learn More'}
                </Button>
              </Link>
              <Link href="/consultation">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  {i18n.language === 'cn' ? '申请演示' : 'Request Demo'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Overview Section */}
      <section className="py-16" id="overview">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  {i18n.language === 'cn' ? '全方位煤仓监管解决方案' : 'Comprehensive Coal Storage Monitoring Solution'}
                </h2>
                <p className="text-gray-600 mb-4">
                  {i18n.language === 'cn' 
                    ? '我们的煤仓监管系统采用先进的传感器网络、智能摄像头和数据分析技术，为煤炭存储提供全天候不间断监控。' 
                    : 'Our coal storage monitoring system employs an advanced network of sensors, smart cameras, and data analytics to provide around-the-clock surveillance of coal stockpiles.'}
                </p>
                <p className="text-gray-600 mb-6">
                  {i18n.language === 'cn' 
                    ? '该系统能够检测异常活动、防止煤炭盗窃、监控温度变化以防止自燃，并实时追踪库存水平，确保您的煤炭资产安全无虞。' 
                    : 'The system can detect unusual activities, prevent coal theft, monitor temperature changes to prevent spontaneous combustion, and track inventory levels in real-time, ensuring your coal assets remain secure.'}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {i18n.language === 'cn' ? '24/7 实时监控' : '24/7 Real-time Monitoring'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {i18n.language === 'cn' 
                          ? '全天候不间断监测所有煤炭存储区域' 
                          : 'Continuous monitoring of all coal storage areas'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {i18n.language === 'cn' ? '智能安全警报' : 'Intelligent Security Alerts'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {i18n.language === 'cn' 
                          ? '自动检测并报告可疑活动和异常情况' 
                          : 'Automatically detect and report suspicious activities and anomalies'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {i18n.language === 'cn' ? '高级数据分析' : 'Advanced Data Analytics'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {i18n.language === 'cn' 
                          ? '深入分析监控数据，提供可行见解' 
                          : 'In-depth analysis of monitoring data for actionable insights'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img
                    src={CoalStorageSvg}
                    alt="Coal Storage Monitoring"
                    className="w-full h-full object-contain bg-white p-4"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full z-[-1]"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/5 rounded-full z-[-1]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 bg-gray-50" id="technologies">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {i18n.language === 'cn' ? '尖端监控技术' : 'Cutting-edge Monitoring Technologies'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {i18n.language === 'cn' 
                  ? '我们的煤仓监管系统采用多种先进技术确保您的煤炭存储安全' 
                  : 'Our coal storage monitoring system employs a variety of advanced technologies to ensure your coal storage remains secure'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-2xl">📹</span>
                  </div>
                  <CardTitle>
                    {i18n.language === 'cn' ? '智能视频监控' : 'Smart Video Surveillance'}
                  </CardTitle>
                  <CardDescription>
                    {i18n.language === 'cn' 
                      ? '采用人工智能分析的高清摄像系统' 
                      : 'High-definition camera systems with AI-powered analysis'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {i18n.language === 'cn' 
                      ? '我们的智能摄像系统全天候监控煤炭存储区域，自动检测异常活动并实时报警。系统配备先进的计算机视觉算法，能准确识别人员活动、车辆移动和其他安全隐患。' 
                      : 'Our smart surveillance system monitors coal storage areas around the clock, automatically detects anomalous activities, and raises alarms in real-time. Equipped with advanced computer vision algorithms, the system can accurately identify personnel activities, vehicle movements, and other security concerns.'}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/sub-pages/video-monitoring">
                    <Button variant="link" className="px-0 text-primary">
                      {i18n.language === 'cn' ? '了解更多' : 'Learn more'} →
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <span className="text-green-600 text-2xl">🌡️</span>
                  </div>
                  <CardTitle>
                    {i18n.language === 'cn' ? '热成像与温度感应' : 'Thermal Imaging & Temperature Sensing'}
                  </CardTitle>
                  <CardDescription>
                    {i18n.language === 'cn' 
                      ? '监控煤堆温度变化预防自燃' 
                      : 'Monitor coal pile temperature changes to prevent spontaneous combustion'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {i18n.language === 'cn' 
                      ? '我们的热成像系统可检测煤堆内部温度异常，提前发现自燃风险。系统通过分析温度数据趋势，预测潜在的热点区域，有效防止火灾事故发生。' 
                      : 'Our thermal imaging systems detect temperature anomalies within coal piles, identifying spontaneous combustion risks before they become hazardous. By analyzing temperature data trends, the system predicts potential hotspots, effectively preventing fire incidents.'}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/sub-pages/thermal-imaging">
                    <Button variant="link" className="px-0 text-primary">
                      {i18n.language === 'cn' ? '了解更多' : 'Learn more'} →
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <span className="text-purple-600 text-2xl">📊</span>
                  </div>
                  <CardTitle>
                    {i18n.language === 'cn' ? '库存与变动分析' : 'Inventory & Movement Analytics'}
                  </CardTitle>
                  <CardDescription>
                    {i18n.language === 'cn' 
                      ? '追踪煤炭库存水平和移动情况' 
                      : 'Track coal inventory levels and movements'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {i18n.language === 'cn' 
                      ? '我们的系统可通过先进的计算机视觉技术实时监测煤炭堆体积变化，跟踪煤炭进出情况，自动生成库存报告，帮助您优化库存管理并防止意外损失。' 
                      : 'Our system monitors coal pile volume changes in real-time through advanced computer vision technology, tracks coal movements in and out, automatically generates inventory reports, and helps you optimize inventory management while preventing unexpected losses.'}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/sub-pages/inventory-analysis">
                    <Button variant="link" className="px-0 text-primary">
                      {i18n.language === 'cn' ? '了解更多' : 'Learn more'} →
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Process Section */}
      <section className="py-16" id="implementation">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {i18n.language === 'cn' ? '实施流程' : 'Implementation Process'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {i18n.language === 'cn' 
                  ? '我们采用系统化的方法为您的煤炭存储区域实施监控解决方案' 
                  : 'We take a systematic approach to implementing monitoring solutions for your coal storage areas'}
              </p>
            </div>

            <div className="relative">
              {/* Process steps with connecting lines */}
              <div className="hidden md:block absolute left-1/2 top-8 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2"></div>
              
              <div className="space-y-12 relative">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="md:w-1/2 md:text-right order-2 md:order-1">
                    <h3 className="text-xl font-bold mb-3">
                      {i18n.language === 'cn' ? '1. 站点评估与需求分析' : '1. Site Assessment & Requirements Analysis'}
                    </h3>
                    <p className="text-gray-600">
                      {i18n.language === 'cn' 
                        ? '我们的专家团队会详细评估您的煤炭存储设施，了解您的具体需求和挑战，并制定最适合您的监控策略。评估内容包括存储区域大小、环境条件、安全威胁和特殊监控需求。' 
                        : 'Our team of experts thoroughly assesses your coal storage facilities, understands your specific needs and challenges, and develops a monitoring strategy tailored to your requirements. The assessment includes storage area size, environmental conditions, security threats, and special monitoring needs.'}
                    </p>
                  </div>
                  <div className="md:w-12 md:mx-auto flex justify-center order-1 md:order-2">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold z-10">
                      1
                    </div>
                  </div>
                  <div className="md:w-1/2 order-3">
                    <img 
                      src={SiteAssessmentSvg} 
                      alt="Site Assessment" 
                      className="rounded-lg shadow-md bg-white p-2"
                    />
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="md:w-1/2 order-2 md:order-1">
                    <img 
                      src={SystemDesignSvg} 
                      alt="System Design" 
                      className="rounded-lg shadow-md bg-white p-2"
                    />
                  </div>
                  <div className="md:w-12 md:mx-auto flex justify-center order-1 md:order-2">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold z-10">
                      2
                    </div>
                  </div>
                  <div className="md:w-1/2 md:text-left order-3">
                    <h3 className="text-xl font-bold mb-3">
                      {i18n.language === 'cn' ? '2. 系统设计与定制' : '2. System Design & Customization'}
                    </h3>
                    <p className="text-gray-600">
                      {i18n.language === 'cn' 
                        ? '基于评估结果，我们设计完整的监控解决方案，包括设备选择、布局规划、数据处理和分析策略。每个系统都完全定制，以满足您的特定需求和预算限制。' 
                        : 'Based on the assessment results, we design a complete monitoring solution, including equipment selection, layout planning, data processing, and analysis strategies. Each system is fully customized to meet your specific needs and budget constraints.'}
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="md:w-1/2 md:text-right order-2 md:order-1">
                    <h3 className="text-xl font-bold mb-3">
                      {i18n.language === 'cn' ? '3. 设备安装与集成' : '3. Equipment Installation & Integration'}
                    </h3>
                    <p className="text-gray-600">
                      {i18n.language === 'cn' 
                        ? '我们的技术团队负责所有设备的安装和调试，确保系统正常运行并与您现有的系统无缝集成。我们严格遵循安全标准，将对您正常运营的干扰降至最低。' 
                        : 'Our technical team handles the installation and commissioning of all equipment, ensuring the system works properly and integrates seamlessly with your existing systems. We strictly follow safety standards and minimize disruption to your normal operations.'}
                    </p>
                  </div>
                  <div className="md:w-12 md:mx-auto flex justify-center order-1 md:order-2">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold z-10">
                      3
                    </div>
                  </div>
                  <div className="md:w-1/2 order-3">
                    <img 
                      src={EquipmentInstallationSvg} 
                      alt="Equipment Installation" 
                      className="rounded-lg shadow-md bg-white p-2"
                    />
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="md:w-1/2 order-2 md:order-1">
                    <img 
                      src={TrainingSvg} 
                      alt="Training" 
                      className="rounded-lg shadow-md bg-white p-2"
                    />
                  </div>
                  <div className="md:w-12 md:mx-auto flex justify-center order-1 md:order-2">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold z-10">
                      4
                    </div>
                  </div>
                  <div className="md:w-1/2 md:text-left order-3">
                    <h3 className="text-xl font-bold mb-3">
                      {i18n.language === 'cn' ? '4. 培训与支持' : '4. Training & Support'}
                    </h3>
                    <p className="text-gray-600">
                      {i18n.language === 'cn' 
                        ? '我们为您的团队提供全面培训，确保他们能够有效操作和管理监控系统。我们还提供持续的技术支持和定期维护服务，确保系统始终处于最佳状态。' 
                        : 'We provide comprehensive training for your team to ensure they can effectively operate and manage the monitoring system. We also offer ongoing technical support and regular maintenance services to keep the system in optimal condition.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features and Benefits Tabs */}
      <section className="py-16 bg-gray-50" id="features">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {i18n.language === 'cn' ? '功能与优势' : 'Features & Benefits'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {i18n.language === 'cn' 
                  ? '我们的煤仓监管服务提供全面的功能，为您的煤炭存储管理带来显著优势' 
                  : 'Our coal storage monitoring service offers comprehensive features that bring significant advantages to your coal storage management'}
              </p>
            </div>

            <Tabs defaultValue="security">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-3xl grid-cols-3">
                  <TabsTrigger value="security">
                    {i18n.language === 'cn' ? '安全与防盗' : 'Security & Theft Prevention'}
                  </TabsTrigger>
                  <TabsTrigger value="fire">
                    {i18n.language === 'cn' ? '火灾预防' : 'Fire Prevention'}
                  </TabsTrigger>
                  <TabsTrigger value="inventory">
                    {i18n.language === 'cn' ? '库存管理' : 'Inventory Management'}
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="security">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">
                      {i18n.language === 'cn' ? '增强的安全与防盗措施' : 'Enhanced Security & Theft Prevention'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {i18n.language === 'cn' 
                        ? '我们的监控系统提供全面的安全保障，防止未经授权的访问和煤炭盗窃，保护您的宝贵资产。' 
                        : 'Our monitoring system provides comprehensive security protection, preventing unauthorized access and coal theft, safeguarding your valuable assets.'}
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <div>
                          <span className="font-medium">
                            {i18n.language === 'cn' ? '周界防护监控' : 'Perimeter Protection Monitoring'}
                          </span>
                          <p className="text-sm text-gray-600">
                            {i18n.language === 'cn' 
                              ? '全面监控存储区域周界，检测任何未经授权的入侵' 
                              : 'Comprehensive monitoring of storage area perimeters, detecting any unauthorized intrusions'}
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <div>
                          <span className="font-medium">
                            {i18n.language === 'cn' ? '异常行为检测' : 'Anomalous Behavior Detection'}
                          </span>
                          <p className="text-sm text-gray-600">
                            {i18n.language === 'cn' 
                              ? '智能算法识别可疑行为和活动模式，预警潜在威胁' 
                              : 'Intelligent algorithms identify suspicious behaviors and activity patterns, alerting to potential threats'}
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <div>
                          <span className="font-medium">
                            {i18n.language === 'cn' ? '实时警报系统' : 'Real-time Alert System'}
                          </span>
                          <p className="text-sm text-gray-600">
                            {i18n.language === 'cn' 
                              ? '即时通知安全人员和管理者任何安全事件，支持快速响应' 
                              : 'Instant notification to security personnel and managers of any security incidents, supporting quick responses'}
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <div>
                          <span className="font-medium">
                            {i18n.language === 'cn' ? '访问控制集成' : 'Access Control Integration'}
                          </span>
                          <p className="text-sm text-gray-600">
                            {i18n.language === 'cn' 
                              ? '与门禁和访问控制系统集成，记录和管理人员进出' 
                              : 'Integration with gate access and control systems, recording and managing personnel entry and exit'}
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <img 
                      src={SecurityMonitoringSvg} 
                      alt="Security Monitoring" 
                      className="rounded-lg shadow-lg bg-white p-2"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="fire">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <img 
                      src={FirePreventionSvg} 
                      alt="Fire Prevention" 
                      className="rounded-lg shadow-lg bg-white p-2"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">
                      {i18n.language === 'cn' ? '先进的火灾预防技术' : 'Advanced Fire Prevention Technology'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {i18n.language === 'cn' 
                        ? '我们的系统采用先进的热成像和温度监测技术，及早检测煤堆自燃风险，防止火灾事故。' 
                        : 'Our system employs advanced thermal imaging and temperature monitoring technology to detect coal pile spontaneous combustion risks early, preventing fire accidents.'}
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <div>
                          <span className="font-medium">
                            {i18n.language === 'cn' ? '早期热点检测' : 'Early Hotspot Detection'}
                          </span>
                          <p className="text-sm text-gray-600">
                            {i18n.language === 'cn' 
                              ? '识别煤堆中的温度异常，在问题恶化前采取行动' 
                              : 'Identify temperature anomalies in coal piles and take action before problems escalate'}
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <div>
                          <span className="font-medium">
                            {i18n.language === 'cn' ? '多级温度警报' : 'Multi-level Temperature Alerts'}
                          </span>
                          <p className="text-sm text-gray-600">
                            {i18n.language === 'cn' 
                              ? '根据不同温度阈值设置分级警报，支持梯度响应策略' 
                              : 'Set graduated alerts based on different temperature thresholds, supporting tiered response strategies'}
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <div>
                          <span className="font-medium">
                            {i18n.language === 'cn' ? '温度趋势分析' : 'Temperature Trend Analysis'}
                          </span>
                          <p className="text-sm text-gray-600">
                            {i18n.language === 'cn' 
                              ? '分析长期温度变化，预测潜在自燃风险区域' 
                              : 'Analyze long-term temperature changes to predict potential spontaneous combustion risk areas'}
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <div>
                          <span className="font-medium">
                            {i18n.language === 'cn' ? '应急响应集成' : 'Emergency Response Integration'}
                          </span>
                          <p className="text-sm text-gray-600">
                            {i18n.language === 'cn' 
                              ? '与消防和应急系统集成，支持快速协调响应' 
                              : 'Integration with fire fighting and emergency systems, supporting rapid coordinated responses'}
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="inventory">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">
                      {i18n.language === 'cn' ? '智能库存管理系统' : 'Intelligent Inventory Management System'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {i18n.language === 'cn' 
                        ? '我们的系统提供准确、实时的库存监控和数据分析，优化您的煤炭库存管理和运营决策。' 
                        : 'Our system provides accurate, real-time inventory monitoring and data analysis, optimizing your coal inventory management and operational decisions.'}
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <div>
                          <span className="font-medium">
                            {i18n.language === 'cn' ? '3D体积计算' : '3D Volume Calculation'}
                          </span>
                          <p className="text-sm text-gray-600">
                            {i18n.language === 'cn' 
                              ? '精确测量煤堆体积，提供准确的库存数据' 
                              : 'Precise measurement of coal pile volumes, providing accurate inventory data'}
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <div>
                          <span className="font-medium">
                            {i18n.language === 'cn' ? '库存变动追踪' : 'Inventory Movement Tracking'}
                          </span>
                          <p className="text-sm text-gray-600">
                            {i18n.language === 'cn' 
                              ? '监控和记录煤炭进出情况，保持准确的库存记录' 
                              : 'Monitor and record coal movements in and out, maintaining accurate inventory records'}
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <div>
                          <span className="font-medium">
                            {i18n.language === 'cn' ? '智能报告与分析' : 'Smart Reporting & Analytics'}
                          </span>
                          <p className="text-sm text-gray-600">
                            {i18n.language === 'cn' 
                              ? '生成详细的库存报告和分析，支持数据驱动决策' 
                              : 'Generate detailed inventory reports and analytics, supporting data-driven decisions'}
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <div>
                          <span className="font-medium">
                            {i18n.language === 'cn' ? 'ERP系统集成' : 'ERP System Integration'}
                          </span>
                          <p className="text-sm text-gray-600">
                            {i18n.language === 'cn' 
                              ? '与企业现有ERP和库存管理系统无缝对接' 
                              : 'Seamless integration with existing enterprise ERP and inventory management systems'}
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <img 
                      src={InventoryManagementSvg} 
                      alt="Inventory Management" 
                      className="rounded-lg shadow-lg bg-white p-2"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              {i18n.language === 'cn' ? '升级您的煤炭储存安全与管理' : 'Upgrade Your Coal Storage Security & Management'}
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              {i18n.language === 'cn' 
                ? '立即联系我们，了解我们的煤仓监管服务如何保护您的煤炭资产，提高运营效率。' 
                : 'Contact us today to learn how our coal storage monitoring service can protect your coal assets and improve operational efficiency.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/consultation">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100">
                  {i18n.language === 'cn' ? '预约免费咨询' : 'Schedule a Free Consultation'}
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  {i18n.language === 'cn' ? '查看成功案例' : 'View Success Stories'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}