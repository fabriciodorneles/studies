import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { GitHubSearchContext } from "./GitHubSearchContext";
import { GitHubUser } from "../types";

interface GitHubResponse {
    items: GitHubUser[];
    total_count: number;
}

const API_URL = 'https://api.github.com/search/users'


export function GitHubSearchProvider({children} : {children: ReactNode}) {
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedTerm, setDebouncedTerm] =useState('')
    const [results, setResults] = useState<GitHubUser[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm)
        }, 500)

        return () => {
            clearTimeout(handler)
        }
    },[searchTerm])

    useEffect(() => {
        if(!debouncedTerm) return;

        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await axios.get<GitHubResponse>(`${API_URL}?q=${debouncedTerm}`)
                setResults(response.data.items)
            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData();
    }, [debouncedTerm])


    return (
        <GitHubSearchContext.Provider
            value={{
                searchTerm,
                setSearchTerm,
                debouncedTerm,
                results,
                loading
            }}
        >
            {children}
        </GitHubSearchContext.Provider>

    )
}

