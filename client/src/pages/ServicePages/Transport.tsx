import { useLanguage } from "@/hooks/use-language";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";

// Import icons instead of SVG files
import { Truck, ClipboardList, Users, Map, Clock, Package, CheckCircle } from "lucide-react";

export default function Transport() {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  // Fetch the service details
  const { data: service } = useQuery({
    queryKey: ["/api/coal-services", "transport"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  return (
    <section className="container max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col gap-6">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {isEnglish ? "Coal Transport Service" : "煤炭运输服务"}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {isEnglish
                ? "Efficient and reliable coal transportation solutions connecting customers with drivers for seamless delivery experiences."
                : "高效可靠的煤炭运输解决方案，连接客户与司机，提供无缝的运输体验。"}
            </p>
          </div>

          {/* Main Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="overflow-hidden border-blue-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-r from-blue-50 to-sky-50 p-6">
                <div className="flex justify-center mb-4">
                  <div className="h-32 w-32 rounded-full bg-blue-100 flex items-center justify-center">
                    <ClipboardList size={64} className="text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2 text-center">
                  {isEnglish ? "Smart Order Processing" : "智能订单处理"}
                </h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? "Create transport orders through our platform with detailed requirements including origin, destination, coal type, quantity, and delivery timeframe."
                    : "通过我们的平台创建运输订单，详细说明需求，包括起点、目的地、煤炭类型、数量和交付时间框架。"}
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden border-blue-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-r from-blue-50 to-sky-50 p-6">
                <div className="flex justify-center mb-4">
                  <div className="h-32 w-32 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users size={64} className="text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2 text-center">
                  {isEnglish ? "Intelligent Driver Matching" : "智能司机匹配"}
                </h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? "Our algorithm matches your transport needs with qualified drivers in your area, considering experience, ratings, and equipment suitability."
                    : "我们的算法将您的运输需求与您所在地区的合格司机进行匹配，考虑经验、评级和设备适用性。"}
                </p>
              </div>
            </Card>
          </div>

          {/* How It Works Section */}
          <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl p-8 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 text-center">
              {isEnglish ? "How Our Transport Service Works" : "我们的运输服务如何运作"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="bg-white rounded-full p-3 shadow-md mb-4">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
                    <span className="text-blue-700 text-2xl font-bold">1</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                  {isEnglish ? "Place Transport Request" : "发布运输请求"}
                </h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? "Submit details about your coal transport needs through our platform."
                    : "通过我们的平台提交有关您的煤炭运输需求的详细信息。"}
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-white rounded-full p-3 shadow-md mb-4">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
                    <span className="text-blue-700 text-2xl font-bold">2</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                  {isEnglish ? "Driver Accepts Order" : "司机接单"}
                </h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? "Qualified drivers in your area will receive your request and can accept the job."
                    : "您所在地区的合格司机将收到您的请求并可以接受工作。"}
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-white rounded-full p-3 shadow-md mb-4">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
                    <span className="text-blue-700 text-2xl font-bold">3</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                  {isEnglish ? "Execution & Tracking" : "执行与跟踪"}
                </h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? "Track the transport process in real-time until delivery is complete."
                    : "实时跟踪运输过程，直到交付完成。"}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Features */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-700">
              {isEnglish ? "Key Features" : "核心功能"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border border-blue-100">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center">
                        <Truck size={32} className="text-blue-500" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-blue-700 mb-2">
                        {isEnglish ? "Flexible Transport Options" : "灵活的运输选项"}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {isEnglish
                          ? "Choose from various transport options based on your coal type, quantity, and urgency requirements."
                          : "根据您的煤炭类型、数量和紧急程度要求，从各种运输选项中进行选择。"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-blue-100">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center">
                        <Map size={32} className="text-blue-500" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-blue-700 mb-2">
                        {isEnglish ? "Real-time Tracking" : "实时跟踪"}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {isEnglish
                          ? "Monitor your shipment location, estimated arrival time, and any potential delays in real-time."
                          : "实时监控您的货物位置、预计到达时间以及任何潜在的延误。"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-blue-100">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center">
                        <Package size={32} className="text-blue-500" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-blue-700 mb-2">
                        {isEnglish ? "Secure Documentation" : "安全文档"}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {isEnglish
                          ? "Digital receipts, bills of lading, and delivery confirmations available on the platform."
                          : "平台上提供电子收据、提单和交付确认。"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-blue-100">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center">
                        <Clock size={32} className="text-blue-500" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-blue-700 mb-2">
                        {isEnglish ? "Delivery Scheduling" : "交付调度"}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {isEnglish
                          ? "Plan transport in advance with scheduled pickups and deliveries at preferred times."
                          : "通过在首选时间安排的提货和交付，提前计划运输。"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-b from-blue-500 to-blue-700 text-white rounded-xl p-8 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              {isEnglish ? "Benefits" : "优势"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-600 bg-opacity-30 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {isEnglish ? "For Coal Producers" : "对煤炭生产商"}
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-200" />
                    <span>
                      {isEnglish ? "Reduced logistics complexity" : "降低物流复杂性"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>
                      {isEnglish ? "Reliable delivery tracking" : "可靠的交付跟踪"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>
                      {isEnglish ? "Expanded market reach" : "扩大市场覆盖范围"}
                    </span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-600 bg-opacity-30 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {isEnglish ? "For Coal Buyers" : "对煤炭买家"}
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>
                      {isEnglish ? "On-time deliveries" : "准时交付"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>
                      {isEnglish ? "Transparent pricing" : "透明定价"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>
                      {isEnglish ? "Quality verification on delivery" : "交付时的质量验证"}
                    </span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-600 bg-opacity-30 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {isEnglish ? "For Transport Providers" : "对运输提供商"}
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>
                      {isEnglish ? "Steady job opportunities" : "稳定的工作机会"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>
                      {isEnglish ? "Simplified payment processing" : "简化的付款处理"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>
                      {isEnglish ? "Route optimization tools" : "路线优化工具"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-700">
              {isEnglish ? "Ready to Optimize Your Coal Transportation?" : "准备优化您的煤炭运输?"}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              {isEnglish
                ? "Access our transport platform and start connecting with qualified drivers today."
                : "访问我们的运输平台，今天就开始与合格的司机建立联系。"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                {isEnglish ? "Access Transport Platform" : "访问运输平台"}
              </Button>
              <Link href="/consultation">
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600">
                  {isEnglish ? "Request Consultation" : "请求咨询"}
                </Button>
              </Link>
            </div>
          </div>

          <Separator className="my-8" />

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-blue-700">
              {isEnglish ? "Frequently Asked Questions" : "常见问题"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg text-blue-700 mb-2">
                  {isEnglish 
                    ? "What types of coal transport are supported?"
                    : "支持哪些类型的煤炭运输?"}
                </h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? "Our platform supports various transport methods including truck, rail, and intermodal options depending on your location and requirements."
                    : "我们的平台支持各种运输方式，包括卡车、铁路和联运选项，具体取决于您的位置和要求。"}
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg text-blue-700 mb-2">
                  {isEnglish 
                    ? "How are transport costs calculated?"
                    : "运输成本如何计算?"}
                </h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? "Transport costs are calculated based on distance, weight, fuel costs, transport method, and any special handling requirements for your coal shipment."
                    : "运输成本根据距离、重量、燃料成本、运输方式以及煤炭运输的任何特殊处理要求计算。"}
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg text-blue-700 mb-2">
                  {isEnglish 
                    ? "How quickly can I find a transport provider?"
                    : "我能多快找到运输提供商?"}
                </h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? "In most major coal regions, transport providers can be matched within hours. For remote locations or specialized requirements, it may take up to 24 hours."
                    : "在大多数主要煤炭地区，运输提供商可以在几小时内匹配。对于偏远地区或特殊要求，可能需要长达24小时。"}
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg text-blue-700 mb-2">
                  {isEnglish 
                    ? "Is insurance included for my coal transport?"
                    : "我的煤炭运输是否包含保险?"}
                </h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? "Basic insurance is included in all transports. Additional coverage options are available based on the value and risk profile of your shipment."
                    : "所有运输都包含基本保险。根据您的货物的价值和风险状况，可提供额外的保险选项。"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}