import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

// Form validation schema
const waitlistSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().optional(),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

type WaitlistFormValues = z.infer<typeof waitlistSchema>;

export default function WaitlistForm() {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      terms: false,
    },
  });

  const waitlistMutation = useMutation({
    mutationFn: (data: Omit<WaitlistFormValues, "terms">) => {
      return apiRequest("POST", "/api/waitlist", data);
    },
    onSuccess: async () => {
      setFormSubmitted(true);
      reset();
      toast({
        title: "Success!",
        description: "You've been added to our waitlist. We'll notify you when we launch.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: WaitlistFormValues) => {
    // Remove the terms field before sending to API
    const { terms, ...submissionData } = data;
    waitlistMutation.mutate(submissionData);
  };

  return (
    <section id="waitlist" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="md:flex">
            <div className="md:flex-1 p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Join the Waitlist</h2>
              <p className="text-slate-600 mb-6">Be the first to know when we launch. Early adopters will receive exclusive benefits and discounts.</p>
              
              {formSubmitted ? (
                <div className="mt-6 p-4 rounded-md bg-green-50 text-green-700">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">Success! You've been added to our waitlist. We'll notify you when we launch.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-slate-300 rounded-md ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-slate-300 rounded-md ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">Company Name (Optional)</label>
                    <input
                      type="text"
                      id="company"
                      {...register("company")}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-slate-300 rounded-md"
                      placeholder="Acme Inc."
                    />
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        {...register("terms")}
                        className={`focus:ring-primary-500 h-4 w-4 text-primary-600 border-slate-300 rounded ${errors.terms ? 'border-red-500' : ''}`}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="font-medium text-slate-700">I agree to the terms and privacy policy</label>
                      {errors.terms && (
                        <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={waitlistMutation.isPending}
                      className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70"
                    >
                      {waitlistMutation.isPending ? (
                        <>
                          <Loader2 className="animate-spin h-5 w-5 mr-2" />
                          Submitting...
                        </>
                      ) : (
                        "Join the Waitlist"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
            
            <div className="md:flex-1 bg-gradient flex items-center justify-center p-12 hidden md:block">
              <div className="text-center text-white">
                <div className="w-24 h-24 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Get Early Access</h3>
                <p className="text-white/80">Be among the first to experience the future of productivity and collaboration.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
