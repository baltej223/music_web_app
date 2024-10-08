import MusicHandler from './music_handler.js';
import displaySearchResults from './displaySearchResults.js';

$$$("#songProgress").then(proggbar=>{
    proggbar.addEventListener('input', function() {
        console.log(this.value);
    });
});

$$$(".SearchResults",0).then(srcres=>{
    srcres.style.display="none";
})
$$$("#music_search_bar").then(searchbar=>{
    searchbar.addEventListener("keypress",function(event){
        event.key.c();
        event.preventDefault();
        if (event.key == "Enter"){
            let music = new MusicHandler();
            music.search(searchbar.value).then(retjson => {
                let retdata = retjson.data;
                let length = retdata.total;
                displaySearchResults(retjson);
            });
        // $$$(".SearchResults",0).then(srcres=>{
        //     srcres.style.display="block";
        // });
    }
    else{
        searchbar.value=searchbar.value+event.key;
    }
    });
    document.addEventListener("click",function(){
        $$$(".SearchResults",0).then(srcres=>{
            srcres.style.display="none";
        })
    })
});
//js media queries
document.addEventListener("DOMContentLoaded",function(){
    if (screen.width<700){
        $$$(".aside").then(aside=>{
            aside.outerHTML="";
        });
        $$$(".navpilldata",0,true).then(navpilldatas=>{
            navpilldatas.forEach(datas => {
                datas.outerHTML="";
            });
        })
    }
});
// let musicHandlerInstance = new MusicHandler();
// musicHandlerInstance.search("ve hania").then(result => {
//     console.log(result.data.results[1].downloadUrl[4].url);
// });