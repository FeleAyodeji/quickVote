import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResultsPage = () => {
  const navigate = useNavigate(); // Navigation hook
  const [categories, setCategories] = useState([]); // Categories state
  const [contestants, setContestants] = useState([]); // Contestants state
  const [votes, setVotes] = useState({}); // Votes state

  useEffect(() => {
    // Safely fetch data from localStorage
    const storedCategories =
      JSON.parse(localStorage.getItem('categories')) || [];
    const storedContestants =
      JSON.parse(localStorage.getItem('contestants')) || [];
    const storedVotes = JSON.parse(localStorage.getItem('votes')) || {};

    setCategories(storedCategories);
    setContestants(storedContestants);
    setVotes(storedVotes);
  }, []);

  // Function to calculate votes for each contestant
  const calculateVotes = () => {
    const voteCounts = {};

    // Initialize each contestant's vote count to 0
    contestants.forEach((contestant) => {
      voteCounts[contestant.id] = 0;
    });

    // Count votes
    Object.values(votes).forEach((votedContestantId) => {
      if (voteCounts[votedContestantId] !== undefined) {
        voteCounts[votedContestantId]++;
      }
    });

    return voteCounts;
  };

  const voteCounts = calculateVotes();

  const handleReturnHome = () => {
    navigate('/'); // Navigate to the homepage
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-xl p-6 sm:p-8 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          Voting Results
        </h1>

        {/* Display categories in a simple, clean manner */}
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category.id}>
              {/* Category Name */}
              <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
                {category.name}
              </h2>

              <ul className="space-y-4">
                {contestants
                  .filter((contestant) => contestant.categoryId === category.id) // Filter contestants by category
                  .map((contestant) => (
                    <li
                      key={contestant.id}
                      className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm transition duration-200 ease-in-out hover:shadow-lg"
                    >
                      <span className="text-xl text-gray-700">
                        {contestant.name}
                      </span>
                      <span className="text-lg font-semibold text-blue-500">
                        {voteCounts[contestant.id] || 0} Votes
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Return to Homepage Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleReturnHome}
            className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-600 transition duration-300"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
