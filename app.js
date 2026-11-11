// Controlador Interactivo de Boleta de Quini 6 y Resultados Oficiales

const DRAWS = [
  {
    number: "3320",
    date: "08/11/2026",
    label: "Sorteo 3320 (Domingo 8 de Noviembre de 2026)",
    pozo_proximo: "$ 6.200.000.000",
    tradicional: {
      balls: [4, 11, 19, 23, 31, 42],
      winners6: "Vacante",
      prize6: "$ 1.250.000.000",
      winners5: 28,
      prize5: "$ 1.480.000 c/u"
    },
    segunda: {
      balls: [2, 15, 18, 27, 33, 40],
      winners6: "1 ganador (Córdoba)",
      prize6: "$ 890.000.000",
      winners5: 35,
      prize5: "$ 1.150.000 c/u"
    },
    revancha: {
      balls: [7, 14, 22, 28, 36, 44],
      winners6: "Vacante",
      prize6: "$ 2.450.000.000",
      winners5: null,
      prize5: null
    },
    siempre_sale: {
      balls: [9, 12, 17, 26, 35, 41],
      winners6: null,
      prize6: null,
      winners5: 38,
      prize5: "$ 4.150.000 c/u (con 5 aciertos)"
    }
  },
  {
    number: "3319",
    date: "04/11/2026",
    label: "Sorteo 3319 (Miércoles 4 de Noviembre de 2026)",
    pozo_proximo: "$ 5.800.000.000",
    tradicional: {
      balls: [1, 8, 14, 25, 30, 39],
      winners6: "Vacante",
      prize6: "$ 1.100.000.000",
      winners5: 19,
      prize5: "$ 1.850.000 c/u"
    },
    segunda: {
      balls: [5, 12, 19, 24, 38, 43],
      winners6: "Vacante",
      prize6: "$ 750.000.000",
      winners5: 22,
      prize5: "$ 1.320.000 c/u"
    },
    revancha: {
      balls: [3, 16, 21, 29, 34, 45],
      winners6: "Vacante",
      prize6: "$ 2.200.000.000",
      winners5: null,
      prize5: null
    },
    siempre_sale: {
      balls: [6, 11, 20, 27, 33, 40],
      winners6: null,
      prize6: null,
      winners5: 42,
      prize5: "$ 3.800.000 c/u (con 5 aciertos)"
    }
  },
  {
    number: "3318",
    date: "01/11/2026",
    label: "Sorteo 3318 (Domingo 1 de Noviembre de 2026)",
    pozo_proximo: "$ 5.400.000.000",
    tradicional: {
      balls: [0, 10, 17, 22, 35, 41],
      winners6: "Vacante",
      prize6: "$ 980.000.000",
      winners5: 31,
      prize5: "$ 1.200.000 c/u"
    },
    segunda: {
      balls: [7, 13, 20, 28, 31, 37],
      winners6: "Vacante",
      prize6: "$ 690.000.000",
      winners5: 26,
      prize5: "$ 1.100.000 c/u"
    },
    revancha: {
      balls: [2, 9, 15, 23, 36, 42],
      winners6: "Vacante",
      prize6: "$ 1.950.000.000",
      winners5: null,
      prize5: null
    },
    siempre_sale: {
      balls: [4, 14, 18, 25, 32, 44],
      winners6: null,
      prize6: null,
      winners5: 29,
      prize5: "$ 4.500.000 c/u (con 5 aciertos)"
    }
  }
];

let selectedDraw = DRAWS[0];
let userTicket = new Set(); // Stores integers 0..45

function pad2(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

function initDrawSelect() {
  const sel = document.getElementById("drawSelect");
  if (!sel) return;
  sel.innerHTML = "";
  DRAWS.forEach((d, idx) => {
    const opt = document.createElement("option");
    opt.value = idx;
    opt.textContent = d.label;
    if (idx === 0) opt.selected = true;
    sel.appendChild(opt);
  });
}

function initKeyboard() {
  const grid = document.getElementById("numberGrid");
  if (!grid) return;
  grid.innerHTML = "";
  for (let i = 0; i <= 45; i++) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "key-ball";
    btn.id = `key-${i}`;
    btn.textContent = pad2(i);
    btn.addEventListener("click", () => toggleNumber(i));
    grid.appendChild(btn);
  }
}

function toggleNumber(num) {
  if (userTicket.has(num)) {
    userTicket.delete(num);
  } else {
    if (userTicket.size >= 6) {
      // Alert max 6
      const countEl = document.getElementById("ticketCounter");
      countEl.style.color = "#ef4444";
      setTimeout(() => { countEl.style.color = "var(--text-muted)"; }, 800);
      return;
    }
    userTicket.add(num);
  }
  updateUI();
}

function clearTicket() {
  userTicket.clear();
  updateUI();
}

function quickRandom() {
  userTicket.clear();
  while (userTicket.size < 6) {
    const r = Math.floor(Math.random() * 46);
    userTicket.add(r);
  }
  updateUI();
}

function luckyStats() {
  // Los números históricamente más frecuentes del Quini 6
  const hot = [0, 11, 14, 18, 23, 35];
  userTicket.clear();
  hot.forEach(n => userTicket.add(n));
  updateUI();
}

