function UserProfile() {
    const [user, setUser] = useState(null);
  
    // ❌ Mixes data fetching, analytics, and UI
    useEffect(() => {
      fetch('/api/user')
        .then(res => res.json())
        .then(setUser);
      trackPageView('user-profile');
    }, []);
  
    return ( // UI logic
      <div>
        <h1>User Profile</h1>
        {user ? (
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        ) : <p>Loading...</p>}
      </div>
    );
  }