$(document).ready(function() {
    loadContent();

    $('[toggle-open]').click(function() {
        if ($(this).hasClass('open')) $(this).removeClass('open');
        else$(this).addClass('open');
    });

    $('.navBtn').on('click', function() {
        if ($(this).hasClass('active')) return;
        var newUrl = updateURLParameter(window.location.href, 'p', $(this).attr('data-page'));
        window.history.pushState(null, null, newUrl);
        loadContent();
    })
});

window.onpopstate = _ => loadContent();

function loadContent() {
    $('.navBtn').removeClass('active');
    if (getUrlParameter('p') == 'projects')
        $('[data-page="projects"]').addClass('active');
    else if (getUrlParameter('p') == 'school')
        $('[data-page="school"]').addClass('active');
    else $('[data-page="home"]').addClass('active');

    $('#content').animate({ opacity: 0 }, 200, function() {
        if (getUrlParameter('p') == 'projects')
            $('#content').load('projects.html', (e, msg) => loadFinish(msg));
        else $('#content').load('home.html', (e, msg) => loadFinish(msg));

        function loadFinish(msg) {
            if (msg == "error") {
                $('#content').html(
                    '<div class="main-error"><div class="error">' +
                    '<h1>Ups...</h1>' +
                    '<p>Es ist ein Netzwerkfehler aufgetreten</p>' +
                    '<button onclick="loadContent()">Neu Laden</button>' +
                    '</div></div>')
            }

            $('#content').animate({ opacity: 1 }, 200);
        }
    });
}

function updateURLParameter(url, param, paramVal) {
    var TheAnchor = null;
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";

    if (additionalURL) {
        var tmpAnchor = additionalURL.split("#");
        var TheParams = tmpAnchor[0];
        TheAnchor = tmpAnchor[1];
        if (TheAnchor)
            additionalURL = TheParams;

        tempArray = additionalURL.split("&");

        for (var i = 0; i < tempArray.length; i++) {
            if (tempArray[i].split('=')[0] != param) {
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    } else {
        var tmpAnchor = baseURL.split("#");
        var TheParams = tmpAnchor[0];
        TheAnchor = tmpAnchor[1];

        if (TheParams)
            baseURL = TheParams;
    }

    if (TheAnchor)
        paramVal += "#" + TheAnchor;

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};