const cache = {};

const formatDate = (item) => {
  if (item.is_current) return new Date();
  return new Date(item.end_date || item.date_to);
};

export const fetchData = (username) => {
  if (cache[username]) return Promise.resolve(cache[username]);

  return fetch(`https://api.codersrank.io/v2/users/${username}/projects`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const sortedProjects = data.projects || [];
      sortedProjects.sort((p1, p2) => {
        const p1endDate = formatDate(p1);
        const p2endDate = formatDate(p2);
        return p2endDate - p1endDate;
      });
      cache[username] = sortedProjects;
      return sortedProjects;
    })
    .catch((err) => {
      // eslint-disable-next-line
      console.error(err);
      return Promise.reject(err);
    });
};
