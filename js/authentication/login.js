const token = sessionStorage.getItem("token");

if (token){
    location.href = "/index.html"
}


const forme = document.querySelector("form")

forme.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    // console.log(data);
    const payload = Object.fromEntries(data);
    // console.log(payload);
    const result = await fetch("http://localhost:8000/auth/login", {
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
        location.href = "/index.html";
    }
    
})