import { NavLink } from "react-router-dom"
import '../css/style.css'
import { useDispatch, useSelector } from "react-redux"


export const Nav = () => {

    //שליפת המשתמש הנוכחי
    const user = useSelector(u => { return u.user })
    const ifManager = useSelector(i => { return i.ifManager })

    return <>
        <div className="nav" id="role">
            {/* הצגת אנונימי או שם המשתמש */}
            <div id="roleName">
                {ifManager && <p>מנהל</p>}
                {!ifManager && user.id && <p>{user.firstName} {user.lastName}</p>}
                {!user.id && <p>אנונימי</p>}
            </div>
            {ifManager && <NavLink to={'/Categories'} className='link'>קטגוריות</NavLink>}
            {ifManager && <NavLink to={'/Levels'} className='link'>רמות</NavLink>}
            {/* הצגת פרטים אישיים רק אם המשתמש כבר רשום */}
            {user.id && <NavLink to={'/MyDetails'} className='link'>איזור אישי</NavLink>}
            <NavLink to={'/Home'} className='link'>דף הבית</NavLink>
            <NavLink to={'/Login'} className='link'>כניסה</NavLink>
            <NavLink to={'/Register'} className='link'>הרשמה</NavLink>
            <NavLink to={'/AllRecipies'} className='link'>כל המתכונים</NavLink>
        </div>
    </>
}