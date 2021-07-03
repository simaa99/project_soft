var stories_tbl = $("#stories_tbl");
$(document).ready(function () {

    $(document).on('submit', '#edit-admin', function (event) {
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
                    setTimeout(function () {
                        location.reload();
                    }, 2000)
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
