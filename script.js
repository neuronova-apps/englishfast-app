const vocabBank = [
  { w: 'HOUSE', cat: 'Home', a: ['Casa', 'Mesa', 'Puerta', 'Calle'], c: 'Casa' },
  { w: 'BOOK', cat: 'Study', a: ['Libro', 'Cuaderno', 'Lápiz', 'Clase'], c: 'Libro' },
  { w: 'WATER', cat: 'Daily life', a: ['Agua', 'Comida', 'Vaso', 'Jugo'], c: 'Agua' },
  { w: 'FRIEND', cat: 'People', a: ['Amigo/a', 'Familia', 'Vecino/a', 'Profesor/a'], c: 'Amigo/a' },
  { w: 'LEARN', cat: 'Actions', a: ['Aprender', 'Escuchar', 'Escribir', 'Leer'], c: 'Aprender' },
  { w: 'SCHOOL', cat: 'Study', a: ['Escuela', 'Oficina', 'Tienda', 'Parque'], c: 'Escuela' },
  { w: 'MORNING', cat: 'Time', a: ['Mañana', 'Tarde', 'Noche', 'Semana'], c: 'Mañana' },
  { w: 'HAPPY', cat: 'Feelings', a: ['Feliz', 'Cansado/a', 'Triste', 'Enojado/a'], c: 'Feliz' },
  { w: 'FAMILY', cat: 'People', a: ['Familia', 'Amistad', 'Trabajo', 'Casa'], c: 'Familia' },
  { w: 'WRITE', cat: 'Actions', a: ['Escribir', 'Hablar', 'Escuchar', 'Caminar'], c: 'Escribir' },
  { w: 'FOOD', cat: 'Daily life', a: ['Comida', 'Bebida', 'Plato', 'Cocina'], c: 'Comida' },
  { w: 'TODAY', cat: 'Time', a: ['Hoy', 'Ayer', 'Mañana', 'Ahora'], c: 'Hoy' }
];

const grammarBank = [
  { s: 'I ___ a student.', a: ['am', 'is', 'are'], c: 'am', e: 'Con I se usa am.' },
  { s: 'She ___ my friend.', a: ['am', 'is', 'are'], c: 'is', e: 'Con she se usa is.' },
  { s: 'They ___ at home.', a: ['am', 'is', 'are'], c: 'are', e: 'Con they se usa are.' },
  { s: 'He ___ English every day.', a: ['study', 'studies', 'studying'], c: 'studies', e: 'En presente simple, he añade -s.' },
  { s: 'We ___ coffee in the morning.', a: ['drink', 'drinks', 'drinking'], c: 'drink', e: 'Con we se usa la forma base.' },
  { s: 'This ___ my book.', a: ['am', 'is', 'are'], c: 'is', e: 'This se usa con is.' }
];

const STORAGE_KEYS = {
  vocabCorrect: 'ef-vc',
  vocabAnswered: 'ef-va',
  grammarCorrect: 'ef-gc',
  grammarAnswered: 'ef-ga'
};

const LEGACY_STORAGE_KEYS = ['englishfast-score', 'englishfast-answered'];

const vocabCategory = document.querySelector('#vocabCategory');
const word = document.querySelector('#questionWord');
const answers = document.querySelector('#answers');
const feedback = document.querySelector('#feedback');
const nextQuestion = document.querySelector('#nextQuestion');
const grammarSentence = document.querySelector('#grammarSentence');
const grammarAnswers = document.querySelector('#grammarAnswers');
const grammarFeedback = document.querySelector('#grammarFeedback');
const nextGrammar = document.querySelector('#nextGrammar');
const vocabProgress = document.querySelector('#vocabProgress');
const grammarProgress = document.querySelector('#grammarProgress');
const progressAccuracy = document.querySelector('#progressAccuracy');
const reviewErrors = document.querySelector('#reviewErrors');
const resetProgress = document.querySelector('#resetProgress');
const storageNotice = document.querySelector('#storageNotice');
const menu = document.querySelector('.menu');
const nav = document.querySelector('#nav');

let storageAvailable = true;

function readStoredNumber(key) {
  if (!storageAvailable) return 0;

  try {
    return Number(localStorage.getItem(key) || 0) || 0;
  } catch {
    storageAvailable = false;
    return 0;
  }
}

const progress = {
  vocabCorrect: readStoredNumber(STORAGE_KEYS.vocabCorrect),
  vocabAnswered: readStoredNumber(STORAGE_KEYS.vocabAnswered),
  grammarCorrect: readStoredNumber(STORAGE_KEYS.grammarCorrect),
  grammarAnswered: readStoredNumber(STORAGE_KEYS.grammarAnswered)
};

function shuffle(list) {
  const copy = [...list];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  return copy;
}

let vocabDeck = shuffle(vocabBank);
let vocabIndex = 0;
let grammarDeck = shuffle(grammarBank);
let grammarIndex = 0;

