$(document).ready(function () {
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
    /* Сортировка*/
    let sortAct = {
        sortnone() {
            $.get("/sort/{none}", function (data, status) {
                $('.main-content').html(data);
            });
        },
        ascending() {
            $.get("/sort/{ascending}", function (data, status) {
                $('.main-content').html(data);
            });
        },
        descending() {
            $.get("/sort/{descending}", function (data, status) {
                $('.main-content').html(data);
            });
        },
        alphabetically() {
            $.get("/sort/{alphabetically}", function (data, status) {
                $('.main-content').html(data);
            });
        },
    };
    /* Клики по сортировке*/
    const sort = document.getElementsByClassName('dropdown-menu')[0];
    if (sort) {
        console.log(1);
        sort.addEventListener('click', function (event) {
            let li = event.target.closest('a');
            let act = li.dataset.command;
            if (act && sortAct[act] !== undefined) {
                sortAct[act]();
            }
        })
    }
    ;


});