import React, { useState } from 'react';

const GitHubCard = ({ user }) => {
  return (
    <div className="max-w-md mx-auto mt-4 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:w-48" src={user.avatar_url} alt={`${user.login} avatar`} />
        </div>
        <div className="p-6">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{user.login}</div>
          <a href={user.html_url} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{user.name}</a>
          <div className="mt-2">
            <p className="text-gray-600">Public Repos: {user.public_repos}</p>
            <p className="text-gray-600">Public Gists: {user.public_gists}</p>
            <p className="text-gray-600">Profile Created: {new Date(user.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const App = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-semibold mb-6 text-center">GitHub Card App</h1>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Enter GitHub username"
            className="mr-2 p-2 border rounded w-1/2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={fetchUserData}
          >
            <button>ja</button>
            Fetch
          </button>
        </div>
        {userData && <GitHubCard user={userData} />}
      </div>
    </div>
  );
}

export default App;
