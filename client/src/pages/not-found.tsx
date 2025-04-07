import React from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  const [, setLocation] = useLocation();
  const { language } = useLanguage();

  return (
    <div className="container mx-auto py-16 px-4 flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50">
      <motion.div 
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-9xl font-bold text-primary opacity-80"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 15
          }}
        >
          404
        </motion.h1>
        <div className="w-16 h-1 bg-primary mx-auto my-6 rounded-full opacity-50"></div>
        <h2 className="text-2xl font-bold mb-4">
          {language === 'cn' ? '页面未找到' : 'Page Not Found'}
        </h2>
        <p className="text-gray-600 mb-8">
          {language === 'cn' 
            ? '您请求的页面不存在或已被移除。请检查URL是否正确，或返回主页。' 
            : 'The page you requested does not exist or has been removed. Please check the URL or return to the homepage.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={() => setLocation('/')}
            className="w-full sm:w-auto"
            size="lg"
          >
            {language === 'cn' ? '返回首页' : 'Back to Home'}
          </Button>
          <Button 
            variant="outline"
            onClick={() => setLocation('/services')}
            className="w-full sm:w-auto"
            size="lg"
          >
            {language === 'cn' ? '浏览服务' : 'Browse Services'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;