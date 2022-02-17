/* https://github.com/haltu/muuri */

const grid = new Muuri(".grid", {
  layout: {
    rounding: false,
  },
});

window.addEventListener("load", () => {
  grid.refreshItems().layout();
  document.getElementById("grid").classList.add("images-loaded");

  // Adding listener to links for filter based on category
  const links = document.querySelectorAll(".navbar__category");
  links.forEach((n) => {
    n.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector(".active").classList.remove("active");
      event.target.classList.add("active");

      const category = event.target.innerHTML.toLowerCase();
      category === "all"
        ? grid.filter("[data-category]")
        : grid.filter(`[data-category="${category}"]`);
    });
  });

  // Adding listener to search bar
  document.querySelector("#search").addEventListener("input", (event) => {
    const search = event.target.value;
    grid.filter((item) => item.getElement().dataset.tags.includes(search));
  });

  // Adding listener to images for pop up them
  const overlay = document.getElementById("overlay");
  document.querySelectorAll(".grid .item .anime__img").forEach((element) => {
    element.addEventListener("click", () => {
      const path = element.getAttribute("src");
      const alt = element.getAttribute("alt");
      const description =
        element.parentNode.parentNode.parentNode.dataset.description;
      overlay.classList.add("active");
      document.querySelector("#overlay .anime__img--popup").src = path;
      document.querySelector("#overlay .anime__img--popup").alt = alt;
      document.querySelector("#overlay .anime__description--popup").innerHTML =
        description;
    });
  });

  // Adding listener to close button
  document
    .querySelector("#anime__close-button")
    .addEventListener("click", () => {
      overlay.classList.remove("active");
    });

  // Adding listener to overlay background for close function
  overlay.addEventListener("click", (event) => {
    event.target.id === "overlay" ? overlay.classList.remove("active") : "";
  });
});
