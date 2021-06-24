let trendingSearches = document.querySelector('.trending-searches');


fetch('https://api.giphy.com/v1/trending/searches?api_key='+APIKEY)
.then((responseGiphy)=> {return responseGiphy.json()})
.then((resultGiphy)=>   {return resultGiphy.data})
.then((resultsArray)=>{
    for(let i=0; i<5;i++){
        console.log(resultsArray[i]);
        let searchLink = document.createElement('a');
        searchLink.textContent = resultsArray[i];
        searchLink.href = '#';
        searchLink.classList.add('search-link');
        trendingSearches.appendChild(searchLink);
        if(i<4){
            let separator = document.createElement('p');
            separator.textContent = ', ';
            separator.classList.add('search-separator');
            trendingSearches.appendChild(separator);
        }
    }
})
.catch((error)=>{console.error(error)})
