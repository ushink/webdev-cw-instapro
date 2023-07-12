import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";

export function renderPostsPageComponent({ appEl, token }) {
  // TODO: реализовать рендер постов из api
  let postHtml = posts.map((post) => {
    return `<li class="post">
      <div class="post-header" data-user-id="${post.user.id}">
          <img src="${post.user.imageUrl}" class="post-header__user-image">
          <p class="post-header__user-name">${post.user.name}</p>
      </div>
      <div class="post-image-container">
      <img class="post-image" src="${post.imageUrl}">
      </div>
      <div class="post-likes">
      <div class="post-likes">
      <button data-id=${post.id} data-liked="${post.isLiked}" class="like-button">
      ${post.isLiked 
        ? `<img src="./assets/images/like-active.svg"></img>` 
        : `<img src="./assets/images/like-not-active.svg"></img>`}
      </button>
      <p class="post-likes-text">
      Нравится: <strong>
      ${post.likes.length === 0 ? 0 : post.likes.length === 1 ? post.likes[0].name
        : post.likes[(post.likes.length - 1)].name + ' и еще ' + (post.likes.length - 1)}         
      </strong>
    </p>
      </div>
      <p class="post-text">
        <span class="user-name">${post.user.name}</span>
        ${post.description}
      </p>
      <p class="post-date">
      ${new Date(post.createdAt)}
      </p>
      
      </li>`
  }).join("");

  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
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
}
