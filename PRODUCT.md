# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

PyMEs de la región de Nariño (Colombia) y sur de Ecuador (Carchi, Imbabura). Negocios que necesitan presencia digital, sistemas internos, o migración de software legado. Toman decisiones de tecnología con presupuesto limitado y necesitan un equipo que hable sin jargon y cumpla lo prometido.

## Product Purpose

Sitio marketing de buildroot_, un estudio de software deliberadamente pequeño en Ipiales, Colombia. El sitio existe para convertir visitantes en clientes: demostrar capacidad, generar confianza, y facilitar el primer contacto. El éxito es que un prospecto lea el sitio, entienda qué hacemos y dónde estamos, y escriba.

## Positioning

Acceso directo al que codea — sin intermediarios, sin account managers. El que responde el mensaje es el que escribió el código. Combinado con presencia regional cross-border (Colombia + Ecuador) y un enfoque brutalist de alto rendimiento que no depende de frameworks pesados innecesarios. Un estudio deliberadamente pequeño que toma pocos clientes para poder estar detrás de cada proyecto de principio a fin.

## Operating Context

- El sitio es estático (sin backend, sin base de datos, sin servicios de formularios)
- La página de contacto entrega el mensaje al cliente de correo del visitante (mailto)
- SEO local targeting: "desarrollo web Ipiales", "consultoría técnica Nariño"
- Bilingual: español primario, inglés a paridad
- Mercado regional y cross-border, no global genérico

## Capabilities and Constraints

- Desarrollo de sitios web y aplicaciones web (marketing sites, landing pages, web apps)
- Productos SaaS (MVP a producción en semanas)
- Consultoría técnica (auditorías, migraciones, CTO-as-a-service)
- Sin servicios de forms ni almacenamiento de datos de usuarios
- Vercel Analytics y Speed Insights (cookieless, aggregate)
- Un solo sessionStorage key para la animación de intro
- Next.js 16, TypeScript, Tailwind v4, Framer Motion, React 19

## Brand Commitments

- Nombre: buildroot_ siempre con underscore
- Cursor parpadeante (_) es parte de la identidad visual
- Voz: neutral colombiano, usted sin tuteo ni voseo
- Sentence case en títulos de sección (no title case)
- No nombres de tecnología en contenido client-facing
- No números de tamaño de equipo ("deliberately small studio")
- Estética brutalist de alto rendimiento
- Assets en `public/brand/` (wordmark, underscore separado para parpadeo independiente)

## Evidence on Hand

- Sitio en producción: https://buildroot.co
- Código fuente: `~/Documents/projects/buildroot/front-buildroot/`
- Diccionarios ES/EN en `dictionaries/`
- Proyectos case studies en `lib/projects.ts`
- Style guide vivo en `/style-guide`
- Performance benchmarks en README.md (LCP < 636ms todas las páginas)
- Legal pages: `/privacy` y `/cookies` en ambos idiomas

## Product Principles

1. El sitio demuestra, no dice — el código, la velocidad, y el diseño son la prueba
2. Acceso directo sin intermediarios — el primer contacto es con quien construye
3. Regional before global — presencia en la región que servimos, no pretensiones globales
4. Deliberadamente pequeño como ventaja — pocos clientes, atención completa
5. Performance es parte del producto — cada milisegundo cuenta para la primera impresión

## Accessibility & Inclusion

- ARIA labels en todos los botones e interactivos
- Navegación por teclado soportada
- prefers-reduced-motion respetado en marquees
- Bilingual support (ES primario, EN)
