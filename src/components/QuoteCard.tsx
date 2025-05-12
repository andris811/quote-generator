import { useEffect, useState } from "react";
import { Quote } from "../types/Quote";
import { Typewriter } from "react-simple-typewriter";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/X";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  IconButton,
  Menu,
  MenuItem,
  Tooltip
} from "@mui/material";

type Props = {
  quote: Quote;
  onSave: () => void;
  isSaved: boolean;
};


export const QuoteCard = ({ quote, onSave, isSaved }: Props) => {
  const [showText, setShowText] = useState(false);
  const [copied, setCopied] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    setShowText(false);
    const timer = setTimeout(() => setShowText(true), 100);
    return () => clearTimeout(timer);
  }, [quote]);

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const shareUrl = `https://yourdomain.com`;
  const quoteText = `"${quote.content}" — ${quote.author}`;

  return (
    <div className="relative max-w-xl mx-auto p-6 pt-12 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition text-center font-serif">
      {/* ❤️ Save button */}
      <button
        onClick={onSave}
        className="absolute top-3 right-4 text-red-500 hover:text-red-700 transition"
        title="Save to Favorites"
      >
        {isSaved ? (
          <FavoriteIcon fontSize="medium" />
        ) : (
          <FavoriteBorderIcon fontSize="medium" />
        )}
      </button>

      <p className="text-xl italic mb-4 min-h-[100px]">
        "
        {showText && (
          <Typewriter words={[quote.content]} cursor typeSpeed={30} />
        )}
        "
      </p>

      {quote.tags && quote.tags.length > 0 && (
        <div className="flex justify-center gap-2 mb-2 flex-wrap">
          {quote.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <p
        className={`font-semibold mb-6 ${
          showText ? "opacity-100" : "opacity-0 transition-opacity duration-500"
        }`}
      >
        — {quote.author}
      </p>

      {/* Button row (bottom right) */}
      <div className="flex justify-end gap-2 mt-4">
        {/* Copy to Clipboard */}
        <Tooltip title="Copy to Clipboard">
          <IconButton
            onClick={() => {
              navigator.clipboard.writeText(quoteText);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            size="small"
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        {/* Share Menu */}
        <Tooltip title="Share">
          <IconButton onClick={handleMenuOpen} size="small">
            <ShareIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem
            onClick={() => {
              const fb = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${encodeURIComponent(quoteText)}`;
              window.open(fb, "_blank");
              handleMenuClose();
            }}
          >
            <FacebookIcon fontSize="small" className="mr-2 text-blue-600" />
            Facebook
          </MenuItem>

          <MenuItem
            onClick={() => {
              const x = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                quoteText
              )}`;
              window.open(x, "_blank");
              handleMenuClose();
            }}
          >
            <TwitterIcon fontSize="small" style={{ marginRight: 8 }} />
            X
          </MenuItem>

          <MenuItem
            onClick={() => {
              const wa = `https://wa.me/?text=${encodeURIComponent(quoteText)}`;
              window.open(wa, "_blank");
              handleMenuClose();
            }}
          >
            <WhatsAppIcon fontSize="small" style={{ marginRight: 8 }} className="text-green-600"/>
            WhatsApp
          </MenuItem>
        </Menu>
      </div>

      {/* Copied feedback */}
      {copied && (
        <span className="absolute -top-6 right-4 text-xs text-green-600 font-medium bg-white px-2 py-0.5 rounded shadow">
          Copied!
        </span>
      )}
    </div>
  );
};
