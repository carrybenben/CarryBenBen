import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertWaitlistSchema, 
  insertConsultationRequestSchema,
  insertServicePageSchema,
  insertCoalServiceSchema,
  insertTestingAgencySchema,
  insertTestingItemSchema,
  insertTestingRecordSchema,
  insertCoalProductSchema,
  insertCoalBidSchema,
  insertCoalOrderSchema,
  insertCoalFavoriteSchema,
  insertCollateralFinancingApplicationSchema,
  insertTransportOrderSchema,
  insertTransportDriverSchema,
  insertTransportVehicleSchema,
  insertTransportTrackingSchema
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import WxPay from 'wechatpay-node-v3';
import * as AlipaySdk from 'alipay-sdk';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { TransportOrderProcessor } from "./ai/transportOrderProcessor";

export async function registerRoutes(app: Express): Promise<Server> {
  // 检查是否有Deepseek API Key
  const hasDeepseekAPIKey = process.env.DEEPSEEK_API_KEY !== undefined;
  // put application routes here
  // prefix all routes with /api

  // General API endpoints
  app.get("/api/hello", (req, res) => {
    res.json({ 
      success: true,
      message: "Hello from server!" 
    });
  });

  // Language selection
  app.get("/api/language/:lang", (req, res) => {
    const { lang } = req.params;
    if (lang === 'en' || lang === 'cn') {
      res.cookie('preferredLanguage', lang, { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1 year
      return res.json({ success: true, language: lang });
    }
    return res.status(400).json({ 
      success: false, 
      message: "Invalid language selection" 
    });
  });

  // Waitlist submission endpoint
  app.post("/api/waitlist", async (req, res) => {
    try {
      // Validate request body
      const result = insertWaitlistSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      // Create waitlist entry
      const waitlistEntry = await storage.createWaitlistEntry(result.data);
      
      return res.status(201).json({
        success: true,
        message: "Successfully joined the waitlist",
        data: {
          id: waitlistEntry.id,
          email: waitlistEntry.email,
          createdAt: waitlistEntry.createdAt
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Email already registered on waitlist") {
          return res.status(409).json({ 
            success: false, 
            message: "This email is already on our waitlist"
          });
        }
      }
      
      return res.status(500).json({ 
        success: false, 
        message: "Failed to join waitlist. Please try again later."
      });
    }
  });

  // Get all waitlist entries
  app.get("/api/waitlist", async (req, res) => {
    try {
      const entries = await storage.getAllWaitlistEntries();
      
      return res.status(200).json({
        success: true,
        data: entries.map(entry => ({
          id: entry.id,
          name: entry.name,
          email: entry.email,
          company: entry.company,
          serviceInterest: entry.serviceInterest,
          createdAt: entry.createdAt
        }))
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch waitlist entries"
      });
    }
  });

  // Coal Services endpoints
  app.get("/api/coal-services", async (req, res) => {
    try {
      const services = await storage.getAllCoalServices();
      return res.json(services);
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch services"
      });
    }
  });

  app.get("/api/coal-services/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const service = await storage.getCoalServiceBySlug(slug);
      
      if (!service) {
        return res.status(404).json({ 
          success: false, 
          message: "Service not found" 
        });
      }
      
      return res.json(service);
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch service"
      });
    }
  });

  // Service Pages endpoints
  app.get("/api/service-pages", async (req, res) => {
    try {
      const pages = await storage.getAllServicePages();
      return res.status(200).json({
        success: true,
        data: pages
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch service pages"
      });
    }
  });

  app.get("/api/service-pages/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const page = await storage.getServicePageBySlug(slug);
      
      if (!page) {
        return res.status(404).json({ 
          success: false, 
          message: "Service page not found" 
        });
      }
      
      return res.status(200).json({
        success: true,
        data: page
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch service page"
      });
    }
  });

  app.get("/api/coal-services/:serviceId/pages", async (req, res) => {
    try {
      const serviceId = parseInt(req.params.serviceId);
      
      if (isNaN(serviceId)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid service ID" 
        });
      }
      
      const pages = await storage.getServicePagesByServiceId(serviceId);
      return res.json(pages);
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch service pages"
      });
    }
  });

  // Consultation Request endpoints
  app.post("/api/consultation-requests", async (req, res) => {
    try {
      const result = insertConsultationRequestSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      const request = await storage.createConsultationRequest(result.data);
      return res.status(201).json({
        success: true,
        message: "Consultation request submitted successfully",
        data: {
          id: request.id,
          name: request.name,
          email: request.email,
          serviceType: request.serviceType,
          status: request.status,
          createdAt: request.createdAt
        }
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to submit consultation request"
      });
    }
  });
  
  // Get all consultation requests (admin endpoint)
  app.get("/api/consultation-requests", async (req, res) => {
    try {
      const requests = await storage.getAllConsultationRequests();
      return res.status(200).json({
        success: true,
        data: requests
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch consultation requests"
      });
    }
  });
  
  // Get specific consultation request (admin endpoint)
  app.get("/api/consultation-requests/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid request ID" 
        });
      }
      
      const request = await storage.getConsultationRequestById(id);
      
      if (!request) {
        return res.status(404).json({ 
          success: false, 
          message: "Consultation request not found" 
        });
      }
      
      return res.status(200).json({
        success: true,
        data: request
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch consultation request"
      });
    }
  });
  
  // Update consultation request status (admin endpoint)
  app.patch("/api/consultation-requests/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid request ID" 
        });
      }
      
      if (!status || typeof status !== 'string') {
        return res.status(400).json({ 
          success: false, 
          message: "Status is required" 
        });
      }
      
      const updatedRequest = await storage.updateConsultationRequestStatus(id, status);
      
      if (!updatedRequest) {
        return res.status(404).json({ 
          success: false, 
          message: "Consultation request not found" 
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "Status updated successfully",
        data: updatedRequest
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to update status"
      });
    }
  });
  
  // 获取热门行业内参
  app.get("/api/industry-insights", async (req, res) => {
    try {
      // 在实际项目中，这里应该从数据库获取内参数据
      // 现在我们返回模拟数据 - 这里是模拟API响应
      const insights = [
        {
          id: 1,
          titleCn: "2025年第一季度煤炭价格分析报告",
          titleEn: "2025 Q1 Coal Price Analysis Report",
          sourceCn: "中国煤炭经济研究院",
          sourceEn: "China Coal Economy Research Institute",
          publishDate: "2025-03-30",
          readCount: 1856,
          linkUrl: "/insights/1",
          isPremium: false
        },
        {
          id: 2,
          titleCn: "国内动力煤市场供需趋势预测",
          titleEn: "Supply and Demand Trends in Domestic Thermal Coal Market",
          sourceCn: "煤炭工业协会",
          sourceEn: "Coal Industry Association",
          publishDate: "2025-03-29",
          readCount: 1723,
          linkUrl: "/insights/2",
          isPremium: false
        },
        {
          id: 3,
          titleCn: "新能源替代下的煤炭行业转型路径研究",
          titleEn: "Research on Coal Industry Transformation Path under New Energy Substitution",
          sourceCn: "国家能源研究中心",
          sourceEn: "National Energy Research Center",
          publishDate: "2025-03-28",
          readCount: 1542,
          linkUrl: "/insights/3",
          isPremium: true
        },
        {
          id: 4,
          titleCn: "煤炭企业ESG发展报告：绿色矿山建设进展",
          titleEn: "Coal Enterprise ESG Development Report: Green Mine Construction Progress",
          sourceCn: "中国矿业大学",
          sourceEn: "China University of Mining and Technology",
          publishDate: "2025-03-27",
          readCount: 1429,
          linkUrl: "/insights/4",
          isPremium: false
        },
        {
          id: 5,
          titleCn: "环保政策调整对煤炭生产的影响分析",
          titleEn: "Analysis of Environmental Policy Adjustments on Coal Production",
          sourceCn: "生态环境部研究所",
          sourceEn: "Research Institute of Ministry of Ecology and Environment",
          publishDate: "2025-03-26",
          readCount: 1387,
          linkUrl: "/insights/5",
          isPremium: false
        },
        {
          id: 6,
          titleCn: "国际煤炭贸易格局变化与中国应对策略",
          titleEn: "Changes in International Coal Trade Pattern and China's Response Strategy",
          sourceCn: "对外经济贸易大学",
          sourceEn: "University of International Business and Economics",
          publishDate: "2025-03-25",
          readCount: 1246,
          linkUrl: "/insights/6",
          isPremium: true
        },
        {
          id: 7,
          titleCn: "煤炭智能开采技术最新进展",
          titleEn: "Latest Progress in Coal Intelligent Mining Technology",
          sourceCn: "中国矿业协会",
          sourceEn: "China Mining Association",
          publishDate: "2025-03-24",
          readCount: 1132,
          linkUrl: "/insights/7",
          isPremium: false
        },
        {
          id: 8,
          titleCn: "碳中和背景下煤炭行业发展战略研究",
          titleEn: "Research on Coal Industry Development Strategy under Carbon Neutrality",
          sourceCn: "国家发改委能源研究所",
          sourceEn: "Energy Research Institute of NDRC",
          publishDate: "2025-03-23",
          readCount: 1045,
          linkUrl: "/insights/8",
          isPremium: true
        },
        {
          id: 9,
          titleCn: "煤炭物流运输成本优化方案分析",
          titleEn: "Analysis of Coal Logistics Transportation Cost Optimization Solutions",
          sourceCn: "交通运输部规划研究院",
          sourceEn: "Planning Research Institute of Ministry of Transport",
          publishDate: "2025-03-22",
          readCount: 987,
          linkUrl: "/insights/9",
          isPremium: false
        },
        {
          id: 10,
          titleCn: "煤炭企业数字化转型案例与经验分享",
          titleEn: "Coal Enterprise Digital Transformation Cases and Experience Sharing",
          sourceCn: "中国煤炭工业出版社",
          sourceEn: "China Coal Industry Publishing House",
          publishDate: "2025-03-21",
          readCount: 924,
          linkUrl: "/insights/10",
          isPremium: false
        }
      ];
      
      return res.status(200).json({
        success: true,
        message: "Successfully retrieved industry insights",
        data: insights
      });
    } catch (error) {
      console.error("Error fetching industry insights:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch industry insights" 
      });
    }
  });

  // AI咨询服务 - 支持DeepSeek API或本地Ollama模型
  // AI咨询服务 - 支持DeepSeek API、本地Ollama模型或预设回复
  app.post("/api/ai-consultation", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({ 
          success: false, 
          message: "Message is required" 
        });
      }
      
      let aiResponse;
      
      // 系统提示词 - 设置AI角色为煤炭行业专家
      const systemPrompt = `你是一位煤炭行业专家，擅长回答关于煤炭市场、产品、价格、政策、技术和行业趋势的问题。
                       请提供专业、准确、有深度的回答，并在适当的时候引用数据和趋势。
                       如果用户用英文提问，请用英文回答；如果用中文提问，请用中文回答。`;

      // 根据当前设置的模型优先级选择AI处理方式
      console.log(`Using model priority: ${currentModelPriority}`);
      
      // 只使用fallback模式
      if (currentModelPriority === 'fallback' || process.env.USE_FALLBACK_ONLY === 'true') {
        console.log("Using fallback response mode");
        aiResponse = generateFallbackResponse(message);
        return res.json({
          success: true,
          data: aiResponse
        });
      }
      // 优先使用本地Ollama
      if (currentModelPriority === 'local' || (currentModelPriority === 'auto' && process.env.USE_LOCAL_LLM === 'true')) {
        try {
          console.log("Attempting to use local Ollama model for AI consultation");
          
          // 确定Ollama API地址
          // 默认使用localhost，但允许通过环境变量配置
          const ollamaHost = process.env.OLLAMA_HOST || 'localhost';
          const ollamaPort = process.env.OLLAMA_PORT || '11434';
          const ollamaModel = process.env.OLLAMA_MODEL || 'deepseek-r1';
          
          console.log(`Attempting to connect to Ollama at ${ollamaHost}:${ollamaPort} using model ${ollamaModel}`);
          
          // 调用Ollama API
          const ollamaResponse = await fetch(`http://${ollamaHost}:${ollamaPort}/api/generate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              model: ollamaModel,
              prompt: `${systemPrompt}\n\n用户: ${message}\n\n助手:`,
              stream: false,
              options: {
                temperature: 0.7,
                top_p: 0.9,
                max_tokens: 800
              }
            }),
            // 添加超时设置，避免长时间等待
            signal: AbortSignal.timeout(10000) // 10秒超时
          });
          
          if (!ollamaResponse.ok) {
            throw new Error(`Ollama API error: ${ollamaResponse.statusText}`);
          }
          
          const ollamaData = await ollamaResponse.json();
          aiResponse = ollamaData.response;
          
          if (!aiResponse || aiResponse.trim() === '') {
            console.warn("Empty response from Ollama, using fallback");
            aiResponse = generateFallbackResponse(message);
          }
        } catch (ollamaError) {
          console.error("Ollama API call failed:", ollamaError);
          console.log("Ollama failed, checking if we need to fall back or try another method");
          // 如果是网络连接错误，提供更详细的错误信息
          if (ollamaError instanceof TypeError && ollamaError.message.includes('fetch failed')) {
            console.error("Network error details:", ollamaError.cause);
          }
          
          // 如果当前是local模式但失败，或者是auto模式
          if (currentModelPriority === 'local') {
            console.log("Local model priority set but failed, using fallback");
            aiResponse = generateFallbackResponse(message);
            return res.json({
              success: true,
              data: aiResponse
            });
          } 
          
          // auto模式下，如果有API模式可用，不立即设置aiResponse
          if (currentModelPriority === 'auto' && process.env.DEEPSEEK_API_KEY) {
            console.log("Local model failed in auto mode, trying API next...");
            // 继续执行到API尝试部分
          } else {
            // 如果没有其他选择，才使用fallback
            console.log("No other AI options available, using fallback");
            aiResponse = generateFallbackResponse(message);
          }
        }
      } 
      // 尝试使用DeepSeek API (API模式或auto模式下本地失败后)
      else if (currentModelPriority === 'api' || (currentModelPriority === 'auto' && process.env.DEEPSEEK_API_KEY)) {
        try {
          console.log("Using DeepSeek API for AI consultation");
          
          // 调用DeepSeek API获取回复
          const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
              model: 'deepseek-chat',
              messages: [
                {
                  role: 'system', 
                  content: systemPrompt
                },
                {role: 'user', content: message}
              ],
              temperature: 0.7,
              max_tokens: 800
            })
          });
          
          const data = await response.json();
          
          // 检查是否有错误响应
          if (data.error) {
            console.error("DeepSeek API error:", data.error);
            // 如果是余额不足或认证错误，使用回退响应
            if (data.error.message === 'Insufficient Balance' || data.error.code === 'invalid_request_error') {
              console.log("Using fallback response due to API limitations");
              aiResponse = generateFallbackResponse(message);
            } else {
              throw new Error(data.error.message || "DeepSeek API error");
            }
          } else {
            // 提取AI回复内容
            aiResponse = data.choices[0].message.content;
          }
        } catch (apiError) {
          console.error("DeepSeek API call failed:", apiError);
          // 如果API调用失败，使用回退响应
          aiResponse = generateFallbackResponse(message);
        }
      } else {
        // 既没有设置使用本地模型，也没有DeepSeek API密钥
        console.warn("Neither local LLM nor DeepSeek API configured, using fallback response");
        aiResponse = generateFallbackResponse(message);
      }
      
      return res.json({ 
        success: true, 
        message: "AI response generated successfully",
        data: aiResponse
      });
    } catch (error) {
      console.error("Error generating AI response:", error);
      return res.status(500).json({ 
        success: false, 
        message: `Failed to generate AI response: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  });
  
  // 生成回退响应函数
  // 模型优先级设置 (默认为'auto')
  let currentModelPriority = 'auto'; // 'auto', 'api', 'local', 'fallback'

  // 设置模型优先级的API
  app.post("/api/set-model-priority", (req, res) => {
    try {
      const { priority } = req.body;
      
      if (!priority || !['auto', 'api', 'local', 'fallback'].includes(priority)) {
        return res.status(400).json({
          success: false,
          message: "Invalid priority value. Must be one of: auto, api, local, fallback"
        });
      }
      
      // 更新当前模型优先级
      currentModelPriority = priority;
      console.log(`Model priority set to: ${priority}`);
      
      // 根据优先级设置环境变量
      if (priority === 'local') {
        process.env.USE_LOCAL_LLM = 'true';
      } else if (priority === 'api') {
        process.env.USE_LOCAL_LLM = 'false';
      } else if (priority === 'fallback') {
        process.env.USE_FALLBACK_ONLY = 'true';
      } else {
        // auto模式
        process.env.USE_LOCAL_LLM = process.env.OLLAMA_HOST ? 'true' : 'false';
        process.env.USE_FALLBACK_ONLY = 'false';
      }
      
      return res.status(200).json({
        success: true,
        message: `AI model priority set to ${priority}`,
        data: priority
      });
    } catch (error) {
      console.error("Error setting model priority:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to set model priority"
      });
    }
  });
  
  // 获取当前模型优先级
  app.get("/api/get-model-priority", (req, res) => {
    return res.status(200).json({
      success: true,
      data: currentModelPriority
    });
  });

  function generateFallbackResponse(message: string): string {
    // 检测消息是英文还是中文（简单判断）
    // 如果消息中含有中文字符，则认为是中文
    const hasChinese = /[\u4e00-\u9fa5]/.test(message);
    
    if (!hasChinese) {
      return `Thank you for your inquiry about "${message.substring(0, 30)}...". From a coal industry professional perspective, I can offer the following insights:

1. Market Trends: The coal market currently shows stability with an upward trend, though seasonal factors cause fluctuations.
2. Supply-Demand Forecast: Based on recent data, domestic thermal coal supply is sufficient, but premium coking coal still shows structural shortages.
3. Policy Impact Assessment: Considering the latest environmental policy requirements, I recommend focusing on compliance production and clean utilization technologies.
4. Operational Recommendations: Strengthen digital transformation, optimize supply chain management, and improve resource utilization efficiency.

If you need more specific analysis and recommendations, please provide more details, and I would be happy to offer more targeted professional advice.`;
    } else {
      return `感谢您的咨询。您的问题关于"${message.substring(0, 30)}..."，从煤炭行业专业角度来看，我建议您考虑以下几点:

1. 市场趋势分析: 当前煤炭市场整体呈现稳中有升态势，但受季节性因素影响存在波动。
2. 供需平衡预测: 根据近期数据，国内动力煤供应充足，但优质焦煤仍有结构性短缺。
3. 政策影响评估: 考虑到最新环保政策要求，建议关注合规性生产和清洁利用技术。
4. 运营建议: 加强数字化转型，优化供应链管理，提高资源利用效率。

如果您需要更具体的分析和建议，欢迎提供更多详细信息，我可以为您提供更针对性的专业意见。`;
    }
  }

  // Admin endpoints (would require authentication in production)
  app.post("/api/admin/services", async (req, res) => {
    try {
      const result = insertCoalServiceSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      const service = await storage.createCoalService(result.data);
      return res.status(201).json({
        success: true,
        message: "Service created successfully",
        data: service
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to create service"
      });
    }
  });

  app.post("/api/admin/service-pages", async (req, res) => {
    try {
      const result = insertServicePageSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      const page = await storage.createServicePage(result.data);
      return res.status(201).json({
        success: true,
        message: "Service page created successfully",
        data: page
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to create service page"
      });
    }
  });

  // Coal Quality Testing API Endpoints
  
  // Testing Agencies endpoints
  app.get("/api/testing-agencies", async (req, res) => {
    try {
      const agencies = await storage.getAllTestingAgencies();
      return res.status(200).json({
        success: true,
        data: agencies
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch testing agencies"
      });
    }
  });
  
  app.get("/api/testing-agencies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid agency ID" 
        });
      }
      
      const agency = await storage.getTestingAgencyById(id);
      
      if (!agency) {
        return res.status(404).json({ 
          success: false, 
          message: "Testing agency not found" 
        });
      }
      
      return res.status(200).json({
        success: true,
        data: agency
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch testing agency"
      });
    }
  });
  
  app.post("/api/testing-agencies", async (req, res) => {
    try {
      const result = insertTestingAgencySchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      const agency = await storage.createTestingAgency(result.data);
      return res.status(201).json({
        success: true,
        message: "Testing agency created successfully",
        data: agency
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes("already exists")) {
        return res.status(409).json({
          success: false,
          message: error.message
        });
      }
      
      return res.status(500).json({ 
        success: false, 
        message: "Failed to create testing agency"
      });
    }
  });
  
  app.patch("/api/testing-agencies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid agency ID" 
        });
      }
      
      const result = insertTestingAgencySchema.partial().safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      const updatedAgency = await storage.updateTestingAgency(id, result.data);
      
      if (!updatedAgency) {
        return res.status(404).json({ 
          success: false, 
          message: "Testing agency not found" 
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "Testing agency updated successfully",
        data: updatedAgency
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to update testing agency"
      });
    }
  });
  
  // Testing Items endpoints
  app.get("/api/testing-items", async (req, res) => {
    try {
      const items = await storage.getAllTestingItems();
      return res.status(200).json({
        success: true,
        data: items
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch testing items"
      });
    }
  });
  
  app.get("/api/testing-items/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid item ID" 
        });
      }
      
      const item = await storage.getTestingItemById(id);
      
      if (!item) {
        return res.status(404).json({ 
          success: false, 
          message: "Testing item not found" 
        });
      }
      
      return res.status(200).json({
        success: true,
        data: item
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch testing item"
      });
    }
  });
  
  app.post("/api/testing-items", async (req, res) => {
    try {
      const result = insertTestingItemSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      const item = await storage.createTestingItem(result.data);
      return res.status(201).json({
        success: true,
        message: "Testing item created successfully",
        data: item
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes("already exists")) {
        return res.status(409).json({
          success: false,
          message: error.message
        });
      }
      
      return res.status(500).json({ 
        success: false, 
        message: "Failed to create testing item"
      });
    }
  });
  
  app.patch("/api/testing-items/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid item ID" 
        });
      }
      
      const result = insertTestingItemSchema.partial().safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      const updatedItem = await storage.updateTestingItem(id, result.data);
      
      if (!updatedItem) {
        return res.status(404).json({ 
          success: false, 
          message: "Testing item not found" 
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "Testing item updated successfully",
        data: updatedItem
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to update testing item"
      });
    }
  });
  
  // Testing Records endpoints
  app.get("/api/testing-records", async (req, res) => {
    try {
      const records = await storage.getAllTestingRecords();
      return res.status(200).json({
        success: true,
        data: records
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch testing records"
      });
    }
  });
  
  app.get("/api/testing-records/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid record ID" 
        });
      }
      
      const record = await storage.getTestingRecordById(id);
      
      if (!record) {
        return res.status(404).json({ 
          success: false, 
          message: "Testing record not found" 
        });
      }
      
      return res.status(200).json({
        success: true,
        data: record
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch testing record"
      });
    }
  });
  
  app.get("/api/testing-records/sample/:sampleId", async (req, res) => {
    try {
      const { sampleId } = req.params;
      const records = await storage.getTestingRecordsBySampleId(sampleId);
      
      return res.status(200).json({
        success: true,
        data: records
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch testing records by sample ID"
      });
    }
  });
  
  app.get("/api/testing-records/agency/:agencyId", async (req, res) => {
    try {
      const agencyId = parseInt(req.params.agencyId);
      
      if (isNaN(agencyId)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid agency ID" 
        });
      }
      
      const records = await storage.getTestingRecordsByAgencyId(agencyId);
      
      return res.status(200).json({
        success: true,
        data: records
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch testing records by agency ID"
      });
    }
  });
  
  app.post("/api/testing-records", async (req, res) => {
    try {
      const result = insertTestingRecordSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      const record = await storage.createTestingRecord(result.data);
      
      return res.status(201).json({
        success: true,
        message: "Testing record created successfully",
        data: record
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      
      return res.status(500).json({ 
        success: false, 
        message: "Failed to create testing record"
      });
    }
  });
  
  app.patch("/api/testing-records/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid record ID" 
        });
      }
      
      const result = insertTestingRecordSchema.partial().safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      const updatedRecord = await storage.updateTestingRecord(id, result.data);
      
      if (!updatedRecord) {
        return res.status(404).json({ 
          success: false, 
          message: "Testing record not found" 
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "Testing record updated successfully",
        data: updatedRecord
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      
      return res.status(500).json({ 
        success: false, 
        message: "Failed to update testing record"
      });
    }
  });
  
  // Calculate weighted average for a testing record
  app.get("/api/testing-records/:id/weighted-average", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid record ID" 
        });
      }
      
      const weightedAverage = await storage.calculateWeightedAverage(id);
      
      if (!weightedAverage) {
        return res.status(404).json({ 
          success: false, 
          message: "Testing record not found or has no results" 
        });
      }
      
      return res.status(200).json({
        success: true,
        data: weightedAverage
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Failed to calculate weighted average"
      });
    }
  });

  // 煤险处置 API 路由 - 煤炭产品API

  // 获取所有煤炭产品
  app.get("/api/coal-products", async (req, res) => {
    try {
      // 支持筛选参数
      const { disposalType, status, riskLevel } = req.query;
      
      let products;
      
      if (disposalType && typeof disposalType === 'string') {
        products = await storage.getCoalProductsByDisposalType(disposalType);
      } else if (status && typeof status === 'string') {
        products = await storage.getCoalProductsByStatus(status);
      } else if (riskLevel && typeof riskLevel === 'string') {
        products = await storage.getCoalProductsByRiskLevel(riskLevel);
      } else {
        products = await storage.getAllCoalProducts();
      }
      
      return res.status(200).json({
        success: true,
        data: products
      });
    } catch (error) {
      console.error("Error fetching coal products:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch coal products" 
      });
    }
  });
  
  // 获取单个煤炭产品
  app.get("/api/coal-products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid product ID" 
        });
      }
      
      const product = await storage.getCoalProductById(id);
      
      if (!product) {
        return res.status(404).json({ 
          success: false, 
          message: "Coal product not found" 
        });
      }
      
      return res.status(200).json({
        success: true,
        data: product
      });
    } catch (error) {
      console.error("Error fetching coal product:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch coal product" 
      });
    }
  });
  
  // 创建煤炭产品 (管理员端点)
  app.post("/api/admin/coal-products", async (req, res) => {
    try {
      const result = insertCoalProductSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      const product = await storage.createCoalProduct(result.data);
      return res.status(201).json({
        success: true,
        message: "Coal product created successfully",
        data: product
      });
    } catch (error) {
      console.error("Error creating coal product:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to create coal product" 
      });
    }
  });
  
  // 更新煤炭产品 (管理员端点)
  app.patch("/api/admin/coal-products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid product ID" 
        });
      }
      
      // 部分验证请求体 (允许部分更新)
      const updateData = req.body;
      
      const updatedProduct = await storage.updateCoalProduct(id, updateData);
      
      if (!updatedProduct) {
        return res.status(404).json({ 
          success: false, 
          message: "Coal product not found" 
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "Coal product updated successfully",
        data: updatedProduct
      });
    } catch (error) {
      console.error("Error updating coal product:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to update coal product" 
      });
    }
  });
  
  // 更新煤炭产品状态 (管理员端点)
  app.patch("/api/admin/coal-products/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid product ID" 
        });
      }
      
      if (!status || typeof status !== 'string') {
        return res.status(400).json({ 
          success: false, 
          message: "Status is required" 
        });
      }
      
      const updatedProduct = await storage.updateCoalProductStatus(id, status);
      
      if (!updatedProduct) {
        return res.status(404).json({ 
          success: false, 
          message: "Coal product not found" 
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "Product status updated successfully",
        data: updatedProduct
      });
    } catch (error) {
      console.error("Error updating product status:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to update product status" 
      });
    }
  });
  
  // 煤炭竞拍出价API
  
  // 提交竞拍出价
  app.post("/api/coal-bids", async (req, res) => {
    try {
      const result = insertCoalBidSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      // 检查产品是否存在
      const product = await storage.getCoalProductById(result.data.productId);
      if (!product) {
        return res.status(404).json({ 
          success: false, 
          message: "Coal product not found" 
        });
      }
      
      // 检查产品是否是竞拍类型
      if (product.disposalType !== 'auction') {
        return res.status(400).json({ 
          success: false, 
          message: "This product is not available for auction" 
        });
      }
      
      // 检查产品是否仍然可用
      if (product.status !== 'available') {
        return res.status(400).json({ 
          success: false, 
          message: "This product is no longer available for bidding" 
        });
      }
      
      // 检查竞拍是否已结束
      if (product.auctionEndTime && new Date(product.auctionEndTime) < new Date()) {
        return res.status(400).json({ 
          success: false, 
          message: "The auction for this product has ended" 
        });
      }
      
      // 检查出价是否高于当前最高出价
      const highestBid = await storage.getHighestBidForProduct(product.id);
      if (highestBid && highestBid.bidAmount >= result.data.bidAmount) {
        return res.status(400).json({ 
          success: false, 
          message: "Your bid must be higher than the current highest bid" 
        });
      }
      
      // 创建竞拍出价
      const bid = await storage.createCoalBid(result.data);
      
      return res.status(201).json({
        success: true,
        message: "Bid submitted successfully",
        data: {
          bidId: bid.id,
          productId: bid.productId,
          bidAmount: bid.bidAmount,
          status: bid.status,
          bidTime: bid.bidTime
        }
      });
    } catch (error) {
      console.error("Error submitting bid:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to submit bid" 
      });
    }
  });
  
  // 获取产品的所有竞拍出价
  app.get("/api/coal-products/:productId/bids", async (req, res) => {
    try {
      const productId = parseInt(req.params.productId);
      
      if (isNaN(productId)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid product ID" 
        });
      }
      
      // 检查产品是否存在
      const product = await storage.getCoalProductById(productId);
      if (!product) {
        return res.status(404).json({ 
          success: false, 
          message: "Coal product not found" 
        });
      }
      
      const bids = await storage.getCoalBidsByProductId(productId);
      
      return res.status(200).json({
        success: true,
        data: bids
      });
    } catch (error) {
      console.error("Error fetching bids:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch bids" 
      });
    }
  });
  
  // 获取最高出价
  app.get("/api/coal-products/:productId/highest-bid", async (req, res) => {
    try {
      const productId = parseInt(req.params.productId);
      
      if (isNaN(productId)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid product ID" 
        });
      }
      
      const product = await storage.getCoalProductById(productId);
      if (!product) {
        return res.status(404).json({ 
          success: false, 
          message: "Coal product not found" 
        });
      }
      
      const highestBid = await storage.getHighestBidForProduct(productId);
      
      if (!highestBid) {
        return res.status(404).json({ 
          success: false, 
          message: "No bids found for this product" 
        });
      }
      
      return res.status(200).json({
        success: true,
        data: highestBid
      });
    } catch (error) {
      console.error("Error fetching highest bid:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch highest bid" 
      });
    }
  });
  
  // 煤炭订单API
  
  // 创建订单
  app.post("/api/coal-orders", async (req, res) => {
    try {
      const result = insertCoalOrderSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      // 检查产品是否存在
      const product = await storage.getCoalProductById(result.data.productId);
      if (!product) {
        return res.status(404).json({ 
          success: false, 
          message: "Coal product not found" 
        });
      }
      
      // 检查产品是否仍然可用
      if (product.status !== 'available') {
        return res.status(400).json({ 
          success: false, 
          message: "This product is no longer available for purchase" 
        });
      }
      
      // 如果是竞拍交易，检查出价ID
      if (result.data.transactionType === 'auction' && !result.data.bidId) {
        return res.status(400).json({ 
          success: false, 
          message: "Bid ID is required for auction transactions" 
        });
      }
      
      // 如果有出价ID，检查出价是否存在
      if (result.data.bidId) {
        const bid = await storage.getCoalBidById(result.data.bidId);
        if (!bid) {
          return res.status(404).json({ 
            success: false, 
            message: "Bid not found" 
          });
        }
        
        // 检查出价是否属于该产品
        if (bid.productId !== result.data.productId) {
          return res.status(400).json({ 
            success: false, 
            message: "Bid does not match the product" 
          });
        }
      }
      
      // 创建订单
      const order = await storage.createCoalOrder(result.data);
      
      return res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: {
          orderId: order.id,
          orderNumber: order.orderNumber,
          productId: order.productId,
          totalAmount: order.totalAmount,
          status: {
            payment: order.paymentStatus,
            delivery: order.deliveryStatus
          },
          createdAt: order.createdAt
        }
      });
    } catch (error) {
      console.error("Error creating order:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to create order" 
      });
    }
  });
  
  // 获取所有订单 (管理员端点)
  app.get("/api/admin/coal-orders", async (req, res) => {
    try {
      const orders = await storage.getAllCoalOrders();
      
      return res.status(200).json({
        success: true,
        data: orders
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch orders" 
      });
    }
  });
  
  // 获取单个订单
  app.get("/api/coal-orders/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid order ID" 
        });
      }
      
      const order = await storage.getCoalOrderById(id);
      
      if (!order) {
        return res.status(404).json({ 
          success: false, 
          message: "Order not found" 
        });
      }
      
      return res.status(200).json({
        success: true,
        data: order
      });
    } catch (error) {
      console.error("Error fetching order:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch order" 
      });
    }
  });
  
  // 按订单号获取订单
  app.get("/api/coal-orders/number/:orderNumber", async (req, res) => {
    try {
      const { orderNumber } = req.params;
      
      if (!orderNumber) {
        return res.status(400).json({ 
          success: false, 
          message: "Order number is required" 
        });
      }
      
      const order = await storage.getCoalOrderByOrderNumber(orderNumber);
      
      if (!order) {
        return res.status(404).json({ 
          success: false, 
          message: "Order not found" 
        });
      }
      
      return res.status(200).json({
        success: true,
        data: order
      });
    } catch (error) {
      console.error("Error fetching order:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch order" 
      });
    }
  });
  
  // 更新订单状态
  app.patch("/api/coal-orders/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { paymentStatus, deliveryStatus } = req.body;
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid order ID" 
        });
      }
      
      if ((!paymentStatus || typeof paymentStatus !== 'string') && 
          (!deliveryStatus || typeof deliveryStatus !== 'string')) {
        return res.status(400).json({ 
          success: false, 
          message: "Payment status or delivery status is required" 
        });
      }
      
      const order = await storage.getCoalOrderById(id);
      if (!order) {
        return res.status(404).json({ 
          success: false, 
          message: "Order not found" 
        });
      }
      
      const updatedOrder = await storage.updateCoalOrderStatus(
        id, 
        paymentStatus || order.paymentStatus,
        deliveryStatus || order.deliveryStatus
      );
      
      return res.status(200).json({
        success: true,
        message: "Order status updated successfully",
        data: updatedOrder
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to update order status" 
      });
    }
  });
  
  // 收藏夹API
  
  // 添加收藏
  app.post("/api/coal-favorites", async (req, res) => {
    try {
      const result = insertCoalFavoriteSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      // 检查产品是否存在
      const product = await storage.getCoalProductById(result.data.productId);
      if (!product) {
        return res.status(404).json({ 
          success: false, 
          message: "Coal product not found" 
        });
      }
      
      try {
        const favorite = await storage.createCoalFavorite(result.data);
        
        return res.status(201).json({
          success: true,
          message: "Product added to favorites",
          data: favorite
        });
      } catch (error) {
        if (error instanceof Error && error.message === "Product already in favorites") {
          return res.status(409).json({ 
            success: false, 
            message: "This product is already in your favorites" 
          });
        }
        throw error;
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to add product to favorites" 
      });
    }
  });
  
  // 获取用户收藏列表
  app.get("/api/users/:userId/favorites", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      if (isNaN(userId)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid user ID" 
        });
      }
      
      const favorites = await storage.getCoalFavoritesByUserId(userId);
      
      // 获取每个收藏对应的产品详情
      const favoriteProducts = await Promise.all(
        favorites.map(async (favorite) => {
          const product = await storage.getCoalProductById(favorite.productId);
          return {
            favoriteId: favorite.id,
            product: product,
            addedAt: favorite.createdAt
          };
        })
      );
      
      return res.status(200).json({
        success: true,
        data: favoriteProducts
      });
    } catch (error) {
      console.error("Error fetching favorites:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch favorites" 
      });
    }
  });
  
  // 移除收藏
  app.delete("/api/coal-favorites/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid favorite ID" 
        });
      }
      
      const favorite = await storage.getCoalFavoriteById(id);
      if (!favorite) {
        return res.status(404).json({ 
          success: false, 
          message: "Favorite not found" 
        });
      }
      
      const result = await storage.removeCoalFavorite(id);
      
      if (!result) {
        return res.status(500).json({ 
          success: false, 
          message: "Failed to remove from favorites" 
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "Product removed from favorites"
      });
    } catch (error) {
      console.error("Error removing from favorites:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to remove product from favorites" 
      });
    }
  });
  
  // 检查产品是否被用户收藏
  app.get("/api/users/:userId/favorites/:productId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const productId = parseInt(req.params.productId);
      
      if (isNaN(userId) || isNaN(productId)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid user ID or product ID" 
        });
      }
      
      const isFavorited = await storage.isProductFavoritedByUser(productId, userId);
      
      return res.status(200).json({
        success: true,
        data: { isFavorited }
      });
    } catch (error) {
      console.error("Error checking favorite status:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to check favorite status" 
      });
    }
  });

  // 支付相关API端点
  
  // 微信支付和支付宝支付配置（实际项目中需要真实的配置信息）
  const wxPayConfig = {
    appid: process.env.WXPAY_APPID || 'wx_appid_placeholder',
    mchid: process.env.WXPAY_MCHID || 'wx_mchid_placeholder',
    publicKey: process.env.WXPAY_PUBLIC_KEY || 'wx_public_key_placeholder',
    privateKey: process.env.WXPAY_PRIVATE_KEY || 'wx_private_key_placeholder',
  };
  
  const alipayConfig = {
    appId: process.env.ALIPAY_APPID || 'alipay_appid_placeholder',
    privateKey: process.env.ALIPAY_PRIVATE_KEY || 'alipay_private_key_placeholder',
    publicKey: process.env.ALIPAY_PUBLIC_KEY || 'alipay_public_key_placeholder',
    gateway: 'https://openapi.alipay.com/gateway.do',
  };
  
  // 模拟生成支付二维码的函数（实际项目中应使用真实的支付API）
  const generatePaymentQrCode = (paymentMethod: string, orderId: number, amount: number): string => {
    // 在实际项目中，这里应该调用微信支付或支付宝API生成真实的支付二维码
    // 现在我们返回一个模拟的二维码URL
    const timestamp = Date.now();
    const randomString = crypto.randomBytes(8).toString('hex');
    const paymentId = `${paymentMethod}_${orderId}_${timestamp}_${randomString}`;
    
    // 返回模拟的二维码URL (实际项目中应返回真实的支付二维码URL)
    // 这里使用一个免费的QR码生成服务来模拟
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      JSON.stringify({
        paymentId,
        paymentMethod,
        orderId,
        amount,
        timestamp
      })
    )}`;
  };
  
  // 获取订单详情
  app.get("/api/coal-orders/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid order ID" 
        });
      }
      
      const order = await storage.getCoalOrderById(id);
      
      if (!order) {
        return res.status(404).json({ 
          success: false, 
          message: "Order not found" 
        });
      }
      
      // 获取关联的产品信息
      const product = await storage.getCoalProductById(order.productId);
      
      if (!product) {
        return res.status(404).json({ 
          success: false, 
          message: "Product not found" 
        });
      }
      
      // 合并订单和产品信息
      const orderWithProductInfo = {
        ...order,
        productTitleCn: product.titleCn,
        productTitleEn: product.titleEn,
        productDescriptionCn: product.descriptionCn,
        productDescriptionEn: product.descriptionEn,
        productCoalType: product.coalType,
        productLocation: product.location,
        productImageUrl: product.imageUrl
      };
      
      return res.status(200).json(orderWithProductInfo);
    } catch (error) {
      console.error("Error fetching order:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to fetch order details" 
      });
    }
  });
  
  // 微信支付API
  app.post("/api/payments/wechat", async (req, res) => {
    try {
      const { orderId, amount, description } = req.body;
      
      if (!orderId || !amount) {
        return res.status(400).json({ 
          success: false, 
          message: "Order ID and amount are required" 
        });
      }
      
      // 查询订单是否存在
      const order = await storage.getCoalOrderById(orderId);
      
      if (!order) {
        return res.status(404).json({ 
          success: false, 
          message: "Order not found" 
        });
      }
      
      // 检查订单是否已支付
      if (order.paymentStatus === 'paid') {
        return res.status(400).json({ 
          success: false, 
          message: "Order has already been paid" 
        });
      }
      
      // 生成微信支付二维码
      const qrCodeUrl = generatePaymentQrCode('wechat', orderId, amount);
      
      // 记录支付会话信息（实际项目中应存储在数据库中）
      const paymentSession = {
        orderId,
        amount,
        paymentMethod: 'wechat',
        timestamp: new Date().toISOString(),
        status: 'pending'
      };
      
      // 实际项目中应该将支付会话信息保存到数据库
      // 这里为了演示，我们简单返回支付二维码
      
      return res.status(200).json({
        success: true,
        message: "WeChatPay QR code generated",
        qrCodeUrl,
        paymentSession
      });
    } catch (error) {
      console.error("Error generating WeChatPay QR code:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to generate payment QR code" 
      });
    }
  });
  
  // 支付宝支付API
  app.post("/api/payments/alipay", async (req, res) => {
    try {
      const { orderId, amount, description } = req.body;
      
      if (!orderId || !amount) {
        return res.status(400).json({ 
          success: false, 
          message: "Order ID and amount are required" 
        });
      }
      
      // 查询订单是否存在
      const order = await storage.getCoalOrderById(orderId);
      
      if (!order) {
        return res.status(404).json({ 
          success: false, 
          message: "Order not found" 
        });
      }
      
      // 检查订单是否已支付
      if (order.paymentStatus === 'paid') {
        return res.status(400).json({ 
          success: false, 
          message: "Order has already been paid" 
        });
      }
      
      // 生成支付宝支付二维码
      const qrCodeUrl = generatePaymentQrCode('alipay', orderId, amount);
      
      // 记录支付会话信息（实际项目中应存储在数据库中）
      const paymentSession = {
        orderId,
        amount,
        paymentMethod: 'alipay',
        timestamp: new Date().toISOString(),
        status: 'pending'
      };
      
      // 实际项目中应该将支付会话信息保存到数据库
      // 这里为了演示，我们简单返回支付二维码
      
      return res.status(200).json({
        success: true,
        message: "Alipay QR code generated",
        qrCodeUrl,
        paymentSession
      });
    } catch (error) {
      console.error("Error generating Alipay QR code:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to generate payment QR code" 
      });
    }
  });
  
  // 支付状态查询API
  app.get("/api/payments/status/:orderId", async (req, res) => {
    try {
      const orderId = parseInt(req.params.orderId);
      
      if (isNaN(orderId)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid order ID" 
        });
      }
      
      // 查询订单是否存在
      const order = await storage.getCoalOrderById(orderId);
      
      if (!order) {
        return res.status(404).json({ 
          success: false, 
          message: "Order not found" 
        });
      }
      
      // 检查订单支付状态
      // 在实际项目中，应该调用微信支付或支付宝API查询真实的支付状态
      // 这里为了演示，我们随机模拟支付成功或等待支付
      
      // 模拟订单已支付的情况（10%概率支付成功）
      const isPaid = Math.random() < 0.1;
      
      if (isPaid && order.paymentStatus !== 'paid') {
        // 更新订单状态为已支付
        await storage.updateCoalOrderStatus(orderId, 'paid', order.deliveryStatus);
        
        return res.status(200).json({
          success: true,
          status: 'paid',
          message: "Payment successful"
        });
      }
      
      return res.status(200).json({
        success: true,
        status: order.paymentStatus,
        message: order.paymentStatus === 'paid' ? "Payment successful" : "Payment pending"
      });
    } catch (error) {
      console.error("Error checking payment status:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to check payment status" 
      });
    }
  });
  
  // 支付成功回调API (实际项目中，这是支付服务商的回调接口)
  app.post("/api/payments/callback/:method", async (req, res) => {
    try {
      const { method } = req.params;
      const { orderId, paymentId, amount } = req.body;
      
      if (!orderId || !paymentId) {
        return res.status(400).json({ 
          success: false, 
          message: "Order ID and payment ID are required" 
        });
      }
      
      // 验证支付信息 (实际项目中应验证支付签名等安全信息)
      // 这里为了演示，我们简单更新订单状态
      
      // 查询订单是否存在
      const order = await storage.getCoalOrderById(orderId);
      
      if (!order) {
        return res.status(404).json({ 
          success: false, 
          message: "Order not found" 
        });
      }
      
      // 更新订单状态为已支付
      await storage.updateCoalOrderStatus(orderId, 'paid', 'processing');
      
      return res.status(200).json({
        success: true,
        message: "Payment callback processed successfully"
      });
    } catch (error) {
      console.error("Error processing payment callback:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to process payment callback" 
      });
    }
  });
  
  // ================ Collateral Financing Applications ================
  
  // Submit a new collateral financing application
  app.post("/api/collateral-financing-applications", async (req, res) => {
    try {
      const result = insertCollateralFinancingApplicationSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      const application = await storage.createCollateralFinancingApplication(result.data);
      return res.status(201).json({
        success: true,
        message: "融资申请已成功提交",
        data: {
          id: application.id,
          name: application.name,
          email: application.email,
          status: application.status,
          createdAt: application.createdAt
        }
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "提交融资申请失败"
      });
    }
  });
  
  // Get all collateral financing applications (admin endpoint)
  app.get("/api/admin/collateral-financing-applications", async (req, res) => {
    try {
      const applications = await storage.getAllCollateralFinancingApplications();
      return res.status(200).json({
        success: true,
        data: applications
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "获取融资申请列表失败"
      });
    }
  });
  
  // Get specific collateral financing application (admin endpoint)
  app.get("/api/admin/collateral-financing-applications/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "无效的申请ID" 
        });
      }
      
      const application = await storage.getCollateralFinancingApplicationById(id);
      
      if (!application) {
        return res.status(404).json({ 
          success: false, 
          message: "找不到融资申请" 
        });
      }
      
      return res.status(200).json({
        success: true,
        data: application
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "获取融资申请详情失败"
      });
    }
  });
  
  // Get user's collateral financing applications
  app.get("/api/collateral-financing-applications", async (req, res) => {
    try {
      const email = req.query.email as string;
      
      if (!email) {
        return res.status(400).json({ 
          success: false, 
          message: "请提供有效的邮箱地址" 
        });
      }
      
      const applications = await storage.getCollateralFinancingApplicationsByEmail(email);
      
      return res.status(200).json({
        success: true,
        data: applications
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "获取融资申请记录失败"
      });
    }
  });
  
  // 获取单个融资申请详情
  app.get("/api/collateral-financing-applications/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid application ID" 
        });
      }
      
      const application = await storage.getCollateralFinancingApplicationById(id);
      
      if (!application) {
        return res.status(404).json({ 
          success: false, 
          message: "Application not found" 
        });
      }
      
      return res.status(200).json({
        success: true,
        data: application
      });
    } catch (error) {
      console.error("Error retrieving application:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve application" 
      });
    }
  });
  
  // Update collateral financing application status (admin endpoint)
  app.patch("/api/admin/collateral-financing-applications/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "无效的申请ID" 
        });
      }
      
      if (!status || !["pending", "approved", "rejected", "completed"].includes(status)) {
        return res.status(400).json({ 
          success: false, 
          message: "请提供有效的状态" 
        });
      }
      
      const updatedApplication = await storage.updateCollateralFinancingApplicationStatus(id, status);
      
      if (!updatedApplication) {
        return res.status(404).json({ 
          success: false, 
          message: "找不到融资申请" 
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "融资申请状态已更新",
        data: {
          id: updatedApplication.id,
          status: updatedApplication.status,
          updatedAt: updatedApplication.updatedAt
        }
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "更新融资申请状态失败"
      });
    }
  });
  
  // ================ Collateral Financing Applications End ============
  
  // ================ Collateral Financing Payments Start ============
  
  // 创建支付
  app.post("/api/payments/create", async (req, res) => {
    try {
      const { applicationId, paymentMethod, amount } = req.body;
      
      if (!applicationId || !paymentMethod || !amount) {
        return res.status(400).json({ 
          success: false, 
          message: "Application ID, payment method, and amount are required" 
        });
      }
      
      if (!['wechat', 'alipay'].includes(paymentMethod)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid payment method. Supported methods are 'wechat' and 'alipay'" 
        });
      }
      
      // 查询应用
      const application = await storage.getCollateralFinancingApplicationById(applicationId);
      
      if (!application) {
        return res.status(404).json({ 
          success: false, 
          message: "Financing application not found" 
        });
      }
      
      // 检查应用状态
      if (application.status !== 'approved') {
        return res.status(400).json({ 
          success: false, 
          message: "Cannot create payment for an application that is not approved" 
        });
      }
      
      // 创建模拟订单
      const order = await storage.createCoalOrder({
        productId: 0, // 服务费没有具体产品
        userId: null, // 暂不关联用户
        orderNumber: `FIN-${Date.now()}-${applicationId}`,
        totalAmount: amount.toString(),
        paymentStatus: "pending",
        deliveryStatus: "not_applicable",
        transactionType: "financing",
        buyerName: application.name,
        buyerContact: application.phone,
        buyerCompany: application.company || "",
        quantity: "1",
        applicationId
      });
      
      // 根据支付方式生成二维码
      // 在实际项目中，这里应该调用微信支付或支付宝API生成真实的支付二维码
      // 现在我们返回一个模拟的二维码URL
      const timestamp = Date.now();
      const randomString = crypto.randomBytes(8).toString('hex');
      const paymentId = `${paymentMethod}_${applicationId}_${timestamp}_${randomString}`;
      
      // 返回模拟的二维码URL (实际项目中应返回真实的支付二维码URL)
      // 这里使用一个免费的QR码生成服务来模拟
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
        JSON.stringify({
          paymentId,
          paymentMethod,
          applicationId,
          amount,
          timestamp
        })
      )}`;
      
      return res.status(200).json({
        success: true,
        message: "Payment created successfully",
        data: {
          orderId: order.id,
          qrCodeUrl,
          amount,
          paymentMethod
        }
      });
    } catch (error) {
      console.error("Error creating payment:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to create payment" 
      });
    }
  });
  
  // 支付状态查询API
  app.get("/api/payments/status/:orderId", async (req, res) => {
    try {
      const orderId = parseInt(req.params.orderId);
      
      if (isNaN(orderId)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid order ID" 
        });
      }
      
      // 查询订单是否存在
      const order = await storage.getCoalOrderById(orderId);
      
      if (!order) {
        return res.status(404).json({ 
          success: false, 
          message: "Order not found" 
        });
      }
      
      // 检查订单支付状态
      // 在实际项目中，应该调用微信支付或支付宝API查询真实的支付状态
      // 这里为了演示，我们随机模拟支付成功或等待支付
      
      // 模拟订单已支付的情况（10%概率支付成功）
      const isPaid = Math.random() < 0.1;
      
      if (isPaid && order.paymentStatus !== 'paid') {
        // 更新订单状态为已支付
        await storage.updateCoalOrderStatus(orderId, 'paid', order.deliveryStatus);
        
        // 如果是融资申请的订单，更新申请状态
        if (order.applicationId) {
          await storage.updateCollateralFinancingApplicationStatus(order.applicationId, 'processing');
        }
        
        return res.status(200).json({
          success: true,
          status: 'paid',
          message: "Payment successful"
        });
      }
      
      return res.status(200).json({
        success: true,
        status: order.paymentStatus,
        message: order.paymentStatus === 'paid' ? "Payment successful" : "Payment pending"
      });
    } catch (error) {
      console.error("Error checking payment status:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to check payment status" 
      });
    }
  });
  
  // ================ Collateral Financing Payments End ================

  // ================ Transport Services Start ================
  
  // 获取所有运输订单
  app.get("/api/transport/orders", async (req, res) => {
    try {
      const orders = await storage.getAllTransportOrders();
      return res.status(200).json({
        success: true,
        data: orders
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "获取运输订单失败" 
      });
    }
  });
  
  // 获取特定用户的运输订单
  app.get("/api/transport/user-orders/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      if (isNaN(userId)) {
        return res.status(400).json({ 
          success: false, 
          message: "无效的用户ID" 
        });
      }
      
      const orders = await storage.getTransportOrdersByUserId(userId);
      return res.status(200).json({
        success: true,
        data: orders
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "获取用户运输订单失败" 
      });
    }
  });
  
  // 获取单个运输订单详情
  app.get("/api/transport/orders/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "无效的订单ID" 
        });
      }
      
      const order = await storage.getTransportOrderById(id);
      
      if (!order) {
        return res.status(404).json({ 
          success: false, 
          message: "运输订单不存在" 
        });
      }
      
      return res.status(200).json({
        success: true,
        data: order
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "获取运输订单详情失败" 
      });
    }
  });
  
  // 创建新运输订单
  app.post("/api/transport/orders", async (req, res) => {
    try {
      const result = insertTransportOrderSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      const order = await storage.createTransportOrder(result.data);
      
      return res.status(201).json({
        success: true,
        message: "运输订单创建成功",
        data: order
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "创建运输订单失败" 
      });
    }
  });
  
  // 更新运输订单状态
  app.patch("/api/transport/orders/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "无效的订单ID" 
        });
      }
      
      if (!status || typeof status !== 'string') {
        return res.status(400).json({ 
          success: false, 
          message: "状态字段必填" 
        });
      }
      
      const updatedOrder = await storage.updateTransportOrderStatus(id, status);
      
      if (!updatedOrder) {
        return res.status(404).json({ 
          success: false, 
          message: "运输订单不存在" 
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "订单状态更新成功",
        data: updatedOrder
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "更新订单状态失败" 
      });
    }
  });
  
  // 分配司机和车辆到订单
  app.post("/api/transport/orders/:id/assign", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { driverId, vehicleId } = req.body;
      
      if (isNaN(id) || isNaN(driverId) || isNaN(vehicleId)) {
        return res.status(400).json({ 
          success: false, 
          message: "无效的ID参数" 
        });
      }
      
      const updatedOrder = await storage.assignDriver(id, driverId, vehicleId);
      
      if (!updatedOrder) {
        return res.status(404).json({ 
          success: false, 
          message: "运输订单不存在" 
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "司机和车辆分配成功",
        data: updatedOrder
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ 
          success: false, 
          message: error.message 
        });
      }
      
      return res.status(500).json({ 
        success: false, 
        message: "分配司机和车辆失败" 
      });
    }
  });
  
  // 获取所有可用司机
  app.get("/api/transport/available-drivers", async (req, res) => {
    try {
      const drivers = await storage.getAvailableTransportDrivers();
      return res.status(200).json({
        success: true,
        data: drivers
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "获取可用司机失败" 
      });
    }
  });
  
  // 获取所有司机
  app.get("/api/transport/drivers", async (req, res) => {
    try {
      const drivers = await storage.getAllTransportDrivers();
      return res.status(200).json({
        success: true,
        data: drivers
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "获取司机列表失败" 
      });
    }
  });
  
  // 获取司机详情
  app.get("/api/transport/drivers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "无效的司机ID" 
        });
      }
      
      const driver = await storage.getTransportDriverById(id);
      
      if (!driver) {
        return res.status(404).json({ 
          success: false, 
          message: "司机不存在" 
        });
      }
      
      return res.status(200).json({
        success: true,
        data: driver
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "获取司机详情失败" 
      });
    }
  });
  
  // 获取所有可用车辆
  app.get("/api/transport/available-vehicles", async (req, res) => {
    try {
      const vehicles = await storage.getAvailableTransportVehicles();
      return res.status(200).json({
        success: true,
        data: vehicles
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "获取可用车辆失败" 
      });
    }
  });
  
  // 获取所有车辆
  app.get("/api/transport/vehicles", async (req, res) => {
    try {
      const vehicles = await storage.getAllTransportVehicles();
      return res.status(200).json({
        success: true,
        data: vehicles
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "获取车辆列表失败" 
      });
    }
  });
  
  // 获取车辆详情
  app.get("/api/transport/vehicles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "无效的车辆ID" 
        });
      }
      
      const vehicle = await storage.getTransportVehicleById(id);
      
      if (!vehicle) {
        return res.status(404).json({ 
          success: false, 
          message: "车辆不存在" 
        });
      }
      
      return res.status(200).json({
        success: true,
        data: vehicle
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "获取车辆详情失败" 
      });
    }
  });
  
  // 获取运输订单的跟踪记录
  app.get("/api/transport/tracking/:orderId", async (req, res) => {
    try {
      const orderId = parseInt(req.params.orderId);
      
      if (isNaN(orderId)) {
        return res.status(400).json({ 
          success: false, 
          message: "无效的订单ID" 
        });
      }
      
      const trackingRecords = await storage.getTransportTrackingsByOrderId(orderId);
      return res.status(200).json({
        success: true,
        data: trackingRecords
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "获取运输跟踪记录失败" 
      });
    }
  });
  
  // 添加运输跟踪记录
  app.post("/api/transport/tracking", async (req, res) => {
    try {
      const result = insertTransportTrackingSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      const tracking = await storage.createTransportTracking(result.data);
      
      return res.status(201).json({
        success: true,
        message: "运输跟踪记录添加成功",
        data: tracking
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "添加运输跟踪记录失败" 
      });
    }
  });
  
  // 获取订单最新位置
  app.get("/api/transport/tracking/:orderId/latest", async (req, res) => {
    try {
      const orderId = parseInt(req.params.orderId);
      
      if (isNaN(orderId)) {
        return res.status(400).json({ 
          success: false, 
          message: "无效的订单ID" 
        });
      }
      
      const latestTracking = await storage.getLatestTransportTrackingByOrderId(orderId);
      
      if (!latestTracking) {
        return res.status(404).json({ 
          success: false, 
          message: "没有找到跟踪记录" 
        });
      }
      
      return res.status(200).json({
        success: true,
        data: latestTracking
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "获取最新跟踪记录失败" 
      });
    }
  });
  
  // 智能订单处理 - 分析订单优先级和复杂度
  app.post("/api/transport/intelligent-processing", async (req, res) => {
    try {
      const { orderId } = req.body;
      
      if (!orderId || isNaN(parseInt(orderId))) {
        return res.status(400).json({ 
          success: false, 
          message: "请提供有效的订单ID" 
        });
      }
      
      const order = await storage.getTransportOrderById(parseInt(orderId));
      
      if (!order) {
        return res.status(404).json({ 
          success: false, 
          message: "未找到指定订单" 
        });
      }
      
      // 使用AI处理器分析订单
      const analysisResult = await TransportOrderProcessor.analyzeOrderPriority(order);
      
      // 分析风险因素
      const riskAnalysis = await TransportOrderProcessor.analyzeRisksAndMitigations(order);
      
      return res.status(200).json({
        success: true,
        data: {
          orderDetails: order,
          priorityAnalysis: analysisResult,
          riskAnalysis: riskAnalysis
        }
      });
    } catch (error) {
      console.error("智能订单处理错误:", error);
      return res.status(500).json({ 
        success: false, 
        message: "智能订单处理失败，请稍后再试" 
      });
    }
  });
  
  // 智能司机匹配
  app.post("/api/transport/driver-matching", async (req, res) => {
    try {
      const { orderId } = req.body;
      
      if (!orderId || isNaN(parseInt(orderId))) {
        return res.status(400).json({ 
          success: false, 
          message: "请提供有效的订单ID" 
        });
      }
      
      const order = await storage.getTransportOrderById(parseInt(orderId));
      
      if (!order) {
        return res.status(404).json({ 
          success: false, 
          message: "未找到指定订单" 
        });
      }
      
      // 获取所有司机和车辆
      const availableDrivers = await storage.getAllTransportDrivers();
      const availableVehicles = await storage.getAllTransportVehicles();
      
      // 过滤出可用的司机和车辆
      const activeDrivers = availableDrivers.filter(driver => driver.status === 'available');
      const activeVehicles = availableVehicles.filter(vehicle => vehicle.status === 'available');
      
      // 使用AI处理器匹配最佳司机和车辆
      const matchResult = await TransportOrderProcessor.matchDriverAndVehicle(
        order, 
        activeDrivers, 
        activeVehicles
      );
      
      // 如果有推荐的司机，获取完整信息
      let recommendedDriver = null;
      if (matchResult.recommendedDriverId) {
        recommendedDriver = await storage.getTransportDriverById(matchResult.recommendedDriverId);
      }
      
      // 如果有推荐的车辆，获取完整信息
      let recommendedVehicle = null;
      if (matchResult.recommendedVehicleId) {
        recommendedVehicle = await storage.getTransportVehicleById(matchResult.recommendedVehicleId);
      }
      
      // 获取备选司机和车辆的完整信息
      const alternativeDrivers = [];
      for (const driverId of matchResult.alternativeDriverIds) {
        const driver = await storage.getTransportDriverById(driverId);
        if (driver) {
          alternativeDrivers.push(driver);
        }
      }
      
      const alternativeVehicles = [];
      for (const vehicleId of matchResult.alternativeVehicleIds) {
        const vehicle = await storage.getTransportVehicleById(vehicleId);
        if (vehicle) {
          alternativeVehicles.push(vehicle);
        }
      }
      
      return res.status(200).json({
        success: true,
        data: {
          orderDetails: order,
          matchResults: {
            ...matchResult,
            recommendedDriver,
            recommendedVehicle,
            alternativeDrivers,
            alternativeVehicles
          }
        }
      });
    } catch (error) {
      console.error("智能司机匹配错误:", error);
      return res.status(500).json({ 
        success: false, 
        message: "智能司机匹配失败，请稍后再试" 
      });
    }
  });
  
  // ================ Transport Services End ================

  const httpServer = createServer(app);
  return httpServer;
}
