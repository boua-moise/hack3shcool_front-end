const token = sessionStorage.getItem("token");

const hName = document.querySelector("h1.name");
const image = document.querySelector("img");
const biographie = document.querySelector("p.biographie");
//localhost biographie
//192.168.1.188
async function getUser(token) {
    const result = await fetch("https://hack3shcool.onrender.com:8000/auth/", {
    "method":"GET",
    "headers":{
        "content-type": "application/json",
        "Authorization":  `Bearer ${token}`
    }
    });
    console.log(result);
    
    if (result.status == 200) {
        data = await result.json()
        console.log("data:",data);
        hName.innerText = `${data.nom} ${data.prenom}`
        image.src = `${data.url_image}`;
        biographie.innerText = `${data.biographie}`
    }else{
        location.href = "/index.html"
    }

}

function logout() {
    sessionStorage.clear();
    location.href = "/index.html";
}

getUser(token)
