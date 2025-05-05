import { Quote } from "../types/Quote";

type Props = {
  quote: Quote;
  onNewQuote: () => void;
  onSave: () => void;
  onShare: () => void;
};

export const QuoteCard = ({ quote, onNewQuote, onSave, onShare }: Props) => (
  <div className="bg-white p-6 rounded shadow text-center max-w-xl mx-auto">
    <p className="text-xl italic mb-4">"{quote.content}"</p>
    <p className="font-semibold mb-6">— {quote.author}</p>
    <div className="flex justify-center gap-4">
      <button
        onClick={onNewQuote}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        New Quote
      </button>
      <button
        onClick={onSave}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Save
      </button>
      <button
        onClick={onShare}
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Share to X
      </button>
    </div>
  </div>
);
