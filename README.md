# English Fast

English Fast es una aplicación educativa de Neuronova Apps orientada a practicar inglés mediante explicaciones breves, vocabulario, gramática, ejercicios interactivos y progreso local.

## Estado del proyecto

- **Web:** MVP funcional en desarrollo activo.
- **Publicación:** disponible mediante GitHub Pages.
- **Android:** existe una rama `android` separada para el desarrollo móvil. Se considera trabajo en progreso y no una versión estable o publicada.

## Funciones disponibles

- rutas activas de vocabulario y gramática;
- banco actual de 68 ejercicios: 40 de vocabulario y 28 de gramática;
- organización pedagógica A1 y A2 inicial;
- filtros por nivel y tema;
- secuencia explicación → ejemplo → práctica → resultado;
- feedback contextual y modelos de respuesta correcta;
- historial local por ejercicio, intentos, aciertos y errores;
- cola de errores y modo de repaso;
- progreso almacenado localmente sin cuenta ni backend;
- cinco recursos educativos públicos e indexables;
- diseño responsive y accesibilidad integrada con Neuronova Apps.

Las etiquetas de nivel son orientativas y no representan una certificación oficial de dominio del idioma.

## Tecnología

La versión web utiliza:

- HTML5;
- CSS3;
- JavaScript modular en el navegador;
- `localStorage` para progreso e historial local;
- JSON/JavaScript para contenido educativo;
- GitHub Pages;
- módulo de accesibilidad compartido de Neuronova Apps.

No existe un proceso de compilación obligatorio para ejecutar la versión web actual.

## Accesibilidad

English Fast incorpora navegación por teclado, foco visible, estructura semántica de grupos de respuesta, gestión programática del foco, mensajes de estado coordinados, diseño adaptable y respeto por preferencias de movimiento reducido.

Las páginas educativas independientes también utilizan el núcleo común de accesibilidad. Estas medidas no constituyen una certificación WCAG y siguen sujetas a pruebas manuales con tecnologías de asistencia.

## Privacidad

La versión actual no requiere cuenta ni sincronización remota. El progreso se guarda localmente en el navegador.

Política pública:

https://neuronova-apps.github.io/englishfast-app/privacy/

El archivo `PRIVACY.md` se mantiene como referencia documental del repositorio; la ruta web `/privacy/` es la referencia pública principal.

## Desarrollo local

```bash
git clone https://github.com/neuronova-apps/englishfast-app.git
cd englishfast-app
python3 -m http.server 8000
```

Después abre `http://localhost:8000`.

La rama `main` corresponde a la versión web pública. El trabajo móvil se mantiene separado en `android`.

## Estructura principal

- `index.html`: interfaz principal;
- `content.js`: banco educativo;
- `script.js`: navegación, ejercicios y progreso;
- `feedback.js`: feedback pedagógico;
- `exercise-accessibility.js`: foco y semántica accesible;
- `styles.css`, `practice.css`, `hero-orbit.css` y `shell.css`: sistema visual;
- páginas HTML educativas: recursos indexables;
- `docs/`: alcance y roadmap;
- `privacy/`: política pública;
- `assets/social/`: tarjeta social;
- `sitemap.xml`: URLs públicas indexables.

## Enlaces

- **Web:** https://neuronova-apps.github.io/englishfast-app/
- **Privacidad:** https://neuronova-apps.github.io/englishfast-app/privacy/
- **Repositorio:** https://github.com/neuronova-apps/englishfast-app
- **Ecosistema:** https://neuronova-apps.github.io/

## Neuronova Apps

English Fast forma parte de **Neuronova Apps**, ecosistema de aplicaciones independientes que comparte criterios visuales, accesibilidad, privacidad, publicación web y documentación técnica.

## Autoría

Proyecto personal desarrollado por Gabriel Berrospi dentro del ecosistema Neuronova Apps.
