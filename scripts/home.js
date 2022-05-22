let offset = 0;

function updateLIke(target, action) {
  if (['add', 'remove'].includes(action)) {
    const postId = target.dataset.postId;
    fetch("http://localhost/hw1/" + action + "_like.php?post_id=" + postId)
      .then(response => response.json())
      .then(json => {
        if (!json.success) {
          alert("Qualcosa è andata storto")
        } else {
          const num = document.querySelector("div[data-post-id='"+ postId + "'] span");
          const currCount = parseInt(num.textContent);
          num.textContent = action === "add" ? currCount + 1 : currCount - 1;
        }
      });
  }
}

function decLike(target) {
  updateLIke(target, "remove");
}

function incLike(target) {
  updateLIke(target, "add");
}

function toggleLike(event) {
  let lastStatus = event.currentTarget.dataset.liked;
  // console.log("clicked " + clicked);
  // clicked = clicked === "false" ? "true" : "false";
  event.currentTarget.dataset.liked = event.currentTarget.dataset.liked === "false" ? "true" : "false";

  let img = document.querySelector("[data-post-id='"
    + event.currentTarget.dataset.postId + "'] img");

  img.src = lastStatus === "false" ?
    'figures/ciak_black.png' : 'figures/ciak_white.png';
  if (lastStatus === "false") {
    img.src = 'figures/ciak_black.png';
    incLike(event.currentTarget);
  } else {
    img.src ='figures/ciak_white.png';
    decLike(event.currentTarget);
  }
  // event.currentTarget.setAttribute("data-liked", !event.currentTarget.dataset.liked);
}

function displayPost(post, view) {
  const postCurr = document.createElement("div");
  postCurr.setAttribute("id", post.id);
  postCurr.classList.add("post");
  section.appendChild(postCurr);

  const postHeader = document.createElement("div");
  postHeader.setAttribute("class", "post-header");
  const postHeaderLeft = document.createElement("div");
  postHeaderLeft.setAttribute("class", "post-header-left");
  postHeader.appendChild(postHeaderLeft);

  const profilePicBox = document.createElement("div");
  const profilePic = document.createElement("img");
  profilePicBox.appendChild(profilePic);
  postHeaderLeft.appendChild(profilePicBox);
  fetch("http://localhost/hw1/get_pics.php?u=" + post.user)
    .then(response => response.json())
    .then(json => {
      if (!json.profile_pic.empty) {
        profilePicBox.classList.add("post-profile-pic-box")
        profilePic.setAttribute("id", "post-" + post.id + "-profile-pic");
        profilePic.setAttribute("class", "post-profile-pic");
        profilePic.src = 'data:image/jpg;charset=utf8;base64,' + json.profile_pic.src;
      }
    });

  const postProfileName = document.createElement("a");
  postHeaderLeft.appendChild(postProfileName);
  fetch("http://localhost/hw1/username.php?user_id=" + post.user)
    .then(response => response.json())
    .then(json => {
      if (json.success) {
        postProfileName.setAttribute("id", "post-" + post.id + "-profile-name");
        postProfileName.setAttribute("class", "post-profile-name");
        postProfileName.setAttribute("href", "http://localhost/hw1/profile.php?u=" + post.user);
        postProfileName.textContent = json.username;
      }
    });
  postCurr.appendChild(postHeader);

  const postText = document.createElement("p");
  postText.textContent = post.content;
  postCurr.appendChild(postText);

  const postPicBox = document.createElement("div");
  postPicBox.setAttribute("id", "post-pic-box");
  const postPic = document.createElement("img");
  postPicBox.appendChild(postPic);
  postCurr.appendChild(postPicBox);

  fetch("http://localhost/hw1/get_movie_poster.php?movie_id=" + post.type_id)
    .then(response => response.json())
    .then(json => {
      if (json.success) {
        postPic.src = json.src;
      }
    });

  const postFoot = document.createElement("div");
  postFoot.classList.add("post-foot");
  postCurr.appendChild(postFoot);

  const likeIconBox = document.createElement("div");
  likeIconBox.classList.add("icon-box");
  likeIconBox.setAttribute("data-post-id", post.id);
  likeIconBox.setAttribute("data-liked", false);

  likeIconBox.addEventListener('click', toggleLike);
  postFoot.appendChild(likeIconBox);
  const likeIcon = document.createElement("img");
  fetch("http://localhost/hw1/liked.php?post_id=" + post.id)
    .then(response => response.json())
    .then(json => {
      if (json.success) {
        likeIcon.src = json.like_pic;
        likeIconBox.dataset.liked = json.liked;
      }
    });
  likeIconBox.appendChild(likeIcon);

  const likeNum = document.createElement("span");
  likeIconBox.appendChild(likeNum);
  fetch("http://localhost/hw1/like_number.php?post_id=" + post.id)
    .then(response => response.json())
    .then(json => {
      if (json.success) {
        likeNum.textContent = json.num_like;
      }
    })

  const commentIconBox = document.createElement("div");
  commentIconBox.classList.add("icon-box");
  postFoot.appendChild(commentIconBox);

  const commentIcon = document.createElement("img");
  commentIcon.src = './figures/comment_black.png';
  commentIconBox.appendChild(commentIcon);
}

