import axios from "axios";
import { getrole, getToken, handleToken } from "../utils/token";
import render from "./render";
import { BASE_URL } from "../constants/urls";
import { navigateTo } from "./eventHandlers/eventHandler";
import { loggedinNav } from "../views/Nav/nav";

export async function saveData(token:string){
  try{
    const response = await axios.get(`${BASE_URL}/parse/${token}`);
  handleToken(response.data.id,response.data.role);
}
catch(error){
  console.log(error);
}
}
document.addEventListener("DOMContentLoaded", async()=>{
  if (getToken()){
    loggedinNav(getrole()!)
  }
  else{
    navigateTo('/login');
  }
}

)
// Handle navigation
window.addEventListener("popstate", () => {
  render(window.location.pathname);
});



// Initial render
render(window.location.pathname);


 