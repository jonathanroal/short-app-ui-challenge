import "./App.css";
import UrlInput from "./components/UrlInput.js";
import Header from "./components/Header";
import TopUrls from "./components/TopUrls.js";
import Grid from "@mui/material/Grid";
import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [topUrls, setTopUrls] = useState([]); // List of top 100 URLs

  // Axios setup
  const api = axios.create({
    baseURL: "http://localhost:3000/",
  });

  // Fetch top 100 URLs from index
  const fetchTop = () => {
    api.get("/").then((res) => {
      if ("urls" in res.data) setTopUrls(res.data.urls);
    });
  };

  // Fetch top 100 ar first render
  useEffect(() => {
    fetchTop();
  }, []);

  return (
    <div className="App">
      <Grid container style={{ backgroundColor: "#ebeff0" }}>
        <Header />
        <UrlInput api={api} fetchTop={fetchTop} />
        <TopUrls topUrls={topUrls} />
      </Grid>
    </div>
  );
};

export default App;
