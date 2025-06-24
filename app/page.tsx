"use client"

import { ArrowRight, CheckCircle, Star, Phone, Mail, Target, Globe, Bot, BarChart3, Users, Clock, Calendar, FileText, TrendingUp, Car, DollarSign, Rocket, ShieldCheck, BarChart2 } from "lucide-react"
import { Button } from "@/components/button"
import { Card, CardContent } from "@/components/card"
import MarketingTruthSection from "@/components/sections/MarketingTruthSection"
import { Input } from "@/components/input"
import { Badge } from "@/components/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/accordion"
import { useState, useEffect } from "react"
import { HomeImprovementHero } from "@/components/ui/home-improvement-hero"
import { supabaseClient } from "@/lib/services"
import { Spinner } from "@/components/ui/Spinner"

function LeadMagnetSurvey() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({
    businessType: "",
    currentLeads: "",
    biggestChallenge: "",
    monthlyRevenue: "",
    leadSources: [],
    name: "",
    email: "",
    phone: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [supabaseStatus, setSupabaseStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [touched, setTouched] = useState<{ [k: string]: boolean }>({})
  const [fieldErrors, setFieldErrors] = useState<{ [k: string]: string }>({})
  const [showSuccessAnim, setShowSuccessAnim] = useState(false)

  const questions = [
    {
      id: "businessType",
      title: "What type of home improvement business do you run?",
      type: "single",
      options: [
        "General Contractor",
        "Kitchen/Bath Remodeling",
        "Roofing",
        "Plumbing",
        "HVAC",
        "Flooring",
        "Painting",
        "Other",
      ],
    },
    {
      id: "currentLeads",
      title: "How many qualified leads do you get per month?",
      type: "single",
      options: ["0-5 leads", "6-15 leads", "16-30 leads", "31-50 leads", "50+ leads"],
    },
    {
      id: "biggestChallenge",
      title: "What's your biggest challenge in getting new customers?",
      type: "single",
      options: [
        "Not enough leads coming in",
        "Leads are low quality/not ready to buy",
        "Too much competition",
        "Don't know how to market online",
        "Website doesn't convert visitors",
        "Spending too much on ads with poor results",
      ],
    },
    {
      id: "monthlyRevenue",
      title: "What's your current monthly revenue range?",
      type: "single",
      options: ["Under $10K", "$10K - $25K", "$25K - $50K", "$50K - $100K", "$100K - $250K", "$250K+"],
    },
    {
      id: "leadSources",
      title: "How do you currently get most of your leads? (Select all that apply)",
      type: "multiple",
      options: [
        "Word of mouth/Referrals",
        "Google Ads",
        "Facebook/Social Media",
        "Home improvement websites (Angie's List, etc.)",
        "Door-to-door/Cold calling",
        "Local advertising (radio, print)",
        "My website",
        "I don't have a consistent lead source",
      ],
    },
  ]

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Auto-save draft state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('surveyDraft', JSON.stringify(answers))
    }
  }, [answers])
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const draft = window.localStorage.getItem('surveyDraft')
      if (draft) {
        try {
          setAnswers(JSON.parse(draft))
        } catch {}
      }
    }
  }, [])

  // Analytics tracking (example: log to console, replace with real analytics)
  useEffect(() => {
    if (currentStep === questions.length + 1) {
      // Replace with analytics event (e.g., window.gtag, plausible, etc.)
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('survey_submitted', { detail: answers }))
      }
    }
  }, [currentStep])

  const handleContactSubmit = async () => {
    if (!answers.name || !answers.email || !answers.phone) {
      return;
    }
    setIsLoading(true);
    setError(null);
    setSupabaseStatus('idle');

    const formData = {
      name: answers.name,
      email: answers.email,
      phone: answers.phone,
    };

    const supabaseResult = await supabaseClient.from('leads').insert([formData]);
    if (supabaseResult.error) {
      setSupabaseStatus('error');
      setError('There was a problem submitting your information. Please try again.');
    } else {
      setSupabaseStatus('success');
      setShowSuccessAnim(true)
      setTimeout(() => {
        setShowSuccessAnim(false)
        setCurrentStep(questions.length + 1); // Show thank you
        setAnswers({
          businessType: "",
          currentLeads: "",
          biggestChallenge: "",
          monthlyRevenue: "",
          leadSources: [],
          name: "",
          email: "",
          phone: "",
        })
        setTouched({})
        setFieldErrors({})
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem('surveyDraft')
        }
      }, 1200)
    }
    setIsLoading(false);
  };

  const progress = ((currentStep + 1) / (questions.length + 2)) * 100

  // Validation functions
  const validateName = (name: string) => {
    if (!name.trim()) return 'Name is required.'
    if (name.trim().length < 2) return 'Name must be at least 2 characters.'
    return ''
  }
  const validateEmail = (email: string) => {
    if (!email.trim()) return 'Email is required.'
    // Simple email regex
    if (!/^\S+@\S+\.\S+$/.test(email)) return 'Enter a valid email address.'
    return ''
  }
  const validatePhone = (phone: string) => {
    if (!phone.trim()) return 'Phone number is required.'
    // Accepts 10+ digits, allows spaces, dashes, parentheses
    if (!/^[\d\s\-()+]{10,}$/.test(phone)) return 'Enter a valid phone number.'
    return ''
  }

  // Real-time validation effect
  useEffect(() => {
    setFieldErrors({
      name: touched.name ? validateName(answers.name) : '',
      email: touched.email ? validateEmail(answers.email) : '',
      phone: touched.phone ? validatePhone(answers.phone) : '',
    })
  }, [answers, touched])

  if (currentStep === questions.length + 1) {
    return (
      <div className="text-center">
        <div className="bg-white rounded-lg p-8 text-brand-charcoal max-w-2xl mx-auto">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4">Thank You, {answers.name}!</h3>
          <p className="text-lg mb-6">
            Thank you for completing the survey! We're reviewing your responses to better understand your business needs.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 text-left">
            <p className="font-medium text-blue-700">What's Next:</p>
            <p className="text-blue-700">
              You'll receive a confirmation email with details about your free online presence audit call. 
              During this 15-minute consultation, we'll review your current digital presence and provide 
              actionable strategies to help you attract more customers.
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="text-xl font-semibold mb-4">Schedule a Free 15-Minute Consultation</h4>
            <p className="text-gray-600 mb-6">Let's discuss how we can help grow your business!</p>
            <a
              href="https://calendly.com/more-estimates/let-s-discuss-how-we-can-help-grow-your-business"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-orange hover:bg-brand-orange-dark transition-colors"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book Your Free Consultation
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Claim Your Free Online Presence Audit</h2>
        <p className="text-lg text-white/90 mb-6">
          Complete this quick survey to schedule a free 15-minute consultation where we'll:
        </p>
        <ul className="max-w-2xl mx-auto text-left space-y-2 mb-6 text-white/90 bg-white/10 p-6 rounded-lg">
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
            <span>Audit your current online presence and digital marketing</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
            <span>Identify key opportunities to attract more local customers</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
            <span>Provide a personalized strategy to generate more leads</span>
          </li>
        </ul>
        <p className="text-lg font-medium text-white">
          No obligation. No pushy sales. Just expert advice to help grow your business.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="bg-white/20 rounded-full h-2 max-w-md mx-auto">
          <div
            className="bg-brand-orange rounded-full h-2 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-white/75 mt-2">
          Step {currentStep + 1} of {questions.length + 1}
        </p>
      </div>

      <div className="bg-white rounded-lg p-8 text-brand-charcoal max-w-2xl mx-auto">
        {currentStep < questions.length ? (
          <div>
            <h3 className="text-2xl font-bold text-left mb-8">{questions[currentStep].title}</h3>

            <div className="space-y-3">
              {questions[currentStep].options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-brand-light-gray hover:border-brand-navy cursor-pointer transition-colors"
                >
                  <input
                    type={questions[currentStep].type === "multiple" ? "checkbox" : "radio"}
                    name={questions[currentStep].id}
                    value={option}
                    checked={
                      questions[currentStep].type === "multiple"
                        ? (answers[questions[currentStep].id as keyof typeof answers] as string[])?.includes(option)
                        : answers[questions[currentStep].id as keyof typeof answers] === option
                    }
                    onChange={(e) => {
                      if (questions[currentStep].type === "multiple") {
                        const currentAnswers =
                          (answers[questions[currentStep].id as keyof typeof answers] as string[]) || []
                        if (e.target.checked) {
                          handleAnswer(questions[currentStep].id, [...currentAnswers, option])
                        } else {
                          handleAnswer(
                            questions[currentStep].id,
                            currentAnswers.filter((a) => a !== option),
                          )
                        }
                      } else {
                        handleAnswer(questions[currentStep].id, option)
                      }
                    }}
                    className="mr-3 text-brand-navy focus:ring-brand-navy"
                  />
                  <span className="text-left flex-1 text-base mb-0">{option}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={
                  questions[currentStep].type === "multiple"
                    ? !(answers[questions[currentStep].id as keyof typeof answers] as string[])?.length
                    : !answers[questions[currentStep].id as keyof typeof answers]
                }
                className="bg-brand-orange hover:bg-brand-orange-dark text-white"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-bold text-left mb-8">Almost done! Where should we send your personalized strategy?</h3>

            <div className="space-y-4 max-w-md mx-auto">
              <Input
                placeholder="Your Name"
                value={answers.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAnswer("name", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                className={`text-center focus:ring-brand-navy focus:border-brand-navy ${touched.name && fieldErrors.name ? 'border-red-500' : touched.name && !fieldErrors.name ? 'border-green-500' : ''}`}
                aria-invalid={!!fieldErrors.name}
                aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                required
                minLength={2}
                autoComplete="name"
              />
              {touched.name && fieldErrors.name && (
                <div id="name-error" className="text-red-600 text-xs mt-1 text-left">{fieldErrors.name}</div>
              )}
              <Input
                placeholder="Your Email"
                type="email"
                value={answers.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAnswer("email", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                className={`text-center focus:ring-brand-navy focus:border-brand-navy ${touched.email && fieldErrors.email ? 'border-red-500' : touched.email && !fieldErrors.email ? 'border-green-500' : ''}`}
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                required
                autoComplete="email"
              />
              {touched.email && fieldErrors.email && (
                <div id="email-error" className="text-red-600 text-xs mt-1 text-left">{fieldErrors.email}</div>
              )}
              <Input
                placeholder="Your Phone Number (Required)"
                type="tel"
                value={answers.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAnswer("phone", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                className={`text-center focus:ring-brand-navy focus:border-brand-navy ${touched.phone && fieldErrors.phone ? 'border-red-500' : touched.phone && !fieldErrors.phone ? 'border-green-500' : ''}`}
                aria-invalid={!!fieldErrors.phone}
                aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
                required
                autoComplete="tel"
              />
              {touched.phone && fieldErrors.phone && (
                <div id="phone-error" className="text-red-600 text-xs mt-1 text-left">{fieldErrors.phone}</div>
              )}
              <Button
                onClick={handleContactSubmit}
                disabled={
                  !answers.name || !answers.email || !answers.phone ||
                  !!fieldErrors.name || !!fieldErrors.email || !!fieldErrors.phone ||
                  isLoading
                }
                className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white flex items-center justify-center"
                size="lg"
                aria-disabled={
                  !answers.name || !answers.email || !answers.phone ||
                  !!fieldErrors.name || !!fieldErrors.email || !!fieldErrors.phone ||
                  isLoading
                }
              >
                {isLoading ? <Spinner className="mr-2" /> : null}
                {isLoading ? 'Submitting...' : 'Schedule My Free Audit Call'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              {showSuccessAnim && (
                <div className="flex flex-col items-center mt-4 animate-fade-in">
                  <CheckCircle className="h-12 w-12 text-green-500 mb-2 animate-bounce" />
                  <span className="text-green-700 font-semibold">Submission successful!</span>
                </div>
              )}
              {error && (
                <div className="text-red-600 text-sm mt-2">{error}</div>
              )}
            </div>

            <p className="text-base text-gray-600 mt-4">
              No spam. Your information is safe and will only be used to send you valuable marketing insights.
            </p>

            <div className="flex justify-center mt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
              >
                Back
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <HomeImprovementHero>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Updated Badge */}
            <Badge
              variant="outline"
              className="mb-4 sm:mb-6 text-brand-orange border-brand-orange/30 bg-white/90 backdrop-blur-sm text-xs sm:text-sm font-medium px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-sm"
            >
              For Contractors, Remodelers & Home Service Pros
            </Badge>

            {/* Main Title */}
            <h1 className="font-extrabold text-balance leading-tight tracking-tight mb-4 sm:mb-6">
              <span className="bg-gradient-to-b from-gray-900 to-gray-700 bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl">
                Stop Losing Leads.<br className="hidden sm:block" />
                <span className="text-brand-orange">Get Found Online.</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 text-base sm:text-lg md:text-xl lg:text-xl max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              Transform your business with proven digital marketing strategies that actually work for contractors and home service professionals.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 md:mb-16">
              <Button
                size="lg"
                className="bg-brand-orange hover:bg-brand-orange-dark text-white text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl transform-gpu"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    const element = document.getElementById('lead-survey');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
              >
                Get My Free Lead Strategy
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Three-Step Process */}
            <div className="relative max-w-5xl mx-auto mt-8 md:mt-12 pb-8 px-2">
              <div className="relative">
                {/* Mobile View - Steps 1 & 2 in one row, Step 3 centered below */}
                <div className="lg:hidden">
                  {/* First Row - Steps 1 & 2 */}
                  <div className="flex justify-center items-start gap-4 mb-4">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center text-center relative group">
                      <div className="bg-brand-orange rounded-2xl w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-2 shadow-md group-hover:scale-110 transition-transform duration-200">
                        <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900">Book Free Call</h3>
                    </div>
                    
                    {/* Arrow 1 */}
                    <div className="flex items-center justify-center h-12 sm:h-14 w-6 sm:w-8 pt-2">
                      <svg className="w-6 h-6 text-brand-orange" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H17M17 12L12 7M17 12L12 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    
                    {/* Step 2 */}
                    <div className="flex flex-col items-center text-center relative group">
                      <div className="bg-brand-orange rounded-2xl w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-2 shadow-md group-hover:scale-110 transition-transform duration-200">
                        <Car className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900">Get Strategy</h3>
                    </div>
                  </div>
                  
                  {/* Second Row - Step 3 centered */}
                  <div className="flex justify-center">
                    {/* Arrow 2 - Vertical */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 h-4 w-6 -mt-6">
                      <svg className="w-6 h-6 text-brand-orange transform rotate-90" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H17M17 12L12 7M17 12L12 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    
                    {/* Step 3 */}
                    <div className="flex flex-col items-center text-center relative group mt-4">
                      <div className="bg-brand-orange rounded-2xl w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-2 shadow-md group-hover:scale-110 transition-transform duration-200">
                        <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900">Get More Leads</h3>
                    </div>
                  </div>
                </div>
                
                {/* Desktop View - Original 3-column layout */}
                <div className="hidden lg:grid grid-cols-3 gap-8 items-start pt-6 relative z-10">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center relative group">
                    <div className="bg-brand-orange rounded-2xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform duration-200">
                      <Calendar className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Book Your Free Call</h3>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center relative group">
                    <div className="bg-brand-orange rounded-2xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform duration-200">
                      <Car className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Get Custom Strategy</h3>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="flex flex-col items-center text-center relative group">
                    <div className="bg-brand-orange rounded-2xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform duration-200">
                      <DollarSign className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Watch Leads Flow In</h3>
                  </div>
                </div>
                
                {/* Arrows between steps - Desktop only */}
                <div className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none">
                  {/* Arrow between step 1 and 2 */}
                  <div className="absolute left-1/3 -translate-x-1/2 top-1/2 -translate-y-1/2">
                    <svg className="w-16 h-16 text-brand-orange" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  {/* Arrow between step 2 and 3 */}
                  <div className="absolute left-2/3 -translate-x-1/2 top-1/2 -translate-y-1/2">
                    <svg className="w-16 h-16 text-brand-orange" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HomeImprovementHero>

      {/* Marketing Truth Section - About Us */}
      <section id="about">
        <MarketingTruthSection />
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="typography-h2">Services We Offer</h2>
            <p className="typography-body-large text-gray-600">Everything you need to dominate your local market</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow bg-white border-brand-navy/10">
              <CardContent className="p-8">
                <Target className="h-12 w-12 text-brand-orange mx-auto mb-4" />
                <h3 className="typography-h5">Lead Generation</h3>
                <p className="typography-body mb-0">Run Google & Meta Ads targeting homeowners ready to hire</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-white border-brand-navy/10">
              <CardContent className="p-8">
                <Globe className="h-12 w-12 text-brand-orange mx-auto mb-4" />
                <h3 className="typography-h5">Website Design</h3>
                <p className="typography-body mb-0">Build fast, mobile-friendly, conversion-focused sites</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-white border-brand-navy/10">
              <CardContent className="p-8">
                <Bot className="h-12 w-12 text-brand-orange mx-auto mb-4" />
                <h3 className="typography-h5">AI Integration</h3>
                <p className="typography-body mb-0">Chatbots, autoresponders, and analytics dashboards</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-white border-brand-navy/10">
              <CardContent className="p-8">
                <BarChart3 className="h-12 w-12 text-brand-orange mx-auto mb-4" />
                <h3 className="typography-h5">Ongoing Support</h3>
                <p className="typography-body mb-0">Monthly strategy sessions, performance reports, and optimization</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Lead Magnet Survey */}
      <section id="lead-survey" className="py-20 bg-brand-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <LeadMagnetSurvey />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="typography-h2">What Our Clients Say</h2>
            <div className="flex justify-center items-center space-x-2 mb-8">
              <Badge variant="outline" className="text-brand-orange border-brand-orange typography-body-small">
                <Star className="h-4 w-4 mr-1 fill-current" />
                Trusted by 100+ Home Improvement Pros
              </Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 border-brand-navy/10">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="typography-body text-gray-600">
                  "Our old website looked like it was built in 2005; no one was converting. The web wrench built us a sleek, modern site with AI-driven tools that actually engage visitors. We've seen a 70% increase in contact form submissions since the launch."
                </blockquote>
                <div className="flex items-center mt-4">
                  <div className="w-12 h-12 bg-brand-navy/10 rounded-full mr-3 overflow-hidden">
                    <img 
                      src="/images/testimonials/tom-r-rg-remodeling.webp" 
                      alt="Tom R. - R&G Remodeling"
                      className="w-full h-full object-cover"
                      width={48}
                      height={48}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.style.background = 'rgba(30, 58, 138, 0.04)';
                      }}
                    />
                  </div>
                  <div>
                    <div className="typography-body-small font-semibold text-brand-charcoal mb-0">Tom R.</div>
                    <div className="typography-caption text-gray-600">Owner of R&G Remodeling</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 border-brand-navy/10">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="typography-body text-gray-600">
                  "We were running Facebook ads ourselves, but they weren't getting us quality leads. The web wrench took over our campaigns and used their AI automations to target homeowners ready to renovate. Our cost per lead dropped by half and our ROI is way up."
                </blockquote>
                <div className="flex items-center mt-4">
                  <div className="w-12 h-12 bg-brand-navy/10 rounded-full mr-3 overflow-hidden">
                    <img 
                      src="/images/testimonials/carlos-d-clearview-windows.webp" 
                      alt="Carlos D. - Clearview Windows & Doors"
                      className="w-full h-full object-cover"
                      width={48}
                      height={48}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.style.background = 'rgba(30, 58, 138, 0.04)';
                      }}
                    />
                  </div>
                  <div>
                    <div className="typography-body-small font-semibold text-brand-charcoal mb-0">Carlos D.</div>
                    <div className="typography-caption text-gray-600">Founder of Clearview Windows & Doors</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 border-brand-navy/10">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="typography-body text-gray-600">
                  "I didn't know where to start with automation or AI. I just knew my time was being wasted on marketing that didn't work. The Web Wrench set everything up for us: smart ads, review tracking, even auto-responses for leads. Now I focus on the jobs, not the hustle."
                </blockquote>
                <div className="flex items-center mt-4">
                  <div className="w-12 h-12 bg-brand-navy/10 rounded-full mr-3 overflow-hidden">
                    <img 
                      src="/images/testimonials/mike-l-apex-roofing.webp" 
                      alt="Mike L. - Apex Roofing Solutions"
                      className="w-full h-full object-cover"
                      width={48}
                      height={48}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.style.background = 'rgba(30, 58, 138, 0.04)';
                      }}
                    />
                  </div>
                  <div>
                    <div className="typography-body-small font-semibold text-brand-charcoal mb-0">Mike L.</div>
                    <div className="typography-caption text-gray-600">Owner of Apex Roofing Solutions</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="typography-h2">Frequently Asked Questions</h2>
              <p className="typography-body-large text-gray-600">Get answers to common questions</p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg px-6 border-brand-navy/10">
                <AccordionTrigger className="text-left typography-h6 text-brand-charcoal hover:text-brand-orange">
                  How long before I see results?
                </AccordionTrigger>
                <AccordionContent className="typography-body text-gray-600">
                  Most clients start seeing increased website traffic within 2-4 weeks, and qualified leads typically
                  begin flowing within 30-60 days. However, results can vary based on your market, competition, and
                  current online presence.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-lg px-6 border-brand-navy/10">
                <AccordionTrigger className="text-left typography-h6 text-brand-charcoal hover:text-brand-orange">
                  Do I need to sign a contract?
                </AccordionTrigger>
                <AccordionContent className="typography-body text-gray-600">
                  We offer both month-to-month and contract options. Many clients prefer our 6-month packages for better
                  results and cost savings, but we're flexible based on your needs and comfort level.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-lg px-6 border-brand-navy/10">
                <AccordionTrigger className="text-left typography-h6 text-brand-charcoal hover:text-brand-orange">
                  What if I already have a website?
                </AccordionTrigger>
                <AccordionContent className="typography-body text-gray-600">
                  We'll audit your existing website and determine if it can be optimized or if a new site would be more
                  effective. Many times we can improve your current site's performance with strategic updates and
                  optimization.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-lg px-6 border-brand-navy/10">
                <AccordionTrigger className="text-left typography-h6 text-brand-charcoal hover:text-brand-orange">
                  Can you help with Yelp/Google Reviews?
                </AccordionTrigger>
                <AccordionContent className="typography-body text-gray-600">
                  We help set up automated review request systems, optimize your Google Business Profile, and develop
                  strategies to encourage more positive reviews from satisfied customers.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="final-cta" className="py-20 bg-brand-charcoal text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="typography-h1 text-white mb-6">Ready to Start Getting More Leads? Let's Talk.</h2>
            <p className="typography-body-large text-white/90 mb-8">
              Book a free 30-minute strategy call and discover how we can help you dominate your local market.
            </p>

            <a 
              href="https://calendly.com/more-estimates/let-s-discuss-how-we-can-help-grow-your-business" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow h-10 rounded-md bg-brand-orange hover:bg-brand-orange-dark text-white text-lg px-12 py-4"
            >
              Book Your Free Strategy Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 typography-body-small text-white/75">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                30-minute call
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                No obligation
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Custom strategy
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative circles */}
        <div className="absolute top-3/4 right-1/2 w-12 h-12 bg-brand-orange/8 rounded-full"></div>
        <div className="absolute top-12 left-1/2 w-6 h-6 bg-brand-navy/12 rounded-full"></div>
        <div className="absolute top-1/4 right-12 w-5 h-5 bg-brand-orange/10 rounded-full"></div>
        <div className="absolute bottom-1/4 left-12 w-8 h-8 bg-brand-navy/8 rounded-full"></div>
        <div className="absolute bottom-8 right-1/4 w-5 h-5 bg-brand-orange/12 rounded-full"></div>
        <div className="absolute top-2/3 left-1/5 w-7 h-7 bg-brand-navy/10 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/5 w-4 h-4 bg-brand-orange/15 rounded-full"></div>
        <div className="absolute top-1/5 left-3/4 w-3 h-3 bg-brand-navy/15 rounded-full"></div>
        <div className="absolute top-3/5 right-3/4 w-3 h-3 bg-brand-orange/12 rounded-full"></div>
        <div className="absolute bottom-1/5 left-2/3 w-4 h-4 bg-brand-navy/8 rounded-full"></div>
        <div className="absolute bottom-2/5 right-2/3 w-2 h-2 bg-brand-orange/18 rounded-full"></div>
      </section>

      {/* Footer */}
      <footer className="text-brand-charcoal py-12 relative overflow-hidden border-t border-gray-100">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <img
                  src="/the-web-wrench-logo.webp"
                  alt="The Web Wrench"
                  style={{ height: "92px" }}
                  className="w-auto mb-4"
                />
                <p className="typography-body text-gray-600">
                  Digital marketing solutions for home improvement professionals.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center typography-body-small text-gray-600">
                    <Phone className="h-4 w-4 mr-2 text-brand-orange" />
                    (555) 123-4567
                  </div>
                  <div className="flex items-center typography-body-small text-gray-600">
                    <Mail className="h-4 w-4 mr-2 text-brand-orange" />
                    hello@thewebwrench.com
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="typography-h6 text-brand-charcoal">Services</h4>
              <ul className="space-y-2 typography-body-small text-gray-600">
                <li>
                  <a href="#" className="hover:text-brand-orange transition-colors">
                    Lead Generation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-orange transition-colors">
                    Website Design
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-orange transition-colors">
                    SEO Optimization
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-orange transition-colors">
                    Google Ads
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-orange transition-colors">
                    Social Media Marketing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="typography-h6 text-brand-charcoal">Industries</h4>
              <ul className="space-y-2 typography-body-small text-gray-600">
                <li>
                  <a href="#" className="hover:text-brand-orange transition-colors">
                    General Contractors
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-orange transition-colors">
                    Plumbing Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-orange transition-colors">
                    Roofing Companies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-orange transition-colors">
                    Kitchen Remodeling
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-orange transition-colors">
                    HVAC Services
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="typography-h6 text-brand-charcoal">Company</h4>
              <ul className="space-y-2 typography-body-small text-gray-600">
                <li>
                  <a href="#" className="hover:text-brand-orange transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-orange transition-colors">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-orange transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-orange transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-orange transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-brand-navy/10 mt-8 pt-8 text-center typography-body-small text-gray-600">
            <p>&copy; 2024 The Web Wrench. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Floating Action Button for Mobile/Tablet */}
      <a 
        href="https://calendly.com/more-estimates/let-s-discuss-how-we-can-help-grow-your-business"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 lg:hidden flex items-center justify-center w-16 h-16 rounded-full bg-brand-orange text-white shadow-lg hover:bg-brand-orange-dark transition-colors"
        aria-label="Book a consultation"
      >
        <Calendar className="h-6 w-6" />
      </a>
    </div>
  )
} 