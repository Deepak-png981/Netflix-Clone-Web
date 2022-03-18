//grabbing the HTML element 
const banner = document.getElementById("banner");
const bannerTitle = document.getElementById("banner-title");
const bannerDescription = document.getElementById("banner-description");
const title = document.getElementById("title");
const date = document.getElementById("date");
const language = document.getElementById("language");
const rating = document.getElementById("rating");
const description = document.getElementById("description");
const close = document.getElementById("close");
const container = document.getElementById("container");
const nav = document.getElementById("nav");
//API key to fetch the data
const API_KEY = "06f8c330b9113d4a4fb6ad37eed11807";
//it is the basic link to fetch the movie's data-->base url to be added in the startind
const baseURL = "https://api.themoviedb.org/3";
//it is for the posters of the movies
const imageUrl = "https://image.tmdb.org/t/p/original/";
//it is an array for the different categories
const requests = [
    //for discover
    `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    //for trending
    `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    //for top rated movies
    `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    `/discover/movie?api_key=${API_KEY}&with_genres=99`
]
console.log(`${baseURL}${requests[0]}`);
// //function to fetch data from the API
// async function fetchData(){
//     const response = await fetch(`${baseURL}${requests[0]}`);
//     const data = await response.json();
//     //to get the only result part 
//     const mainData = data.results;
//     console.log(mainData);
// }
// fetchData();

async function fetchBannerData() {
    //to fetch the data for banners
    const bannerResponse = await fetch(`${baseURL}${requests[0]}`);
    // converting the bannerresponse into json
    const bannerData = await bannerResponse.json();
    //to get the movie names from the fetched data
    var banners = await bannerData.results;
    console.log(banners);   //checking
    //to choose the random number from the twenty movie names
    const select = banners[Math.floor(Math.random() * banners.length)];
    console.log(select);    //checking
    //setting up the background of the banner
    banner.style.backgroundImage = `url(${imageUrl}${select.backdrop_path})`;
    //setting the title of the movie selected
    bannerTitle.textContent = select.name;
    //setting the description of the movie selected
    bannerDescription.textContent = select.overview;
}
fetchBannerData();

//fection data for the rows
async function fetchData() {
    for(let i = 0; i<8; i++){
        //for fetching the data for row banners
    const response = await fetch(`${baseURL}${requests[i]}`);
    // converting the response into json
    const data = await response.json();
    //to get the banner name
    var movies = data.results;
    console.log(movies);    //checking
    //calling the createRows function
    createRows(movies , i);
    }
    return movies;
}
fetchData();
//to make the movies look in a row
function createRows(movies , i) {
    //using map function on array movies
    movies.map((movie) => {
        //creating a variable imag to get image0 
        const imag = document.getElementById(`image${i}`);
        //creating image element
        const poster = document.createElement("img");
        //conditionn to make netflix original vertical
        if(i>0){
            //setting up the src of image posters
        poster.src = `${imageUrl}${movie.backdrop_path}`;
        }
        else{
            //setting up the vertical src of image poster
            //as it is specially for the netflix original
            poster.src = `${imageUrl}${movie.poster_path}`;
            //so we have to again resize it
            poster.classList.add(`largeImage`);
        }
        poster.classList.add('image');
        imag.appendChild(poster);

        //creating about section when a poster is clicked
        poster.addEventListener("click" ,function(){
            console.log(movie); //checking
            //making the about container visible
            container.style.display = "flex";
            const moviePosterImg = document.getElementById("moviePosterImg");
            moviePosterImg.src = `${imageUrl}${movie.poster_path}`;
            //to select the movie name from the movie section 
            //the name can be in any of the three titles
            title.textContent = (movie.name ||movie.title ||movie.original_name);
            //setting up the date 
            date.textContent = movie.first_air_date;
            //setting the language of the movie
            language.textContent = movie.original_language;
            //setting up the rating of the movie
            rating.textContent = movie.vote_average;
            //setting up the description of the moviePoster
            description.textContent = movie.overview;
        } )
    })
}
//closing the about element
close.addEventListener("click" , function(){
    container.style.display = "none";
})
//for the hamburg icon background color
window.addEventListener("scroll" , function(){
    if(window.scrollY > 100){
        nav.style.background = "#111";
    }
    else{
        nav.style.background = "none";
    }
})