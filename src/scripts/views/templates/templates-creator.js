import CONFIG from "../../globals/config";

const createRestoItemTemplate = (resto) => `
<div class="resto-item">
    <div class="resto-item_header">
    <img class="lazyload" id="resto-item_header_poster" alt="${resto.name}"
        data-src="${
          resto.pictureId
            ? CONFIG.BASE_IMAGE_URL + resto.pictureId
            : "https://restaurant-api.dicoding.dev/images/small/${resto.pictureId}"
        }">
    </div>
    <div class="resto-item_name">
        <h2>${resto.name}</h2>
    </div>
    <div class="resto-item_city">
        <h3>${resto.city} - ${generateStarRating(resto.rating)}</h3>
    </div>
    <div class="resto-item_description">
        <p>${resto.description}</p>
    </div>
    <a href="/#/detail/${resto.id}">View Details</a>
</div>
`;

const createLikeRestoButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestoButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const generateStarRating = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const totalStars = 5;

  const stars = Array.from({ length: totalStars }, (_, index) => {
    if (index < fullStars) return '<i class="fas fa-star"></i>';
    if (index === fullStars && halfStar)
      return '<i class="fas fa-star-half-alt"></i>';
    return '<i class="far fa-star"></i>';
  }).join("");

  return `<span class="rating-tooltip" aria-label="${rating} stars">${stars}</span>`;
};

export {
  createRestoItemTemplate,
  createLikeRestoButtonTemplate,
  createUnlikeRestoButtonTemplate,
  generateStarRating,
};
