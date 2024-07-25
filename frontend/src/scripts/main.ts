import render from "./render";

// Handle navigation
window.addEventListener("popstate", () => {
  render(window.location.pathname);
});

// Initial render
render(window.location.pathname);


