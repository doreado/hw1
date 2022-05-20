let offset = 0;

function toggleLike(event) {
  let lastStatus = event.currentTarget.dataset.liked;
  // console.log("clicked " + clicked);
  // clicked = clicked === "false" ? "true" : "false";
event.currentTarget.dataset.liked = event.currentTarget.dataset.liked === "false" ? "true" : "false";

  let img = document.querySelector("[data-post-id='" 
    + event.currentTarget.dataset.postId + "'] img");

  img.src = lastStatus === "false" ? 
    'figures/ciak_black.png' : 'figures/ciak_white.png';
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
  fetch("http://localhost/hw1/get_pics.php?user_id=" + post.user)
    .then(response => response.json())
    .then(json => {
      if (!json.profile_pic.empty) {
        profilePicBox.classList.add("post-profile-pic-box")
        profilePic.setAttribute("id", "post-" + post.id + "-profile-pic");
        profilePic.setAttribute("class", "post-profile-pic");
        profilePic.src = 'data:image/jpg;charset=utf8;base64,' + json.profile_pic.src;
      }
    });

      if (json.success) {
        postProfileName.setAttribute("id", "post-" + post.id + "-profile-name");
        postProfileName.setAttribute("class", "post-profile-name");
        postProfileName.textContent = json.username;
      }
  }
  const postProfileName = document.createElement("div");

  postHeaderLeft.appendChild(postProfileName);
  fetch("http://localhost/hw1/username.php?user_id=" + post.user)
    .then(response => response.json())
    .then(json => {
      if (json.success) {
        postProfileName.setAttribute("id", "post-" + post.id + "-profile-name");
        postProfileName.setAttribute("class", "post-profile-name");
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
        console.log(json.content);
        viewPosts(json.content);
        offset += 10;
      } else {
        const mess = document.createElement("h1");
        mess.textContent = json.content;
        section.appendChild(mess);
      }
    })
}

// const profilePicHome = document.querySelector("profile-pic-home")
const section = document.querySelector("section");
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

const movieIcon = document.getElementById("movie-icon");
const moviePic = document.createElement("img");
moviePic.src = "figures/movie.png";
movieIcon.appendChild(moviePic);

moviePic.addEventListener('click', _ => {
  document.getElementById("modal-post").style.display = 'block';
  // fetch movie
  // display results
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

getPost();
