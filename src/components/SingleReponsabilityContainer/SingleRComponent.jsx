// Parent component composes responsibilities
function UserProfile() {
    const user = useUserData()
    // 🔄 Reusable across components
    useTrackPageView('user-profile')
    return <UserProfileUI user={user} />}