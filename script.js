const vocabBank = [
  { id: 'house', w: 'HOUSE', cat: 'Home', a: ['Casa', 'Mesa', 'Puerta', 'Calle'], c: 'Casa' },
  { id: 'book', w: 'BOOK', cat: 'Study', a: ['Libro', 'Cuaderno', 'Lápiz', 'Clase'], c: 'Libro' },
  { id: 'water', w: 'WATER', cat: 'Daily life', a: ['Agua', 'Comida', 'Vaso', 'Jugo'], c: 'Agua' },
  { id: 'friend', w: 'FRIEND', cat: 'People', a: ['Amigo/a', 'Familia', 'Vecino/a', 'Profesor/a'], c: 'Amigo/a' },
  { id: 'learn', w: 'LEARN', cat: 'Actions', a: ['Aprender', 'Escuchar', 'Escribir', 'Leer'], c: 'Aprender' },
  { id: 'school', w: 'SCHOOL', cat: 'Study', a: ['Escuela', 'Oficina', 'Tienda', 'Parque'], c: 'Escuela' },
  { id: 'morning', w: 'MORNING', cat: 'Time', a: ['Mañana', 'Tarde', 'Noche', 'Semana'], c: 'Mañana' },
  { id: 'happy', w: 'HAPPY', cat: 'Feelings', a: ['Feliz', 'Cansado/a', 'Triste', 'Enojado/a'], c: 'Feliz' },
  { id: 'family', w: 'FAMILY', cat: 'People', a: ['Familia', 'Amistad', 'Trabajo', 'Casa'], c: 'Familia' },
  { id: 'write', w: 'WRITE', cat: 'Actions', a: ['Escribir', 'Hablar', 'Escuchar', 'Caminar'], c: 'Escribir' },
  { id: 'food', w: 'FOOD', cat: 'Daily life', a: ['Comida', 'Bebida', 'Plato', 'Cocina'], c: 'Comida' },
  { id: 'today', w: 'TODAY', cat: 'Time', a: ['Hoy', 'Ayer', 'Mañana', 'Ahora'], c: 'Hoy' }
];

const grammarBank = [
  { id: 'be-i', s: 'I ___ a student.', a: ['am', 'is', 'are'], c: 'am', e: 'Con I se usa am.' },
  { id: 'be-she', s: 'She ___ my friend.', a: ['am', 'is', 'are'], c: 'is', e: 'Con she se usa is.' },
  { id: 'be-they', s: 'They ___ at home.', a: ['am', 'is', 'are'], c: 'are', e: 'Con they se usa are.' },
  { id: 'present-he', s: 'He ___ English every day.', a: ['study', 'studies', 'studying'], c: 'studies', e: 'En presente simple, he añade -s.' },
  { id: 'present-we', s: 'We ___ coffee in the morning.', a: ['drink', 'drinks', 'drinking'], c: 'drink', e: 'Con we se usa la forma base.' },
  { id: 'be-this', s: 'This ___ my book.', a: ['am', 'is', 'are'], c: 'is', e: 'This se usa con is.' }
];

const STORAGE_KEYS = {
  vocabCorrect: 'ef-vc',
  vocabAnswered: 'ef-va',
  grammarCorrect: 'ef-gc',
  grammarAnswered: 'ef-ga'
};

const ERROR_STORAGE_KEY = 'ef-errors-v1';
const ITEM_PROGRESS_KEY = 'ef-item-progress-v1';
const LEGACY_STORAGE_KEYS = ['englishfast-score', 'englishfast-answered'];

const vocabCategory = document.querySelector('#vocabCategory');
const word = document.querySelector('#questionWord');
const answers = document.querySelector('#answers');
const feedback = document.querySelector('#feedback');
const nextQuestion = document.querySelector('#nextQuestion');
const vocabItemStats = document.querySelector('#vocabItemStats');
const grammarSentence = document.querySelector('#grammarSentence');
const grammarAnswers = document.querySelector('#grammarAnswers');
const grammarFeedback = document.querySelector('#grammarFeedback');
const nextGrammar = document.querySelector('#nextGrammar');
const grammarItemStats = document.querySelector('#grammarItemStats');
const vocabProgress = document.querySelector('#vocabProgress');
const grammarProgress = document.querySelector('#grammarProgress');
const itemsPracticed = document.querySelector('#itemsPracticed');
const progressAccuracy = document.querySelector('#progressAccuracy');
const reviewErrors = document.querySelector('#reviewErrors');
const resetProgress = document.querySelector('#resetProgress');
const storageNotice = document.querySelector('#storageNotice');
const menu = document.querySelector('.menu');
const nav = document.querySelector('#nav');

