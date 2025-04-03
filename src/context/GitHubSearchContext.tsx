import { createContext } from "react";
import { GitHubUser } from "../types";

interface GitHubSearchContextType {
    searchTerm: string
    setSearchTerm: (term: string) => void
    debouncedTerm: string
    results: GitHubUser[]
    loading: boolean
}

export const GitHubSearchContext = createContext<GitHubSearchContextType | undefined>(undefined);

