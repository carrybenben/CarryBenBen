import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';

// Import hero background
import heroBackground from '@/assets/images/hero-background.svg';

// Import mock visualizations and charts
import coalPriceChart from '@/assets/charts/coal-price-chart.svg';
import coalProductionChart from '@/assets/charts/coal-production-chart.svg';
import coalQualityRadar from '@/assets/charts/coal-quality-radar.svg';
import dashboardMockup from '@/assets/mockups/dashboard-mockup.svg';
import thermalImaging from '@/assets/mockups/thermal-imaging.svg';
import weightEstimation from '@/assets/mockups/weight-estimation-3d.svg';
import priceEstimation from '@/assets/mockups/price-estimation.svg';
import qualityTesting from '@/assets/mockups/quality-testing.svg';
import transportTracking from '@/assets/mockups/transport-tracking.svg';
import collateralManagement from '@/assets/mockups/collateral-management.svg';

// Define the CoalService type here (simplified)
interface CoalService {
  id: number;
  slug: string;
  icon: string;
  nameEn: string;
  nameCn: string;
  descriptionEn: string;
  descriptionCn: string;
}

export default function Home() {
  const { t, i18n } = useTranslation();
  
  // Fetch services from the API
  const { data: services = [], isLoading } = useQuery<CoalService[]>({
    queryKey: ['/api/coal-services'],
    retry: false
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="text-white py-20 bg-no-repeat bg-cover bg-center relative" 
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">
                {t('hero.title')}
              </h1>
              <p className="text-xl mb-8 text-slate-300">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/services">
                  <Button size="lg" className="bg-gradient text-white font-medium">
                    {t('hero.cta')}
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    {t('hero.secondary')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <img 
                    src={dashboardMockup} 
                    alt="Coal Storage Monitoring" 
                    className="w-full h-auto rounded-lg shadow-lg bg-slate-800/80 p-4 transition-all duration-500 hover:scale-105"
                  />
                </div>
                <div>
                  <img 
                    src={weightEstimation} 
                    alt="Weight Estimation" 
                    className="w-full h-auto rounded-lg shadow-lg bg-slate-800/80 p-4 transition-all duration-500 hover:scale-105"
                  />
                </div>
                <div>
                  <img 
                    src={thermalImaging} 
                    alt="Thermal Imaging" 
                    className="w-full h-auto rounded-lg shadow-lg bg-slate-800/80 p-4 transition-all duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90"></div>
      </section>
      
      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('services.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('services.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Loading skeleton
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg feature-card border border-gray-100">
                  <div className="w-12 h-12 mb-4 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))
            ) : services?.length ? (
              // Render actual services
              services.map((service: CoalService) => (
                <div key={service.id} className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] feature-card border border-gray-100">
                  <div className="w-20 h-20 mb-4 bg-primary/5 rounded-lg p-1 overflow-hidden">
                    <img 
                      src={`${service.icon}`} 
                      alt={i18n.language === 'cn' ? service.nameCn : service.nameEn}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {i18n.language === 'cn' ? service.nameCn : service.nameEn}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {i18n.language === 'cn' ? service.descriptionCn : service.descriptionEn}
                  </p>
                  <Link href={`/services/${service.slug}`}>
                    <Button variant="link" className="p-0 text-primary hover:text-primary/80">
                      {t('services.viewDetails')} →
                    </Button>
                  </Link>
                </div>
              ))
            ) : (
              // Fallback for empty services
              <div className="col-span-3 text-center py-20">
                <p className="text-gray-500">Loading services...</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Consultation Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="bg-gradient-to-r from-blue-700/10 to-purple-700/10 p-1 rounded-lg mb-4 w-fit">
                <p className="text-primary text-sm px-3 py-1 font-medium">Deepseek-R1 AI Model</p>
              </div>
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                {t('consultation.title')}
              </h2>
              <p className="text-gray-600 mb-6">
                {t('consultation.description')}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 bg-green-100 text-green-600 rounded-full">✓</span>
                  <span>{i18n.language === 'cn' ? '先进的AI技术分析' : 'Advanced AI-Powered Analysis'}</span>
                </li>
                <li className="flex items-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 bg-green-100 text-green-600 rounded-full">✓</span>
                  <span>{i18n.language === 'cn' ? '专业行业知识库' : 'Expert Industry Knowledge'}</span>
                </li>
                <li className="flex items-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 bg-green-100 text-green-600 rounded-full">✓</span>
                  <span>{i18n.language === 'cn' ? '实时数据集成' : 'Real-time Data Integration'}</span>
                </li>
              </ul>
              <Link href="/consultation">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90">
                  {t('consultation.cta')}
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2">
              <img 
                src={qualityTesting} 
                alt="AI Coal Industry Consultation"
                className="w-full h-auto max-w-md mx-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Data Visualization Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{i18n.language === 'cn' ? '数据可视化' : 'Data Visualization'}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {i18n.language === 'cn' 
                ? '通过先进的数据可视化技术，实时监控和分析煤炭产业关键指标' 
                : 'Monitor and analyze key coal industry metrics through advanced data visualization techniques'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">{i18n.language === 'cn' ? '煤炭价格趋势' : 'Coal Price Trends'}</h3>
              <img 
                src={coalPriceChart} 
                alt="Coal Price Chart" 
                className="w-full h-auto rounded-lg"
              />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">{i18n.language === 'cn' ? '煤炭产量分析' : 'Coal Production Analysis'}</h3>
              <img 
                src={coalProductionChart} 
                alt="Coal Production Chart" 
                className="w-full h-auto rounded-lg"
              />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">{i18n.language === 'cn' ? '煤炭质量参数' : 'Coal Quality Parameters'}</h3>
              <img 
                src={coalQualityRadar} 
                alt="Coal Quality Radar" 
                className="w-full h-auto rounded-lg"
              />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">{i18n.language === 'cn' ? '运输跟踪系统' : 'Transport Tracking System'}</h3>
              <img 
                src={transportTracking} 
                alt="Transport Tracking" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/services">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90">
                {i18n.language === 'cn' ? '探索更多服务功能' : 'Explore More Features'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Demo Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{i18n.language === 'cn' ? '高级功能展示' : 'Advanced Features'}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {i18n.language === 'cn' 
                ? '体验我们平台提供的创新煤炭行业解决方案' 
                : 'Experience innovative coal industry solutions offered on our platform'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src={priceEstimation} 
                alt="Price Estimation System" 
                className="w-full h-auto"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{i18n.language === 'cn' ? '价格估算系统' : 'Price Estimation System'}</h3>
                <p className="text-gray-600 mb-4">
                  {i18n.language === 'cn' 
                    ? '基于多项参数的智能煤炭价格估算，结合市场趋势提供精准预测' 
                    : 'Intelligent coal price estimation based on multiple parameters, providing accurate forecasts combined with market trends'}
                </p>
                <Link href="/services/price-estimation">
                  <Button variant="link" className="p-0 text-primary hover:text-primary/80">
                    {i18n.language === 'cn' ? '了解详情' : 'Learn More'} →
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src={collateralManagement} 
                alt="Coal Product Collateral Management" 
                className="w-full h-auto"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{i18n.language === 'cn' ? '产品抵押担保管理' : 'Product Collateral Management'}</h3>
                <p className="text-gray-600 mb-4">
                  {i18n.language === 'cn' 
                    ? '全面的煤炭产品抵押担保管理系统，优化资产流动性和风险控制' 
                    : 'Comprehensive coal product collateral management system, optimizing asset liquidity and risk control'}
                </p>
                <Link href="/services/product-collateral">
                  <Button variant="link" className="p-0 text-primary hover:text-primary/80">
                    {i18n.language === 'cn' ? '了解详情' : 'Learn More'} →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
