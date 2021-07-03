$(document).ready(function () {

    var settings_tbl = $("#settings_tbl");

    if ($("#settings_tbl").length) {

        settings_tbl.dataTable({
            "processing": true,
            "serverSide": true,

            "ajax": {
                url: baseURL + "/setting-data"
                // success: function (response) {
                //
                //     if (!response.status) {
                //         $('#settings_tbl_processing').hide();
                //         bootbox.alert(response.message);
                //
                //     }
                // }
                , "dataSrc": function (json) {
                    //Make your callback here.
                    if (json.status != undefined && !json.status) {
                        $('#settings_tbl_processing').hide();
                        location.reload();
                        //
                    } else
                        return json.data;
                }
            },
            columns: [
                {data: 'DT_RowIndex', name: 'DT_RowIndex'},
                {data: 'key', name: 'key'},
                {data: 'value', name: 'value'},
                {data: 'action', name: 'action'}
            ],

            language: {
                "sProcessing": "<img src='" + baseAssets + "/apps/img/preloader.svg'>",
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

    $(document).on('click', '.edit-setting-mdl', function (event) {

        var _this = $(this);
        var action = _this.attr('href');
        event.preventDefault();


        $.ajax({
            url: action,
            type: 'GET',
            // dataType: 'json',
            success: function (data) {

                $("#wait_msg,#overlay").hide();

                $('#results-modals').html(data);
                $('#edit-setting').modal('show', {backdrop: 'static', keyboard: false});

            }
        });

    });
    $(document).on('submit', 'form', function (event) {

        var _this = $(this);
        // var loader = '<i class="fa fa-spinner fa-spin"></i>';
        // var loader = ' <i class="fa fa-spinner fa-spin"></i> ';
        $(this).find('.save i').addClass('fa-spinner fa-spin');
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
                    _this.find('.save i').removeClass('fa-spinner fa-spin');
                    settings_tbl.api().ajax.reload();

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


            }
        });
    });

});