function updateUI() {
  // 1. Update keyboard styles
  for (let i = 0; i <= 45; i++) {
    const btn = document.getElementById(`key-${i}`);
    if (btn) btn.classList.toggle("selected", userTicket.has(i));
  }

  // 2. Update ticket counter & balls strip
  document.getElementById("ticketCounter").textContent = `${userTicket.size} / 6 números elegidos`;
  const ballsWrap = document.getElementById("ticketBalls");
  ballsWrap.innerHTML = "";

  const sortedUser = Array.from(userTicket).sort((a, b) => a - b);
  for (let i = 0; i < 6; i++) {
    const b = document.createElement("div");
    if (i < sortedUser.length) {
      b.className = "ball";
      b.textContent = pad2(sortedUser[i]);
    } else {
      b.className = "ball empty";
      b.textContent = "--";
    }
    ballsWrap.appendChild(b);
  }

  // 3. Match against current draw modalities
  renderModality("modTradicional", selectedDraw.tradicional, "Tradicional");
  renderModality("modSegunda", selectedDraw.segunda, "La Segunda");
  renderModality("modRevancha", selectedDraw.revancha, "La Revancha");
  renderModality("modSiempreSale", selectedDraw.siempre_sale, "Siempre Sale");
}

function renderModality(containerId, data, modalityName) {
  const container = document.getElementById(containerId);
  if (!container || !data) return;

  const ballsWrap = container.querySelector(".modality-balls");
  const badge = container.querySelector(".hit-badge");
  ballsWrap.innerHTML = "";

  let hits = 0;
  data.balls.forEach(ballNum => {
    const isHit = userTicket.has(ballNum);
    if (isHit) hits++;

    const b = document.createElement("div");
    b.className = `ball ${isHit ? "matched" : (userTicket.size > 0 ? "dimmed" : "")}`;
    b.textContent = pad2(ballNum);
    ballsWrap.appendChild(b);
  });

  // Badge text and styling
  if (userTicket.size === 0) {
    badge.className = "hit-badge none";
    badge.textContent = "Ingresá tus números";
    container.classList.remove("has-prize");
  } else if (hits === 6) {
    badge.className = "hit-badge winner";
    badge.textContent = "🏆 ¡6 ACIERTOS! ¡POZO MAYOR!";
    container.classList.add("has-prize");
  } else if (hits === 5) {
    badge.className = "hit-badge winner";
    badge.textContent = "🎉 ¡5 ACIERTOS! ¡PREMIO!";
    container.classList.add("has-prize");
  } else if (hits === 4 && modalityName !== "La Revancha") {
    badge.className = "hit-badge winner";
    badge.textContent = "✨ 4 Aciertos (Premio menor)";
    container.classList.add("has-prize");
  } else {
    badge.className = "hit-badge none";
    badge.textContent = `${hits} ${hits === 1 ? 'acierto' : 'aciertos'}`;
    container.classList.remove("has-prize");
  }
}

// Next draw countdown
function updateCountdown() {
  const now = new Date();
  // Quini 6 draws: Wednesday (day 3) at 21:15, and Sunday (day 0) at 21:15 Argentina (UTC-3)
  // Find next target date
  const target = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const min = now.getMinutes();

  let daysUntil = 0;
  if (day === 3) { // Wednesday
    if (hour < 21 || (hour === 21 && min < 15)) daysUntil = 0;
    else daysUntil = 4; // next Sunday
  } else if (day === 0) { // Sunday
    if (hour < 21 || (hour === 21 && min < 15)) daysUntil = 0;
    else daysUntil = 3; // next Wednesday
  } else if (day < 3) {
    daysUntil = 3 - day;
  } else {
    daysUntil = 7 - day;
  }

  target.setDate(now.getDate() + daysUntil);
  target.setHours(21, 15, 0, 0);

  const diff = target - now;
  if (diff <= 0) {
    document.getElementById("countdownVal").textContent = "¡Sorteo en curso!";
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  document.getElementById("countdownVal").textContent = `${d}d ${pad2(h)}h ${pad2(m)}m ${pad2(s)}s`;
}

// Copy & WhatsApp share
function copyTicket() {
  if (userTicket.size === 0) {
    alert("Primero seleccioná tus números en el teclado.");
    return;
  }
  const sorted = Array.from(userTicket).sort((a, b) => a - b).map(pad2).join(" - ");
  const txt = `🎰 Mi Jugada Quini 6:\n[ ${sorted} ]\nControlá tu boleta al instante en: https://sebiglesias.com.ar/quini-6/`;

  navigator.clipboard.writeText(txt).then(() => {
    const btn = document.getElementById("btnCopy");
    const orig = btn.textContent;
    btn.textContent = "✅ ¡Copiado al portapapeles!";
    setTimeout(() => { btn.textContent = orig; }, 2000);
  });
}

function shareWa() {
  if (userTicket.size === 0) {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent("🎰 Controlá los resultados y tu boleta de Quini 6 en: https://sebiglesias.com.ar/quini-6/")}`, '_blank');
    return;
  }
  const sorted = Array.from(userTicket).sort((a, b) => a - b).map(pad2).join(" - ");
  const txt = `🎰 Mi jugada del Quini 6 es: ${sorted}\nControlá los resultados y aciertos en: https://sebiglesias.com.ar/quini-6/`;
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(txt)}`, '_blank');
}

document.addEventListener("DOMContentLoaded", () => {
  initDrawSelect();
  initKeyboard();
  updateUI();
  updateCountdown();
  setInterval(updateCountdown, 1000);

  document.getElementById("drawSelect").addEventListener("change", (e) => {
    selectedDraw = DRAWS[parseInt(e.target.value, 10)] || DRAWS[0];
    updateUI();
  });

  document.getElementById("btnRandom").addEventListener("click", quickRandom);
  document.getElementById("btnLucky").addEventListener("click", luckyStats);
  document.getElementById("btnClear").addEventListener("click", clearTicket);
  document.getElementById("btnCopy").addEventListener("click", copyTicket);
  document.getElementById("btnWa").addEventListener("click", shareWa);
});
