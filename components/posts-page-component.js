import { USER_POSTS_PAGE, POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, postsUser, goToPage } from "../index.js";
import { listPost } from "../listPosts.js";
import { putLikePosts, removeLikePosts } from "../api.js";


  function getLikePost(token, page, data) {
    const likeButtons = document.querySelectorAll(".like-button");
  
    for (const likeButton of likeButtons) {
      likeButton.addEventListener("click", () => {
        let id = likeButton.dataset.postId;
  
        if (likeButton.dataset.liked == "false") {
          putLikePosts({
            id,
            token,
          })
            .then(() => {
              goToPage(page, data);
            })
            .catch((error) => {
              alert(error.message);
            });
        } else {
          removeLikePosts({
            id,
            token,
          })
            .then(() => {
              goToPage(page, data);
            })
            .catch((error) => {
              alert(error.message);
            });
        }
      });
    }
  }

export function renderPostsPageComponent({ appEl, token }) {
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
  const page = POSTS_PAGE;
  getLikePost(token, page, {});
}

export function renderUserPostComponent({appEl, token}) {
  console.log("Актуальный список постов user:", postsUser);

  let userPostsHtml = postsUser.map((post) => listPost(post)).join('');

  let userName = postsUser[0]?.user.name;
  let userImage = postsUser[0]?.user.imageUrl;
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

  const page = USER_POSTS_PAGE;

  let data = {
    userId: postsUser[0]?.user.id
  };
  
  getLikePost(token, page, data);

}

