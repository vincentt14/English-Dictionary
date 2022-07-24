const wrapper = document.querySelector(".wrapper"),
searchInput = wrapper.querySelector("input"),
infoText = wrapper.querySelector(".info-text");

// data function
function data(result, word){
    if(result.title){ //kalau api returnnya message ga ditemukan
        infoText.innerHTML = `Searching the meaning of <span>"${word}"<span>, Please, try to search for another word.`;
    }else{
        console.log(result);
        wrapper.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0],
        phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}/`;

        // pindahin respon api ke dalam html
        document.querySelector(".words p").innerHTML = result[0].word;
        document.querySelector(".words span").innerHTML = phonetics;
        document.querySelector(".meaning span").innerHTML = definitions.definition;
        document.querySelector(".example span").innerHTML = definitions.example;
    }
}

// fetch api function
function fetchAPI(word){
    infoText.style.color = "#000";
    infoText.innerHTML = `Searching the meaning of <span>"${word}"<span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    // fetching api response and returning it with parsing into js obj and in another then method calling data function with passing api response and searched word as an argument
    fetch(url).then(res => res.json()).then(result => data(result, word));
}

searchInput.addEventListener("keyup", e =>{
    // kalau user tekan enter dan ga ksong akan panggil fetch
    if(e.key === "Enter" && e.target.value){
        fetchAPI(e.target.value);
    }
});
