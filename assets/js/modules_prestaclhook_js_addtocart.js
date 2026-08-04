
$('body').on('click', '.add-to-cart2', function() {
    Swal.fire({
        html: 'Agregando tus productos al carro de compras',
        onBeforeOpen: () => {
            Swal.showLoading();
        }
        ,
        onClose: () => {}
    }).then( (result) => {
        if (result.dismiss === Swal.DismissReason.timer) {}
    }
    );
    if ($("#qty" + $("#product_page_product_id").val()).length >= 1) {
        qty = $("#qty" + $("#product_page_product_id").val()).val();
    } else if ($('body#categoryss').val() === undefined) {
        qty = 1;
    } else if ($('body#product').val() !== undefined) {
        qty = $('#quantity_wanted').val();
    } else {
        qty = 1;
    }
    var added = addToCartCIdProduct($(this).data('idproduct'), qty);
    var idProduct = $(this).data('idproduct');
    if (added.status == true) {
        setTimeout(function() {
            swal.close();
            Swal.fire('Producto agregado al carro de compras', ' ', 'success');
            dataLayer.push({
                ecommerce: null
            });
            prestashop.emit('updateCart', {
                eventType: 'updateCart',
                reason: {
                    'idProductAttribute': 0,
                    'idProduct': idProduct,
                    'linkAction': 'add-to-cart'
                },
                resp: {
                    'quantity': qty
                }
            });
        }, 1000);
        if (added.status == true) {
            $('.cart-products-count,.cart-digi-qty').html(added.qty);
        }
        ;
    } else if (added.status == false) {
        setTimeout(function() {
            swal.close();
            Swal.fire('Su producto no pudo ser agregado', 'Sólo nos quedan ' + added.qty + ' de este producto', 'warning');
        }, 1000);
    }
    ;
});
$('body').on('click', '.add-to-cart2ProductList', function() {
    Swal.fire({
        html: 'Agregando tus productos al carro de compras',
        onBeforeOpen: () => {
            Swal.showLoading();
        }
        ,
        onClose: () => {}
    }).then( (result) => {
        if (result.dismiss === Swal.DismissReason.timer) {}
    }
    );
    qty = $('.' + $(this).data('qtyproduct')).val();
    var added = addToCartCIdProduct($(this).data('idproduct'), qty);
    var idProduct = $(this).data('idproduct');
    if (added.status == true) {
        setTimeout(function() {
            swal.close();
            Swal.fire('Producto agregado al carro de compras', ' ', 'success');
            dataLayer.push({
                ecommerce: null
            });
            prestashop.emit('updateCart', {
                eventType: 'updateCart',
                reason: {
                    'idProductAttribute': 0,
                    'idProduct': idProduct,
                    'linkAction': 'add-to-cart'
                },
                resp: {
                    'quantity': qty
                }
            });
        }, 1000);
        if (added.status == true) {
            $('.cart-products-count,.cart-digi-qty').html(added.qty);
        }
        ;
    } else if (added.status == false) {
        setTimeout(function() {
            swal.close();
            Swal.fire('Su producto no pudo ser agregado', 'Sólo nos quedan ' + added.qty + ' de este producto', 'warning');
        }, 1000);
    }
    ;
});
function addToCartC(idProduct, sizeGroup, sizeValue, quantity, colorGroup, colorValue) {
    var request;
    var arrayGroup = new Array();
    arrayGroup[sizeGroup] = sizeValue;
    arrayGroup[colorGroup] = colorValue;
    $.ajax({
        url: digitag_prestaclhook.url_addtocart,
        data: {
            idProduct: idProduct,
            arrayGroup,
            quantity: quantity
        },
        method: 'POST',
        dataType: 'json',
        async: false,
        success: function(response) {
            request = response;
        }
    });
    return request;
}
function addToCartCReference(reference, quantity) {
    var request;
    $.ajax({
        url: digitag_prestaclhook.url_addtocart,
        data: {
            reference: reference,
            quantity: quantity
        },
        method: 'POST',
        dataType: 'json',
        async: false,
        success: function(response) {
            request = response;
        }
    });
    return request;
}
function addToCartCReferenceFull(reference, quantity) {

    var request;

    Swal.fire({
        html: 'Agregando tus productos al carro de compras',
        onBeforeOpen: () => {
            Swal.showLoading();
        }
        ,
        onClose: () => {}
    }).then( (result) => {
        if (result.dismiss === Swal.DismissReason.timer) {}
    }
    );

    var responseAjax;
    
    $.ajax({
        url: digitag_prestaclhook.url_addtocart,
        data: {
            reference: reference,
            quantity: quantity
        },
        method: 'POST',
        dataType: 'json',
        async: false,
        success: function(response) {
            setTimeout(function() {

                responseAjax = response;
                swal.close();

                if (responseAjax.status == true)
                {
                    Swal.fire('Producto agregado al carro de compras', ' ', 'success');
                    prestashop.emit('updateCart', {
                        eventType: 'updateCart',
                        reason: {
                            'idProductAttribute': 0,
                            'idProduct': responseAjax.id_product,
                            'linkAction': 'add-to-cart'
                        },
                        resp: {
                            'quantity': quantity
                        }
                    });

                    cartFloatUpdate();
                }
                else
                    Swal.fire('Producto no pudo ser agregado al carro de compras', ' ', 'info');
                // dataLayer.push({
                //     ecommerce: null
                // });
            }, 1000);


        }
    });
    return responseAjax;
}
function addToCartCIdProduct(idProduct, quantity) {
    var request;
    $.ajax({
        url: digitag_prestaclhook.url_addtocart,
        data: {
            idProduct: idProduct,
            quantity: quantity,
            whereIdProduct: 1
        },
        method: 'POST',
        dataType: 'json',
        async: false,
        success: function(response) {
            request = response;
            console.log(response);

            cartFloatUpdate();
        }
    });
    return request;
}


