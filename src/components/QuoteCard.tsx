import { useEffect, useState } from "react";
import { Quote } from "../types/Quote";
import { Typewriter } from "react-simple-typewriter";

type Props = {
  quote: Quote;
  onNewQuote: () => void;
  onSave: () => void;
  onShare: () => void;
};

export const QuoteCard = ({ quote, onNewQuote, onSave, onShare }: Props) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setShowText(false);
    const timer = setTimeout(() => setShowText(true), 100);
    return () => clearTimeout(timer);
  }, [quote]);

  return (
    <div className="relative max-w-xl mx-auto p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition text-center font-serif">
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

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={onNewQuote}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          New Quote
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Save
        </button>
        <button
          onClick={onShare}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Share to X
        </button>
      </div>
    </div>
  );
};
