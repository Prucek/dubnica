import { ExternalLink as ExternalLinkIcon } from 'lucide-react';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function ExternalLink({ href, children, className = '' }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-navy-600 dark:text-navy-300 hover:text-gold-500 transition-colors ${className}`}
    >
      {children}
      <ExternalLinkIcon size={14} />
    </a>
  );
}
