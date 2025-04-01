import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import Layout from "@/components/Layout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  ClipboardCheck, 
  Building2, 
  FileText, 
  BarChart3, 
  TrendingUp, 
  UploadCloud, 
  Check, 
  ChevronRight 
} from "lucide-react";

// This type is used for the cards in the "Testing Agencies" section
interface TestingAgency {
  id: number;
  code: string;
  nameEn: string;
  nameCn: string;
  descriptionEn: string | null;
  descriptionCn: string | null;
  address: string | null;
  contactPerson: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
  certifications: any | null;
  isActive: boolean;
}

// This type is used for the specs in the "Testing Parameters" section
interface TestingItem {
  id: number;
  code: string;
  nameEn: string;
  nameCn: string;
  descriptionEn: string | null;
  descriptionCn: string | null;
  unit: string;
  minValue: string | null;
  maxValue: string | null;
  standardValue: string | null;
}

// Mock data for testing agencies
const mockAgencies: TestingAgency[] = [
  {
    id: 1,
    code: "SGS-CHINA",
    nameEn: "SGS China",
    nameCn: "SGS中国",
    descriptionEn: "Global leader in inspection, verification, testing and certification services, with extensive experience in coal quality assessment.",
    descriptionCn: "全球领先的检验、核查、测试和认证服务提供商，在煤炭质量评估方面拥有丰富经验。",
    address: "Shanghai, China",
    contactPerson: "Zhang Wei",
    contactPhone: "+86 21 6115 2197",
    contactEmail: "coal.china@sgs.com",
    certifications: ["ISO 17025", "ISO 9001"],
    isActive: true
  },
  {
    id: 2,
    code: "CCIC-COAL",
    nameEn: "China Certification & Inspection Group Coal Division",
    nameCn: "中国检验认证集团煤炭部",
    descriptionEn: "A comprehensive inspection and certification organization with specialized coal quality testing facilities across China.",
    descriptionCn: "综合性检验认证机构，在中国各地拥有专业煤炭质量检测设施。",
    address: "Beijing, China",
    contactPerson: "Li Ming",
    contactPhone: "+86 10 8455 5588",
    contactEmail: "coal@ccic.com",
    certifications: ["ISO 17020", "ISO 9001"],
    isActive: true
  },
  {
    id: 3,
    code: "CQTEK",
    nameEn: "Coal Quality Technology Center",
    nameCn: "煤炭质量技术中心",
    descriptionEn: "Specialized in advanced coal quality analysis including trace elements and environmental impact assessments.",
    descriptionCn: "专注于先进煤炭质量分析，包括微量元素和环境影响评估。",
    address: "Taiyuan, Shanxi, China",
    contactPerson: "Wang Jie",
    contactPhone: "+86 351 7342 1090",
    contactEmail: "info@cqtek.cn",
    certifications: ["ISO 17025"],
    isActive: true
  }
];

// Mock data for testing parameters
const mockTestingItems: TestingItem[] = [
  {
    id: 1,
    code: "CAL",
    nameEn: "Calorific Value",
    nameCn: "发热量",
    descriptionEn: "Measures the energy content of coal, indicating how much heat is released when the coal is combusted.",
    descriptionCn: "测量煤炭的能量含量，表明煤炭燃烧时释放的热量。",
    unit: "MJ/kg",
    minValue: "20",
    maxValue: "35",
    standardValue: "29"
  },
  {
    id: 2,
    code: "ASH",
    nameEn: "Ash Content",
    nameCn: "灰分",
    descriptionEn: "The non-combustible residue left after coal is burnt. Lower ash content indicates higher quality coal.",
    descriptionCn: "煤炭燃烧后留下的不可燃残渣。较低的灰分含量表示较高质量的煤炭。",
    unit: "%",
    minValue: "5",
    maxValue: "20",
    standardValue: "8"
  },
  {
    id: 3,
    code: "VM",
    nameEn: "Volatile Matter",
    nameCn: "挥发分",
    descriptionEn: "Compounds released as gas when coal is heated. Affects ignition, flame stability and combustion characteristics.",
    descriptionCn: "煤炭加热时释放为气体的化合物。影响点火、火焰稳定性和燃烧特性。",
    unit: "%",
    minValue: "20",
    maxValue: "35",
    standardValue: "28"
  },
  {
    id: 4,
    code: "SUL",
    nameEn: "Sulfur Content",
    nameCn: "硫含量",
    descriptionEn: "Environmental parameter that affects emissions. Lower sulfur content is preferable for environmental compliance.",
    descriptionCn: "影响排放的环境参数。较低的硫含量有利于环境合规。",
    unit: "%",
    minValue: "0.2",
    maxValue: "3",
    standardValue: "0.8"
  },
  {
    id: 5,
    code: "MOI",
    nameEn: "Moisture Content",
    nameCn: "水分含量",
    descriptionEn: "Water content in coal. High moisture reduces the effective energy content and increases transportation costs.",
    descriptionCn: "煤炭中的水含量。高水分降低有效能量含量并增加运输成本。",
    unit: "%",
    minValue: "5",
    maxValue: "20",
    standardValue: "10"
  }
];

