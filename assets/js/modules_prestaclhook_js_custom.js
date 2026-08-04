
let haveInvoice = false;
let delivery_cc = false;

if (typeof prestashop !== 'undefined') {
  prestashop.on(
    'selectDeliveryOption',
    function (event) {
      var eventDatas = {};

      Swal.close();

      prestashop.emit('updateContext', {
        success: 1,
        reason: 1,
      });
    }
  );
}

function cleanOptionSelectedCC() {

  var selectedOption = document.querySelector('input.delivery_option_radio:checked');

  if (selectedOption) {
    var deliveryOptions = document.querySelectorAll('input.delivery_option_radio');

    deliveryOptions.forEach(function (option) {
      option.removeAttribute('checked');
    });

    selectedOption.setAttribute('checked', 'checked');
  }
}

$('body').on('click', '.open-selector-store', function () {
  // Obtener el HTML del elemento con el ID 'delivery-options'
  cleanOptionSelectedCC();
  var modalContent = $('.delivery-options').html();

  let closedByX = false;

  Swal.fire({
    title: 'Retiro en Tienda',
    html: '<div id="custom-modal-shipping">' + modalContent + '</div>',  // Agregar un ID al contenedor
    showCancelButton: false,  // Elimina el botón de cancelación
    showConfirmButton: false, // Elimina el botón de confirmación
    showCloseButton: true,  // Agregar la "X" para cerrar
    customClass: {
      popup: 'custom-modal-shipping-wrapper'  // Clase opcional si quieres aplicar más estilos
    },
    didRender: function () {
      // Detectar cuando se hace clic en la "X"
      // const closeButton = document.querySelector('.swal2-close');
      // closeButton.addEventListener('click', function () {
      //   closedByX = true;  // Marcar que el cierre fue por la "X"
      // });
      // $('#custom-modal-shipping').on('click', '.delivery-option', function () {
      //   Swal.close();  // Cerrar el modal al hacer clic en .delivery-option
      // });
    },
    willClose: function () {
      // Capturar el evento de cierre y verificar si fue por la "X"
      // if (closedByX) {
      //   console.log('El modal fue cerrado con la "X".');
      //   // Ejecuta funciones adicionales si fue cerrado con la "X"
      // } else {
      //   console.log('El modal fue cerrado por otro medio.');
      // }
      // Resetear el valor de closedByX para futuros cierres
      closedByX = false;
    }
  });
});

$('body').on('click', '.field-is_business label', function () {
  $('body .field-is_business label').removeClass('selected');
  $(this).addClass('selected');
});

var isBusiness = $('.field-is_business input[name="is_business"]:checked');
if (isBusiness.val() !== undefined) {
  isBusiness.parent().parent().addClass('selected');
} else {
  console.log('No radio button selected');
}

// Formulario de registro usuarios
$('body').on('click', '.showRegisterForm', function () {

  $('.showRegisterContent').slideDown(function () {
  }).addClass('digi-customer').removeClass('digi-guest');
  $('#miniPanelLogin,#miniPanelInfo').slideUp(function () { });
  $(".digi-guest #customer-form .field-checkbox-group-1709686568607-0 .digi-label-text").html("Suscribirse a nuestras novedades de productos, nuevos lanzamientos y promociones exclusivas")

});

// Formulario de registro invitados
$('body').on('click', '.showGuestForm', function () {

  $('.showRegisterContent').slideDown(function () { }).addClass('digi-guest').removeClass('digi-customer');
  $(".digi-guest #customer-form .field-checkbox-group-1709686568607-0 .digi-label-text").html("¡Suscríbete y sé el primero en recibir nuestras novedades, lanzamientos y promociones exclusivas! Puedes darte de baja en cualquier momento.");
  $('#miniPanelLogin,#miniPanelInfo').slideUp().slideUp();

});

$('body').on('click', '.backToStepRegisterForm', function () {

  $('.showRegisterContent').slideUp();
  $('#miniPanelLogin,#miniPanelInfo').slideDown();

});

$('body').on('click', '.digi-mask.active', function () {
  $('.digi-open-menu-mob').trigger('click');
});

// .cat-level-3>.mm_blocks_li>.ets_mm_block>a

$('body').on('click', '.cat-level-3>.mm_blocks_li>.digi-type-CATEGORY', function (event) {
  if (isMobile()) {
    event.preventDefault();
    if (!$(this).parent().hasClass('digi-3-selected')) {
      $('.cat-level-3>.mm_blocks_li').removeClass('digi-3-selected');
      $(this).parent().addClass('digi-3-selected');
      $('.cat-level-3>.mm_blocks_li.digi-list-CATEGORY .ets_mm_block_content').slideUp();
      $(this).parent().find('.ets_mm_block_content').slideDown();
    }
    else {
      $('.cat-level-3>.mm_blocks_li').removeClass('digi-3-selected');
      $('.cat-level-3>.mm_blocks_li.digi-list-CATEGORY .ets_mm_block_content').slideUp();
    }
  }
})

$('body').on('click', '.digi-open-menu-mob', function () {

  if (!$('.digi-category-nav-container').hasClass('active')) {
    $('.digi-open-menu-mob').addClass('menu-opened');
    $('.digi-mask').addClass('active');
    $('.digi-category-nav-container').addClass('active');
    $('.digi-category-nav-container').each(function () {
      this.style.setProperty('display', 'block', 'important');
    });
    disableScroll();

  } else {
    $('.digi-open-menu-mob').removeClass('menu-opened');
    $('.digi-category-nav-container').removeClass('active');
    $('.digi-mask').removeClass('active');
    $('.digi-category-nav-container').each(function () {
      this.style.setProperty('display', 'none', 'important');
    });
    enableScroll();

  }

});

