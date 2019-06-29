import axios from 'axios';
//API Key: b49aad4e56d50b14a0069e70d8dc24f5
//https://www.food2fork.com/api/search

export default class Search {
    constructor (query) {
        this.query = query;
    }

    async getResults() {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = 'b49aad4e56d50b14a0069e70d8dc24f5';
        try {
            const results = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.recipes = results.data.recipes;
            console.log(this.recipes);
        } catch(error) {
            alert(error);
        }
    }
}