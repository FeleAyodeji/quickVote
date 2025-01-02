import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getCategories,
  getContestants,
  getAllVotes,
} from '../services/storage';

const ResultsPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [contestants, setContestants] = useState([]);
  const [voteCounts, setVoteCounts] = useState({});

  useEffect(() => {
    // Fetch categories and contestants from the local storage
    const storedCategories = getCategories();
    const storedContestants = getContestants();
    setCategories(storedCategories);
    setContestants(storedContestants);

    // total votes
    const allVotes = getAllVotes();
    const aggregatedVotes = {};

    // Initialize counts for each contestant
    storedContestants.forEach((contestant) => {
      aggregatedVotes[contestant.id] = 0;
    });

    // Count votes for each contestant
    Object.values(allVotes).forEach((userVotes) => {
      Object.entries(userVotes).forEach(([categoryId, contestantId]) => {
        if (aggregatedVotes[contestantId] !== undefined) {
          aggregatedVotes[contestantId]++;
        }
      });
    });

    // Set the total vote counts
    setVoteCounts(aggregatedVotes);
  }, []);

  //this function returns the page back to the homepage

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center p-4 bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Voting Results
        </h1>

        <div className="space-y-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-gray-100 p-4 rounded-md shadow-md"
            >
              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                {category.name}
              </h2>
              <ul className="space-y-3">
                {contestants
                  .filter((contestant) => contestant.categoryId === category.id)
                  .map((contestant) => (
                    <li
                      key={contestant.id}
                      className="flex justify-between items-center p-3 bg-white rounded-md shadow-sm"
                    >
                      <span className="text-lg text-gray-700">
                        {contestant.name}
                      </span>
                      <span className="text-base font-semibold text-blue-500">
                        {voteCounts[contestant.id] || 0} Votes
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={handleReturnHome}
            className="bg-blue-500 text-white px-5 py-2 rounded-md text-lg hover:bg-blue-600 transition duration-200"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
