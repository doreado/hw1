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
          const num = document.querySelector("div[data-post-id='" + postId + "'] span");
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
  event.currentTarget.dataset.liked = event.currentTarget.dataset.liked !== "true";

  let img = document.querySelector("[data-post-id='"
    + event.currentTarget.dataset.postId + "'] img");

  img.src = lastStatus === "false" ?
    'figures/ciak_dark.png' : 'figures/ciak_light.png';
  if (lastStatus === "false") {
    img.src = 'figures/ciak_dark.png';
    incLike(event.currentTarget);
  } else {
    img.src = 'figures/ciak_light.png';
    decLike(event.currentTarget);
  }
}

function getTime(timestamp) {
  old = new Date(timestamp);
  diff = Date.now() - old;
  old = old.toLocaleDateString();
  diff_s = diff / 1000;

  if (diff_s / 60 <1) {
    return parseInt(diff_s%60)+"s";
  } else if (diff_s / 60 < 60) {
    return parseInt(diff_s/60)+"m";
  } else if (diff_s / 3600 <24) {
    return parseInt(diff_s/3600) +"h";
  } else if (diff_s/86400 < 30) {
    return parseInt(diff_s/86400)+"gg";
  } else {
    return old;
  }
}

function getPost(post, ref) {
  const postCurr = document.createElement("div");
  postCurr.setAttribute("id", post.id);
  postCurr.setAttribute("data-post-user-id", post.user);
  postCurr.classList.add("post");

  return postCurr;
}

function displayPost(post, view, onTop) {
  const ref = onTop ? view.firstChild : view.lastChild ? view.lastChild.nextSibling : null;

  const newPost = getPost(post, ref);
  view.insertBefore(newPost, ref);

  const postHeader = document.createElement("div");
  postHeader.setAttribute("class", "post-header");
  const postHeaderLeft = document.createElement("div");
  postHeaderLeft.setAttribute("class", "post-header-left");
  postHeader.appendChild(postHeaderLeft);
  const time = document.createElement("p");
  time.textContent = getTime(post.time)
  postHeader.appendChild(time);

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
  newPost.appendChild(postHeader);

  const postText = document.createElement("p");
  postText.textContent = post.content;
  newPost.appendChild(postText);

  const postPicBox = document.createElement("div");
  postPicBox.setAttribute("id", "post-pic-box");
  const postPic = document.createElement("img");
  postPicBox.appendChild(postPic);
  newPost.appendChild(postPicBox);

  fetch("http://localhost/hw1/get_movie_poster.php?movie_id=" + post.type_id)
    .then(response => response.json())
    .then(json => {
      if (json.success) {
        postPic.src = json.src;
      }
    });

  const postFoot = document.createElement("div");
  postFoot.classList.add("post-foot");
  newPost.appendChild(postFoot);

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
}

function viewPosts(data, view) {
  for (let post of data) {
    displayPost(post, view, false);
  }
}

function getPosts() {
  fetch("http://localhost/hw1/get_posts.php/?offset=" + offset)
    .then(response => response.json())
    .then(json => {
      if (json.empty) {
        removeMoreResults();
        createPostFinished(json.msg);
      } else {
        viewPosts(json.content, document.querySelector("#home-posts-visible"));
        if (json.end) {
          removeMoreResults();
          createPostFinished(json.msg);
        } else {
          createMoreResults();
          offset += 10;
        }
      }
    });
}

function createMovieView(movieView) {
  const searchBox = document.createElement("div");
  searchBox.setAttribute("id", "search-movie-box");
  movieView.appendChild(searchBox);

  const searchInputBox = document.createElement("div");
  searchInputBox.setAttribute("id", "search-input-box");
  searchBox.appendChild(searchInputBox);
  const searchInput = document.createElement("input");
  searchInput.setAttribute("id", "input-movie");
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("placeholder", "Che film hai visto?");
  searchInputBox.appendChild(searchInput);

  const searchButton = document.createElement("button");
  searchButton.setAttribute("id", "search-film-button");
  searchButton.textContent = "Cerca";
  searchBox.appendChild(searchButton);
}

