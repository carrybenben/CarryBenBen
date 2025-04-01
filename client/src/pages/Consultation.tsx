import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { 
  fetchHotInsights, 
  sendAiConsultationMessage, 
  type IndustryInsight 
} from '@/lib/industryInsights';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Lock, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Send, 
  Loader2, 
  MessageSquare, 
  FileText, 
  ChevronRight, 
  Eye 
} from 'lucide-react';

// 定义AI聊天消息类型
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// 定义咨询表单架构
const consultationSchema = z.object({
  message: z.string().min(5, {
    message: '消息必须至少5个字符。'
  }),
});

type ConsultationValues = z.infer<typeof consultationSchema>;

export default function ConsultationPage() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [insights, setInsights] = useState<IndustryInsight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [processingAI, setProcessingAI] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('hotInsights');
  
  // 初始化表单
  const form = useForm<ConsultationValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      message: '',
    },
  });
  
  // 加载热门行业内参
  useEffect(() => {
    async function loadInsights() {
      try {
        setLoading(true);
        const data = await fetchHotInsights();
        setInsights(data);
      } catch (error) {
        console.error("Error loading insights:", error);
        toast({
          title: language === 'en' ? "Error" : "错误",
          description: language === 'en' ? "Failed to load industry insights" : "加载行业内参失败",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    
    loadInsights();
  }, [language, toast]);
  
  // AI对话处理逻辑
  const handleAIConsultation = async (data: ConsultationValues) => {
    try {
      setProcessingAI(true);
      
      // 添加用户消息到聊天历史
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: data.message,
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, userMessage]);
      
      // 发送消息到AI并获取响应
      const aiResponse = await sendAiConsultationMessage(data.message);
      
      // 添加AI响应到聊天历史
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, assistantMessage]);
      
      // 重置表单
      form.reset();
    } catch (error) {
      console.error("AI consultation error:", error);
      toast({
        title: language === 'en' ? "Error" : "错误",
        description: language === 'en' ? "Failed to get AI response" : "获取AI回应失败",
        variant: "destructive",
      });
    } finally {
      setProcessingAI(false);
    }
  };
  
  // 时间格式化函数
  const formatDateTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            {language === 'en' ? 'Coal Industry Consultation' : '煤事咨询服务'}
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Get the latest industry insights and AI-powered expert consultation for the coal industry.' 
              : '获取最新煤炭行业内参和AI专家咨询服务。'}
          </p>
        </div>
        
        {/* 主要内容区域 */}
        <Tabs defaultValue="hotInsights" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="hotInsights" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                {language === 'en' ? 'Hot Insights' : '热门内参'}
              </TabsTrigger>
              <TabsTrigger value="aiConsultation" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                {language === 'en' ? 'AI Consultation' : 'AI咨询'}
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* 热门行业内参标签内容 */}
          <TabsContent value="hotInsights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Top Industry Insights' : '每日煤炭行业热门内参'}
                </CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'The latest and most popular coal industry reports and analyses.' 
                    : '最新、最热门的煤炭行业报告与分析。'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center items-center h-[400px]">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2 text-muted-foreground">
                      {language === 'en' ? 'Loading insights...' : '加载内参中...'}
                    </span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {insights.map((insight) => (
                      <Card key={insight.id} className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300">
                        <CardHeader className="p-4 bg-gray-50">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base font-semibold text-blue-800 line-clamp-2">
                              {language === 'en' ? insight.titleEn : insight.titleCn}
                            </CardTitle>
                            {insight.isPremium && (
                              <Badge variant="outline" className="flex items-center gap-1 bg-amber-50 text-amber-600 border-amber-200">
                                <Lock className="h-3 w-3" />
                                {language === 'en' ? 'Premium' : '高级'}
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-sm mt-1">
                            {language === 'en' ? insight.sourceEn : insight.sourceCn}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                          <div className="flex items-center text-xs text-gray-500 mb-3">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>{insight.publishDate}</span>
                            <Separator orientation="vertical" className="mx-2 h-3" />
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            <span>{insight.readCount}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button variant="outline" size="sm" className="w-full" asChild>
                            <a href={insight.linkUrl}>
                              <span className="flex items-center justify-center">
                                <FileText className="mr-1 h-4 w-4" />
                                {language === 'en' ? 'Read Full Report' : '阅读完整报告'}
                                <ChevronRight className="ml-1 h-4 w-4" />
                              </span>
                            </a>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* 订阅行业内参卡片 */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
              <CardContent className="pt-6 pb-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-800 mb-2">
                      {language === 'en' ? 'Subscribe to Premium Insights' : '订阅高级行业内参'}
                    </h3>
                    <p className="text-blue-700 mb-0">
                      {language === 'en' 
                        ? 'Get exclusive access to in-depth analysis and expert forecasts' 
                        : '获取独家深度分析和专家预测'}
                    </p>
                  </div>
                  <Button size="lg" className="bg-blue-700 hover:bg-blue-800">
                    {language === 'en' ? 'Subscribe Now' : '立即订阅'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* AI咨询标签内容 */}
          <TabsContent value="aiConsultation">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* AI对话区域 */}
              <div className="md:col-span-2">
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle>
                      {language === 'en' ? 'AI Consultation Assistant' : 'AI咨询助手'}
                    </CardTitle>
                    <CardDescription>
                      {language === 'en' 
                        ? 'Powered by deepseek-r1, our AI assistant specializes in coal industry knowledge' 
                        : '由deepseek-r1提供支持，我们的AI助手专注于煤炭行业知识'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-col h-[400px]">
                      {/* 消息历史区域 */}
                      <ScrollArea className="flex-grow pr-4 mb-4">
                        <div className="space-y-4">
                          {chatMessages.length === 0 ? (
                            <div className="h-72 flex flex-col items-center justify-center text-center">
                              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                <MessageSquare className="h-8 w-8 text-blue-600" />
                              </div>
                              <h3 className="text-lg font-medium mb-2">
                                {language === 'en' ? 'Start a new consultation' : '开始新的咨询'}
                              </h3>
                              <p className="text-muted-foreground max-w-md">
                                {language === 'en'
                                  ? 'Ask anything about coal industry, market trends, technical questions, or request specific analysis.'
                                  : '询问任何关于煤炭行业、市场趋势、技术问题或请求特定分析。'}
                              </p>
                            </div>
                          ) : (
                            chatMessages.map((msg) => (
                              <div 
                                key={msg.id} 
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                              >
                                <div 
                                  className={`flex items-start max-w-[80%] ${
                                    msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                                  }`}
                                >
                                  <Avatar className={`${msg.role === 'user' ? 'ml-3' : 'mr-3'} h-8 w-8`}>
                                    <AvatarFallback>
                                      {msg.role === 'user' ? '您' : 'AI'}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div 
                                      className={`rounded-lg px-4 py-2 ${
                                        msg.role === 'user' 
                                          ? 'bg-blue-600 text-white' 
                                          : 'bg-gray-100 text-gray-900'
                                      }`}
                                    >
                                      <p className="text-sm">{msg.content}</p>
                                    </div>
                                    <div 
                                      className={`text-xs text-gray-500 mt-1 ${
                                        msg.role === 'user' ? 'text-right' : 'text-left'
                                      }`}
                                    >
                                      {formatDateTime(msg.timestamp)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                          {processingAI && (
                            <div className="flex justify-start">
                              <div className="flex items-start">
                                <Avatar className="mr-3 h-8 w-8">
                                  <AvatarFallback>AI</AvatarFallback>
                                </Avatar>
                                <div className="bg-gray-100 rounded-lg px-4 py-2">
                                  <div className="flex items-center">
                                    <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"></div>
                                    <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce mx-1" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                      
                      {/* 输入消息表单 */}
                      <Form {...form}>
                        <form 
                          onSubmit={form.handleSubmit(handleAIConsultation)} 
                          className="flex items-end gap-2"
                        >
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem className="flex-grow">
                                <FormControl>
                                  <Textarea 
                                    placeholder={language === 'en' 
                                      ? "Type your question about coal industry..." 
                                      : "输入您关于煤炭行业的问题..."
                                    }
                                    className="min-h-[80px] resize-none"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button 
                            type="submit" 
                            size="icon" 
                            className="h-10 w-10"
                            disabled={processingAI || form.formState.isSubmitting}
                          >
                            {processingAI ? (
                              <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                              <Send className="h-5 w-5" />
                            )}
                            <span className="sr-only">Send</span>
                          </Button>
                        </form>
                      </Form>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* 功能介绍与提示区域 */}
              <div>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>
                      {language === 'en' ? 'About Our AI Service' : '关于我们的AI服务'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* 功能特点 */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-blue-800 flex items-center gap-2">
                          <TrendingUp className="h-5 w-5" />
                          {language === 'en' ? 'Expert Industry Knowledge' : '专家行业知识'}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {language === 'en'
                            ? 'Our AI is trained on comprehensive coal industry data and market research, providing accurate and up-to-date information.'
                            : '我们的AI基于全面的煤炭行业数据和市场研究进行训练，提供准确且最新的信息。'}
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold text-blue-800 flex items-center gap-2">
                          <MessageSquare className="h-5 w-5" />
                          {language === 'en' ? 'Personalized Consultation' : '个性化咨询'}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {language === 'en'
                            ? 'Get customized responses based on your specific business needs, whether you\'re a producer, trader, or end-user.'
                            : '根据您的特定业务需求获取量身定制的回应，无论您是生产商、贸易商还是终端用户。'}
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold text-blue-800 flex items-center gap-2">
                          <Clock className="h-5 w-5" />
                          {language === 'en' ? '24/7 Availability' : '全天候可用'}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {language === 'en'
                            ? 'Access instant coal industry expertise whenever you need it, without waiting for business hours.'
                            : '随时随地获取即时煤炭行业专业知识，无需等待工作时间。'}
                        </p>
                      </div>
                      
                      {/* 使用提示 */}
                      <div className="mt-8 pt-4 border-t border-gray-200">
                        <h3 className="font-semibold mb-3">
                          {language === 'en' ? 'Try asking about:' : '尝试咨询：'}
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-blue-600" />
                            {language === 'en' ? 'Current coal market trends and price forecasts' : '当前煤炭市场趋势与价格预测'}
                          </li>
                          <li className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-blue-600" />
                            {language === 'en' ? 'Technical specifications for different coal types' : '不同煤炭类型的技术规格'}
                          </li>
                          <li className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-blue-600" />
                            {language === 'en' ? 'Regulatory changes affecting the coal industry' : '影响煤炭行业的监管变化'}
                          </li>
                          <li className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-blue-600" />
                            {language === 'en' ? 'Supply chain optimization strategies' : '供应链优化策略'}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}