(() => {
  const vocabAnswers = document.querySelector('#answers');
  const grammarAnswers = document.querySelector('#grammarAnswers');
  const vocabFeedback = document.querySelector('#feedback');
  const grammarFeedback = document.querySelector('#grammarFeedback');
  const vocabResult = document.querySelector('#vocabResult');
  const grammarResult = document.querySelector('#grammarResult');
  const vocabStage = document.querySelector('#ruta-vocabulario .practice-stage');
  const grammarStage = document.querySelector('#ruta-gramatica .practice-stage');
  const nextQuestion = document.querySelector('#nextQuestion');
  const nextGrammar = document.querySelector('#nextGrammar');
  const reviewErrors = document.querySelector('#reviewErrors');
  const filterSummary = document.querySelector('#filterSummary');
  const practiceLevel = document.querySelector('#practiceLevel');
  const vocabTopic = document.querySelector('#vocabTopic');
  const grammarTopic = document.querySelector('#grammarTopic');

  function configureAnswerGroup(container, labelIds, descriptionIds) {
    if (!container) return;
    container.setAttribute('role', 'group');
    container.setAttribute('aria-labelledby', labelIds.join(' '));
    container.setAttribute('aria-describedby', descriptionIds.join(' '));
  }

  function configureFocusableRegion(element, label) {
    if (!element) return;
    element.tabIndex = -1;
    element.setAttribute('role', 'region');
    element.setAttribute('aria-label', label);
  }

  configureAnswerGroup(vocabAnswers, ['vocabCategory', 'questionWord'], ['vocabItemStats', 'feedback']);
  configureAnswerGroup(grammarAnswers, ['grammarSentence'], ['grammarItemStats', 'grammarFeedback']);

  configureFocusableRegion(vocabStage, 'Práctica de vocabulario');
  configureFocusableRegion(grammarStage, 'Práctica de gramática');
  configureFocusableRegion(vocabResult, 'Resultado de vocabulario');
  configureFocusableRegion(grammarResult, 'Resultado de gramática');

  // El resultado recibe el foco después de responder; evitamos un segundo anuncio
  // automático desde los textos de feedback para no duplicar información.
  vocabFeedback?.removeAttribute('aria-live');
  grammarFeedback?.removeAttribute('aria-live');

  [practiceLevel, vocabTopic, grammarTopic].forEach(select => {
    if (select && filterSummary) select.setAttribute('aria-describedby', 'filterSummary');
  });

  if (nextQuestion) nextQuestion.setAttribute('aria-describedby', 'vocabRoutePosition');
  if (nextGrammar) nextGrammar.setAttribute('aria-describedby', 'grammarRoutePosition');

  function focusLater(element) {
    if (!element) return;
    requestAnimationFrame(() => {
      if (!element.hidden && document.contains(element)) {
        element.focus({ preventScroll: false });
      }
    });
  }

  function focusFirstReviewRoute() {
    const vocabHasExercise = Boolean(vocabAnswers?.querySelector('button:not([disabled])')) || Boolean(vocabAnswers?.querySelector('button'));
    const grammarHasExercise = Boolean(grammarAnswers?.querySelector('button:not([disabled])')) || Boolean(grammarAnswers?.querySelector('button'));

    if (vocabHasExercise) focusLater(vocabStage);
    else if (grammarHasExercise) focusLater(grammarStage);
  }

  document.addEventListener('click', event => {
    if (event.target.closest('#answers button')) {
      focusLater(vocabResult);
      return;
    }

    if (event.target.closest('#grammarAnswers button')) {
      focusLater(grammarResult);
      return;
    }

    if (event.target.closest('#nextQuestion')) {
      focusLater(vocabStage);
      return;
    }

    if (event.target.closest('#nextGrammar')) {
      focusLater(grammarStage);
      return;
    }

    if (event.target.closest('#reviewErrors')) {
      requestAnimationFrame(() => {
        if (reviewErrors?.getAttribute('aria-pressed') === 'true') {
          focusFirstReviewRoute();
        }
      });
    }
  });
})();
