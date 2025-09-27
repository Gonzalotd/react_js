# App Alert Web Component

Componente personalizado para mostrar las alertas con los diferentes niveles de severidad que piden.

## Uso

```html
<script type="module" src="app-alert.js"></script>

<app-alert 
  type="success|info|warning|error"
  message="Mensaje de la alerta"
  open>
</app-alert>