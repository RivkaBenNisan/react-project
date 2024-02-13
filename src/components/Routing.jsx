import { Route, Routes } from "react-router"
import { Home } from "./home"
import { Register } from "./Register"
import { Login } from "./login"
import { Nav } from "./Nav"
import { AllRecipies } from "./AllRecipies"
import { MyDetails } from "./MyDetails"
import { RecipeDetails } from "./RecipeDetails"
import { CommentsToRecipe } from "./CommentsToRecipe"
import { AddCommentToRecipe } from "./AddCommentToRecipe"
import { MyRecipies } from "./MyRecipies"


export const Routing = () => {
    return <>
        {/* הקומפוננטות שננתב אליהם תוך כדי הפרוייקט */}
        <Routes>
            <Route path="Nav" element={<Nav></Nav>}></Route>
            <Route path="Home" element={<Home></Home>}></Route>
            <Route path="Register" element={<Register></Register>}></Route>
            <Route path="Login" element={<Login></Login>}></Route>
            <Route path="MyDetails" element={<MyDetails></MyDetails>}></Route>
            <Route path="AllRecipies" element={<AllRecipies></AllRecipies>}></Route>
            <Route path="RecipeDetails" element={<RecipeDetails></RecipeDetails>}>
                <Route path="CommentsToRecipe" element={<CommentsToRecipe></CommentsToRecipe>}>
                    <Route path="AddCommentToRecipe" element={<AddCommentToRecipe></AddCommentToRecipe>}></Route> 
               </Route>
            </Route>
            <Route path="MyRecipies" element={<MyRecipies></MyRecipies>}></Route>
        </Routes>
    </>
}



