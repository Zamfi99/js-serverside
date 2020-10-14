fetch = require("node-fetch");
const BASE_URL = "https://cat-fact.herokuapp.com/";

class Api {
    static get BASE_URL() {
        return BASE_URL;
    }

    static random() {
        const URL = this.BASE_URL + "facts/random";

        return fetch(URL)
            .then(res => res.json())
    }
}

module.exports = Api;