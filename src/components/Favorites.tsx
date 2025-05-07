import { Quote } from "../types/Quote";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import TwitterIcon from "@mui/icons-material/X";

type Props = {
  quotes: Quote[];
  onRemove: (index: number) => void;
};

export const Favorites = ({ quotes, onRemove }: Props) => {
  if (quotes.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-2 text-2xl font-bold text-gray-700 mb-4">
        <BookmarksIcon className="text-gray-500" />
        Saved Quotes
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quotes.map((q, idx) => (
          <div
            key={idx}
            className="relative p-4 pb-8 bg-white border border-gray-200 rounded-xl shadow-sm font-serif text-sm hover:shadow-md transition"
          >
            {/* ✅ Quote */}
            <p className="italic mb-2 text-gray-800">"{q.content}"</p>

            {/* ✅ Tags */}
            {q.tags && q.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-1">
                {q.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* ✅ Author */}
            <p className="text-right font-semibold text-gray-600">
              — {q.author}
            </p>

            {/* ✅ Button Row (bottom-left corner) */}
            <div className="absolute bottom-2 left-2 flex items-center gap-2">
              <button
                onClick={() => onRemove(idx)}
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
