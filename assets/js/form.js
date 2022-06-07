// eye click

$('.s-cntrl-width').click(function() {
    $(this).toggleClass('fa-eye-slash');
    var passtype = $(this).parent().find('input[type="password"]').attr('type');
    console.log(passtype);

    if (passtype == 'password') {
        $(this).parent().find('input[type="password"]').attr('type', 'text');
    } else {
        $(this).parent().find('input[type="text"]').attr('type', 'password');
    }
});

// 




let number = document.getElementById('number');
let counter = 0;
if (number) {
    setInterval(() => {
        if (counter == 85) {
            clearInterval();
        } else {
            counter += 1;
            number.innerHTML = counter + "%";
        };
    }, 20);
}
$(function() {
    $('.form-submit').submit(function(e) {


        var form = $(this);
        e.preventDefault(e);

        var formData = '';

        if (form.attr('enctype')) {

            formData = new FormData(form[0]);

        } else {
            formData = form.serialize();
        }



        // if (form.find('[name="draft"]').length > 0) {
        //     var val = form.find('[name="draft"]').val();
        //     form.find('[data-draft="' + val + '"]').addClass(`btn-loading`);
        //
        // } else {
        //     form.find('[type="submit"]').addClass(`btn-loading`);
        // }


        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        });

        if (form.attr('enctype')) {
            $.ajax({
                type: form.attr('method'),
                url: form.attr('action'),
                data: formData,
                processData: false,
                contentType: false,

                success: function(response) {



                    $('#append_section').html(response);




                    if (response.redirect) {
                        if (response.route != 'reload') {
                            window.location.href = window.location.origin + '/' + response.route;
                        } else {
                            location.reload();
                        }

                    } else {
                        if (response.resetNow) {
                            form[0].reset();
                        }

                    }

                    if (response.modalClose) {
                        $('.modal').modal('hide')
                    }

                },
                error: function(error) {
                    // form.find('[type="submit"]').removeClass(`btn-loading`);
                    $('.tag-danger').remove();

                    let errorBox = JSON.parse(error.responseText).errors;

                    $.each(errorBox, function(ind, val) {
                        for (var i = 0; i < val.length; i++) {
                            $.growl.error({
                                message: val[i]
                            });



                        }


                    });


                }
            });
        } else {
            $.ajax({
                type: form.attr('method'),
                url: form.attr('action'),
                data: formData,


                success: function(response) {
                    // form.find('[type="submit"]').removeClass(`btn-loading`);
                    $('#append_section').html(response);
                    if (response.redirect) {

                        if (response.route != 'reload') {
                            window.location.href = window.location.origin + '/' + response.route;
                        } else {
                            location.reload();
                        }

                    } else {
                        if (response.resetNow) {
                            form[0].reset();
                        }

                    }

                },
                error: function(error) {
                    // form.find('[type="submit"]').removeClass(`btn-loading`);
                    $('.tag-danger').remove();
                    let errorBox = JSON.parse(error.responseText).errors;

                    $.each(errorBox, function(ind, val) {
                        for (var i = 0; i < val.length; i++) {
                            $.growl.error({
                                message: val[i]
                            });

                        }


                    });


                }
            });
        }


    })

})

function deleteData(url, className) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        }
    });
    $.ajax({
        type: 'GET',
        url: url,


        success: function(response) {
            // form.find('[type="submit"]').removeClass(`btn-loading`);
            alert('data deleted successfully')
            $('.' + className).remove();


        },
        error: function(error) {
            // form.find('[type="submit"]').removeClass(`btn-loading`);
            $('.tag-danger').remove();
            let errorBox = JSON.parse(error.responseText).errors;

            $.each(errorBox, function(ind, val) {
                for (var i = 0; i < val.length; i++) {

                    $.growl.error({
                        message: val[i]
                    });

                }


            });


        }
    });
}

$('[name="change_slot"]').change(function() {
    $('[name="slot_duration"]').val($(this).val());
})
$('.select_day').click(function() {
    $('[name="day"]').val($(this).text());
})

$('.delete_schedule').click(function() {
    $('.deleteModal').find('a').attr('href', $(this).data('href'))
})


//// filter therapist
$('.filter_therapist').click(function() {

    var specializations = [];
    var genderType = [];
    $('[name="select_specialist"]:checked').each(function() {
        specializations.push($(this).val())
    })
    $('[name="gender_type"]:checked').each(function() {
        genderType.push($(this).val())
    })
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        }
    });
    $.ajax({
        type: 'POST',
        url: '/filter-therapist ',
        data: {
            specialization: specializations,
            gender_type: genderType,
        },


        success: function(response) {
            // form.find('[type="submit"]').removeClass(`btn-loading`);
            $('#append_therapist').html(response);


        },
        error: function(error) {
            // form.find('[type="submit"]').removeClass(`btn-loading`);
            $('.tag-danger').remove();
            let errorBox = JSON.parse(error.responseText).errors;

            $.each(errorBox, function(ind, val) {
                for (var i = 0; i < val.length; i++) {

                    $.growl.error({
                        message: val[i]
                    });

                }


            });


        }
    });
})

/// add schedule class
$('#append_section').on('DOMSubtreeModified', function() {
    $('[data-schedule-date]').click(function() {

        $('[data-schedule-date]').removeClass('selected')
        $(this).addClass('selected')
        $('[name="schedule_date"]').val($(this).data('schedule-date'))
        $('[name="schedule_time"]').val($(this).find('span').text())
    })
});
$('[data-schedule-date]').click(function() {

    $('[data-schedule-date]').removeClass('selected')
    $(this).addClass('selected')
    $('[name="schedule_date"]').val($(this).data('schedule-date'))
    $('[name="schedule_time"]').val($(this).find('span').text())
})
$(function() {
    $(document).on('click', '.pagination-schedule a', function(event) {
        event.preventDefault();
        var page = $(this).attr('href').split('page=')[1];
        fetch_data(page);
    });

    function fetch_data(page) {
        $.ajax({
            url: "/appointment-pagination?page=" + page,

            data: {
                id: $('[name="id"]').val(),
                from: $('[name="from"]').val(),
                to: $('[name="to"]').val(),

            },
            success: function(data) {
                $('#append_section').html(data);
            }
        });
    }
})