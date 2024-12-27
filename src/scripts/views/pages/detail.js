import CONFIG from "../../globals/config";
import LikeButtonPresenter from "../../utils/like-button-presenter";
import FavoriteRestoIdb from "../../data/favorite-resto-idb";

const Detail = {
  async render() {
    return `
      <div id="loading" class="loading">Loading...</div>
      <div id="restaurant-detail" class="restaurant-detail"></div>
      <div id="likeButtonContainer"></div>
      <div id="reviewFormContainer" class="review-form-container">
        <h3>Add Your Review</h3>
        <form id="reviewForm">
          <input type="text" id="reviewName" placeholder="Your Name" required>
          <textarea id="reviewText" placeholder="Your Review" required></textarea>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    `;
  },

  async afterRender() {
    const id = getRestaurantIdFromURL();

    try {
      const restaurant = await fetchRestaurantDetail(id);
      hideElement(".hero");
      populateRestaurantDetail(restaurant);

      LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector("#likeButtonContainer"),
        favoriteRestaurants: FavoriteRestoIdb,
        restaurant: getRestaurantInfo(restaurant),
      });

      initReviewForm(restaurant.id);
      hideLoading();
    } catch (error) {
      console.error("Error fetching restaurant detail:", error);
      showErrorMessage();
    }
  },
};

function getRestaurantIdFromURL() {
  const url = window.location.hash;
  return url.split("/")[2];
}

async function fetchRestaurantDetail(id) {
  const response = await fetch(`${CONFIG.BASE_URL}/detail/${id}`);
  const responseJson = await response.json();
  return responseJson.restaurant;
}

function getRestaurantInfo(restaurant) {
  const { id, name, description, pictureId, rating, city } = restaurant;
  return { id, name, description, pictureId, rating, city };
}

function hideElement(selector) {
  const element = document.querySelector(selector);
  if (element) element.style.display = "none";
}

function populateRestaurantDetail(restaurant) {
  const detailContainer = document.querySelector("#restaurant-detail");
  detailContainer.innerHTML = `
    <h2 class="restaurant-name">${restaurant.name}</h2>
    <img class="lazyload" id="restaurant-image" data-src="${
      CONFIG.BASE_IMAGE_URL + restaurant.pictureId
    }" alt="${restaurant.name}">
    <div class="restaurant-info">
      ${renderInfo("🏙️", restaurant.city, "restaurant-city")}
      ${renderInfo("🏠", restaurant.address, "restaurant-address")}
      ${renderInfo("⭐", restaurant.rating, "restaurant-rating")}
    </div>
    <div class="restaurant-description">
      <h3>Description</h3>
      <p>${restaurant.description}</p>
    </div>
    <div class="restaurant-menus">
      <h3>Menus</h3>
      <div class="menu-list">
        ${renderMenu("Foods", restaurant.menus.foods)}
        ${renderMenu("Drinks", restaurant.menus.drinks)}
      </div>
    </div>
    <div class="restaurant-reviews">
      <h3>Customer Reviews</h3>
      <ul>
        ${renderReviews(restaurant.customerReviews)}
      </ul>
    </div>
  `;
}

function renderInfo(icon, value, className) {
  return `<p class="${className}">${icon} ${value}</p>`;
}

function renderMenu(title, items) {
  return `
    <div class="${title.toLowerCase()}">
      <h4>${title}</h4>
      <ul>${items.map((item) => `<li>${item.name}</li>`).join("")}</ul>
    </div>
  `;
}

function renderReviews(reviews) {
  return reviews
    .map(
      (review) => `
      <li>
        <p class="review-name">${review.name}</p>
        <p class="review-date">${review.date}</p>
        <p class="review-text">${review.review}</p>
      </li>
    `
    )
    .join("");
}

function initReviewForm(restaurantId) {
  const reviewForm = document.getElementById("reviewForm");
  reviewForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("reviewName").value;
    const review = document.getElementById("reviewText").value;

    try {
      const responseJson = await submitReview(restaurantId, name, review);
      if (!responseJson.error) {
        alert("Thank you! Your review has been added.");
        updateReviews(responseJson.customerReviews);
        reviewForm.reset();
      } else {
        alert("Failed to add review. Please try again.");
      }
    } catch (error) {
      console.error("Error posting review:", error);
      alert(
        "Failed to add review. Please check your connection and try again."
      );
    }
  });
}

async function submitReview(restaurantId, name, review) {
  const response = await fetch(`${CONFIG.BASE_URL}/review`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: restaurantId, name, review }),
  });
  return response.json();
}

function updateReviews(customerReviews) {
  const reviewsContainer = document.querySelector(".restaurant-reviews ul");
  reviewsContainer.innerHTML = renderReviews(customerReviews);
}

function hideLoading() {
  hideElement("#loading");
}

function showErrorMessage() {
  const detailContainer = document.querySelector("#restaurant-detail");
  detailContainer.innerHTML =
    '<p class="error-message">Failed to load restaurant details. Please try again later.</p>';
  hideLoading();
}

export default Detail;
