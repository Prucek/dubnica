import { useTheme } from '../../context/ThemeContext';

export default function ChessPuzzle() {
  const { theme } = useTheme();
  const bg = theme === 'dark' ? 'dark' : 'light';

  return (
    <div className="flex justify-center">
      <iframe
        key={bg}
        src={`https://lichess.org/training/frame?theme=brown&bg=${bg}&difficulty=hardest`}
        width="400"
        height="444"
        className="border-0 rounded-lg shadow-sm max-w-full"
        title="Denná šachová úloha"
        loading="lazy"
      />
    </div>
  );
}
