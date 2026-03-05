import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import { TESTIMONIALS_DATA } from '../../constants';
import { fadeUp, staggerContainer } from '../../animations/variants';

interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
  avatar: string;
}

const TestimonialCard = ({
  content,
  author,
  role,
  avatar
}: TestimonialCardProps) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -5 }}
    className="card-premium flex flex-col justify-between"
  >
    <div>
      <div className="flex gap-1 mb-6 text-(--color-primary)">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-current" />
        ))}
      </div>
      <p className="text-(--color-text-bright) text-lg italic leading-relaxed mb-8">
        "{content}"
      </p>
    </div>

    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-(--color-primary-muted)">
        <img src={avatar} alt={author} className="w-full h-full object-cover" />
      </div>
      <div>
        <h4 className="font-bold text-(--color-text-white)">{author}</h4>
        <p className="text-xs text-(--color-primary) font-medium uppercase tracking-wider">
          {role}
        </p>
      </div>
    </div>
  </motion.div>
);

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-(--color-bg-card)">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-16">
          <div>
            <span className="section-label mb-2!">Wall of Love</span>
            <h2 className="text-4xl md:text-5xl font-black">
              What Our Customers Say
            </h2>
          </div>
          <div className="hidden md:flex gap-1 text-(--color-primary) pb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-current" />
            ))}
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {TESTIMONIALS_DATA.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
