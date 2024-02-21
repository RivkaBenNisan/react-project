import { useEffect, useState } from 'react'
import './api'
import api from "./api"
import '../css/AllRecipies.css'
import { Box, ButtonBase, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { chooseRecipe } from '../redux/action'





export const AllRecipies = () => {

    // המשתנים שמתוכם נבחר את החיפוש
    const [users, setUsers] = useState()
    const [categories, setCategories] = useState()
    const [levels, setLevels] = useState()

    // המשתנים השומרים את הבחירה שהמשתמש עשה
    const [ByUser, setByUser] = useState()
    const [ByCategory, setByCategory] = useState()
    const [ByLevel, setByLevel] = useState()




    const dis = useDispatch()

    // אוסף כל המתכונים
    const [list, setList] = useState()

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


    const ImageButton = styled(ButtonBase)(({ theme }) => ({
        position: 'relative',
        height: 200,

        //  display: 'flex',
        flexDirection: 'column', // Sets the direction to column
        justifyContent: 'flex-end', // Aligns items to the bottom

        [theme.breakpoints.down('sm')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &.Mui-focusVisible': {
            zIndex: 1,
            '& .MuiImageBackdrop-root': {
                opacity: 0.15,
            },
            '& .MuiImageMarked-root': {
                opacity: 0,
            },
            '& .MuiTypography-root': {
                border: '4px solid currentColor',
            },
        },
    }));

    const ImageSrc = styled('span')({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 100%',
    });

    const Image = styled('span')(({ theme }) => ({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    }));

    const ImageBackdrop = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.2,
        transition: theme.transitions.create('opacity'),
    }));

    const ImageMarked = styled('span')(({ theme }) => ({
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -1,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    }));

    //ניתוב לקומפוננטת פרטים נוספים
    const nav = useNavigate()

    //פונקציה הנקראת בעת לחיצה על מתכון
    function send(event) {
        console.log(event)

        dis(chooseRecipe(event))
        // ניתוב לקומפוננטת פרטים נוספים
        nav(`/RecipeDetails`)


    }


    return <>
        <div className='div_select'>
            {/* חיפוש על פי עורך  */}
            <FormControl sx={{ m: 1, minWidth: 250 }} className='selectB'>
                <InputLabel >חיפוש מתכון על פי עורך</InputLabel>
                <Select
                    // labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="חיפוש מתכון על פי עורך"
                    //שמירת הבחירה של שם העורך 
                    onChange={(e) => setByUser(e.target.value)}
                >
                    <MenuItem value="">
                        <em>כל העורכים</em>
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
            <FormControl sx={{ m: 1, minWidth: 250 }} className='selectB'>
                <InputLabel >חיפוש מתכון על פי קטגוריה
                </InputLabel>
                <Select
                    // labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="חיפוש מתכון על פי קטגוריה"
                    //שמירת הבחירה של קטגוריה  
                    onChange={(e) => setByCategory(e.target.value)}
                >
                    <MenuItem value="">
                        <em>כל הקטגוריות</em>
                    </MenuItem>
                    {/* שליפת כל הקטגוריות */}
                    {categories && categories.map(x =>
                        <MenuItem value={x.id}>
                            {x.name}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>

            {/* חיפוש מתכון על פי רמת קושי */}
            <FormControl sx={{ m: 1, minWidth: 250 }} className='selectB'>
                <InputLabel >חיפוש מתכון על פי רמת קושי</InputLabel>
                <Select
                
                    // labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="חיפוש מתכון על פי רמת קושי"
                    // שמירת הבחירה של רמת קושי 
                    onChange={(e) => setByLevel(e.target.value)}
                >
                    <MenuItem value="">
                        <em>כל הרמות</em>
                    </MenuItem>
                    {/* שליפת כל הרמות */}
                    {levels && levels.map(x =>
                        <MenuItem className='selectB' value={x.id}>
                            {x.name}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
        </div>

        {/* הצגת המתכונים לפי בחירת המשתמש */}
        <div className="recipe-container">
            {list && list.map(x => {
                if ((x.userId === ByUser || !ByUser) && (x.categoryId === ByCategory || !ByCategory) && (x.levelId === ByLevel || !ByLevel)) {
                    return (
                        <div key={x.id} className={`${x.categoryName} recipe-card`}>
                            <div className='login'>
                               
                                <h1 className='change'  id='recipeName'>{x.name}</h1>
                                <h1>{x.userName}</h1>

                                <ImageButton onClick={() => { send(x) }}
                                    focusRipple
                                    key={x.id}
                                >
                                    <ImageSrc style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/${x.pic})` }} />
                                    <ImageBackdrop className="MuiImageBackdrop-root" />
                                    <Image>
                                        <Typography
                                            component="span"
                                            variant="subtitle1"
                                            color="inherit"
                                            sx={{
                                                position: 'relative',
                                                p: 4,
                                                pt: 2,
                                                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                            }}
                                        >
                                            פרטי המתכון
                                            <ImageMarked className="MuiImageMarked-root" />
                                        </Typography>
                                    </Image>
                                </ImageButton>
                            </div>
                        </div>
                    );
                } else {
                    return null;
                }
            })}
        </div>


 {/* <!-- לינקים עבור הצגת המתכונים  --> */}
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



{/* <button onClick={() => send(x.id)}>show details</button> */ }



// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import ButtonBase from '@mui/material/ButtonBase';
// import Typography from '@mui/material/Typography';