function createPeopleView(peopleView) {
  const searchBox = document.createElement("div");
  peopleView.appendChild(searchBox);

  const searchInput = document.createElement("input");
  searchInput.setAttribute("id", "input-people");
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("placeholder", "Cerca qualcuno");
  searchBox.appendChild(searchInput);

  const searchPeopleButton = document.createElement("button");
  searchPeopleButton.setAttribute("id", "search-people-button");
  searchPeopleButton.textContent = "Cerca";
  searchPeopleButton.addEventListener('click', onSearchPeopleButtonClick);

  searchBox.appendChild(searchPeopleButton);
}

function onResultBoxClick(event) {
  let movieId = event.currentTarget.dataset.movieId;

  document.querySelector(".tab-row-option[data-view-type='people']")
    .addEventListener('click', onTabRowOptionClick);

  section.removeChild(document.querySelector(".search-results-box"));
  document.getElementById("home-posts").classList.remove("hidden");

  const searchMovieBox = document.getElementById("search-movie-box");
  for (let child of searchMovieBox.childNodes) {
    child.classList.add("hidden");
  }

  const selectedMovie = document.createElement("p");
  selectedMovie.textContent = event.currentTarget.dataset.movieTitle;
  selectedMovie.setAttribute("movie-id", movieId);
  searchMovieBox.appendChild(selectedMovie);

  const xIconBox = document.createElement("div");
  xIconBox.classList.add("x-icon-box");
  searchMovieBox.appendChild(xIconBox);
  const xIcon = document.createElement("img");
  xIcon.classList.add("x-icon");
  xIcon.src = "figures/x_icon_dark.png";
  xIconBox.append(xIcon);
  xIconBox.addEventListener('click', _ => {
    xIconBox.parentNode.removeChild(xIconBox);
    selectedMovie.parentNode.removeChild(selectedMovie);
    document.getElementById("post-text").parentNode.removeChild(document.getElementById("post-text"));
    document.getElementById("post-button").parentNode.removeChild(document.getElementById("post-button"));
    for (let child of searchMovieBox.childNodes) {
      child.classList.remove("hidden");
    }
  });

  const view = document.querySelector(".view[data-view-type='movie']");
  const postText = document.createElement("input");
  postText.setAttribute("id", "post-text");
  postText.setAttribute("type", "text");
  postText.setAttribute("placeholder", "Cosa ti è piaciuto?");
  view.appendChild(postText);

  const postButton = document.createElement("button");
  postButton.setAttribute("id", "post-button");
  postButton.textContent = "Invia";
  postButton.addEventListener('click', _ => {
    // il type deve essere parametrico
    if (postText.value.length > 0) {
      fetch("http://localhost/hw1/add_post.php?content=" + postText.value + "&type=movie&type_id=" + movieId)
        .then(response => response.json())
        .then(json => {
          if (json.success) {
            offset++;
            displayPost(json.data, document.querySelector("#home-posts"), true);

            const searchMovieBox = document.getElementById('search-movie-box');
            const xIconBox = document.querySelector('.x-icon-box');
            xIconBox.parentNode.removeChild(xIconBox);
            const selectedMovie = document.querySelector('div#search-movie-box p');
            selectedMovie.parentNode.removeChild(selectedMovie);
            document.getElementById("post-text").parentNode.removeChild(document.getElementById("post-text"));
            document.getElementById("post-button").parentNode.removeChild(document.getElementById("post-button"));
            for (let child of searchMovieBox.childNodes) {
              child.classList.remove("hidden");
            }
          }
        })
    }
  });

  view.appendChild(postButton);
}

function onClickWatchlistButtonBox(event) {
  event.stopPropagation();

  const target = event.currentTarget;
  const movieId = target.parentNode.dataset.movieId;
  fetch("http://localhost/hw1/watchlist.php?movie_id=" + movieId)
    .then(response => response.json())
    .then(json => {
      if (json.success) {
        const img = target.childNodes[0];
        img.dataset.inWatchlist = json.in_watchlist;
        img.src = json.in_watchlist ?
          'figures/in_watchlist.png' : 'figures/not_in_watchlist.png';
      }
    })
}

