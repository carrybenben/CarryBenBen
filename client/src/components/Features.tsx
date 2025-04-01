import { motion } from "framer-motion";
import { Zap, Lock, Scale, Users, BarChart3, Download } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Zap className="h-6 w-6 text-primary-600" />,
      title: "Lightning Fast Performance",
      description: "Experience blazing fast load times and smooth interactions that keep your team productive."
    },
    {
      icon: <Lock className="h-6 w-6 text-primary-600" />,
      title: "Enterprise-Grade Security",
      description: "Your data is protected with state-of-the-art encryption and security practices at every level."
    },
    {
      icon: <Scale className="h-6 w-6 text-primary-600" />,
      title: "Intelligent Automation",
      description: "Automate repetitive tasks and workflows to save time and reduce errors in your processes."
    },
    {
      icon: <Users className="h-6 w-6 text-primary-600" />,
      title: "Team Collaboration",
      description: "Real-time collaboration features that bring your team together no matter where they're located."
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary-600" />,
      title: "Advanced Analytics",
      description: "Gain valuable insights with comprehensive analytics and reporting tools that drive better decisions."
    },
    {
      icon: <Download className="h-6 w-6 text-primary-600" />,
      title: "Seamless Integrations",
      description: "Connect with all your favorite tools and platforms for a unified workflow experience."
    }
  ];

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-slate-600">Discover how ProductName can transform your workflow with these game-changing features.</p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="feature-card bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
