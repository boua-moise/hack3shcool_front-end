const token1 = sessionStorage.getItem("token");
const typeUser = localStorage.getItem("typeUser");


console.log(location.pathname);

const logoUser = document.querySelector("a.none");
const btnAuth = document.querySelectorAll("a.auth-botton");
const initUser = document.querySelector("div.user");
const navigate = document.querySelector("div#teacher");

const visiteur = document.getElementById("visiteur");
const teacher = document.getElementById("teacher");
const student = document.getElementById("student");



const link = document.getElementById("index");

let donnee;

async function getUser(token) {
    const result = await fetch("https://hack3shcool.onrender.com/auth/", {
    "method":"GET",
    "headers":{
        "content-type": "application/json",
        "Authorization":  `Bearer ${token}`
    }
    });
    
    if (result.status == 200) {
        donnee = await result.json()
        
        btnAuth[0].classList.add('none');
        btnAuth[1].classList.add('none');
        logoUser.classList.remove('none');
        const image = document.createElement("img");
        image.src = `${donnee.url_image}`;
        initUser.appendChild(image);

        if (donnee.role == "teacher") {
            visiteur.parentElement.removeChild(visiteur);
            student.parentElement.removeChild(student);
            teacher.style.display = "flex";
            if (location.pathname == "/hack3shcool_front-end/index.html") {
                link.href = "/";
                link.style.display = "none";
            }
        }else{
            visiteur.parentElement.removeChild(visiteur);
            teacher.parentElement.removeChild(teacher);
            student.style.display = "flex";
        }
        displayPage();
    }else if (result.status == 403) {
        sessionStorage.clear();
        displayPage();
    }
    else{
        if (location.pathname != '/hack3shcool_front-end/index.html' 
            && location.pathname != '/hack3shcool_front-end/cours/list_cours.html' 
            && location.pathname != '/hack3shcool_front-end/cours/detail.html' 
            && location.pathname != '/hack3shcool_front-end/authentication/user.html'
        ) {
            location.href = '/hack3shcool_front-end/index.html';
        }else{
            displayPage();
        }
    }
}

getUser(token1)


function displayPage() {
    setTimeout(() => {
        document.querySelector(".loader").style.display = "none";
        document.querySelector(".main").style.display = "flex";
        const userStudent = document.getElementById("user-student");
        const userTeacher = document.getElementById("user-teacher");

        if (location.pathname == "/hack3shcool_front-end/authentication/user.html") {
            if (typeUser == "teacher") {
                console.log("ok");
                
                userTeacher.classList.add("teacher");
            } else {
                console.log("ok");
                userStudent.classList.add("student");
            }
        }
    }, 1000)
}

document.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target.id == "user-teacher") {
        localStorage.setItem("typeUser", "teacher");
    }
    if(e.target.id == "user-student"){
        localStorage.setItem("typeUser", "student");
    }
})
