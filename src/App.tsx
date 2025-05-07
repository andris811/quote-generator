import { useState } from "react";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showStamp, setShowStamp] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadQuote = async () => {
    setLoading(true);
    try {
      const q = await fetchRandomQuote(selectedCategory || undefined);
      setQuote(q);
    } catch (err) {
      console.error("Failed to fetch quote:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!quote) return;

    const exists = favorites.some(
      (fav) => fav.content === quote.content && fav.author === quote.author
    );
    if (exists) return;

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
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
    window.open(tweetUrl, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow">
        {/* Hero */}
        <div className="text-center pt-24 pb-10 px-4">
          {/* Title with inline icon */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <FormatQuoteIcon fontSize="large" className="text-gray-500" />
            <h1 className="text-5xl font-extrabold text-slate-800 tracking-tight">
              QuoteLift
            </h1>
          </div>
          <p className="text-gray-500 text-sm mb-8">
            Random quotes to inspire your day
          </p>

          {/* Flex container for selector + button */}
          <div className="flex flex-col items-center gap-6">
            {/* Category Selector */}
            <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl px-6 py-4 shadow-md">
              <p className="text-gray-700 font-medium mb-2">
                Choose a category
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {["inspiration", "wisdom", "life", "love"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedCategory(tag)}
                    disabled={loading}
                    className={`px-4 py-1 rounded-full border text-sm font-medium capitalize transition ${
                      selectedCategory === tag
                        ? "bg-zinc-700 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-200"
                    } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {tag}
                  </button>
                ))}
                <button
                  onClick={() => setSelectedCategory(null)}
                  disabled={loading}
                  className={`px-4 py-1 rounded-full border text-sm font-medium transition bg-gray-300 text-black hover:bg-gray-400 ${
                    selectedCategory === null ? "ring-2 ring-gray-600" : ""
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Random
                </button>
              </div>
            </div>

            {/* Get Quote Button */}
            {!quote && (
              <button
                onClick={loadQuote}
                className="bg-zinc-700 hover:bg-zinc-800 text-white font-semibold py-2 px-6 rounded shadow transition"
              >
                Get me a quote!
              </button>
            )}
          </div>
        </div>

        {/* QuoteCard */}
        <div className="flex justify-center min-h-[220px] transition-all duration-300 px-4">
          {loading ? (
            <div className="w-full max-w-xl flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-opacity-60"></div>
            </div>
          ) : quote ? (
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
                isSaved={favorites.some(
                  (f) =>
                    f.content === quote.content && f.author === quote.author
                )}
              />
            </div>
          ) : null}
        </div>

        {/* Favorites */}
        <div className="px-4 mt-10">
          <Favorites quotes={favorites} onRemove={handleRemove} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
