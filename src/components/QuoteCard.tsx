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
    <div
      className="relative max-w-xl mx-auto p-6 font-serif text-center rounded-lg overflow-hidden"
      style={{
        backgroundImage: "url('/parchment.png')",
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
        backgroundColor: "#fef3c7",
        backgroundBlendMode: "multiply",
        boxShadow:
          "0 8px 20px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.6), inset 0 -2px 4px rgba(0,0,0,0.1)",
        border: "1px solid #e0c080",
      }}
    >
      <p className="text-xl italic mb-4 min-h-[100px]">
        "
        {showText && (
          <Typewriter
            words={[quote.content]}
            cursor
            typeSpeed={30}
          />
        )}
        "
      </p>
      <p className={`font-semibold mb-6 ${showText ? "opacity-100" : "opacity-0 transition-opacity duration-500"}`}>
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
