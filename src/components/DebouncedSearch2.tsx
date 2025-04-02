import { useEffect, useState } from "react"

interface User {
    avatar_url: string;
    login: string;
    id: number;
    url: string;
    html_url: string;
}

const SEARCH_URL = 'https://api.github.com/search/users'

export const DebouncedSearch2 = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    const [debouncedSearch, setDebounceSearch] = useState<string>('')
    const [usersList, setUserList] = useState<User[]>([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceSearch(searchValue)
        }, 500)

        return () => clearTimeout(handler)

    }, [searchValue])

    useEffect(() => {
        if(!debouncedSearch) return
        const fetchUsers = async () => {
            setLoading(true)
            try {
                const results = await fetch(`${SEARCH_URL}?q=${debouncedSearch}`)
                const data = await results.json()
                setUserList(data.items)
                console.log(data.items[0])
            } catch (error) {
                console.log('error:', error)

            } finally {
                setLoading(false)
            }

        }

        fetchUsers()
    }, [debouncedSearch])

    return (
        <div style={{display:'flex', flexDirection:'column'}}>
            <input 
                type="text" 
                value={searchValue}
                onChange={(e)=> setSearchValue(e.target.value)}
            />
            <span>{searchValue}</span>
            <span>{debouncedSearch}</span>
            {loading && (
                <span>Loading...</span>
            )}
            <ul style={{listStyle:'none'}}>
                {usersList && (
                    usersList.map((item) => (
                        <li key={item.id}>
                            <img 
                                src={item.avatar_url}
                                style={{width:'50px', borderRadius:'50%', }}
                            />
                            <a 
                                href={item.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {item.login}
                            </a>
                            
                        </li>
                    ))
                )}
            </ul>
        </div>
    )

}