$('body').on('click', '.arrow.closed', function (event) {
  event.preventDefault();
  if ($(this).next().hasClass('cat-level-2')) {
    $(this).addClass('opened').removeClass('closed');
    $(this).next().show();
  } else {
    $(this).removeClass('opened').addClass('closed');
    $(this).next().hide();
  }
})
$('body').on('click', '.arrow.opened', function (event) {
  event.preventDefault();
  if ($(this).next().hasClass('cat-level-2')) {
    $(this).addClass('closed').removeClass('opened');
    $(this).next().hide();
  } else {
    $(this).removeClass('closed').addClass('opened');
    $(this).next().show();
  }
})

function disableScroll() {
  var topOffset = $('.digi-mid-nav').outerHeight();
  if ($('.digi-header').hasClass('digiFixed')) {
    var topOffset2 = 0;
  }
  else {
    var topOffset2 = $('.digi-top-bar').outerHeight();
  }

  $('.digi-category-nav-container.active').css('top', (topOffset + topOffset2) + 'px');
  document.body.style.overflow = 'hidden';
}
function enableScroll() {
  document.body.style.overflow = '';
}



$('body').on('focusout', '.field-digi_cf_rut input', function () {
  $('input[name=rut]').val($(this).val());
});

function showBusiness() {

  $('#customer-form').each(function () {
    $(this).removeClass('message-info-customer').addClass('message-info-business');
  });
  $('.field-firstname').show().find('input').attr('placeholder', 'Nombre (Persona de contacto) *');
  $('.field-lastname').show().find('input').attr('placeholder', 'Apellidos (Persona de contacto) *');
  $('.field-email').show().find('input').attr('placeholder', 'Correo (Persona de contacto) *');

  $('.field-digi_cf_rut').show().find('input').attr('required', 'required');
  $('.field-digi_cf_razon').show().find('input').attr('required', 'required');
  $('.field-digi_cf_giro').show().find('input').attr('required', 'required');
  $('.field-digi_cf_rubro').show().find('select').attr('required', 'required');
  $('.field-file-1709684023004-0').show().find('input').attr('required', 'required');
  // $('.field-checkbox-group-1709686568607-0').show().find('input').attr('required', 'required');
  $('.field-rut').hide();
  $('.field-birthday').hide();
  addAsteriskToRequiredInputs();
  $(".field-file-1709684023004-0").append("<div class='attachHelper'><span class='digiAttachMessage'>Adjunta la Cédula de identidad y copia del e-rut. <br/>Formatos permitidos: JPG,PNG,PDF,DOC(X)<span></div>");
  $(".field-digi_cf_rubro").each(function () {
    // Cambiar el texto de la primera opción en el select dentro del elemento
    $(this).find("select option:first").html("Seleccione un rubro *");
  });
}
function hideBusiness() {
  $('#customer-form').each(function () {
    $(this).removeClass('message-info-business').addClass('message-info-customer');
  });
  $('.field-firstname').show().find('input').attr('placeholder', 'Nombre');
  $('.field-lastname').show().find('input').attr('placeholder', 'Apellidos');
  $('.field-email').show().find('input').attr('placeholder', 'Correo');

  $('.field-digi_cf_rut').hide().find('input').removeAttr('required');
  $('.field-digi_cf_razon').hide().find('input').removeAttr('required');
  $('.field-digi_cf_giro').hide().find('input').removeAttr('required');
  $('.field-digi_cf_rubro').hide().find('select').removeAttr('required');
  $('.field-file-1709684023004-0').hide().find('input').removeAttr('required');
  $('.field-checkbox-group-1709686568607-0').show().find('input').removeAttr('required');
  $('.field-rut').show();
  $('.field-birthday').show();
  $(".field-file-1709684023004-0 .attachHelper").remove();

}

$('body').on('click', '.digi-checkout-step,.backToPreviewStep', function () {
  if (!$(this).hasClass('pending')) {
    $('.checkout-step').css('display', 'none');
    $('.backToPreviewStep').css('display', 'none');

    $($(this).attr('data-backto')).each(function () {
      this.style.setProperty('display', 'block', 'important');
      if ($(this).next().hasClass('backToPreviewStep'))
        $(this).next().show();
    });
    fixFooterToBottom();
  }
});

function fixFooterToBottom() {
  difference = $(document).outerHeight() - $('html').outerHeight();
  if (difference > 40) {
    $('body > section#wrapper').css('min-height', ($(document).outerHeight() - ($('footer#footer').outerHeight() + $('header#header').outerHeight())) + 'px');
  }
}

function isMobile() {
  if ($(window).width() >= 961) {
    return false;
  }
  return true;
}
function initZoom() {

  if ($(window).width() >= 961) {
    if ($('.zoom-container').length) {
      $('.zoom-container').trigger('zoom.destroy');
      $('.zoom-container').zoom();
    }
  }
}

function initMobile() {
  if ($(window).width() <= 961) {
    const productResumeElement = document.querySelector('.product-resume a');
    if (productResumeElement) {
      productResumeElement.click();
    }
  }
}

function getUrlParameter(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param); // Retorna el valor del parámetro si existe
}

