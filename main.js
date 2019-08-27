'use strict'

const API_URL = 'https://swapi.co/api/films/';

const xr = new XMLHttpRequest();

xr.open('GET', API_URL);
xr.send();
xr.onload = function () {
  if (xr.status != 200) {
    console.log(`${xr.status}, ${xr.statusText}`);
  } else {
    const responseToJSON = JSON.parse(xr.response);
    console.log("TCL: xr.onload -> responseToJSON", responseToJSON)
    let films = [...responseToJSON.results];
    console.log("TCL: xr.onload -> films", films)
    const contentDiv = document.getElementById('content');
    films.forEach((film, index) => {

      let filmDiv = document.createElement('div');
      filmDiv.classList.add('filmCard')
      filmDiv.dataset.index = index;
      let filmTitle = document.createElement('p')
      filmTitle.classList.add('title');
      filmTitle.textContent = film.title;
      let filmEpizode = document.createElement('p');
      filmEpizode.textContent = film.episode_id;
      let filmOpening = document.createElement('p');
      filmOpening.textContent = film.opening_crawl;

      let getHeroListBtn = document.createElement('button');
      getHeroListBtn.classList.add('heroListBtn');
      getHeroListBtn.textContent = 'Список персонажей';

      getHeroListBtn.addEventListener('click', function (e) {
        let loaderDiv = document.createElement('div');
        loaderDiv.classList.add('loader');
        filmDiv.appendChild(loaderDiv);
        setTimeout(() => filmDiv.removeChild(loaderDiv), 2000);

        console.log(e.target.parentNode);

        let targetFilm = +e.target.parentNode.dataset.index;
        console.log("TCL: xr.onload -> targetFilm", targetFilm);

        let characterList = document.createElement('ul')
        characterList.classList.add('characterList')

        let charactersInFilm = [...films[targetFilm].characters];
        console.log("TCL: xr.onload -> charactersInFilm", charactersInFilm)
        charactersInFilm.forEach((character) => {
          let xd = new XMLHttpRequest();
          xd.open('GET', character);
          xd.send();
          xd.onload = function () {
            if (xd.status != 200) {
              console.log(`${xd.status}, ${xd.statusText}`);
            } else {
              const heroResult = JSON.parse(xd.response);
              console.log(character);
              console.log("hero", heroResult);
              let li = document.createElement('li');
              li.textContent = heroResult.name;
              characterList.appendChild(li);
            }
            filmDiv.appendChild(characterList);
            getHeroListBtn.style.display = 'none';
          }
        })
      })
      filmDiv.appendChild(filmTitle);
      filmDiv.appendChild(filmEpizode);
      filmDiv.appendChild(filmOpening);
      filmDiv.appendChild(getHeroListBtn);
      contentDiv.appendChild(filmDiv);
    });
  };
};
