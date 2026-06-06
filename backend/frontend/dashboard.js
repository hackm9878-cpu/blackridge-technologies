const API = "https://blackridge.onrender.com";

async function loadData() {

    const res = await fetch(`${API}/records`);
    const data = await res.json();

    const table = document.getElementById("table");
    table.innerHTML = "";

    data.forEach(item => {

        table.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.sponsor}</td>
                <td>${item.code}</td>
                <td>${item.gen}</td>
                <td>${item.pin}</td>
            </tr>
        `;

    });

}

async function addRecord() {

    const body = {
        name: document.getElementById("name").value,
        sponsor: document.getElementById("sponsor").value,
        code: document.getElementById("code").value,
        gen: document.getElementById("gen").value,
        pin: document.getElementById("pin").value
    };

    await fetch(`${API}/add-record`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    loadData();

}

async function searchData() {

    const q = document.getElementById("search").value;

    const res = await fetch(`${API}/search?q=${q}`);
    const data = await res.json();

    const table = document.getElementById("table");
    table.innerHTML = "";

    data.forEach(item => {

        table.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.sponsor}</td>
                <td>${item.code}</td>
                <td>${item.gen}</td>
                <td>${item.pin}</td>
            </tr>
        `;

    });

}

loadData();

function logout(){

    localStorage.removeItem("admin");

    window.location.href =
    "login.html";

}