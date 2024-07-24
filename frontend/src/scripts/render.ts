import { addEventListeners } from "./eventHandlers/eventHandler";
import router from "./router";

// Function to render content based on the route

const render = async (pathname: string) => {
    const content = await router.resolve({ pathname });
  
    if (typeof content !== "string") {
      console.error("Content is not a string");
      return;
    }
  
    const contentElement = document.getElementById("content");
  
    if (contentElement) {
      contentElement.innerHTML = content;
  
      addEventListeners();
    } else {
      console.error("Content element not found");
    }
  };

  export default render;