const VoteButton = ({ onClick, voted }) => {
  return (
    <button
      onClick={onClick}
      disabled={voted} //disble button if already voted.
      className={`px-4 py-2 rounded-md font-semibold ${
        voted
          ? 'bg-gray-400 text-white cursor-not-allowed'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      {voted ? 'You Voted' : 'Vote'}
    </button>
  );
};

export default VoteButton;
