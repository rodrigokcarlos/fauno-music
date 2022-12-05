const redirect_uri = "https://rodrigokcarlos.github.io/fauno-music/home.html";
// const redirect_uri = "http://localhost:5500/home.html";

let client_id = "7a3d0d99a035445782307dfdb95a0a68"; 
let client_secret = "2fd40876e5a94c929a5831b55184c87e";

let access_token = null;
let refresh_token = null;
let currentPlaylist = "";
let radioButtons = [];

const AUTHORIZE = "https://accounts.spotify.com/authorize"
const TOKEN = "https://accounts.spotify.com/api/token";
const PLAYLISTS = "https://api.spotify.com/v1/me/playlists";
const DEVICES = "https://api.spotify.com/v1/me/player/devices";
const PLAY = "https://api.spotify.com/v1/me/player/play";
const PAUSE = "https://api.spotify.com/v1/me/player/pause";
const NEXT = "https://api.spotify.com/v1/me/player/next";
const PREVIOUS = "https://api.spotify.com/v1/me/player/previous";
const PLAYER = "https://api.spotify.com/v1/me/player";
const TRACKS = "https://api.spotify.com/v1/playlists/{{PlaylistId}}/tracks";
const CURRENTLYPLAYING = "https://api.spotify.com/v1/me/player/currently-playing";
const SHUFFLE = "https://api.spotify.com/v1/me/player/shuffle";
const SEARCH = "https://api.spotify.com/v1/";

function onPageLoad(){
    client_id = localStorage.getItem("client_id");
    client_secret = localStorage.getItem("client_secret");
    if ( window.location.search.length > 0 ){
        handleRedirect();
    }
    else{
        access_token = localStorage.getItem("access_token");
    }
}

function handleRedirect(){
    let code = getCode();
    fetchAccessToken( code );
    window.history.pushState("", "", redirect_uri); // remove param from url
}

function getCode(){
    let code = null;
    const queryString = window.location.search;
    if ( queryString.length > 0 ){
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code')
    }
    return code;
}

function requestAuthorization(){
    client_id = "7a3d0d99a035445782307dfdb95a0a68"; 
    client_secret = "2fd40876e5a94c929a5831b55184c87e";
    localStorage.setItem("client_id", client_id);
    localStorage.setItem("client_secret", client_secret); // In a real app you should not expose your client_secret to the user

    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url; // Show Spotify's authorization screen
}

function fetchAccessToken( code ){
    let body = "grant_type=authorization_code";
    body += "&code=" + code; 
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
}

function refreshAccessToken(){
    refresh_token = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    callAuthorizationApi(body);
}

function callAuthorizationApi(body){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        var data = JSON.parse(this.responseText);
        if ( data.access_token != undefined ){
            access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
            console.log(access_token)
        }
        if ( data.refresh_token  != undefined ){
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
        }
        onPageLoad();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}
const tokenzada = localStorage.getItem("access_token", access_token);


function callApi(method, url, body, callback){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.send(body);
    xhr.onload = callback;
}



function handleApiResponse(){
    if ( this.status == 200){
        console.log(this.responseText);
        setTimeout(currentlyPlaying, 2000);
    }
    else if ( this.status == 204 ){
        setTimeout(currentlyPlaying, 2000);
    }
    else if ( this.status == 401 ){
        refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }    
}
const buscador = document.querySelector('#inputinho');
const tabela2 = document.querySelector('.table2');
let setNome = []
let setMM = []
let setAA = []
let musicaID = [];
function procuraMusica(procura) {
    axios.get(`https://api.spotify.com/v1/search?q=${buscador.value}:&type=track&locale=pt-BR%2Cpt%3Bq%3D0.9%2Cen-US%3Bq%3D0.8%2Cen%3Bq%3D0.7&offset=6&limit=10`, {
        headers: {
            Authorization: `Bearer ${tokenzada}`
        }
    }).then((response) => {
        for (let i = 0; i < response.data.tracks.items.length; i++) {
            const setMusica = response.data.tracks.items[i].name
            const setArtista = response.data.tracks.items[i].artists[0].name
            const setID = response.data.tracks.items[i].id
            setMM = setMM + setMusica + ',,'
            setAA = setAA + setArtista + ',,'
            musicaID = musicaID + setID + ',,'
        }

        
        const novaMM = setMM.split(',,')
        novaMM.pop()
        const novaAA = setAA.split(',,')
        novaAA.pop()
        const novoID = musicaID.split(',,')
        novoID.pop()
        console.log(novoID)
        let testeArr = novaMM.map( function (x, i){
            return `
            <tr onclick="mudaMusica(this)">
                <td data-id='${novoID[i]}'>${x}</td>
                <td>${novaAA[i]}</td>
            </tr>`
        })
        setMM = [];
        setAA = [];
        musicaID = [];
        tabela2.innerHTML = testeArr.join('');

    });
    mudaMusica()
}
let testeVar = '';
let playerframe = document.querySelector('#idIframe');
function mudaMusica(dale) {
    if(dale?.children[0].dataset.id == undefined) {
        return
    }
    console.log(dale.children[0].dataset.id)
    const musicaNova = `https://open.spotify.com/embed/track/${dale.children[0].dataset.id}?utm_source=generator&theme=0`
    playerframe.setAttribute('src', musicaNova)
};
