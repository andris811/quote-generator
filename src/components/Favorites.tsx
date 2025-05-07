import { useEffect, useMemo, useState } from "react";
import { Quote } from "../types/Quote";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import TwitterIcon from "@mui/icons-material/X";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";

type Props = {
  quotes: Quote[];
  onRemove: (index: number) => void;
};

export const Favorites = ({ quotes, onRemove }: Props) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [pinnedIds, setPinnedIds] = useState<number[]>(() => {
    const saved = localStorage.getItem("pinnedQuotes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("pinnedQuotes", JSON.stringify(pinnedIds));
  }, [pinnedIds]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    quotes.forEach((q) => q.tags?.forEach((t) => tags.add(t)));
    return Array.from(tags);
  }, [quotes]);

  const filteredQuotes = useMemo(() => {
    const list = activeTag
      ? quotes.filter((q) => q.tags?.includes(activeTag))
      : quotes;

    const withIds = list.map((q, i) => ({ ...q, _index: i }));
    return [
      ...withIds.filter((q) => pinnedIds.includes(q._index)),
      ...withIds.filter((q) => !pinnedIds.includes(q._index)),
    ];
  }, [quotes, activeTag, pinnedIds]);

  if (quotes.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 text-2xl font-bold text-gray-700 mb-4">
        <BookmarksIcon className="text-gray-500" />
        Saved Quotes
      </div>

      {/* Tag Filter Bar */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition border ${
                tag === activeTag
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Quote Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredQuotes.map((q, idx) => (
          <div
            key={idx}
            className="relative p-4 pb-8 bg-white border border-gray-200 rounded-xl shadow-sm font-serif text-sm hover:shadow-md transition"
          >
            {/* Quote */}
            <p className="italic mb-2 text-gray-800">"{q.content}"</p>

            {/* Tags */}
            {q.tags && q.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-1">
                {q.tags.map((tag, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setActiveTag(activeTag === tag ? null : tag)
                    }
                    className={`text-xs px-2 py-0.5 rounded-full font-medium transition ${
                      activeTag === tag
                        ? "bg-blue-700 text-white"
                        : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}

            {/* Author */}
            <p className="text-right font-semibold text-gray-600">
              — {q.author}
            </p>

            {/* Button Row */}
            <div className="absolute bottom-2 left-2 flex items-center gap-2">
              <button
                onClick={() => onRemove(q._index)}
                className="text-gray-500 hover:text-red-800"
                title="Remove"
              >
                <DeleteIcon fontSize="small" />
              </button>
              <button
                onClick={() => {
                  const tweetText = `${q.content} — ${q.author}`;
                  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    tweetText
                  )}`;
                  window.open(tweetUrl, "_blank");
                }}
                className="text-gray-500 hover:text-blue-700"
                title="Share to X"
              >
                <TwitterIcon fontSize="small" />
              </button>
              <button
                onClick={() => {
                  const alreadyPinned = pinnedIds.includes(q._index);
                  setPinnedIds((prev) =>
                    alreadyPinned
                      ? prev.filter((id) => id !== q._index)
                      : [...prev, q._index]
                  );
                }}
                className="text-gray-500 hover:text-yellow-600"
                title="Pin to Top"
              >
                {pinnedIds.includes(q._index) ? (
                  <PushPinIcon fontSize="small" />
                ) : (
                  <PushPinOutlinedIcon fontSize="small" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