function initSlick() {
  // Comprueba si hay un video de YouTube presente
  const hasYouTubeVideo = $('img[data-youtube]').length > 0;

  $('#slider-product-img-container').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.product-miniature-img',
    lazyLoad: 'ondemand'
  });

  $('.product-miniature-img').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '#slider-product-img-container',
    dots: false,
    centerMode: true,
    focusOnSelect: true,
    lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          vertical: false,
          verticalSwiping: false
        }
      },
      {
        breakpoint: 9999, // Un breakpoint muy alto para cubrir todas las resoluciones mayores
        settings: {
          slidesToShow: 4,
          vertical: true,
          verticalSwiping: true
        }
      }
    ]
  });

  if (hasYouTubeVideo) {
    // Oculta el primer thumbnail en el slider de miniaturas
    // $('.product-miniature-img').slick('slickFilter', ':not(:first)');

    // Ajusta el índice inicial del slider principal para mostrar la primera imagen después del video
    $('#slider-product-img-container').slick('slickGoTo', 1, true);

    // Agrega un evento de clic al thumbnail del video para cargar el video de YouTube
    $('.product-miniature-img').on('click', 'img[data-youtube]', function () {
      const videoCode = $(this).data('youtube');
      if (videoCode) {
        createYouTubeEmbed(videoCode);
      }
    });

    // Agrega un evento de clic a los thumbnails que no son del video
    $('.product-miniature-img').on('click', 'img:not([data-youtube])', function () {
      destroyYouTubeEmbed();
      console.log("destroy youtube video");
    });
  }
}

function destroySlick() {
  if ($('#slider-product-img-container').hasClass('slick-initialized')) {
    $('#slider-product-img-container').slick('unslick');
  }
  if ($('.product-miniature-img').hasClass('slick-initialized')) {
    $('.product-miniature-img').slick('unslick');
  }
}

var resizeTimer;
$(window).on('load resize', function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    if (isMobile()) {
      console.log("YES_MOBILE_INITSLICK");
      initSlick();
    } else {
      console.log("NO_MOBILE_DESTROYSLICK");
      destroySlick();
    }
  }, 250); // 250ms de retraso
});

$(document).ready(function () {

  setupThumbnailClick();
  if (isMobile()) {
    initSlick();
  }

  tippy('.custom-tippy', {
    content: (reference) => reference.getAttribute('title'),
  });

  const timerValue = getUrlParameter('timer');

  if (!isMobile()) {
    if (timerValue) {
      // Si 'timer' está presente, ejecutar HoverDropdown con el valor del temporizador
      const delay = parseInt(timerValue, 10); // Convertir el valor a número
      if (!isNaN(delay)) {
        initializeHoverDropdown('li.cat-level-1', 'ul.cat-level-2', delay, delay); // Usar el valor del GET
      } else {
        console.error('Valor de "timer" no válido. Debe ser un número.');
      }
    } else {
      // Si no está presente, ejecutar HoverDropdown con los valores por defecto
      initializeHoverDropdown('li.cat-level-1', 'ul.cat-level-2', 800, 800);
    }
  }

  $('input[name=birthday]').mask('00/00/0000');

  // Re-ejecutar la función cuando la ventana cambie de tamaño
  $(window).resize(function () {
    if (!isMobile()) {
      document.addEventListener('DOMContentLoaded', setupThumbnailClick);
      initZoom();
    }

  });

  initMobile();


  var numberOfItems = $('.productListsRecommendation > div').length; // Cambia '.product-item' por el selector correcto de tus elementos
  var windowWidth = $(window).width(); // Ancho actual de la ventana

  // Definir cuántos elementos se necesitan para mostrar el carrusel dependiendo del tamaño de pantalla
  var minItemsForCarousel;

  if (windowWidth >= 961) {
    minItemsForCarousel = 4;  // Necesitamos al menos 4 elementos en resoluciones grandes
  } else if (windowWidth >= 768) {
    minItemsForCarousel = 3;  // Necesitamos al menos 3 elementos en resoluciones medianas
  } else {
    minItemsForCarousel = 2;  // Necesitamos al menos 2 elementos en resoluciones pequeñas
  }

  // Verificar si hay suficientes elementos para inicializar el carrusel
  if (numberOfItems >= minItemsForCarousel) {
    $('.productListsRecommendation').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 1500,
      responsive: [
        {
          breakpoint: 961,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    });
  } else {
    console.log('No hay suficientes elementos para inicializar Slick para esta resolución.');
  }

  // if (isStickyParamPresent()) {
  makeColumnSticky("#digi-sticky-me", 0, $('.digi-header').height() + 10);
  // }

  // Fix Full Header
  fixHeaderOnScroll('header', 'body > main');

  // Ocultar campo pais
  if ($("div.field-id_country").length) {
    $("div.field-id_country").addClass("hidden");
  }

  // MIN HEIGHT TO STICK FOOTER CHECKOUT
  fixFooterToBottom()

  if ($("#checkout-personal-information-step").hasClass('-complete') || $("#checkout-personal-information-step").hasClass('-current')) {
    $('#checkout-step-identity').removeClass('pending').addClass('complete');
  }

  if ($("#checkout-addresses-step").hasClass('-complete') || $("#checkout-addresses-step").hasClass('-current')) {
    $('#checkout-step-address').removeClass('pending').addClass('complete');
  }

  if ($("#checkout-delivery-step").hasClass('-complete') || $("#checkout-delivery-step").hasClass('-current')) {
    $('#checkout-step-shipping').removeClass('pending').addClass('complete');
  }

  if ($("#checkout-payment-step").hasClass('-complete') || $("#checkout-payment-step").hasClass('-current')) {
    $('#checkout-step-payment').removeClass('pending').addClass('complete');
  }

  if ($('input[name="is_business"]:checked').val() == 1) {
    showBusiness();
  } else {
    hideBusiness();
  }

  $('input[name=is_business]').on('click', function (event) {
    if ($(this).val() == 1) {
      showBusiness();
    }
    else {
      hideBusiness();
    }
  });

  $('.digi-collapse-toggle').on('click', function (event) {
    event.preventDefault();

    // var targetId = $(this).attr('href');
    // var $targetElement = $(targetId);

    // if ($targetElement.is(':visible')) {
    //   // Ocultar con efecto slideUp
    //   $targetElement.slideUp(300, function () {
    //     $(this).removeClass('show');
    //   });
    //   $(this).attr('aria-expanded', 'false');
    //   $(this).find('.collapse-arrow-down').show();
    //   $(this).find('.collapse-arrow-up').hide();
    // } else {
    //   // Mostrar con efecto slideDown
    //   $targetElement.slideDown(300, function () {
    //     $(this).addClass('show');
    //   });
    //   $(this).attr('aria-expanded', 'true');
    //   $(this).find('.collapse-arrow-down').hide();
    //   $(this).find('.collapse-arrow-up').show();
    // }
  });
});


