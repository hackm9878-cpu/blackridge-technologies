const API = "http://localhost:5000";

async function login(){

    const username =
    document.getElementById("username").value;

    const password =
    document.getElementById("password").value;

    try{

        const response =
        await fetch(`${API}/login`,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                username,
                password
            })

        });

        const data =
        await response.json();

        if(response.ok){

            localStorage.setItem(
                "admin",
                JSON.stringify(data.admin)
            );

            window.location.href =
            "dashboard.html";

        }else{

            document.getElementById(
                "message"
            ).innerText =
            data.message;

        }

    }catch(error){

        console.log(error);

    }

}