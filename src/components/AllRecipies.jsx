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
        <div>
            {/* חיפוש על פי עורך  */}
            <FormControl sx={{ m: 1, minWidth: 250 }}>
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
            <FormControl sx={{ m: 1, minWidth: 250 }}>
                <InputLabel >חיפוש מתכון על פי קטגוריה</InputLabel>
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
            <FormControl sx={{ m: 1, minWidth: 250 }}>
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
                        <MenuItem value={x.id}>
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
                        <div key={x.id} className={`recipe-card ${x.categoryName}`}>
                            <p className="recipe-detail">{x.name}</p>
                            <p className="recipe-detail">{x.userName}</p>

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
                            {/* <img className="recipe-image" src={`${process.env.PUBLIC_URL}/images/${x.pic}`} alt="Recipe" /> */}
                        </div>
                    );
                } else {
                    return null;
                }
            })}
        </div>

    </>
}



{/* <button onClick={() => send(x.id)}>show details</button> */ }



// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import ButtonBase from '@mui/material/ButtonBase';
// import Typography from '@mui/material/Typography';



