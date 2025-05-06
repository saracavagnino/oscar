// Estrae il parametro 'squadra' dall'URL
const urlParams = new URLSearchParams(window.location.search);
const squadra = urlParams.get('squadra')?.toUpperCase();

// Definizione delle sequenze per ciascuna squadra
const squadre = {
  A: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  B: [2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 11],
  C: [3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 11],
  D: [4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 11],
  E: [5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 11],
  F: [6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 11],
  G: [7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 11],
  H: [8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 11],
  I: [9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 11],
  J: [10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11],
};

// Mappa delle risorse (immagini/audio) da mostrare per ciascun punto
const media = {
  1: "img/punto_smat.jpg",
  2: "img/antenna.jpg",
  3: "audio/lavatoio.mp3",  // Audio per il lavatoio
  4: "img/bocciofila.jpg",
  5: "img/madonna_cavallero.jpg",
  6: "img/parco_blu.jpg",
  7: "img/pista_ciclabile.jpg",
  8: "img/stefania.jpg",
  9: "img/altalene.jpg",
  10: "img/madonna_palme.jpg",
  11: "img/oscar.jpg"
};

// Mappa degli indizi testuali
const hints = {
  1: "INDIZIO",
  2: "INDIZIO",
  3: "INDIZIO",
  4: "Facendo il giro in senso antiorario, qual è il numero di serie del secondo lampione?",
  5: "INDIZIO",
  6: "INDIZIO",
  7: "INDIZIO",
  8: "INDIZIO",
  9: "INDIZIO",
  10: "INDIZIO",
  11: "INDIZIO FINALE OSCAR"
};

// Recupera i progressi salvati o inizia da capo
let progress = JSON.parse(localStorage.getItem(`progress_${squadra}`)) || {
  currentIndex: 0,
  visited: []
};

// Se la squadra non è valida, mostra errore
if (!squadra || !squadre[squadra]) {
  document.body.innerHTML = "<p>Squadra non valida. Aggiungi '?squadra=A' all'URL.</p>";
} else {
  document.getElementById('game').classList.remove('hidden');
  showPage();
}

// Mostra il contenuto della pagina attuale (audio o immagine, indizio, input)
function showPage() {
  const page = squadre[squadra][progress.currentIndex];

  // Mostra messaggio finale se è l'ultima pagina
  if (page === 11) {
    document.getElementById('finalMessage').classList.remove('hidden');
    document.getElementById('hint').innerText = `Indizio: ${hints[page]}`;
    // Se è il "lavatoio", carica l'audio, altrimenti l'immagine
    if (page === 3) {
      document.getElementById('placeImage').classList.add('hidden');
      const audioElement = document.getElementById('placeAudio');
      audioElement.src = media[page];
      audioElement.classList.remove('hidden');
      audioElement.play();
    } else {
      document.getElementById('placeImage').classList.remove('hidden');
      document.getElementById('placeImage').src = media[page];
      document.getElementById('placeAudio').classList.add('hidden');
    }
    document.getElementById('inputSection').style.display = 'none';
    document.getElementById('feedback').innerText = '';
    document.getElementById("resetButton").style.display = "block";
  } else {
    // Altrimenti mostra l'indizio e il media (immagine o audio)
    document.getElementById('finalMessage').classList.add('hidden');
    document.getElementById('hint').innerText = `${hints[page]}`;
    // Se è il "lavatoio", carica l'audio, altrimenti l'immagine
    if (page === 3) {
      document.getElementById('placeImage').classList.add('hidden');
      const audioElement = document.getElementById('placeAudio');
      audioElement.src = media[page];
      audioElement.classList.remove('hidden');
      audioElement.play();
    } else {
      document.getElementById('placeImage').classList.remove('hidden');
      document.getElementById('placeImage').src = media[page];
      document.getElementById('placeAudio').classList.add('hidden');
    }
    document.getElementById('answer').value = "";
    document.getElementById('feedback').innerText = "";
    document.getElementById('inputSection').style.display = 'block';
    document.getElementById("resetButton").style.display = "none";
  }
}

// Verifica la risposta inserita
function checkAnswer() {
  const answer = document.getElementById('answer').value.trim();
  const page = squadre[squadra][progress.currentIndex];

  if (answer == page) {
    if (!progress.visited.includes(page)) {
      progress.vis
