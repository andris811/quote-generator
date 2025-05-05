import { Quote } from "../types/Quote";

type Props = {
  quotes: Quote[];
  onRemove: (index: number) => void;
};

export const Favorites = ({ quotes, onRemove }: Props) => {
  return (
    <div className="bg-white p-6 mt-6 rounded shadow max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Saved Quotes</h2>
      {quotes.length === 0 && <p className="text-gray-500">No saved quotes yet.</p>}
      <ul className="space-y-4">
        {quotes.map((q, i) => (
          <li key={i} className="border-b pb-2">
            <p className="italic">"{q.content}"</p>
            <p className="text-sm text-gray-600 mb-1">— {q.author}</p>
            <button
              className="text-sm text-red-500 hover:underline"
              onClick={() => onRemove(i)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
