var admin_tbl = $("#admin_tbl");

$(document).ready(function () {

    if ($("#admin_tbl").length) {

        var admin_tbl = $("#admin_tbl");
        admin_tbl.on('preXhr.dt', function (e, settings, data) {
            data.name = $('#name').val();
            data.email = $('#email').val();
        }).dataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                url: baseURL + "/admins/admin-data"
                , "dataSrc": function (json) {
                    //Make your callback here.
                    if (json.status != undefined && !json.status) {
                        $('#admin_tbl_processing').hide();
                        location.reload();
                        //
                    } else
                        return json.data;
                }
            },

            columns: [
                {data: 'DT_RowIndex', name: 'DT_RowIndex'},
                {data: 'name', name: 'name'},
                {data: 'email', name: 'email'},
                {data: 'action', name: 'action'}
            ],

            language: {
                "sProcessing": "<img src='" + baseAssets + "/apps/img/preloader.gif'>",
            },
            "searching": false,
            "ordering": false,

            bStateSave: !0,
            lengthMenu: [[5, 10, 15, 20, -1], [5, 10, 15, 20, "All"]],
            pageLength: 10,
            pagingType: "bootstrap_full_number",
            columnDefs: [{orderable: !1, targets: [0]}, {searchable: !1, targets: [0]}, {className: "dt-right"}],
            order: [[2, "asc"]]
        });
    }

    $(document).on("click", ".filter-submit", function () {
        admin_tbl.api().ajax.reload();
    });
    $(document).on('click', '.filter-cancel', function () {
        $(".select2").val('').trigger('change');
        $(this).closest('tr').find('input').val('');
        admin_tbl.api().ajax.reload();
    });

    $(document).on('click', '.add-admin-mdl', function (e) {
        e.preventDefault();
        $("#wait_msg,#overlay").show();
        var action = $(this).attr('href');

        $.ajax({
            url: action,
            type: 'GET',
            success: function (data) {
                $("#wait_msg,#overlay").hide();

                $('#results-modals').html(data);
                $('#add-admin').modal('show', {backdrop: 'static', keyboard: false});
            }, error: function (xhr) {

            }
        });
    });

    $(document).on('click', '.edit-admin-mdl', function (e) {
        $("#wait_msg,#overlay").show();
        e.preventDefault();
        var action = $(this).attr('href');
        $.ajax({
            url: action,
            type: 'GET',
            success: function (data) {
                $("#wait_msg,#overlay").hide();

                $('#results-modals').html(data);
                $('#edit-admin').modal('show', {backdrop: 'static', keyboard: false});
            }, error: function (xhr) {

            }
        });
    });

    $(document).on("click", ".filter-submit", function () {
        admin_tbl.api().ajax.reload();
    });
    $(document).on('click', '.filter-cancel', function () {
        $(".select2").val('').trigger('change');
        $(this).closest('tr').find('input').val('');
        admin_tbl.api().ajax.reload();
    });


    $(document).on('click', '.delete', function (event) {

        var _this = $(this);
        var action = _this.attr('href');
        event.preventDefault();
        var constant_name = _this.closest('tr').find("td:eq(2)").text();

        bootbox.dialog({
            message: "Are you sure (" + constant_name + ")? <span class='label label-danger'> you can not return back!</span>",
            title: "Confirm deleting!",
            buttons: {

                main: {
                    label: 'Delete <i class="fa fa-check"></i> ',
                    className: "btn-primary",
                    callback: function () {
                        //do something else
                        $.ajax({
                            url: action,
                            type: 'DELETE',
                            dataType: 'json',
                            data: {_token: csrf_token},
                            success: function (data) {

                                if (data.status) {
                                    toastr['success'](data.message, '');
                                    admin_tbl.api().ajax.reload();
                                } else {
                                    toastr['error'](data.message);
                                }
                            }
                        });
                    }
                }, danger: {
                    label: 'Close <i class="fa fa-remove"></i>',
                    className: "btn-danger",
                    callback: function () {
                        //do something
                        bootbox.hideAll()
                    }
                }
            }
        });


    });

    $(document).on('submit', 'form', function (event) {

        var _this = $(this);
        // var loader = '<i class="fa fa-spinner fa-spin"></i>';
        // var loader = ' <i class="fa fa-spinner fa-spin"></i> ';
        $(this).find('.save i').addClass('fa-spinner fa-spin');
        $(this).find('.save').attr('disabled', 'true');
        event.preventDefault(); // Totally stop stuff happening
        // START A LOADING SPINNER HERE
        // Create a formdata object and add the files
        var formData = new FormData($(this)[0]);
        var action = $(this).attr('action');
        var method = $(this).attr('method');

        $.ajax({
            url: action,
            type: method,
            data: formData,

            contentType: false,
            processData: false,
            success: function (data) {

                if (data.status) {

                    $('.alert').hide();

                    toastr.success(data.message);
                    admin_tbl.api().ajax.reload();

                } else {

                    if (data.statusCode == 401) {
                        location.reload()
                    }
                    var $errors = '<strong>' + data.message + '</strong>';
                    $errors += '<ul>';
                    $.each(data.errors, function (i, v) {
                        $errors += '<li>' + v.message + '</li>';
                    });
                    $errors += '</ul>';
                    $('.alert').show();
                    $('.alert').html($errors);
                    toastr.error(data.message);


                }
                // _this.find('.btn-primary').find('i').remove();
                // _this.find('.fa-spin').hide();
                _this.find('.save i').removeClass('fa-spinner fa-spin');
                _this.find('.save').removeAttr('disabled');


            }
        });
    });

});
