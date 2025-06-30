const token = sessionStorage.getItem("token")

if (token){
    location.href = "/index.html";
}

const forme = document.querySelector("form");

const btn = document.getElementById("cta");

btn.addEventListener("click", () => {
    
    document.getElementById("container-image").style.display = "flex";
    document.getElementById("container-image").addEventListener("click", (e) => {

        if (e.target.id == "container-image") {
            document.getElementById("container-image").style.display = "none";
        }

    });
});
displayPage()
setTimeout(() => {
    document.querySelector(".main").style.display = "flex";
        document.querySelector(".loader").style.display = "none";
}, 1000)

forme.addEventListener("submit", async (e) => {
    e.preventDefault();
    displayPage();
    
    const data = new FormData(e.target);
    const json = Object.fromEntries(data)
    console.log(json);


    const jsonData = {};
    const cleanForm = new FormData();

    for (const [key, value] of data.entries()) {
    if (value instanceof File && value.name) {
        cleanForm.append(key, value);
    } else {
        jsonData[key] = value;
    }
    }


    console.log("json",jsonData, cleanForm);

    const blob = new Blob([JSON.stringify(jsonData)], {
        type: "application/json"
    });

    cleanForm.append("data", blob);
    


    
    console.log("clen data:",Object.fromEntries(cleanForm));
    const result = await fetch("https://hack3shcool.onrender.com:8000/auth/register", {
        "method":"POST",
        "body": cleanForm,
    });
    console.log(result);
    const valeur = await result.json();
    console.log(valeur[0]);
    
    if (result.status != 200) {
        alert(valeur.detail)
    }else{
        location.href = '/authentication/login.html';
    }
    
    console.log(valeur);
    
    
})

function displayPage() {
    document.querySelector(".loader").style.display = "flex";
    document.querySelector(".main").style.display = "none";
}
