const token = sessionStorage.getItem("token");
const id = localStorage.getItem("coursId");
const titreSection = document.querySelector("h1.titre");
const tagVideo = document.querySelector("iframe");
const contenueSection = document.querySelector("section.contenue");

let sections;
let i = 0;
async function cours() {
    result = await fetch(`https://hack3shcool.onrender.com:8000/cours/${id}/view`, {
        method: "GET",
        headers:{
            "content-type": "application/json",
            "Authorization":  `Bearer ${token}`
        }
    })

    console.log(result);
    
    const data = await result.json();

    console.log(data);
    
    const coursStudent = data.cours_complet

    sections = coursStudent.sections

    console.log(coursStudent, sections);

    titreSection.textContent = `${coursStudent.titre}`;
    // tagVideo.src = `${coursStudent}`;

    titreSection.textContent = `${sections[i].titre}`;
    tagVideo.src = `https://youtube.com/embed/${sections[i].url_image}`;
    let contenu = JSON.parse(sections[i].contenu);
    renderEditorContent(contenu);
    console.log(contenu);
    i++;
}

async function changeSection() {

    if (i < sections.length) {
        titreSection.textContent = `${sections[i].titre}`;
        tagVideo.src = `https://youtube.com/embed/${sections[i].url_image}`;
        contenu = JSON.parse(sections[i].contenu);
        renderEditorContent(contenu);
        console.log(contenu);
        i++;
    }else{
        alert("Félicitation vous venez de finir le cours");
        const resulte = await fetch(`https://hack3shcool.onrender.com:8000/cours/${id}/update`, {
            method: "PUT",
            headers:{
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });
        if (resulte.status == 200) {
            location.href = "/dashboard/student.html"
        }
    }
}


cours()

function renderEditorContent(data) {
  const container = document.getElementById('output');
  container.innerHTML = ''; // Nettoyer le contenu précédent

  data.blocks.forEach(block => {
    let html = '';

    switch (block.type) {
      case 'paragraph':
        html = `<p>${block.data.text}</p>`;
        break;

      case 'header':
        html = `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
        break;

      case 'list':
        const tag = block.data.style === 'ordered' ? 'ol' : 'ul';
        html = `<${tag}>${block.data.items.map(item => `<li>${item}</li>`).join('')}</${tag}>`;
        break;

      case 'image':
        html = `
          <div class="image-block">
            <img src="${block.data.file.url}" alt="${block.data.caption || ''}" />
            ${block.data.caption ? `<div class="caption">${block.data.caption}</div>` : ''}
          </div>
        `;
        break;

      case 'quote':
        html = `<blockquote>${block.data.text}<footer>${block.data.caption || ''}</footer></blockquote>`;
        break;

      // Tu peux ajouter d'autres types comme code, embed, etc.
      default:
        console.warn(`Type de bloc non géré : ${block.type}`);
    }

    container.innerHTML += html;
  });
}
