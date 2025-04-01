import { useEffect, useState } from 'react';
import { Link, useRoute } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CaseStudy {
  id: number;
  titleEn: string;
  titleCn: string;
  summaryEn: string;
  summaryCn: string;
  descriptionEn: string;
  descriptionCn: string;
  outcomeEn: string;
  outcomeCn: string;
  imageUrl: string;
  serviceCategory: string[];
  year: number;
  region: string;
  challengeEn?: string;
  challengeCn?: string;
  solutionEn?: string;
  solutionCn?: string;
  testimonyEn?: string;
  testimonyCn?: string;
  testimonialAuthorEn?: string;
  testimonialAuthorCn?: string;
  testimonialPositionEn?: string;
  testimonialPositionCn?: string;
  resultStatsEn?: { label: string; value: string }[];
  resultStatsCn?: { label: string; value: string }[];
}

interface ServiceCategory {
  id: string;
  nameEn: string;
  nameCn: string;
}

// Service categories
const serviceCategories: ServiceCategory[] = [
  { id: 'coal-storage-monitoring', nameEn: 'Coal Storage Monitoring', nameCn: '煤炭储存监控' },
  { id: 'weight-estimation', nameEn: 'Weight Estimation', nameCn: '重量估算' },
  { id: 'price-estimation', nameEn: 'Price Estimation', nameCn: '价格估算' },
  { id: 'product-collateral', nameEn: 'Product Collateral', nameCn: '产品抵押' },
  { id: 'transport', nameEn: 'Transport Management', nameCn: '运输管理' },
  { id: 'quality-testing', nameEn: 'Quality Testing', nameCn: '质量测试' },
  { id: 'consultation', nameEn: 'Industry Consultation', nameCn: '行业咨询' }
];

