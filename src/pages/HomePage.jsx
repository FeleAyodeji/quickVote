import { useEffect, useState } from 'react';
import { getCategories } from '../services/storage';
import { Link } from 'react-router-dom';

const LoginUser = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleLogin = () => {
    if (username.trim()) {
      let userIds = localStorage.getItem('userIds');
      let userDetails = { id: 1, username };
      if (!userIds) {
        // localStorage is empty.
        localStorage.setItem('userIds', JSON.stringify([userDetails]));
      } else {
        let users = JSON.parse(userIds);
        // when no user with the username
        let current = users.find((x) => x.username === username);
        if (!current) {
          userDetails = { id: users.length + 1, username };
          localStorage.setItem(
            'userIds',
            JSON.stringify([...users, userDetails]),
          );
        } else {
          // if currentUser already exist.
          userDetails = current;
        }
      }
      onLogin(userDetails);
      setIsSubmitted(true);
    }
  };
  //makes the enter key submit input
  const handleKeyDown = (e) => {
    if (e.key == 'Enter') return handleLogin();
  };

  if (isSubmitted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Please enter your name
        </h2>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Your name"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [categoryList, setCategoriesList] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
    const categories = getCategories();
    setCategoriesList(categories);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {!loggedInUser && <LoginUser onLogin={setLoggedInUser} />}

      {loggedInUser && (
        <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">
            Voting Categories
          </h1>
          <ul className="space-y-6">
            {categoryList.map((category) => (
              <li
                key={category.id}
                className="bg-gradient-to-r from-indigo-100 to-indigo-200 p-6 rounded-xl shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Link
                  to={`/category/${category.id}/${loggedInUser.id}`}
                  className="text-2xl font-semibold text-indigo-800 hover:text-indigo-600 transition-colors duration-300"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomePage;
