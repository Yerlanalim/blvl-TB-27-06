'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Clock, ArrowLeft } from 'lucide-react';
import { t } from '@/utils/translations/ru';

interface ComingSoonProps {
  title?: string;
  subtitle?: string;
  description?: string;
  showBackButton?: boolean;
  backHref?: string;
  className?: string;
}

export default function ComingSoon({ 
  title,
  subtitle,
  description,
  showBackButton = true,
  backHref = '/dashboard',
  className = ''
}: ComingSoonProps) {
  return (
    <div className={`flex items-center justify-center min-h-screen bg-black ${className}`}>
      <div className="text-center max-w-md mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Animated Clock Icon */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="flex justify-center"
          >
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center">
              <Clock className="w-10 h-10 text-accent" />
            </div>
          </motion.div>

          {/* Content */}
          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {title || t('comingSoon.title')}
            </h1>
            <p className="text-lg text-gray-300">
              {subtitle || t('comingSoon.subtitle')}
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              {description || t('comingSoon.description')}
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4">
            {showBackButton && (
              <Link href={backHref}>
                <Button variant="accent" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  {t('comingSoon.backToLearning')}
                </Button>
              </Link>
            )}
            
            <p className="text-xs text-gray-500">
              {t('comingSoon.stayTuned')}
            </p>
          </div>

          {/* Decorative dots */}
          <div className="flex justify-center space-x-2 pt-6">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
                className="w-2 h-2 bg-accent rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 