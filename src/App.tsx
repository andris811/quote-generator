import { useEffect, useState } from "react";
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
      setQuote(q); // ✅ Already includes ID from API
    } catch (err) {
      console.error("Failed to fetch quote:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load initial quote
  useEffect(() => {
    loadQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = () => {
    if (!quote) return;

    const exists = favorites.some((fav) => fav.id === quote.id);
    if (exists) return;

    const updated = [...favorites, quote];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setShowStamp(true);
    setTimeout(() => setShowStamp(false), 1500);
  };

  const handleRemove = (id: string | number) => {
    const updated = favorites.filter((q) => q.id !== id);
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
        {/* Header */}
        <div className="text-center pt-28 px-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <FormatQuoteIcon fontSize="large" className="text-gray-400" />
            <h1 className="text-5xl font-extrabold text-slate-800 tracking-tight">
              QuoteLift
            </h1>
          </div>
          <p className="text-gray-500 text-sm mb-14">
            Random quotes to inspire your day
          </p>
        </div>

        {/* QuoteCard */}
        <div className="flex justify-center transition-all duration-300 px-4 mb-16">
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
                onSave={handleSave}
                onShare={handleShare}
                isSaved={favorites.some((f) => f.id === quote.id)}
              />
            </div>
          ) : null}
        </div>

        {/* Category and Button Section */}
        <div className="flex justify-center mb-20 px-4">
          <div className="inline-block bg-white/70 backdrop-blur-md border border-gray-300 rounded-xl px-6 py-6 shadow-md max-w-3xl w-full">
            <p className="text-gray-700 font-medium mb-4 text-center">
              Choose a category
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {["inspiration", "motivation", "life", "love"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedCategory(tag)}
                  disabled={loading}
                  className={`px-4 py-1 rounded-full border text-sm font-medium capitalize transition ${
                    selectedCategory === tag
                      ? "bg-neutral-800 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-200"
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {tag}
                </button>
              ))}

              <select
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                disabled={loading}
                className="px-4 py-1 rounded-full border text-sm bg-white text-gray-700 hover:bg-gray-100 transition"
              >
                <option value="">More categories</option>
                {[
                  "wisdom",
                  "success",
                  "leadership",
                  "happiness",
                  "change",
                  "perseverance",
                  "mindfulness",
                  "growth",
                  "courage",
                  "gratitude",
                  "resilience",
                  "friendship",
                  "creativity",
                  "humility",
                  "forgiveness",
                  "patience",
                  "integrity",
                  "self-reflection",
                  "empathy",
                  "purpose",
                  "justice",
                  "harmony",
                  "knowledge",
                  "hope",
                  "anger",
                  "fear",
                  "general",
                ].map((tag) => (
                  <option key={tag} value={tag}>
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setSelectedCategory(null)}
                disabled={loading}
                className={`px-4 py-1 rounded-full border text-sm font-medium transition bg-gray-200 text-black hover:bg-gray-300 ${
                  selectedCategory === null ? "ring-2 ring-gray-500" : ""
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Random
              </button>
            </div>

            <div className="flex justify-center">
              <button
                onClick={loadQuote}
                disabled={loading}
                className="bg-zinc-700 hover:bg-zinc-800 text-white font-semibold py-2 px-6 rounded shadow transition disabled:opacity-50"
              >
                New Quote
              </button>
            </div>
          </div>
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