function displaySearchResult(result) {
  const searchResultBox = document.querySelector(".search-results-box");
  const resultBox = document.createElement("div");
  resultBox.setAttribute("data-movie-id", result.id);
  resultBox.setAttribute("data-movie-title", result.title);
  resultBox.setAttribute("class", "result-box");
  resultBox.addEventListener('click', onResultBoxClick);
  searchResultBox.appendChild(resultBox);

  const resultBoxLeft = document.createElement('div');
  resultBoxLeft.setAttribute("class", "result-box-left");
  resultBox.appendChild(resultBoxLeft);
  const posterBox = document.createElement("div");
  posterBox.classList.add("poster-box");
  resultBoxLeft.appendChild(posterBox);
  const poster = document.createElement("img");
  poster.classList.add("poster");
  poster.src = result.poster;
  posterBox.appendChild(poster);
  const title = document.createElement("h1");
  title.textContent = result.title;
  resultBoxLeft.appendChild(title);

  if (result.watched) {
    const watched = document.createElement("p");
    watched.textContent = "Già visto";
    resultBox.appendChild(watched);
  } else {
    const watchlistButtonBox = document.createElement("div");
    watchlistButtonBox.setAttribute("class", "watchlist-button-box");
    watchlistButtonBox.addEventListener('click', onClickWatchlistButtonBox);
    resultBox.appendChild(watchlistButtonBox);
    const watchlistButton = document.createElement("img");
    watchlistButton.setAttribute("class", "watchlist-button");
    watchlistButton.setAttribute("data-in-watchlist", result.watchlist);
    watchlistButton.src = result.watchlist ? 'figures/in_watchlist.png' : 'figures/not_in_watchlist.png';
    watchlistButtonBox.appendChild(watchlistButton);
  }
}

function updateHome(followed, newFollowing) {
  if (newFollowing) {
    document.getElementById('home-posts-visible').innerHTML = '';
    createMoreResults();

    offset = 0;
    getPosts();
  } else {
    const postsFollowed = document.querySelectorAll(".post[data-post-user-id='" + followed + "']");
    for (let post of postsFollowed) {
      post.parentNode.removeChild(post);
    }
  }
}

function onFollowButton(event) {
  const clicked = event.currentTarget;
  const toFollow = clicked.dataset.followed !== 'true';
  clicked.setAttribute("data-followed", toFollow);
  clicked.src = toFollow ? 'figures/followed_dark.png' : 'figures/not_followed_dark.png';
  fetch("http://localhost/hw1/follow.php?followed_id="
    + clicked.dataset.followedId + "&to_follow=" + toFollow)
    .then(response => response.json())
    .then(json => {
      if (!json.success) {
        alert("Qualcosa è andato storto. Per favore ricarica la pagina");
      }
    })

  updateHome(clicked.dataset.followedId, toFollow);
}

function displayUserSearchResult(result) {
  const searchResultBox = document.querySelector(".search-results-box");
  const resultBox = document.createElement("div");
  resultBox.setAttribute("data-user-id", result.id);
  resultBox.setAttribute("data-username", result.username);
  resultBox.setAttribute("class", "users-result-box");
  searchResultBox.appendChild(resultBox);

  // aggiungi link per la pagina utente e il bottone per aggiunngere il profilo
  const posterBox = document.createElement("div");
  posterBox.classList.add("profile-pic-box");
  resultBox.appendChild(posterBox);
  const poster = document.createElement("img");
  poster.classList.add("profile-pic");
  poster.src = 'data:image/jpg;charset=utf8;base64,' + result.profile_pic;
  posterBox.appendChild(poster);

  const title = document.createElement("a");
  title.setAttribute('href', "http://localhost/hw1/profile.php?u=" + result.id);
  title.textContent = result.username;
  resultBox.appendChild(title);

  const followButtonBox = document.createElement("div");
  followButtonBox.setAttribute("class", "follow-button-box");
  resultBox.appendChild(followButtonBox);
  const followButton = document.createElement("img");
  followButton.setAttribute("class", "follow-button")
  followButtonBox.appendChild(followButton);
  followButton.src = result.followed ? 'figures/followed_dark.png' : 'figures/not_followed_dark.png';
  followButton.setAttribute("data-followed", result.followed);
  followButton.setAttribute("data-followed-id", result.id);
  followButton.addEventListener('click', onFollowButton);
}

