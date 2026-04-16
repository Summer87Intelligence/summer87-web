# Summer87.ai — Guía de Deployment Completa
## Cursor → GitHub → Vercel → Cloudflare

---

## FASE 1 — Abrir el proyecto en Cursor

### 1.1 Abrir Cursor y el proyecto
```bash
# En terminal de tu máquina:
cd /ruta/donde/guardaste/summer87-web
cursor .
```

### 1.2 Instalar dependencias
```bash
npm install
```

### 1.3 Verificar que funciona localmente
```bash
npm run dev
# → Abrir http://localhost:3000
```

### 1.4 Tips de Cursor (IA en el editor)
- **Cmd+K** → Editar código con lenguaje natural
- **Cmd+L** → Chat con el contexto del archivo abierto
- **Cmd+Shift+L** → Chat con todo el proyecto
- Ejemplo de prompt en Cursor: *"Agrega una sección de FAQ entre About y CTA con 5 preguntas sobre Neuroventas"*

---

## FASE 2 — Subir a GitHub

### 2.1 Inicializar repositorio
```bash
git init
git add .
git commit -m "feat: initial Summer87.ai website"
```

### 2.2 Crear repo en GitHub
1. Ve a github.com/new
2. Nombre: `summer87-web` (privado recomendado)
3. NO inicialices con README (ya tienes uno)

### 2.3 Conectar y subir
```bash
git remote add origin https://github.com/TU_USUARIO/summer87-web.git
git branch -M main
git push -u origin main
```

---

## FASE 3 — Deploy en Vercel

### 3.1 Conectar Vercel con GitHub
1. Ve a **vercel.com** → Login con GitHub
2. Click **"Add New Project"**
3. Selecciona el repo `summer87-web`

### 3.2 Configurar el proyecto en Vercel
| Setting | Valor |
|---------|-------|
| Framework Preset | **Next.js** (auto-detectado) |
| Root Directory | `.` (raíz) |
| Build Command | `npm run build` |
| Output Directory | `.next` (auto) |
| Node.js Version | **20.x** |

### 3.3 Variables de entorno en Vercel
En **Settings → Environment Variables**, añadir:
```
NEXT_PUBLIC_APP_URL = https://summer87.ai
```

### 3.4 Click "Deploy"
Vercel genera una URL temporal tipo: `summer87-web-xxx.vercel.app`  
→ Verifica que todo se ve bien en esa URL.

---

## FASE 4 — Conectar Dominio en Cloudflare + Vercel

### 4.1 Añadir dominio en Vercel
1. En tu proyecto Vercel → **Settings → Domains**
2. Click **"Add Domain"**
3. Escribe: `summer87.ai`
4. También añade: `www.summer87.ai`
5. Vercel te dará los registros DNS que necesitas

### 4.2 Configurar DNS en Cloudflare

Ve a **Cloudflare → DNS → Records** y añade:

#### Para el dominio raíz (summer87.ai):
| Tipo | Nombre | Valor | Proxy |
|------|--------|-------|-------|
| `A`  | `@`    | `76.76.21.21` | **DNS only** (nube gris) ⚠️ |

#### Para www (www.summer87.ai):
| Tipo    | Nombre | Valor                       | Proxy |
|---------|--------|-----------------------------|-------|
| `CNAME` | `www`  | `cname.vercel-dns.com`      | **DNS only** (nube gris) ⚠️ |

> ⚠️ **IMPORTANTE**: Los registros DEBEN estar en modo **DNS only** (nube gris, no naranja).
> Vercel maneja su propio CDN — si activas el proxy de Cloudflare puede causar conflictos con SSL.

### 4.3 Verificar en Vercel
Vercel verificará automáticamente el dominio (puede tardar 5-30 minutos).
Cuando aparezca ✅ en el panel de Vercel, el dominio está activo.

### 4.4 SSL/HTTPS
Vercel provee SSL automático via Let's Encrypt. No necesitas configurar nada.

---

## FASE 5 — Configuración de Cloudflare (Optimización)

Aunque el proxy esté en modo "DNS only" para el apex, puedes aprovechar Cloudflare para:

### 5.1 Email con Cloudflare Email Routing
1. **Email → Email Routing → Enable**
2. Crea regla: `hola@summer87.ai` → `tu-email-personal@gmail.com`
3. Esto te da emails profesionales @summer87.ai gratis

### 5.2 Page Rules (opcional)
Crear regla para redirect www → apex:
- URL: `www.summer87.ai/*`
- Setting: Forwarding URL → 301 → `https://summer87.ai/$1`

### 5.3 Firewall básico
En Security → WAF puedes activar protecciones básicas contra bots.

---

## FASE 6 — CI/CD Automático

Una vez conectado, cada vez que hagas:
```bash
git add .
git commit -m "feat: nueva sección de testimonios"
git push
```

→ Vercel despliega automáticamente en 30-60 segundos.

**Preview deployments**: Cada branch/PR genera una URL de preview.

---

## FASE 7 — Próximos pasos del proyecto

### 7.1 Páginas adicionales a crear
- `/servicios/neuroventas` — Landing específica
- `/servicios/motores-inteligentes` — Landing específica  
- `/suite-bi` — Página producto del ERP
- `/blog` — Blog de contenido SEO
- `/contacto` — Formulario de contacto con Resend

### 7.2 Integraciones recomendadas
| Herramienta | Propósito | Integración |
|-------------|-----------|-------------|
| **Resend** | Emails transaccionales | API en `/api/contact` |
| **Calendly** | Agendar sesiones | Embed en CTA section |
| **HubSpot** | CRM leads | Script en layout |
| **Hotjar** | Heatmaps UX | Script en layout |
| **Google Analytics 4** | Analytics | `@next/third-parties` |

### 7.3 SEO técnico
- Crear `app/sitemap.ts` → genera sitemap automático
- Crear `app/robots.ts` → controla crawlers
- Añadir Schema.org structured data para Organization

### 7.4 Performance targets
Con esta configuración deberías alcanzar:
- Lighthouse Performance: **90+**
- Lighthouse SEO: **100**
- Core Web Vitals: ✅ All green

---

## Stack tecnológico completo

| Capa | Tecnología | Por qué |
|------|-----------|---------|
| Framework | Next.js 14 (App Router) | SSR, SEO, performance óptima |
| Estilos | Tailwind CSS | Utility-first, consistente |
| i18n | next-intl | ES/EN/DE, SEO-friendly |
| Hosting | Vercel | Zero-config para Next.js |
| CDN/DNS | Cloudflare | DDoS, email, analytics |
| Animaciones | Framer Motion (futuro) | Micro-interacciones premium |
| Editor | Cursor | IA integrada en el flujo |

---

*Summer87.ai — Diseñado para el futuro. Desplegado para hoy.*
