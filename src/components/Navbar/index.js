import React from 'react';

const Navbar = ({
  repo,
  onSetRepo,
  onSearchRepo
}) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-lg font-bold">commit count</div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="owner/repo"
            className="px-4 py-2 rounded-l-md focus:outline-none h-8"
            defaultValue={repo}
            onChange={(e) => onSetRepo(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSearchRepo(repo);
              }
            }}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md h-8"
            onClick={() => onSearchRepo(repo)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
