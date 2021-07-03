var users_tbl = $("#users_tbl");
$(document).ready(function () {


    if ($("#users_tbl").length) {

        users_tbl.on('preXhr.dt', function (e, settings, data) {
            data.name = $('#name').val();
            data.email = $('#email').val();
            data.phone = $('#phone').val();
            data.gender = $('#gender').val();
            data.country_id = $('#country_id').val();
            data.is_active = $('#is_active').val();
        }).dataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                url: baseURL + "/users/user-data",
                "dataSrc": function (json) {
                    //Make your callback here.
                    if (json.status !== undefined && !json.status) {
                        $('#users_tbl_processing').hide();
                        location.reload();
                        //
                    } else
                        return json.data;
                }
            },
            //  `name`, `email`, `email_verified_at`, `password`, `gender`, `country_id`, `education`, `religion`, `interest_id`, `phone`, `photo`, `cover`, `is_active`, `is_online`, `is_complete`, `dob`, `bio`--}}

            columns: [
                {data: 'DT_RowIndex', name: 'DT_RowIndex'},
                {data: 'photo', name: 'photo'},
                {data: 'name', name: 'name'},
                {data: 'email', name: 'email'},
                {data: 'gender', name: 'gender'},
                {data: 'phone', name: 'phone'},
                {data: 'country_name', name: 'country_name'},
                {data: 'is_online', name: 'is_online'},
                {data: 'is_active', name: 'is_active'},
                {data: 'action', name: 'action'}
            ],
            "fnDrawCallback": function () {
                //Initialize checkbos for enable/disable user
                $(".make-switch").bootstrapSwitch({size: "mini", onColor: "success", offColor: "danger"});
            },

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
            order: [[1, "asc"]],

        });
    }
    $('#users_tbl').on('switchChange.bootstrapSwitch', '.make-switch', function (event, state) {
        // ... skipped ...
        var user_id = $(this).data('id');

        $.ajax({
            url: baseURL + '/users/user-status',
            type: 'PUT',
            dataType: 'json',
            data: {'_token': csrf_token, 'user_id': user_id},
            success: function (data) {

                if (data.status) {
                    toastr['success'](data.message, '');
                } else {
                    toastr['error'](data.message);
                }

            }
        });

    });

    $(document).on("click", ".filter-submit", function () {
        users_tbl.api().ajax.reload();
    });
    $(document).on('click', '.filter-cancel', function () {
        $(".select2").val('').trigger('change');
        $(this).closest('tr').find('input').val('');
        users_tbl.api().ajax.reload();
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
                    // talents_tbl.api().ajax.reload();
                    // location.href = baseURL + "/talent/archive/" + data.items.id;
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
