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
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import SVG assets
import ProductCollateralSvg from '@/assets/images/product-collateral.svg';
import WarehousingIcon from '@/assets/images/product-collateral/warehousing.svg';
import FinancingIcon from '@/assets/images/product-collateral/financing.svg';
import PriceAlertIcon from '@/assets/images/product-collateral/price-alert.svg';
import TimeAlertIcon from '@/assets/images/product-collateral/time-alert.svg';

export default function ProductCollateral() {
  const { t, i18n } = useTranslation();

  // Set document title
  useEffect(() => {
    document.title = i18n.language === 'cn' ? '煤品货押服务 | 煤炭服务' : 'Coal Product Collateral | Coal Services';
  }, [i18n.language]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {i18n.language === 'cn' ? '煤品货押服务' : 'Coal Product Collateral Services'}
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              {i18n.language === 'cn'
                ? '安全、高效的煤炭产品抵押融资解决方案'
                : 'Secure and efficient coal product collateral financing solutions'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="#process">
                <Button size="lg" className="bg-white text-indigo-900 hover:bg-gray-100">
                  {i18n.language === 'cn' ? '了解业务流程' : 'Explore Process'}
                </Button>
              </Link>
              <Link href="/consultation">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  {i18n.language === 'cn' ? '申请融资方案' : 'Apply for Financing'}
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
                  {i18n.language === 'cn' ? '煤炭产品抵押融资解决方案' : 'Coal Product Collateral Financing Solution'}
                </h2>
                <p className="text-gray-600 mb-4">
                  {i18n.language === 'cn'
                    ? '我们的煤品货押服务为煤炭贸易提供了全新的融资模式，帮助企业盘活资产、提高资金利用效率，同时为资金方提供安全可靠的投资渠道。'
                    : 'Our coal product collateral service provides a new financing model for coal trading, helping enterprises revitalize assets and improve capital utilization efficiency, while providing a safe and reliable investment channel for financial institutions.'}
                </p>
                <p className="text-gray-600 mb-6">
                  {i18n.language === 'cn'
                    ? '通过先进的仓储监管系统和智能风险预警机制，我们确保整个货押过程安全可控，为交易各方创造共赢局面。'
                    : 'Through advanced storage supervision systems and intelligent risk early warning mechanisms, we ensure that the entire collateral process is safe and controllable, creating a win-win situation for all parties involved in the transaction.'}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-indigo-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {i18n.language === 'cn' ? '安全性' : 'Security'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {i18n.language === 'cn'
                          ? '专业仓储管理和多重风险控制机制'
                          : 'Professional storage management and multiple risk control mechanisms'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-indigo-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {i18n.language === 'cn' ? '高效性' : 'Efficiency'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {i18n.language === 'cn'
                          ? '快速审批流程和灵活的融资方案'
                          : 'Rapid approval process and flexible financing solutions'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-indigo-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {i18n.language === 'cn' ? '智能预警' : 'Intelligent Warning'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {i18n.language === 'cn'
                          ? '价格和时间双重风险预警系统'
                          : 'Dual risk warning system for price and time'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img
                    src={ProductCollateralSvg}
                    alt="Coal Product Collateral"
                    className="w-full h-full object-contain bg-white p-4"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-100/30 rounded-full z-[-1]"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-indigo-100/20 rounded-full z-[-1]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Process Section */}
      <section className="py-16 bg-gray-50" id="process">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {i18n.language === 'cn' ? '煤品货押业务流程' : 'Coal Product Collateral Business Process'}
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {i18n.language === 'cn'
                  ? '我们的煤品货押服务提供完整的业务流程，从入仓到融资再到出仓，每一步都有严格的监管和风险控制'
                  : 'Our coal product collateral service provides a complete business process, from warehousing to financing to release, with strict supervision and risk control at every step'}
              </p>
            </div>

            <div className="relative">
              {/* Process Flow Steps */}
              <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-1 bg-indigo-200 -translate-y-1/2 z-0"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                {/* Step 1: Storage Entry */}
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-600 text-white rounded-full text-xs flex items-center justify-center">1</span>
                    <img src={WarehousingIcon} alt="Warehousing" className="w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    {i18n.language === 'cn' ? '煤炭入仓' : 'Coal Storage Entry'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {i18n.language === 'cn'
                      ? '客户将煤炭产品运入指定监管仓库，由专业人员验收并记录产品数量、质量等信息'
                      : 'Clients transport coal products to designated supervised warehouses, where professionals inspect and record product quantity, quality, and other information'}
                  </p>
                </div>

                {/* Step 2: Financing */}
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-600 text-white rounded-full text-xs flex items-center justify-center">2</span>
                    <img src={FinancingIcon} alt="Financing" className="w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    {i18n.language === 'cn' ? '货押融资' : 'Collateral Financing'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {i18n.language === 'cn'
                      ? '资金方根据真实采购记录和货值评估，提供一定比例的货押融资，资金直接支付给客户'
                      : 'Financial institutions provide a certain percentage of financing based on real purchase records and cargo value assessment, with funds paid directly to clients'}
                  </p>
                </div>

                {/* Step 3: Risk Monitoring */}
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-600 text-white rounded-full text-xs flex items-center justify-center">3</span>
                    <img src={PriceAlertIcon} alt="Risk Monitoring" className="w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    {i18n.language === 'cn' ? '风险监控' : 'Risk Monitoring'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {i18n.language === 'cn'
                      ? '在货物存储期间，系统持续监控煤炭价格和货押时长，并提供实时风险预警'
                      : 'During storage, the system continuously monitors coal prices and collateral duration, providing real-time risk warnings'}
                  </p>
                </div>

                {/* Step 4: Release or Disposal */}
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-600 text-white rounded-full text-xs flex items-center justify-center">4</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-indigo-600">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    {i18n.language === 'cn' ? '赎回出仓' : 'Redemption and Release'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {i18n.language === 'cn'
                      ? '客户偿还融资款项后，可办理煤炭出仓手续；如遇风险情况，则按预设机制处理'
                      : 'After clients repay the financing, they can process coal release procedures; risk situations are handled according to preset mechanisms'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Warning Systems Section */}
      <section className="py-16" id="warning-systems">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {i18n.language === 'cn' ? '双重风险预警机制' : 'Dual Risk Warning Mechanism'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {i18n.language === 'cn'
                  ? '我们的系统采用价格和时间双重预警机制，确保货押过程的安全可控'
                  : 'Our system employs dual price and time warning mechanisms to ensure the collateral process is safe and controllable'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Price Warning Mechanism */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-red-100">
                <div className="bg-gradient-to-r from-red-50 to-white p-8">
                  <div className="flex items-center mb-6">
                    <img src={PriceAlertIcon} alt="Price Alert" className="w-16 h-16 mr-4" />
                    <h3 className="text-2xl font-bold text-red-700">
                      {i18n.language === 'cn' ? '价格预警机制' : 'Price Warning Mechanism'}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    {i18n.language === 'cn'
                      ? '系统实时监控煤炭市场价格，将当前煤炭价格与融资时的价格进行比较。当价格下跌至预设警戒线时，系统自动触发风险预警，通知相关方采取措施。'
                      : 'The system monitors coal market prices in real-time, comparing current coal prices with prices at the time of financing. When prices fall to preset warning levels, the system automatically triggers risk warnings, notifying relevant parties to take measures.'}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-red-600">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {i18n.language === 'cn' ? '实时价格监控' : 'Real-time Price Monitoring'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {i18n.language === 'cn'
                            ? '利用煤价估算系统实时追踪市场价格变化'
                            : 'Using the coal price estimation system to track market price changes in real-time'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-red-600">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {i18n.language === 'cn' ? '预设警戒线' : 'Preset Warning Threshold'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {i18n.language === 'cn'
                            ? '根据融资比例设定价格警戒线，通常为融资时价格的80%-85%'
                            : 'Setting price warning thresholds based on financing ratios, typically 80%-85% of the price at financing time'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-red-600">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {i18n.language === 'cn' ? '风险处理机制' : 'Risk Handling Mechanism'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {i18n.language === 'cn'
                            ? '价格低于警戒线时，客户需追加保证金、提前赎回或授权处置'
                            : 'When prices fall below warning thresholds, clients need to add margin, redeem early, or authorize disposal'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Time Warning Mechanism */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-amber-100">
                <div className="bg-gradient-to-r from-amber-50 to-white p-8">
                  <div className="flex items-center mb-6">
                    <img src={TimeAlertIcon} alt="Time Alert" className="w-16 h-16 mr-4" />
                    <h3 className="text-2xl font-bold text-amber-700">
                      {i18n.language === 'cn' ? '时间预警机制' : 'Time Warning Mechanism'}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    {i18n.language === 'cn'
                      ? '系统跟踪每批货押煤炭的存储时间，并根据预设的最长融资期限进行监控。当接近期限时，系统会自动发出提醒，以防止逾期风险。'
                      : 'The system tracks the storage time of each batch of collateralized coal and monitors according to preset maximum financing periods. When approaching the time limit, the system automatically sends reminders to prevent overdue risks.'}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-amber-600">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {i18n.language === 'cn' ? '融资期限设定' : 'Financing Period Setting'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {i18n.language === 'cn'
                            ? '根据煤种和市场情况设定适当的货押融资期限，一般为30-90天'
                            : 'Setting appropriate collateral financing periods based on coal type and market conditions, generally 30-90 days'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-amber-600">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {i18n.language === 'cn' ? '分级提醒' : 'Tiered Reminders'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {i18n.language === 'cn'
                            ? '在到期前7天、3天和1天发送多级提醒，确保客户及时安排赎回'
                            : 'Sending multi-level reminders 7 days, 3 days, and 1 day before expiration to ensure clients arrange redemption in time'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-amber-600">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {i18n.language === 'cn' ? '超期处理' : 'Overdue Processing'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {i18n.language === 'cn'
                            ? '超出融资期限后，启动合同约定的风险处置流程，保障资金方权益'
                            : 'After exceeding the financing period, initiating the contractually agreed risk disposal process to protect the interests of financial institutions'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="py-16 bg-gray-50" id="features">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {i18n.language === 'cn' ? '平台功能与优势' : 'Platform Features and Advantages'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {i18n.language === 'cn'
                  ? '我们的货押平台提供全方位的功能，为煤炭贸易和融资提供强有力的支持'
                  : 'Our collateral platform provides comprehensive functions, offering strong support for coal trading and financing'}
              </p>
            </div>

            <Tabs defaultValue="warehousing" className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-8">
                <TabsTrigger value="warehousing">
                  {i18n.language === 'cn' ? '仓储管理' : 'Warehousing Management'}
                </TabsTrigger>
                <TabsTrigger value="financing">
                  {i18n.language === 'cn' ? '融资方案' : 'Financing Solutions'}
                </TabsTrigger>
                <TabsTrigger value="monitoring">
                  {i18n.language === 'cn' ? '监控预警' : 'Monitoring & Warning'}
                </TabsTrigger>
                <TabsTrigger value="settlement">
                  {i18n.language === 'cn' ? '结算交割' : 'Settlement & Delivery'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="warehousing" className="border rounded-lg p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">
                      {i18n.language === 'cn' ? '智能仓储管理系统' : 'Intelligent Warehousing Management System'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {i18n.language === 'cn'
                        ? '我们的智能仓储管理系统整合了先进的煤炭监管技术，提供全方位的煤炭仓储管理功能，确保货押煤炭的安全存储和精确监控。'
                        : 'Our intelligent warehousing management system integrates advanced coal supervision technology, providing comprehensive coal storage management functions to ensure the safe storage and precise monitoring of collateralized coal.'}
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="text-indigo-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '视频监控与AI识别' : 'Video monitoring and AI recognition'}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-indigo-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '入仓验收和质量检测' : 'Storage acceptance and quality inspection'}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-indigo-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '库存实时盘点和管理' : 'Real-time inventory counting and management'}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-indigo-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '电子围栏和异常报警' : 'Electronic fence and abnormal alarms'}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg p-4">
                    <div className="h-64 w-full bg-indigo-50 rounded flex items-center justify-center">
                      <img src={WarehousingIcon} alt="Warehousing Management" className="w-32 h-32" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="financing" className="border rounded-lg p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">
                      {i18n.language === 'cn' ? '灵活融资方案' : 'Flexible Financing Solutions'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {i18n.language === 'cn'
                        ? '我们根据不同客户的需求和煤炭市场状况，提供多种灵活的融资方案，帮助企业实现资金与煤炭资产的高效匹配和流转。'
                        : 'Based on the needs of different clients and coal market conditions, we provide various flexible financing solutions to help enterprises achieve efficient matching and circulation of funds and coal assets.'}
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="text-indigo-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '最高可达货值80%的融资比例' : 'Financing ratio up to 80% of cargo value'}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-indigo-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '基于真实采购记录的价值评估' : 'Value assessment based on real purchase records'}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-indigo-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '个性化融资期限和条件' : 'Personalized financing terms and conditions'}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-indigo-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '快速审批和放款流程' : 'Rapid approval and disbursement process'}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg p-4">
                    <div className="h-64 w-full bg-indigo-50 rounded flex items-center justify-center">
                      <img src={FinancingIcon} alt="Financing Solutions" className="w-32 h-32" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="monitoring" className="border rounded-lg p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">
                      {i18n.language === 'cn' ? '全方位监控与预警' : 'Comprehensive Monitoring and Warning'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {i18n.language === 'cn'
                        ? '我们的系统实现了对货押煤炭的全方位监控，并提供多层次的风险预警机制，确保各方利益得到有效保障。'
                        : 'Our system achieves comprehensive monitoring of collateralized coal and provides multi-level risk warning mechanisms to ensure that the interests of all parties are effectively protected.'}
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="text-indigo-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '价格波动实时监控与预警' : 'Real-time monitoring and warning of price fluctuations'}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-indigo-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '融资期限倒计时与提醒' : 'Financing period countdown and reminders'}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-indigo-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '库存安全与质量监控' : 'Inventory safety and quality monitoring'}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-indigo-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '多渠道预警通知' : 'Multi-channel warning notifications'}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg p-4">
                    <div className="h-64 w-full bg-indigo-50 rounded flex items-center justify-center">
                      <div className="grid grid-cols-2 gap-4">
                        <img src={PriceAlertIcon} alt="Price Alert" className="w-24 h-24" />
                        <img src={TimeAlertIcon} alt="Time Alert" className="w-24 h-24" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settlement" className="border rounded-lg p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">
                      {i18n.language === 'cn' ? '高效结算与交割' : 'Efficient Settlement and Delivery'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {i18n.language === 'cn'
                        ? '我们提供快速、透明的结算和交割流程，帮助客户便捷地完成货押融资的最后环节，实现煤炭资产的顺利流转。'
                        : 'We provide a fast and transparent settlement and delivery process, helping clients conveniently complete the final stage of collateral financing and achieve smooth circulation of coal assets.'}
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="text-indigo-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '在线还款和结算' : 'Online repayment and settlement'}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-indigo-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '一键申请煤炭出仓' : 'One-click application for coal release'}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-indigo-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '电子单据和凭证' : 'Electronic documents and vouchers'}
                        </span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-indigo-500 mr-2">✓</span>
                        <span className="text-gray-700">
                          {i18n.language === 'cn' ? '全流程记录和追溯' : 'Full process recording and traceability'}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg p-4">
                    <div className="h-64 w-full bg-indigo-50 rounded flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-indigo-100 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h4 className="text-lg font-medium mb-2">
                          {i18n.language === 'cn' ? '结算交割系统' : 'Settlement & Delivery System'}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          {i18n.language === 'cn'
                            ? '安全高效的融资结算与煤炭交割管理'
                            : 'Safe and efficient financing settlement and coal delivery management'}
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
      <section className="py-16" id="benefits">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {i18n.language === 'cn' ? '煤品货押的价值与优势' : 'Value and Advantages of Coal Product Collateral'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {i18n.language === 'cn'
                  ? '煤品货押服务为煤炭产业链各方创造显著价值，助力行业高质量发展'
                  : 'Coal product collateral services create significant value for all parties in the coal industry chain, contributing to high-quality industry development'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border border-indigo-200 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <CardTitle>
                    {i18n.language === 'cn' ? '煤炭贸易商' : 'Coal Traders'}
                  </CardTitle>
                  <CardDescription>
                    {i18n.language === 'cn'
                      ? '盘活库存，提高资金利用效率'
                      : 'Revitalize inventory and improve capital utilization efficiency'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2 mt-1">•</span>
                      <span className="text-gray-600">
                        {i18n.language === 'cn'
                          ? '将静态煤炭库存转化为流动资金，提高资金周转率'
                          : 'Convert static coal inventory into working capital, increasing capital turnover rate'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2 mt-1">•</span>
                      <span className="text-gray-600">
                        {i18n.language === 'cn'
                          ? '降低资金占用成本，扩大业务规模和交易量'
                          : 'Reduce capital occupation costs, expand business scale and transaction volume'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2 mt-1">•</span>
                      <span className="text-gray-600">
                        {i18n.language === 'cn'
                          ? '灵活应对市场波动，把握最佳交易时机'
                          : 'Flexibly respond to market fluctuations and seize the best trading opportunities'}
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border border-indigo-200 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <CardTitle>
                    {i18n.language === 'cn' ? '资金方/金融机构' : 'Financial Institutions'}
                  </CardTitle>
                  <CardDescription>
                    {i18n.language === 'cn'
                      ? '安全可靠的投资渠道和资产配置'
                      : 'Safe and reliable investment channels and asset allocation'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2 mt-1">•</span>
                      <span className="text-gray-600">
                        {i18n.language === 'cn'
                          ? '有实物抵押的安全投资，风险可控'
                          : 'Safe investment with physical collateral, controllable risks'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2 mt-1">•</span>
                      <span className="text-gray-600">
                        {i18n.language === 'cn'
                          ? '双重预警机制，保障资金安全'
                          : 'Dual warning mechanisms to ensure fund security'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2 mt-1">•</span>
                      <span className="text-gray-600">
                        {i18n.language === 'cn'
                          ? '稳定的收益回报，拓展能源行业业务'
                          : 'Stable returns, expanding business in the energy sector'}
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border border-indigo-200 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <CardTitle>
                    {i18n.language === 'cn' ? '行业整体' : 'Industry as a Whole'}
                  </CardTitle>
                  <CardDescription>
                    {i18n.language === 'cn'
                      ? '促进产业链整合与资源优化配置'
                      : 'Facilitate industry chain integration and resource optimization'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2 mt-1">•</span>
                      <span className="text-gray-600">
                        {i18n.language === 'cn'
                          ? '促进煤炭流通效率提升，降低社会库存成本'
                          : 'Improve coal circulation efficiency and reduce social inventory costs'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2 mt-1">•</span>
                      <span className="text-gray-600">
                        {i18n.language === 'cn'
                          ? '优化煤炭资源配置，平抑市场价格波动'
                          : 'Optimize coal resource allocation and moderate market price fluctuations'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2 mt-1">•</span>
                      <span className="text-gray-600">
                        {i18n.language === 'cn'
                          ? '提高行业标准化和信息化水平'
                          : 'Improve industry standardization and information level'}
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 to-indigo-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              {i18n.language === 'cn' ? '开启煤品货押融资之旅' : 'Start Your Coal Product Collateral Financing Journey'}
            </h2>
            <p className="text-xl mb-8 text-indigo-100">
              {i18n.language === 'cn'
                ? '联系我们获取详细的业务方案，或申请加入我们的煤品货押平台'
                : 'Contact us for detailed business solutions or apply to join our coal product collateral platform'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/consultation">
                <Button size="lg" className="bg-white text-indigo-900 hover:bg-indigo-50">
                  {i18n.language === 'cn' ? '申请融资方案' : 'Apply for Financing'}
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