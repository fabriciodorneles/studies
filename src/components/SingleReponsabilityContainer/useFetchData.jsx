// 🟢 Custom hook (data fetching ONLY)
function useUserData() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(setUser)}, [])
  return user}