// Mock case studies data
const mockCaseStudies: CaseStudy[] = [
  {
    id: 1,
    titleEn: 'Coal Storage Monitoring Implementation for Shenhua Group',
    titleCn: '神华集团煤炭储存监控实施',
    summaryEn: 'Improving inventory accuracy by 30% and reducing handling costs by 15%.',
    summaryCn: '提高库存准确性30%并降低处理成本15%。',
    descriptionEn: 'Shenhua Group, China\'s largest coal mining state-owned enterprise, needed to improve the accuracy and efficiency of their coal storage management across multiple sites. Their existing system relied on manual surveys that were both time-consuming and error-prone.',
    descriptionCn: '中国最大的煤炭开采国有企业神华集团需要提高其多个站点的煤炭储存管理的准确性和效率。他们现有的系统依赖于既耗时又容易出错的人工调查。',
    outcomeEn: 'Our Coal Storage Monitoring solution provided Shenhua with real-time visibility into their coal inventory across 20 major facilities. This improved inventory accuracy by 30%, reduced handling costs by 15%, and eliminated stockout incidents during peak demand periods. The integration with their ERP system enhanced financial reporting accuracy and streamlined operational planning.',
    outcomeCn: '我们的煤炭储存监控解决方案为神华提供了对其20个主要设施的煤炭库存的实时可见性。这提高了库存准确性30%，降低了处理成本15%，并消除了高峰需求期间的缺货事件。与其ERP系统的集成提高了财务报告的准确性并简化了运营规划。',
    imageUrl: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    serviceCategory: ['coal-storage-monitoring'],
    year: 2023,
    region: '内蒙古 / Inner Mongolia',
    challengeEn: 'Shenhua Group operates over 20 major coal storage facilities across China, with total capacity exceeding 50 million tons. Their existing management system relied on periodic manual surveys that were both time-consuming and inaccurate. This led to inventory discrepancies of up to 12%, creating significant financial implications and operational challenges. During peak demand periods, inaccurate inventory data led to stockouts at critical locations, while excess inventory at other sites increased carrying costs.',
    challengeCn: '神华集团在中国各地经营着20多个主要煤炭储存设施，总容量超过5000万吨。他们现有的管理系统依赖于定期的人工调查，既耗时又不准确。这导致库存差异高达12%，造成了重大的财务影响和运营挑战。在需求高峰期，不准确的库存数据导致关键位置的缺货，而其他站点的过量库存增加了持有成本。',
    solutionEn: 'We implemented our comprehensive Coal Storage Monitoring system across Shenhua\'s network, which included: 1) Advanced LiDAR and thermal imaging sensors installed at strategic locations; 2) AI-driven analytics platform for real-time monitoring and predictive insights; 3) Automated alert system for inventory thresholds and environmental conditions; 4) Integration with their existing ERP and logistics management systems. The implementation was conducted in phases over nine months, with minimal disruption to operations.',
    solutionCn: '我们在神华网络中实施了全面的煤炭储存监控系统，其中包括：1) 在战略位置安装的先进激光雷达和热成像传感器; 2) 用于实时监控和预测性洞察的AI驱动分析平台; 3) 库存阈值和环境条件的自动警报系统; 4) 与他们现有的ERP和物流管理系统的集成。实施分阶段进行，历时九个月，对运营的干扰最小。',
    testimonyEn: "The real-time visibility and analytics provided by this system have transformed how we manage our coal inventory. Not only have we significantly improved our operational efficiency, but we've also enhanced our financial reporting accuracy and environmental compliance.",
    testimonyCn: '该系统提供的实时可视性和分析改变了我们管理煤炭库存的方式。我们不仅显著提高了运营效率，还增强了财务报告的准确性和环境合规性。',
    testimonialAuthorEn: 'Li Wei',
    testimonialAuthorCn: '李伟',
    testimonialPositionEn: 'Director of Operations, Shenhua Group',
    testimonialPositionCn: '神华集团运营总监',
    resultStatsEn: [
      { label: 'Inventory Accuracy Improvement', value: '30%' },
      { label: 'Handling Cost Reduction', value: '15%' },
      { label: 'Stockout Incident Reduction', value: '22%' },
      { label: 'Return on Investment', value: '285%' },
      { label: 'Implementation Time', value: '9 months' }
    ],
    resultStatsCn: [
      { label: '库存准确性提升', value: '30%' },
      { label: '处理成本降低', value: '15%' },
      { label: '缺货事件减少', value: '22%' },
      { label: '投资回报率', value: '285%' },
      { label: '实施时间', value: '9个月' }
    ]
  },
  {
    id: 2,
    titleEn: 'Precision Weight Estimation for China Huaneng Group',
    titleCn: '华能集团精准重量估算',
    summaryEn: 'Achieving ±1.2% accuracy in coal weight measurements across 5 major power plants.',
    summaryCn: '在5个主要发电厂实现煤炭重量测量±1.2%的精确度。',
    descriptionEn: 'China Huaneng Group, one of the largest power generation companies in China, needed a more accurate and efficient way to measure coal stockpiles at their power plants. Traditional manual surveys were time-consuming and inaccurate, leading to discrepancies in inventory valuation and supply chain planning.',
    descriptionCn: '中国最大的发电公司之一华能集团需要一种更准确、更高效的方法来测量其发电厂的煤堆。传统的人工测量耗时且不准确，导致库存估值和供应链规划存在差异。',
    outcomeEn: 'Our Weight Estimation service provided Huaneng with drone-based 3D modeling technology that delivered weight measurements with ±1.2% accuracy. This resulted in annual savings of ¥15 million through improved inventory management and more accurate financial reporting. The time required for stockpile audits was reduced from weeks to just days.',
    outcomeCn: '我们的重量估算服务为华能提供了基于无人机的3D建模技术，提供了±1.2%精度的重量测量。通过改进的库存管理和更准确的财务报告，每年节省1500万元。库存审计所需的时间从几周减少到几天。',
    imageUrl: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    serviceCategory: ['weight-estimation'],
    year: 2022,
    region: '江苏 / Jiangsu',
    challengeEn: 'China Huaneng Group operates multiple coal-fired power plants across China, each with substantial coal stockyards. Their traditional measurement methods relied on manual surveying techniques that had an average error rate of 8-10%. This inaccuracy resulted in significant financial implications, with annual inventory valuation discrepancies exceeding ¥40 million. Additionally, the manual survey process took up to two weeks to complete across all sites, making it impossible to have timely, accurate data for operational decisions.',
    challengeCn: '华能集团在中国各地运营多家燃煤发电厂，每家都有大型煤场。他们传统的测量方法依赖于人工测量技术，平均误差率为8-10%。这种不准确性带来了重大的财务影响，年度库存估值差异超过4000万元。此外，手动测量过程在所有站点完成需要长达两周的时间，使得无法及时获取准确的数据用于运营决策。',
    solutionEn: 'We deployed our comprehensive Weight Estimation service that included: 1) Advanced drone fleet equipped with photogrammetry and LiDAR sensors; 2) Proprietary 3D modeling software with coal-specific density calculation algorithms; 3) Cloud-based data processing system for rapid results delivery; 4) Integration with their inventory management and financial reporting systems. The service was implemented at all five major power plants, with a specialized team conducting bi-weekly measurements at each site.',
    solutionCn: '我们部署了全面的重量估算服务，包括：1) 配备摄影测量和激光雷达传感器的先进无人机队; 2) 具有煤炭特定密度计算算法的专有3D建模软件; 3) 用于快速结果传递的基于云的数据处理系统; 4) 与他们的库存管理和财务报告系统的集成。该服务在所有五个主要发电厂实施，专业团队在每个站点进行两周一次的测量。',
    testimonyEn: 'The precision and efficiency of this weight estimation technology have revolutionized our inventory management. We now have confidence in our coal stockpile measurements, which has cascading benefits across our financial planning, procurement, and power generation scheduling activities.',
    testimonyCn: '这种重量估算技术的精确性和效率彻底改变了我们的库存管理。我们现在对煤堆测量充满信心，这对我们的财务计划、采购和发电调度活动有着连锁的好处。',
    testimonialAuthorEn: 'Zhang Min',
    testimonialAuthorCn: '张敏',
    testimonialPositionEn: 'Chief Financial Officer, Huaneng Jiangsu Power Co.',
    testimonialPositionCn: '华能江苏电力有限公司财务总监',
    resultStatsEn: [
      { label: 'Measurement Accuracy', value: '±1.2%' },
      { label: 'Annual Cost Savings', value: '¥15 million' },
      { label: 'Audit Time Reduction', value: '86%' },
      { label: 'Return on Investment', value: '340%' },
      { label: 'Survey Frequency Improvement', value: '4x' }
    ],
    resultStatsCn: [
      { label: '测量精度', value: '±1.2%' },
      { label: '年度成本节约', value: '1500万元' },
      { label: '审计时间减少', value: '86%' },
      { label: '投资回报率', value: '340%' },
      { label: '测量频率提升', value: '4倍' }
    ]
  },
  {
    id: 3,
    titleEn: 'Enhancing Coal Quality Testing for Yanzhou Coal Mining Company',
    titleCn: '提升兖州煤业公司煤炭质量测试',
    summaryEn: 'Implementing automated quality testing to reduce sampling time by 65% and improve accuracy.',
    summaryCn: '实施自动化质量测试，减少采样时间65%并提高准确性。',
    descriptionEn: 'Yanzhou Coal Mining Company sought to improve their coal quality testing processes to meet increasing international export standards and optimize their production blending operations. Their manual testing methods were slow and subject to human error.',
    descriptionCn: '兖州煤业公司寻求改进其煤炭质量测试流程，以满足不断提高的国际出口标准并优化其生产混合作业。他们的人工测试方法缓慢且容易出现人为错误。',
    outcomeEn: 'Our Coal Quality Testing solution was implemented across three major mining sites, automating the sampling and testing process. This reduced the testing cycle time from 4 hours to 85 minutes and improved the consistency of results. The company was able to optimize their coal blending operations, resulting in a 7% premium on export prices due to more consistent quality.',
    outcomeCn: '我们的煤炭质量测试解决方案在三个主要矿区实施，自动化采样和测试流程。这将测试周期时间从4小时减少到85分钟，并提高了结果的一致性。由于质量更加一致，公司能够优化煤炭混合作业，出口价格溢价7%。',
    imageUrl: 'https://images.unsplash.com/photo-1563902893506-e3ec309cf326?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    serviceCategory: ['quality-testing'],
    year: 2023,
    region: '山东 / Shandong'
  },
  {
    id: 4,
    titleEn: 'Integrated Coal Transport Management for China Coal Energy',
    titleCn: '中煤能源综合煤炭运输管理',
    summaryEn: 'Reducing transport costs by 18% and transit time by 23% through our logistics optimization platform.',
    summaryCn: '通过我们的物流优化平台将运输成本降低18%，运输时间缩短23%。',
    descriptionEn: 'China Coal Energy Company, a major state-owned coal enterprise, was facing increasing pressure to improve the efficiency of their coal transportation network that spans rail, road, and port facilities. They needed a comprehensive solution to track shipments, optimize routes, and reduce costs.',
    descriptionCn: '作为主要的国有煤炭企业，中煤能源公司面临着提高其涵盖铁路、公路和港口设施的煤炭运输网络效率的压力。他们需要一个全面的解决方案来跟踪货物、优化路线并降低成本。',
    outcomeEn: "By implementing our Transport Service module, China Coal Energy gained real-time visibility into their entire supply chain. The system's AI-powered route optimization reduced empty return trips by 32% and overall transport costs by 18%. Average delivery times were reduced by 23%, significantly improving customer satisfaction while reducing the carbon footprint of their logistics operations.",
    outcomeCn: '通过实施我们的运输服务模块，中煤能源获得了对整个供应链的实时可视性。系统的AI驱动路线优化减少了32%的空返程并降低了18%的总体运输成本。平均交付时间缩短了23%，显著提高了客户满意度，同时减少了物流运营的碳足迹。',
    imageUrl: 'https://images.unsplash.com/photo-1591271955622-c5f6c8bb2c97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
    serviceCategory: ['transport'],
    year: 2022,
    region: '河北 / Hebei'
  },
  {
    id: 5,
    titleEn: 'Dynamic Coal Price Estimation System for Datong Coal Mine Group',
    titleCn: '大同煤矿集团动态煤炭价格估算系统',
    summaryEn: 'Improving pricing strategy with AI-driven market analysis leading to 11% revenue growth.',
    summaryCn: '通过AI驱动的市场分析改进定价策略，实现11%的收入增长。',
    descriptionEn: 'Datong Coal Mine Group wanted to enhance their pricing strategy to respond more quickly to market changes and optimize revenue. Their existing pricing methods relied heavily on historical data and manual market research, leading to missed opportunities and suboptimal pricing.',
    descriptionCn: '大同煤矿集团希望增强其定价策略，以便更快地响应市场变化并优化收入。他们现有的定价方法严重依赖历史数据和人工市场研究，导致错失机会和次优定价。',
    outcomeEn: 'Our Price Estimation service implemented a machine learning model that analyzes multiple market factors in real-time. The system provided Datong with accurate price forecasts and optimization recommendations, enabling them to adjust pricing strategies proactively. This resulted in an 11% increase in annual revenue and strengthened their competitive position in the market.',
    outcomeCn: '我们的价格估算服务实施了一个实时分析多个市场因素的机器学习模型。该系统为大同提供了准确的价格预测和优化建议，使他们能够主动调整定价策略。这导致年收入增加11%，加强了他们在市场上的竞争地位。',
    imageUrl: 'https://images.unsplash.com/photo-1603363452172-ef7606fe0221?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    serviceCategory: ['price-estimation'],
    year: 2023,
    region: '山西 / Shanxi'
  },
  {
    id: 6,
    titleEn: 'Digital Product Collateral Management for China National Coal Group',
    titleCn: '中国中煤集团数字产品抵押管理',
    summaryEn: 'Transforming documentation processes to reduce verification time by 75% and financing delays by 60%.',
    summaryCn: '转变文档流程，减少验证时间75%和融资延迟60%。',
    descriptionEn: 'China National Coal Group struggled with complex documentation processes for their coal product collateral used in financing. The paper-based system was prone to errors, time-consuming, and created challenges for verification by financial institutions.',
    descriptionCn: '中国中煤集团在用于融资的煤产品抵押品文档流程方面面临挑战。纸质系统容易出错、耗时，并为金融机构的验证创造了挑战。',
    outcomeEn: 'Our Product Collateral service digitized and standardized their documentation workflow with blockchain verification. This reduced document preparation time by 70% and verification time by 75%. Financial institutions gained secure access to verified collateral information, reducing financing delays by 60% and enabling China National Coal Group to access financing at more favorable rates.',
    outcomeCn: '我们的产品抵押服务通过区块链验证数字化和标准化了他们的文档工作流程。这减少了70%的文档准备时间和75%的验证时间。金融机构获得了对经验证的抵押品信息的安全访问，减少了60%的融资延迟，使中国中煤集团能够以更有利的利率获得融资。',
    imageUrl: 'https://images.unsplash.com/photo-1613665813446-82a78b7ced1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80',
    serviceCategory: ['product-collateral'],
    year: 2022,
    region: '北京 / Beijing'
  }
];

