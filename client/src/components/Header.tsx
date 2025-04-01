import { useMobileMenu } from "@/hooks/use-mobile-menu";
import { Link } from "wouter";

export default function Header() {
  const { isOpen, toggle, close } = useMobileMenu();
  
  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient rounded-lg"></div>
            <span className="font-bold text-xl">ProductName</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">How it Works</a>
            <a href="#testimonials" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">Testimonials</a>
            <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">Pricing</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <a href="#waitlist" className="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-50 hover:bg-primary-100 transition-colors">
              Join Waitlist
            </a>
            <button 
              className="md:hidden text-slate-500 hover:text-slate-700" 
              id="menuButton" 
              aria-label="Menu"
              onClick={toggle}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, toggled by state */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobileMenu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b border-slate-200">
          <a 
            href="#features" 
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50"
            onClick={close}
          >
            Features
          </a>
          <a 
            href="#how-it-works" 
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50"
            onClick={close}
          >
            How it Works
          </a>
          <a 
            href="#testimonials" 
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50"
            onClick={close}
          >
            Testimonials
          </a>
          <a 
            href="#pricing" 
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50"
            onClick={close}
          >
            Pricing
          </a>
          <a 
            href="#waitlist" 
            className="block px-3 py-2 rounded-md text-base font-medium text-primary-600 hover:bg-primary-50"
            onClick={close}
          >
            Join Waitlist
          </a>
        </div>
      </div>
    </header>
  );
}
