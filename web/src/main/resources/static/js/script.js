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
            orderData = getCartData() || {};

        $.post("/cart", {id: id}, function (data) {
        }).done(function (data) {
            $('.quantity').text(data.length);
        });
        if (cartData.hasOwnProperty(id)) { // если такой товар уже в корзине, то добавляем +1 к его количеству
            cartData[id][4] += 1;
        } else { // если товара в корзине еще нет, то добавляем в объект
            cartData[id] = [id, title, price, text, 1];
        }
        setCartData(cartData); //вызов функции записи данных в sessionStorage
    });
    let cookieName = "city";
    let x = $.cookie(cookieName);
    if (!x) {
        $('#chooseCity').modal('show');
        $('#choseCityDropdown a').on('click', function () {
            let value = $(this).text();
            $.cookie(cookieName, decodeURI(value));
        })
    }
    function get_cookie (cookie_name)
    {
        let results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
        if ( results )
            return ( unescape ( results[2] ) );
        else
            return null;
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
    //переход на страницу корзины
    $(document).on('click',  "#basket",function () {
        location.replace("http://localhost:8081/cart");
    });

    //увеличение количества товара
    $(document).on('click', ".btn-pls", function () {
        let cartData = getCartData();
        let id = $(this).data("id");
        if (cartData.hasOwnProperty(id)) { // если такой товар уже в корзине, то добавляем +1 к его количеству
            cartData[id][4] += 1;
        }
        setCartData(cartData); //вызов функции записи данных в sessionStorage
        openCart();
    });
    //уменьшение количества товара
    $(document).on('click', ".btn-min", function () {
        let cartData = getCartData();
        let id = $(this).data("id");
        if (cartData.hasOwnProperty(id)) { // если такой товар уже в корзине, то убираем -1 к его количеству
            cartData[id][4] -= 1;
        }
        setCartData(cartData); //вызов функции записи данных в sessionStorage
        openCart();
    });
    //удаление товара
    $(document).on('click', ".close", function () {
        let cartData = getCartData();
        let id = $(this).data("id");
        delete cartData[id];
        setCartData(cartData);
        openCart();
    });

    // Получить данные из SessionStorage
    function getCartData(){
        return JSON.parse(sessionStorage.getItem('cart'));
    }
// Записать данные в SessionStorage
    function setCartData(o){
        sessionStorage.setItem('cart', JSON.stringify(o));
    }
    openCart();
    function openCart(){
        let sum=0;
        let cartData = getCartData(), // вытаскиваем все данные корзины
            totalItems = '';
        // если что-то в корзине уже есть, начинаем формировать данные для вывода
        if(cartData !== null){
            totalItems = '<table class="shopping_list"><tr><th style="width:240px"> </th><th style="width:200px"> </th><th> </th><th>  </th></tr>';
            for(let items in cartData){
                totalItems += '<td>' + cartData[items][1] + '</td>';
                totalItems += '<td class="cart-price">' + cartData[items][2] + ' <p> руб.</p></td>';
                totalItems += '<td> <button class="btn-min" style="margin-right:20px" data-id="'+ cartData[items][0] +'">-</button>' + cartData[items][4]
                    + '<button class="btn-pls" style="margin-left:20px" data-id="'+ cartData[items][0] +'">+</button></td>'+'<td><div class="close" data-id="'+ cartData[items][0] +'"></div></td></tr>';
                sum += parseInt(cartData[items][2])*parseInt(cartData[items][4]);
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
    $(document).on('click', ".pay", function () {
        let data = getCartData();
        let newJSON = {

        };
        for (let recordId in data) {
            let record = data[recordId];
            let newRecord = [];
            newRecord.push(record[0]);
            newRecord.push(record[4]);
            newRecord.push(get_cookie("city"));
            newJSON[recordId] = newRecord;
        }
        $.ajax({
            url: '/checkout',
            type: 'POST',
            data: JSON.stringify(newJSON),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) {
                console.log(msg);
            }
        });
        sessionStorage.clear();
    });
});