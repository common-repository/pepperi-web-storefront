 jQuery(function () {

    pepperi.ui.loader(true);

    jQuery('#txtSearch').attr('type', 'text');

    jQuery.getJSON(pepperi_settings.pepperi_admin + "?action=pepperi_storefront_plugin_init", function (json) {

        if (json.Success) {

            json.Host = pepperi.urlParameter('Host') || json.Host;
            json.AccessToken = pepperi.urlParameter("AccessToken") || json.AccessToken;
            json.CatalogUID = pepperi.urlParameter("CatalogUID") || json.CatalogUID;

            initOpenCatalog(json);
        } else {
            pepperi.handleError(json);
        }

    });

});

function initOpenCatalog(data) {

    var options = {

        title: pepperi_settings.pepperi_title,
        container: jQuery(".thumbnails-view"),

        host: data.Host,
        accessToken: data.AccessToken,
        catalogUid: data.CatalogUID,                

        displayMainCategory: true,
        displaySmartSearch: true,
        displaySearch: true
    };

    pepperi.init(options).then(function () {

        // catalog has loaded                                     

    });
}