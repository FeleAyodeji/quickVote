export const getCategories = () => {
  const categories = JSON.parse(localStorage.getItem('categories')) || [];
  return categories;
};

export const getVotes = () => {
  const votes = JSON.parse(localStorage.getItem('votes')) || {};
  return votes;
};

export const setVotes = (votes) => {
  localStorage.setItem('votes', JSON.stringify(votes));
};
