$(document).ready(function () {
    LoadIndexItem();
    LoadSupplierCombo();
    ClearScreen();
    $('#table').DataTable({
        "ajax": LoadIndexItem()
    })
})

function LoadIndexItem() {
    $.ajax({
        type: "GET",
        url: "http://localhost:1262/api/items",
        async: false,
        dataType: "JSON",
        success: function (data) {
            var html = '';
            var i = 1;
            $.each(data, function (index, val) {
                html += '<tr>';
                html += '<td>' + i + '</td>';
                html += '<td>' + val.Name + '</td>';
                html += '<td>' + val.Price + '</td>';
                html += '<td>' + val.Stock + '</td>';
                html += '<td>' + val.Suppliers.Name + '</td>';
                html += '<td> <a href="#" class="fa fa-pencil" onclick="return GetById(' + val.Id + ')">Edit</a>';
                html += ' | <a href="#" class="fa fa-trash" onclick="return Delete(' + val.Id + ')">Delete</a> </td>';
                html += '</tr>';
                i++;
            });
            $('.tbody').html(html);
        }
    })
}

//function LoadComboSupplier(Id) {
//    $.ajax({
//        type: "GET",
//        url: "http://localhost:1262/api/items",
//        data: { 'Id': $(Id).val() },
//        success: function (data) {
//            //render items to appropriate dropdown
//            renderItem($(Id).parents('#myModal').find('select.item'), data);
//        },
//        error: function (error) {
//            console.log(error);
//        }
//    })
//}

//function renderComboSupplier(element, data) {
//    //render item
//    var $ele = $(element);
//    $ele.empty();
//    $ele.append($('<option/>').val('0').text('Select'));
//    $.each(data, function (i, val) {
//        $ele.append($('<option/>').val(val.Id).text(val.Name));
//    })
//}

function LoadSupplierCombo() {
    debugger;
    $.ajax({
        url: 'http://localhost:1262/api/Suppliers',
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            var supplier = $('#Suppliers');
            $.each(result, function (i, Supplier) {
                $("<option></option>").val(Supplier.Id).text(Supplier.Name).appendTo(supplier);
            });
        }
    });
}

function Save() {
    var item = new Object();
    item.name = $('#Name').val();
    item.price = $('#Price').val();
    item.stock = $('#Stock').val();
    item.suppliers = $('#Suppliers').val();
    $.ajax({
        url: "http://localhost:1262/api/items",
        type: 'POST',
        dataType: 'json',
        data: item,
        success: function (result) {
            LoadIndexItem();
            $('#myModal').modal('hide');
        }
    });
}

function Edit() {
    var item = new Object();
    item.Id = $('#Id').val();
    item.Name = $('#Name').val();
    item.Price = $('#Price').val();
    item.Stock = $('#Stock').val();
    item.Suppliers = $('#Suppliers').val();
    $.ajax({
        url: "http://localhost:1262/api/items/" + $('#Id').val(),
        data: item,
        type: "PUT",
        dataType: "json",
        success: function (result) {
            LoadIndexItem();
            ClearScreen();
            $('#myModal').modal('hide');
            $('#Name').val('');
            $('#Price').val('');
            $('#Stock').val('');
            $('#Suppliers').val('');
        }
    });
}

function GetById(Id) {
    $.ajax({
        url: "http://localhost:1262/api/items/" + Id,
        type: "GET",
        dataType: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Name').val(result.Name);
            $('#Price').val(result.Price);
            $('#Stock').val(result.Stock);
            $('#Suppliers').val(result.Suppliers.Id);

            $('#myModal').modal('show');
            $('#Update').show();
            $('#Save').hide();
        }
    })
}

function Delete(Id) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        $.ajax({
            url: "http://localhost:1262/api/items/" + Id,
            type: "DELETE",
            success: function (response) {
                swal({
                    title: "Deleted!",
                    text: "That data has been soft delete!",
                    type: "success"
                },
                function () {
                    window.location.href = '/Items/Index/';
                });
            },
            error: function (response) {
                swal("Oops", "We couldn't connect to the server!", "error");
            }
        });
    });
}

function ClearScreen() {
    $('#Update').hide();
    $('#Save').show();
    $('#Id').val('');
    $('#Name').val('');
    $('#Price').val('');
    $('#Stock').val('');
    $('#Suppliers').val('');
}