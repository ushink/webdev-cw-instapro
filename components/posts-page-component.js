import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, userPostss, goToPage, putLikes, removeLikes, renderApp } from "../index.js";
import { listPost } from "../listPosts.js";
import { putLikePosts, removeLikePosts } from "../api.js";


function getLikePost() {

  const likesButton = document.querySelectorAll('.like-button');
  for (const like of likesButton) {
    like.addEventListener("click", (event) => {
      event.stopPropagation();
      const id = like.dataset.id;
      const liked = like.dataset.liked;

      if (liked == 'false') {
        putLikes(id);
      } else {
        removeLikes(id);
      }

    })
  }
};


export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api

  console.log("Актуальный список постов:", posts);

  const postHtml = posts.map((post) => listPost(post)).join('');

  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                ${postHtml}
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

  getLikePost();
}

export function renderUserPostComponent({appEl }) {
  console.log("Актуальный список постов:", userPostss);

  let userPostsHtml = userPostss.map((post) => listPost(post)).join('');

  let userName = userPostss[0]?.user.name;
  let userImage = userPostss[0]?.user.imageUrl;
  const appHtml = `
                <div class="page-container">
                  <div class="header-container"></div>
                  </div>
                  <div class="posts-user-header">
                      <img src="${userImage}" class="posts-user-header__user-image">
                      <p class="posts-user-header__user-name">${userName}</p>
                  </div>
                  <ul class="posts posts-user">
                    ${userPostsHtml}
                  </ul>
                `;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  getLikePost();
}

