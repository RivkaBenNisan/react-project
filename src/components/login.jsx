import './api'
import { useEffect, useRef, useState } from "react";
import api from './api';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setIfManager, setUser } from '../redux/action';
// import '../css/bootstrap.min.css'
// import '../css/Login.css'
import '../css/form.css'

export const Login = () => {

  //שליפת המשתמש הנוכחי
  const user = useSelector(u => { return u.user })
  const manager = useSelector(m => { return m.manager })
  //משתנה שיעדכן מי המשתמש הנוכחי
  const dis = useDispatch()
  //משתנה המנתב לקומפוננטה הבאה
  const nav = useNavigate()
  //העברת נתונים מהטופס על ידי מצביע
  const emailRef = useRef()
  const passRef = useRef()
  // const [user, setUser] = useState()

  // פונקציה הבודקת האם המשתמש קיים ומנתבת בהתאם
  function send(event) {
    debugger
    event.preventDefault();
    if (manager.email == emailRef.current.value && manager.password == passRef.current.value)
      dis(setIfManager(true))
    else
      dis(setIfManager(false))
    
    //קבלת המשתמש לפי מייל וסיסמה
    api.getUser(emailRef.current.value, passRef.current.value)
      .then(x => {
        //אם המשתמש כבר רשום
        if (x.data) {
          console.log(user);
          //הנוכחי user שמירת פרטי המשתמש ב
          dis(setUser(x.data))
          console.log(x.data);
          //ניתוב לדף הבית
          nav('/Home');
        }
        // אם שם המשתמש אינו קיים
        else
          //ניתוב להרשמה
          nav(`/Register`);

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

    {/* טופס כניסה */}
    <div className="container">

      <div className="login">

        <h1>התחברות</h1>

        <form onSubmit={send} >
          <div className="input-box">
            <input type="email" placeholder="מייל" ref={emailRef} required
              onKeyPress={handleKeyPress}></input>
            <i class="fa fa-envelope"></i>
          </div>

          <div className="input-box">
            <input type="password" placeholder="סיסמה" ref={passRef} required
              onKeyPress={handleKeyPress}></input>
            <i class="fa fa-lock"></i>
          </div>



          <button type='submit'>כניסה</button>


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