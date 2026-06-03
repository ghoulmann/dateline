import '../styles/HiddenBanner.css';

export default function HiddenBanner({ hiddenCount, showHidden, onToggle }) {
  if (hiddenCount === 0) return null;

  return (
    <div className="hidden-banner">
      <span>{hiddenCount} card{hiddenCount > 1 ? 's' : ''} hidden</span>
      <button onClick={onToggle} className="banner-btn mono">
        {showHidden ? 'hide' : 'show'}
      </button>
    </div>
  );
}
