import { useEffect, useState } from 'react'
import './api'
import api from "./api"
import '../css/AllRecipies.css'
import { Search } from './search'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

export const AllRecipies = () => {
    const [users, setUsers] = useState()
    const [categories, setCategories] = useState()
    const [levels, setLevels] = useState()


    const [ByUser, setByUser] = useState()
    const [ByCategory, setByCategory] = useState()
    const [ByLevel, setByLevel] = useState()

    const [list, setList] = useState()

    useEffect(() => {
        api.getUsers()

            // תופס הצלחה
            .then(x => {


                setUsers(x.data)
            })
            // תופס כשלון
            .catch(err => {
                console.log(err.message);
            })

        api.getCategories()

            // תופס הצלחה
            .then(x => {


                setCategories(x.data)
            })
            // תופס כשלון
            .catch(err => {
                console.log(err.message);
            })

        api.getLevels()

            // תופס הצלחה
            .then(x => {


                setLevels(x.data)
            })
            // תופס כשלון
            .catch(err => {
                console.log(err.message);
            })

        api.getRecipe()

            // תופס הצלחה
            .then(x => {

                // x = האובייקט שחזר מהשרת
                // data הנתונים נמצאים בתוך 
                console.log(x.status);
                setList(x.data)
            })
            // תופס כשלון
            .catch(err => {
                console.log(err.message);
            })
        debugger
    }, [])


    return <>
        <div>
            <FormControl sx={{ m: 1, minWidth: 250 }}>
                <InputLabel >חיפוש מתכון על פי עורך</InputLabel>
                <Select
                    // labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="חיפוש מתכון על פי עורך"
                // onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {users && users.map(x =>
                        <MenuItem value={x.id}>
                            {x.firstName} {x.lastName}
                        </MenuItem>
                    )}
                </Select>
                {/* <FormHelperText>With label + helper text</FormHelperText> */}
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 250 }}>
                <InputLabel >חיפוש מתכון על פי קטגוריה</InputLabel>
                <Select
                    // labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="חיפוש מתכון על פי קטגוריה"
                // onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {categories && categories.map(x =>
                        <MenuItem value={x.id}>
                            {x.name}
                        </MenuItem>
                    )}
                </Select>
                {/* <FormHelperText>With label + helper text</FormHelperText> */}
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 250 }}>
                <InputLabel >חיפוש מתכון על פי רמת קושי</InputLabel>
                <Select
                    // labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="חיפוש מתכון על פי רמת קושי"
                // onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {levels && levels.map(x =>
                        <MenuItem value={x.id}>
                            {x.name}
                        </MenuItem>
                    )}
                </Select>
                {/* <FormHelperText>With label + helper text</FormHelperText> */}
            </FormControl>
        </div>

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