import './api'
import { useEffect, useRef, useState } from "react";
import api from './api';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/action';
import '../css/bootstrap.min.css'
// import '../css/Login.css'
import '../css/form.css'

export const Login = () => {

    //שליפת המשתמש הנוכחי
    const user = useSelector(u => { return u.user })
    //משתנה שיעדכן מי המשתמש הנוכחי
    const dis = useDispatch()
    //משתנה המנתב לקומפוננטה הבאה
    const nav = useNavigate()
    //העברת נתונים מהטופס על ידי מצביע
    const emailRef = useRef()
    const passRef = useRef()
    // const [user, setUser] = useState()

    // פונקציה הבודקת האם המשתמש קיים ומנתבת בהתאם
    function send() {
        debugger
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

    return <>
        {/* טופס כניסה */}
        <br></br>
        <br></br>
        <div id='log' className='dd'>
            <label htmlFor={"em"} className='form-label'>Email</label>
            {/* <br></br> */}
            <input id={'em'} type='email' placeholder="Email" ref={emailRef} className='form-control'></input>
        </div>
        <br></br>
        <br></br>
        <div id='log'>
            <label htmlFor={'pw'} className='form-label'>PassWord</label>
            {/* <br></br> */}
            <input type='password' id={'pw'} placeholder="PassWord" ref={passRef} className='form-control'></input>
        </div>
        <br></br>
        <br></br>
        <button onClick={send}>send</button>


        {/* <form action="/action_page.php">
  <div class="mb-3 mt-3">
    <label for="email" class="form-label">Email:</label>
    <input type="email" class="form-control" id="email" placeholder="Enter email" name="email">
  </div>
  <div class="mb-3">
    <label for="pwd" class="form-label">Password:</label>
    <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd">
  </div>
  <div class="form-check mb-3">
    <label class="form-check-label">
      <input class="form-check-input" type="checkbox" name="remember"> Remember me
    </label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form> */}
    </>
}