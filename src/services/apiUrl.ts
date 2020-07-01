// eslint-disable-next-line import/no-mutable-exports
let API_URL = 'http://localhost:3300';
if (process.env.NODE_ENV === 'development') {
    API_URL = 'Https://bloggy-service.herokuapp.com';
}
// eslint-disable-next-line no-console
console.log(`API url is ${API_URL}`);
export default API_URL;
