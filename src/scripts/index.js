/* eslint-disable no-unused-vars */
import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.css";
import "../styles/responsive2.css";
import "./components/index.js";
import App from "./views/app.js";
import swRegister from "./utils/sw-register.js";
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

const app = new App({
  button: document.querySelector("#menu"),
  drawer: document.querySelector("#drawer"),
  content: document.querySelector("#main-content"),
});

window.addEventListener("hashchange", () => {
  app.renderPage();
});

window.addEventListener("load", () => {
  app.renderPage();
  swRegister();
});
