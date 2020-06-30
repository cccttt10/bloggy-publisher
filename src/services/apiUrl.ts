// eslint-disable-next-line import/no-mutable-exports
let API_URL = 'http://localhost:3300';
if (process.env.REACT_APP_ENV === 'prod') {
    API_URL = 'Https://bloggy-service.herokuapp.com';
}
export default API_URL;
