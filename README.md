# ATF Wines — Frontend

Sitio web rediseñado. Stack: HTML + CSS + JS vanilla, Vite, Supabase.

## Estructura

```
atfwines/
├── index.html          # Home
├── tactiq.html         # Página TACTIQ
├── marketplace.html    # Login del Marketplace
├── vite.config.js
├── package.json
├── .env.example        # Template de variables de entorno
└── src/
    ├── style.css       # Design system + estilos globales
    ├── main.js         # Home: nav, form contacto, scroll reveal
    ├── tactiq.css      # Estilos específicos TACTIQ
    ├── tactiq.js       # TACTIQ: form demo, scroll reveal
    ├── marketplace.css # Estilos login
    └── marketplace.js  # Auth con Supabase (Google + magic link)
```

## Setup

### 1. Instalar dependencias
```bash
npm install
```

### 2. Variables de entorno
```bash
cp .env.example .env.local
```
Edita `.env.local` con tus credenciales de Supabase:
```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

### 3. Supabase — tablas necesarias

En tu proyecto Supabase, crea estas tablas:

**`contactos`** (formulario del Home)
```sql
create table contactos (
  id         uuid primary key default gen_random_uuid(),
  nombre     text not null,
  email      text not null,
  perfil     text,
  mensaje    text,
  created_at timestamptz default now()
);
```

**`demos`** (formulario de TACTIQ)
```sql
create table demos (
  id         uuid primary key default gen_random_uuid(),
  nombre     text not null,
  email      text not null,
  empresa    text,
  mensaje    text,
  created_at timestamptz default now()
);
```

Habilita RLS y agrega una política de INSERT para `anon`:
```sql
alter table contactos enable row level security;
create policy "insert_anon" on contactos for insert to anon with check (true);

alter table demos enable row level security;
create policy "insert_anon" on demos for insert to anon with check (true);
```

### 4. Supabase Auth (Marketplace)

En el dashboard de Supabase:
- **Authentication → Providers** → habilita Google
- **Authentication → URL Configuration** → agrega `http://localhost:5173` a Redirect URLs
- Para producción agrega tu dominio real

### 5. Desarrollo
```bash
npm run dev
```

### 6. Build para producción
```bash
npm run build
# Output en /dist
```

## Personalización

- **Colores y fuentes**: edita los tokens en `:root` dentro de `src/style.css`
- **Nombres de tablas Supabase**: busca `.from('contactos')` y `.from('demos')` en los archivos JS
- **Datos del portafolio**: edita los `.wine-item` en `index.html` y los `.preview-item` en `marketplace.html`
- **Estadísticas (40+ bodegas, 12 mercados)**: edita los `.stat-value` en `index.html`
