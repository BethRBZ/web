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


});