function slideUp(element, duration = 400) {
  element.style.height = `${element.offsetHeight}px`;
  element.style.transitionProperty = `height, margin, padding`;
  element.style.transitionDuration = `${duration}ms`;
  element.style.boxSizing = `border-box`;
  element.style.height = 0;
  element.style.overflow = `hidden`;

  window.setTimeout(() => {
    element.style.display = `none`;
    element.style.removeProperty(`height`);
    element.style.removeProperty(`overflow`);
    element.style.removeProperty(`transition-duration`);
    element.style.removeProperty(`transition-property`);
    element.style.removeProperty(`box-sizing`);
  }, duration);
}

function slideDown(element, duration = 400) {
  element.style.removeProperty(`display`);
  let display = window.getComputedStyle(element).display;

  if (display === `none`) {
    display = `block`;
  }

  element.style.display = display;
  const height = element.offsetHeight;
  element.style.overflow = `hidden`;
  element.style.height = 0;
  element.style.boxSizing = `border-box`;
  element.offsetHeight; // force reflow
  element.style.transitionProperty = `height, margin, padding`;
  element.style.transitionDuration = `${duration}ms`;
  element.style.height = `${height}px`;

  window.setTimeout(() => {
    element.style.removeProperty(`height`);
    element.style.removeProperty(`overflow`);
    element.style.removeProperty(`transition-duration`);
    element.style.removeProperty(`transition-property`);
    element.style.removeProperty(`box-sizing`);
  }, duration);
}

function toggleSlide(element, duration = 400) {
  if (window.getComputedStyle(element).display === `none`) {
    return slideDown(element, duration);
  } else {
    return slideUp(element, duration);
  }
}

