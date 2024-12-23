import React, { useEffect, useState } from 'react'

function User() {
    const [loading, setLoading] = useState(true);
    //if we want to show the data to the user instead fo watching it in the console
    const [user, setUser] = useState(null);
    function cb(){
        //logic -> data fetch -> UI update
        // console.log("I ran after render");
        (async function fetchUser(){
            const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
            const userData = await response.json();
            console.log("userData", userData);
            setLoading(false);
            setUser(userData);
        })()
    }

    useEffect(cb,[]);

    console.log("render");
    if(loading){
        return (
            <>
                <div>Profile page</div>
                <div>...Loading</div>
            </>
        )      
    }
    if(loading == false){
        return (
            <>
                <div>Profile page</div>
                <div>{user.username}</div>
                <div>{user.address.street}</div>
                <div>{user.phone}</div>
                <div>{user.website}</div>
            </>
        )
    }
}

export default User
