import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$12",
      description: "Perfect for small teams just getting started.",
      features: [
        "Up to 5 team members",
        "Basic analytics",
        "5GB storage",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$24",
      description: "Ideal for growing teams with advanced needs.",
      features: [
        "Up to 20 team members",
        "Advanced analytics",
        "25GB storage",
        "Priority support",
        "Custom integrations"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$49",
      description: "For organizations with advanced security and compliance needs.",
      features: [
        "Unlimited team members",
        "Enterprise analytics",
        "100GB storage",
        "24/7 dedicated support",
        "Advanced security controls"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-slate-600">Choose the plan that works best for your team. All plans include access to all features.</p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              className={`bg-white rounded-xl shadow-sm border ${plan.popular ? 'border-2 border-primary-500' : 'border-slate-200'} overflow-hidden transition-all duration-300 hover:shadow-lg ${plan.popular ? 'transform md:-translate-y-4' : ''} relative`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {plan.popular && (
                <>
                  <div className="absolute top-0 inset-x-0 h-2 bg-primary-500"></div>
                  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-1/2 bg-primary-600 text-white text-xs font-bold tracking-wider py-1 px-3 rounded-full">
                    POPULAR
                  </div>
                </>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-slate-600">/month per user</span>
                </div>
                <p className="text-slate-600 mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-primary-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-6 bg-slate-50 border-t border-slate-200">
                <a 
                  href="#waitlist" 
                  className={`w-full inline-flex justify-center py-2 px-4 border ${plan.popular ? 'border-transparent bg-primary-600 hover:bg-primary-700 text-white' : 'border-primary-600 text-primary-600 bg-white hover:bg-primary-50'} rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors`}
                >
                  Join Waitlist
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