function viewPosts(data, view) {
  for (let post of data) {
    displayPost(post, view);
  }
}

function getPost() {
  fetch("http://localhost/hw1/get_posts.php/?offset=" + offset)
    .then(response => response.json())
    .then(json => {
      if (json.success) {
        viewPosts(json.content);
        offset += 10;
      } else {
        const mess = document.createElement("h1");
        mess.textContent = json.content;
        section.appendChild(mess);
      }
    })
}

function createMovieView(movieView) {
  const searchBox = document.createElement("div");
  movieView.appendChild(searchBox);

  const searchInput = document.createElement("input");
  searchInput.setAttribute("id", "input-movie");
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("placeholder", "Che film hai visto?");
  searchBox.appendChild(searchInput);

  const searchButton = document.createElement("button");
  searchButton.setAttribute("id", "search-film-button");
  searchButton.textContent = "Cerca";
  searchBox.appendChild(searchButton);

  const postText = document.createElement("input");
  postText.setAttribute("id", "post-text");
  postText.setAttribute("type", "text");
  postText.setAttribute("placeholder", "Cosa ti è piaciuto");
  movieView.appendChild(postText);

  const postButton = document.createElement("button");
  postButton.setAttribute("id", "post-button");
  postButton.textContent = "Invia";
  movieView.appendChild(postButton);
}

function createPeopleView(peopleView) {
  const searchBox = document.createElement("div");
  peopleView.appendChild(searchBox);

  const searchInput = document.createElement("input");
  searchInput.setAttribute("id", "input-people");
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("placeholder", "Cerca qualcuno");
  searchBox.appendChild(searchInput);

  const searchButton = document.createElement("button");
  searchButton.setAttribute("id", "seatrch-film-button");
  searchButton.textContent = "Cerca";
  searchBox.appendChild(searchButton);
}

// const profilePicHome = document.querySelector("profile-pic-home")
function displayHomeHeader() {
  const movieIconBox = document.querySelector(".tab-row-option[data-view-type='movie']");
  const movieIcon = document.createElement("img");
  movieIcon.src = "figures/movie.png";
  movieIconBox.appendChild(movieIcon);

  const headerRight = movieIconBox.parentNode.parentNode;
  const movieView = document.createElement("div");
  movieView.classList.add("view");
  movieView.setAttribute("data-view-type", 'movie');
  headerRight.appendChild(movieView);

  createMovieView(movieView);

  const peopleIconBox = document.querySelector("[data-view-type='people']");
  const peopleIcon = document.createElement("img");
  peopleIcon.src = "figures/people_black.png";
  peopleIconBox.appendChild(peopleIcon);

  const peopleView = document.createElement("div");
  peopleView.classList.add("view");
  peopleView.classList.add("hidden");
  peopleView.setAttribute("data-view-type", 'people');
  headerRight.appendChild(peopleView);

  createPeopleView(peopleView);


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
    });
  }

  fetch("http://localhost/hw1/get_pics.php")
    .then(response => response.json())
    .then(json => {
      if (!json.profile_pic.empty) {
        const profilePic = document.getElementById("profile-pic");
        const img = document.createElement("img");
        img.src = 'data:image/jpg;charset=utf8;base64,' + json.profile_pic.src;
        profilePic.appendChild(img);
      } else {
        // TODO: fallback icon and add button to add profile pic
      }
    });

  const postText = document.getElementById("post-text");
  const postButton = document.getElementById("post-button");
  postButton.addEventListener('click', _ => {
    // il type deve essere parametrico
    fetch("http://localhost/hw1/add_post.php?content=" + postText.value + "&type=movie&type_id=" + resultMovie.id)
  })

  let resultMovie;
  const inputMovie = document.getElementById("input-movie");
  const searchMovieButton = document.getElementById("search-film-button");
  searchMovieButton.addEventListener('click', _ => {
    // console.log(inputMovie.value);
    fetch("http://localhost/hw1/search_movie.php?movie=" + inputMovie.value)
      .then(response => response.json())
      .then(json => {
        // suppongo di predere il primo risultato
        resultMovie = json['results'][0];
      });
  });
}

const section = document.querySelector("section");
displayHomeHeader();
getPost();
