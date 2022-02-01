import axios from "axios";

var env = process.env.NODE_ENV || 'development';
let url = ''
if(env === 'development'){
  url = `http://127.0.0.1:8001`
} else {
  url =  `https://projet.iut-tarbes.fr:8443`
}
export default axios.create({
  baseURL: url
});