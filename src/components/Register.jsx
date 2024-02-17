import { useRef } from "react"
import './api'
import api from "./api"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../redux/action"
import swal from "sweetalert"
// import '../css/bootstrap.min.css'
// import '../css/Register.css'
import '../css/form.css'


export const Register = () => {

    //שליפת המשתמש הנוכחי
    const user = useSelector(u => { return u.user })
    //משתנה שיעדכן מי המשתמש הנוכחי
    const dis = useDispatch()
    //משתנה המנתב לקומפוננטה הבאה
    const nav = useNavigate()
    //העברת נתונים מהטופס על ידי מצביע
    const lastRef = useRef()
    const firstRef = useRef()
    const emailRef = useRef()
    const passRef = useRef()
    //פונקציה השומרת את הנתונים שהמשתמש הכניס
    function send(event) {
        event.preventDefault();
        api.getUser(emailRef.current.value, passRef.current.value)
            .then(x => {
                // אם כבר יש משתמש עם מייל וסיסמא כמו שהמשתמש הכניס
                if (x.data) {
                    swal("!לא ניתן להרשם", ".כבר קיים משמתמש בעל מייל וסיסמה אלו", "error")
                }
                //שמירת המשתמש במסד הנתונים
                else {
                    debugger
                    //יצירת המשתמש מהטופס
                    const u = {
                        lastName: lastRef.current.value,
                        firstName: firstRef.current.value,
                        email: emailRef.current.value,
                        password: passRef.current.value
                    }
                    //הוספת המשתמש למסד הנתונים
                    api.addUser(u).then((y) => {
                        //הנוכחי user שמירת פרטי המשתמש ב
                        dis(setUser(y.data))
                        //ניתוב לדף הבית
                        nav('/Home');
                    })

                }

            })
            .catch(err => {
                console.log(err.message);
            });
    }
    
    //enter פונקציה הנקראת בעת לחיצה על המקשים ובודקת אם לחצו על המקש 
    //send אם כן הפונקציה מזמנת את הפונקציה 
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            send(event);
        }
    }

    return <>
        {/* טופס הרשמה */}
        <div className="container">

            <div className="login">

                <h1>רישום למערכת</h1>

                <form onSubmit={send} >


                    <div class="input-box">
                        <input type="text" placeholder="שם משפחה" ref={lastRef} required onKeyPress={handleKeyPress}></input>
                        <i class="fa fa-lock"></i>
                    </div>

                    <div class="input-box">
                        <input type="text" placeholder="שם פרטי" ref={firstRef} required onKeyPress={handleKeyPress}></input>
                        <i class="fa fa-lock"></i>
                    </div>


                    <div className="input-box">
                        <input type="email" placeholder="מייל" ref={emailRef} required onKeyPress={handleKeyPress}></input>
                        <i class="fa fa-envelope"></i>
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder="סיסמה" ref={passRef} required onKeyPress={handleKeyPress}></input>
                        <i class="fa fa-lock"></i>
                    </div>

                    <button type='submit'>הרשמה</button>

                </form>

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