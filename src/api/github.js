import axios from 'axios';

const monthNames = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December'
];

// Get the last three six month dynamically
// ex: [
//   { year: 2023, month: 4 },
//   { year: 2023, month: 3 },
//   { year: 2023, month: 2 } ...
// ]
function getLastSixMonths() {
  const currentDate = new Date();
  const currentYear = currentDate.getUTCFullYear();
  const currentMonth = currentDate.getUTCMonth();

  const months = [];
  for (let i = 0; i < 6; i++) {
    const year = currentMonth - i < 0 ? currentYear - 1 : currentYear;
    const month = currentMonth - i < 0 ? 12 + (currentMonth - i) : currentMonth - i;
    months.push({ year, month });
  }

  return months;
}

// Fetch commits for a given month
async function fetchCommits(year, month, repo) {
  const url = `https://api.github.com/repos/${repo}/commits`;
  const config = {
    params: {
      since: `${year}-${month + 1}-01T00:00:00Z`,
      until: `${year}-${month + 1}-31T23:59:59Z`,
    },
  };

  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.error(`Error fetching commits for ${year}-${month}:`, error.message);
    return [];
  }
}

// Fetch commits for the last six months
async function fetchCommitsForLastSixMonths(repo) {
  const months = getLastSixMonths();

  const commitsByUser = {};
  for (const { year, month } of months) {
    const commits = await fetchCommits(year, month, repo);
    for (const commit of commits) {
      const username = commit.author ? commit.author.login : commit.commit.author.name;
      commitsByUser[username] = commitsByUser[username] || {};
      commitsByUser[username][`${year}-${month + 1}`] = (commitsByUser[username][`${year}-${month + 1}`] || 0) + 1;
    }
  }

  return commitsByUser;
}

export {
  monthNames,
  getLastSixMonths,
  fetchCommitsForLastSixMonths
};
