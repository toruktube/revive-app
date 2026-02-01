# REVIVE - Coach Personal Management App

> MVP de aplicación móvil-first para gestión de clientes de entrenamiento personal

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11-ff69b4)

---

## Descripción

**REVIVE** es una aplicación web móvil-first diseñada para entrenadores personales. Permite gestionar clientes, sesiones, rutinas, facturación, mensajes y reportes desde una interfaz moderna con diseño glassmorphism.

### Características Principales

- **Agenda**: Vista semanal con sesiones, navegación entre semanas
- **Clientes**: Gestión de clientes con filtros, perfiles detallados
- **Facturación**: Resumen mensual, transacciones, estados de pago
- **Rutinas**: Planes de entrenamiento y nutrición con detalle
- **Mensajes**: Sistema de chat con plantillas predefinidas
- **Reportes**: Notas de sesión y reportes mensuales con gráficos
- **Ajustes**: Configuración de perfil, notificaciones y tema visual

---

## Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| **Next.js 15** | Framework React con App Router |
| **React 19** | UI Library |
| **TypeScript 5** | Tipado estático |
| **Tailwind CSS v4** | Estilos utility-first |
| **Framer Motion** | Animaciones fluidas |
| **Lucide React** | Iconografía |
| **Recharts** | Gráficos |
| **next-themes** | Tema dark/light |

---

## Diseño Visual

### Estilo: Glassmorphism

- Efectos glass con `backdrop-filter: blur()`
- Transparencias adaptativas dark/light
- Bordes sutiles con `border-white/10`
- Animaciones spring con Framer Motion
- Tema dark/light con persistencia

### Paleta de Colores

```css
--accent-emerald: #22C55E;  /* Activo, Pagado, Presencial */
--accent-blue: #3B82F6;      /* Online, En progreso */
--accent-violet: #8B5CF6;    /* Evaluación */
--warning: #EAB308;          /* Pendiente */
--destructive: #EF4444;      /* Vencido, Cancelado */
```

---

## Estructura del Proyecto

```
revive-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout principal
│   │   ├── globals.css         # Estilos + variables CSS
│   │   ├── page.tsx            # Redirect a /agenda
│   │   ├── agenda/             # Vista calendario semanal
│   │   ├── clientes/           # Listado + detalle cliente
│   │   ├── facturacion/        # Transacciones y pagos
│   │   ├── rutinas/            # Planes entrenamiento/nutrición
│   │   ├── mensajes/           # Chat con clientes
│   │   ├── reportes/           # Notas y reportes
│   │   └── ajustes/            # Configuración
│   ├── components/
│   │   ├── ui/                 # Componentes base
│   │   ├── glass/              # GlassCard, GlassButton, GlassBadge
│   │   ├── shared/             # Header, BottomTabs, FAB, EmptyState
│   │   ├── agenda/             # Componentes agenda
│   │   ├── clientes/           # Componentes clientes
│   │   ├── facturacion/        # Componentes facturación
│   │   ├── rutinas/            # Componentes rutinas
│   │   ├── mensajes/           # Componentes mensajes
│   │   ├── reportes/           # Componentes reportes
│   │   └── ajustes/            # Componentes ajustes
│   ├── hooks/                  # Custom hooks
│   ├── lib/
│   │   ├── utils.ts            # Utilidades (cn, formatters)
│   │   └── mock-data.ts        # 10 clientes mock completos
│   ├── providers/
│   │   └── theme-provider.tsx  # Provider next-themes
│   └── types/
│       └── index.ts            # Interfaces TypeScript
├── public/
│   └── references/             # Diseños de referencia
└── package.json
```

---

## Datos Mock

El MVP incluye 10 clientes mock con datos completos:

- **Clientes**: Perfiles con avatar, estado, plan, objetivos
- **Sesiones**: Calendario con sesiones programadas
- **Transacciones**: Historial de pagos y gastos
- **Rutinas**: Planes de entrenamiento y nutrición
- **Conversaciones**: Historial de mensajes
- **Notas**: Registros de sesiones pasadas

---

## Getting Started

### Requisitos

- Node.js 18+
- npm o pnpm

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/toruktube/revive-app.git
cd revive-app

# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev
```

### Comandos

```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Lint
npm run lint

# Preview producción
npm run start
```

---

## Pantallas

| Pantalla | Ruta | Descripción |
|----------|------|-------------|
| Agenda | `/agenda` | Calendario semanal con sesiones |
| Clientes | `/clientes` | Lista de clientes con filtros |
| Cliente Detalle | `/clientes/[id]` | Perfil completo del cliente |
| Facturación | `/facturacion` | Resumen mensual y transacciones |
| Rutinas | `/rutinas` | Lista de rutinas y planes |
| Rutina Detalle | `/rutinas/[id]` | Detalle de rutina/nutrición |
| Mensajes | `/mensajes` | Lista de conversaciones |
| Chat | `/mensajes/[id]` | Chat individual |
| Reportes | `/reportes` | Notas y reportes mensuales |
| Ajustes | `/ajustes` | Configuración y perfil |

---

## Navegación

- **Bottom Tabs**: 6 pestañas principales (móvil)
- **Header**: Logo REVIVE con E invertida, perfil
- **FAB**: Botón flotante para acciones principales

---

## Responsive Design

- **Móvil-first**: Optimizado para smartphones
- **Safe areas**: Soporte para notch y home indicator
- **Touch-friendly**: Targets de 44px mínimo

---

## Despliegue

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

### Variables de Entorno

No se requieren variables de entorno para el MVP (datos mock).

---

## Roadmap

- [ ] Integración Supabase (backend real)
- [ ] Autenticación
- [ ] Notificaciones push
- [ ] Formulario onboarding clientes
- [ ] Sistema de alertas inteligentes

---

## Licencia

Proyecto privado - TheMindFactory © 2025
