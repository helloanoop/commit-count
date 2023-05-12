import React from 'react';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import CommitCounts from 'components/CommitCounts';
import useStore from '../hooks/useStore';
import {
  monthNames,
  getLastSixMonths,
  fetchCommitsForLastSixMonths
} from '../api/github';

export default function Home() {
  const [state, dispatch] = useStore();

  const {
    repo,
    table,
    loading,
    error,
  } = state;

  const handleSetRepo = (repo) => {
    dispatch({ type: 'SET_REPO', payload: repo });
  };

  const handleSearchRepo = async (repo) => {
    dispatch({ type: 'SEARCH' });
    try {
      const commitsByUser = await fetchCommitsForLastSixMonths(repo);
      const months = getLastSixMonths().map(({ year, month }) => `${year}-${month + 1}`);
      const monthLabels = getLastSixMonths().map(({ year, month }) => {
        return `${monthNames[month]} ${year}`;
      });

      let table = [];
      table.push(['Name', ...monthLabels]);

      // Add the data rows
      Object.entries(commitsByUser).forEach(([username, commits]) => {
        const row = [username, ...months.map(month => commits[month] || 0)];
        table.push(row);
      });

      dispatch({ type: 'SEARCH_SUCCESS', payload: table });
    } catch (error) {
      dispatch({ type: 'SEARCH_ERROR', payload: error.message });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        repo={repo}
        onSetRepo={handleSetRepo}
        onSearchRepo= {handleSearchRepo}
      />
      <main className="flex-grow">
        <CommitCounts
          repo={repo}
          table={table}
          loading={loading}
          error={error}
        />
      </main>
      <Footer />
    </div>
  );
};
