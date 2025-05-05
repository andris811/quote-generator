import { useState } from "react";
import { fetchRandomQuote } from "./utils/fetchQuote";
import { Quote } from "./types/Quote";
import { QuoteCard } from "./components/QuoteCard";
import { Favorites } from "./components/Favorites";

function App() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [favorites, setFavorites] = useState<Quote[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // 🧠 Called when "Get me a quote!" is clicked
  const loadQuote = async () => {
    const q = await fetchRandomQuote();
    setQuote(q);
  };

  const handleSave = () => {
    if (!quote) return;
    const updated = [...favorites, quote];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const handleRemove = (index: number) => {
    const updated = [...favorites];
    updated.splice(index, 1);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const handleShare = () => {
    if (!quote) return;
    const tweetText = `${quote.content} — ${quote.author}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
    window.open(tweetUrl, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gray-100 pt-10 px-4">
      {/* 🔥 HERO TITLE */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          📜 InspiroQuote
        </h1>

        {!quote && (
          <button
            onClick={loadQuote}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded shadow"
          >
            Get me a quote!
          </button>
        )}
      </div>

      {/* 🎯 Show quote card only if quote exists */}
      {quote && (
        <QuoteCard
          quote={quote}
          onNewQuote={loadQuote}
          onSave={handleSave}
          onShare={handleShare}
        />
      )}

      {/* 💾 Saved quotes always shown under */}
      <Favorites quotes={favorites} onRemove={handleRemove} />

      {/* ⚓️ Footer */}
      <footer className="mt-10 text-center text-sm text-gray-400 py-4">
        &copy; {new Date().getFullYear()} AVDev
      </footer>
    </div>
  );
}

export default App;
