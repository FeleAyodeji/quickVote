import { useEffect, useState } from 'react';
import { getCategories } from '../services/storage';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [categories, setCategoriesList] = useState([]);

  useEffect(() => {
    const categories = getCategories();
    setCategoriesList(categories);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Voting Categories</h1>
      <ul className="space-y-4">
        {categories.map((category) => (
          <li
            key={category.id}
            className="bg-gray-100 p-4 rounded-md shadow-md"
          >
            <Link
              to={`/category/${category.id}`}
              className="text-xl font-semibold text-blue-600 hover:text-blue-800"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-center">
        <Link
          to="/results"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          View Results
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
