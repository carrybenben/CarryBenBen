import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
const resources = {
  en: {
    translation: {
      // Navigation
      "nav.home": "Home",
      "nav.services": "Services",
      "nav.about": "About",
      "nav.contact": "Contact",

      // Language switch
      "language.switch": "中文",
      "language.current": "English",

      // Hero section
      "hero.title": "Integrated Coal Industry Solutions",
      "hero.subtitle": "Comprehensive services for the modern coal industry",
      "hero.cta": "Explore Our Services",
      "hero.secondary": "Contact Us",

      // Services
      "services.title": "Our Services",
      "services.description": "Comprehensive solutions for the coal industry",
      "services.viewDetails": "View Details",
      
      // Service specific names are loaded dynamically from API
      
      // Contact form
      "contact.title": "Get In Touch",
      "contact.description": "Have questions about our services? Contact us today.",
      "contact.name": "Full Name",
      "contact.email": "Email Address",
      "contact.company": "Company Name (optional)",
      "contact.phone": "Phone Number (optional)",
      "contact.service": "Service Type",
      "contact.message": "Your Message",
      "contact.submit": "Submit Request",
      "contact.success": "Your message has been sent successfully. We will get back to you soon.",
      "contact.error": "There was an error sending your message. Please try again.",
      
      // Consultation
      "consultation.title": "Expert Coal Industry Consultation",
      "consultation.description": "Get expert advice tailored to your specific needs",
      "consultation.cta": "Request Consultation",
      
      // Footer
      "footer.rights": "All Rights Reserved",
      "footer.company": "Coal Services Ltd.",
      "footer.services": "Services",
      "footer.resources": "Resources",
      "footer.legal": "Legal",
      "footer.privacy": "Privacy Policy",
      "footer.terms": "Terms of Service"
    }
  },
  cn: {
    translation: {
      // Navigation
      "nav.home": "首页",
      "nav.services": "服务",
      "nav.about": "关于我们",
      "nav.contact": "联系我们",

      // Language switch
      "language.switch": "English",
      "language.current": "中文",

      // Hero section
      "hero.title": "综合煤炭行业解决方案",
      "hero.subtitle": "为现代煤炭行业提供全面服务",
      "hero.cta": "探索我们的服务",
      "hero.secondary": "联系我们",

      // Services
      "services.title": "我们的服务",
      "services.description": "为煤炭行业提供全面解决方案",
      "services.viewDetails": "查看详情",
      
      // Contact form
      "contact.title": "联系我们",
      "contact.description": "对我们的服务有疑问？立即联系我们。",
      "contact.name": "姓名",
      "contact.email": "电子邮件",
      "contact.company": "公司名称（可选）",
      "contact.phone": "电话号码（可选）",
      "contact.service": "服务类型",
      "contact.message": "您的留言",
      "contact.submit": "提交请求",
      "contact.success": "您的留言已成功发送。我们将尽快回复您。",
      "contact.error": "发送留言时出错。请重试。",
      
      // Consultation
      "consultation.title": "专业煤炭行业咨询",
      "consultation.description": "获取针对您特定需求的专家建议",
      "consultation.cta": "请求咨询",
      
      // Footer
      "footer.rights": "版权所有",
      "footer.company": "煤炭服务有限公司",
      "footer.services": "服务",
      "footer.resources": "资源",
      "footer.legal": "法律",
      "footer.privacy": "隐私政策",
      "footer.terms": "服务条款"
    }
  }
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'cn', // Default language is Chinese
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;