import { useEffect } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

// Import SVG assets
import WeightEstimationSvg from '@/assets/images/weight-estimation.svg';

export default function WeightEstimation() {
  const { t, i18n } = useTranslation();

  // Set document title
  useEffect(() => {
    document.title = i18n.language === 'cn' ? '煤重估量服务 | 煤炭服务' : 'Coal Weight Estimation | Coal Services';
  }, [i18n.language]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {i18n.language === 'cn' ? '煤重估量服务' : 'Coal Weight Estimation Service'}
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              {i18n.language === 'cn' 
                ? '利用精确3D建模技术进行煤炭堆精准重量估算' 
                : 'Precision 3D modeling for accurate coal stockpile weight estimation'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="#technology">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100">
                  {i18n.language === 'cn' ? '了解技术' : 'Explore Technology'}
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
                  {i18n.language === 'cn' ? '精确的煤炭重量估算解决方案' : 'Precise Coal Weight Estimation Solution'}
                </h2>
                <p className="text-gray-600 mb-4">
                  {i18n.language === 'cn' 
                    ? '我们的煤重估量服务利用尖端的3D测量技术，提供极高精度的煤炭堆体积和重量估算，帮助企业精确管理库存和优化运营。' 
                    : 'Our coal weight estimation service utilizes cutting-edge 3D measurement technology to provide highly accurate stockpile volume and weight calculations, helping businesses precisely manage inventory and optimize operations.'}
                </p>
                <p className="text-gray-600 mb-6">
                  {i18n.language === 'cn' 
                    ? '通过先进的无人机航拍、激光雷达扫描和智能算法，我们的系统可以在短时间内收集大型煤炭堆的详细数据，并生成高精度的三维模型，实现±1.5%以内的重量估算精度。' 
                    : 'Using advanced drone aerial photography, LiDAR scanning, and intelligent algorithms, our system can collect detailed data of large coal stockpiles in a short time and generate high-precision three-dimensional models, achieving weight estimation accuracy within ±1.5%.'}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {i18n.language === 'cn' ? '高精度测量' : 'High-Precision Measurement'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {i18n.language === 'cn' 
                          ? '精度达到±1.5%，远超传统估算方法' 
                          : 'Accuracy up to ±1.5%, far exceeding traditional estimation methods'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {i18n.language === 'cn' ? '快速数据采集' : 'Rapid Data Collection'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {i18n.language === 'cn' 
                          ? '大型煤场几小时内完成测量，无需停止操作' 
                          : 'Complete measurements of large coal yards within hours, no operational stoppage required'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {i18n.language === 'cn' ? '全面分析报告' : 'Comprehensive Analysis Reports'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {i18n.language === 'cn' 
                          ? '详细的3D模型、体积计算和趋势分析' 
                          : 'Detailed 3D models, volume calculations, and trend analysis'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img
                    src={WeightEstimationSvg}
                    alt="Coal Weight Estimation"
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

      {/* Technology Section */}
      <section className="py-16 bg-gray-50" id="technology">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {i18n.language === 'cn' ? '我们的估重技术' : 'Our Weight Estimation Technology'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {i18n.language === 'cn' 
                  ? '我们结合多种先进技术，提供业内最精确的煤炭重量估算' 
                  : 'We combine multiple advanced technologies to provide the most accurate coal weight estimation in the industry'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-2xl">🛩️</span>
                  </div>
                  <CardTitle>
                    {i18n.language === 'cn' ? '无人机航拍测量' : 'Drone Aerial Survey'}
                  </CardTitle>
                  <CardDescription>
                    {i18n.language === 'cn' 
                      ? '高精度航拍测绘技术' 
                      : 'High-precision aerial mapping technology'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {i18n.language === 'cn' 
                      ? '我们使用专业测绘无人机进行高分辨率航拍，采集数百甚至数千个测量点，生成煤堆的精确点云数据。无人机配备厘米级精度的RTK定位系统，能够在短时间内完成大面积煤场的测量工作。' 
                      : 'We use professional mapping drones for high-resolution aerial photography, collecting hundreds or even thousands of measurement points to generate precise point cloud data of coal piles. Drones are equipped with centimeter-level precision RTK positioning systems, capable of completing measurements of large coal yards in a short time.'}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/technology/drone-survey">
                    <Button variant="link" className="px-0 text-primary">
                      {i18n.language === 'cn' ? '了解更多' : 'Learn more'} →
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <span className="text-green-600 text-2xl">📊</span>
                  </div>
                  <CardTitle>
                    {i18n.language === 'cn' ? '3D建模与体积计算' : '3D Modeling & Volume Calculation'}
                  </CardTitle>
                  <CardDescription>
                    {i18n.language === 'cn' 
                      ? '精确三维重建和体积分析' 
                      : 'Precise three-dimensional reconstruction and volume analysis'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {i18n.language === 'cn' 
                      ? '我们的软件将采集的点云数据处理成高精度的三维模型，并通过先进的体积计算算法，精确计算出煤堆的实际体积。系统考虑了地形起伏、堆积形状和基础面等因素，确保计算结果的准确性。' 
                      : 'Our software processes the collected point cloud data into high-precision three-dimensional models and accurately calculates the actual volume of coal piles through advanced volume calculation algorithms. The system considers factors such as terrain undulations, pile shapes, and base surfaces to ensure calculation accuracy.'}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/technology/3d-modeling">
                    <Button variant="link" className="px-0 text-primary">
                      {i18n.language === 'cn' ? '了解更多' : 'Learn more'} →
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <span className="text-purple-600 text-2xl">⚖️</span>
                  </div>
                  <CardTitle>
                    {i18n.language === 'cn' ? '密度分析与重量转换' : 'Density Analysis & Weight Conversion'}
                  </CardTitle>
                  <CardDescription>
                    {i18n.language === 'cn' 
                      ? '智能密度估算和重量计算' 
                      : 'Intelligent density estimation and weight calculation'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {i18n.language === 'cn' 
                      ? '我们的系统通过采集煤炭样品和历史数据，建立了精确的煤炭密度模型。结合实时测量的煤堆体积和智能密度估算算法，系统可以准确计算出煤堆的总重量，误差控制在±1.5%以内。' 
                      : 'Our system has established an accurate coal density model by collecting coal samples and historical data. Combined with real-time measured coal pile volumes and intelligent density estimation algorithms, the system can accurately calculate the total weight of coal piles with an error margin within ±1.5%.'}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/technology/density-analysis">
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

      {/* Benefits Section */}
      <section className="py-16" id="benefits">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {i18n.language === 'cn' ? '使用我们服务的优势' : 'Benefits of Using Our Service'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {i18n.language === 'cn' 
                  ? '精确的煤重估算为您的业务带来显著优势' 
                  : 'Accurate coal weight estimation brings significant advantages to your business'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                  <span className="text-blue-600 text-xl">💰</span>
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {i18n.language === 'cn' ? '提高财务准确性' : 'Improve Financial Accuracy'}
                </h3>
                <p className="text-gray-600">
                  {i18n.language === 'cn' 
                    ? '传统的煤炭估重方法误差可达10-15%，这会导致库存价值评估不准确、交易定价错误和财务报表失真。我们的系统将误差控制在1.5%以内，大幅提高财务准确性，帮助您做出更明智的业务决策。' 
                    : 'Traditional coal weight estimation methods can have errors of 10-15%, leading to inaccurate inventory value assessment, incorrect transaction pricing, and distorted financial statements. Our system controls errors within 1.5%, greatly improving financial accuracy and helping you make more informed business decisions.'}
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      {i18n.language === 'cn' ? '精确的库存价值评估' : 'Precise inventory value assessment'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      {i18n.language === 'cn' ? '准确的交易计量' : 'Accurate transaction measurements'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      {i18n.language === 'cn' ? '可靠的财务报表数据' : 'Reliable financial statement data'}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <span className="text-green-600 text-xl">⏱️</span>
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {i18n.language === 'cn' ? '提升运营效率' : 'Enhance Operational Efficiency'}
                </h3>
                <p className="text-gray-600">
                  {i18n.language === 'cn' 
                    ? '我们的测量系统不需要停止煤场操作，能够在几小时内完成大型煤场的测量。相比传统人工测量方法，我们的方案可以节省90%的时间和人力成本，同时提供更准确的结果。' 
                    : 'Our measurement system doesn\'t require stopping coal yard operations and can complete measurements of large coal yards within hours. Compared to traditional manual measurement methods, our solution can save 90% of time and labor costs while providing more accurate results.'}
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      {i18n.language === 'cn' ? '无干扰测量' : 'Non-disruptive measurement'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      {i18n.language === 'cn' ? '大幅减少人力成本' : 'Significantly reduced labor costs'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      {i18n.language === 'cn' ? '加快库存周转决策' : 'Accelerated inventory turnover decisions'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Case Study Highlight */}
            <div className="mt-16 bg-gray-50 rounded-lg p-8 border border-gray-200">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/3">
                    <img 
                      src={WeightEstimationSvg}
                      alt="Case Study" 
                      className="rounded-lg shadow-md w-full bg-white p-4"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <div className="text-sm text-primary font-medium mb-2">
                      {i18n.language === 'cn' ? '客户案例' : 'CASE STUDY'}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      {i18n.language === 'cn' ? '华能集团精准重量估算' : 'Precision Weight Estimation for China Huaneng Group'}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {i18n.language === 'cn' 
                        ? '华能集团实施我们的重量估算服务后，库存管理精度提高了30%，年度节省成本1500万元，审计时间减少了86%。' 
                        : 'After implementing our weight estimation service, China Huaneng Group improved inventory management accuracy by 30%, saved ¥15 million annually, and reduced audit time by 86%.'}
                    </p>
                    <Link href="/case-studies/2">
                      <Button variant="outline">
                        {i18n.language === 'cn' ? '查看完整案例' : 'View Full Case Study'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              {i18n.language === 'cn' ? '准备好提升您的煤炭库存管理了吗？' : 'Ready to upgrade your coal inventory management?'}
            </h2>
            <p className="text-xl mb-8 text-white/80">
              {i18n.language === 'cn' 
                ? '联系我们安排演示，了解我们如何为您的特定需求定制解决方案。' 
                : 'Contact us to schedule a demonstration and learn how we can tailor our solution to your specific needs.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/consultation">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  {i18n.language === 'cn' ? '联系我们' : 'Contact Us'}
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  {i18n.language === 'cn' ? '查看更多案例' : 'View More Case Studies'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}