function onTabRowOptionClick(event) {
  const lastSelected = document.querySelector(".tab-row-option.selected");
  lastSelected.classList.remove("selected");
  document.querySelector("div.view[data-view-type="
    + lastSelected.dataset.viewType + "]").classList.add("hidden");

  event.currentTarget.classList.add("selected");
  document.querySelector("div.view[data-view-type=" +
    event.currentTarget.dataset.viewType + "]")
    .classList.remove("hidden");
}

function displayTabRowOption() {
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
  peopleIcon.src = "figures/people_dark.png";
  peopleIconBox.appendChild(peopleIcon);

  const peopleView = document.createElement("div");
  peopleView.classList.add("view");
  peopleView.classList.add("hidden");
  peopleView.setAttribute("data-view-type", 'people');
  headerRight.appendChild(peopleView);

  createPeopleView(peopleView);

  const views = document.querySelectorAll(".tab-row-option");
  for (let view of views) {
    view.addEventListener('click', onTabRowOptionClick);
  }
}

function displayProfilePic() {
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
}

function createPostFinished(msg) {
  const mess = document.createElement("h1");
  const homePosts = document.getElementById('home-posts');
  mess.setAttribute('id', 'post-finished');
  homePosts.appendChild(mess);
  mess.textContent = msg;
}

function onBackIconClick(event) {
  section.removeChild(document.querySelector(".search-results-box"));
  document.getElementById("home-posts").classList.remove("hidden");
  updateHome();
}

function getSearchResultsBox(view) {
  const s = document.querySelector(".search-results-box");
  if (s) section.removeChild(s);
  const searchResultBox = document.createElement('div');
  searchResultBox.classList.add("search-results-box");
  view.appendChild(searchResultBox)

  return searchResultBox;
}

function createBackIcon(view) {
  const backIconBox = document.createElement('div');
  backIconBox.classList.add('back-icon-box');
  view.appendChild(backIconBox);
  const backIcon = document.createElement('img');
  backIcon.classList.add("back-icon");
  backIcon.src = 'figures/back_icon_dark.png';
  backIconBox.appendChild(backIcon);
  backIconBox.addEventListener('click', onBackIconClick);
}

function createSearchResultBox(section) {
  const searchResultBox =  getSearchResultsBox(section);
  createBackIcon(searchResultBox);
  document.getElementById("home-posts").classList.add("hidden");
}

function onSearchPeopleButtonClick() {
  const query = document.getElementById('input-people').value;
  if (query.length == 0) {
    return;
  }

  createSearchResultBox(section);

  fetch("http://localhost/hw1/search_users.php?u=" + query)
    .then(response => response.json())
    .then(json => {
      if (json.success) {
        for (let result of json.data) {
          displayUserSearchResult(result);
        }
      }
    })
}

function onSearchMovieButtonClick() {
  const query = document.getElementById('input-movie').value;
  if (query.length == 0) {
    return;
  }

  createSearchResultBox(section);

  fetch("http://localhost/hw1/search_movie.php?movie=" + query)
    .then(response => response.json())
    .then(json => {
      if (json.success) {
        for (let result of json.data) {
          displaySearchResult(result);
        }
      }
    });
}

function displayTabOption() {
  const inputMovie = document.getElementById("input-movie");
  const postText = document.getElementById("post-text");
  const searchMovieButton = document.getElementById("search-film-button");
  const searchMoviBox = document.createElement("div")
  searchMoviBox.setAttribute("id", "search-movie-box")
  searchMovieButton.addEventListener('click', onSearchMovieButtonClick);
}

function displayHomeHeader() {
  displayTabRowOption();
  displayProfilePic();
  displayTabOption();
}

function createMoreResults() {
  let more = document.getElementById('more-results');
  if (more) return;
  more = document.createElement("button");
  const homePosts = document.getElementById("home-posts");
  more.setAttribute('id', 'more-results');
  more.textContent = 'Post più vecchi';
  more.addEventListener('click', event => {
    const clicked = event.currentTarget;
    clicked.parentNode.removeChild(clicked);
    getPosts();
    /* createMoreResults(); */
  })
  homePosts.appendChild(more);
}

function removeMoreResults() {
  const moreResults = document.getElementById('more-results');
  if (moreResults)
    moreResults.parentNode.removeChild(moreResults);
}

const section = document.querySelector("section");

createNav('home');
displayHomeHeader();
getPosts();
