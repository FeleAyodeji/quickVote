import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategories, getVotes, setVotes } from '../services/storage';
import VoteButton from '../components/VoteButton';

const getOrCreateUserId = () => {
  let userIds = localStorage.getItem('userIds');
  let currentLogginuser = '';
  if (userIds) {
    let users = JSON.parse(userIds);
    currentLogginuser = users[users.length - 1];
  }

  if (currentLogginuser == '') {
    alert('User not logged in');
    navigate('/');
  }

  return currentLogginuser.id;
};

const CategoryPage = () => {
  const { categoryId, userId } = useParams(); // get the  categoryId from URL
  const navigate = useNavigate(); // Navigation hook for next button and homepage
  const [category, setCategory] = useState(null);
  const [contestants, setContestants] = useState([]); // Contestants for the category
  const [votes, setVotesState] = useState({}); // User's votes
  const [categories, setCategories] = useState([]); // All categories

  //const userId = getOrCreateUserId(); // set the Unique user identifier

  useEffect(() => {
    // Load the categories
    // const current_userId = prompt("What's your name");

    const allCategories = getCategories();
    setCategories(allCategories);

    // Find and set the current category
    const foundCategory = allCategories.find((cat) => cat.id === categoryId);

    setCategory(foundCategory);

    // Fetch and filter contestants by categoryId
    const allContestants =
      JSON.parse(localStorage.getItem('contestants')) || []; // get all the contest
    const filteredContestants = allContestants.filter(
      (contestant) => contestant.categoryId === categoryId,
    );
    setContestants(filteredContestants);

    // Load votes for the current user
    const storedVotes = getVotes(userId);
    setVotesState(storedVotes);
  }, [categoryId, userId]);

  const handleVote = (contestantId) => {
    // Allow voting only if the user hasn't voted in this category yet
    if (!votes[categoryId]) {
      const updatedVotes = { ...votes, [categoryId]: contestantId }; // Update votes
      setVotes(userId, updatedVotes); // Save votes for the user
      setVotesState(updatedVotes);
    }
  };

  const handleNextCategory = () => {
    // Get the index of the current category
    const currentIndex = categories.findIndex((cat) => cat.id === categoryId);

    // Check if there is a next category
    if (currentIndex + 1 < categories.length) {
      const nextCategoryId = categories[currentIndex + 1].id;
      navigate(`/category/${nextCategoryId}/${userId}`); // Navigate to the next category
    } else {
      navigate('/results'); // Redirect to the results page
    }
  };

  // Loading state
  if (!category) {
    return <p className="text-center text-xl font-semibold">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        {category.name}
      </h1>

      {contestants.length > 0 ? (
        <ul className="space-y-6">
          {contestants.map((contestant) => (
            <li
              key={contestant.id}
              className="flex justify-between items-center p-5 bg-gray-50 hover:bg-gray-100 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              <span className="text-xl font-semibold text-gray-700">
                {contestant.name}
              </span>
              <VoteButton
                onClick={() => handleVote(contestant.id)}
                voted={votes[categoryId] === contestant.id}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-lg text-gray-600">
          No contestants available in this category.
        </p>
      )}

      {/* Next Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleNextCategory}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {categories.findIndex((cat) => cat.id === categoryId) + 1 <
          categories.length
            ? 'Next Category'
            : 'View Results'}
        </button>
      </div>
    </div>
  );
};

export default CategoryPage;
