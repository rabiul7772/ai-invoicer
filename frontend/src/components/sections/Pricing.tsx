import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import { PRICING_DATA } from '../../constants';
import {
  fadeUp,
  staggerContainer,
  buttonSpring
} from '../../animations/variants';

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const PricingCard = ({
  name,
  price,
  description,
  features,
  isPopular
}: PricingCardProps) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ scale: isPopular ? 1.05 : 1.02 }}
    className={`card-premium relative transition-all duration-500 overflow-hidden ${isPopular ? 'border-(--color-primary) scale-105 shadow-(--shadow-neon)' : ''}`}
  >
    {isPopular && (
      <motion.div
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-6 right-[-32px] bg-(--color-primary) text-(--color-bg-deep) text-[10px] font-black py-1 px-10 rotate-45 shadow-sm"
      >
        MOST POPULAR
      </motion.div>
    )}

    <div className="mb-8">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-(--color-text-dim) text-sm mb-6">{description}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-black text-(--color-text-white)">
          ${price}
        </span>
        <span className="text-(--color-text-dim) text-sm">/mo</span>
      </div>
    </div>

    <ul className="space-y-4 mb-10">
      {features.map((feature, i) => (
        <li
          key={i}
          className="flex items-center gap-3 text-sm text-(--color-text-dim)"
        >
          <div className="w-5 h-5 rounded-full bg-(--color-primary-muted) flex items-center justify-center text-(--color-primary) shrink-0">
            <Check className="w-3 h-3" />
          </div>
          {feature}
        </li>
      ))}
    </ul>

    <motion.button
      whileHover="hover"
      whileTap="tap"
      variants={buttonSpring}
      className={
        isPopular ? 'btn-neon-primary w-full' : 'btn-neon-outline w-full'
      }
    >
      {isPopular ? 'Start Trial' : 'Get Started'}
    </motion.button>
  </motion.div>
);

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-(--color-bg-deep)">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="section-label">Investment Plans</span>
          <h2 className="text-4xl md:text-5xl font-black">
            Simple, Fair Pricing
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {PRICING_DATA.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
