import axios from "axios";

export const unsplash_image = (query) => {

    // Return the axios promise so it can be handled in the component
    return axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=Iq-aHZlOYOwlQiJwEVQZqdf6DY4cjmerCAFvgyoG3JM`);
}
