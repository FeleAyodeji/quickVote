// Initialize Data in LocalStorage
const initializeData = () => {
  const categories = [
    { id: '1', name: 'Best Actor' },
    { id: '2', name: 'Best Actress' },
    { id: '3', name: 'Best Director' },
  ];

  const contestants = [
    // Best Actor Category
    { id: 'a1', name: 'Contestant A', categoryId: '1', votes: 0 },
    { id: 'a2', name: 'Contestant B', categoryId: '1', votes: 0 },

    // Best Actress Category
    { id: 'b1', name: 'Contestant C', categoryId: '2', votes: 0 },
    { id: 'b2', name: 'Contestant D', categoryId: '2', votes: 0 },

    // Best Director Category
    { id: 'c1', name: 'Contestant E', categoryId: '3', votes: 0 },
    { id: 'c2', name: 'Contestant F', categoryId: '3', votes: 0 },
  ];

  const votes = {}; // Initially empty

  if (!localStorage.getItem('categories')) {
    localStorage.setItem('categories', JSON.stringify(categories));
  }

  if (!localStorage.getItem('contestants')) {
    localStorage.setItem('contestants', JSON.stringify(contestants));
  }

  if (!localStorage.getItem('votes')) {
    localStorage.setItem('votes', JSON.stringify(votes));
  }
};

// Fetch Categories
export const getCategories = () => {
  return JSON.parse(localStorage.getItem('categories')) || [];
};

// Fetch Contestants
export const getContestants = () => {
  return JSON.parse(localStorage.getItem('contestants')) || [];
};

// Fetch Votes for a Specific User
export const getVotes = (userId) => {
  const allVotes = JSON.parse(localStorage.getItem('votes')) || {};
  return allVotes[userId] || {};
};

// Fetch all votes from localStorage
export const getAllVotes = () => {
  return JSON.parse(localStorage.getItem('votes')) || {};
};

// Store Votes for a Specific User
export const setVotes = (userId, userVotes) => {
  const allVotes = JSON.parse(localStorage.getItem('votes')) || {};
  allVotes[userId] = userVotes;
  localStorage.setItem('votes', JSON.stringify(allVotes));
};

// Initialize the storage when the application starts
initializeData();
