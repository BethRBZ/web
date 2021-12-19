$(document).ready(function () {
    let cartCont = document.getElementById('cart_content');
    let cartPay= document.getElementById('sum-order');
    /* Добавление товара в корзину*/
    $(document).on('click', ".cart", function () {
        let id = $(this).data("id");
        let cartData = getCartData() || {}, // получаем данные корзины или создаём новый объект, если данных еще нет
        title = document.getElementsByClassName('card-title')[id-1].innerText,
            price = document.getElementsByClassName('p-price')[id-1].innerText,
            text = document.getElementsByClassName('card-text')[id-1].innerText,
            img = document.getElementsByClassName('card-img-top')[id-1],
            orderData = getCartData() || {};
        let b64image = getBase64Image(img);

        if (cartData.hasOwnProperty(id)) { // если такой товар уже в корзине, то добавляем +1 к его количеству
            cartData[id][5] += 1;
        } else { // если товара в корзине еще нет, то добавляем в объект
            cartData[id] = [id, title, price, b64image, text, 1];
        }
        setCartData(cartData); //вызов функции записи данных в localStorage
    });
    /* Добавление товара в корзину*/
    $(document).on('click', ".cart", function () {
        let id = $(this).data("id");
        $.post("/cart", {id: id}, function (data) {

        }).done(function (data) {
            $('.quantity').text(data.length);
        }).fail(function () {
            alert("failed");
        })
    })
    let cookieName = "city";
    let x = $.cookie(cookieName);
    if (!x) {
        $('#chooseCity').modal('show');
        $('#choseCityDropdown a').on('click', function () {
            let value = $(this).text();
            $.cookie(cookieName, value);
        })
    }
    /* list*/
    let sortAct = {
        ascending() {
            $.get("/sort/{ascending}", function (data, status) {
                $('.main-content').html(data);
            });
        },
        descending() {
            $.get("/sort/{descending}", function (data, status) {
                $('.main-content').html(data);
            });
        }
    };
    /* Cортировки*/
    const sort = document.getElementsByClassName('dropdown-menu')[0];
    if (sort) {
        sort.addEventListener('click', function (event) {
            let li = event.target.closest('a');
            let act = li.dataset.command;
            if (act && sortAct[act] !== undefined) {
                sortAct[act]();
            }
        })
    }
    ;
    /* Категории*/
    let categoryAct = {
        food() {
            $.get("/category/{food}", function (data, status) {
                $('.main-content').html(data);
            });
        },
        notFood() {
            $.get("/category/{notFood}", function (data, status) {
                $('.main-content').html(data);
            });
        },
    };
    /* Клики по категории*/
    const category = document.getElementsByClassName('dropdown-menu')[1];
    if(category) {
        category.addEventListener('click', function (event) {
            let li = event.target.closest('a');
            let act = li.dataset.command;
            if (act && categoryAct[act] !== undefined) {
                categoryAct[act]();
            }
        })
    };
    $(document).on('click', "#basket",function () {
        location.replace("http://localhost:8081/cart");
    });
    // Получить данные
    function getCartData(){
        return JSON.parse(localStorage.getItem('cart'));
    }
// Записать данные
    function setCartData(o){
        localStorage.setItem('cart', JSON.stringify(o));
    }
    openCart();
    function openCart(){
        let sum=0;
        let cartData = getCartData(), // вытаскиваем все данные корзины
            totalItems = '';
        // если что-то в корзине уже есть, начинаем формировать данные для вывода
        if(cartData !== null){
            totalItems = '<table class="shopping_list"><tr><th style="width:150px"> </th><th style="width:240px"> </th><th style="width:200px"> </th><th> </th><th>  </th></tr>';
            for(let items in cartData){
                totalItems += '<tr>' + '<td> <img class="img-cart" src=data:image/png;base64,' + cartData[items][3] +'>' +'</td>';
                totalItems += '<td>' + cartData[items][1] + '</td>';
                totalItems += '<td class="cart-price">' + cartData[items][2] + ' <p> руб.</p></td>';
                totalItems += '<td> <button class="btn-min" style="margin-right:20px" data-id="'+ cartData[items][0] +'">-</button>' + cartData[items][5]
                    + '<button class="btn-pls" style="margin-left:20px" data-id="'+ cartData[items][0] +'">+</button></td>'+'<td><div class="close" data-id="'+ cartData[items][0] +'"></div></td></tr>';
                sum += parseInt(cartData[items][2])*parseInt(cartData[items][5]);
                let totalSum = '<p> Сумма заказа составляет ' + sum + ' руб</p>';
                if(cartPay) {
                    cartPay.innerHTML = totalSum;
                }
            }
            totalItems += '</table>';
            if(cartCont) {
                cartCont.innerHTML = totalItems;
            }
        }
    }


});
function getBase64Image(img) { //функция для преобразования изображения в base64
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    let dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}