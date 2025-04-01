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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import SVG assets
import PriceEstimationSvg from '@/assets/images/price-estimation.svg';
import PortIndexSvg from '@/assets/images/price-estimation/port-index.svg';
import TransactionDataSvg from '@/assets/images/price-estimation/transaction-data.svg';
import LocalMarketSvg from '@/assets/images/price-estimation/local-market.svg';

export default function PriceEstimation() {
  const { t, i18n } = useTranslation();

  // Set document title
  useEffect(() => {
    document.title = i18n.language === 'cn' ? '煤价估算服务 | 煤炭服务' : 'Coal Price Estimation | Coal Services';
  }, [i18n.language]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {i18n.language === 'cn' ? '煤价估算服务' : 'Coal Price Estimation Service'}
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              {i18n.language === 'cn' 
                ? '多维度数据驱动的煤炭价格精准估算系统' 
                : 'Multi-dimensional data-driven coal price precision estimation system'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="#methods">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100">
                  {i18n.language === 'cn' ? '了解估价方法' : 'Explore Methods'}
                </Button>
              </Link>
              <Link href="/consultation">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  {i18n.language === 'cn' ? '获取价格报告' : 'Get Price Report'}
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
                  {i18n.language === 'cn' ? '精确的煤炭价格估算解决方案' : 'Precise Coal Price Estimation Solution'}
                </h2>
                <p className="text-gray-600 mb-4">
                  {i18n.language === 'cn' 
                    ? '我们的煤价估算服务整合多种数据源和分析方法，提供最精确的煤炭价格预测，帮助企业做出更明智的采购和销售决策。' 
                    : 'Our coal price estimation service integrates multiple data sources and analytical methods to provide the most accurate coal price predictions, helping enterprises make more informed purchasing and sales decisions.'}
                </p>
                <p className="text-gray-600 mb-6">
                  {i18n.language === 'cn' 
                    ? '通过分析中国北方港口CCI指数、实时交易数据和地方市场信息，我们的系统能够同时考虑宏观市场趋势和地区特性，生成更全面、更准确的价格估算。' 
                    : 'By analyzing China\'s northern port CCI index, real-time transaction data, and local market information, our system can simultaneously consider macro market trends and regional characteristics to generate more comprehensive and accurate price estimates.'}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-blue-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {i18n.language === 'cn' ? '多维数据分析' : 'Multi-dimensional Data Analysis'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {i18n.language === 'cn' 
                          ? '整合市场指数、历史交易和地方市场数据' 
                          : 'Integrating market indices, historical transactions, and local market data'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-blue-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {i18n.language === 'cn' ? '实时价格更新' : 'Real-time Price Updates'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {i18n.language === 'cn' 
                          ? '每日更新的价格估算，反映最新市场动态' 
                          : 'Daily updated price estimates reflecting the latest market dynamics'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-blue-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {i18n.language === 'cn' ? '定制化分析报告' : 'Customized Analysis Reports'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {i18n.language === 'cn' 
                          ? '根据具体需求提供详细的价格分析和预测报告' 
                          : 'Detailed price analysis and forecast reports tailored to specific needs'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img
                    src={PriceEstimationSvg}
                    alt="Coal Price Estimation"
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

      {/* Estimation Methods Section */}
      <section className="py-16 bg-gray-50" id="methods">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {i18n.language === 'cn' ? '我们的价格估算方法' : 'Our Price Estimation Methods'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {i18n.language === 'cn' 
                  ? '我们结合多种估价方法，提供全面且准确的煤炭价格分析' 
                  : 'We combine multiple estimation methods to provide comprehensive and accurate coal price analysis'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border border-blue-200 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <img src={PortIndexSvg} alt="Port Index Method" className="w-16 h-16" />
                  </div>
                  <CardTitle className="text-center text-blue-800">
                    {i18n.language === 'cn' ? '北方港口CCI指数法' : 'Northern Port CCI Index Method'}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {i18n.language === 'cn' 
                      ? '基于权威指数的价格倒推估算' 
                      : 'Price reverse estimation based on authoritative index'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {i18n.language === 'cn' 
                      ? '我们实时跟踪中国沿海煤炭价格指数(CCI)和中国电煤交易中心(CECT)的价格数据，根据当地与港口的价格相关性和历史关系，通过运费、税费和其他成本的调整，倒推计算出当地煤炭的合理价格区间。此方法特别适用于需要参考全国统一标准的大型企业。' 
                      : 'We track real-time data from the China Coastal Coal Price Index (CCI) and China Electricity Coal Trading Center (CECT), and calculate the reasonable local coal price range by adjusting for freight, taxes, and other costs based on the historical price correlation between local and port prices. This method is particularly suitable for large enterprises that need to reference a nationally unified standard.'}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <div className="bg-blue-50 px-4 py-2 rounded-full">
                    <span className="text-sm text-blue-800">
                      {i18n.language === 'cn' ? '精度: ±3%' : 'Accuracy: ±3%'}
                    </span>
                  </div>
                </CardFooter>
              </Card>

              <Card className="border border-green-200 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <img src={TransactionDataSvg} alt="Transaction Data Method" className="w-16 h-16" />
                  </div>
                  <CardTitle className="text-center text-green-800">
                    {i18n.language === 'cn' ? '历史交易数据法' : 'Historical Transaction Data Method'}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {i18n.language === 'cn' 
                      ? '基于真实交易记录的价格分析' 
                      : 'Price analysis based on real transaction records'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {i18n.language === 'cn' 
                      ? '我们收集并分析大量真实煤炭交易数据，包括交易价格、交易量、煤种、热值等关键信息，通过大数据分析和机器学习算法，识别价格趋势和模式，提供基于实际市场行为的价格估算。此方法的优势在于数据真实可靠，能够反映真实的市场交易情况。' 
                      : 'We collect and analyze a large amount of real coal transaction data, including transaction prices, volumes, coal types, calorific values, and other key information. Through big data analysis and machine learning algorithms, we identify price trends and patterns, providing price estimates based on actual market behavior. The advantage of this method lies in its reliable data that reflects actual market transactions.'}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <div className="bg-green-50 px-4 py-2 rounded-full">
                    <span className="text-sm text-green-800">
                      {i18n.language === 'cn' ? '精度: ±2%' : 'Accuracy: ±2%'}
                    </span>
                  </div>
                </CardFooter>
              </Card>

              <Card className="border border-red-200 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <img src={LocalMarketSvg} alt="Local Market Method" className="w-16 h-16" />
                  </div>
                  <CardTitle className="text-center text-red-800">
                    {i18n.language === 'cn' ? '煤仓地销估价法' : 'Local Market Estimation Method'}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {i18n.language === 'cn' 
                      ? '基于当地市场特性的精准估价' 
                      : 'Precise estimation based on local market characteristics'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {i18n.language === 'cn' 
                      ? '我们的专业分析师团队通过实地调研，收集当地煤矿、煤仓和交易市场的一手数据，综合考虑当地特有的煤炭品质、供需关系、季节性因素和运输条件等，形成针对特定地区的精准价格评估。此方法特别适用于需要了解区域市场特性的买家和卖家。' 
                      : 'Our team of professional analysts collects first-hand data from local coal mines, storage facilities, and trading markets through field research. By comprehensively considering local-specific factors such as coal quality, supply-demand relationships, seasonal factors, and transportation conditions, we form precise price assessments for specific regions. This method is particularly suitable for buyers and sellers who need to understand regional market characteristics.'}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <div className="bg-red-50 px-4 py-2 rounded-full">
                    <span className="text-sm text-red-800">
                      {i18n.language === 'cn' ? '精度: ±1.5%' : 'Accuracy: ±1.5%'}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features/Demo Section */}
      <section className="py-16" id="features">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {i18n.language === 'cn' ? '价格分析系统功能' : 'Price Analysis System Features'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {i18n.language === 'cn' 
                  ? '探索我们先进的煤炭价格分析系统的关键功能' 
                  : 'Explore key features of our advanced coal price analysis system'}
              </p>
            </div>

            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-8">
                <TabsTrigger value="dashboard">
                  {i18n.language === 'cn' ? '价格仪表板' : 'Price Dashboard'}
                </TabsTrigger>
                <TabsTrigger value="forecasting">
                  {i18n.language === 'cn' ? '价格预测' : 'Price Forecasting'}
                </TabsTrigger>
                <TabsTrigger value="analysis">
                  {i18n.language === 'cn' ? '多维分析' : 'Multi-dimensional Analysis'}
                </TabsTrigger>
                <TabsTrigger value="alerts">
                  {i18n.language === 'cn' ? '价格提醒' : 'Price Alerts'}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard" className="border rounded-lg p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">
                      {i18n.language === 'cn' ? '实时价格仪表板' : 'Real-time Price Dashboard'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {i18n.language === 'cn' 
                        ? '我们的价格仪表板提供全面的煤炭价格信息，包括不同地区、不同煤种的价格比较，历史价格趋势图表，以及价格波动分析。通过直观的数据可视化，帮助您快速把握市场动态。' 
                        : 'Our price dashboard provides comprehensive coal price information, including price comparisons for different regions and coal types, historical price trend charts, and price fluctuation analysis. Through intuitive data visualization, it helps you quickly grasp market dynamics.'}
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '多源价格数据整合' : 'Multi-source price data integration'}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '价格趋势可视化' : 'Price trend visualization'}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '区域价格对比' : 'Regional price comparison'}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '可自定义视图' : 'Customizable views'}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <img
                      src="/src/assets/images/price-estimation.svg"
                      alt="Price Dashboard"
                      className="w-full h-auto bg-white"
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="forecasting" className="border rounded-lg p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">
                      {i18n.language === 'cn' ? '智能价格预测' : 'Intelligent Price Forecasting'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {i18n.language === 'cn' 
                        ? '基于先进的机器学习算法和时间序列分析，我们的系统能够预测未来煤炭价格走势，帮助企业在采购和销售决策中占据先机。预测模型考虑了季节性因素、政策变化、国际市场动态等多种影响因素。' 
                        : 'Based on advanced machine learning algorithms and time series analysis, our system can predict future coal price trends, helping enterprises gain an advantage in purchasing and sales decisions. The prediction model considers seasonal factors, policy changes, international market dynamics, and many other influencing factors.'}
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '短期和长期价格预测' : 'Short-term and long-term price forecasts'}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '多场景预测分析' : 'Multi-scenario forecast analysis'}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '预测精度评估' : 'Forecast accuracy assessment'}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '价格影响因素分析' : 'Price impact factor analysis'}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg p-4">
                    <div className="h-64 w-full bg-gray-100 rounded flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-100 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                          </svg>
                        </div>
                        <h4 className="text-lg font-medium mb-2">
                          {i18n.language === 'cn' ? '价格预测可视化' : 'Price Forecast Visualization'}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          {i18n.language === 'cn' 
                            ? '登录系统查看详细的价格预测分析' 
                            : 'Log in to the system to view detailed price forecast analysis'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="analysis" className="border rounded-lg p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">
                      {i18n.language === 'cn' ? '多维价格分析' : 'Multi-dimensional Price Analysis'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {i18n.language === 'cn' 
                        ? '我们的系统支持多维度煤炭价格分析，包括按地区、煤种、热值、含硫量等关键参数进行价格对比和分析。您可以深入了解不同因素对煤炭价格的影响，识别价值洼地和高溢价区域。' 
                        : 'Our system supports multi-dimensional coal price analysis, including price comparison and analysis by region, coal type, calorific value, sulfur content, and other key parameters. You can gain in-depth insights into how different factors affect coal prices, identifying value troughs and high premium areas.'}
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '参数敏感性分析' : 'Parameter sensitivity analysis'}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '地区价差分析' : 'Regional price differential analysis'}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '煤种价值评估' : 'Coal type value assessment'}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '交叉市场比较' : 'Cross-market comparison'}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg p-4">
                    <div className="h-64 w-full bg-gray-100 rounded flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-100 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <h4 className="text-lg font-medium mb-2">
                          {i18n.language === 'cn' ? '多维分析工具' : 'Multi-dimensional Analysis Tool'}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          {i18n.language === 'cn' 
                            ? '登录系统使用交互式多维分析工具' 
                            : 'Log in to the system to use the interactive multi-dimensional analysis tool'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="alerts" className="border rounded-lg p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">
                      {i18n.language === 'cn' ? '智能价格提醒' : 'Intelligent Price Alerts'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {i18n.language === 'cn' 
                        ? '设置您感兴趣的煤炭价格阈值，当价格达到或突破设定值时，系统会通过短信、邮件或应用通知及时提醒您，帮助您把握最佳交易时机，避免错失市场机会。' 
                        : 'Set coal price thresholds that interest you, and the system will promptly notify you via SMS, email, or app notifications when prices reach or break through the set values, helping you seize the best trading opportunities and avoid missing market opportunities.'}
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '自定义价格阈值' : 'Customizable price thresholds'}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '多渠道通知' : 'Multi-channel notifications'}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '价格波动预警' : 'Price fluctuation alerts'}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '趋势拐点提醒' : 'Trend inflection point alerts'}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg p-4">
                    <div className="h-64 w-full bg-gray-100 rounded flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-100 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                        </div>
                        <h4 className="text-lg font-medium mb-2">
                          {i18n.language === 'cn' ? '价格提醒系统' : 'Price Alert System'}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          {i18n.language === 'cn' 
                            ? '登录系统设置您的价格提醒偏好' 
                            : 'Log in to the system to set your price alert preferences'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50" id="benefits">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {i18n.language === 'cn' ? '使用我们服务的优势' : 'Benefits of Using Our Service'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {i18n.language === 'cn' 
                  ? '精确的煤价估算为您的业务带来显著优势' 
                  : 'Accurate coal price estimation brings significant advantages to your business'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                  <span className="text-blue-600 text-xl">📈</span>
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {i18n.language === 'cn' ? '优化采购和销售决策' : 'Optimize Purchasing and Sales Decisions'}
                </h3>
                <p className="text-gray-600">
                  {i18n.language === 'cn' 
                    ? '通过准确的价格估算和预测，您可以在最有利的时机进行煤炭采购或销售，避免高价采购和低价销售的风险。我们的多维价格分析帮助您识别最具价值的交易机会，显著提高采购和销售的利润率。' 
                    : 'With accurate price estimates and forecasts, you can make coal purchases or sales at the most advantageous times, avoiding the risks of high-price purchases and low-price sales. Our multi-dimensional price analysis helps you identify the most valuable trading opportunities, significantly increasing the profit margins of your purchases and sales.'}
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      {i18n.language === 'cn' ? '把握最佳交易时机' : 'Seize the best trading opportunities'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      {i18n.language === 'cn' ? '提高采购和销售利润率' : 'Increase purchase and sales profit margins'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      {i18n.language === 'cn' ? '降低价格风险' : 'Reduce price risks'}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                  <span className="text-blue-600 text-xl">🔎</span>
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {i18n.language === 'cn' ? '增强市场洞察力' : 'Enhance Market Insights'}
                </h3>
                <p className="text-gray-600">
                  {i18n.language === 'cn' 
                    ? '我们的价格分析系统提供深入的市场洞察，帮助您了解价格变动的驱动因素，预测市场趋势，把握政策变化的影响。这些洞察不仅支持您的短期交易决策，还可以指导长期战略规划和资源配置。' 
                    : 'Our price analysis system provides deep market insights, helping you understand the drivers of price changes, predict market trends, and grasp the impact of policy changes. These insights not only support your short-term trading decisions but can also guide long-term strategic planning and resource allocation.'}
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      {i18n.language === 'cn' ? '把握价格变动驱动因素' : 'Understand price movement drivers'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      {i18n.language === 'cn' ? '支持战略决策和规划' : 'Support strategic decisions and planning'}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">
                      {i18n.language === 'cn' ? '行业趋势前瞻' : 'Industry trend foresight'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              {i18n.language === 'cn' ? '准备获取精准的煤炭价格估算？' : 'Ready to Get Precise Coal Price Estimates?'}
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              {i18n.language === 'cn' 
                ? '联系我们获取详细的价格分析报告，或申请试用我们的价格估算系统' 
                : 'Contact us for detailed price analysis reports or apply for a trial of our price estimation system'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/consultation">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                  {i18n.language === 'cn' ? '申请价格报告' : 'Request Price Report'}
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  {i18n.language === 'cn' ? '联系专家顾问' : 'Contact Expert Consultant'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}