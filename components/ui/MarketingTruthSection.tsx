import React from 'react';
import { Button } from './button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface MarketingTruthSectionProps {
  /** Text for the badge at the top */
  badgeText?: string;
  /** Main heading text */
  heading: string;
  /** Problem statement text */
  problemStatement: string;
  /** The main truth reveal text */
  truthReveal: string;
  /** Solution description */
  solution: string;
  /** CTA button text */
  ctaText?: string;
  /** CTA button link */
  ctaHref?: string;
  /** Array of feature items */
  features: FeatureItem[];
  /** Optional class name for custom styling */
  className?: string;
}

const FeatureCard: React.FC<FeatureItem> = ({ icon, title, description }) => (
  <div className="group relative overflow-hidden p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-orange-100">
    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-orange-500 mb-4 transition-colors duration-300 group-hover:bg-orange-50">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export const MarketingTruthSection: React.FC<MarketingTruthSectionProps> = ({
  badgeText = "Industry Secret",
  heading,
  problemStatement,
  truthReveal,
  solution,
  ctaText = "Get Started Today",
  ctaHref = "#contact",
  features,
  className,
}) => {
  return (
    <section className={cn("relative overflow-hidden py-16 md:py-24", className)}>
      {/* Subtle background highlight */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-8 transition-all duration-300 hover:shadow-sm">
            <Sparkles className="h-4 w-4 text-orange-500" />
            {badgeText}
          </div>
          
          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            {heading}
          </h2>
          
          {/* Problem Statement */}
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            {problemStatement}
          </p>
          
          {/* Truth Reveal */}
          <div className="relative my-12 p-6 md:p-8 rounded-xl border-l-4 border-orange-500 max-w-3xl mx-auto transform transition-all duration-500 hover:scale-[1.01] border">
            <div className="relative z-10 text-lg md:text-xl font-medium text-gray-800">
              {truthReveal}
            </div>
            <div className="absolute -right-4 -top-4 h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
              <span className="text-sm font-bold">!</span>
            </div>
          </div>
          
          {/* Solution */}
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            {solution}
          </p>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
          
          {/* CTA Button */}
          <div className="mt-12">
            <Button
              asChild
              size="lg"
              className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <a href={ctaHref}>
                {ctaText}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
