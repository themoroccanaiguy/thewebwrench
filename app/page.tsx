"use client"

import { ArrowRight, CheckCircle, Star, Phone, Mail, Target, Globe, Bot, BarChart3, Users, Clock, Calendar, FileText, TrendingUp, Car, DollarSign, Rocket, ShieldCheck, BarChart2 } from "lucide-react"
import { Button } from "@/components/button"
import { Card, CardContent } from "@/components/card"
import MarketingTruthSection from "@/components/sections/MarketingTruthSection"
import { Input } from "@/components/input"
import { Badge } from "@/components/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/accordion"
import { useState } from "react"
import { HomeImprovementHero } from "@/components/ui/home-improvement-hero"

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

  const handleContactSubmit = () => {
    // Here you would typically send the data to your backend
    console.log("Survey completed:", answers)
    setCurrentStep(questions.length + 1) // Show thank you message
    
    // You can add your form submission logic here, e.g.,
    // await fetch('/api/submit-lead', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(answers)
    // });
  }

  const progress = ((currentStep + 1) / (questions.length + 2)) * 100

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
            className="bg-white rounded-full h-2 transition-all duration-300"
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
                className="text-center focus:ring-brand-navy focus:border-brand-navy"
              />
              <Input
                placeholder="Your Email"
                type="email"
                value={answers.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAnswer("email", e.target.value)}
                className="text-center focus:ring-brand-navy focus:border-brand-navy"
              />
              
              <Input
                placeholder="Your Phone Number (Optional)"
                type="tel"
                value={answers.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAnswer("phone", e.target.value)}
                className="text-center focus:ring-brand-navy focus:border-brand-navy"
              />

              <Button
                onClick={handleContactSubmit}
                disabled={!answers.name || !answers.email}
                className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white"
                size="lg"
              >
                Schedule My Free Audit Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
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
      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 md:flex-1">
            <img
              src="/the-web-wrench-logo.webp"
              alt="The Web Wrench"
              style={{ height: "92px" }}
              className="w-auto mx-auto md:mx-0"
            />
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#services"
              className="typography-body mb-0 text-brand-charcoal hover:text-brand-orange transition-colors font-medium"
            >
              Services
            </a>
            <a
              href="#how-it-works"
              className="typography-body mb-0 text-brand-charcoal hover:text-brand-orange transition-colors font-medium"
            >
              How It Works
            </a>
            <Button 
              className="bg-brand-navy hover:bg-brand-navy-light text-white"
              onClick={() => {
                document.getElementById('lead-survey')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <HomeImprovementHero>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge
              variant="outline"
              className="mb-6 text-brand-orange border-brand-orange bg-white/80 backdrop-blur-sm typography-body-small"
            >
              For Contractors, Remodelers, and Home Service Pros Who Want More Leads
            </Badge>

            <div className="text-[70.4px] leading-[1.3] tracking-tight mb-6 font-black">
              <div className="text-black mb-3 font-[900]">Stop Losing Leads</div>
              <div className="text-black mb-3 font-[900]">Get Found Online With</div>
              <div className="text-brand-orange font-[900]">
                Proven Digital Marketing
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                className="bg-brand-orange hover:bg-brand-orange-dark text-white text-lg px-8 py-4 shadow-lg"
                onClick={() => {
                  document.getElementById('lead-survey')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Get My Free Lead Strategy
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Three-Step Process */}
            <div className="relative max-w-5xl mx-auto mt-6 pb-8 px-2">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start pt-6 relative z-10">
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center relative">
                  <div className="bg-brand-orange rounded-2xl w-16 h-16 flex items-center justify-center mb-3 shadow-md">
                    <Calendar className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-black mb-1">Book Your Free Call</h3>
                </div>
                {/* Step 2 */}
                <div className="flex flex-col items-center text-center relative">
                  <div className="bg-brand-orange rounded-2xl w-16 h-16 flex items-center justify-center mb-3 shadow-md">
                    <Car className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-black mb-1">Get Custom Strategy</h3>
                </div>
                {/* Step 3 */}
                <div className="flex flex-col items-center text-center relative">
                  <div className="bg-brand-orange rounded-2xl w-16 h-16 flex items-center justify-center mb-3 shadow-md">
                    <DollarSign className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-black mb-1">Watch Leads Flow In</h3>
                </div>
              </div>
              {/* Arrows between steps - positioned absolutely between columns */}
              <div className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none">
                {/* First arrow - between step 1 and 2 */}
                <div className="absolute left-1/3 -translate-x-1/2 top-1/2 -translate-y-1/2">
                  <svg className="w-16 h-16 text-brand-orange" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {/* Second arrow - between step 2 and 3 */}
                <div className="absolute left-2/3 -translate-x-1/2 top-1/2 -translate-y-1/2">
                  <svg className="w-16 h-16 text-brand-orange" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HomeImprovementHero>

      {/* Marketing Truth Section */}
      <MarketingTruthSection />

      {/* Services Section */}
      <section id="services" className="py-20">
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
      <section className="py-20 bg-white">
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
                  "I used to rely on referrals — now I'm getting calls every day from people who found us online."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-brand-navy/10 rounded-full mr-3"></div>
                  <div>
                    <div className="typography-body-small font-semibold text-brand-charcoal mb-0">John M.</div>
                    <div className="typography-caption text-gray-600">General Contractor</div>
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
                  "Our website looks amazing and actually converts visitors into clients."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-brand-navy/10 rounded-full mr-3"></div>
                  <div>
                    <div className="typography-body-small font-semibold text-brand-charcoal mb-0">Sarah R.</div>
                    <div className="typography-caption text-gray-600">Interior Designer</div>
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
                  "The Web Wrench doubled our leads in just 3 months. Best investment we've made."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-brand-navy/10 rounded-full mr-3"></div>
                  <div>
                    <div className="typography-body-small font-semibold text-brand-charcoal mb-0">Mike T.</div>
                    <div className="typography-caption text-gray-600">Roofing Contractor</div>
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
      <section className="py-20 bg-brand-charcoal text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="typography-h1 text-white mb-6">Ready to Start Getting More Leads? Let's Talk.</h2>
            <p className="typography-body-large text-white/90 mb-8">
              Book a free 30-minute strategy call and discover how we can help you dominate your local market.
            </p>

            <Button size="lg" className="bg-brand-orange hover:bg-brand-orange-dark text-white text-lg px-12 py-4">
              Book Your Free Strategy Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

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
    </div>
  )
} 