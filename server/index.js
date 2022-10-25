const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001;

const baseUrl = "https://www.espn.in";

let urlInfo = new URL(baseUrl);

const url = "https://www.espn.in/football/league/_/name/uefa.champions";

let articles = [];

app.get("/espn/soccer/uefa", (req, res) => {
  axios.get(url).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    $(".item-info-wrap", html).each(function () {
      const title = $(this).find("h1").find("a").text();
      const summary = $(this).find("p").text();
      const url = $(this).find("a").attr("href");
      articles.push({
        title,
        summary,
        url: baseUrl + url,
      });
    });
  });
  res.json(articles);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
