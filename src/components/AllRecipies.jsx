import { useEffect, useState } from 'react'
import './api'
import api from "./api"
import '../css/AllRecipies.css'
import { Search } from './search'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

export const AllRecipies = () => {

    // המשתנים שמתוכם נבחר את החיפוש
    const [users, setUsers] = useState()
    const [categories, setCategories] = useState()
    const [levels, setLevels] = useState()

    // המשתנים השומרים את הבחירה שהמשתמש עשה
    const [ByUser, setByUser] = useState()
    const [ByCategory, setByCategory] = useState()
    const [ByLevel, setByLevel] = useState()

    // אוסף כל המתכונים
    const [list, setList] = useState()

    // עדכון שם העורך שנבחר 
    const changeUser = (event) => {
        setByUser(event.target.value);
    };
    // עדכון שם הקטגוריה שנבחרה
    const changeCategory = (event) => {
        setByCategory(event.target.value);
    };
    // עדכון שם הרמה שנבחרה
    const changeLevel = (event) => {
        setByLevel(event.target.value);
    };

    // פונקציה המתממשת בעת טעינת הקומפוננטה
    useEffect(() => {

        // שליפת כל שמות המשתמשים
        api.getUsers()
            // תופס הצלחה
            .then(x => { setUsers(x.data) })
            // תופס כשלון
            .catch(err => { console.log(err.message); })

        // שליפת כל הקטגוריות
        api.getCategories()

            // תופס הצלחה
            .then(x => { setCategories(x.data) })
            // תופס כשלון
            .catch(err => { console.log(err.message); })

        // שליפת כל הרמות
        api.getLevels()
            // תופס הצלחה
            .then(x => { setLevels(x.data) })
            // תופס כשלון
            .catch(err => { console.log(err.message); })

        // שליפת כל המתכונים
        api.getRecipe()
            // תופס הצלחה
            .then(x => { setList(x.data) })
            // תופס כשלון
            .catch(err => { console.log(err.message); })
    }, [])


    return <>
        <div>
            {/* חיפוש על פי עורך  */}
            <FormControl sx={{ m: 1, minWidth: 250 }}>
                <InputLabel >חיפוש מתכון על פי עורך</InputLabel>
                <Select
                    // labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="חיפוש מתכון על פי עורך"
                    onChange={(e) => changeUser(e)}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {/* שליפת שמות העורכים */}
                    {users && users.map(x =>
                        <MenuItem value={x.id}>
                            {x.firstName} {x.lastName}
                        </MenuItem>
                    )}
                </Select>
                {/* <FormHelperText>With label + helper text</FormHelperText> */}
            </FormControl>

            {/*  חיפוש על פי קטגוריה*/}
            <FormControl sx={{ m: 1, minWidth: 250 }}>
                <InputLabel >חיפוש מתכון על פי קטגוריה</InputLabel>
                <Select
                    // labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="חיפוש מתכון על פי קטגוריה"
                    onChange={(e) => changeCategory(e)}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {/* שליפת כל הקטגוריות */}
                    {categories && categories.map(x =>
                        <MenuItem value={x.id}>
                            {x.name}
                        </MenuItem>
                    )}
                </Select>
                {/* <FormHelperText>With label + helper text</FormHelperText> */}
            </FormControl>

            {/* חיפוש מתכון על פי רמת קושי */}
            <FormControl sx={{ m: 1, minWidth: 250 }}>
                <InputLabel >חיפוש מתכון על פי רמת קושי</InputLabel>
                <Select
                    // labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="חיפוש מתכון על פי רמת קושי"
                    onChange={(e) => changeLevel(e)}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {/* שליפת כל הרמות */}
                    {levels && levels.map(x =>
                        <MenuItem value={x.id}>
                            {x.name}
                        </MenuItem>
                    )}
                </Select>
                {/* <FormHelperText>With label + helper text</FormHelperText> */}
            </FormControl>
        </div>

        {/* הצגת המתכונים לפי בחירת המשתמש */}
        <div className="recipe-container">
            {list && list.map(x => {
                if ((x.userId === ByUser || !ByUser) && (x.categoryId === ByCategory || !ByCategory) && (x.levelId === ByLevel || !ByLevel)) {
                    return (
                        <div key={x.id} className={`recipe-card ${x.categoryName}`}>
                            <p className="recipe-detail">{x.name}</p>
                            <p className="recipe-detail">{x.userName}</p>
                            <img className="recipe-image" src={`${process.env.PUBLIC_URL}/images/${x.pic}`} alt="Recipe" />
                        </div>
                    );
                } else {
                    return null;
                }
            })}
        </div>

    </>
}


{/* <p className="recipe-detail">{x.preparationTime}</p> */ }
{/* <p className="recipe-detail">{x.userId}</p> */ }
{/* <p className="recipe-detail">{x.categoryId}</p> */ }
{/* <p className="recipe-detail">{x.categoryName}</p> */ }
{/* <p className="recipe-detail">{x.levelId}</p> */ }
{/* <p className="recipe-detail">{x.note}</p> */ }
{/* <p className="recipe-instructions">{x.instructions}</p> */ }
{/* <button onClick={() => send(x.id)}>show details</button> */ }