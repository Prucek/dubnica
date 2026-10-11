import { useEffect, useRef } from 'react';

export default function FacebookFeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (!containerRef.current || loaded.current) return;
    loaded.current = true;

    const iframe = document.createElement('iframe');
    iframe.src = 'https://widgets.sociablekit.com/facebook-group-posts/iframe/25685226';
    iframe.style.width = '100%';
    iframe.style.minHeight = '500px';
    iframe.style.border = 'none';
    iframe.title = 'Facebook príspevky';
    iframe.setAttribute('loading', 'lazy');
    containerRef.current.appendChild(iframe);
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-white dark:bg-navy-900 rounded-lg border border-gray-200 dark:border-navy-700 overflow-hidden"
    />
  );
}
