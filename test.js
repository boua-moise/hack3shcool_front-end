
// let date;
// fetch("http://192.168.1.188:8000/cours/list")
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error("Erreur:", error));

// document.addEventListener("DOMContentLoaded", async () => {
//     let cours = [];

// async function getData() {
//     try {
//         const response = await fetch("http://192.168.1.188:8000/cours/list");
//         const data = await response.json();
//         cours = data;  // assign the result directly to cours
//         return cours;
//     } catch (error) {
//         console.error("Failed to fetch cours:", error);
//     }
// }

// // Call the function and log the data
// // getData().then(data => {
// //     console.log("Cours loaded:", data);
// // });
// let test = await getData()
// console.log("test:",test);

// document.writeln(test.all_cours[0].auteur.nom)
// })



let sectionCount = 0;
const editors = {}; // stocke toutes les instances EditorJS

document.getElementById("add-section-btn").addEventListener("click", () => {
sectionCount++;
const sectionId = `section-${sectionCount}`;
const editorId = `editor-${sectionCount}`;

// Créer le bloc de section
const sectionWrapper = document.createElement("div");
sectionWrapper.classList.add("section-wrapper");
sectionWrapper.id = sectionId;

// Champ titre de la section
const titleInput = document.createElement("input");
titleInput.setAttribute("type", "text");
titleInput.setAttribute("placeholder", `Titre de la section ${sectionCount}`);
titleInput.classList.add("section-title-input");

// Div pour Editor.js
const editorDiv = document.createElement("div");
editorDiv.id = editorId;
editorDiv.classList.add("editor-container");

// Bouton de suppression
const deleteBtn = document.createElement("button");
deleteBtn.textContent = "Supprimer cette section";
deleteBtn.classList.add("delete-section-btn");

deleteBtn.addEventListener("click", () => {
    delete editors[editorId];
    sectionWrapper.remove();
});

// Ajouter les éléments dans le DOM
sectionWrapper.appendChild(titleInput);
sectionWrapper.appendChild(editorDiv);
sectionWrapper.appendChild(deleteBtn);
document.getElementById("sections-container").appendChild(sectionWrapper);

// Initialiser Editor.js
editors[editorId] = new EditorJS({
    holder: editorId,
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
          byFile: 'http://192.168.1.188:8000/dashboard/uploadFile', // Your backend file uploader endpoint
          byUrl: 'http://192.168.1.188:8008/fetchUrl', // Your endpoint that provides uploading by Url
        }
      }
    }
  },
    placeholder: "Contenu de la section..."
});
});

// Pour récupérer toutes les données (titre + contenu)
async function collectSections() {
const sections = [];

for (const [editorId, editor] of Object.entries(editors)) {
    console.log("valeur",editorId, editor);
    const wrapper = document.getElementById(editorId).parentElement;
    const title = wrapper.querySelector(".section-title-input").value;
    const contenu = await editor.save();
    
    sections.push({
    titre: title,
    contenu: contenu
    });
}

return sections;
}


document.getElementById("submit-course-btn").addEventListener("click", async () => {
  const sections = await collectSections();

  console.log("Sections collectées :", sections);

  // Exemple : structure du cours à envoyer au backend
  const coursData = {
    titre: "PYTON",  // si tu as un champ pour le titre du cours
    sections: sections
  };
  console.log(coursData);
  
  // Envoie vers le backend (FastAPI ou autre)
//   fetch("/api/cours", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(coursData)
//   })
//   .then(response => response.json())
//   .then(data => {
//     alert("Cours enregistré avec succès !");
//     console.log(data);
//   })
//   .catch(error => {
//     console.error("Erreur lors de l'envoi :", error);
//   });
});








// <script>
//   function scrollToTop() {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth' // pour un défilement fluide
//     });
//   }
// </script>
