import { useSelector } from "react-redux"
import '../css/RecipeDetails.css'
import { Outlet, useNavigate } from "react-router"

export const RecipeDetails = () => {
    //שליפת המתכון הנוכחי
    const recipe = useSelector(r => { return r.recipe })
    console.log(recipe);


    const nav = useNavigate()

    const open = () => {
        // כאשר מנתבים מאבא לבן - אין לשים סלש
        nav('CommentsToRecipe')
    }

    return <>


        <div key={recipe.id} className={`recipe-card ${recipe.categoryName}`}>
            <p className="recipe-detail">{recipe.name}</p>
            <p className="recipe-detail">{recipe.userName}</p>
            <p className="recipe-detail">{recipe.preparationTime}</p>
            <p className="recipe-detail">{recipe.categoryName}</p>
            <p className="recipe-detail">{recipe.note}</p>
            <p className="recipe-instructions">{recipe.instructions}</p>
            <img className="recipe-image" src={`${process.env.PUBLIC_URL}/images/${recipe.pic}`} alt="Recipe" />
            <button onClick={open}>תגובות על מתכון זה</button>

           
        </div>
 <Outlet></Outlet>

    </>
}