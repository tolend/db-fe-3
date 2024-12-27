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
  I.waitForElement('.resto-item_description', 5);
  I.seeElement('.resto-item_description');
  I.click('.resto-item > a ');

  I.waitForElement('#likeButton', 2);
  I.seeElement('#likeButton');
  I.click('#likeButton');
});

// eslint-disable-next-line no-undef
Scenario('Unliking a restaurant', async ({ I }) => {
  I.waitForElement('.resto-item_description', 5);
  I.seeElement('.resto-item_description');
  I.click('.resto-item > a ');

  I.waitForElement('#likeButton', 2);
  I.seeElement('#likeButton');
  I.click('#likeButton');
});