let storageAvailable = true;
let reviewMode = false;

function readStoredNumber(key) {
  if (!storageAvailable) return 0;

  try {
    return Number(localStorage.getItem(key) || 0) || 0;
  } catch {
    storageAvailable = false;
    return 0;
  }
}

function readStoredErrors() {
  if (!storageAvailable) return { vocab: [], grammar: [] };

  try {
    const value = JSON.parse(localStorage.getItem(ERROR_STORAGE_KEY) || '{}');
    const validVocab = new Set(vocabBank.map(item => item.id));
    const validGrammar = new Set(grammarBank.map(item => item.id));

    return {
      vocab: Array.isArray(value.vocab) ? [...new Set(value.vocab.filter(id => validVocab.has(id)))] : [],
      grammar: Array.isArray(value.grammar) ? [...new Set(value.grammar.filter(id => validGrammar.has(id)))] : []
    };
  } catch {
    return { vocab: [], grammar: [] };
  }
}

function emptyItemRecord() {
  return {
    attempts: 0,
    correct: 0,
    wrong: 0,
    reviewAttempts: 0,
    reviewCorrect: 0,
    lastResult: null,
    lastAt: null
  };
}

function normalizeItemRecord(value) {
  const base = emptyItemRecord();
  if (!value || typeof value !== 'object') return base;

  return {
    attempts: Math.max(0, Number(value.attempts) || 0),
    correct: Math.max(0, Number(value.correct) || 0),
    wrong: Math.max(0, Number(value.wrong) || 0),
    reviewAttempts: Math.max(0, Number(value.reviewAttempts) || 0),
    reviewCorrect: Math.max(0, Number(value.reviewCorrect) || 0),
    lastResult: value.lastResult === 'correct' || value.lastResult === 'wrong' ? value.lastResult : null,
    lastAt: typeof value.lastAt === 'string' ? value.lastAt : null
  };
}

function normalizeItemGroup(value, validIds) {
  if (!value || typeof value !== 'object') return {};

  return Object.fromEntries(
    Object.entries(value)
      .filter(([id]) => validIds.has(id))
      .map(([id, record]) => [id, normalizeItemRecord(record)])
  );
}

function readStoredItemProgress() {
  if (!storageAvailable) return { vocab: {}, grammar: {} };

  try {
    const value = JSON.parse(localStorage.getItem(ITEM_PROGRESS_KEY) || '{}');
    return {
      vocab: normalizeItemGroup(value.vocab, new Set(vocabBank.map(item => item.id))),
      grammar: normalizeItemGroup(value.grammar, new Set(grammarBank.map(item => item.id)))
    };
  } catch {
    return { vocab: {}, grammar: {} };
  }
}

const storedErrors = readStoredErrors();
const storedItemProgress = readStoredItemProgress();

