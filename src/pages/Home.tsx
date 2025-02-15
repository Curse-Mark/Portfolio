import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-[calc(100vh-4rem)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50 via-brand-50/50 to-white" />

      <motion.div 
        style={{ y, opacity }}
        className="relative pt-20 pb-40"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Text Without Handwritten Effect */}
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome to My Portfolio
          </h1>

          {/* Place ScrawledText BELOW the text */}
          <div className="mt-4">
            <p className="text-lg text-gray-600">
              I specialize in commerce and accounting. Explore my projects and achievements.
            </p>
          </div>

          {/* Call to Action Button */}
          <div className="mt-6">
            <Button asChild>
              <Link to="/about">
                Learn More <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
