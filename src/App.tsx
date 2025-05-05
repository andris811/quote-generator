import { useState } from "react";
import { fetchRandomQuote } from "./utils/fetchQuote";
import { Quote } from "./types/Quote";
import { QuoteCard } from "./components/QuoteCard";
import { Favorites } from "./components/Favorites";
import Footer from "./components/Footer";

function App() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [favorites, setFavorites] = useState<Quote[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [showStamp, setShowStamp] = useState(false);

  const loadQuote = async () => {
    const q = await fetchRandomQuote();
    setQuote(q);
  };

  const handleSave = () => {
    if (!quote) return;
    const updated = [...favorites, quote];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));

    setShowStamp(true);
    setTimeout(() => setShowStamp(false), 1500);
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
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow">
        {/* Hero section */}
        <div className="text-center pt-24 pb-10 px-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 font-sans">📜 InspiroQuote</h1>
          {!quote && (
            <button
              onClick={loadQuote}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded shadow"
            >
              Get me a quote!
            </button>
          )}
        </div>

        {/* Quote card with stamp */}
        <div className="flex justify-center min-h-[220px] transition-all duration-300 px-4">
          {quote && (
            <div className="w-full max-w-xl animate-fadeIn relative">
              {showStamp && (
                <div className="absolute bottom-11 right-4 z-10 text-red-600 font-extrabold text-3xl rotate-[12deg] opacity-80 stamp animate-stamp">
                  SAVED!
                </div>
              )}
              <QuoteCard
                quote={quote}
                onNewQuote={loadQuote}
                onSave={handleSave}
                onShare={handleShare}
              />
            </div>
          )}
        </div>

        {/* Saved quotes */}
        <div className="px-4 mt-10">
          <Favorites quotes={favorites} onRemove={handleRemove} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
