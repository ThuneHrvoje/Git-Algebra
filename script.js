const input = document.getElementById("input");
const loader = document.getElementById("loader");
const error = document.getElementById("error");
const showList = document.getElementById("showList");

input.addEventListener("input", () => searchShows());

function searchShows() {
  const show = input.value;
  if (!show) {
    showList.innerHTML = "";
  } else {
    showLoader();
    const request = new XMLHttpRequest();
    request.open("GET", `https://api.tvmaze.com/search/shows?q=${show}`);
    request.send();
    request.onload = () => {
      if (request.status === 200) {
        const responseData = JSON.parse(request.responseText);

        if (responseData.length) {
          showList.innerHTML = "";
          responseData.forEach((item) => {
            let li = document.createElement("li");
            li.innerText =
              item.show.name +
              "," +
              item.score +
              "," +
              item.show.genres.toString() +
              "," +
              item.show.summary;
            showList.appendChild(li);
          });

          error.style.display = "none";
          loader.style.display = "none";
          showList.style.display = "block";
        } else {
          showError();
        }
      } else {
        showError();
      }
    };
  }
}

function showLoader() {
  loader.style.display = "block";
  showList.style.display = "none";
  error.style.display = "none";
}

function showError() {
  loader.style.display = "none";
  showList.style.display = "none";
  error.style.display = "block";
}
