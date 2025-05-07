// 🟢 UI component (rendering ONLY)
function UserProfileUI({ user }) {
    return (
      <div>
        <h1>User Profile</h1>
        {user ? (
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        ) : <p>Loading...</p>}
      </div>)}