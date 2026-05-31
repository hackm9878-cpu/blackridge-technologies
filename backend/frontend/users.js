const API =
"https://blackridge.onrender.com";
const user =
JSON.parse(
    localStorage.getItem("user")
);


// NOT LOGGED IN
if(!user){

    window.location.href =
    "login.html";

}


// ONLY ADMIN
if(user.role !== "admin"){

    alert("Access Denied");

    window.location.href =
    "index.html";

}


// ADD USER
async function addUser(){

    const username =
    document.getElementById(
        "username"
    ).value;

    const password =
    document.getElementById(
        "password"
    ).value;

    const role =
    document.getElementById(
        "role"
    ).value;


    const response =
    await fetch(
        `${API}/add-user`,
        {

            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:JSON.stringify({

                username,
                password,
                role

            })

        }
    );

    const data =
    await response.json();

    alert(data.message);

}