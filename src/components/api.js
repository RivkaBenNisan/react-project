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
    addalevel: (level) => {
        return axios.post(`https://localhost:7130/api/Category`, level)
        
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
    addRecipe: (recipe) => {
        return axios.post(`https://localhost:7130/api/Recipe`, recipe)
        
    },

    getRecipe: () => {
        return axios.get(`https://localhost:7130/api/Recipe`)
    },

    //IngredientsToRecipe
    addIngredientsToRecipe: (ingredientsToRecipe) => {
        return axios.post(`https://localhost:7130/api/IngredientsToRecipe`, ingredientsToRecipe)
    },

    getIngredientsToRecipe: (recipeId) => {
        return axios.get(`https://localhost:7130/api/IngredientsToRecipe${recipeId}`)
        
    },


    //CommentsToRecepy
    addCommentsToRecepy: (commentsToRecepy) => {
        return axios.get(`https://localhost:7130/api/CommentsToRecepy`, commentsToRecepy)
    },

    getCommentsToRecepy: (recipeId) => {
        return axios.get(`https://localhost:7130/api/CommentsToRecipe/${recipeId}`)
        
    },

}