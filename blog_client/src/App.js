import { BrowserRouter, Route, Routes } from "react-router-dom";
import Routers from "./Routers";
import Login from "./pages/Login";
import "./App.css";

import PageNotFound from "./pages/PageNotFound";

import axios from "axios";
import { get_config } from "./utils";

import { baseApiUrl } from "./config/config";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    let refreshToken = localStorage.getItem("refresh");
    console.log(originalRequest,'00000000000000000')
    if (error.response.status === 401 && refreshToken) {
      if ("data" in originalRequest && originalRequest.data !== undefined) {
        let token = JSON.parse(originalRequest.data);
        if ("refreshToken" in token) {
          localStorage.clear();
          window.location.replace("/");
        }
      }
      const data = {
        refresh: refreshToken,
      };
      return axios
        .post(`${baseApiUrl}/auth/token/refresh`, data, get_config())
        .then((res) => {
          localStorage.setItem("access", res.data.access);
          error.config.headers.Authorization =
            "Bearer " + res.data.access;
          console.log("Access token refreshed!");
          return axios(originalRequest);
        });
    }
    return Promise.reject(error);
  }
);

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Routers />} exact />
          <Route path="/not-found" element={<PageNotFound />} exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
