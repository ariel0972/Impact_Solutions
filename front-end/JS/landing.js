var toggle_btn;
var page;


function declare(){
    toggle_btn = document.querySelector(".toggle-btn")
    page = document.querySelector(".page")
}
const main = document.querySelector("main")

declare();


let dark = false;

function animation() {
   
    dark = !dark;
    let clone = page.cloneNode(true);
    if (dark) {
      clone.classList.remove("light");
      clone.classList.add("dark");
    } else {
      clone.classList.remove("dark");
      clone.classList.add("light");
    }
    clone.classList.add("copy");
    main.appendChild(clone);
  
    document.body.classList.add("stop-scrolling");
  
    clone.addEventListener("animationend", () => {
      document.body.classList.remove("stop-scrolling");
      page.remove();
      clone.classList.remove("copy");
      
      declare();
      events();
    });
  }

function events(){
    toggle_btn.addEventListener("click", animation);
}

events();