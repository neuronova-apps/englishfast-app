# English Fast

English Fast es una aplicación educativa de Neuronova Apps orientada al aprendizaje progresivo del inglés mediante explicaciones breves, práctica contextualizada y actividades interactivas.

## Propósito

El proyecto busca facilitar una experiencia de aprendizaje clara y accesible para personas que desean fortalecer vocabulario, gramática, comprensión de expresiones frecuentes y, en etapas posteriores, práctica de pronunciación.

English Fast no sustituye un curso formal de idiomas ni una certificación académica. Funciona como recurso complementario de práctica y refuerzo.

## Estructura de aprendizaje

La propuesta se organiza en cuatro rutas:

- **Vocabulario:** ruta guiada activa con palabras y expresiones frecuentes organizadas por nivel y temas cotidianos.
- **Gramática:** ruta guiada activa con estructuras esenciales, explicación, ejemplo, práctica y resultado.
- **Pronunciación:** futura práctica de escucha y repetición.
- **Juegos:** futuros retos cortos para reforzar memoria y comprensión.

Las dos rutas activas siguen una secuencia de cuatro pasos por ejercicio:

1. explicación breve del tema;
2. ejemplo relacionado;
3. práctica interactiva;
4. resultado con retroalimentación y registro local.

La práctica actual utiliza las etiquetas **A1** y **A2 inicial** como organización pedagógica orientativa del contenido del MVP. Estas etiquetas no representan una evaluación oficial ni una certificación del nivel de la persona usuaria.

## Contenido actual

El banco activo contiene **68 ejercicios**:

- **40 ejercicios de vocabulario**;
- **28 ejercicios de gramática**.

El contenido se distribuye entre A1 y A2 inicial. Vocabulario incluye temas como hogar, estudio, vida diaria, personas, acciones, tiempo, emociones, comida, viajes, trabajo, salud, conectores y descripción. Gramática incluye `verb to be`, presente simple, artículos, pronombres, preposiciones, `there is / there are`, `can`, posesivos, pasado simple, comparativos, `going to`, presente continuo, cuantificadores, `should` y conectores.

Cada palabra de vocabulario incluye además un ejemplo contextual de uso y una nota de contraste para diferenciarla de términos cercanos o distractores frecuentes. Los ejercicios de gramática conservan una explicación específica de la regla y, después de responder, muestran la oración completa correcta como modelo.

Los 18 ejercicios originales mantienen sus identificadores internos para conservar compatibilidad con el historial local y la cola de errores ya existente.

## Experiencia web actual

El MVP web incluye:

- presentación del enfoque de aprendizaje;
- dos rutas guiadas activas: vocabulario y gramática;
- filtros por nivel, tema de vocabulario y tema de gramática;
- secuencia explicación → ejemplo → práctica → resultado;
- recorrido ordenado de los ejercicios dentro de la selección actual;
- bloqueo del avance hasta responder el ejercicio actual;
- retroalimentación inmediata y resultado explícito antes de continuar;
- retroalimentación contextual de vocabulario con significado, contraste semántico y ejemplo de uso;
- retroalimentación gramatical con regla aplicada y oración completa correcta;
- identificación de la opción elegida cuando la respuesta es incorrecta;
- progreso local diferenciado de vocabulario y gramática;
- precisión total calculada en el dispositivo;
- historial local por ejercicio con intentos, aciertos, errores y actividad de repaso;
- contador de ejercicios distintos practicados;
- cola local de errores pendientes para vocabulario y gramática;
- modo de repaso que vuelve a presentar los ejercicios fallados hasta resolverlos;
- funcionamiento de los ejercicios aunque `localStorage` no esté disponible;
- diseño responsive;
- navegación por teclado y cierre del menú con Escape;
- integración con el módulo central de accesibilidad de Neuronova Apps;
- política de privacidad pública;
- metadatos SEO y sociales básicos.

Cambiar los filtros de nivel o tema reinicia la posición visual de la ruta seleccionada, pero no elimina el progreso. Las rutas normales mantienen un orden estable dentro del banco filtrado; el modo de repaso puede presentar los errores pendientes en otro orden y no se limita por los filtros seleccionados.

El progreso se almacena localmente en el navegador y no requiere cuenta ni base de datos remota. Los contadores globales conservan la precisión histórica de la práctica normal. Además, cada ejercicio mantiene un registro propio de intentos, aciertos, errores, intentos de repaso, última respuesta y última actividad. Los errores de vocabulario y gramática se eliminan de la cola de repaso cuando la persona responde correctamente.

Las respuestas realizadas durante el modo de repaso no modifican la precisión histórica acumulada, pero sí quedan registradas dentro del historial específico del ejercicio. Los contadores globales existentes de versiones anteriores se conservan; el historial individual empieza a acumular datos desde la incorporación de esa función.

## Arquitectura del repositorio

- `index.html`: interfaz principal, filtros, estructura semántica y cuatro etapas visibles de las rutas.
- `content.js`: banco educativo organizado por identificador, nivel y tema, incluidos ejemplos de uso y contrastes de vocabulario.
- `script.js`: rutas guiadas, explicaciones temáticas, filtros, ejercicios, resultados, progreso global y por ejercicio, cola de errores, modo de repaso, almacenamiento seguro y navegación móvil.
- `feedback.js`: capa de retroalimentación pedagógica contextual para vocabulario y gramática.
- `styles.css`: estilos base, layout general y componentes compartidos.
- `practice.css`: estilos de filtros, rutas guiadas, etapas de aprendizaje, historial por ejercicio y progreso.
- `hero-orbit.css`: estilos y animaciones del sistema orbital del hero.
- `shell.css`: ajustes de marca y estructura compartida del footer.
- `privacy/index.html`: versión web pública de la política de privacidad.
- `PRIVACY.md`: referencia documental de la política de privacidad.
- `sitemap.xml`: URLs públicas indexables.
- `.nojekyll`: publicación estática directa mediante GitHub Pages.

La separación de `content.js` evita mezclar el banco educativo con la lógica de interacción y permite ampliar niveles y temas sin reescribir el sistema de progreso. `feedback.js` reutiliza ese contenido para enriquecer el resultado después de cada respuesta sin duplicar el seguimiento ni la navegación de las rutas.

## Próximas ampliaciones

- unidades más extensas con varios ejercicios y cierre temático;
- mayor profundidad de contenido dentro de cada nivel y tema;
- ejercicios de escritura y ordenamiento de frases;
- práctica auditiva;
- pronunciación guiada;
- práctica adaptativa más profunda basada en historial;
- logros, metas y minijuegos.

## Privacidad

English Fast dispone de una política pública sobre tratamiento de datos, almacenamiento local, servicios de terceros, menores, retención y contacto.

Política: https://neuronova-apps.github.io/englishfast-app/privacy/

La versión actual no requiere cuenta, no utiliza publicidad ni seguimiento y no solicita acceso al micrófono. Cualquier incorporación futura de reconocimiento de voz, analítica, nube o servicios externos requerirá actualizar la política antes de activarse.

## Accesibilidad

English Fast utiliza el núcleo compartido de accesibilidad de Neuronova Apps y mantiene navegación por teclado, foco visible, diseño adaptable y compatibilidad con preferencias de reducción de movimiento.

## Ecosistema

English Fast forma parte de Neuronova Apps, plataforma matriz que reúne aplicaciones independientes vinculadas con aprendizaje, accesibilidad, bienestar, espiritualidad y entretenimiento.

## Autoría

Proyecto personal desarrollado por Gabriel Berrospi dentro del ecosistema Neuronova Apps.

## Estado

MVP web funcional en desarrollo activo.