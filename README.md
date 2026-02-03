# TheMindFactory - REVIVE Project

> Repositorio principal del proyecto REVIVE - Plataforma de gestión para entrenadores personales

---

## Estructura del Repositorio

```
TheMindFactory/
├── revive-app/          # 👈 APLICACIÓN ACTIVA - MVP actual
│   ├── src/             # Código fuente Next.js 15
│   ├── README.md        # Documentación completa de la app
│   ├── mvp.md           # Definición de pantallas
│   └── FUNCIONALIDADES_FALTANTES.md  # Roadmap
│
├── revive-coach/        # ⚠️ DEPRECATED - Versión anterior
│   └── ...              # No usar, solo referencia histórica
│
├── Christian Revive/    # Assets y materiales del cliente
├── images/              # Imágenes del proyecto
├── logo.PNG             # Logo oficial
└── REVIVE_Sales_Presentation.pptx  # Presentación comercial
```

---

## Quick Start

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd TheMindFactory

# 2. Ir a la aplicación activa
cd revive-app

# 3. Instalar dependencias
npm install

# 4. Iniciar desarrollo
npm run dev

# 5. Abrir http://localhost:3000
```

---

## Sobre REVIVE

**REVIVE** es una aplicación web móvil-first para **entrenadores personales** que permite:

- Gestionar agenda de sesiones
- Administrar clientes y sus perfiles
- Controlar facturación y pagos
- Crear y asignar rutinas de entrenamiento y nutrición
- Comunicarse con clientes
- Generar reportes de progreso

### Estado Actual

| Aspecto | Estado |
|---------|--------|
| **Versión** | MVP con datos mock |
| **Backend** | Sin implementar (datos mock) |
| **UI/UX** | Completa con diseño glassmorphism |
| **Responsive** | Móvil-first |

---

## Tecnologías

- **Next.js 15** - Framework React
- **React 19** - UI Library
- **TypeScript 5** - Tipado estático
- **Tailwind CSS v4** - Estilos
- **Framer Motion** - Animaciones
- **Recharts** - Gráficos

---

## Documentación

| Documento | Ubicación | Descripción |
|-----------|-----------|-------------|
| **README principal** | `revive-app/README.md` | Documentación técnica completa |
| **Definición MVP** | `revive-app/mvp.md` | Especificación de pantallas |
| **Roadmap** | `revive-app/FUNCIONALIDADES_FALTANTES.md` | Features pendientes y prioridades |

---

## Notas Importantes

### Carpeta activa: `revive-app/`

La carpeta `revive-app/` contiene la **versión actual y activa** del proyecto. Toda la documentación técnica está ahí.

### Carpeta deprecated: `revive-coach/`

La carpeta `revive-coach/` contiene una **versión anterior** del proyecto que ya no se usa. Está ahí solo como referencia histórica. **No desarrollar en esta carpeta.**

---

## Contacto

Proyecto privado - TheMindFactory © 2025
