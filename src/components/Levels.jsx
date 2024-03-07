import { useEffect, useRef, useState } from "react";
import api from "./api";
import { Button } from "@mui/material";
import '../css/form.css'

export const Levels = () => {
    const [levels, setLevels] = useState()
    const nameRef = useRef()
    useEffect(() => {

        api.getLevels()

            // תופס הצלחה
            .then(x => {

                // x = האובייקט שחזר מהשרת
                // data הנתונים נמצאים בתוך 
                console.log(x.status);
                setLevels(x.data)
            })
            // תופס כשלון
            .catch(err => {
                console.log(err.message);
            })
    }, [])
    // פונקציה המוסיפה רמה
    function add(event) {
        event.preventDefault();
        debugger
        const l = {
            name: nameRef.current.value
        }
        console.log(l);
        api.addlevel(l).then((y) => {
            // alert("הרמה נוספה בהצלחה")
            setLevels(y.data)
        }).catch(error => {

            alert("שגיאה בהוספת הרמה");
        });
        // 
        nameRef.current.value = ""

    }
    //enter פונקציה הנקראת בעת לחיצה על המקשים ובודקת אם לחצו על המקש 
    //send אם כן הפונקציה מזמנת את הפונקציה 
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            add(event);
        }
    }

    return <>
        {/* טופס הוספת רמה */}
        <div className="container">

            <div className="login">

                <h1>:כל הרמות</h1>
                {levels && levels.map(x =>
                    <div key={x.id}>
                        <p className="p">{x.name}</p>
                    </div>
                )}

                <form onSubmit={add} >
                    <div className="input-box">
                        <input type="text" placeholder="רמה חדשה" ref={nameRef} className="thePlaceholder"
                            onKeyPress={handleKeyPress}></input>
                        <i class="fa fa-envelope"></i>
                    </div>

                    <button type='submit' className="add">הוסף</button>
                </form>
            </div>
        </div >




        {/* <!-- לינקים עבור הוספת רמה --> */}
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