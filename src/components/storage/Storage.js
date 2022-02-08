import React, {memo, useEffect} from 'react';

function Storage({history}) {

    useEffect(() => {
        const serialObj = JSON.stringify(history);
        let id = Math.round(Date.now() * Math.PI / 100000);

        try {
             localStorage.setItem(id, serialObj)
        } catch (err) {
            console.error("Что-то пошло не так", err)
        }
        // const returnObj = JSON.parse(localStorage.getItem("myKey"))
        //
        // {console.log("FROM LC", returnObj)}
    },[history])


    return (
        <div>
            {console.log("HISTORY", history)}
        </div>
    );
}

export default memo(Storage);