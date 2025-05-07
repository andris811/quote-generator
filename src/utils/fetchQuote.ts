const BASE_URL = "https://quoteslate.vercel.app/api/quotes";

type QuoteApiResponse = {
  quote: string;
  author: string;
  tags?: string[];
  id: string | number;
};

export async function fetchRandomQuote(category?: string) {
  const url = category
    ? `${BASE_URL}/random?tags=${category}`
    : `${BASE_URL}/random`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch quote");

  const data: QuoteApiResponse = await res.json();

  return {
    content: data.quote,
    author: data.author,
    tags: data.tags,
    id: data.id,
  };
}
