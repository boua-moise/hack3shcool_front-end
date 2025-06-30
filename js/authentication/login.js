const token = sessionStorage.getItem("token");

if (token){
    location.href = "/hack3shcool_front-end/index.html"
}


const forme = document.querySelector("form")

displayPage();

forme.addEventListener("submit", async (e) => {
    e.preventDefault();
    displayPage2();
    const data = new FormData(e.target);
    // console.log(data);
    const payload = Object.fromEntries(data);
    // console.log(payload);
    const result = await fetch("https://hack3shcool.onrender.com/auth/login", {
        "method":"POST",
        "body":JSON.stringify(payload),
        "headers":{
            "content-type":"application/json"
        }
    });
    console.log(result);
    if (result.status == 200) {
        const valeur = await result.json();
        console.log(valeur.token);
        sessionStorage.setItem("token", valeur.token);
        location.href = "/hack3shcool_front-end/index.html";
    }
    
})

function displayPage() {
    setTimeout(() => {
        document.querySelector(".loader").style.display = "none";
        document.querySelector(".main").style.display = "flex";
    }, 1000)
}

function displayPage2() {
    document.querySelector(".main").style.display = "none";
    document.querySelector(".loader").style.display = "flex";
}