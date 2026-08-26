import { PropsWithChildren, useState } from "react";
import { SearchContext } from "./search-context";

export const SearchProvider = ({ children }: PropsWithChildren) => {
  const [searchParams, setSearchParams] = useState("");

  return <SearchContext.Provider value={{ searchParams, setSearchParams }}>{children}</SearchContext.Provider>;
};
