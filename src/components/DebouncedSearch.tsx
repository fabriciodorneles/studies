import axios from "axios"
import { useEffect, useState } from "react"

interface GitHubUser {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    type: string;
    score: number;
}

interface GitHubResponse {
    items: GitHubUser[];
    total_count: number;
}

const API_URL = 'https://api.github.com/search/users'

export const DebouncedSearch = () => {
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
        <div>
            <input
                type="text"
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
            />
            {loading && <p>Loading...</p>}
            <ul>
                {results.map((user) => (
                    <li key={user.id}>
                        <img 
                            src={user.avatar_url} 
                            alt={user.login} 
                            style={{ width: 50, borderRadius: '50%' }}
                        />
                        <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                            {user.login}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}