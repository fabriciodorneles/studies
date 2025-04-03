import { useGitHubSearch } from "../context/useGitHubSearch";

export const GitHubUserList = () => {
    const {results, loading} = useGitHubSearch()

    return (
        <div>
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