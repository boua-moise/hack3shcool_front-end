const studentToken = sessionStorage.getItem("token");

const encoursElement = document.querySelector("section.encours");

const terminerElement = document.querySelector("section.terminer");

async function dashboardStudent(token) {
    const result = await fetch("https://hack3shcool.onrender.com:8000/dashboard/student", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "content-type": "application/json"
        }
    });

    // if (result.status == 401) {
    //     location.href = "/index.html";
    // }

    const data = await result.json();
    console.log(data);
    
    if (result.status == 200) {
        let encours = data.encours;
        let terminer = data.terminer;
        console.log("encours:",encours);
        console.log("terminer:",terminer);
        
        for (let index = 0; index < terminer.length; index++) {

            terminerElement.innerHTML += 
            `
                <div class="cours" id="${terminer[index].id}">
                    <div class="image">
                        <div class="delete" id="${terminer[index].id}">Désinscrire</div>
                        <img src="${terminer[index].image}" alt="image-cours">
                    </div>
                    <div class="info">
                        <h2>${terminer[index].titre}</h2>
                        <div class="icon">
                            <span><img src="../image/icon/signal1.png" alt="niveau" class="icon"><em>${terminer[index].niveau}</em></span>
                            <span><img src="../image/icon/clock.png" alt="niveau" class="icon"><em>${terminer[index].duree} heures</em></span>
                        </div>

                        <div class="auteur">
                            <div class="image-auteur">
                                <img src="${terminer[index].auteur.url_image}" alt="auteur-image">
                            </div>
                            <div class="info-auteur">
                                <h3>${terminer[index].auteur.nom} ${terminer[index].auteur.prenom}</h3>
                                <p>bio: ${terminer[index].auteur.biographie}</p>
                                <p>mail: ${terminer[index].auteur.mail}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }





        for (let index = 0; index < encours.length; index++) {

            encoursElement.innerHTML += 
            `
                <div class="cours" id="${encours[index].id}">
                    <div class="image">
                        <div class="delete" id="${encours[index].id}">Désinscrire</div>
                        <img src="${encours[index].image}" alt="image-cours">
                    </div>
                    <div class="info">
                        <h2>${encours[index].titre}</h2>
                        <div class="icon">
                            <span><img src="../image/icon/signal1.png" alt="niveau" class="icon"><em>${encours[index].niveau}</em></span>
                            <span><img src="../image/icon/clock.png" alt="niveau" class="icon"><em>${encours[index].duree} heures</em></span>
                        </div>

                        <div class="auteur">
                            <div class="image-auteur">
                                <img src="${encours[index].auteur.url_image}" alt="auteur-image">
                            </div>
                            <div class="info-auteur">
                                <h3>${encours[index].auteur.nom} ${encours[index].auteur.prenom}</h3>
                                <p>bio: ${encours[index].auteur.biographie}</p>
                                <p>mail: ${encours[index].auteur.mail}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }

    }else{
        location.href = "/index.html";
    }
}

dashboardStudent(studentToken);



document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("update")) {
        console.log(e.target.id);
    }
    
    if (e.target.classList.contains("delete")) {
        console.log(e.target.id);
        const result = await fetch(`https://hack3shcool.onrender.com:8000/dashboard/student/cours/${e.target.id}/erase`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${studentToken}`
            }
        });
        console.log(result);
        
        if (result.status == 200) {
            const cours = document.getElementById(`${e.target.id}`);
            cours.parentElement.removeChild(cours);
        }
    }

});

document.addEventListener("click", (e) => {
    const coursId = e.target.closest(".cours").id;
    
    localStorage.setItem("coursId", coursId);

    location.href = "/cours/detail.html";
});
