const tokenTeacher = sessionStorage.getItem("token");


async function getUser(token) {
    const result = await fetch("http://hack3shcool.onrender.com:8000/auth/", {
    "method":"GET",
    "headers":{
        "content-type": "application/json",
        "Authorization":  `Bearer ${token}`
    }
    });
    
    if (result.status == 200) {
        donnee = await result.json()

        if (donnee.role != "teacher") {
          location.href = "/index.html";
      }
    }
}

getUser(tokenTeacher);

const btnAddSection = document.getElementById("add");
const sectionContainer = document.querySelector(".sections-container");
let sectionCount = 0;
let editorJsElement = {};
btnAddSection.addEventListener('click', (e) => {
  sectionCount++;
  const editorId = `editor-${sectionCount}`;

  const blockSection = document.createElement("div");
  blockSection.classList.add("block-section");

  const blockTitreSection = document.createElement("div");
  blockTitreSection.classList.add("champ-form");

  const blockImageSection = document.createElement("div");
  blockImageSection.classList.add("champ-form");

  const labelTitreSection = document.createElement("label");
  labelTitreSection.setAttribute("for", "titre-section");
  labelTitreSection.textContent = `titre de la section ${sectionCount}`;

  const inputSection = document.createElement("input");
  inputSection.setAttribute("type", "text");
  inputSection.setAttribute("name", "titre");
  inputSection.id = "titre-section";
  inputSection.classList.add("section-title-input");
  const charioTitre = document.createElement("br");



  const labelImageSection = document.createElement("label");
  labelImageSection.setAttribute("for", "titre-section");
  labelImageSection.textContent = `ID de la vidéo youtube de la section ${sectionCount}`;

  const inputImageSection = document.createElement("input");
  inputImageSection.setAttribute("type", "text");
  inputImageSection.setAttribute("name", "titre");
  inputImageSection.id = "titre-section";
  inputImageSection.classList.add("section-image-input");
  const charioImage = document.createElement("br");

  blockTitreSection.appendChild(labelTitreSection);
  blockTitreSection.appendChild(charioTitre);
  blockTitreSection.appendChild(inputSection);

  blockImageSection.appendChild(labelImageSection);
  blockImageSection.appendChild(charioImage);
  blockImageSection.appendChild(inputImageSection);

  const editorTemplate = document.createElement("div");
  editorTemplate.classList.add("editor");
  editorTemplate.id = editorId;


  blockSection.appendChild(blockTitreSection);
  blockSection.appendChild(blockImageSection);
  blockSection.appendChild(editorTemplate);

  sectionContainer.appendChild(blockSection);
  
  editorJsElement[editorId] = new EditorJS({ 
  holder: editorTemplate, 
   tools: {
    header: Header,
    List: {
      class: EditorjsList,
      inlineToolbar: true,
      config: {
        defaultStyle: 'unordered'
      },
    },
    image: {
      class: ImageTool,
      config: {
        endpoints: {
          byFile: 'http://hack3shcool.onrender.com:8000/dashboard/uploadFile', // Your backend file uploader endpoint
          byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
        }
      }
    }
  },
  placeholder: `Contenu de la section... ${sectionCount}`
});
});


async function collectSections() {
const sections = [];

for (const [editorId, editor] of Object.entries(editorJsElement)) {
  
    const wrapper = document.getElementById(editorId).parentElement;
    const title = wrapper.querySelector(".section-title-input").value;
    const image = wrapper.querySelector(".section-image-input").value;
    const contenu = await editor.save();
    
    
    sections.push({
    titre: title,
    url_image:image,
    contenu: JSON.stringify(contenu) 
    });
}

return sections;
}


document.getElementById("submit-course-btn").addEventListener("click", async () => {
  const sections = await collectSections();

  // Exemple : structure du cours à envoyer au backend
  const coursData = {
    titre: document.getElementById("titre").value,  // si tu as un champ pour le titre du cours
    description: document.getElementById("description").value,
    url_image: document.getElementById("link-video").value,
    niveau: document.getElementById("level").value,
    duree: document.getElementById("duree").value,
    sections: sections
  };
  console.log(coursData);

  // Envoie vers le backend (FastAPI ou autre)
  const result = await fetch("http://hack3shcool.onrender.com:8000/dashboard/teacher/addcours", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Authorization":  `Bearer ${tokenTeacher}`
    },
    body: JSON.stringify(coursData)
  });

  console.log("result:",result);

  if (result.status == 200) {

    const response = await result.json();
    const imageCours = document.getElementById("image");
    const cleanForm = new FormData();
    const fichier = imageCours.files[0];
    cleanForm.append("image", fichier);
    console.log(Object.fromEntries(cleanForm));
    const resultat = await fetch(`http://hack3shcool.onrender.com:8000/dashboard/image/cours/${response.id}`, {
        "method":"POST",
        "body": cleanForm,
    });
    console.log(resultat);
    if (resultat.status == 200) {
      location.href = "/dashboard/teacher.html";
    }
    // 
  }
  
});
