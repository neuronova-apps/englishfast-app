# English Fast

English Fast es una aplicación educativa de Neuronova Apps orientada a practicar inglés mediante explicaciones breves, vocabulario, gramática, ejercicios interactivos y progreso local.

## Estado del proyecto

- **Web:** MVP funcional en desarrollo activo.
- **Publicación:** disponible mediante GitHub Pages.
- **Android:** rama `android` separada en trabajo en progreso; no es una versión estable ni publicada.

## Alcance actual

La versión pública cubre práctica inicial de vocabulario y gramática con organización orientativa A1 y A2, feedback y seguimiento local. Las etiquetas de nivel son pedagógicas y no representan certificación oficial de dominio del idioma.

## Funciones disponibles

- rutas activas de vocabulario y gramática;
- banco actual de 68 ejercicios: 40 de vocabulario y 28 de gramática;
- organización pedagógica A1 y A2 inicial;
- filtros por nivel y tema;
- secuencia explicación, ejemplo, práctica y resultado;
- feedback contextual y modelos de respuesta correcta;
- historial local por ejercicio, intentos, aciertos y errores;
- cola de errores y modo de repaso;
- progreso almacenado localmente sin cuenta ni backend;
- cinco recursos educativos públicos e indexables;
- diseño responsive y accesibilidad integrada con Neuronova Apps.

## Tecnología

La versión web utiliza HTML5, CSS3, JavaScript modular en el navegador, `localStorage`, JSON/JavaScript para contenido educativo, GitHub Pages y el módulo compartido de accesibilidad de Neuronova Apps. No existe un proceso de compilación obligatorio para ejecutar la versión web actual.

## Accesibilidad

English Fast incorpora navegación por teclado, foco visible, estructura semántica de grupos de respuesta, gestión programática del foco, mensajes de estado coordinados, diseño adaptable y respeto por preferencias de movimiento reducido.

La superficie pública forma parte de la auditoría automática central del ecosistema. Estas medidas no constituyen una certificación WCAG y siguen sujetas a pruebas manuales con tecnologías de asistencia.

## Privacidad

La versión actual no requiere cuenta ni sincronización remota. El progreso se guarda localmente en el navegador.

Política pública: https://neuronova-apps.github.io/englishfast-app/privacy/

`PRIVACY.md` se mantiene como referencia documental del repositorio y `/privacy/` es la referencia pública principal.

## Limitaciones conocidas

El contenido está concentrado en una etapa inicial A1-A2 y todavía no incorpora una cobertura amplia de niveles, audio ni adaptación completa del repaso. La revisión manual integral de accesibilidad continúa pendiente y la rama Android no constituye una aplicación publicada.

## Roadmap

Las siguientes líneas son ampliar niveles y contenidos, incorporar audio, profundizar el repaso adaptativo, añadir modalidades de práctica y completar validaciones manuales de accesibilidad.

## Desarrollo local

```bash
git clone https://github.com/neuronova-apps/englishfast-app.git
cd englishfast-app
python3 -m http.server 8000
```

Después abre `http://localhost:8000`. La rama `main` corresponde a la versión web pública y `android` mantiene el trabajo móvil separado.

## Estructura principal

- `index.html`: interfaz principal;
- `content.js`: banco educativo;
- `script.js`: navegación, ejercicios y progreso;
- `feedback.js`: feedback pedagógico;
- `exercise-accessibility.js`: foco y semántica accesible;
- hojas CSS: sistema visual y práctica;
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

English Fast forma parte de Neuronova Apps y comparte criterios visuales, accesibilidad, privacidad, publicación web y documentación técnica, conservando un repositorio independiente.

## Autoría

Proyecto personal desarrollado por Gabriel Berrospi dentro del ecosistema Neuronova Apps.

## Última revisión

2026-08-15