document.querySelectorAll('.parent-slide').forEach(button => {
  button.addEventListener('click', function () {
    const contentSelector = this.getAttribute('data-content');
    const contentElement = document.querySelector(contentSelector);

    if (contentElement) {
      toggleSlide(contentElement);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {

  // Verificar que estamos en el body con id="product"
  if (document.body.id !== 'product') {
    return; // Si no estamos en la página del producto, no ejecutar el código
  }

  function moveElements() {
    const elementToMove = document.getElementById('digiResume');
    const newLocation = document.getElementById('containerDataMobile');
    const originalLocation = document.getElementById('digiDetailProduct');

    if (window.innerWidth < 768) {
      // Verificar si el elemento ya está en la nueva ubicación
      if (newLocation.contains(elementToMove)) {
        return; // Si ya está en la nueva ubicación, no hacer nada
      }
      newLocation.appendChild(elementToMove); // Mover el elemento a la nueva ubicación
    } else {
      // Verificar si el elemento ya está en la ubicación original
      if (originalLocation.contains(elementToMove)) {
        return; // Si ya está en la ubicación original, no hacer nada
      }
      originalLocation.appendChild(elementToMove); // Mover el elemento de vuelta a su ubicación original
    }
  }

  // Ejecutar al cargar la página
  moveElements();

  // Ejecutar al cambiar el tamaño de la ventana
  window.addEventListener('resize', moveElements);

});


function openForm() {
  // URL para obtener los datos desde la API (GET)
  const apiUrl = prestashop.urls.base_url + `module/xpeccompanyinvoice/invoice?method=getInvoiceData`;

  // Hacer una solicitud a la API para obtener los datos existentes por idCustomer e idCart
  fetch(apiUrl, {
    method: "GET",
    credentials: "include" // Incluir credenciales si es necesario
  })
    .then(response => response.json()) // Parsear la respuesta JSON
    .then(data => {
      const empresa = data.response ? data.response : {};

      // Abrir el formulario SweetAlert2 con los datos precargados si existen
      Swal.fire({
        title: 'Compra con Factura',
        html: `
          <form id="digi-company-form">
            <div>
              <label for="invoice_rut">RUC Empresa:</label>
              <input type="text" id="invoice_rut" class="swal2-input" placeholder="Ingrese RUC Empresa" value="${empresa.rut || ''}" required maxlength="11" />
            </div>
            <div>
              <label for="invoice_razon_social">Razón Social:</label>
              <input type="text" id="invoice_razon_social" class="swal2-input" placeholder="Ingrese Razón Social" value="${empresa.razon || ''}" required />
            </div>
            <div>
              <label for="invoice_giro">Giro:</label>
              <input type="text" id="invoice_giro" class="swal2-input" placeholder="Ingrese Giro" value="${empresa.giro || ''}" required />
            </div>
            <div>
              <label for="invoice_direccion">Dirección:</label>
              <input type="text" id="invoice_direccion" class="swal2-input" placeholder="Ingrese Dirección" value="${empresa.direccion || ''}" required />
            </div>
            <div>
              <label for="invoice_region">Región:</label>
              <select id="invoice_region" class="swal2-input" required>
                <option selected disabled>Seleccione una opción</option>
                <option value="R1" ${empresa.region === 'R1' ? 'selected' : ''}>TARAPACÁ</option>
                <option value="R10" ${empresa.region === 'R10' ? 'selected' : ''}>LOS LAGOS</option>
                <option value="R11" ${empresa.region === 'R11' ? 'selected' : ''}>AISÉN DEL GRAL. C. IBÁÑEZ DEL CAMPO</option>
                <option value="R12" ${empresa.region === 'R12' ? 'selected' : ''}>MAGALLANES Y LA ANTÁRTICA CHILENA</option>
                <option value="R14" ${empresa.region === 'R14' ? 'selected' : ''}>LOS RÍOS</option>
                <option value="R15" ${empresa.region === 'R15' ? 'selected' : ''}>ARICA Y PARINACOTA</option>
                <option value="R2" ${empresa.region === 'R2' ? 'selected' : ''}>ANTOFAGASTA</option>
                <option value="R3" ${empresa.region === 'R3' ? 'selected' : ''}>ATACAMA</option>
                <option value="R4" ${empresa.region === 'R4' ? 'selected' : ''}>COQUIMBO</option>
                <option value="R5" ${empresa.region === 'R5' ? 'selected' : ''}>VALPARAÍSO</option>
                <option value="R6" ${empresa.region === 'R6' ? 'selected' : ''}>LIBERTADOR GRAL BERNARDO O'HIGGINS</option>
                <option value="R7" ${empresa.region === 'R7' ? 'selected' : ''}>MAULE</option>
                <option value="R8" ${empresa.region === 'R8' ? 'selected' : ''}>BÍOBÍO</option>
                <option value="R9" ${empresa.region === 'R9' ? 'selected' : ''}>ARAUCANÍA</option>
                <option value="RM" ${empresa.region === 'RM' ? 'selected' : ''}>METROPOLITANA DE SANTIAGO</option>
              </select>
            </div>
            <div>
              <label for="invoice_comuna">Comuna:</label>
              <select id="invoice_comuna" class="swal2-input" required>
                <option value="" disabled selected>- Seleccione region -</option>
              </select>
            </div>
            <div>
              <label for="invoice_contacto">Contacto:</label>
              <input type="text" id="invoice_contacto" class="swal2-input" placeholder="Ingrese Nombre de Contacto" value="${empresa.contacto || ''}" required />
            </div>
            <div>
              <label for="invoice_telefono">Teléfono:</label>
              <input type="tel" id="invoice_telefono" class="swal2-input" placeholder="Ingrese Teléfono" value="${empresa.telefono || ''}" required />
            </div>
            <div>
              <label for="invoice_email">Email:</label>
              <input type="email" id="invoice_email" class="swal2-input" placeholder="Ingrese Email" value="${empresa.email || ''}" required />
            </div>
          </form>
        `,
        showCancelButton: true,
        cancelButtonText: 'Cerrar',
        confirmButtonText: 'Guardar',
        reverseButtons: true,
        focusConfirm: false,
        preConfirm: () => {
          // Obtener los valores de los campos
          const rut = document.getElementById('invoice_rut').value;
          const razonSocial = document.getElementById('invoice_razon_social').value;
          const giro = document.getElementById('invoice_giro').value;
          const direccion = document.getElementById('invoice_direccion').value;
          const region = document.getElementById('invoice_region').value;
          const comuna = document.getElementById('invoice_comuna').value;
          const contacto = document.getElementById('invoice_contacto').value;
          const telefono = document.getElementById('invoice_telefono').value;
          const email = document.getElementById('invoice_email').value;

          // Validar que todos los campos estén completos
          if (!rut || !razonSocial || !giro || !direccion || !region || !comuna || !contacto || !telefono || !email) {
            Swal.showValidationMessage('Por favor, complete todos los campos.');
            return false;
          }

          // Retornar los datos para ser enviados
          return {
            rut,
            razonSocial,
            giro,
            direccion,
            region,
            comuna,
            contacto,
            telefono,
            email
          };
        },
        customClass: {
          popup: 'digi-modal-invoice',
          confirmButton: 'custom-button',
          cancelButton: 'custom-button-cancel'
        }
      }).then((result) => {

        if (result?.dismiss && !haveInvoice) {
          chooseBoleta();
        }
        else {
          if (result?.value?.rut) {
            // Enviar los datos al servidor utilizando POST
            const postData = new URLSearchParams();
            postData.append("method", "saveInvoiceData");
            postData.append("rut", result.value.rut);
            postData.append("razon", result.value.razonSocial);
            postData.append("giro", result.value.giro);
            postData.append("direccion", result.value.direccion);
            postData.append("region", result.value.region);
            postData.append("comuna", result.value.comuna);
            postData.append("contacto", result.value.contacto);
            postData.append("telefono", result.value.telefono);
            postData.append("email", result.value.email);
            postData.append("comentarios", ""); // Puedes agregar comentarios si es necesario

            fetch(prestashop.urls.base_url + "module/xpeccompanyinvoice/invoice?method=saveInvoiceData", {
              method: "POST",
              body: postData,
              mode: "cors",
              credentials: "include",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            })
              .then(response => response.json())
              .then(data => {
                if (data.result) {
                  haveInvoice = true;
                  Swal.fire("Guardado", "Los datos han sido guardados con éxito.", "success");
                } else {
                  Swal.fire("Error", "Hubo un problema al guardar los datos.", "error");
                }
              })
              .catch(error => {
                Swal.fire("Error", "No se pudo guardar la información.", "error");
                // console.error("Error al enviar los datos:", error);
              });
          }
        }

      });

      $('#invoice_region').trigger('change');
      setTimeout(function () {
        $("#invoice_comuna").val(data.response.comuna);
      }, 500);

    })
    .catch(error => {
      // Manejar el error de la API
      // console.error('Error al obtener los datos de la API:', error);
      Swal.fire('Error', 'No se pudo obtener la información de la empresa.', 'error');
    });
}

$('body').on('change', '#invoice_region', function () {
  $.ajax({
    type: 'post',
    url: prestashop.urls.base_url + 'modules/xpeccompanyinvoice/xpeccompanyinvoice_ajax.php',
    data: {
      method: 'fillComuna',
      idRegion: $(this)[0].value
    },
    dataType: 'json',
    success: function (response) {
      var select = $("body #invoice_comuna");

      if (select.prop) {
        var options = select.prop('options');
      }
      else {
        var options = select.attr('options');
      }

      $('option', select).remove();

      $.each(response.result, function (val, item) {
        options[options.length] = new Option(item.name, item.id);
      });
    }
  });
})


function openAccord(mainSelector, selector) {
  if ($(selector).hasClass('active')) {
    $(mainSelector).removeClass('selected');
    $(selector).removeClass('active');
    $(selector).slideUp();
  }
  else {
    $(mainSelector).addClass('selected');
    $(selector).addClass('active');
    $(selector).slideDown();
  }
}

function confirmDeleteInvoice() {
  // Usamos SweetAlert2 para pedir la confirmación al usuario
  Swal.fire({
    title: '¿Estás seguro?',
    text: "Esta acción eliminará los datos de la factura y continuará con la boleta.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true
  }).then((result) => {
    console.log('RESULTADO', result);
    if (result.value == true) {
      // Si el cliente confirma, hacemos la solicitud al endpoint para eliminar los datos
      $.ajax({
        url: prestashop.urls.base_url + 'module/xpeccompanyinvoice/invoice?method=deleteInvoice',
        type: 'POST',
        dataType: 'json',
        success: function (response) {
          if (response.status) {
            Swal.fire('Eliminado', 'Los datos de la factura han sido eliminados.', 'success');
            // Aquí puedes agregar más lógica si es necesario continuar con el proceso de boleta
          } else {
            Swal.fire('Error', 'Hubo un problema al eliminar los datos de la factura.', 'error');
          }
        },
        error: function () {
          Swal.fire('Error', 'No se pudo conectar con el servidor.', 'error');
        }
      });
    } else if (result.dismiss) { //  === Swal.DismissReason.cancel
      chooseInvoice();
    }
  });
}

function chooseInvoice() {
  $('.choiceBoleta').removeClass('selected').addClass('noSelected');
  $('.choiceFactura').removeClass('noSelected').addClass('selected');
}

function chooseBoleta() {
  $('.choiceFactura').removeClass('selected').addClass('noSelected');
  $('.choiceBoleta').removeClass('noSelected').addClass('selected');
}

document.querySelectorAll('.choiceFactura').forEach(button => {
  button.addEventListener('click', function () {
    chooseInvoice();
    openForm();

  });
});

document.querySelectorAll('.choiceBoleta').forEach(button => {
  button.addEventListener('click', function () {
    chooseBoleta();

    if (haveInvoice == true) {
      confirmDeleteInvoice();
    }
  });
});

if (typeof prestashop !== 'undefined') {
  prestashop.on('getContextLoaded', function (event) {
    if (event.have_invoice) {
      haveInvoice = true;
      $('.choiceFactura').addClass('selected').removeClass('noSelected');
    }
    else {
      $('.choiceBoleta').addClass('selected').removeClass('noSelected');
    }
    if (event.type_of_delivery == 'digitag_clickandcollectlp') {
      delivery_cc = true;
      $('.no-module-static-option.open-selector-store').addClass('active');
      $('.no-module-static-option.open-selector-store .carrier-delay').html(event.carrier_name);
    }
    else {
      $('.no-module-static-option.open-selector-store .carrier-delay').html("Selecciona una tienda de retiro");
      delivery_cc = false;
    }
  });
}

$(document).on('click', '.delivery-option.digi-stylized-wrapper', function () {
  $('.delivery-option.digi-stylized-wrapper').removeClass('active');
  $(this).addClass('active');
});

function fixHeaderOnScroll(selectorToFix, selectorToPlus) {
  // Obtener el elemento del header y de la barra .digi-top-bar
  var header = document.querySelector(selectorToFix);
  var topbar = document.querySelector('.digi-top-bar');
  var elementToPlus = document.querySelector(selectorToPlus);

  if (header && topbar && elementToPlus) {
    var topbarHeight = topbar.offsetHeight;
    window.addEventListener('scroll', function () {

      var scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > topbarHeight) {
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.left = '0';
        header.style.right = '0';
        header.style.zIndex = '250';

        elementToPlus.style.paddingTop = header.offsetHeight + 'px';
        header.classList.add('digiFixed');
      } else {
        header.style.position = 'relative';
        elementToPlus.style.paddingTop = '0';
        header.classList.remove('digiFixed');
      }
    });
  } else {
    // console.error('No se encontraron los elementos necesarios: header, topbar o elemento al que se le aplicará el padding-top.');
  }
}

// $('body').on('keyup', '.rut, input[name=rut], input[name=digi_cf_rut], #invoice_rut', function () {
//   var $this = $(this);
//   var myRut = $this.val();
//   var attrName = $this.attr("name");

//   // Evitar que el valor del RUT empiece con 0
//   if (myRut.substring(0, 1) == 0) {
//     $this.val(myRut.substr(1));
//   }

//   // Usar el plugin para validar el RUT
//   $this.Rut({
//     on_error: function () {
//       // Desactivar temporalmente el evento keyup para evitar el bucle
//       $this.off('keyup');

//       // Limpiar el valor y mostrar la alerta
//       $this.val("");
//       $this.focus();
//       alert('Rut incorrecto');

//       // Volver a activar el evento keyup después de la validación
//       $this.on('keyup', function () {
//         // Aquí puedes agregar más lógica si es necesario
//       });
//     },
//     on_success: function () {
//       if ($this.val() == "55.555.555-5" || $this.val() == "66.666.666-6") {
//         // Limpiar el valor y mostrar la alerta
//         $this.val("");
//         $this.focus();
//         alert('Rut incorrecto');
//       }
//       else {
//         // Formatear el valor correctamente
//         $this.val($this.val().replace("k", "K"));
//       }
//     },
//     format_on: 'keyup'
//   });
// });

function makeColumnSticky(selector, topOffset = 0, paddingTop = 0) {
  const column = document.querySelector(selector);

  if (!column) {
    // console.error("No se encontró la columna con el selector:", selector);
    return;
  }

  // Obtener el valor de offsetTop para que la columna quede sticky después de cierto scroll

  const columnOffsetTop = column.offsetTop;
  // Escuchar el evento de scroll en la ventana
  window.addEventListener('scroll', function () {
    // Obtener la cantidad de scroll vertical
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    // Si el scroll ha superado el topOffset, hacer que la columna sea sticky
    if (scrollTop > columnOffsetTop - topOffset) {
      column.classList.add('sticky-active');
      // column.style.position = 'sticky';
      // column.style.top = `${topOffset}px`;  // Ajuste de la posición sticky con topOffset
      column.style.paddingTop = `${paddingTop}px`; // Agregar padding-top al body u otro elemento
    } else {
      column.classList.remove('sticky-active');
      // column.style.position = '';
      // column.style.top = '';
      column.style.paddingTop = '';
    }
  });
}

// Función para verificar si existe el parámetro ?sticky en la URL
function isStickyParamPresent() {
  const params = new URLSearchParams(window.location.search); // Obtener los parámetros de la URL
  return params.has('sticky'); // Devolver true si ?sticky existe, de lo contrario false
}

function setupThumbnailClick() {
  console.log("SET THUMBS");
  const thumbnails = document.querySelectorAll('.my-thumb');
  const mainImageDesktop = document.querySelector('.zoom-image');
  const zoomContainer = document.querySelector('.zoom-container');

  if (!mainImageDesktop || !zoomContainer) {
    console.error('No se encontró la imagen principal o el contenedor de zoom');
    return;
  }

  function updateZoom(newImageSrc) {
    // Destruir el zoom existente
    $('.zoom-container').trigger('zoom.destroy');

    // Actualizar la imagen principal
    mainImageDesktop.setAttribute('src', newImageSrc);

    // Esperar a que la nueva imagen se cargue antes de reinicializar el zoom
    mainImageDesktop.onload = function () {
      // Reinicializar el zoom con la nueva imagen
      $('.zoom-container').zoom({
        url: newImageSrc,
        onZoomIn: function () {
          console.log('Zoom in');
        },
        onZoomOut: function () {
          console.log('Zoom out');
        }
      });
    };
  }

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', function () {
      $('.my-thumb').removeClass('myActiveDigitag')
      $(this).addClass('myActiveDigitag');
      const newImageSrc = thumbnail.getAttribute('data-image-large-src');
      const newYoutube = thumbnail.getAttribute('data-youtube');

      if (newImageSrc) {
        var div = document.querySelector('div.d-none.d-lg-block.zoom-container');

        destroyYouTubeEmbed();

        // Verificamos si el div fue encontrado
        if (!div) {
          setupThumbnailClick();
        }
        updateZoom(newImageSrc);
      }
      else if (newYoutube) {
        createYouTubeEmbed(newYoutube);
      }
      else {
        console.error('El thumbnail no tiene el atributo data-image-large-src');
      }
    });
  });

  // Inicializar el zoom para la imagen inicial
  if (!isMobile()) {
    $('.zoom-container').zoom();
  }
}

