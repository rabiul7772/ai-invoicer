import { motion } from 'motion/react';
import { FEATURES_DATA } from '../../constants';
import { fadeUp, staggerContainer } from '../../animations/variants';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ scale: 1.04, y: -4 }}
    className="card-premium group"
  >
    <div className="w-12 h-12 rounded-xl bg-(--color-bg-accent) flex items-center justify-center text-(--color-primary) mb-6 group-hover:bg-(--color-primary) group-hover:text-(--color-bg-deep) transition-all duration-300 shadow-(--shadow-neon)">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-(--color-text-dim) text-sm leading-relaxed">
      {description}
    </p>
  </motion.div>
);

export const Features = () => {
  return (
    <section id="features" className="pt-12 pb-24 bg-(--color-bg-deep)">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="section-label">Core Capabilities</span>
          <h2 className="text-4xl md:text-5xl font-black">Powerful Features</h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {FEATURES_DATA.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
