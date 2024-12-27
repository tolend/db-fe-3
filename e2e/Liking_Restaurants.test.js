// eslint-disable-next-line no-unused-vars, no-undef
const { I } = inject();

// eslint-disable-next-line no-undef
Feature('Restaurant Favorites');

// eslint-disable-next-line no-undef
Before(({ I }) => {
  I.amOnPage('/');
});

// eslint-disable-next-line no-undef
Scenario('Liking a restaurant', async ({ I }) => {
  I.waitForElement('.resto-item a', 5);
  I.seeElement('.resto-item a');
  I.click('.resto-item a');

  // const restaurantName = await I.grabTextFrom('.resto-item_name h2');

  I.amOnPage('/#/detail/');
  I.waitForElement('#restaurant-detail', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // I.waitForElement('.resto-item', 5);
  // I.seeElement('.resto-item');
  // I.see(restaurantName, '.resto-item');
});

// eslint-disable-next-line no-undef
Scenario('Unliking a restaurant', async ({ I }) => {
  I.amOnPage('/#/detail/');

  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.waitForElement('[aria-label="unlike this restaurant"]', 5);
  I.seeElement('[aria-label="unlike this restaurant"]');
  I.click('[aria-label="unlike this restaurant"]');

  I.amOnPage('/#/favorite');
  I.waitForElement('.restaurant-item__not__found', 5);
  I.see(
    "You don't have a favourite restaurant",
    '.restaurant-item__not__found'
  );
});
