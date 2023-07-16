import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export const listPost = (post) => {

    return `<li class="post">
      <div class="post-header" data-user-id="${post.user.id}">
          <img src="${post.user.imageUrl}" class="post-header__user-image">
          <p class="post-header__user-name">${post.user.name}</p>
      </div>
      <div class="post-image-container">
        <img class="post-image" src="${post.imageUrl}">
      </div>
      <div class="post-likes-box">
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
        ${formatDistanceToNow(new Date(post.createdAt), {addSuffix: true,  locale: ru })}
        </p>
      </div>
    </li>`;
  }