export default function CaseStudyDetail() {
  const { t, i18n } = useTranslation();
  const [, params] = useRoute('/case-studies/:id');
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  
  // Set document title and find case study data based on ID
  useEffect(() => {
    if (params && params.id) {
      const id = parseInt(params.id);
      const study = mockCaseStudies.find(c => c.id === id);
      
      if (study) {
        setCaseStudy(study);
        document.title = i18n.language === 'cn' 
          ? `${study.titleCn} | 客户案例` 
          : `${study.titleEn} | Case Study`;
      } else {
        document.title = i18n.language === 'cn' ? '找不到案例 | 煤炭服务' : 'Case Study Not Found | Coal Services';
      }
    }
  }, [params, i18n.language]);
  
  // If case study not found
  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            {i18n.language === 'cn' ? '案例未找到' : 'Case Study Not Found'}
          </h1>
          <p className="text-gray-600 mb-6">
            {i18n.language === 'cn' ? '您请求的案例研究不存在或已被移除。' : 'The case study you requested does not exist or has been removed.'}
          </p>
          <Link href="/case-studies">
            <Button>
              {i18n.language === 'cn' ? '返回所有案例' : 'Back to All Case Studies'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // Extract service names based on category IDs
  const serviceNames = caseStudy.serviceCategory.map(catId => {
    const category = serviceCategories.find(c => c.id === catId);
    return category ? (i18n.language === 'cn' ? category.nameCn : category.nameEn) : catId;
  });
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/case-studies">
              <Button variant="link" className="text-white mb-4">
                <span className="mr-2">←</span>
                {i18n.language === 'cn' ? '返回所有案例' : 'Back to All Case Studies'}
              </Button>
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{caseStudy.year}</Badge>
              <Badge variant="outline">{caseStudy.region}</Badge>
              {serviceNames.map((name, index) => (
                <Badge key={index} variant="secondary" className="bg-primary/10 text-white border-primary/20">
                  {name}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl font-bold mb-4">
              {i18n.language === 'cn' ? caseStudy.titleCn : caseStudy.titleEn}
            </h1>
            <p className="text-xl text-gray-300">
              {i18n.language === 'cn' ? caseStudy.summaryCn : caseStudy.summaryEn}
            </p>
          </div>
        </div>
      </section>
      
      {/* Featured Image */}
      <div className="relative -mt-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img 
                src={caseStudy.imageUrl} 
                alt={i18n.language === 'cn' ? caseStudy.titleCn : caseStudy.titleEn}
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Overview */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">
                {i18n.language === 'cn' ? '概述' : 'Overview'}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                {i18n.language === 'cn' ? caseStudy.descriptionCn : caseStudy.descriptionEn}
              </p>
            </div>
            
            {/* Challenge */}
            {(caseStudy.challengeEn || caseStudy.challengeCn) && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">
                  {i18n.language === 'cn' ? '挑战' : 'Challenge'}
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {i18n.language === 'cn' ? caseStudy.challengeCn : caseStudy.challengeEn}
                </p>
              </div>
            )}
            
            {/* Solution */}
            {(caseStudy.solutionEn || caseStudy.solutionCn) && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">
                  {i18n.language === 'cn' ? '解决方案' : 'Solution'}
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {i18n.language === 'cn' ? caseStudy.solutionCn : caseStudy.solutionEn}
                </p>
              </div>
            )}
            
            {/* Results */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">
                {i18n.language === 'cn' ? '成果' : 'Results'}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {i18n.language === 'cn' ? caseStudy.outcomeCn : caseStudy.outcomeEn}
              </p>
              
              {/* Results Statistics */}
              {((i18n.language === 'cn' && caseStudy.resultStatsCn) || 
                (i18n.language === 'en' && caseStudy.resultStatsEn)) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  {(i18n.language === 'cn' ? caseStudy.resultStatsCn : caseStudy.resultStatsEn)?.map((stat, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                      <div className="text-gray-600 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Testimonial */}
            {((caseStudy.testimonyEn && caseStudy.testimonialAuthorEn) || 
              (caseStudy.testimonyCn && caseStudy.testimonialAuthorCn)) && (
              <div className="mb-12 bg-gray-50 p-8 rounded-lg border-l-4 border-primary">
                <blockquote className="text-xl italic text-gray-700 mb-4">
                  "{i18n.language === 'cn' ? caseStudy.testimonyCn : caseStudy.testimonyEn}"
                </blockquote>
                <div className="font-medium">
                  {i18n.language === 'cn' ? caseStudy.testimonialAuthorCn : caseStudy.testimonialAuthorEn}
                </div>
                <div className="text-gray-600 text-sm">
                  {i18n.language === 'cn' ? caseStudy.testimonialPositionCn : caseStudy.testimonialPositionEn}
                </div>
              </div>
            )}
            
            {/* Related Services */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">
                {i18n.language === 'cn' ? '相关服务' : 'Related Services'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {caseStudy.serviceCategory.map((catId, index) => {
                  const category = serviceCategories.find(c => c.id === catId);
                  return (
                    <Link key={index} href={`/services/${catId}`}>
                      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all">
                        <h3 className="text-lg font-medium mb-2">
                          {category ? (i18n.language === 'cn' ? category.nameCn : category.nameEn) : catId}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {i18n.language === 'cn' 
                            ? '了解我们如何帮助您的业务取得类似成果' 
                            : 'Learn how we can help your business achieve similar results'}
                        </p>
                        <Button variant="link" className="p-0">
                          {i18n.language === 'cn' ? '查看服务详情' : 'View Service Details'} →
                        </Button>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
            
            {/* CTA */}
            <div className="mt-16 text-center py-8 px-6 bg-gray-50 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">
                {i18n.language === 'cn' ? '想了解我们如何为您的业务提供帮助？' : 'Want to learn how we can help your business?'}
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                {i18n.language === 'cn' 
                  ? '联系我们的专家团队，讨论您的特定需求和挑战。' 
                  : 'Contact our team of experts to discuss your specific needs and challenges.'}
              </p>
              <Link href="/consultation">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                  {i18n.language === 'cn' ? '预约免费咨询' : 'Schedule a Free Consultation'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}