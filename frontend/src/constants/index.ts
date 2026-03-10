export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
export const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_UPLOAD_PRESET = import.meta.env
  .VITE_CLOUDINARY_UPLOAD_PRESET;

export const INVOICE_PER_PAGE = 7;

import {
  BarChart3,
  Github,
  LinkedinIcon,
  Mail,
  MessageCircle,
  Sparkles,
  Twitter,
  Users,
  FileText,
  LayoutDashboard,
  PlusCircle,
  User
} from 'lucide-react';

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' }
];

export const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
  { icon: FileText, label: 'Invoices', to: '/invoices' },
  { icon: PlusCircle, label: 'Create Invoice', to: '/create-invoice' },
  { icon: User, label: 'Profile', to: '/profile' }
];

export const FEATURES_DATA = [
  {
    icon: Sparkles,
    title: 'AI Invoice Creation',
    description:
      'Paste any text, email, or receipt, and let our AI instantly generate a complete, professional invoice for you.'
  },
  {
    icon: BarChart3,
    title: 'AI-Powered Dashboard',
    description:
      'Get smart, actionable insights about your business finances, generated automatically by our AI analyst.'
  },
  {
    icon: Mail,
    title: 'Smart Reminders',
    description:
      'Automatically generate polite and effective payment reminder emails for invoices with a single click.'
  },
  {
    icon: Users,
    title: 'Easy Management',
    description:
      'Easily manage all your invoices, track payments, and send reminders for overdue payments.'
  }
];

export const TESTIMONIALS_DATA = [
  {
    content:
      "The AI Invoicer has saved me hours every week. It's incredibly intuitive and the designs it generates are far better than my old templates.",
    author: 'Jane Doe',
    role: 'Founder at Creative Studio',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop'
  },
  {
    content:
      "The dashboard gives me a level of clarity over my cash flow I never had before. It's not just invoicing; it's financial intelligence.",
    author: 'John Smith',
    role: 'CFO at TechInc',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop'
  },
  {
    content:
      'Smart reminders actually work. My late payments have dropped by 40% since joining. The system pays for itself every single month.',
    author: 'Peter Jones',
    role: 'Freelance Developer',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&auto=format&fit=crop'
  }
];

export const PRICING_DATA = [
  {
    name: 'Starter',
    price: '0',
    description: 'Perfect for individuals',
    features: [
      'Up to 10 Invoices/mo',
      'Basic AI Generation',
      'Smart Email Reminders',
      'Financial Insights'
    ]
  },
  {
    name: 'Professional',
    price: '19',
    description: 'Best for growing teams',
    isPopular: true,
    features: [
      'Unlimited Invoices',
      'Advanced AI Assistant',
      'Smart Email Reminders',
      'Financial Insights',
      'Advanced analytics'
    ]
  },
  {
    name: 'Enterprise',
    price: '49',
    description: 'Custom business solutions',
    features: [
      'White-label Portal',
      'Priority 24/7 Support',
      'Custom Integrations',
      'Advanced API Access'
    ]
  }
];

export const FAQ_DATA = [
  {
    question: 'How does the AI create invoices?',
    answer:
      'Paste any text, email, or receipt, and let our AI instantly generate a complete, professional invoice for you.'
  },
  {
    question: 'Is my financial data secure?',
    answer:
      "Absolutely. We use industry-standard encryption and security protocols to ensure your data and your clients' information are protected at all times."
  },
  {
    question: 'Can I export my data?',
    answer:
      'Yes, you can export your invoices, client data, and reports in multiple formats including PDF, CSV, and JSON.'
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes, all professional plans come with a 14-day free trial so you can experience the full power of our AI-driven invoicing system.'
  },
  {
    question: 'Still have questions?',
    answer: 'Contact us at   rabiulakand777@gmail.com'
  }
];

export const SOCIAL_LINKS = [
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/rabiul-akand' },
  { icon: Github, href: 'https://github.com/rabiul7772' },
  { icon: Twitter, href: 'https://x.com/rabiul_akand' },
  { icon: MessageCircle, href: 'https://wa.me/8801682087772' }
];

export const FOOTER_LINKS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' }
    ]
  }
];

export const billFromFields = [
  {
    name: 'businessName',
    label: 'Business Name',
    placeholder: 'Your Agency Name'
  },
  {
    name: 'email',
    label: 'Email Address',
    placeholder: 'billing@agency.com',
    type: 'email'
  },
  {
    name: 'address',
    label: 'Address',
    placeholder: '123 Creative St, Suite 100...',
    isTextarea: true
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number',
    placeholder: '+1 (555) 000-0000'
  }
];

export const billToFields = [
  {
    name: 'clientName',
    label: 'Client Name',
    placeholder: 'Client or Company Name'
  },
  {
    name: 'clientEmail',
    label: 'Client Email',
    placeholder: 'client@example.com',
    type: 'email'
  },
  {
    name: 'clientAddress',
    label: 'Client Address',
    placeholder: '456 Client Avenue...',
    isTextarea: true
  },
  {
    name: 'clientPhone',
    label: 'Client Phone',
    placeholder: '+1 (555) 123-4567'
  }
];

export const STATUS_OPTIONS = [
  { value: '', label: 'All Status' },
  { value: 'draft', label: 'Draft' },
  { value: 'sent', label: 'Sent' },
  { value: 'paid', label: 'Paid' },
  { value: 'overdue', label: 'Overdue' }
];
