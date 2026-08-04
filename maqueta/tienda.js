/* Maqueta de compra de Corlima — lógica compartida.
   Nada de esto envía datos: el estado vive en sessionStorage del navegador. */
(function (global) {
  'use strict';

  var SVG = {
    lupa:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/></svg>',
    user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="3.6"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></svg>',
    carro:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 6h16l-1.4 9.3a2 2 0 0 1-2 1.7H7.4a2 2 0 0 1-2-1.7L4 6z"/><circle cx="9" cy="20" r="1.3"/><circle cx="17" cy="20" r="1.3"/></svg>',
    gorro:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M7 21h10M6 13a4 4 0 0 1 1-7.9A4 4 0 0 1 12 3a4 4 0 0 1 5 2.1A4 4 0 0 1 18 13z"/><path d="M6 13v4h12v-4"/></svg>',
    izq:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M15 5l-7 7 7 7"/></svg>',
    der:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M9 5l7 7-7 7"/></svg>',
    camion:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/></svg>',
    tienda:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M4 9h16v11H4zM3 9l1.5-4h15L21 9"/><path d="M10 20v-6h4v6"/></svg>',
    menos:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14"/></svg>',
    mas:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 5v14M5 12h14"/></svg>',
    tacho:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/></svg>',
    candado:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
    ticket:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9V7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a2.5 2.5 0 0 0 0 5v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2a2.5 2.5 0 0 0 0-5z"/><path d="M14 8.5v7" stroke-dasharray="1.6 2.2"/></svg>',
    check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>',
    pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    equis:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    casa:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 11l8-6 8 6v9H4z"/><path d="M10 20v-5h4v5"/></svg>',
    edificio:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="4" width="14" height="16"/><path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h6"/></svg>',
    reloj:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
    calendario:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/></svg>',
    tarjeta:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/></svg>',
    celular:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/></svg>',
    qr:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><path d="M14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z"/></svg>',
    wsp:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2m0 1.8a8.2 8.2 0 1 1-4.2 15.2l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 0 1 12 3.8m-3.3 4c-.2 0-.5.1-.7.4s-.9.9-.9 2.2.9 2.6 1 2.8c.1.2 1.8 2.8 4.4 3.8 2.2.9 2.6.7 3.1.7s1.6-.6 1.8-1.3c.2-.6.2-1.2.2-1.3l-.6-.3-1.7-.8c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1s-1.1-.4-2-1.3c-.7-.6-1.2-1.4-1.3-1.7s0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5s0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4z"/></svg>',
    fb:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7h2.3l.4-2.8h-2.7V9.4c0-.8.2-1.4 1.4-1.4h1.4V5.5c-.3 0-1.2-.1-2.2-.1-2.1 0-3.6 1.3-3.6 3.7v2.1H8.2V14h2.3v7z"/></svg>',
    ig:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="16" height="16" rx="4.6"/><circle cx="12" cy="12" r="3.4"/><circle cx="16.9" cy="7.1" r="1" fill="currentColor" stroke="none"/></svg>'
  };

  var LOGO = 'https://www.corlima.pe/themes/childtheme/assets/img/logo-header-desk.svg';
  var CCL  = 'https://www.corlima.pe/assets/img/logo_asociados_1.png';

  var CATALOGO = [
    { id:1, nombre:'Horno de doble convección con Air Fry 28 L — Black Matte',
      img:'https://www.corlima.pe/2603-cart_default/horno-de-doble-conveccion-con-air-fry-28-l-black-matte.jpg',
      precio:899, original:1299, qty:1 },
    { id:2, nombre:'Hervidor eléctrico de 1.7 L Empire Red',
      img:'https://www.corlima.pe/2582-cart_default/hervidor-electrico-de-17-l-empire-red.jpg',
      precio:549, original:699, qty:1 }
  ];

  /* ---------- estado ---------- */
  var LLAVE = 'corlima_maqueta';
  function leerEstado(){
    try{
      var raw = sessionStorage.getItem(LLAVE);
      if(raw) return JSON.parse(raw);
    }catch(e){}
    return { items: JSON.parse(JSON.stringify(CATALOGO)), cupon:null, cliente:null, entrega:null, pago:null, pedido:null };
  }
  function guardar(st){
    try{ sessionStorage.setItem(LLAVE, JSON.stringify(st)); }catch(e){}
  }
  var estado = leerEstado();

  function money(n){
    return 'S/ ' + Number(n).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d)(?=,))/g, '.');
  }
  function totales(){
    var u=0, bruto=0, neto=0;
    estado.items.forEach(function(it){ u+=it.qty; bruto+=it.original*it.qty; neto+=it.precio*it.qty; });
    var envio = estado.entrega && estado.entrega.costo ? estado.entrega.costo : 0;
    var cupon = estado.cupon ? Math.round(neto*estado.cupon.pct*100)/100 : 0;
    return { unidades:u, bruto:bruto, neto:neto, descuento:bruto-neto, cupon:cupon, envio:envio,
             total: neto - cupon + envio };
  }

  /* ---------- estructura de la página ---------- */
  function chrome(){
    var top = document.createElement('div');
    top.className='tope';
    top.innerHTML='<div class="caja">'+
      '<div class="rota"><button type="button" id="tAnt" aria-label="Mensaje anterior">'+SVG.izq+'</button>'+
      '<span id="tMsg">Entrega hasta en 48 horas</span>'+
      '<button type="button" id="tSig" aria-label="Mensaje siguiente">'+SVG.der+'</button></div>'+
      '<a class="pro" href="#">'+SVG.gorro+' IR A CORLIMA PROFESIONAL</a></div>';

    var cab = document.createElement('header');
    cab.className='cab';
    cab.innerHTML='<div class="caja">'+
      '<a class="marca" href="carrito.html"><img src="'+LOGO+'" alt="Corlima"></a>'+
      '<div class="busca"><input type="text" placeholder="¿Qué estás buscando?" aria-label="Buscar productos">'+
      '<button type="button" aria-label="Buscar">'+SVG.lupa+'</button></div>'+
      '<div class="iconos"><a href="#" aria-label="Mi cuenta">'+SVG.user+'</a>'+
      '<a href="carrito.html" aria-label="Carrito">'+SVG.carro+'<span class="globo" id="globo">0</span></a></div></div>';

    var menu = document.createElement('nav');
    menu.className='menu';
    menu.innerHTML='<div class="caja">'+
      ['COCINA Y COCCIÓN','MESA','BAR','ORGANIZACIÓN Y LIMPIEZA','ELECTRODOMÉSTICOS']
        .map(function(t){ return '<a href="#">'+t+'</a>'; }).join('')+
      '<a class="pro" href="#">CORLIMA PROFESIONAL</a></div>';

    document.body.insertBefore(menu, document.body.firstChild);
    document.body.insertBefore(cab, document.body.firstChild);
    document.body.insertBefore(top, document.body.firstChild);

    var pie = document.createElement('footer');
    pie.className='pie';
    pie.innerHTML='<div class="caja">'+
      '<div><h3>Sobre nosotros</h3><ul><li><a href="#">Sobre nosotros</a></li><li><a href="#">Contacto con nosotros</a></li></ul>'+
      '<h3>Su cuenta</h3><ul><li><a href="#">Mi cuenta</a></li><li><a href="#">Sigue tu pedido</a></li></ul></div>'+
      '<div><h3>Servicios</h3><ul><li><a href="#">Libro de reclamaciones</a></li><li><a href="#">Lista de cobertura</a></li>'+
      '<li><a href="#">Protocolo recojo en tienda</a></li></ul></div>'+
      '<div><h3>Legal</h3><ul><li><a href="#">Términos y condiciones</a></li><li><a href="#">Pago seguro</a></li></ul></div>'+
      '<div class="news"><p>Ingresa tu correo y recibe nuestras Ofertas</p>'+
      '<form onsubmit="return false"><input type="email" placeholder="Ingresa tu correo" aria-label="Tu correo">'+
      '<button type="submit">Enviar</button></form>'+
      '<h3 style="margin-top:22px">Síguenos</h3><div class="redes"><a href="#" aria-label="Facebook">'+SVG.fb+'</a>'+
      '<a href="#" aria-label="Instagram">'+SVG.ig+'</a></div></div></div>'+
      '<div class="caja ccl"><img src="'+CCL+'" alt="Cámara de Comercio de Lima — Asociado"></div>';

    var wa = document.createElement('div');
    wa.className='wa';
    wa.innerHTML='<a class="v" href="#" aria-label="Escríbenos por WhatsApp">'+SVG.wsp+'</a>'+
                 '<a class="a" href="#" aria-label="Atención al cliente">'+SVG.wsp+'</a>';

    var doc = document.createElement('div');
    doc.className='doc';
    doc.innerHTML='Propuesta de rediseño de la compra &middot; documento de trabajo &middot; <a href="../index.html">volver al índice</a>';

    document.body.appendChild(pie);
    document.body.appendChild(wa);
    document.body.appendChild(doc);

    // mensajes que rotan arriba
    var msgs=['Entrega hasta en 48 horas','Despacho a domicilio en todo PERÚ','Atención al cliente personalizada'];
    var i=0, el=document.getElementById('tMsg');
    function ver(n){ i=(n+msgs.length)%msgs.length; el.textContent=msgs[i]; }
    document.getElementById('tAnt').onclick=function(){ ver(i-1); };
    document.getElementById('tSig').onclick=function(){ ver(i+1); };
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches) setInterval(function(){ ver(i+1); }, 5000);
  }

  /* ---------- pasos ---------- */
  function pasos(activo){
    var etapas=[{n:1,t:'Carro',u:'carrito.html'},{n:2,t:'Entrega',u:'entrega.html'},{n:3,t:'Pago',u:'pago.html'}];
    var h='';
    etapas.forEach(function(e,idx){
      if(idx) h+='<div class="raya'+(e.n<=activo?' hecho':'')+'"></div>';
      var cls = e.n===activo ? 'on' : (e.n<activo ? 'hecho' : '');
      var dentro = e.n<activo ? SVG.check : e.n;
      var cuerpo='<span class="bola">'+dentro+'</span><span class="rot">'+e.t+'</span>';
      h += e.n<activo
        ? '<a class="paso '+cls+'" href="'+e.u+'">'+cuerpo+'</a>'
        : '<div class="paso '+cls+'">'+cuerpo+'</div>';
    });
    var cont=document.querySelector('[data-pasos]');
    if(cont){ cont.className='pasos'; cont.innerHTML=h; }
  }

  /* ---------- resumen lateral ---------- */
  function resumen(opts){
    opts = opts || {};
    var t = totales();
    var caja = document.querySelector('[data-resumen]');
    if(!caja) return t;
    var filas =
      '<div class="fila"><span>Productos ('+t.unidades+')</span><b>'+money(t.bruto)+'</b></div>'+
      '<div class="fila ahorro"><span>Descuentos</span><b>- '+money(t.descuento)+'</b></div>';
    if(estado.cupon)
      filas += '<div class="fila ahorro"><span>Cupón '+estado.cupon.codigo+'</span><b>- '+money(t.cupon)+'</b></div>';
    filas += '<div class="fila'+(t.envio?'':' envio')+'"><span>Envío</span><b>'+(t.envio?money(t.envio):'Gratis')+'</b></div>';

    caja.innerHTML =
      '<h2>Resumen de la orden</h2>'+ filas +
      '<div class="total"><span>Total</span><b aria-live="polite">'+money(t.total)+'</b></div>'+
      (opts.boton===false ? '' :
        '<button class="cta" type="button" id="ctaSig"'+(opts.activo===false?' disabled':'')+'>'+(opts.texto||'Continuar compra')+'</button>')+
      (opts.cupon===false ? '' : '<div class="cupon">'+ (estado.cupon
        ? '<div class="cupon-ok">'+SVG.check+'<span>Cupón <b>'+estado.cupon.codigo+'</b> aplicado</span>'+
          '<button type="button" id="cuponQuitar">Quitar</button></div>'
        : '<button class="cupon-btn" id="cuponBtn" aria-expanded="false">'+SVG.ticket+
          '<span>¿Tienes un cupón?</span><span class="flecha">'+SVG.der+'</span></button>'+
          '<div class="cupon-box" id="cuponBox"><input type="text" placeholder="Ej. CORLIMA10" aria-label="Código del cupón">'+
          '<button type="button" id="cuponOk">Aplicar</button></div>'+
          '<p class="cupon-msg" id="cuponMsg"></p>') + '</div>')+
      '<p class="pago-nota">'+SVG.candado+' Pago seguro procesado por Mercado Pago</p>';

    var mt=document.getElementById('mTotal'); if(mt) mt.textContent=money(t.total);
    var gl=document.getElementById('globo'); if(gl) gl.textContent=t.unidades;

    // el resumen se redibuja al aplicar o quitar cupón: hay que volver a enlazar los botones
    if(opts.alSeguir){
      var bs=document.getElementById('ctaSig'); if(bs) bs.onclick=opts.alSeguir;
      var bm=document.getElementById('ctaMovil');
      if(bm){ bm.onclick=opts.alSeguir; bm.disabled=(opts.activo===false); }
    }

    var quitar=document.getElementById('cuponQuitar');
    if(quitar) quitar.onclick=function(){ estado.cupon=null; guardar(estado); resumen(opts); };

    var cb=document.getElementById('cuponBtn');
    if(cb){
      cb.onclick=function(){
        var box=document.getElementById('cuponBox');
        var ab=box.classList.toggle('abierto');
        cb.setAttribute('aria-expanded', ab);
        if(ab) box.querySelector('input').focus();
      };
      document.getElementById('cuponOk').onclick=function(){
        var v=(document.getElementById('cuponBox').querySelector('input').value||'').trim().toUpperCase();
        var msg=document.getElementById('cuponMsg');
        msg.className='cupon-msg ver';
        if(v==='CORLIMA10'){
          estado.cupon={codigo:'CORLIMA10', pct:0.10}; guardar(estado);
          msg.textContent='Cupón aplicado: 10% de descuento.';
          resumen(opts);
        } else {
          msg.classList.add('mal');
          msg.textContent= v ? 'Ese código no es válido.' : 'Escribe un código.';
        }
      };
    }
    return t;
  }

  /* ---------- utilidades ---------- */
  function irA(url){ guardar(estado); location.href=url; }

  global.Tienda = {
    SVG:SVG, estado:estado, money:money, totales:totales,
    guardar:function(){ guardar(estado); },
    reiniciar:function(){ try{ sessionStorage.removeItem(LLAVE); }catch(e){} },
    resumen:resumen, irA:irA,
    iniciar:function(paso, opts){
      chrome();
      pasos(paso);
      return resumen(opts);
    }
  };
})(window);