// Llamar a la función cuando el DOM esté listo



// Inicializar el efecto de zoom
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('DOMContentLoaded', setupThumbnailClick);
  if (!isMobile()) {
    initZoom();
  } else {
  }
});



function addAsteriskToRequiredInputs() {
  // Seleccionar todos los inputs con el atributo 'required'
  var requiredInputs = document.querySelectorAll('input[required]');

  requiredInputs.forEach(function (input) {
    // Obtener el placeholder actual o una cadena vacía si no existe
    var placeholder = input.getAttribute('placeholder') || '';

    // Si el tipo de input es 'password'
    if (input.type === 'password') {
      // Si el placeholder no es "Contraseña *", agregarlo
      if (placeholder !== 'Contraseña *') {
        input.setAttribute('placeholder', 'Contraseña *');
      }
    } else {
      // Para otros tipos de input, añadir el asterisco si aún no lo tiene
      if (!placeholder.endsWith('*')) {
        input.setAttribute('placeholder', placeholder + '*');
      }
    }
  });
}

// Ejecutar la función
document.addEventListener('DOMContentLoaded', addAsteriskToRequiredInputs);


function initializeHoverDropdown(parentSelector, childSelector, hoverDelay = 500, hideDelay = 500) {
  var hoverTimer, hideTimer;

  // Verificar que existan los elementos correspondientes a parentSelector y childSelector
  if ($(parentSelector).length === 0 || $(childSelector).length === 0) {
    console.warn('No se encontraron los elementos correspondientes a los selectores proporcionados.');
    return; // Si no existen, salir de la función
  }

  // Evento para mouseenter (cuando el mouse entra en el elemento padre)
  $(parentSelector).on('mouseenter', function () {
    var $parent = $(this);
    var $child = $parent.find(childSelector);

    // Verificar que el elemento hijo exista antes de proceder
    if ($child.length === 0) {
      return;
    }

    // Cancelar cualquier temporizador de ocultar anterior
    clearTimeout(hideTimer);

    // Remover la clase 'active' de todos los demás elementos padre antes de activar el actual
    $(parentSelector).not($parent).removeClass('active');

    // Cancelar cualquier temporizador previo de mostrar
    clearTimeout(hoverTimer);

    // Crear un nuevo temporizador para agregar la clase después del delay
    hoverTimer = setTimeout(function () {
      // Asegurarse de que ningún otro menú esté activo
      $parent.addClass('active');
    }, hoverDelay);
  });

  // Evento para mouseleave (cuando el mouse sale del elemento padre)
  $(parentSelector).on('mouseleave', function () {
    var $parent = $(this);
    var $child = $parent.find(childSelector);

    if ($child.length === 0) {
      return;
    }

    // Cancelar el temporizador de mostrar
    clearTimeout(hoverTimer);

    // Verificar si otro menú ya está activo. Si lo está, no permitir que el menú actual se reactive.
    if ($(parentSelector + '.active').not($parent).length > 0) {
      return; // No hacer nada si otro menú está activo
    }

    // Crear un nuevo temporizador para quitar la clase después del hideDelay
    hideTimer = setTimeout(function () {
      $parent.removeClass('active');
    }, hideDelay);
  });
}

