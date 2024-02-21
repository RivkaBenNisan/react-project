import axios from "axios"

export default {
    //users
    addUser: (user) => {
        return axios.post(`https://localhost:7130/api/User`, user)
        
    },

    getUser: (email, password) => {
        return axios.get(`https://localhost:7130/api/User/${email}/${password}`)
        
    },

    getUsers: () => {
        return axios.get(`https://localhost:7130/api/User`)
    },

    //Categories
    addCategory: (name) => {
        return axios.post(`https://localhost:7130/api/Category`, name)
        
    },

    getCategories: () => {
        
        return axios.get(`https://localhost:7130/api/Category`)
       
    },

    //Level
    addlevel: async(level) => {
        const r= await axios.post(`https://localhost:7130/api/Level        `, level)
        return r
    },

    getLevels: () => {
        return axios.get(`https://localhost:7130/api/Level`)
       
    },

    //Ingredient
    addIngredient: (ingredient) => {
        return axios.post(`https://localhost:7130/api/Ingredient`, ingredient)
        
    },

    getIngredient: () => {
        return axios.get(`https://localhost:7130/api/Ingredient`)
        
    },

    //Recipe
    addRecipe: async(recipe) => {
        debugger
        const r=await axios.post(`https://localhost:7130/api/Recipe`, recipe)
        debugger
        return r
        
    },

    getRecipe: () => {
        return axios.get(`https://localhost:7130/api/Recipe`)
    },

    //IngredientsToRecipe
    addIngredientsToRecipe: (ingredientsToRecipe) => {
        return axios.post(`https://localhost:7130/api/IngredientsToRecipe`, ingredientsToRecipe)
    },

    getIngredientsToRecipe: async(recipeId) => {
        debugger
        const r= await axios.get(`https://localhost:7130/api/IngredientsToRecipe/${recipeId}`)
        debugger
        return r
    },


    //CommentsToRecepy
    addCommentsToRecepy:async (commentsToRecepy) => {
        debugger
        const r= await axios.post(`https://localhost:7130/api/CommentsToRecipe`, commentsToRecepy)
        debugger
        return r
    },

    getCommentsToRecepy: (recipeId) => {
        return axios.get(`https://localhost:7130/api/CommentsToRecipe/${recipeId}`)
        
    },

}