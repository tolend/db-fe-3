import RestoDbSource from "../../data/resto-idb";
import { createRestoItemTemplate } from "../templates/templates-creator";

const Home = {
  async render() {
    return `
            <main id="main-content">
                <div class="headline">
                    <h1 class="headline_title">Restau-Run List</h1>
                </div>
                <section id="restaurant-list" class="restaurant-list"></section>
            </main>
        `;
  },

  async afterRender() {
    await this.loadRestaurants();
  },

  async loadRestaurants() {
    const restaurants = await RestoDbSource.homeResto();
    this.renderRestaurants(restaurants);
  },

  renderRestaurants(restos) {
    const restaurantContainer = document.querySelector("#restaurant-list");
    restaurantContainer.innerHTML = "";
    restos.forEach((resto) => {
      restaurantContainer.innerHTML += createRestoItemTemplate(resto);
    });
  },
};

export default Home;
