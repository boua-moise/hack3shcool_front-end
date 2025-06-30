const allCours = document.querySelector("section.all_cours");


async function getAllCours() {
    const result = await fetch("https://hack3shcool.onrender.com/cours/list", {
        method: "GET",
        headers:{
            "content-type": "application/json"
        }
    });


    if (result.status == 200) {
        const data = await result.json()
        let cours = data.all_cours
        console.log(cours);
        
        
        for (let index = 0; index < cours.length; index++) {

            allCours.innerHTML += 
            `
                <div class="cours" id="${cours[index].id}">
                    <div class="image">
                        <img src="${cours[index].image}" alt="image-cours">
                    </div>
                    <div class="info">
                        <h2 class="titre">${cours[index].titre}</h2>
                        <div class="icon">
                            <span><img src="../image/icon/signal1.png" alt="niveau" class="icon"><em>${cours[index].niveau}</em></span>
                            <span><img src="../image/icon/clock.png" alt="niveau" class="icon"><em>${cours[index].duree} heures</em></span>
                        </div>

                        <div class="auteur">
                            <div class="image-auteur">
                                <img src="${cours[index].auteur.url_image}" alt="auteur-image">
                            </div>
                            <div class="info-auteur">
                                <h3>${cours[index].auteur.nom} ${cours[index].auteur.prenom}</h3>
                                <p>bio: ${cours[index].auteur.biographie}</p>
                                <p>mail: ${cours[index].auteur.mail}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
    }
    
}

getAllCours()





document.addEventListener("click", (e) => {
    const coursId = e.target.closest(".cours").id;
    
    localStorage.setItem("coursId", coursId);

    location.href = "/hack3shcool_front-end/cours/detail.html";
});
