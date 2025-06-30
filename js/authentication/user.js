const section = document.querySelector("section.all_users");


const title = document.querySelector("title");

const titrePage = document.querySelector("h1");

if (!typeUser) {
    location.href = '/index.html'
}

if (typeUser == "teacher") {
    titrePage.textContent += "professeurs";
} else {
    titrePage.textContent += "étudiants";
}



title.textContent += typeUser;

async function users() {
    const result = await fetch(`http://localhost:8000/auth/all/${typeUser}`, {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    });

    console.log(result);
    

    const data = await result.json();

    const users = data.users

    for (let index = 0; index < users.length; index++) {
        const element = users[index];
        section.innerHTML += 
        `
            <div class="perso">
                <div class="image">
                    <img src="${element.url_image}" alt="image-user">
                </div>
                <div class="info">
                    <h2 class="titre">${element.nom} ${element.prenom}</h2>

                    <p><b>biographie:</b><br>${element.biographie}</p>
                    <p><b>mail:</b>${element.mail}</p>
                </div>
            </div>
        `
    }

}

users()