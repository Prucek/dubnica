import { useScrollReveal } from '../../hooks/useScrollReveal';

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Section({ title, children, className = '', id }: SectionProps) {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id={id}
      className={`py-12 ${className}`}
    >
      <div
        className={`max-w-6xl mx-auto px-4 transition-all duration-700 ${
          visible ? 'animate-fade-up' : 'opacity-0'
        }`}
      >
        {title && (
          <h2 className="text-2xl font-bold text-navy-600 dark:text-navy-200 mb-6">{title}</h2>
        )}
        {children}
      </div>
    </section>
  );
}
