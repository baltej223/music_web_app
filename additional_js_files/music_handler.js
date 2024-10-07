class MusicHandler {
    constructor() {
        // You might want to initialize something here if needed
    }

    async search(data) {
        const baseUrl = "https://saavn.dev/api/search/songs?query="; 
        const url = baseUrl + encodeURI(data);
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const returnedJson = await response.json();
            return returnedJson;
        } catch (e) {
            console.error("Some error occurred, error:", e);
        }
    }

    play(url){
        $$$("#playMusicPlayer").then(player =>{
            player.src=url;
        });
    }
}

export default MusicHandler;

// Usage example
