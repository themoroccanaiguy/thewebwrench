import React from 'react';
import { Card, CardContent, CardHeader } from './card';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <Card className="marketing-feature-card group relative overflow-hidden bg-white/5 backdrop-blur-sm border-white/20 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1">
      <CardHeader className="pb-2">
        <div className="text-4xl mb-2">{icon}</div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-white/80 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};
