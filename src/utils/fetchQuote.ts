import { Quote } from "../types/Quote";

export async function fetchRandomQuote(): Promise<Quote> {
  const res = await fetch("https://dummyjson.com/quotes/random");
  if (!res.ok) throw new Error("Failed to fetch quote");
  const data = await res.json();
  return {
    content: data.quote,
    author: data.author,
  };
}
