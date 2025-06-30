const token = sessionStorage.getItem("token");

if (token){
    location.href = "/hack3shcool_front-end/index.html"
}


const forme = document.querySelector("form")

forme.addEventListener("submit", async (e) => {
    e.preventDefault();
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
