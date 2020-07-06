import axios from "axios";

//https://bezkoder.com/react-hooks-crud-axios-api/

//api-hots-restful
export const ahr = axios.create({
  baseURL: "https://ahr.avantwing.com",
  headers: {
    "Content-type": "application/json"
  }
});
