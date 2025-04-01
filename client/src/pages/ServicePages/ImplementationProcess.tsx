import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// 导入SVG图标
import siteAssessmentImg from '@/assets/implementation/site-assessment.svg';
import systemDesignImg from '@/assets/implementation/system-design.svg';
import equipmentInstallationImg from '@/assets/implementation/equipment-installation.svg';
import trainingImg from '@/assets/implementation/training.svg';

export default function ImplementationProcess() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const steps = [
    {
      number: 1,
      titleEn: 'Site Assessment & Requirements Analysis',
      titleCn: '站点评估与需求分析',
      descriptionEn: 'Our expert team will conduct a detailed assessment of your coal storage facilities, understanding your specific needs, and determining the optimal monitoring solution. We evaluate factors such as area size, environmental conditions, and security requirements.',
      descriptionCn: '我们的专家团队会详细评估您的煤炭存储设施，了解您的具体需求，并确定最适合的监控解决方案。评估内容包括存储区域大小、环境条件、安全要求和特殊监控需求。',
      imageSrc: siteAssessmentImg
    },
    {
      number: 2,
      titleEn: 'System Design & Customization',
      titleCn: '系统设计与定制',
      descriptionEn: 'Based on the assessment, we design a comprehensive monitoring solution, including equipment selection, layout planning, and data processing strategies. Each system is completely customized to meet your specific requirements and budget constraints.',
      descriptionCn: '基于评估结果，我们设计完整的监控解决方案，包括设备选择、布局规划、数据处理和分析策略。每个系统都会完全定制以满足您的特定需求和预算限制。',
      imageSrc: systemDesignImg
    },
    {
      number: 3,
      titleEn: 'Equipment Installation & Integration',
      titleCn: '设备安装与集成',
      descriptionEn: 'Our technical team handles all equipment installation and testing, ensuring the system operates correctly and seamlessly integrates with your existing infrastructure. We adhere to the highest safety standards throughout the implementation.',
      descriptionCn: '我们的技术团队负责所有设备的安装和调试，确保系统正常运行并与您现有的系统无缝集成。我们严格遵循安全标准，将对您正常运营的干扰降至最低。',
      imageSrc: equipmentInstallationImg
    },
    {
      number: 4,
      titleEn: 'Training & Support',
      titleCn: '培训与支持',
      descriptionEn: 'We provide comprehensive training for your staff, ensuring they can effectively operate and manage the monitoring system. Our team offers ongoing technical support and scheduled maintenance services, ensuring long-term system reliability.',
      descriptionCn: '我们为您的团队提供全面培训，确保他们能够有效操作和管理监控系统。我们还提供持续的技术支持和定期维护服务，确保系统的长期可靠性。',
      imageSrc: trainingImg
    }
  ];

  return (
    <div className="w-full bg-sky-50 py-16">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {lang === 'cn' ? '实施流程' : 'Implementation Process'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {lang === 'cn' 
              ? '我们采用系统化的方法为您的煤炭存储区域实施监控解决方案'
              : 'We follow a systematic approach to implement monitoring solutions for your coal storage areas'}
          </p>
        </div>
        
        <div className="space-y-8 relative">
          {/* 垂直连接线 */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 -translate-x-1/2 z-0 hidden md:block"></div>
          
          {steps.map((step, index) => (
            <div key={step.number} className="relative z-10">
              <div className="flex flex-col md:flex-row items-center">
                {/* 步骤编号气泡 - 在移动设备上居中，在桌面上靠左/靠右 */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white text-lg font-bold mb-4 md:mb-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                  {step.number}
                </div>
                
                {/* 内容布局 - 奇数步骤的图片在右边，偶数步骤的图片在左边 */}
                <div className={`w-full md:w-1/2 flex ${index % 2 === 0 ? 'md:pr-16 md:justify-end' : 'md:pl-16 md:justify-start md:order-2'}`}>
                  <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold mb-3">
                      {lang === 'cn' ? step.titleCn : step.titleEn}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {lang === 'cn' ? step.descriptionCn : step.descriptionEn}
                    </p>
                  </div>
                </div>
                
                {/* 图片在奇数步骤的左边，偶数步骤的右边 */}
                <div className={`w-full md:w-1/2 flex ${index % 2 === 0 ? 'md:pl-16 md:justify-start md:order-2' : 'md:pr-16 md:justify-end'}`}>
                  <Card className="border-0 shadow-lg overflow-hidden p-0 w-full max-w-lg">
                    <div className="bg-primary/5 p-4 flex flex-col items-center justify-center">
                      <img 
                        src={step.imageSrc} 
                        alt={lang === 'cn' ? step.titleCn : step.titleEn}
                        className="w-full h-[120px] object-contain"
                      />
                      <h3 className="mt-3 text-primary font-semibold">
                        {lang === 'cn' ? step.titleCn : step.titleEn}
                      </h3>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA 部分 */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold mb-4">
            {lang === 'cn' ? '准备开始您的煤炭监控项目？' : 'Ready to start your coal monitoring project?'}
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {lang === 'cn' 
              ? '联系我们安排现场评估，我们的专家团队将为您提供量身定制的解决方案。'
              : 'Contact us to schedule a site assessment, and our expert team will provide you with a tailored solution.'}
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            {lang === 'cn' ? '联系我们' : 'Contact Us'}
          </Button>
        </div>
      </div>
    </div>
  );
}