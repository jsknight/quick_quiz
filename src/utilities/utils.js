import React from 'react';

// ///////////////////////////////////////////////
// ///////////////////////////////////////////////
// UTILITY CLASS
// Store and access GLOBAL variables or just add
// useful helper methods.
// ///////////////////////////////////////////////
// ///////////////////////////////////////////////

const Utilities = {
    API_URL : "https://opentdb.com/api.php",

    get(item){
        return this[item];
    },
    
    set(item, val){
        this[item] = val;
    },

    async getData(url, callback){ 
        await fetch(this.API_URL + url).then(async (response) => { 
            const questions = await response.json();
            const { results } = questions;
            return results;
        }).then((response) => { 
            callback(response);
        });
    },
};

export default Utilities;