export default function QualityTesting() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");

  return (
      <div className="container mx-auto px-4 py-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {language === 'en' ? 'Coal Quality Testing Service' : '煤炭质量检测服务'}
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Professional coal quality testing and analysis services to ensure your coal meets industry standards and specifications.' 
              : '专业的煤炭质量检测和分析服务，确保您的煤炭符合行业标准和规格。'}
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Link href="/services/testing-records">
              <Button className="bg-primary hover:bg-primary/90">
                {language === 'en' ? 'View Testing Records' : '查看检测记录'}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/services/testing-records?tab=add-record">
              <Button variant="outline">
                {language === 'en' ? 'Submit New Test' : '提交新检测'}
                <UploadCloud className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Main Content */}
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-8 mx-auto flex justify-center">
            <TabsTrigger value="overview" className="px-6">
              {language === 'en' ? 'Overview' : '概述'}
            </TabsTrigger>
            <TabsTrigger value="agencies" className="px-6">
              {language === 'en' ? 'Testing Agencies' : '检测机构'}
            </TabsTrigger>
            <TabsTrigger value="parameters" className="px-6">
              {language === 'en' ? 'Testing Parameters' : '检测参数'}
            </TabsTrigger>
            <TabsTrigger value="process" className="px-6">
              {language === 'en' ? 'Process' : '流程'}
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'About Our Testing Service' : '关于我们的检测服务'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'en' 
                      ? 'Comprehensive analysis of coal quality parameters' 
                      : '全面分析煤炭质量参数'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    {language === 'en' 
                      ? 'Our coal quality testing service provides accurate and reliable analysis of critical coal parameters to help you make informed decisions. We collaborate with certified third-party laboratories to ensure unbiased results that meet international standards.' 
                      : '我们的煤炭质量检测服务提供关键煤炭参数的准确可靠分析，帮助您做出明智决策。我们与认证的第三方实验室合作，确保提供符合国际标准的公正结果。'}
                  </p>
                  <p>
                    {language === 'en' 
                      ? 'Whether you need routine quality control checks or detailed analysis for commercial transactions, our testing service covers all major coal quality parameters including calorific value, ash content, sulfur content, moisture, and more.' 
                      : '无论您需要常规质量控制检查还是商业交易的详细分析，我们的检测服务涵盖所有主要煤炭质量参数，包括发热量、灰分、硫含量、水分等。'}
                  </p>
                  <h3 className="text-lg font-medium mt-6">
                    {language === 'en' ? 'Key Benefits' : '主要优势'}
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>
                        {language === 'en' 
                          ? 'Accurate results from accredited testing facilities' 
                          : '来自认可检测机构的准确结果'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>
                        {language === 'en' 
                          ? 'Comprehensive analysis covering all critical parameters' 
                          : '涵盖所有关键参数的综合分析'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>
                        {language === 'en' 
                          ? 'Fast turnaround times with digital reporting' 
                          : '快速周转时间和数字化报告'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>
                        {language === 'en' 
                          ? 'Weighted average calculations for multiple samples' 
                          : '多个样本的加权平均计算'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>
                        {language === 'en' 
                          ? 'Historical data tracking and trend analysis' 
                          : '历史数据跟踪和趋势分析'}
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === 'en' ? 'Quick Links' : '快速链接'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Link href="/services/testing-records">
                        <Button variant="outline" className="w-full justify-start">
                          <FileText className="mr-2 h-4 w-4" />
                          {language === 'en' ? 'Testing Records' : '检测记录'}
                        </Button>
                      </Link>
                      <Link href="/services/testing-records?tab=add-record">
                        <Button variant="outline" className="w-full justify-start">
                          <UploadCloud className="mr-2 h-4 w-4" />
                          {language === 'en' ? 'Submit New Test' : '提交新检测'}
                        </Button>
                      </Link>
                      <Link href="/services/testing-records?tab=analysis">
                        <Button variant="outline" className="w-full justify-start">
                          <BarChart3 className="mr-2 h-4 w-4" />
                          {language === 'en' ? 'Analysis Reports' : '分析报告'}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === 'en' ? 'Contact Support' : '联系支持'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">
                      {language === 'en' 
                        ? 'Need help with testing services or have questions?' 
                        : '需要测试服务帮助或有疑问？'}
                    </p>
                    <Button className="w-full">
                      {language === 'en' ? 'Contact Us' : '联系我们'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Testing Agencies Tab */}
          <TabsContent value="agencies">
            <div className="space-y-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">
                  {language === 'en' ? 'Our Partner Testing Agencies' : '我们的合作检测机构'}
                </h2>
                <p className="text-gray-500 mt-2">
                  {language === 'en' 
                    ? 'We collaborate with certified testing agencies to provide reliable coal quality analysis' 
                    : '我们与认证的检测机构合作，提供可靠的煤炭质量分析'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockAgencies.map((agency) => (
                  <Card key={agency.id} className="overflow-hidden">
                    <CardHeader className="bg-primary/5">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">
                            {language === 'en' ? agency.nameEn : agency.nameCn}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {agency.code}
                          </CardDescription>
                        </div>
                        <Building2 className="h-8 w-8 text-primary opacity-80" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-sm text-gray-600 mb-4">
                        {language === 'en' ? agency.descriptionEn : agency.descriptionCn}
                      </p>
                      <div className="space-y-2 text-sm">
                        {agency.address && (
                          <div className="flex items-start">
                            <span className="font-medium min-w-[100px]">
                              {language === 'en' ? 'Address:' : '地址：'}
                            </span>
                            <span>{agency.address}</span>
                          </div>
                        )}
                        {agency.contactPerson && (
                          <div className="flex items-start">
                            <span className="font-medium min-w-[100px]">
                              {language === 'en' ? 'Contact:' : '联系人：'}
                            </span>
                            <span>{agency.contactPerson}</span>
                          </div>
                        )}
                        {agency.contactPhone && (
                          <div className="flex items-start">
                            <span className="font-medium min-w-[100px]">
                              {language === 'en' ? 'Phone:' : '电话：'}
                            </span>
                            <span>{agency.contactPhone}</span>
                          </div>
                        )}
                        {agency.contactEmail && (
                          <div className="flex items-start">
                            <span className="font-medium min-w-[100px]">
                              {language === 'en' ? 'Email:' : '邮箱：'}
                            </span>
                            <span>{agency.contactEmail}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 flex justify-between">
                      <div className="flex space-x-2">
                        {agency.certifications && Array.isArray(agency.certifications) && agency.certifications.map((cert, i) => (
                          <span 
                            key={i} 
                            className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${agency.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {agency.isActive 
                          ? (language === 'en' ? 'Active' : '活跃') 
                          : (language === 'en' ? 'Inactive' : '非活跃')}
                      </span>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Testing Parameters Tab */}
          <TabsContent value="parameters">
            <div className="space-y-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">
                  {language === 'en' ? 'Coal Quality Parameters' : '煤炭质量参数'}
                </h2>
                <p className="text-gray-500 mt-2">
                  {language === 'en' 
                    ? 'Key parameters measured in our coal quality testing process' 
                    : '我们煤炭质量检测过程中测量的关键参数'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === 'en' ? 'Primary Parameters' : '主要参数'}
                    </CardTitle>
                    <CardDescription>
                      {language === 'en' 
                        ? 'Essential quality indicators for all coal testing' 
                        : '所有煤炭检测的基本质量指标'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {mockTestingItems.slice(0, 3).map((item) => (
                        <AccordionItem key={item.id} value={`item-${item.id}`}>
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center text-left">
                              <ClipboardCheck className="mr-2 h-4 w-4 text-primary" />
                              <div>
                                <span className="font-medium">
                                  {language === 'en' ? item.nameEn : item.nameCn}
                                </span>
                                <span className="text-sm text-gray-500 ml-2">
                                  ({item.code})
                                </span>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="pl-6 space-y-3">
                              <p className="text-sm text-gray-600">
                                {language === 'en' ? item.descriptionEn : item.descriptionCn}
                              </p>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div className="bg-gray-50 p-2 rounded">
                                  <span className="block text-gray-500 text-xs">
                                    {language === 'en' ? 'Standard' : '标准值'}
                                  </span>
                                  <span className="font-medium">
                                    {item.standardValue} {item.unit}
                                  </span>
                                </div>
                                <div className="bg-gray-50 p-2 rounded">
                                  <span className="block text-gray-500 text-xs">
                                    {language === 'en' ? 'Min' : '最小值'}
                                  </span>
                                  <span className="font-medium">
                                    {item.minValue} {item.unit}
                                  </span>
                                </div>
                                <div className="bg-gray-50 p-2 rounded">
                                  <span className="block text-gray-500 text-xs">
                                    {language === 'en' ? 'Max' : '最大值'}
                                  </span>
                                  <span className="font-medium">
                                    {item.maxValue} {item.unit}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === 'en' ? 'Secondary Parameters' : '次要参数'}
                    </CardTitle>
                    <CardDescription>
                      {language === 'en' 
                        ? 'Additional parameters for detailed analysis' 
                        : '详细分析的附加参数'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {mockTestingItems.slice(3).map((item) => (
                        <AccordionItem key={item.id} value={`item-${item.id}`}>
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center text-left">
                              <ClipboardCheck className="mr-2 h-4 w-4 text-primary" />
                              <div>
                                <span className="font-medium">
                                  {language === 'en' ? item.nameEn : item.nameCn}
                                </span>
                                <span className="text-sm text-gray-500 ml-2">
                                  ({item.code})
                                </span>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="pl-6 space-y-3">
                              <p className="text-sm text-gray-600">
                                {language === 'en' ? item.descriptionEn : item.descriptionCn}
                              </p>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div className="bg-gray-50 p-2 rounded">
                                  <span className="block text-gray-500 text-xs">
                                    {language === 'en' ? 'Standard' : '标准值'}
                                  </span>
                                  <span className="font-medium">
                                    {item.standardValue} {item.unit}
                                  </span>
                                </div>
                                <div className="bg-gray-50 p-2 rounded">
                                  <span className="block text-gray-500 text-xs">
                                    {language === 'en' ? 'Min' : '最小值'}
                                  </span>
                                  <span className="font-medium">
                                    {item.minValue} {item.unit}
                                  </span>
                                </div>
                                <div className="bg-gray-50 p-2 rounded">
                                  <span className="block text-gray-500 text-xs">
                                    {language === 'en' ? 'Max' : '最大值'}
                                  </span>
                                  <span className="font-medium">
                                    {item.maxValue} {item.unit}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                    
                    <div className="mt-6 text-center">
                      <Link href="/services/testing-records?tab=add-record">
                        <Button>
                          {language === 'en' ? 'Request Testing' : '申请检测'}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Process Tab */}
          <TabsContent value="process">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Coal Testing Process' : '煤炭检测流程'}
                </CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Understanding the complete testing workflow' 
                    : '了解完整的检测工作流程'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-12">
                  <div className="relative">
                    <div className="absolute top-0 left-7 bottom-0 w-[2px] bg-gray-200 -z-10"></div>
                    
                    <div className="space-y-12">
                      {/* Step 1 */}
                      <div className="flex">
                        <div className="flex-shrink-0 mr-4">
                          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white font-bold">
                            1
                          </div>
                        </div>
                        <div className="pt-2">
                          <h3 className="text-xl font-bold mb-2">
                            {language === 'en' ? 'Sample Collection' : '样本采集'}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {language === 'en' 
                              ? 'Coal samples are collected according to standardized procedures to ensure representativeness.' 
                              : '根据标准化程序收集煤炭样本，以确保代表性。'}
                          </p>
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <h4 className="font-medium text-sm text-gray-700 mb-2">
                              {language === 'en' ? 'Key Points:' : '要点：'}
                            </h4>
                            <ul className="text-sm space-y-1">
                              <li className="flex items-start">
                                <Check className="mr-2 h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                <span>
                                  {language === 'en' 
                                    ? 'Samples taken from multiple points in the coal lot' 
                                    : '从煤炭批次的多个点采样'}
                                </span>
                              </li>
                              <li className="flex items-start">
                                <Check className="mr-2 h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                <span>
                                  {language === 'en' 
                                    ? 'Proper labeling with sample ID and location details' 
                                    : '正确标记样本ID和位置详情'}
                                </span>
                              </li>
                              <li className="flex items-start">
                                <Check className="mr-2 h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                <span>
                                  {language === 'en' 
                                    ? 'Secure packaging to preserve sample integrity' 
                                    : '安全包装以保持样本完整性'}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      {/* Step 2 */}
                      <div className="flex">
                        <div className="flex-shrink-0 mr-4">
                          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white font-bold">
                            2
                          </div>
                        </div>
                        <div className="pt-2">
                          <h3 className="text-xl font-bold mb-2">
                            {language === 'en' ? 'Laboratory Preparation' : '实验室准备'}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {language === 'en' 
                              ? 'Samples are prepared in the laboratory for analysis according to international standards.' 
                              : '根据国际标准在实验室准备样本进行分析。'}
                          </p>
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <h4 className="font-medium text-sm text-gray-700 mb-2">
                              {language === 'en' ? 'Key Points:' : '要点：'}
                            </h4>
                            <ul className="text-sm space-y-1">
                              <li className="flex items-start">
                                <Check className="mr-2 h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                <span>
                                  {language === 'en' 
                                    ? 'Samples are crushed, divided, and reduced to obtain representative portions' 
                                    : '样本被粉碎、分割和减少以获得代表性部分'}
                                </span>
                              </li>
                              <li className="flex items-start">
                                <Check className="mr-2 h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                <span>
                                  {language === 'en' 
                                    ? 'Multiple sub-samples are prepared for different analyses' 
                                    : '准备多个子样本用于不同的分析'}
                                </span>
                              </li>
                              <li className="flex items-start">
                                <Check className="mr-2 h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                <span>
                                  {language === 'en' 
                                    ? 'Quality control checks are implemented throughout preparation' 
                                    : '在整个准备过程中实施质量控制检查'}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      {/* Step 3 */}
                      <div className="flex">
                        <div className="flex-shrink-0 mr-4">
                          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white font-bold">
                            3
                          </div>
                        </div>
                        <div className="pt-2">
                          <h3 className="text-xl font-bold mb-2">
                            {language === 'en' ? 'Analysis' : '分析'}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {language === 'en' 
                              ? 'Samples are analyzed for their physical and chemical properties using state-of-the-art equipment.' 
                              : '使用最先进的设备分析样本的物理和化学性质。'}
                          </p>
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <h4 className="font-medium text-sm text-gray-700 mb-2">
                              {language === 'en' ? 'Key Points:' : '要点：'}
                            </h4>
                            <ul className="text-sm space-y-1">
                              <li className="flex items-start">
                                <Check className="mr-2 h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                <span>
                                  {language === 'en' 
                                    ? 'Analysis conducted according to ISO and ASTM standards' 
                                    : '根据ISO和ASTM标准进行分析'}
                                </span>
                              </li>
                              <li className="flex items-start">
                                <Check className="mr-2 h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                <span>
                                  {language === 'en' 
                                    ? 'Multiple parameters measured including calorific value, ash, sulfur, and moisture' 
                                    : '测量多个参数，包括发热量、灰分、硫和水分'}
                                </span>
                              </li>
                              <li className="flex items-start">
                                <Check className="mr-2 h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                <span>
                                  {language === 'en' 
                                    ? 'Regular calibration and verification of testing equipment' 
                                    : '定期校准和验证测试设备'}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      {/* Step 4 */}
                      <div className="flex">
                        <div className="flex-shrink-0 mr-4">
                          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white font-bold">
                            4
                          </div>
                        </div>
                        <div className="pt-2">
                          <h3 className="text-xl font-bold mb-2">
                            {language === 'en' ? 'Reporting' : '报告'}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {language === 'en' 
                              ? 'Results are compiled into comprehensive reports with detailed analysis and interpretation.' 
                              : '将结果编入全面的报告，包含详细分析和解释。'}
                          </p>
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <h4 className="font-medium text-sm text-gray-700 mb-2">
                              {language === 'en' ? 'Key Points:' : '要点：'}
                            </h4>
                            <ul className="text-sm space-y-1">
                              <li className="flex items-start">
                                <Check className="mr-2 h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                <span>
                                  {language === 'en' 
                                    ? 'Digital reports available through our platform' 
                                    : '通过我们的平台提供数字报告'}
                                </span>
                              </li>
                              <li className="flex items-start">
                                <Check className="mr-2 h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                <span>
                                  {language === 'en' 
                                    ? 'Weighted average calculations for multiple samples' 
                                    : '多个样本的加权平均计算'}
                                </span>
                              </li>
                              <li className="flex items-start">
                                <Check className="mr-2 h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                <span>
                                  {language === 'en' 
                                    ? 'Comparison with historical data and industry benchmarks' 
                                    : '与历史数据和行业基准进行比较'}
                                </span>
                              </li>
                              <li className="flex items-start">
                                <Check className="mr-2 h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                <span>
                                  {language === 'en' 
                                    ? 'Long-term data storage for future reference' 
                                    : '长期数据存储以供将来参考'}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-8">
                    <Link href="/services/testing-records">
                      <Button className="bg-primary hover:bg-primary/90">
                        {language === 'en' ? 'View Your Testing Records' : '查看您的检测记录'}
                        <TrendingUp className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
}