const progress = {
  vocabCorrect: readStoredNumber(STORAGE_KEYS.vocabCorrect),
  vocabAnswered: readStoredNumber(STORAGE_KEYS.vocabAnswered),
  grammarCorrect: readStoredNumber(STORAGE_KEYS.grammarCorrect),
  grammarAnswered: readStoredNumber(STORAGE_KEYS.grammarAnswered),
  vocabErrors: storedErrors.vocab,
  grammarErrors: storedErrors.grammar,
  itemProgress: storedItemProgress
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

function pendingErrorCount() {
  return progress.vocabErrors.length + progress.grammarErrors.length;
}

function getVocabErrors() {
  return vocabBank.filter(item => progress.vocabErrors.includes(item.id));
}

function getGrammarErrors() {
  return grammarBank.filter(item => progress.grammarErrors.includes(item.id));
}

function addError(type, id) {
  const key = type === 'vocab' ? 'vocabErrors' : 'grammarErrors';
  if (!progress[key].includes(id)) progress[key].push(id);
}

function resolveError(type, id) {
  const key = type === 'vocab' ? 'vocabErrors' : 'grammarErrors';
  progress[key] = progress[key].filter(itemId => itemId !== id);
}

function getItemRecord(type, id) {
  const group = progress.itemProgress[type];
  if (!group[id]) group[id] = emptyItemRecord();
  return group[id];
}

function recordItemAttempt(type, id, correct, isReview) {
  const record = getItemRecord(type, id);

  if (isReview) {
    record.reviewAttempts += 1;
    if (correct) record.reviewCorrect += 1;
  } else {
    record.attempts += 1;
    if (correct) record.correct += 1;
    else record.wrong += 1;
  }

  record.lastResult = correct ? 'correct' : 'wrong';
  record.lastAt = new Date().toISOString();
}

function practicedItemCount() {
  const vocabCount = Object.values(progress.itemProgress.vocab).filter(record => record.attempts > 0).length;
  const grammarCount = Object.values(progress.itemProgress.grammar).filter(record => record.attempts > 0).length;
  return vocabCount + grammarCount;
}

function itemIsPending(type, id) {
  return type === 'vocab'
    ? progress.vocabErrors.includes(id)
    : progress.grammarErrors.includes(id);
}

function renderItemHistory(type, id, element) {
  if (!element) return;
  const record = progress.itemProgress[type]?.[id];

  if (!record || (!record.attempts && !record.reviewAttempts)) {
    element.textContent = 'Sin historial individual registrado todavía.';
    return;
  }

  const parts = [];

  if (record.attempts) {
    const accuracy = Math.round((record.correct / record.attempts) * 100);
    parts.push(`${record.correct} de ${record.attempts} correctas · ${accuracy}%`);
  } else {
    parts.push('Sin intentos de práctica normal registrados');
  }

  if (record.reviewAttempts) {
    parts.push(`repaso ${record.reviewCorrect}/${record.reviewAttempts}`);
  }

  parts.push(itemIsPending(type, id) ? 'pendiente de repaso' : 'sin error pendiente');
  element.textContent = `Historial de este ejercicio: ${parts.join(' · ')}.`;
}

function renderProgress(message = '') {
  const totalAnswered = progress.vocabAnswered + progress.grammarAnswered;
  const totalCorrect = progress.vocabCorrect + progress.grammarCorrect;
  const errors = pendingErrorCount();
  const practiced = practicedItemCount();
  const totalItems = vocabBank.length + grammarBank.length;

  if (vocabProgress) vocabProgress.textContent = `${progress.vocabCorrect} / ${progress.vocabAnswered}`;
  if (grammarProgress) grammarProgress.textContent = `${progress.grammarCorrect} / ${progress.grammarAnswered}`;
  if (itemsPracticed) itemsPracticed.textContent = `${practiced} / ${totalItems}`;

  if (progressAccuracy) {
    progressAccuracy.textContent = totalAnswered
      ? `${Math.round((totalCorrect / totalAnswered) * 100)}%`
      : '0%';
  }

  if (reviewErrors) {
    reviewErrors.textContent = reviewMode
      ? 'Volver a práctica normal'
      : errors
        ? `Repasar errores (${errors})`
        : 'Repasar errores';
    reviewErrors.setAttribute('aria-pressed', String(reviewMode));
  }

  if (storageNotice) {
    storageNotice.textContent = message || (storageAvailable
      ? errors
        ? `${errors} ${errors === 1 ? 'error pendiente' : 'errores pendientes'} para repasar. El progreso se guarda localmente en este navegador.`
        : 'Progreso guardado localmente en este navegador. No hay errores pendientes.'
      : errors
        ? `${errors} ${errors === 1 ? 'error pendiente' : 'errores pendientes'} para repasar durante esta sesión.`
        : 'El almacenamiento local no está disponible; el progreso se conservará solo durante esta sesión.');
  }
}

function saveProgress(message = '') {
  if (storageAvailable) {
    try {
      Object.entries(STORAGE_KEYS).forEach(([property, key]) => {
        localStorage.setItem(key, String(progress[property]));
      });
      localStorage.setItem(ERROR_STORAGE_KEY, JSON.stringify({
        vocab: progress.vocabErrors,
        grammar: progress.grammarErrors
      }));
      localStorage.setItem(ITEM_PROGRESS_KEY, JSON.stringify(progress.itemProgress));
    } catch {
      storageAvailable = false;
    }
  }

  renderProgress(message);
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

function renderVocabEmptyReview() {
  if (vocabCategory) vocabCategory.textContent = 'VOCABULARY · REPASO';
  if (word) word.textContent = '✓';
  if (answers) answers.innerHTML = '';
  if (feedback) feedback.textContent = 'No hay errores pendientes de vocabulario.';
  if (vocabItemStats) vocabItemStats.textContent = 'No hay ejercicios de vocabulario pendientes de repaso.';
  if (nextQuestion) {
    nextQuestion.disabled = true;
    nextQuestion.textContent = 'Sin errores pendientes';
  }
}

function renderGrammarEmptyReview() {
  const grammarLabel = grammarSentence?.closest('.quiz-card')?.querySelector('.quiz-label');
  if (grammarLabel) grammarLabel.textContent = 'GRAMMAR · REPASO';
  if (grammarSentence) grammarSentence.textContent = '✓ Sin errores pendientes';
  if (grammarAnswers) grammarAnswers.innerHTML = '';
  if (grammarFeedback) grammarFeedback.textContent = 'No hay errores pendientes de gramática.';
  if (grammarItemStats) grammarItemStats.textContent = 'No hay ejercicios de gramática pendientes de repaso.';
  if (nextGrammar) {
    nextGrammar.disabled = true;
    nextGrammar.textContent = 'Sin errores pendientes';
  }
}

function renderVocab() {
  if (!word || !answers || !feedback) return;

  if (reviewMode && !vocabDeck.length) {
    renderVocabEmptyReview();
    return;
  }

  const question = vocabDeck[vocabIndex];
  if (!question) return;

  word.textContent = question.w;

  if (vocabCategory) {
    vocabCategory.textContent = reviewMode
      ? `VOCABULARY · REPASO · ${question.cat}`
      : `VOCABULARY · ${question.cat}`;
  }

  feedback.textContent = reviewMode
    ? 'Repasa este error y selecciona la traducción correcta.'
    : 'Selecciona la traducción correcta.';

  if (nextQuestion) {
    nextQuestion.disabled = false;
    nextQuestion.textContent = reviewMode ? 'Siguiente error' : 'Siguiente palabra';
  }

  renderItemHistory('vocab', question.id, vocabItemStats);
  renderOptions(answers, question.a, (option, button) => checkVocab(option, button, question));
}

function checkVocab(option, button, question) {
  const buttons = [...answers.querySelectorAll('button')];
  if (buttons.some(item => item.disabled)) return;

  buttons.forEach(item => {
    item.disabled = true;
  });

  const correct = option === question.c;
  recordItemAttempt('vocab', question.id, correct, reviewMode);

  if (!reviewMode) {
    progress.vocabAnswered += 1;
    if (correct) progress.vocabCorrect += 1;
  }

  if (correct) {
    resolveError('vocab', question.id);
    button.classList.add('correct');
    feedback.textContent = reviewMode
      ? `Correcto. ${question.w} significa ${question.c}. Este error quedó resuelto.`
      : `Correcto. ${question.w} significa ${question.c}.`;
  } else {
    addError('vocab', question.id);
    button.classList.add('wrong');
    buttons.find(item => item.textContent === question.c)?.classList.add('correct');
    feedback.textContent = reviewMode
      ? `Aún pendiente. La respuesta correcta es ${question.c}.`
      : `La respuesta correcta es ${question.c}. Se añadió al repaso de errores.`;
  }

  saveProgress();
  renderItemHistory('vocab', question.id, vocabItemStats);
}

function renderGrammar() {
  if (!grammarSentence || !grammarAnswers || !grammarFeedback) return;

  const grammarLabel = grammarSentence.closest('.quiz-card')?.querySelector('.quiz-label');

  if (reviewMode && !grammarDeck.length) {
    renderGrammarEmptyReview();
    return;
  }

  const question = grammarDeck[grammarIndex];
  if (!question) return;

  if (grammarLabel) {
    grammarLabel.textContent = reviewMode
      ? 'GRAMMAR · REPASO'
      : 'GRAMMAR · Completa la oración';
  }

  grammarSentence.textContent = question.s;
  grammarFeedback.textContent = reviewMode
    ? 'Repasa este error y selecciona la opción correcta.'
    : 'Selecciona la opción correcta.';

  if (nextGrammar) {
    nextGrammar.disabled = false;
    nextGrammar.textContent = reviewMode ? 'Siguiente error' : 'Siguiente oración';
  }

  renderItemHistory('grammar', question.id, grammarItemStats);
  renderOptions(grammarAnswers, question.a, (option, button) => checkGrammar(option, button, question));
}

function checkGrammar(option, button, question) {
  const buttons = [...grammarAnswers.querySelectorAll('button')];
  if (buttons.some(item => item.disabled)) return;

  buttons.forEach(item => {
    item.disabled = true;
  });

  const correct = option === question.c;
  recordItemAttempt('grammar', question.id, correct, reviewMode);

  if (!reviewMode) {
    progress.grammarAnswered += 1;
    if (correct) progress.grammarCorrect += 1;
  }

  if (correct) {
    resolveError('grammar', question.id);
    button.classList.add('correct');
    grammarFeedback.textContent = reviewMode
      ? `Correcto. ${question.e} Este error quedó resuelto.`
      : `Correcto. ${question.e}`;
  } else {
    addError('grammar', question.id);
    button.classList.add('wrong');
    buttons.find(item => item.textContent === question.c)?.classList.add('correct');
    grammarFeedback.textContent = reviewMode
      ? `Aún pendiente. Respuesta correcta: ${question.c}. ${question.e}`
      : `Respuesta correcta: ${question.c}. ${question.e} Se añadió al repaso de errores.`;
  }

  saveProgress();
  renderItemHistory('grammar', question.id, grammarItemStats);
}

function refreshVocabReview() {
  vocabDeck = shuffle(getVocabErrors());
  vocabIndex = 0;
  renderVocab();
}

function refreshGrammarReview() {
  grammarDeck = shuffle(getGrammarErrors());
  grammarIndex = 0;
  renderGrammar();
}

function startErrorReview() {
  const errors = pendingErrorCount();

  if (!errors) {
    renderProgress('No hay errores pendientes. Sigue practicando para generar una cola de repaso cuando sea necesaria.');
    return;
  }

  reviewMode = true;
  refreshVocabReview();
  refreshGrammarReview();
  renderProgress(`Modo repaso activo: ${errors} ${errors === 1 ? 'error pendiente' : 'errores pendientes'}. Los aciertos del repaso resuelven la cola sin alterar la precisión histórica.`);
  document.querySelector('#practica')?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  });
}

