import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

let imageUrl = "";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {

  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="form">
        <h3 class="form-title">Добавить пост</h3>
          <div class="form-inputs">
            <div class="upload-image-container"></div>
            <label>
              Опишите фотографию:
              <textarea class="input textarea" rows="4"></textarea>
            </label>
            <button class="button" id="add-button">Добавить</button>
          </div>
      </div>
    </div>`;

    appEl.innerHTML = appHtml;

    // Добавить шапку
    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    // Загрузка/ замена картинки
    renderUploadImageComponent({
      element: appEl.querySelector(".upload-image-container"),
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
      },
    });
  
    // Обработчик клика кнопки "Добавить"
    document.getElementById("add-button").addEventListener("click", () => {

      if (!imageUrl) {
        alert ('Выберите фото');
        return;       
      };

      if (!(document.querySelector(".textarea").value)) {
        alert("Не заполнено описание фото")
        return;
      }

      onAddPostClick({
        description: document.querySelector(".textarea").value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
        imageUrl,
      });
    });
  };

  render();
}
