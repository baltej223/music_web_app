function displaySearchResults(json){
    let results = json.data.results;
    let total = json.data.results.length;
    $$$(".SearchResults",0).then(searchres=>{
        searchres.style.display="block";
        let string = "";
        for(let i=0;i<total;i++){
            let url = results[i].downloadUrl[4].url;
            let name = results[i].name;
            let imageUrl = results[i].image[0].url;
            let duration = results[i].duration;
            let artist = results[i].artists.primary[0].name;
            string = string + `
            <div class="searchResultdata backgroundUI flexRow">
                <img src="${imageUrl}" alt="" srcset="" id="searchResultImage">
                <div class="searchResultsImageDetails flexColumn">
                    <div class="searchResultName">${name}</div>
                    <div class="searchResultDuration">${artist+":"+duration}</div>
                </div>
                <button class="playButton transparent" onclick="play('${url}')">
                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px"
                                    fill="#75FB4C">
                                    <path
                                        d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                                </svg>
                </button>
            </div>
            `;
            searchres.update();
            searchres.update(string);
        }
    });
}

export default displaySearchResults;