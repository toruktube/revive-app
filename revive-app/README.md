# REVIVE - Coach Personal Management App

> MVP de aplicación web móvil-first para gestión de clientes de entrenamiento personal

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11-ff69b4)

---

## Contexto del Proyecto

**REVIVE** es una aplicación web móvil-first diseñada para **entrenadores personales**. Permite gestionar clientes, sesiones, rutinas, facturación, mensajes y reportes desde una interfaz moderna con diseño glassmorphism.

### Usuario Principal
- **Entrenadores personales / Coaches fitness** que necesitan:
  - Visualizar y gestionar su agenda de sesiones
  - Controlar el estado de todos sus clientes
  - Gestionar planes de entrenamiento y nutrición
  - Controlar facturación y pagos
  - Comunicarse con clientes

### Estado Actual
- **Versión:** MVP con datos mock (sin backend)
- **Propósito:** Validar UX/UI antes de implementar backend real

---

## Quick Start

```bash
# Requisitos previos
# - Node.js 18+
# - npm o pnpm

# 1. Clonar el repositorio
git clone <repo-url>
cd TheMindFactory/revive-app

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en navegador
# http://localhost:3000
```

### Comandos Disponibles

```bash
npm run dev      # Desarrollo (http://localhost:3000)
npm run build    # Build de producción
npm run start    # Ejecutar build de producción
npm run lint     # Ejecutar ESLint
```

---

## Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **Next.js** | 15 | Framework React con App Router |
| **React** | 19 | UI Library |
| **TypeScript** | 5 | Tipado estático |
| **Tailwind CSS** | v4 | Estilos utility-first |
| **Framer Motion** | 11 | Animaciones fluidas |
| **Lucide React** | - | Iconografía |
| **Recharts** | - | Gráficos |
| **next-themes** | - | Tema dark/light |

---

## Estructura del Proyecto

```
revive-app/
├── src/
│   ├── app/                      # App Router (páginas)
│   │   ├── layout.tsx            # Layout principal
│   │   ├── globals.css           # Estilos + variables CSS
│   │   ├── page.tsx              # Redirect a /agenda
│   │   ├── agenda/               # Vista calendario semanal
│   │   ├── clientes/             # Listado + detalle cliente
│   │   │   └── [id]/             # Ficha individual
│   │   ├── facturacion/          # Transacciones y pagos
│   │   ├── rutinas/              # Planes entrenamiento/nutrición
│   │   │   └── [id]/             # Detalle de rutina
│   │   ├── mensajes/             # Sistema de chat
│   │   │   └── [id]/             # Chat individual
│   │   ├── reportes/             # Notas y reportes
│   │   └── ajustes/              # Configuración
│   │
│   ├── components/
│   │   ├── ui/                   # Componentes base (shadcn style)
│   │   ├── glass/                # GlassCard, GlassButton, GlassBadge
│   │   ├── shared/               # Header, BottomTabs, FAB, EmptyState
│   │   ├── agenda/               # Componentes específicos agenda
│   │   ├── clientes/             # Componentes específicos clientes
│   │   ├── facturacion/          # Componentes específicos facturación
│   │   ├── rutinas/              # Componentes específicos rutinas
│   │   ├── mensajes/             # Componentes específicos mensajes
│   │   ├── reportes/             # Componentes específicos reportes
│   │   └── ajustes/              # Componentes específicos ajustes
│   │
│   ├── hooks/                    # Custom React hooks
│   │
│   ├── lib/
│   │   ├── utils.ts              # Utilidades (cn, formatters)
│   │   └── mock-data.ts          # Datos mock (10 clientes completos)
│   │
│   ├── providers/
│   │   └── theme-provider.tsx    # Provider next-themes
│   │
│   └── types/
│       └── index.ts              # Interfaces TypeScript
│
├── public/
│   ├── manifest.json             # PWA manifest
│   └── references/               # Diseños de referencia
│
├── mvp.md                        # Definición de pantallas MVP
├── FUNCIONALIDADES_FALTANTES.md  # Roadmap y prioridades
└── package.json
```

---

## Pantallas del MVP

| Pantalla | Ruta | Estado | Descripción |
|----------|------|--------|-------------|
| Agenda | `/agenda` | ✅ Implementada | Calendario semanal con sesiones |
| Clientes | `/clientes` | ✅ Implementada | Lista de clientes con filtros |
| Cliente Detalle | `/clientes/[id]` | ✅ Implementada | Perfil completo del cliente |
| Facturación | `/facturacion` | ✅ Implementada | Resumen mensual y transacciones |
| Rutinas | `/rutinas` | ✅ Implementada | Lista de rutinas y planes |
| Rutina Detalle | `/rutinas/[id]` | ✅ Implementada | Detalle de rutina/nutrición |
| Mensajes | `/mensajes` | ✅ Implementada | Lista de conversaciones |
| Chat | `/mensajes/[id]` | ✅ Implementada | Chat individual |
| Reportes | `/reportes` | ✅ Implementada | Notas y reportes mensuales |
| Ajustes | `/ajustes` | ✅ Implementada | Configuración y perfil |

