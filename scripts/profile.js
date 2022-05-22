function displayPost(post, view) {
  const postCurr = document.createElement("div");
  postCurr.setAttribute("id", post.id);
  postCurr.classList.add("entry-recently");
  view.appendChild(postCurr);

  const posterBox = document.createElement("div");
  posterBox.classList.add("recently-poster-box");
  postCurr.appendChild(posterBox);
  const poster = document.createElement("img");
  posterBox.appendChild(poster);

  const rightElem = document.createElement("div");
  rightElem.setAttribute("id", "recently-left");
  postCurr.appendChild(rightElem);

  const movieTitle = document.createElement("h1");
  rightElem.appendChild(movieTitle);
  const movieReview = document.createElement("p");
  rightElem.appendChild(movieReview);
  fetch("http://localhost/hw1/get_movie.php?id=" + post.type_id)
    .then(response => response.json())
    .then(json => {
      if (json.success) {
        poster.src = json.data.poster;
        movieTitle.textContent = json.data.title;
        movieReview.textContent = post.content;
      }
    });
}

function viewPosts(data, view) {
  for (let entry of data) {
    displayPost(entry, view);
  }
}

function getPics() {
  fetch("http://localhost/hw1/get_pics.php")
    .then(response => response.json())
    .then(json => {
      if (!json.cover_pic.empty) {
        const cover = document.getElementById("cover");
        const path = 'data:image/jpg;charset=utf8;base64,' + json.cover_pic.src;
        cover.style.backgroundImage = "url(" + path + ")";
      } else {
        // TODO: add button to add cover
      }
      if (!json.profile_pic.empty) {
        const profile_pic = document.getElementById("profile-pic");
        const img = document.createElement("img");
        img.src = 'data:image/jpg;charset=utf8;base64,' + json.profile_pic.src;
        profile_pic.appendChild(img);
      } else {
        // TODO: fallback icon and add button to add profile pic
      }
    });
}

function createSettings() {
  const tabRow = document.querySelector(".tab-row");
  const tabOption = document.createElement("div");
  tabOption.classList.add("tab-row-option");
  tabOption.setAttribute("data-view-type", "settings");
  tabOption.textContent = "Impostazioni";
  tabRow.appendChild(tabOption);

  const view = document.createElement("div");
  view.setAttribute("class", "view hidden");
  view.setAttribute("data-view-type", "settings");
  document.querySelector(".tab-view").appendChild(view);
}

function createRecently() {
  const view = document.createElement("div");
  view.setAttribute("class", "view hidden");
  view.setAttribute("data-view-type", "recently");
  document.querySelector(".tab-view").appendChild(view);

  fetch("http://localhost/hw1/recently.php")
    .then(response => response.json())
    .then(json => {
      if (json.success) {
        console.log(json.data);
        viewPosts(json.data, view);
      } else {
        const hintBox = document.createElement("p");
        hintBox.textContent = json.data;
        view.appendChild(hintBox);
      }
    });
}

function watchedFilms(view) {
  fetch("http://localhost/hw1/watched_films.php")
    .then(response => response.json())
    .then(json => {
      const watchedFilmsBox = document.createElement("div");
      watchedFilmsBox.setAttribute("class", "summary-box");
      view.appendChild(watchedFilmsBox);

      const titleBox = document.createElement("h1");
      titleBox.textContent = "Film visti";
      watchedFilmsBox.appendChild(titleBox);
      if (json.success) {
        const posterBox = document.createElement("div");
        posterBox.classList.add("movie-poster-box");
        watchedFilmsBox.appendChild(posterBox);

        for (let film of json.content) {
          fetch("http://localhost/hw1/get_movie_poster.php?movie_id=" + film.type_id)
            .then(response => response.json())
            .then(json => {
              const poster = document.createElement("img");
              poster.classList.add("movie-poster");
              poster.src =  json.src;
              posterBox.appendChild(poster);
            })
        }
      } else {
        const hintBox = document.createElement("p");
        hintBox.textContent = json.content;

        watchedFilmsBox.appendChild(hintBox);
        // const a = document.querySelector("div.summary-box.follower");
        // if (a) watchedFilmsBox.insertBefore(hintBox, a);
      }
    });
}

