import { createContext } from "react";

export interface SearchContextValue {
  searchParams: string;
  setSearchParams: (searchParams: string) => void;
}

export const SearchContext = createContext<SearchContextValue | null>(null);
