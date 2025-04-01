import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import CoalStorageMonitoring from './ServicePages/CoalStorageMonitoring';
import WeightEstimation from './ServicePages/WeightEstimation';
import PriceEstimation from './ServicePages/PriceEstimation';
import ProductCollateral from './ServicePages/ProductCollateral';
import NotFound from './not-found';

// Service slug to component mapping - we only include components that have been implemented
const serviceComponents: Record<string, React.FC> = {
  'storage-monitoring': CoalStorageMonitoring,    // 煤仓监管服务
  'weight-estimation': WeightEstimation,          // 煤重估量服务
  'price-estimation': PriceEstimation,            // 煤价估算服务
  'product-collateral': ProductCollateral,        // 煤品货押服务
};

// Default component for services that don't have a dedicated page yet
const DefaultServicePage: React.FC<{ service: any }> = ({ service }) => {
  const { t, i18n } = useTranslation();
  
  if (!service) return <NotFound />;
  
  // Set document title
  useEffect(() => {
    document.title = i18n.language === 'cn' 
      ? `${service.nameCn || service.nameEn} | 煤炭服务` 
      : `${service.nameEn || service.nameCn} | Coal Services`;
  }, [i18n.language, service]);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {i18n.language === 'cn' ? service.nameCn : service.nameEn}
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              {i18n.language === 'cn' ? service.descriptionCn : service.descriptionEn}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/consultation">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100">
                  {i18n.language === 'cn' ? '申请咨询' : 'Request Consultation'}
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  {i18n.language === 'cn' ? '联系我们' : 'Contact Us'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose lg:prose-xl">
            {/* Service features from database */}
            <h2>{i18n.language === 'cn' ? '服务特点' : 'Service Features'}</h2>
            <div dangerouslySetInnerHTML={{ 
              __html: i18n.language === 'cn' ? service.featuresCn : service.featuresEn 
            }} />
            
            {/* CTA */}
            <div className="mt-12 text-center not-prose">
              <h3 className="text-2xl font-bold mb-4">
                {i18n.language === 'cn' ? '想了解更多？' : 'Want to learn more?'}
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                {i18n.language === 'cn' 
                  ? '联系我们获取更多关于此服务的信息，或安排咨询' 
                  : 'Contact us for more information about this service or to schedule a consultation'}
              </p>
              <Link href="/consultation">
                <Button size="lg" className="mr-4">
                  {i18n.language === 'cn' ? '申请咨询' : 'Request Consultation'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default function ServiceDetail() {
  const [, params] = useRoute('/services/:slug');
  const slug = params?.slug || '';
  
  const { data: service, isLoading, error } = useQuery({
    queryKey: ['/api/coal-services', slug],
    enabled: !!slug
  });

  // Choose which component to render based on slug
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return <NotFound />;
  }

  // If we have a dedicated page component for this service and it's not null, use it
  const ServiceComponent = serviceComponents[slug];
  if (ServiceComponent && typeof ServiceComponent === 'function') {
    return <ServiceComponent />;
  }

  // Otherwise, use the default service page component
  return <DefaultServicePage service={service} />;
}