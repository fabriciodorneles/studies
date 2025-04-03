import { useContext } from "react"
import { GitHubSearchContext } from "./GitHubSearchContext"

export function useGitHubSearch() {
    const context = useContext(GitHubSearchContext)
    if(context === undefined){
        throw new Error('useGitHubSearch must be used within a GitHubSearchProvider')
    }

    return context
}