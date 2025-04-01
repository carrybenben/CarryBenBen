import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t, i18n } = useTranslation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4 shadow-lg border-0">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {i18n.language === 'cn' ? '404 页面未找到' : '404 Page Not Found'}
            </h1>
            <p className="text-gray-600">
              {i18n.language === 'cn' 
                ? '很抱歉，您正在寻找的页面不存在或已被移除。' 
                : 'Sorry, the page you are looking for does not exist or has been removed.'}
            </p>
          </div>

          <div className="flex justify-center">
            <Link href="/">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                {i18n.language === 'cn' ? '返回首页' : 'Back to Home'}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
