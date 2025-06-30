const teacherToken = sessionStorage.getItem("token");

const contenu = document.querySelector("section.items");

async function dashboardTeacher(token) {
    const result = await fetch("https://hack3shcool.onrender.com/dashboard/teacher", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "content-type": "application/json"
        }
    });

    if (result.status == 401) {
        location.href = "/index.html";
    }
    
    if (result.status == 200) {
        let data = await result.json();
        cours = data.cours;
        console.log("cours",cours);
        
        for (let index = 0; index < cours.length; index++) {

            contenu.innerHTML += 
            `
                <div class="cours" id="${cours[index].id}">
                    <div class="image">
                        <img src="${cours[index].image}" alt="image-cours">
                    </div>
                    <div class="info">
                        <h2>${cours[index].titre}</h2>
                        <div class="icon">
                            <span><img src="../image/icon/signal1.png" alt="niveau" class="icon"><em>${cours[index].niveau}</em></span>
                            <span><img src="../image/icon/clock.png" alt="niveau" class="icon"><em>${cours[index].duree} heures</em></span>
                        </div>
                        <div class="btn">
                            <div class="update" id="${cours[index].id}">UPDATE</div>
                            <div class="delete" id="${cours[index].id}">DELETE</div>
                        </div>
                    </div>
                </div>
            `
        }
    }
}

dashboardTeacher(teacherToken);


const update = document.querySelectorAll("div.update");
const supprime = document.querySelector("div.delete");

document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("update")) {
        console.log(e.target.id);
    }
    
    if (e.target.classList.contains("delete")) {

        const result = await fetch(`https://hack3shcool.onrender.com/dashboard/teacher/cours/${e.target.id}/delete`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${teacherToken}`
            }
        });
        
        if (result.status == 200) {
            const cours = document.getElementById(`${e.target.id}`);
            cours.parentElement.removeChild(cours);
        }
    }

});