function renderProgress() {
  const totalAnswered = progress.vocabAnswered + progress.grammarAnswered;
  const totalCorrect = progress.vocabCorrect + progress.grammarCorrect;

  if (vocabProgress) {
    vocabProgress.textContent = `${progress.vocabCorrect} / ${progress.vocabAnswered}`;
  }

  if (grammarProgress) {
    grammarProgress.textContent = `${progress.grammarCorrect} / ${progress.grammarAnswered}`;
  }

  if (progressAccuracy) {
    progressAccuracy.textContent = totalAnswered
      ? `${Math.round((totalCorrect / totalAnswered) * 100)}%`
      : '0%';
  }

  if (storageNotice) {
    storageNotice.textContent = storageAvailable
      ? 'Progreso guardado localmente en este navegador.'
      : 'El almacenamiento local no está disponible; el progreso se conservará solo durante esta sesión.';
  }
}

function saveProgress() {
  if (storageAvailable) {
    try {
      Object.entries(STORAGE_KEYS).forEach(([property, key]) => {
        localStorage.setItem(key, String(progress[property]));
      });
    } catch {
      storageAvailable = false;
    }
  }

  renderProgress();
}

function renderOptions(container, options, onSelect) {
  if (!container) return;

  container.innerHTML = '';

  shuffle(options).forEach(option => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = option;
    button.addEventListener('click', () => onSelect(option, button));
    container.appendChild(button);
  });
}

function renderVocab() {
  if (!word || !answers || !feedback) return;

  const question = vocabDeck[vocabIndex];
  word.textContent = question.w;

  if (vocabCategory) {
    vocabCategory.textContent = `VOCABULARY · ${question.cat}`;
  }

  feedback.textContent = 'Selecciona la traducción correcta.';
  renderOptions(answers, question.a, (option, button) => checkVocab(option, button, question));
}

function checkVocab(option, button, question) {
  const buttons = [...answers.querySelectorAll('button')];
  if (buttons.some(item => item.disabled)) return;

  buttons.forEach(item => {
    item.disabled = true;
  });

  progress.vocabAnswered += 1;

  if (option === question.c) {
    progress.vocabCorrect += 1;
    button.classList.add('correct');
    feedback.textContent = `Correcto. ${question.w} significa ${question.c}.`;
  } else {
    button.classList.add('wrong');
    buttons.find(item => item.textContent === question.c)?.classList.add('correct');
    feedback.textContent = `La respuesta correcta es ${question.c}.`;
  }

  saveProgress();
}

function renderGrammar() {
  if (!grammarSentence || !grammarAnswers || !grammarFeedback) return;

  const question = grammarDeck[grammarIndex];
  grammarSentence.textContent = question.s;
  grammarFeedback.textContent = 'Selecciona la opción correcta.';
  renderOptions(grammarAnswers, question.a, (option, button) => checkGrammar(option, button, question));
}

function checkGrammar(option, button, question) {
  const buttons = [...grammarAnswers.querySelectorAll('button')];
  if (buttons.some(item => item.disabled)) return;

  buttons.forEach(item => {
    item.disabled = true;
  });

  progress.grammarAnswered += 1;

  if (option === question.c) {
    progress.grammarCorrect += 1;
    button.classList.add('correct');
    grammarFeedback.textContent = `Correcto. ${question.e}`;
  } else {
    button.classList.add('wrong');
    buttons.find(item => item.textContent === question.c)?.classList.add('correct');
    grammarFeedback.textContent = `Respuesta correcta: ${question.c}. ${question.e}`;
  }

  saveProgress();
}

nextQuestion?.addEventListener('click', () => {
  vocabIndex += 1;

  if (vocabIndex >= vocabDeck.length) {
    vocabDeck = shuffle(vocabBank);
    vocabIndex = 0;
  }

  renderVocab();
});

nextGrammar?.addEventListener('click', () => {
  grammarIndex += 1;

  if (grammarIndex >= grammarDeck.length) {
    grammarDeck = shuffle(grammarBank);
    grammarIndex = 0;
  }

  renderGrammar();
});

reviewErrors?.addEventListener('click', () => {
  if (storageNotice) {
    storageNotice.textContent = 'El repaso adaptativo de errores se incorporará en la siguiente ampliación del banco.';
  }
});

resetProgress?.addEventListener('click', () => {
  progress.vocabCorrect = 0;
  progress.vocabAnswered = 0;
  progress.grammarCorrect = 0;
  progress.grammarAnswered = 0;

  if (storageAvailable) {
    try {
      [...Object.values(STORAGE_KEYS), ...LEGACY_STORAGE_KEYS].forEach(key => {
        localStorage.removeItem(key);
      });
    } catch {
      storageAvailable = false;
    }
  }

  renderProgress();
});

menu?.addEventListener('click', () => {
  const isOpen = menu.getAttribute('aria-expanded') === 'true';
  const nextOpen = !isOpen;

  menu.setAttribute('aria-expanded', String(nextOpen));
  menu.setAttribute('aria-label', nextOpen ? 'Cerrar menú' : 'Abrir menú');
  nav?.classList.toggle('open', nextOpen);
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-label', 'Abrir menú');
  });
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav?.classList.contains('open')) {
    nav.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-label', 'Abrir menú');
    menu?.focus();
  }
});

renderVocab();
renderGrammar();
renderProgress();
