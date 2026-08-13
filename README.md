# English Fast

English Fast es una aplicación educativa de Neuronova Apps orientada al aprendizaje progresivo del inglés mediante explicaciones breves, práctica contextualizada y actividades interactivas.

## Propósito

El proyecto busca facilitar una experiencia de aprendizaje clara y accesible para personas que desean fortalecer vocabulario, gramática, comprensión de expresiones frecuentes y, en etapas posteriores, práctica de pronunciación.

English Fast no sustituye un curso formal de idiomas ni una certificación académica. Funciona como recurso complementario de práctica y refuerzo.

## Estructura de aprendizaje

La propuesta se organiza en cuatro rutas:

- Vocabulario: palabras y expresiones frecuentes organizadas por temas.
- Gramática: estructuras esenciales con ejemplos y ejercicios breves.
- Pronunciación: futura práctica de escucha y repetición.
- Juegos: retos cortos para reforzar memoria y comprensión.

## Experiencia web actual

El MVP web incluye:

- presentación del enfoque de aprendizaje;
- rutas temáticas;
- práctica interactiva de vocabulario;
- práctica básica de gramática;
- categorías visibles en vocabulario;
- progreso local diferenciado de vocabulario y gramática;
- precisión total calculada en el dispositivo;
- funcionamiento de los ejercicios aunque `localStorage` no esté disponible;
- diseño responsive;
- navegación por teclado y cierre del menú con Escape;
- integración con el módulo central de accesibilidad de Neuronova Apps;
- política de privacidad pública;
- metadatos SEO y sociales básicos.

El progreso se almacena localmente en el navegador y no requiere cuenta ni base de datos remota.

## Arquitectura del repositorio

- `index.html`: interfaz principal y estructura semántica del MVP.
- `styles.css`: estilos base, layout general, componentes y responsive.
- `extras.css`: práctica, progreso y sistema orbital actual del hero.
- `script.js`: bancos iniciales, ejercicios, progreso local, almacenamiento seguro y navegación móvil.
- `privacy/index.html`: versión web pública de la política de privacidad.
- `PRIVACY.md`: referencia documental de la política de privacidad.
- `sitemap.xml`: URLs públicas indexables.
- `.nojekyll`: publicación estática directa mediante GitHub Pages.

La lógica funcional se concentra en `script.js`; no se mantienen capas de compatibilidad paralelas ni archivos orbitales alternativos fuera de la carga efectiva de la aplicación.

## Próximas ampliaciones

- banco ampliado de vocabulario y gramática;
- clasificación progresiva por niveles;
- ejercicios de escritura y ordenamiento de frases;
- repaso adaptativo de errores;
- práctica auditiva;
- pronunciación guiada;
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
