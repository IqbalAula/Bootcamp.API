$(document).ready(function () {
    LoadIndexSupplier();
    $('#table').DataTable({
        "ajax": LoadIndexSupplier()
    })
    ClearScreen();
})

function LoadIndexSupplier() {
    $.ajax({
        type: "GET",
        url: "http://localhost:1262/api/Suppliers",
        dataType: "JSON",
        success: function (data) {
            var html = '';
            var i = 1; 
            $.each(data, function (index, val){
                html += '<tr>';
                html += '<td>' + i + '</td>';
                html += '<td>' + val.Name + '</td>';
                html += '<td> <a href="#" onclick="return GetById('+ val.Id +')">Edit</a>';
                html += ' | <a href="#" onclick="return Delete('+ val.Id +')">Delete</a> </td>';
                html += '</tr>';
                i++;                
            });
            $('.tbody').html(html);
        }
    })
}

function Save() {

}

function Edit() {

}

function GetById() {

}

function Delete() {

}

function ClearScreen() {

}
