

let contentArr;
let resultsName = new Array();

const searchInput = document.getElementById('search');
const searchWrapper = document.querySelector('.search-box');
const resultsWrapper = document.querySelector('.results');
const resultsSeparator = document.querySelector('.results-separator');
const searchIconBpx = document.querySelector('.search-button');
const searchIconGrey = document.querySelector('.search-button-grey');
const cancelSearchIcon = document.querySelector('.cancel-search');

const fetchAutocomplete = async (input) =>{
    let url = `https://api.giphy.com/v1/gifs/search/tags?api_key=${APIKEY}&q=${input}&limit=5`;
    try {
        resultsName = [];
        const response = await fetch(url);
        const content = await response.json();
        let contentArr = content.data;
        contentArr.forEach(suggestion => {
            resultsName.push(suggestion.name);
        });
        renderResults(resultsName);
    } catch (error) {
        console.error(error);
    }
}

function emptyResults(){
    resultsWrapper.innerHTML="";
    resultsSeparator.style.display = 'none';
    searchWrapper.classList.remove('show');
}

function renderResults(results){
    emptyResults();
    if(!results.length){
        return searchWrapper.classList.remove('show');
    }
    let max;
    if(results.length >= 5){
        max = 5;
    }else{
        max = results.length;
    }

    searchActive();
    resultsSeparator.style.display = 'block';
    for (let i = 0; i < max; i++) {
        let liItem = document.createElement('li');
        let linkItem = document.createElement('a');
        let searchImage = document.createElement('img');
        searchImage.src='./src/img/icon-search-result.svg';
        searchImage.alt = 'icon search';
        searchImage.classList.add('icon-search-result');

        linkItem.href="#";
        liItem.appendChild(searchImage);
        liItem.appendChild(linkItem);
        linkItem.textContent = results[i];
        liItem.addEventListener('click', ()=>{
            //TODO: fetch de los gifs con la palabra
            searchInput.value = liItem.textContent;
            emptyResults();
            cancelSearch();
        });
        resultsWrapper.appendChild(liItem);
    }
    
    searchWrapper.classList.add('show');
    
}

searchInput.addEventListener('keyup', (e)=>{
    let input = searchInput.value;
    if(e.key == 'Enter'){
        //TODO: fetch de los gifs con la palabra
        console.log('Presionaste Enter');
        emptyResults();
        cancelSearch();
    }else if(input.length>0){
        fetchAutocomplete(input);
    }else{
        resultsSeparator.style.display = 'none';
        searchWrapper.classList.remove('show');
        cancelSearch();
    }
})

function searchActive(){
    searchIconBpx.style.display = 'none';
    searchIconGrey.style.opacity=1;
    cancelSearchIcon.style.display = 'block';
}

function cancelSearch(){
    searchIconBpx.style.display = 'block';
    searchIconGrey.style.opacity=0;
    cancelSearchIcon.style.display = 'none';
}

cancelSearch();

cancelSearchIcon.addEventListener('click', ()=>{
    searchInput.value='';
    emptyResults();
    cancelSearch();
})