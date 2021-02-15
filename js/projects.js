$('#searchbox').on('input', function() {
    var search = $(this).val().trim().toLowerCase();

    $('.items .project').removeClass('hidden');

    $('.items .project').each(function() {
        if (!$(this).find('.name').text().trim().toLowerCase().includes(search))
            $(this).addClass('hidden');
    });
})