function createYouTubeEmbed(videoCode) {
  const mainContainer = document.getElementById('main-img-container');
  if (!mainContainer) {
    console.error('Container #main-img-container not found');
    return;
  }

  // Create a new div for the video
  const videoContainer = document.createElement('div');
  videoContainer.id = 'digi-youtube-container';
  videoContainer.style.position = 'absolute';
  videoContainer.style.top = '0';
  videoContainer.style.left = '0';
  videoContainer.style.width = '100%';
  videoContainer.style.height = '100%';
  videoContainer.style.zIndex = '10';

  // Append the video container to the main container first
  mainContainer.appendChild(videoContainer);

  // You can add additional styles or classes to the video container here
  // For example:
  // videoContainer.classList.add('your-custom-class');
  // or
  // videoContainer.style.backgroundColor = 'black';

  // Create the iframe element
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${videoCode}`;
  iframe.width = '100%';
  iframe.height = '100%';
  iframe.frameBorder = '0';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;

  // Append the iframe to the video container
  videoContainer.appendChild(iframe);
}

function destroyYouTubeEmbed() {
  const videoContainer = document.getElementById('digi-youtube-container');
  if (videoContainer) {
    videoContainer.remove();
  } else {
    console.log('YouTube embed container not found');
  }
}

// Call the function with a YouTube video code
// createYouTubeEmbed('dQw4w9WgXcQ');

// Cerrar/abrir modal terminos condiciones en checkout 
$("#checkout #modal .close").click(function () {

  $("#checkout #modal").removeClass("show");

});

$("#checkout .js-terms a").click(function () {

  if (!$("#checkout #modal").hasClass("show")) {

    $("#checkout #modal").addClass("show");

  }

});
// Cerrar/abrir modal terminos condiciones en checkout

// Flechas galeria zoom - ficha producto
function createZoomGalleryArrowsMinImg() {

  var zoomImgs = $('.product-miniature-img img').length;

  if (zoomImgs > 5) {

    $(".digiContainerLeftImage").append("<a class='nextZoomImg zoomArrow minImg'><i class='icon-chevron_down'></i></a>");
    $(".digiContainerLeftImage").prepend("<a class='prevZoomImg zoomArrow minImg'><i class='icon-chevron_up'></i></a>");

  }

}

function createZoomGalleryArrowsMainImg() {

  var zoomImgs = $('.product-miniature-img img').length;

  if (zoomImgs > 5) {

    $(".digi-product-gallery .product-main-img").prepend("<a class='nextZoomImg zoomArrow mainImg'><i class='icon-chevron_right'></i></a>");
    $(".digi-product-gallery .product-main-img").append("<a class='prevZoomImg zoomArrow mainImg'><i class='icon-chevron_left'></i></a>");

  }

}

function createZoomGalleryArrows() {

  var zoomArrows = $(".zoomArrow");

  if (zoomArrows.length === 0) {
    createZoomGalleryArrowsMinImg();
    createZoomGalleryArrowsMainImg();
  }
  else {
    console.log("ya existen las flechas")
  }

}

function destroyZoomGalleryArrows() {
  console.log("destroy gallery arrows");
  $(".zoomArrow").remove();
}

$(document).ready(function () {

  rucOnlyNumbers();

  var zoomIndex = 0;
  var zoomImgs = $('.product-miniature-img img');

  if (window.matchMedia("(min-width: 992px)").matches) {
    createZoomGalleryArrows();
  }

  $('.digi-product-gallery').on('click', 'a.prevZoomImg', function () {

    //console.log("------------------ PREV BUTTON BEGIN ----------------");

    zoomIndex--;

    if (zoomIndex < 0) {
      zoomIndex = zoomImgs.length - 1;
    }

    $(zoomImgs[zoomIndex]).trigger('click');

    //console.log("----------------- PREV BUTTON END --------------------");

  });

  $('.digi-product-gallery').on('click', 'a.nextZoomImg', function () {

    //console.log("----------------- NEXT BUTTON BEGIN ----------------------");

    zoomIndex++;

    if (zoomIndex >= zoomImgs.length) {
      zoomIndex = 0;
    }

    $(zoomImgs[zoomIndex]).trigger('click');

    //console.log("----------------- NEXT BUTTON END --------------------");

  });

});

$(window).on('resize', function () {

  if (window.matchMedia("(min-width: 992px)").matches) {
    destroyZoomGalleryArrows();
    createZoomGalleryArrows();
  } else {
    destroyZoomGalleryArrows();
  }

});

// Flechas galeria zoom - ficha producto

// Funcion para que los campos RUC solo acepten numeros
function rucOnlyNumbers() {
  // Validacion de campo RUC
  var $rut = $('input[name="rut"], input[name="digi_cf_rut"], input[name="digitag_ruc"]');
  if ($rut.length) {
    // Teclado numérico en móviles
    $rut.attr('inputmode', 'numeric');

    // Filtrar solo dígitos y limitar a 11
    $rut.on('input', function () {
      var v = $(this).val().replace(/\D+/g, '').slice(0, 11);
      if ($(this).val() !== v) {
        $(this).val(v);
      }
    });
  }
}