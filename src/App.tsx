import { useEffect, useState } from "react";
import { fetchRandomQuote } from "./utils/fetchQuote";
import { Quote } from "./types/Quote";
import { QuoteCard } from "./components/QuoteCard";
import { Favorites } from "./components/Favorites";

function App() {
  const [quote, setQuote] = useState<Quote>({ content: "", author: "" });

  const loadQuote = async () => {
    try {
      const q = await fetchRandomQuote();
      console.log("Fetched quote:", q); // 🔍 DEBUG
      setQuote(q);
    } catch (err) {
      console.error("Quote fetch error:", err);
    }
  };

  const [favorites, setFavorites] = useState<Quote[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    loadQuote();
  }, []);

  const handleSave = () => {
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
    const tweetText = `${quote.content} — ${quote.author}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
    window.open(tweetUrl, "_blank");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <QuoteCard
        quote={quote}
        onNewQuote={loadQuote}
        onSave={handleSave}
        onShare={handleShare}
      />
      <Favorites quotes={favorites} onRemove={handleRemove} />
    </div>
  );
}

export default App;
