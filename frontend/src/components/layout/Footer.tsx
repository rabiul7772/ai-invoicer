import { FileText } from 'lucide-react';
import { FOOTER_LINKS, SOCIAL_LINKS } from '../../constants';

const SocialLink = ({ icon: Icon, href }: { icon: any; href: string }) => {
  const isExternal = href.startsWith('http');
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="w-10 h-10 rounded-full border border-(--color-border) flex items-center justify-center text-(--color-text-dim) hover:border-(--color-primary) hover:text-(--color-primary) transition-all"
    >
      <Icon className="w-4 h-4" />
    </a>
  );
};

const FooterColumn = ({
  title,
  links
}: {
  title: string;
  links: { label: string; href: string }[];
}) => {
  return (
    <div>
      <h4 className="text-(--color-primary) text-xs font-black uppercase tracking-widest mb-6">
        {title}
      </h4>
      <ul className="space-y-4">
        {links.map((link, i) => (
          <li key={i}>
            <a
              href={link.href}
              className="text-(--color-text-dim) hover:text-(--color-primary) text-sm transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className="pt-24 pb-12 bg-(--color-bg-deep) border-t border-(--color-border)">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-linear-to-br from-(--color-primary) to-(--color-primary-hover) rounded-lg flex items-center justify-center shadow-(--shadow-neon)">
                <FileText className="w-4 h-4 text-(--color-bg-deep)" />
              </div>
              <span className="text-xl font-black text-(--color-text-white)">
                AI Invoicer
              </span>
            </div>
            <p className="text-(--color-text-dim) text-sm max-w-sm mb-8">
              Next-generation billing for modern businesses. Empowered by
              artificial intelligence.
            </p>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social, i) => (
                <SocialLink key={i} {...social} />
              ))}
            </div>
          </div>

          {FOOTER_LINKS.map((col, i) => (
            <FooterColumn key={i} title={col.title} links={col.links} />
          ))}
        </div>

        <div className="pt-8 border-t border-(--color-border) flex flex-col items-center justify-center gap-3">
          <p className="text-(--color-text-muted) text-[12px] uppercase font-bold tracking-widest text-center">
            © {new Date().getFullYear()} AI Invoice Inc. All rights reserved.
          </p>
          <p className="text-(--color-text-muted) text-[12px] text-center">
            Built with ❤️ by{'   '}
            <a
              href="https://rabiul-akand-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-(--color-primary) font-semibold hover:underline transition-colors underline"
            >
              Rabiul Akand
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
