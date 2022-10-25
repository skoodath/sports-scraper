let news = [];

const content = document.getElementById("content");

function displayData(data) {
  content.innerHTML = "";
  let ul = document.createElement("ul");
  ul.setAttribute("class", "article_container");
  data.forEach((d) => {
    let li = document.createElement("li");
    li.setAttribute("class", "article_card");
    li.innerHTML = `
      <a href=${d.url}>${d.title}</a>
      <p>${d.summary}</p>
    `;
    ul.appendChild(li);
  });
  content.appendChild(ul);
}

function getData() {
  fetch("http://localhost:3001/espn/soccer/uefa")
    .then((response) => response.json())
    .then((data) => {
      displayData(data);
    });
}

const getNews = document.querySelector(".app_link");

getNews.addEventListener("click", getData);
