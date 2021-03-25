import route from "./route";

// метод запроса базы данных
const getFetchStats = () => {
  return fetch(route.URL)
    .then(arr => arr)
    .catch(error => console.error(error));
};
export default getFetchStats;
