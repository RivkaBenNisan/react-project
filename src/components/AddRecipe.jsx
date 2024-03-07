import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import api from "./api"
import swal from "sweetalert"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import '../css/form.css'
import { AddIngredientsToRecipe } from "./AddIngridientsToRecipe"
import { useNavigate } from "react-router"
import { setChekedList } from "../redux/action"

export const AddRecipe = () => {
    const [category, setCategory] = useState()
    const [categories, setCategories] = useState()
    const [levels, setLevels] = useState()
    const [levelId, setLevelId] = useState()
    const [ingredients, setIngredients] = useState()
    const [checked, setCheked] = useState()
    const [jsonIngredients, setJsonIngredients] = useState([])
    //let checked=[]
    //שליפת המשתמש הנוכחי
    const user = useSelector(u => { return u.user })
    const nav = useNavigate()
    //העברת נתונים מהטופס על ידי מצביע
    const nameRef = useRef()
    const picRef = useRef()
    const instRef = useRef()
    const timeRef = useRef()
    const noteRef = useRef()

    const dis = useDispatch()

    useEffect(() => {
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

        api.getIngredient()
            // תופס הצלחה
            .then(x => { setIngredients(x.data) })
            // תופס כשלון
            .catch(err => { console.log(err.message); })


    });

    // function addIngidients(recipeId){



    // }


    //פונקציה השומרת את הנתונים שהמשתמש הכניס
    function add(event) {
        event.preventDefault();

        debugger
        console.log(category);
        const categoryName = categories.find(x => x.id == category)
        const level = levels.find(x => x.id == levelId)
        console.log(categoryName);
        //יצירת המתכון מהטופס
        const r = {
            name: nameRef.current.value,
            pic: picRef.current.value,
            instructions: instRef.current.value,
            preparationTime: timeRef.current.value,
            userId: user.id,
            categoryId: category,
            categoryName: categoryName.name,
            levelId: level.id,
            levelName: level.name,
            note: noteRef.current.value

        }

        api.addRecipe(r).then((y) => {
            debugger
            console.log(checked);

            debugger
            {
                checked && checked.forEach(x => {
                    debugger
                    const n = ingredients.find(ingredient => ingredient.id == x)?.name
                    const ing = {
                        id: x,
                        name: n
                    }
                    let arr = jsonIngredients
                    arr.push(ing)
                    // setJsonIngredients([...jsonIngredients, ing])
                    setJsonIngredients(arr)
                    debugger
                });
            }


            dis(setChekedList(jsonIngredients))
            debugger
            // setCheked(checked)
            nav(`/AddIngredientsToRecipe/${y.data}`)


        }).catch(error => {
            // console.error(error);
            alert("שגיאה בהוספת מתכון");
        });

    }
    function changeGrid(event) {
        debugger
        let t
        if (checked) {
            t = checked.findIndex(x => event.target.id == x)
            if (t != -1) {
                debugger
                const start = [...checked.slice(0, t)]
                const end = [...checked.slice(t + 1)]
                setCheked([...start, ...end])
                debugger
                console.log(checked);
            }
            else {
                debugger
                setCheked([...checked, event.target.id])
            }
        }
        else {
            t = -1
            setCheked([event.target.id])
        }


        console.log(checked);

    }

    function select(e) {
        debugger
        console.log(e);

        setCategory(e.target.value)
    }

    // שם הרכיב החדש שהכניסו
    const nameIngRef = useRef()

    // פונקציה המוסיפה רכיב
    function addIng(event) {
        event.preventDefault();
        debugger
        const l = {
            name: nameIngRef.current.value
        }
        console.log(l);
        api.addIngredient(l).then((y) => {
            // alert("הרמה נוספה בהצלחה")
            setIngredients(y.data)
            nameIngRef.current.value = ""
        }).catch(error => {

            alert("שגיאה בהוספת הרכיב");
        });
        // 
       

    }
    //enter פונקציה הנקראת בעת לחיצה על המקשים ובודקת אם לחצו על המקש 
    //send אם כן הפונקציה מזמנת את הפונקציה 
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            addIng(event);
        }
    }
    return <>

        {/* טופס הרשמה */}
        <div className="container" >

            <div className="login" id="rec_con">

                <h1>הוספת מתכון</h1>

                <form onSubmit={add} id="rec_form">


                    <div class="input-box right">
                        <input type="text" placeholder="שם המתכון" ref={nameRef}
                            required className='thePlaceholder'></input>
                        <i class="fa fa-lock"></i>
                    </div>

                    <div class="input-box right">
                        <input type="text" placeholder="שם התמונה" ref={picRef}
                            required className='thePlaceholder'></input>
                        <i class="fa fa-lock"></i>
                    </div>


                    <div className="input-box right">
                        <input type="text" placeholder="זמן הכנה" ref={timeRef}
                            required className='thePlaceholder'></input>
                        <i class="fa fa-envelope"></i>
                    </div>

                    <div className="input-box right">
                        <input type="text" placeholder="הוראות הכנה" ref={instRef}
                            required className='thePlaceholder'></input>
                        <i class="fa fa-envelope"></i>
                    </div>

                    <div className="input-box right">
                        <input type="text" placeholder="הערות" ref={noteRef}
                            required className='thePlaceholder'></input>
                        <i class="fa fa-envelope"></i>
                    </div>


                    <FormControl sx={{ m: 1, minWidth: 250 }} className="in_label left">
                        <InputLabel>  קטגוריה</InputLabel>
                        <Select
                            // className="input-box"
                            id="demo-simple-select-helper"
                            label="קטגוריה"
                            //שמירת הבחירה של קטגוריה  
                            onChange={select}
                        >
                            <i className="fa fa-envelope"></i>

                            {/* שליפת כל הקטגוריות */}
                            {categories && categories.map(x =>
                                <MenuItem value={x.id} className="input-box">
                                    {x.name}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, minWidth: 250 }} className="in_label" left>
                        <InputLabel>  רמת קושי</InputLabel>
                        <Select
                            // className="input-box"
                            id="demo-simple-select-helper"
                            label="רמת קושי"
                            //שמירת הבחירה של רמת הקושי  
                            onChange={(e) => setLevelId(e.target.value)}
                        >
                            {/* <i className="fa fa-envelope"></i> */}

                            {/* שליפת כל הקטגוריות */}
                            {levels && levels.map(x =>
                                <MenuItem value={x.id}>
                                    {x.name}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>

                    {ingredients && ingredients.map(x =>
                        <div className="rembar left">
                            <input id={x.id} type="checkbox" name={x.name} onChange={(e) => changeGrid(e)}></input>
                            <label for={x.id} id="myCheck">{x.name}</label>
                        </div>
                    )}

                    {/* הוספת רכיב חדש */}

                    <div className="input-box">
                        <input type="text" placeholder="הוספת רכיב חדש" ref={nameIngRef} id="newIng" className="thePlaceholder"
                            onKeyPress={handleKeyPress}></input>
                        <i class="fa fa-envelope"></i>
                        <button type='button' onClick={addIng} id="myIng">הוסף</button>

                    </div>

                    <button type='submit'>הוספה</button>
                </form>
            </div>
        </div >

        {/* <!-- לינקים עבור הוספת מתכון --> */}
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