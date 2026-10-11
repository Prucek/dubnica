interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white dark:bg-navy-900 rounded-lg shadow-sm hover:shadow-md border border-gray-200 dark:border-navy-700 hover:border-gold-300 dark:hover:border-gold-600 p-6 transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
}
