var cart = {};

function loadCart() {
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        showCart();
    } else {
        $('.main-cart').html('Кошик пустий!');
    }
}

function showCart() {
    if (!isEmpty(cart)) {
        $('.main-cart').html('Кошик пустий!');
    } else {
        $.getJSON('goods.json', function (data) {
            var goods = data;
            var out = '';
            console.log(data);
            console.log(cart);
            for (var id in cart) {
                console.log(id);
                out += `<img src="images\\${goods[id].img}">`;
                out += `<button data-id="${id}" class="minus-goods">-</button>`;
                out += `<p class="main-cost-much">${cart[id]}</p>`;
                out += `<button data-id="${id}" class="plus-goods">+</button>`;
                out += `<p class="main-cost">${cart[id]*goods[id].cost} грн.</p>`;
                out += `<button data-id="${id}" class="del-goods">x</button>`;
                out += `<p class="name-cart">${goods[id].name}</p>`;
                out += `<br>`;            
            }
            $('.main-cart').html(out);
            $('.del-goods').on('click', delGoods);
            $('.plus-goods').on('click', plusGoods);
            $('.minus-goods').on('click', minusGoods);
        });
    }
}

function delGoods() {
    var id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
}

function plusGoods() {
    var id = $(this).attr('data-id');
    cart[id]++;
    saveCart();
    showCart();
}

function minusGoods() {
    var id = $(this).attr('data-id');
    if (cart[id]==1) {
        delete cart[id];
    } else {
        cart[id]--;
    }
    saveCart();
    showCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function isEmpty(object) {
    for (var key in object)
    if (object.hasOwnProperty(key)) return true;
    return false;
}

function sendEmail() {
    var ename = $('#ename').val();
    var email = $('#email').val();
    var ephone = $('#ephone').val();
    if (ename!='' && email!='' && ephone!='') {
        if (isEmpty(cart)) {
            $.post(
                "core/mail.php",
                {
                    "ename" : ename,
                    "email" : email,
                    "ephone" : ephone,
                    "cart" : cart
                },
                function (data) {
                    console.log(data);
                }
            )
        } else {
            alert('Будь ласка заповніть корзину.')
        }
    } else {
        alert('Будь ласка заповніть всі ці поля!')
    }
}

$(document).ready(function () {
    loadCart();
    $('.send-email').on('click', sendEmail);
});