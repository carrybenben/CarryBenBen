import { useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

// Import SVG assets
import ModelingSvg from '@/assets/technology/3d-modeling.svg';
import DroneSurveySvg from '@/assets/technology/drone-survey.svg';
import DensityAnalysisSvg from '@/assets/technology/density-analysis.svg';

export default function TechnologyDetails() {
  const { t, i18n } = useTranslation();
  const [location] = useLocation();
  
  // Extract technology type from URL
  const techType = location.split('/').pop();
  
  // Set document title based on technology type
  useEffect(() => {
    let title = '';
    
    switch(techType) {
      case 'drone-survey':
        title = i18n.language === 'cn' ? '无人机航拍测量技术 | 煤炭服务' : 'Drone Aerial Survey Technology | Coal Services';
        break;
      case '3d-modeling':
        title = i18n.language === 'cn' ? '3D建模与体积计算技术 | 煤炭服务' : '3D Modeling & Volume Calculation Technology | Coal Services';
        break;
      case 'density-analysis':
        title = i18n.language === 'cn' ? '密度分析与重量转换技术 | 煤炭服务' : 'Density Analysis & Weight Conversion Technology | Coal Services';
        break;
      default:
        title = i18n.language === 'cn' ? '技术详情 | 煤炭服务' : 'Technology Details | Coal Services';
    }
    
    document.title = title;
  }, [techType, i18n.language]);
  
  // Technology details data
  const getTechContent = () => {
    switch(techType) {
      case 'drone-survey':
        return {
          title: i18n.language === 'cn' ? '无人机航拍测量技术' : 'Drone Aerial Survey Technology',
          subtitle: i18n.language === 'cn' ? '高精度航拍测绘技术详解' : 'Detailed Explanation of High-Precision Aerial Mapping Technology',
          description: i18n.language === 'cn' 
            ? '我们采用的无人机航拍系统是煤堆测量的前沿技术，提供了传统测量方法无法比拟的精度和效率。' 
            : 'Our drone aerial survey system is cutting-edge technology for coal pile measurement, providing unparalleled precision and efficiency compared to traditional measurement methods.',
          features: [
            {
              title: i18n.language === 'cn' ? '高精度RTK定位' : 'High-Precision RTK Positioning',
              description: i18n.language === 'cn' 
                ? '搭载厘米级实时动态定位系统，精确定位每个测量点。' 
                : 'Equipped with centimeter-level real-time kinematic positioning system for precise location of each measurement point.'
            },
            {
              title: i18n.language === 'cn' ? '4K高分辨率航拍' : '4K High-Resolution Aerial Photography',
              description: i18n.language === 'cn' 
                ? '配备专业航拍相机，捕捉清晰的地表细节。' 
                : 'Equipped with professional aerial cameras to capture clear surface details.'
            },
            {
              title: i18n.language === 'cn' ? '自动航线规划' : 'Automatic Flight Path Planning',
              description: i18n.language === 'cn' 
                ? '智能系统自动生成最优航线，确保全面覆盖测量区域。' 
                : 'Intelligent system automatically generates optimal flight paths to ensure comprehensive coverage of the measurement area.'
            },
            {
              title: i18n.language === 'cn' ? '多无人机协同作业' : 'Multi-Drone Collaborative Operation',
              description: i18n.language === 'cn' 
                ? '可同时部署多架无人机，大幅提高大型煤场的测量效率。' 
                : 'Multiple drones can be deployed simultaneously, greatly improving measurement efficiency for large coal yards.'
            }
          ],
          specs: [
            { name: i18n.language === 'cn' ? '最大覆盖面积' : 'Maximum Coverage Area', value: i18n.language === 'cn' ? '单次飞行 50 公顷' : '50 hectares per flight' },
            { name: i18n.language === 'cn' ? '点云密度' : 'Point Cloud Density', value: i18n.language === 'cn' ? '每平方米 50-100 个点' : '50-100 points per square meter' },
            { name: i18n.language === 'cn' ? '位置精度' : 'Position Accuracy', value: '±2 cm' },
            { name: i18n.language === 'cn' ? '飞行高度' : 'Flight Altitude', value: i18n.language === 'cn' ? '30-120 米' : '30-120 meters' },
            { name: i18n.language === 'cn' ? '单次飞行时间' : 'Single Flight Time', value: i18n.language === 'cn' ? '最长 35 分钟' : 'Up to 35 minutes' },
            { name: i18n.language === 'cn' ? '数据处理时间' : 'Data Processing Time', value: i18n.language === 'cn' ? '1-3 小时' : '1-3 hours' }
          ],
          cases: [
            {
              title: i18n.language === 'cn' ? '山西某大型露天煤矿' : 'Major Open-pit Coal Mine in Shanxi',
              description: i18n.language === 'cn' 
                ? '面积达 300 公顷的煤场在 6 小时内完成全面测量，生成超过 1500 万个测量点，测量精度达到 ±1.2 厘米。' 
                : 'A 300-hectare coal yard was fully measured within 6 hours, generating over 15 million measurement points with a measurement accuracy of ±1.2 centimeters.'
            },
            {
              title: i18n.language === 'cn' ? '内蒙古煤炭储运基地' : 'Coal Storage and Transportation Base in Inner Mongolia',
              description: i18n.language === 'cn' 
                ? '在极端气候条件下，我们的无人机系统仍完成了 150 公顷煤场的精确测量，并生成了高质量的三维模型。' 
                : 'Under extreme weather conditions, our drone system still completed the precise measurement of a 150-hectare coal yard and generated high-quality three-dimensional models.'
            }
          ],
          image: DroneSurveySvg
        };
      
      case '3d-modeling':
        return {
          title: i18n.language === 'cn' ? '3D建模与体积计算技术' : '3D Modeling & Volume Calculation Technology',
          subtitle: i18n.language === 'cn' ? '精确三维重建和体积分析系统' : 'Precise Three-dimensional Reconstruction and Volume Analysis System',
          description: i18n.language === 'cn' 
            ? '我们的3D建模技术将无人机采集的点云数据转化为高精度三维模型，并通过先进算法精确计算煤堆体积。' 
            : 'Our 3D modeling technology transforms drone-collected point cloud data into high-precision three-dimensional models and accurately calculates coal pile volumes through advanced algorithms.',
          features: [
            {
              title: i18n.language === 'cn' ? '高密度点云处理' : 'High-Density Point Cloud Processing',
              description: i18n.language === 'cn' 
                ? '处理每平方米超过100个测量点的高密度数据，捕捉煤堆的细微形态特征。' 
                : 'Process high-density data with over 100 measurement points per square meter, capturing subtle morphological features of coal piles.'
            },
            {
              title: i18n.language === 'cn' ? '智能地形识别' : 'Intelligent Terrain Recognition',
              description: i18n.language === 'cn' 
                ? '自动识别基准面和煤堆边界，确保体积计算准确。' 
                : 'Automatically identify reference surfaces and coal pile boundaries to ensure accurate volume calculation.'
            },
            {
              title: i18n.language === 'cn' ? '多算法验证' : 'Multi-Algorithm Verification',
              description: i18n.language === 'cn' 
                ? '同时采用棱柱法、等高线法等多种算法计算体积，交叉验证结果准确性。' 
                : 'Calculate volumes using multiple algorithms such as prismatic method and contour method, cross-verifying result accuracy.'
            },
            {
              title: i18n.language === 'cn' ? '实时3D可视化' : 'Real-time 3D Visualization',
              description: i18n.language === 'cn' 
                ? '交互式三维模型展示，支持旋转、缩放和截面分析。' 
                : 'Interactive three-dimensional model display supporting rotation, scaling, and cross-section analysis.'
            }
          ],
          specs: [
            { name: i18n.language === 'cn' ? '体积计算精度' : 'Volume Calculation Accuracy', value: '±0.5%' },
            { name: i18n.language === 'cn' ? '支持的点云格式' : 'Supported Point Cloud Formats', value: 'LAS, LAZ, XYZ, PLY, E57' },
            { name: i18n.language === 'cn' ? '3D模型格式' : '3D Model Formats', value: 'OBJ, STL, GLTF, FBX, DXF' },
            { name: i18n.language === 'cn' ? '最大处理点数' : 'Maximum Processing Points', value: i18n.language === 'cn' ? '5亿点' : '500 million points' },
            { name: i18n.language === 'cn' ? '处理速度' : 'Processing Speed', value: i18n.language === 'cn' ? '每秒200万点' : '2 million points per second' },
            { name: i18n.language === 'cn' ? '支持分区计算' : 'Supports Partitioned Calculation', value: i18n.language === 'cn' ? '是' : 'Yes' }
          ],
          cases: [
            {
              title: i18n.language === 'cn' ? '宁夏大型煤炭储运中心' : 'Large Coal Storage and Transportation Center in Ningxia',
              description: i18n.language === 'cn' 
                ? '为多个复杂形状的煤堆创建精确3D模型，体积计算误差控制在0.4%以内，远优于行业平均水平。' 
                : 'Created precise 3D models for multiple complex-shaped coal piles, controlling volume calculation errors within 0.4%, far better than the industry average.'
            },
            {
              title: i18n.language === 'cn' ? '山东港口煤炭码头' : 'Coal Terminal at Shandong Port',
              description: i18n.language === 'cn' 
                ? '在高密度作业环境下，实现了煤堆的实时体积监测，支持库存管理系统的自动化决策。' 
                : 'Achieved real-time volume monitoring of coal piles in a high-density operational environment, supporting automated decision-making in the inventory management system.'
            }
          ],
          image: ModelingSvg
        };
        
      case 'density-analysis':
        return {
          title: i18n.language === 'cn' ? '密度分析与重量转换技术' : 'Density Analysis & Weight Conversion Technology',
          subtitle: i18n.language === 'cn' ? '智能密度估算和重量计算系统' : 'Intelligent Density Estimation and Weight Calculation System',
          description: i18n.language === 'cn' 
            ? '我们的密度分析系统整合了煤炭物理特性数据库和机器学习算法，实现精确的体积到重量转换。' 
            : 'Our density analysis system integrates a coal physical properties database and machine learning algorithms to achieve precise volume-to-weight conversion.',
          features: [
            {
              title: i18n.language === 'cn' ? '多因素密度模型' : 'Multi-factor Density Model',
              description: i18n.language === 'cn' 
                ? '考虑煤种、粒度、水分含量等多个因素对密度的影响。' 
                : 'Consider the effects of coal type, particle size, moisture content, and other factors on density.'
            },
            {
              title: i18n.language === 'cn' ? '现场采样校准' : 'On-site Sampling Calibration',
              description: i18n.language === 'cn' 
                ? '通过现场采样和实验室分析，校准特定煤堆的密度参数。' 
                : 'Calibrate density parameters for specific coal piles through on-site sampling and laboratory analysis.'
            },
            {
              title: i18n.language === 'cn' ? '分区密度评估' : 'Zoned Density Assessment',
              description: i18n.language === 'cn' 
                ? '对大型煤堆进行分区密度评估，考虑不同区域的压实度差异。' 
                : 'Conduct zoned density assessment for large coal piles, considering compaction differences in various areas.'
            },
            {
              title: i18n.language === 'cn' ? '历史数据自学习' : 'Historical Data Self-learning',
              description: i18n.language === 'cn' 
                ? '系统持续学习历史测量数据，不断优化密度预测模型。' 
                : 'The system continuously learns from historical measurement data, constantly optimizing the density prediction model.'
            }
          ],
          specs: [
            { name: i18n.language === 'cn' ? '重量估算精度' : 'Weight Estimation Accuracy', value: '±1.5%' },
            { name: i18n.language === 'cn' ? '支持的煤种数量' : 'Supported Coal Types', value: '30+' },
            { name: i18n.language === 'cn' ? '密度参数' : 'Density Parameters', value: i18n.language === 'cn' ? '12个影响因子' : '12 influence factors' },
            { name: i18n.language === 'cn' ? '密度范围' : 'Density Range', value: i18n.language === 'cn' ? '700-1500 kg/m³' : '700-1500 kg/m³' },
            { name: i18n.language === 'cn' ? '采样点推荐' : 'Sampling Point Recommendation', value: i18n.language === 'cn' ? '自动生成' : 'Automatically generated' },
            { name: i18n.language === 'cn' ? '支持实时更新' : 'Supports Real-time Updates', value: i18n.language === 'cn' ? '是' : 'Yes' }
          ],
          cases: [
            {
              title: i18n.language === 'cn' ? '黑龙江大型煤矿' : 'Large Coal Mine in Heilongjiang',
              description: i18n.language === 'cn' 
                ? '为不同煤种混合堆场开发定制密度模型，重量估算精度提高40%，年度库存盘点误差从3.2%降至1.4%。' 
                : 'Developed custom density models for mixed coal type stockyards, improving weight estimation accuracy by 40% and reducing annual inventory counting errors from 3.2% to 1.4%.'
            },
            {
              title: i18n.language === 'cn' ? '河北钢铁集团煤炭供应中心' : 'Coal Supply Center of Hebei Iron and Steel Group',
              description: i18n.language === 'cn' 
                ? '实现了不同来源煤炭的精确分区管理，密度模型自动适应季节性含水量变化，全年重量估算精度保持在±1.2%。' 
                : 'Achieved precise zoned management of coal from different sources, with the density model automatically adapting to seasonal moisture content changes, maintaining weight estimation accuracy at ±1.2% throughout the year.'
            }
          ],
          image: DensityAnalysisSvg
        };
        
      default:
        return {
          title: i18n.language === 'cn' ? '技术详情' : 'Technology Details',
          subtitle: i18n.language === 'cn' ? '详细技术信息' : 'Detailed Technology Information',
          description: i18n.language === 'cn' ? '请选择特定技术查看详情' : 'Please select a specific technology to view details',
          features: [],
          specs: [],
          cases: [],
          image: ''
        };
    }
  };
  
  const content = getTechContent();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href={techType?.includes('drone') ? '/services/weight-estimation' : techType?.includes('3d') ? '/services/weight-estimation' : '/services/weight-estimation'}>
              <Button variant="link" className="text-white mb-4">
                <span className="mr-2">←</span>
                {i18n.language === 'cn' ? '返回服务页面' : 'Back to Service Page'}
              </Button>
            </Link>
            <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
            <p className="text-xl text-gray-300 mb-6">{content.subtitle}</p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div>
                <p className="text-lg mb-6">{content.description}</p>
                
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">{i18n.language === 'cn' ? '主要特点' : 'Key Features'}</h2>
                  <div className="space-y-4">
                    {content.features.map((feature, index) => (
                      <div key={index} className="flex">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                          <span className="text-primary text-sm">✓</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{feature.title}</h3>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src={content.image} 
                    alt={content.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full z-[-1]"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/5 rounded-full z-[-1]"></div>
              </div>
            </div>
            
            {/* Technical Specifications */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">{i18n.language === 'cn' ? '技术规格' : 'Technical Specifications'}</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {content.specs.map((spec, index) => (
                    <div key={index} className="p-4 bg-white rounded-md shadow-sm">
                      <div className="text-sm text-gray-500">{spec.name}</div>
                      <div className="text-lg font-medium">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Case Studies */}
            <div>
              <h2 className="text-2xl font-bold mb-6">{i18n.language === 'cn' ? '案例研究' : 'Case Studies'}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.cases.map((caseStudy, index) => (
                  <Card key={index} className="border border-gray-200 hover:border-primary/50 transition-all">
                    <CardHeader>
                      <CardTitle>{caseStudy.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{caseStudy.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* CTA Section */}
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4">
                {i18n.language === 'cn' ? '想了解更多关于我们技术的信息？' : 'Want to learn more about our technology?'}
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                {i18n.language === 'cn' 
                  ? '我们的专家团队随时准备为您提供个性化的解决方案，满足您的具体需求。' 
                  : 'Our team of experts is ready to provide you with personalized solutions tailored to your specific needs.'}
              </p>
              <Link href="/consultation">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                  {i18n.language === 'cn' ? '预约技术咨询' : 'Schedule a Technical Consultation'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}