### Navegación

- **Bottom Tabs**: 6 pestañas principales (móvil)
- **Header**: Logo REVIVE con E invertida + perfil
- **FAB**: Botón flotante para acciones principales

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

## Datos Mock

El MVP incluye **10 clientes mock** con datos completos para testing:

| Tipo de Dato | Descripción |
|--------------|-------------|
| **Clientes** | Perfiles con avatar, estado, plan, objetivos |
| **Sesiones** | Calendario con sesiones programadas |
| **Transacciones** | Historial de pagos y gastos |
| **Rutinas** | Planes de entrenamiento y nutrición |
| **Conversaciones** | Historial de mensajes |
| **Notas** | Registros de sesiones pasadas |

Los datos mock están en `src/lib/mock-data.ts`.

---

## Funcionalidades por Pantalla

### 1. Agenda
- Vista semanal con días navegables
- Tarjetas por sesión (cliente, hora, tipo, ubicación)
- Botón "+" para añadir nueva sesión
- Conexión con Mensajes para recordatorios

### 2. Clientes
- Lista con foto, nombre, estado, plan
- Buscador y filtros (estado, plan)
- Ficha detallada: datos, historial, planes, pagos, notas

### 3. Facturación
- Monto total mensual
- Comparativa con mes anterior
- Lista de transacciones con estados
- Acciones: marcar pagado, enviar recordatorio

### 4. Rutinas
- Tabs: Entrenamiento / Nutrición
- Filtros: tipo, objetivo, duración, nivel
- Detalle: bloques por día, ejercicios, series, reps

### 5. Mensajes
- Chat con cada cliente
- Mensajes predefinidos (recordatorios, seguimiento)
- Integración con Agenda y Facturación

### 6. Reportes
- Valoración post-sesión (energía, puntualidad, progreso)
- Reporte mensual con gráficos
- Clientes con mayor adherencia

### 7. Ajustes
- Datos del entrenador
- Notificaciones
- Preferencias (idioma, tema)
- Cerrar sesión

---

## Roadmap - Funcionalidades Pendientes

### Fase 1 - MVP Funcional (Prioridad Crítica)
- [x] Estructura base y UI
- [ ] CRUD de sesiones (crear, editar, eliminar)
- [ ] Asignación de rutinas a clientes
- [ ] Tracking de progreso (peso, medidas)
- [ ] Registro de sesión en tiempo real

### Fase 2 - Experiencia Completa (Prioridad Alta)
- [ ] Portal del cliente (vista solo lectura)
- [ ] Check-in semanal
- [ ] Evaluaciones físicas
- [ ] Gestión de objetivos con metas

### Fase 3 - Profesionalización (Prioridad Media)
- [ ] Documentos y contratos
- [ ] Analytics básico del negocio
- [ ] Automatizaciones (recordatorios)

### Fase 4 - Diferenciación (Prioridad Baja)
- [ ] Biblioteca de ejercicios con vídeos
- [ ] Integraciones (wearables, pagos)
- [ ] Comunidad y grupos

> Ver `FUNCIONALIDADES_FALTANTES.md` para análisis detallado.

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

Cuando se integre backend:
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

## Responsive Design

- **Móvil-first**: Optimizado para smartphones
- **Safe areas**: Soporte para notch y home indicator
- **Touch-friendly**: Targets de 44px mínimo
- **PWA-ready**: Manifest incluido

---

## Archivos de Documentación

| Archivo | Descripción |
|---------|-------------|
| `README.md` | Este archivo - documentación general |
| `mvp.md` | Definición detallada de pantallas MVP |
| `FUNCIONALIDADES_FALTANTES.md` | Análisis de features pendientes y roadmap |

---

## Notas para Desarrolladores

### Convenciones
- **Componentes**: PascalCase (`GlassCard.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useTheme.ts`)
- **Utilidades**: camelCase (`formatDate.ts`)
- **Tipos**: PascalCase, sufijo con tipo (`ClientType`, `SessionProps`)

### Patrones Usados
- **App Router** de Next.js 15
- **Server Components** por defecto, `"use client"` cuando necesario
- **Colocation**: componentes junto a sus páginas cuando son específicos
- **Shared components**: en `/components/shared/` y `/components/glass/`

### Glass Components
Los componentes glass (`/components/glass/`) son la base del diseño:
- `GlassCard`: Tarjeta con efecto glass
- `GlassButton`: Botón con efecto glass
- `GlassBadge`: Badge/etiqueta con efecto glass

---

## Licencia

Proyecto privado - TheMindFactory © 2025
