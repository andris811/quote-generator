import { useEffect, useState } from "react";
import { Quote } from "../types/Quote";
import { Typewriter } from "react-simple-typewriter";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TwitterIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

type Props = {
  quote: Quote;
  onSave: () => void;
  onShare: () => void;
  isSaved: boolean;
};


export const QuoteCard = ({ quote, onSave, onShare, isSaved }: Props) => {
  const [showText, setShowText] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setShowText(false);
    const timer = setTimeout(() => setShowText(true), 100);
    return () => clearTimeout(timer);
  }, [quote]);

  return (
    <div className="relative max-w-xl mx-auto p-6 pt-12 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition text-center font-serif">
      {/* ❤️ Save button (moved to safe area) */}
      <button
        onClick={onSave}
        className="absolute top-3 right-4 text-red-500 hover:text-red-700 transition"
        title="Save to Favorites"
      >
        {isSaved ? (
          <FavoriteIcon fontSize="medium" />
        ) : (
          <FavoriteBorderIcon fontSize="medium" />
        )}
      </button>

      <p className="text-xl italic mb-4 min-h-[100px]">
        "
        {showText && (
          <Typewriter words={[quote.content]} cursor typeSpeed={30} />
        )}
        "
      </p>

      {quote.tags && quote.tags.length > 0 && (
        <div className="flex justify-center gap-2 mb-2 flex-wrap">
          {quote.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <p
        className={`font-semibold mb-6 ${
          showText ? "opacity-100" : "opacity-0 transition-opacity duration-500"
        }`}
      >
        — {quote.author}
      </p>

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => {
            const url = `https://www.facebook.com/sharer/sharer.php?u=https://yourdomain.com&quote=${encodeURIComponent(
              quote.content + " — " + quote.author
            )}`;
            window.open(url, "_blank");
          }}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-200 transition"
        >
          <FacebookIcon fontSize="small" />
          Share
        </button>

        <button
          onClick={onShare}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-200 transition"
        >
          <TwitterIcon fontSize="small" />
          Share
        </button>

        <button
          onClick={() => {
            const text = `"${quote.content}" — ${quote.author}`;
            navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-200 transition relative"
        >
          <ContentCopyIcon fontSize="small" />
          Copy
          {/* ✅ Feedback label */}
          {copied && (
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-green-600 font-medium">
              Copied!
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
