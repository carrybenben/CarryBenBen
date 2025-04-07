import { Switch, Route } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import ConsultationPage from "@/pages/Consultation";
import ServiceDetail from "@/pages/ServiceDetail";
import CaseStudies from "@/pages/CaseStudies";
import CaseStudyDetail from "@/pages/CaseStudyDetail";
import TechnologyDetails from "@/pages/ServicePages/TechnologyDetails";
import VideoMonitoring from "@/pages/SubPages/VideoMonitoring";
import ThermalImaging from "@/pages/SubPages/ThermalImaging";
import InventoryAnalysis from "@/pages/SubPages/InventoryAnalysis";
import ReferencePricing from "@/pages/SubPages/ReferencePricing";
import TransactionDataPricing from "@/pages/SubPages/TransactionDataPricing";
import LocalMarketPricing from "@/pages/SubPages/LocalMarketPricing";
import PriceAlertSystem from "@/pages/SubPages/PriceAlertSystem";
import TimeperiodAlertSystem from "@/pages/SubPages/TimeperiodAlertSystem";
import AllCoalProducts from "@/pages/SubPages/AllCoalProducts";
import AuctionCoalProducts from "@/pages/SubPages/AuctionCoalProducts";
import DiscountCoalProducts from "@/pages/SubPages/DiscountCoalProducts";
import CoalProductDetail from "@/pages/SubPages/CoalProductDetail";
import BidPage from "@/pages/SubPages/BidPage";
import PurchasePage from "@/pages/SubPages/PurchasePage";
import ImplementationProcess from "@/pages/ServicePages/ImplementationProcess";
import CoalStorageMonitoring from "@/pages/ServicePages/CoalStorageMonitoring";
import WeightEstimation from "@/pages/ServicePages/WeightEstimation";
import PriceEstimation from "@/pages/ServicePages/PriceEstimation";
import ProductCollateral from "@/pages/ServicePages/ProductCollateral";
import Transport from "@/pages/ServicePages/Transport";
import QualityTesting from "@/pages/ServicePages/QualityTesting";
import TestingRecords from "@/pages/ServicePages/TestingRecords";
import CoalRiskDisposal from "@/pages/ServicePages/CoalRiskDisposal";
import ServicesPage from "@/pages/Services";
import AboutPage from "@/pages/About";
import ContactPage from "@/pages/Contact";
import Checkout from "@/pages/Checkout";
import OrderDetail from "@/pages/OrderDetail";
import FinancingCheckout from "@/pages/SubPages/FinancingCheckout";
import FinancingApplication from "@/pages/SubPages/FinancingApplication";
import TransportOrders from "@/pages/SubPages/TransportOrders";
import TransportTracking from "@/pages/SubPages/TransportTracking";
import TransportDrivers from "@/pages/SubPages/TransportDrivers";
import TransportPlatform from "@/pages/SubPages/TransportPlatform";
import { LanguageProvider } from "@/hooks/use-language";

function Router() {
  // Smooth scroll implementation for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      
      // Only process anchor links
      if (target.tagName === 'A' && target.hash && target.hash.startsWith('#') && target.pathname === window.location.pathname) {
        e.preventDefault();
        
        const targetId = target.hash;
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
          
          // Update URL without reloading the page
          history.pushState(null, '', targetId);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/services/storage-monitoring" component={CoalStorageMonitoring} />
      <Route path="/services/weight-estimation" component={WeightEstimation} />
      <Route path="/services/price-estimation" component={PriceEstimation} />
      <Route path="/services/product-collateral" component={ProductCollateral} />
      <Route path="/services/transport" component={Transport} />
      <Route path="/services/quality-testing" component={QualityTesting} />
      <Route path="/services/testing-records" component={TestingRecords} />
      <Route path="/services/coal-risk-disposal" component={CoalRiskDisposal} />
      <Route path="/coal-products/:id" component={CoalProductDetail} />
      <Route path="/coal-products/:id/bid" component={BidPage} />
      <Route path="/coal-products/:id/purchase" component={PurchasePage} />
      <Route path="/services/:slug" component={ServiceDetail} />
      <Route path="/technology/:tech-type" component={TechnologyDetails} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/case-studies/:id" component={CaseStudyDetail} />
      <Route path="/consultation" component={ConsultationPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/sub-pages/video-monitoring" component={VideoMonitoring} />
      <Route path="/sub-pages/thermal-imaging" component={ThermalImaging} />
      <Route path="/sub-pages/inventory-analysis" component={InventoryAnalysis} />
      <Route path="/sub-pages/reference-pricing" component={ReferencePricing} />
      <Route path="/sub-pages/transaction-data-pricing" component={TransactionDataPricing} />
      <Route path="/sub-pages/local-market-pricing" component={LocalMarketPricing} />
      <Route path="/sub-pages/price-alert-system" component={PriceAlertSystem} />
      <Route path="/sub-pages/timeperiod-alert-system" component={TimeperiodAlertSystem} />
      <Route path="/sub-pages/all-coal-products" component={AllCoalProducts} />
      <Route path="/sub-pages/auction-coal-products" component={AuctionCoalProducts} />
      <Route path="/sub-pages/discount-coal-products" component={DiscountCoalProducts} />
      <Route path="/implementation-process" component={ImplementationProcess} />
      <Route path="/checkout/:orderId" component={Checkout} />
      <Route path="/orders/:orderId" component={OrderDetail} />
      <Route path="/financing-checkout/:id" component={FinancingCheckout} />
      <Route path="/financing-application" component={FinancingApplication} />
      <Route path="/transport-platform" component={TransportPlatform} />
      <Route path="/transport/orders" component={TransportOrders} />
      <Route path="/transport/tracking" component={TransportTracking} />
      <Route path="/transport/drivers" component={TransportDrivers} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <>
      <LanguageProvider>
        <Layout>
          <Router />
        </Layout>
      </LanguageProvider>
      <style dangerouslySetInnerHTML={{
        __html: `
        .bg-gradient {
          background: linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%);
        }
        .card-decoration {
          position: absolute;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
          z-index: -1;
        }
        .feature-card:hover {
          transform: translateY(-5px);
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .float {
          animation: float 6s ease-in-out infinite;
        }
        `
      }} />
    </>
  );
}

export default App;
