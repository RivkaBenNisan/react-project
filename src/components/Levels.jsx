import { useEffect, useRef, useState } from "react";
import api from "./api";
import { Button } from "@mui/material";

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
    // פונקציה המוסיפה תגובה
    function add() {
        debugger
        const l = {
            name: nameRef.current.value
        }
        console.log(l);
        api.addlevel(l).then((y) => {
            alert("הרמה נוספה בהצלחה")
            setLevels(y.data)
        }).catch(error => {
            
            alert("שגיאה בהוספת הרמה");
        });

    }

    return <>
        {levels && levels.map(x =>
            <div key={x.id}>
                <p>{x.name}</p>
            </div>
        )}
        <div className="add-comment-section">
            <input type='text' placeholder="רמה חדשה" className='comment-input' ref={nameRef}></input>

            <Button variant="contained" className="submit-comment-button" onClick={() => add()}>
                הוסף
            </Button>
        </div>
    </>
}