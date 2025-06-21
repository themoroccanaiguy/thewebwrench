"use client"

import { Calendar, FileText, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import * as React from "react"

interface Step {
  number: number
  title: string
  description: string
  icon: React.ReactNode
  href?: string
}

const steps: Step[] = [
  {
    number: 1,
    title: "Book Your Free Call",
    description: "Schedule a 15-minute strategy session with our lead generation experts",
    icon: <Calendar className="h-8 w-8" />,
    href: "#book-call",
  },
  {
    number: 2,
    title: "Get Custom Strategy",
    description: "Receive a personalized digital marketing plan tailored to your contracting business",
    icon: <FileText className="h-8 w-8" />,
    href: "#custom-strategy",
  },
  {
    number: 3,
    title: "Watch Leads Flow In",
    description: "See qualified leads start coming in within 30 days of implementation",
    icon: <TrendingUp className="h-8 w-8" />,
    href: "#leads-flow",
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.18, duration: 0.6, type: "spring" as const },
  }),
}

const ArrowIcon = () => (
  <svg
    className="w-12 h-12 text-brand-orange mx-2"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const bgPattern = (
  <div className="absolute inset-0 pointer-events-none">
    <div className="w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-60" />
  </div>
)

const sectionBg = "bg-brand-navy"

const containerMax = "max-w-6xl mx-auto"

const cardBase = "group relative flex flex-col items-center justify-between bg-white/5 border border-white/10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-brand-orange outline-none"

const badgeBase = "absolute -top-5 left-1/2 -translate-x-1/2 bg-brand-orange text-white border-none w-10 h-10 flex items-center justify-center text-lg font-bold rounded-full shadow-lg ring-2 ring-white"

const iconCircle = "w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center text-white group-hover:bg-brand-orange/20 transition-colors duration-300"

const titleBase = "text-xl font-semibold text-white mb-2 group-hover:text-brand-orange transition-colors duration-300"

const descBase = "text-base text-white/80"

const ProcessSteps: React.FC = () => (
  <section className={cn("relative py-20", sectionBg)}>
    {bgPattern}
    <div className={cn("relative z-10 px-4", containerMax)}>
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Get started in just three simple steps and watch your business grow.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 md:gap-2 relative">
        {steps.map((step, i) => (
          <React.Fragment key={step.number}>
            <motion.a
              href={step.href}
              className={cn(cardBase, "w-full md:w-1/3 min-w-[260px] max-w-xs md:max-w-none focus:outline-none py-8 px-6")}
              tabIndex={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              custom={i}
              variants={cardVariants}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={badgeBase}>{step.number}</span>
              <div className={iconCircle}>{step.icon}</div>
              <h3 className={titleBase}>{step.title}</h3>
              <p className={descBase}>{step.description}</p>
            </motion.a>
            {i < steps.length - 1 && (
              <div className="hidden md:flex items-center justify-center px-1">
                <ArrowIcon />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  </section>
)

export default ProcessSteps