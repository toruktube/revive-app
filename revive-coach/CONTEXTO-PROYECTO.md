# Contexto del Proyecto - Revive Coach IA

> Documento para transferencia de contexto a otro agente para documentación en Notion
> Fecha: Enero 2025

---

## 1. Descripción General

**Revive Coach** es una aplicación web para gestión de clientes de coaching fitness/entrenamiento personal. El usuario principal es **Christian**, un coach que necesita:

- Visualizar el estado de todos sus clientes en un dashboard
- Recibir alertas cuando un cliente necesita atención
- Gestionar perfiles de clientes con métricas de adherencia, nutrición y bienestar
- Captar nuevos clientes con formularios de onboarding estilo Typeform
- Recibir controles semanales con fotos de progreso

---

## 2. Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| **Next.js 14** | Framework React con App Router |
| **React 18** | UI Library |
| **TypeScript** | Tipado estático |
| **Tailwind CSS v4** | Estilos utility-first |
| **shadcn/ui** | Componentes base UI |
| **Framer Motion** | Animaciones |
| **Recharts** | Gráficos y diales |
| **Supabase** | Backend (PostgreSQL + Auth + Storage) |
| **Resend** | Envío de emails |
| **Vercel** | Despliegue |

---

## 3. Diseño Visual

### Estilo: Liquid Glass (iOS 26)

Inspirado en:
- Apple Fitness+
- Bevel App
- iOS 26 Liquid Glass design

### Características visuales:
- `backdrop-filter: blur(40px)` para efecto glass
- Transparencias con `bg-white/20`, `bg-black/60`
- Bordes suaves con `border-white/30`
- Sombras inset para profundidad
- Animaciones spring con Framer Motion
- Tema dark/light con toggle (persistencia localStorage)

### Paleta de colores:
- **Primary:** Verde (`oklch(0.55 0.18 145)`)
- **Secondary:** Naranja cálido
- **Alertas:** Rojo (alta), Amarillo (media), Verde (baja)

---

## 4. Estructura del Proyecto

```
revive-coach/
├── src/
│   ├── app/
│   │   ├── (dashboard)/          # Rutas protegidas
│   │   │   ├── layout.tsx        # Layout con sidebar + header + bottom tabs
│   │   │   ├── page.tsx          # Dashboard principal
│   │   │   ├── clientes/
│   │   │   ├── alertas/
│   │   │   └── configuracion/
│   │   ├── globals.css           # Estilos globales + variables CSS
│   │   └── layout.tsx            # Root layout con providers
│   ├── components/
│   │   ├── ui/                   # shadcn components
│   │   ├── glass/                # Liquid Glass components
│   │   │   ├── glass-card.tsx
│   │   │   ├── glass-button.tsx
│   │   │   └── glass-badge.tsx
│   │   ├── charts/               # Gráficos
│   │   │   └── dial-chart.tsx    # Diales circulares
│   │   ├── dashboard/            # Widgets del dashboard
│   │   │   ├── widget-alertas.tsx
│   │   │   ├── widget-adherencia.tsx
│   │   │   ├── widget-insights.tsx
│   │   │   └── widget-resumen.tsx
│   │   └── shared/               # Componentes compartidos
│   │       ├── sidebar.tsx       # Sidebar desktop
│   │       ├── header.tsx        # Header con búsqueda
│   │       ├── bottom-tabs.tsx   # Tabs móvil (Liquid Glass)
│   │       ├── theme-toggle.tsx
│   │       └── notification-bell.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   └── utils.ts
│   ├── providers/
│   │   ├── theme-provider.tsx
│   │   └── supabase-provider.tsx
│   └── types/
│       └── index.ts
├── PRESUPUESTO.md                # Análisis de costes
└── CONTEXTO-PROYECTO.md          # Este archivo
```

---

## 5. Funcionalidades Implementadas

### ✅ FASE 1: Setup + Dashboard (COMPLETADO)

- [x] Proyecto Next.js 14 configurado
- [x] Tailwind CSS v4 + shadcn/ui
- [x] Sistema de temas dark/light
- [x] Layout responsive (sidebar desktop, bottom tabs móvil)
- [x] Componentes Liquid Glass
- [x] Dashboard con 4 widgets:
  - Widget Alertas (clientes que necesitan atención)
  - Widget Adherencia (dial circular + estado anímico)
  - Widget Insights (patrones detectados)
  - Widget Resumen (métricas generales)
- [x] Diales circulares con Recharts
- [x] Bottom tabs estilo iOS con swipe gesture
- [x] Animaciones Framer Motion

### 🔄 FASE 2-5: Pendientes

- [ ] FASE 2: Gestión de Clientes (CRUD, perfiles, filtros)
- [ ] FASE 3: Formulario Onboarding (multi-step, estilo Typeform)
- [ ] FASE 4: Sistema de Alertas + Notificaciones email
- [ ] FASE 5: Control Semanal + Fotos de progreso

---

## 6. Componentes Clave Desarrollados

### Bottom Tabs (bottom-tabs.tsx)

