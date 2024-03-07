import { NavLink, useNavigate } from "react-router-dom"
import '../css/form.css'
import { useSelector } from "react-redux"

export const MyDetails = () => {

    const nav = useNavigate()
    const user = useSelector(u => { return u.user })

    // פונקציה המעבירה לקומפוננטת הוספת מתכון
    function addRecipe() {
        nav('/AddRecipe')
    }

    // פונקציה המעבירה לקומפוננטת המתכונים שלי 
    function myRecipe() {
        nav('/MyRecipies')
    }

    return <>

        {/* טופס פרטים אישיים */}
        <div className="container">

            <div className="login">

                <h1>:הפרטים שלי</h1>
                <h1 id="myDetails"> שם: {user.firstName} {user.lastName}</h1>
                <h1 id="myDetails">{user.email} :מייל</h1>
                <h1 id="myDetails">{user.password} :סיסמה</h1>

                <div>
                    {/* <NavLink to={'/AddRecipe'} className='link'>הוספת מתכון</NavLink> */}
                    {/* <NavLink to={'/MyRecipies'} className='link'>המתכונים שלי</NavLink> */}
                </div>

                <button type='button' onClick={addRecipe} className="myButton">הוספת מתכון</button>
                <button type='button' onClick={myRecipe} className="myButton">המתכונים שלי</button>


                {/* <form onSubmit={send} > */}

                {/* <div className="input-box">
                    <input type="text" placeholder="קטגוריה חדשה"></input>
                    <i class="fa fa-envelope"></i>
                </div>

                <div className="input-box">
                    <input type="password" placeholder="סיסמה"
                        className='thePlaceholder' ></input>
                    <i class="fa fa-lock"></i>
                </div> */}
                {/* <button type='submit'>כניסה</button> */}
                {/* </form> */}
            </div>
        </div >




        {/* <!-- לינקים עבור הוספת מלון --> */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.css" />
        <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap4.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
        {<script
            src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
            integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous">
        </script>}
        {<script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
            integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
            crossorigin="anonymous"></script>}
        {<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
            integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
            crossorigin="anonymous"></script>}

    </>
}