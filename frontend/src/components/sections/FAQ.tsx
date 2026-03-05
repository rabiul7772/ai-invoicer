import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_DATA } from '../../constants';
import { fadeUp, staggerContainer } from '../../animations/variants';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      className="border border-(--color-border) rounded-md bg-(--color-bg-card) overflow-hidden transition-all duration-300"
    >
      <button
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-(--color-bg-accent) transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-(--color-text-white)">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-(--color-primary)" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="px-6 pb-5 text-(--color-text-dim) text-sm"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-(--color-bg-card)">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="section-label">Support</span>
          <h2 className="text-4xl md:text-5xl font-black">
            Frequently Asked Questions
          </h2>
        </div>

        <motion.div
          className="max-w-3xl mx-auto space-y-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {FAQ_DATA.map((item, index) => (
            <FAQItem key={index} {...item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
