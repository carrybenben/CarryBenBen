import { useEffect } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CaseStudies() {
  const { t, i18n } = useTranslation();
  
  // Set document title
  useEffect(() => {
    document.title = i18n.language === 'cn' ? '客户案例 | 煤炭服务' : 'Case Studies | Coal Services';
  }, [i18n.language]);
  
  // Case studies data
  const caseStudies = [
    {
      id: 1,
      titleEn: 'Optimizing Coal Storage Management at Shenhua Group',
      titleCn: '优化神华集团煤炭储存管理',
      summaryEn: 'How our monitoring system improved inventory accuracy by 30% and reduced handling costs by 15%.',
      summaryCn: '我们的监控系统如何将库存准确性提高30%并减少处理成本15%。',
      descriptionEn: 'Shenhua Group, China\'s largest coal producer, faced challenges with accurate inventory management across multiple storage facilities. By implementing our Coal Storage Monitoring system, they achieved real-time visibility of coal stockpiles, improved inventory accuracy, and optimized their logistics operations.',
      descriptionCn: '中国最大的煤炭生产商神华集团在多个储存设施的准确库存管理方面面临挑战。通过实施我们的煤炭储存监控系统，他们实现了煤堆的实时可视化，提高了库存准确性，并优化了物流运营。',
      outcomeEn: 'After six months of implementation, Shenhua Group reported a 30% improvement in inventory accuracy, 15% reduction in handling costs, and 22% decrease in stockout incidents. The system also helped them reduce environmental impact by optimizing coal pile layouts and reducing dust emissions.',
      outcomeCn: '实施六个月后，神华集团报告库存准确性提高了30%，处理成本减少了15%，缺货事件减少了22%。该系统还通过优化煤堆布局和减少粉尘排放，帮助他们减少了环境影响。',
      imageUrl: 'https://images.unsplash.com/photo-1593105522488-0a0d97911754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      serviceCategory: ['storage-monitoring'],
      year: 2023,
      region: i18n.language === 'cn' ? '内蒙古' : 'Inner Mongolia'
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
      region: i18n.language === 'cn' ? '江苏' : 'Jiangsu'
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
      region: i18n.language === 'cn' ? '山东' : 'Shandong'
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
      region: i18n.language === 'cn' ? '河北' : 'Hebei'
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
      region: i18n.language === 'cn' ? '山西' : 'Shanxi'
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
      region: i18n.language === 'cn' ? '北京' : 'Beijing'
    }
  ];
  
  // Service categories for filtering
  const serviceCategories = [
    { id: 'storage-monitoring', nameEn: 'Storage Monitoring', nameCn: '煤仓监管' },
    { id: 'weight-estimation', nameEn: 'Weight Estimation', nameCn: '煤重估量' },
    { id: 'price-estimation', nameEn: 'Price Estimation', nameCn: '价格估算' },
    { id: 'product-collateral', nameEn: 'Product Collateral', nameCn: '产品抵押' },
    { id: 'transport', nameEn: 'Transport', nameCn: '运输服务' },
    { id: 'quality-testing', nameEn: 'Quality Testing', nameCn: '质量检测' },
    { id: 'consultation', nameEn: 'Consultation', nameCn: '咨询服务' }
  ];
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {i18n.language === 'cn' ? '客户成功案例' : 'Client Success Stories'}
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              {i18n.language === 'cn' 
                ? '探索我们如何帮助煤炭行业领先企业提升运营效率和盈利能力' 
                : 'Explore how we\'ve helped leading coal industry companies enhance operational efficiency and profitability'}
            </p>
          </div>
        </div>
      </section>
      
      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {serviceCategories.map(category => (
              <Link key={category.id} href={`/services/${category.id}`}>
                <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 transition-colors py-2 px-4">
                  {i18n.language === 'cn' ? category.nameCn : category.nameEn}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Case Studies Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map(caseStudy => (
              <Card key={caseStudy.id} className="flex flex-col overflow-hidden border border-gray-200 hover:shadow-md transition-all">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={caseStudy.imageUrl} 
                    alt={i18n.language === 'cn' ? caseStudy.titleCn : caseStudy.titleEn}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex gap-2 mb-2">
                    <Badge variant="secondary">{caseStudy.year}</Badge>
                    <Badge variant="outline">{caseStudy.region}</Badge>
                  </div>
                  <CardTitle className="line-clamp-2">
                    {i18n.language === 'cn' ? caseStudy.titleCn : caseStudy.titleEn}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {i18n.language === 'cn' ? caseStudy.summaryCn : caseStudy.summaryEn}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.serviceCategory.map(catId => {
                      const category = serviceCategories.find(c => c.id === catId);
                      return (
                        <Badge key={catId} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          {category ? (i18n.language === 'cn' ? category.nameCn : category.nameEn) : catId}
                        </Badge>
                      );
                    })}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/case-studies/${caseStudy.id}`}>
                    <Button variant="outline">
                      {i18n.language === 'cn' ? '查看详情' : 'View Details'}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              {i18n.language === 'cn' ? '准备好探索您的煤炭业务如何获益了吗？' : 'Ready to explore how your coal business can benefit?'}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {i18n.language === 'cn' 
                ? '联系我们的专家团队，了解我们如何为您的特定需求定制解决方案。' 
                : 'Contact our team of experts to learn how we can tailor our solutions to your specific needs.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/consultation">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                  {i18n.language === 'cn' ? '咨询专家' : 'Consult an Expert'}
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline">
                  {i18n.language === 'cn' ? '探索所有服务' : 'Explore All Services'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}