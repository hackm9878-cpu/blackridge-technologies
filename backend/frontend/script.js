const API =
"https://blackridge.onrender.com";


// =========================
// LOGIN
// =========================
async function login() {

    const username =
    document.getElementById(
        "username"
    ).value.trim();



    const password =
    document.getElementById(
        "password"
    ).value.trim();



    // CHECK EMPTY
    if (!username || !password) {

        alert(
            "Enter Username And Password"
        );

        return;

    }



    try {

        const response =
        await fetch(

            `${API}/login`,

            {

                method: "POST",

                headers: {

                    "Content-Type":
                    "application/json"

                },

                body: JSON.stringify({

                    username,
                    password

                })

            }

        );



        const data =
        await response.json();



        // LOGIN SUCCESS
        if (response.ok) {

            localStorage.setItem(

                "user",

                JSON.stringify(
                    data.user
                )

            );



            // ADMIN
            if (
                data.user.role ===
                "admin"
            ) {

                window.location.href =
                "dashboard.html";

            }

            // STAFF
            else {

                window.location.href =
                "dashboard.html";

            }

        }

        // LOGIN FAILED
        else {

            alert(
                data.message ||
                "Login Failed"
            );

        }

    }

    catch (error) {

        console.log(error);

        alert(
            "Server Error"
        );

    }

}




// =========================
// REGISTER STAFF
// =========================
async function registerStaff() {

    const name =
    document.getElementById(
        "name"
    ).value.trim();



    const username =
    document.getElementById(
        "staffUsername"
    ).value.trim();



    const password =
    document.getElementById(
        "staffPassword"
    ).value.trim();



    const state =
    document.getElementById(
        "state"
    ).value.trim();



    if (
        !name ||
        !username ||
        !password ||
        !state
    ) {

        alert(
            "Fill All Fields"
        );

        return;

    }



    try {

        const response =
        await fetch(

            `${API}/register-staff`,

            {

                method: "POST",

                headers: {

                    "Content-Type":
                    "application/json"

                },

                body: JSON.stringify({

                    name,
                    username,
                    password,
                    state

                })

            }

        );



        const data =
        await response.json();



        if (response.ok) {

            alert(
                "Staff Added Successfully"
            );

            location.reload();

        }

        else {

            alert(
                data.message
            );

        }

    }

    catch (error) {

        console.log(error);

        alert(
            "Server Error"
        );

    }

}




// =========================
// CHANGE PASSWORD
// =========================
async function changePassword() {

    const user =
    JSON.parse(
        localStorage.getItem(
            "user"
        )
    );



    const oldPassword =
    document.getElementById(
        "oldPassword"
    ).value;



    const newPassword =
    document.getElementById(
        "newPassword"
    ).value;



    if (
        !oldPassword ||
        !newPassword
    ) {

        alert(
            "Fill All Fields"
        );

        return;

    }



    try {

        const response =
        await fetch(

            `${API}/change-password`,

            {

                method: "PUT",

                headers: {

                    "Content-Type":
                    "application/json"

                },

                body: JSON.stringify({

                    userId:
                    user.id,

                    oldPassword,

                    newPassword

                })

            }

        );



        const data =
        await response.json();



        if (response.ok) {

            alert(
                "Password Changed"
            );

        }

        else {

            alert(
                data.message
            );

        }

    }

    catch (error) {

        console.log(error);

        alert(
            "Server Error"
        );

    }

}




// =========================
// LOGOUT
// =========================
function logout() {

    localStorage.removeItem(
        "user"
    );

    window.location.href =
    "login.html";

}




// =========================
// CHECK LOGIN
// =========================
function checkLogin() {

    const user =
    JSON.parse(
        localStorage.getItem(
            "user"
        )
    );



    if (!user) {

        window.location.href =
        "login.html";

    }

}




// =========================
// AUTO RUN
// =========================
checkLogin();