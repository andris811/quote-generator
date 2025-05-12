import { useEffect, useMemo, useState } from "react";
import { Quote } from "../types/Quote";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/X";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ShareIcon from "@mui/icons-material/Share";
import * as quoteService from "../services/quoteService";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [shareQuote, setShareQuote] = useState<Quote | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [quoteToDelete, setQuoteToDelete] = useState<Quote | null>(null);

  const open = Boolean(anchorEl);

  const handleShareClick = (
    event: React.MouseEvent<HTMLElement>,
    quote: Quote
  ) => {
    setAnchorEl(event.currentTarget);
    setShareQuote(quote);
  };

  const handleShareClose = () => {
    setAnchorEl(null);
    setShareQuote(null);
  };

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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-2 text-2xl font-bold text-gray-700 mb-4">
        <BookmarksIcon className="text-gray-500" />
        Saved Quotes
      </div>

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
              <p className="italic mb-2 text-gray-800">"{q.content}"</p>

              {Array.isArray(q.tags) && q.tags.length > 0 && (
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

              <p className="text-right font-semibold text-gray-600">
                — {q.author}
              </p>

              {/* Left: Delete & Pin */}
              <div className="absolute bottom-2 left-2 flex items-center gap-2">
                <Tooltip title="Delete">
                  <IconButton
                    onClick={() => {
                      setQuoteToDelete(q);
                      setOpenDialog(true);
                    }}
                    size="small"
                  >
                    <DeleteIcon
                      fontSize="small"
                      className="text-gray-500 hover:text-red-800"
                    />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Pin to Top">
                  <IconButton
                    onClick={async () => {
                      try {
                        const updatedQuote = await quoteService.togglePin(
                          String(q.id)
                        );
                        setPinnedIds((prev) =>
                          updatedQuote.pinned
                            ? [...prev, String(q.id)]
                            : prev.filter((id) => id !== String(q.id))
                        );
                      } catch {
                        const alreadyPinned = pinnedIds.includes(String(q.id));
                        setPinnedIds((prev) =>
                          alreadyPinned
                            ? prev.filter((id) => id !== String(q.id))
                            : [...prev, String(q.id)]
                        );
                      }
                    }}
                    size="small"
                  >
                    {isPinned ? (
                      <PushPinIcon
                        fontSize="small"
                        className="text-yellow-600"
                      />
                    ) : (
                      <PushPinOutlinedIcon
                        fontSize="small"
                        className="text-gray-500 hover:text-yellow-600"
                      />
                    )}
                  </IconButton>
                </Tooltip>
              </div>

              {/* Right: Copy & Share */}
              <div className="absolute bottom-2 right-2 flex items-center gap-2">
                <Tooltip title="Copy to Clipboard">
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `"${q.content}" — ${q.author}`
                      );
                      setCopiedId(String(q.id));
                      setTimeout(() => setCopiedId(null), 1500);
                    }}
                    size="small"
                    className="relative"
                  >
                    <ContentCopyIcon
                      fontSize="small"
                      className="text-gray-500 hover:text-green-600"
                    />
                    {copiedId === String(q.id) && (
                      <span className="absolute -top-6 right-0 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded shadow">
                        Copied!
                      </span>
                    )}
                  </IconButton>
                </Tooltip>

                <Tooltip title="Share">
                  <IconButton
                    onClick={(e) => handleShareClick(e, q)}
                    size="small"
                  >
                    <ShareIcon
                      fontSize="small"
                      className="text-gray-500 hover:text-blue-600"
                    />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          );
        })}
      </div>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleShareClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => {
            if (!shareQuote) return;
            const url = `https://www.facebook.com/sharer/sharer.php?u=https://yourdomain.com&quote=${encodeURIComponent(
              `${shareQuote.content} — ${shareQuote.author}`
            )}`;
            window.open(url, "_blank");
            handleShareClose();
          }}
        >
          <FacebookIcon fontSize="small" className="mr-2 text-blue-600" />
          Facebook
        </MenuItem>

        <MenuItem
          onClick={() => {
            if (!shareQuote) return;
            const text = `${shareQuote.content} — ${shareQuote.author}`;
            const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              text
            )}`;
            window.open(url, "_blank");
            handleShareClose();
          }}
        >
          <TwitterIcon fontSize="small" className="mr-2" />X
        </MenuItem>

        <MenuItem
          onClick={() => {
            if (!shareQuote) return;
            const text = `${shareQuote.content} — ${shareQuote.author}`;
            const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
              text
            )}`;
            window.open(url, "_blank");
            handleShareClose();
          }}
        >
          <WhatsAppIcon fontSize="small" className="mr-2 text-green-600" />
          WhatsApp
        </MenuItem>
      </Menu>

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
