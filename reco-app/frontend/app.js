const API_URL = 'http://localhost:3000/api/recommendations';

async function fetchRecos() {
  const res = await fetch(API_URL);
  const data = await res.json();
  const list = document.getElementById('recoList');
  list.innerHTML = '';

  data.forEach((reco) => {
    const div = document.createElement('div');
    div.className = 'reco';
    div.innerHTML = `
      <h3>[${reco.type}] ${reco.titre}</h3>
      <p>${reco.description}</p>
      <p><strong>Par:</strong> ${reco.auteur} | 🕓 ${new Date(reco.date).toLocaleString()}</p>
      <div>
        <h4>Commentaires:</h4>
        ${reco.commentaires.map(c => `<div class="comment"><b>${c.auteur}:</b> ${c.texte}</div>`).join('')}
      </div>
      <form onsubmit="addComment(event, '${reco._id}')">
        <input type="text" placeholder="Ton nom" name="auteur" required />
        <input type="text" placeholder="Ton commentaire" name="texte" required />
        <button type="submit">Commenter</button>
      </form>
    `;
    list.appendChild(div);
  });
}

document.getElementById('recoForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const reco = {
    auteur: document.getElementById('auteur').value,
    type: document.getElementById('type').value,
    titre: document.getElementById('titre').value,
    description: document.getElementById('description').value,
  };
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reco),
  });
  e.target.reset();
  fetchRecos();
});

async function addComment(e, id) {
  e.preventDefault();
  const auteur = e.target.auteur.value;
  const texte = e.target.texte.value;

  await fetch(`${API_URL}/${id}/comment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ auteur, texte }),
  });

  fetchRecos();
}

fetchRecos();
