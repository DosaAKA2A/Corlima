// Genera flujo/*.html a partir de capturas/*, inyectando:
//  - <meta robots noindex>
//  - barra fija "PROTOTIPO" con navegacion entre pasos
//  - script que desactiva envios de formulario y bloquea navegar a corlima.pe real
//  - CSS que oculta el popup de Mautic (ruido cross-origin)
// Mantiene capturas/ intacto. Node, sin dependencias.
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'flujo');
fs.mkdirSync(OUT, { recursive: true });

const STEPS = [
  { key: 'home',      out: '01-home.html',              src: 'capturas/01-home/index.html',            label: '1 Home' },
  { key: 'categoria', out: '02-categoria.html',         src: 'capturas/02-categoria/bar.html',         label: '2 Categoria' },
  { key: 'producto',  out: '03-producto.html',          src: 'capturas/03-producto/producto.html',     label: '3 Producto' },
  { key: 'carrito',   out: '04-carrito.html',           src: 'capturas/04-carrito/carrito.html',       label: '4 Carrito' },
  { key: 'checkout',  out: '05-checkout.html',          src: 'capturas/05-checkout/pedido.html',       label: '5 Checkout' },
  { key: 'invitado',  out: '05b-checkout-invitado.html',src: 'capturas/05-checkout/pedido-invitado.html', label: '· Invitado' },
];

function nav(activeKey) {
  const links = STEPS.map(s =>
    `<a href="${s.out}"${s.key === activeKey ? ' class="active"' : ''}>${s.label}</a>`
  ).join('');
  return `<div id="proto-bar">
  <span class="proto-tag"><b>PROTOTIPO</b> &middot; no es el sitio real de Corlima &middot; réplica del flujo para trabajo de UX</span>
  <nav>${links}<a href="../index.html" class="proto-home">&#8962; Inicio</a></nav>
</div>`;
}

const CSS = `<style id="proto-style">
#proto-bar{position:fixed;inset:0 0 auto 0;z-index:2147483000;background:#0d1b3e;color:#fff;
 font:13px/1.4 system-ui,Segoe UI,Arial,sans-serif;display:flex;align-items:center;gap:10px 16px;
 padding:7px 16px;flex-wrap:wrap;box-shadow:0 2px 10px rgba(0,0,0,.35)}
#proto-bar .proto-tag{opacity:.92}
#proto-bar b{color:#ffd23f;letter-spacing:.06em}
#proto-bar nav{display:flex;gap:4px;flex-wrap:wrap;margin-left:auto}
#proto-bar a{color:#cdd6f4;text-decoration:none;padding:3px 9px;border-radius:6px;font-size:12px;white-space:nowrap}
#proto-bar a:hover{background:rgba(255,255,255,.14)}
#proto-bar a.active{background:#ffd23f;color:#0d1b3e;font-weight:600}
#proto-bar a.proto-home{border:1px solid rgba(255,255,255,.25)}
html{scroll-padding-top:56px}
body{margin-top:52px !important}
.mf-notification-iframe,.MauticFocusNotification .mf-notification-iframe{display:none !important}
</style>`;

const SCRIPT = `<script id="proto-script">
(function(){
  // 1) ningun formulario envia datos (es una simulacion estatica)
  document.addEventListener('submit',function(e){e.preventDefault();e.stopPropagation();},true);
  // 2) no salir a corlima.pe real: los clics a ese dominio se anulan; la barra PROTOTIPO manda
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href]');
    if(!a)return;
    if(a.closest('#proto-bar'))return;
    var href=a.getAttribute('href')||'';
    if(href.indexOf('corlima.pe')>-1 || /^https?:\\/\\//i.test(href)===false && /\\/(pedido|carrito|categoria)/.test(href)){
      e.preventDefault();
    }
  },true);
})();
</script>`;

let done = 0;
for (const s of STEPS) {
  const srcPath = path.join(ROOT, s.src);
  let html = fs.readFileSync(srcPath, 'utf8').replace(/^﻿/, ''); // sin BOM

  // noindex + CSS tras <head ...>
  html = html.replace(/<head[^>]*>/i, m =>
    `${m}\n<meta name="robots" content="noindex,nofollow">\n${CSS}`);

  // barra tras <body ...>
  html = html.replace(/<body[^>]*>/i, m => `${m}\n${nav(s.key)}`);

  // script antes del ultimo </body>
  const i = html.toLowerCase().lastIndexOf('</body>');
  if (i > -1) html = html.slice(0, i) + SCRIPT + '\n' + html.slice(i);
  else html += SCRIPT;

  fs.writeFileSync(path.join(OUT, s.out), html); // utf8 sin BOM
  done++;
  console.log('  ok ' + s.out + '  (' + html.length + ' chars)');
}
console.log(done + ' vistas generadas en flujo/');