function exitErrorReview(message = 'Has vuelto a la práctica normal.') {
  reviewMode = false;
  vocabDeck = shuffle(vocabBank);
  vocabIndex = 0;
  grammarDeck = shuffle(grammarBank);
  grammarIndex = 0;
  renderVocab();
  renderGrammar();
  renderProgress(message);
}

nextQuestion?.addEventListener('click', () => {
  if (reviewMode) {
    refreshVocabReview();
    return;
  }

  vocabIndex += 1;

  if (vocabIndex >= vocabDeck.length) {
    vocabDeck = shuffle(vocabBank);
    vocabIndex = 0;
  }

  renderVocab();
});

nextGrammar?.addEventListener('click', () => {
  if (reviewMode) {
    refreshGrammarReview();
    return;
  }

  grammarIndex += 1;

  if (grammarIndex >= grammarDeck.length) {
    grammarDeck = shuffle(grammarBank);
    grammarIndex = 0;
  }

  renderGrammar();
});

reviewErrors?.addEventListener('click', () => {
  if (reviewMode) {
    exitErrorReview();
  } else {
    startErrorReview();
  }
});

resetProgress?.addEventListener('click', () => {
  progress.vocabCorrect = 0;
  progress.vocabAnswered = 0;
  progress.grammarCorrect = 0;
  progress.grammarAnswered = 0;
  progress.vocabErrors = [];
  progress.grammarErrors = [];
  progress.itemProgress = { vocab: {}, grammar: {} };

  if (storageAvailable) {
    try {
      [...Object.values(STORAGE_KEYS), ERROR_STORAGE_KEY, ITEM_PROGRESS_KEY, ...LEGACY_STORAGE_KEYS].forEach(key => {
        localStorage.removeItem(key);
      });
    } catch {
      storageAvailable = false;
    }
  }

  if (reviewMode) {
    exitErrorReview('Progreso, historial por ejercicio y cola de errores reiniciados.');
  } else {
    renderVocab();
    renderGrammar();
    renderProgress('Progreso, historial por ejercicio y cola de errores reiniciados.');
  }
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