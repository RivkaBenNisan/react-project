import { useEffect, useState } from 'react';
import './api'
import api from './api';

export const Try = () => {

    const [list, setList] = useState()

    useEffect(() => {

        api.getCategories()

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
    }, [])





    return <>
        {list && list.map(x =>
            <div key={x.id}>
                <p>{x.id}</p>
                <p>{x.name}</p>
                {/* <button onClick={() => send(x.id)}>show details</button> */}
            </div>
        )}




    </>

}