Barra de navegación móvil estilo iOS Liquid Glass con:
- Efecto glass transparente (`bg-white/20` + blur)
- Pill indicador que se desliza con spring animation
- Soporte touch/swipe nativo para iOS Safari
- 4 tabs: Inicio, Clientes, Alertas, Ajustes

**Características técnicas:**
- `touch-action: none` para control total de touch events
- `useSpring` de Framer Motion para animaciones fluidas
- Navegación por swipe a cualquier tab (no solo adyacentes)

### Sidebar (sidebar.tsx)

Navegación lateral para desktop:
- Logo + nombre app
- Links con indicador activo animado
- Oculto en móvil (`hidden lg:flex`)

### Glass Card (glass-card.tsx)

Componente base para tarjetas con efecto Liquid Glass:
- Blur backdrop
- Bordes transparentes
- Sombras inset
- Animación de entrada con Framer Motion

### Dial Chart (dial-chart.tsx)

Gráfico circular para mostrar porcentajes:
- Colores según valor (verde >80%, amarillo 60-80%, rojo <60%)
- Animación de llenado
- Label central con valor

---

## 7. Modelo de Datos (Supabase)

### Tablas principales planificadas:

```sql
-- Clientes
clientes (id, nombre, apellidos, email, telefono, avatar_url, tipo, estado, fecha_inicio, objetivo_principal, nivel, notas_privadas)

-- Evaluaciones PAR-Q
parq_evaluaciones (id, cliente_id, fecha, peso, altura, porcentaje_grasa, lesiones, condiciones_medicas, horas_sueno_promedio, nivel_estres)

-- Planes de entrenamiento
planes_entrenamiento (id, cliente_id, nombre, descripcion, fase, fecha_inicio, fecha_fin, activo)

-- Planes de nutrición
planes_nutricion (id, cliente_id, nombre, calorias_objetivo, proteinas_g, carbohidratos_g, grasas_g, comidas_por_dia, notas, activo)

-- Controles semanales
controles_semanales (id, cliente_id, fecha, peso, adherencia_entrenamiento, adherencia_nutricion, horas_sueno_promedio, nivel_energia, nivel_estres, estado_animo, motivacion, sensaciones, fotos_urls)

-- Alertas
alertas (id, cliente_id, tipo, mensaje, prioridad, resuelta)
```

---

## 8. Presupuesto Estimado

Ver archivo `PRESUPUESTO.md` para desglose completo.

### Resumen:

| Método | Horas | Coste (€65/h) |
|--------|-------|---------------|
| Tradicional | 660h | €42,900 |
| Con IA Básica | 308h | €20,020 |

### Por fase (con IA):
- Fase 1 (Dashboard): 73h / €4,745
- Fase 2 (Clientes): 58h / €3,770
- Fase 3 (Onboarding): 39h / €2,535
- Fase 4 (Alertas): 33h / €2,145
- Fase 5 (Control): 29h / €1,885
- Transversales: 76h / €4,940

---

## 9. Decisiones Técnicas Tomadas

| Decisión | Razón |
|----------|-------|
| Next.js 14 App Router | Mejor rendimiento, Server Components |
| Tailwind v4 | Última versión, CSS nativo |
| Supabase | Auth + DB + Storage en uno, tier gratuito generoso |
| Framer Motion | Animaciones declarativas, spring physics |
| Bottom tabs vs hamburger | Mejor UX móvil, más accesible |
| Liquid Glass design | Estética moderna, diferenciador visual |
| Touch events nativos | Compatibilidad iOS Safari (drag de Framer no funciona) |

---

## 10. Problemas Resueltos

1. **Tailwind v4 + @apply**: No soporta clases personalizadas, usar CSS directo
2. **Framer Motion ease**: Usar arrays `[0.25, 0.1, 0.25, 1]` en lugar de strings
3. **iOS Safari touch**: Usar `onTouchStart/Move/End` nativos + `touch-action: none`
4. **Hydration errors**: `suppressHydrationWarning` en inputs
5. **Sidebar móvil**: Reemplazado por bottom tabs para mejor UX

---

## 11. Próximos Pasos

1. **Conectar Supabase** - Crear proyecto y ejecutar schema SQL
2. **Implementar Auth** - Login para Christian
3. **CRUD Clientes** - Listado, filtros, perfil individual
4. **Formulario Onboarding** - Multi-step con animaciones
5. **Sistema Alertas** - Motor de reglas + notificaciones

---

## 12. Archivos de Referencia

- `/PRESUPUESTO.md` - Análisis de costes detallado
- `/src/components/shared/bottom-tabs.tsx` - Ejemplo Liquid Glass + touch
- `/src/components/glass/glass-card.tsx` - Componente base glass
- `/src/app/globals.css` - Variables CSS del tema

---

## 13. Comandos Útiles

```bash
# Desarrollo
cd revive-coach && npm run dev

# Desarrollo con acceso red (para probar en móvil)
npm run dev -- -H 0.0.0.0

# Build
npm run build

# Lint
npm run lint
```

---

*Documento generado para transferencia de contexto. Usar para crear documentación en Notion.*
