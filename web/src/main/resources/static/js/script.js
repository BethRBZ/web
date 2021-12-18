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


    $('.add-to-cart').click(function () {


    })
});