import { NavLink } from "react-router-dom"
import '../css/search.css'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material"
import api from "./api"
import { useEffect, useState } from "react"


export const Search = () => {
    const [users, setUsers] = useState()
    const [categories, setCategories] = useState()
    const [levels, setLevels] = useState()

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




    </>
}