document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los contenedores de cantidad
    var quantityContainers = document.querySelectorAll('.digi-qty-btn');

    quantityContainers.forEach(function(container) {
        // Seleccionar el input dentro del contenedor actual
        var qtyInput = container.querySelector('input[name="product-qty"]');

        // Función para actualizar la cantidad
        function updateQuantity(change) {
            var currentQty = parseInt(qtyInput.value);
            var minimalQty = parseInt(qtyInput.getAttribute('minimal_qty'));
            var maxQty = parseInt(qtyInput.getAttribute('max_qty'));

            // Calcular la nueva cantidad
            var newQty = currentQty + (change * minimalQty);

            // Asegurarse de que la nueva cantidad no exceda el maxQty y no sea menor que minimalQty
            if (newQty >= minimalQty && newQty <= maxQty) {
                qtyInput.value = newQty;
            }
        }

        // Manejar el clic en el botón de aumentar dentro del contenedor actual
        container.querySelector('.add-qty').addEventListener('click', function() {
            updateQuantity(1);
        });

        // Manejar el clic en el botón de disminuir dentro del contenedor actual
        container.querySelector('.remove-qty').addEventListener('click', function() {
            updateQuantity(-1);
        });
    });
});

$('body').on('click', 'article.elementor-product-miniature button.elementor-button.elementor-size-xs', function() {
    Swal.fire({
        html: 'Agregando tus productos al carro de compras',
        onBeforeOpen: () => {
            Swal.showLoading();
        }
        ,
        onClose: () => {}
    }).then( (result) => {
        if (result.dismiss === Swal.DismissReason.timer) {}
    });

    if (typeof prestashop !== 'undefined') {
        prestashop.on(
            'updateCart',
            function (event) {
                if (typeof event.resp.success !== 'undefined') {
                    if (event.resp.success) {
                        Swal.fire('Producto agregado al carro de compras', ' ', 'success');

                        cartFloatUpdate();
                    }
                    else {
                        Swal.fire('Producto no pudo ser agregado al carro de compras', ' ', 'info');
                    }
                }
            }
        );
    }
});