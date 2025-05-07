import { useEffect, useMemo, useState } from "react";
import { Quote } from "../types/Quote";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import TwitterIcon from "@mui/icons-material/X";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

type Props = {
  quotes: Quote[];
  onRemove: (id: string | number) => void;
};

export const Favorites = ({ quotes, onRemove }: Props) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [pinnedIds, setPinnedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("pinnedQuotes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("pinnedQuotes", JSON.stringify(pinnedIds));
  }, [pinnedIds]);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [quoteToDelete, setQuoteToDelete] = useState<Quote | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    quotes.forEach((q) => q.tags?.forEach((t) => tags.add(t)));
    return Array.from(tags);
  }, [quotes]);

  const sortedQuotes = useMemo(() => {
    const list = activeTag
      ? quotes.filter((q) => q.tags?.includes(activeTag))
      : quotes;

    return [...list].sort((a, b) => {
      const aPinned = pinnedIds.includes(String(a.id)) ? -1 : 1;
      const bPinned = pinnedIds.includes(String(b.id)) ? -1 : 1;
      return aPinned - bPinned;
    });
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
        {sortedQuotes.map((q) => {
          const isPinned = pinnedIds.includes(String(q.id));

          return (
            <div
              key={q.id}
              className={`relative p-4 pb-8 border border-gray-200 rounded-xl shadow-sm font-serif text-sm hover:shadow-md transition ${
                isPinned ? "bg-blue-50" : "bg-white"
              }`}
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

              {/* Button Rows: Left = Delete/Pin, Right = Share/Copy */}
              <div className="absolute bottom-2 left-2 flex items-center gap-2">
                <button
                  onClick={() => {
                    setQuoteToDelete(q);
                    setOpenDialog(true);
                  }}
                  className="text-gray-500 hover:text-red-800"
                  title="Remove"
                >
                  <DeleteIcon fontSize="small" />
                </button>

                <button
                  onClick={() => {
                    const isPinned = pinnedIds.includes(String(q.id));
                    setPinnedIds((prev) =>
                      isPinned
                        ? prev.filter((id) => id !== String(q.id))
                        : [...prev, String(q.id)]
                    );
                  }}
                  className="text-gray-500 hover:text-yellow-600"
                  title="Pin to Top"
                >
                  {pinnedIds.includes(String(q.id)) ? (
                    <PushPinIcon fontSize="small" />
                  ) : (
                    <PushPinOutlinedIcon fontSize="small" />
                  )}
                </button>
              </div>

              <div className="absolute bottom-2 right-2 flex items-center gap-2">
                <button
                  onClick={() => {
                    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=https://yourdomain.com&quote=${encodeURIComponent(
                      `${q.content} — ${q.author}`
                    )}`;
                    window.open(fbUrl, "_blank");
                  }}
                  className="text-gray-500 hover:text-blue-600"
                  title="Share to Facebook"
                >
                  <FacebookIcon fontSize="small" />
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
                    navigator.clipboard.writeText(
                      `"${q.content}" — ${q.author}`
                    );
                    setCopiedId(String(q.id));
                    setTimeout(() => setCopiedId(null), 1500);
                  }}
                  className="relative text-gray-500 hover:text-green-600"
                  title="Copy to Clipboard"
                >
                  <ContentCopyIcon fontSize="small" />
                  {copiedId === String(q.id) && (
                    <span className="absolute -top-6 right-0 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded shadow">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Delete Quote</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this quote?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (quoteToDelete) {
                onRemove(quoteToDelete.id);
                setQuoteToDelete(null);
              }
              setOpenDialog(false);
            }}
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
