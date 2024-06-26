import axios from "axios"

export default {
    //users
    addUser:async (user) => {
        return await axios.post(`https://localhost:7130/api/User`, user)
        
    },

    getUser: async(email, password) => {
        return await axios.get(`https://localhost:7130/api/User/${email}/${password}`)
        
    },

    getUsers: async() => {
        return await axios.get(`https://localhost:7130/api/User`)
    },

    //Categories
    addCategory:async (name) => {
        return await axios.post(`https://localhost:7130/api/Category`, name)
        
    },

    getCategories: async() => {
        
        return await axios.get(`https://localhost:7130/api/Category`)
       
    },

    //Level
    addlevel: async(level) => {
        const r= await axios.post(`https://localhost:7130/api/Level        `, level)
        return r
    },

    getLevels: async() => {
        return await axios.get(`https://localhost:7130/api/Level`)
       
    },

    //Ingredient
    addIngredient: async(ingredient) => {
        return await axios.post(`https://localhost:7130/api/Ingredient`, ingredient)
        
    },

    getIngredient:async () => {
        return await axios.get(`https://localhost:7130/api/Ingredient`)
        
    },

    //Recipe
    addRecipe: async(recipe) => {
        debugger
        const r=await axios.post(`https://localhost:7130/api/Recipe`, recipe)
        debugger
        return r
        
    },

    getRecipe:async () => {
        return await axios.get(`https://localhost:7130/api/Recipe`)
    },

    //IngredientsToRecipe
    addIngredientsToRecipe: async(ingredientsToRecipe) => {
        debugger
        const r= await axios.post(`https://localhost:7130/api/IngredientsToRecipe`, ingredientsToRecipe)
        debugger
        return r
    },

    getIngredientsToRecipe: async(recipeId) => {
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

    getCommentsToRecepy: async(recipeId) => {
        return await axios.get(`https://localhost:7130/api/CommentsToRecipe/${recipeId}`)
        
    },

}