function follower(view) {
  fetch("http://localhost/hw1/follower.php")
    .then(response =>  response.json())
    .then(json => {
      const followerBox = document.createElement("div");
      followerBox.setAttribute("class", "summary-box follower");
      view.appendChild(followerBox);

      const titleBox = document.createElement("h1");
      titleBox.textContent = "Chi ti segue";
      followerBox.appendChild(titleBox);

      if (json.success) {
        const followers = json.content;

        const followerPicBox = document.createElement("div");
        followerPicBox.classList.add("follower-pic-box");
        followerBox.appendChild(followerPicBox);
        for (let follower of followers) {
          const pic = document.createElement("img");
          pic.classList.add("summary-profile-pic")
          pic.src = 'data:image/jpg;charset=utf8;base64,' + follower.profile_pic;
          followerPicBox.appendChild(pic);
        }
      } else {
        const hintBox = document.createElement("p");
        hintBox.textContent = json.content;
        followerBox.appendChild(hintBox, document.querySelector("div.summary-box.following"));
      }
    });
}

function following(view) {
  fetch("http://localhost/hw1/following.php")
    .then(response => response.json())
    .then(json => {
      const followingBox = document.createElement("div");
      followingBox.setAttribute("class", "summary-box following");
      view.appendChild(followingBox);

      const titleBox = document.createElement("h1");
      titleBox.textContent = "Seguiti";
      followingBox.appendChild(titleBox);

      if (json.success) {
        const followed = json.content;

        const followingPicBox = document.createElement("div");
        followingPicBox.classList.add("following-pic-box");
        followingBox.appendChild(followingPicBox);

        for (let following of followed) {
          const pic = document.createElement("img");
          pic.classList.add("summary-profile-pic")
          pic.src = 'data:image/jpg;charset=utf8;base64,' + following.profile_pic;
          followingPicBox.appendChild(pic);
        }
      } else {
        const hintBox = document.createElement("p");
        hintBox.textContent = json.content;
        followingBox.appendChild(hintBox);
      }
    });
}

function getUsername() {
  fetch("http://localhost/hw1/username.php")
    .then(response => response.json())
    .then(json => {
      if (json.success)
        document.getElementById("username").textContent = json.username;
    })
}
function createSummary() {
  const view = document.createElement("div");
  view.setAttribute("class", "view");
  view.setAttribute("data-view-type", "summary");
  document.querySelector(".tab-view").appendChild(view);

  watchedFilms(view);
  // readBooks();
  // listenedMusic();
  // wantlist(view);
  follower(view);
  following(view);
}

const views = document.querySelectorAll(".tab-row-option");
for (let view of views) {
  view.addEventListener('click', event => {
    const lastSelected = document.querySelector(".tab-row-option.selected");
    lastSelected.classList.remove("selected");
    document.querySelector("div.view[data-view-type="
      + lastSelected.dataset.viewType + "]").classList.add("hidden");

    event.currentTarget.classList.add("selected");
    document.querySelector("div.view[data-view-type=" +
        event.currentTarget.dataset.viewType + "]")
        .classList.remove("hidden");

    // console.log(event.currentTarget.dataset.viewType);
  });
}

const update = {
  'recently': _ => console.log("recently"),
  'summary': _ => console.log('summary'),
  'settings': _ => console.log('settings'),
};

const selected = document.querySelector(".tab-row-option.selected");

getPics();
getUsername();
createSummary();
createRecently();
fetch("http://localhost/hw1/is_logged_profile.php")
  .then(response => response.json())
  .then(json => {
    if (json.result)
      createSettings();
  })
