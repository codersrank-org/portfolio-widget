const cache = {};

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
      cache[username] = data.projects || [];
      return data.projects || [];
    })
    .catch((err) => {
      // eslint-disable-next-line
      console.error(err);
      return Promise.reject(err);
    });
};
