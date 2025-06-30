const coursId = localStorage.getItem("coursId");

const tokenUser = sessionStorage.getItem("token");

const main = document.querySelector("main");

const provenance = document.referrer
console.log(provenance);



if (coursId) {
    detailCours()
}else{
    location.href = "/index.html"
}

async function detailCours() {
    result = await fetch(`http://localhost:8000/cours/${coursId}/details`, {
        method: "GET",
        "content-type": "application/json"
    });

    const data = await result.json();
    
    const coursDetail = data.detail_cours;
    

    main.innerHTML = `
                <h1>${coursDetail.titre}</h1>

                <div class="icon">
                    <span><img src="../image/icon/signal1.png" alt="niveau" class="icon"><em>${coursDetail.niveau}</em></span>
                    <span><img src="../image/icon/clock.png" alt="niveau" class="icon"><em>${coursDetail.duree} heures</em></span> 
                </div>

                <div class="video">
                    <iframe src="https://youtube.com/embed/${coursDetail.url_image}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>

                    </iframe>
                </div>

                <p class="description">
                    ${coursDetail.description}
                </p>

                <h2 class="table">Table des matières</h2>

                <ul>

                </ul>

                <div class="cont">
                    <h2 class="contrib">Contributeurs</h2>

                    <div class="auteur">
                        <div class="image-auteur">
                            <img src="${coursDetail.auteur.url_image}" alt="auteur-image">
                        </div>
                        <div class="info-auteur">
                            <h3>${coursDetail.auteur.nom} ${coursDetail.auteur.prenom}</h3>
                            <p>bio: ${coursDetail.auteur.biographie}</p>
                            <p>mail: ${coursDetail.auteur.mail}</p>
                        </div>
                    </div>

                    <div class="started">
                        <div>
                        </div>
                        <div class="btn-start cta" onclick="registerCours()">
                            Débuter
                        </div>
                    </div>

                </div>
    `

    const ul = document.querySelector('ul');
    const sections = coursDetail.sections
    for (let index = 0; index < sections.length; index++) {
        const li = document.createElement("li");
        li.textContent = `${sections[index].titre}`;
        ul.appendChild(li);
    }

}



async function registerCours() {
    const result = await fetch(`http://localhost:8000/cours/${coursId}/register`, {
        method: "POST",
        headers:{
            "content-type": "application/json",
            "Authorization": `Bearer ${tokenUser}`,
        }
    });

    console.log(result);

    if (result.status == 401) {
        alert("Veuillez vous connecter svp");
    }

    if (result.status == 200 || result.status == 409) {
        location.href = "/cours/cours.html" 
    }

}