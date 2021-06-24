let searchBarPosition = 500;
let searchBarNav = document.querySelector('.nav-search-box');

window.addEventListener('scroll',(e)=>{
    if(window.pageYOffset>searchBarPosition){
        searchBarNav.classList.add("active");
    }else{
        searchBarNav.classList.remove("active");
    }
  });