# Roadmap de English Fast

## Principio general

English Fast debe consolidar primero la calidad educativa, la accesibilidad y la estabilidad del MVP web antes de incorporar funciones de mayor complejidad.

## Etapa 1 — Base funcional consolidada

**Estado: implementada.**

Incluye:

- rutas guiadas de Vocabulario y Gramática;
- 68 ejercicios organizados entre A1 y A2 inicial;
- filtros por nivel y tema;
- secuencia explicación → ejemplo → práctica → resultado;
- retroalimentación contextual;
- progreso local por ejercicio;
- repaso real de errores;
- accesibilidad específica de los ejercicios;
- cinco recursos educativos públicos e indexables;
- tarjeta social dedicada y metadatos Open Graph/Twitter;
- documentación mínima de alcance y roadmap.

## Etapa 2 — Profundidad educativa

**Prioridad alta.**

Objetivos:

- ampliar cada tema con unidades más extensas;
- añadir cierres temáticos con varios ejercicios relacionados;
- incorporar ejercicios de escritura controlada;
- incorporar ordenamiento de palabras o frases;
- mejorar la variedad de distractores;
- profundizar la retroalimentación según el historial del ejercicio;
- revisar consistencia pedagógica entre A1 y A2 inicial.

El objetivo no es aumentar el número de ejercicios por sí solo, sino mejorar la evidencia de aprendizaje dentro de cada tema.

## Etapa 3 — Validación y QA

**Prioridad alta antes de audio o gamificación.**

Objetivos:

- validación manual de navegación completa por teclado;
- pruebas de foco y lectores de pantalla;
- revisión a 200 % y 400 % de zoom;
- pruebas de reflow y reducción de movimiento;
- revisión de enlaces internos y metadatos;
- validación automática de HTML y JavaScript;
- incorporar GitHub Actions para controles básicos de calidad;
- documentar una matriz de pruebas de accesibilidad.

No se debe declarar conformidad formal con WCAG sin una evaluación que lo respalde.

## Etapa 4 — Práctica adaptativa

**Prioridad media.**

A partir del historial por ejercicio ya disponible:

- ponderar ejercicios con más errores;
- recomendar temas que necesitan repaso;
- diferenciar ejercicio visto, practicado y consolidado con criterios explícitos;
- ofrecer sesiones de repaso temático;
- mantener transparencia sobre cómo se calcula cada recomendación.

La adaptación debe seguir funcionando localmente mientras no exista una necesidad clara de backend.

## Etapa 5 — Audio y pronunciación

**Futura.**

Antes de activarla se requiere:

- definir alcance pedagógico de escucha y pronunciación;
- seleccionar una solución técnica de audio;
- revisar accesibilidad y controles multimedia;
- actualizar la política de privacidad antes de cualquier uso de micrófono o servicio externo;
- evitar presentar reconocimiento de voz como evaluación absoluta de pronunciación.

Posibles funciones:

- escucha de palabras y frases;
- repetición guiada;
- contraste de sonidos;
- práctica de comprensión auditiva breve.

## Etapa 6 — Motivación y multijuegos

**Posterior a la consolidación educativa.**

Posibles funciones:

- metas personales;
- logros no competitivos;
- minijuegos de vocabulario y estructuras;
- desafíos breves;
- rachas no punitivas.

XP, ranking público o mecánicas competitivas no son prioridad y solo deberían añadirse si aportan valor educativo comprobable.

## Etapa 7 — Cuenta, sincronización o móvil

**No prioritaria en el MVP actual.**

Solo considerar cuando exista una necesidad real que no pueda resolverse localmente:

- sincronización entre dispositivos;
- copia de seguridad del progreso;
- perfiles opcionales;
- aplicación móvil.

Cualquier incorporación de backend, analítica, autenticación o servicios externos exige revisar privacidad, seguridad, accesibilidad y mantenimiento antes de publicación.

## Prioridad inmediata

Después de consolidar los pasos actuales, el orden recomendado es:

1. mayor profundidad educativa por tema;
2. pruebas formales de accesibilidad y usabilidad;
3. QA automatizado;
4. práctica adaptativa basada en historial;
5. audio y pronunciación;
6. gamificación o móvil solo después.
