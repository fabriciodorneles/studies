import { GitHubUserList } from "./GitHubUserList";
import { useGitHubSearch } from "../context/useGitHubSearch";

export const DebouncedSearch = () => {
    const {searchTerm, setSearchTerm} = useGitHubSearch();


    return (
        <div>
            <input
                type="text"
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
            />
            <GitHubUserList />
        </div>
    )
}