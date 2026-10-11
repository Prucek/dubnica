import { useEffect, useRef } from 'react';

export default function FacebookWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (!containerRef.current || loaded.current) return;
    loaded.current = true;

    const embed = document.createElement('div');
    embed.className = 'sk-ww-facebook-group-posts';
    embed.setAttribute('data-embed-id', '25685226');
    containerRef.current.appendChild(embed);

    const script = document.createElement('script');
    script.src = 'https://widgets.sociablekit.com/facebook-group-posts/widget.js';
    script.defer = true;
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-white dark:bg-navy-900 rounded-lg border border-gray-200 dark:border-navy-700 overflow-hidden min-h-[400px]"
    />
  );
}
