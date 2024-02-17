import { NavLink } from "react-router-dom"
import '../css/style.css'

export const MyDetails = () => {
    return <>
        <div>
            <NavLink to={'/AddRecipe'} className='link'>הוספת מתכון</NavLink>
            <NavLink to={'/MyRecipies'} className='link'>המתכונים שלי</NavLink>
        </div>
    </>
}