/**
 *
 * @source: http://www.pepperi.com
 *
 * @licstart  The following is the entire license notice for the 
 *  JavaScript code in this page.
 *
 * Copyright (C) 2016  Pepperi LTD, Author: Shlomi Komemi
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

(function (ns, $, undefined) {
    "use strict";


    /**
    * defaults for jquery ajax function
    *        
    */
    $.ajaxSetup({
        contents: { jsonService: /jsonService/ },
        converters: { "jsonService text": function (result) { return ''; } },
        type: 'POST',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
    });

    $.expr.filters.offscreen = function (el) {
        return (
            (el.offsetLeft + el.offsetWidth) < 0
            || (el.offsetTop + el.offsetHeight) < 0
            || (el.offsetLeft > window.innerWidth || el.offsetTop + el.offsetHeight > window.innerHeight)
        );
    };

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    function log() {
        try {
            typeof console !== 'undefined' && console.log.apply(console, arguments);
        }
        catch (e) { }
    }

    function guid() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    }

    function urlParameter(key) {

        var url = window.location.href,
            results = new RegExp('[\\?&]' + key + '=([^&#]*)', 'i').exec(url);

        if (!results) {
            return undefined;
        }
        return results[1] || undefined;
    }

    var _options = null;

    var template = {

        // image field template
        image: '<li class="image"><a href="javascript:void(0);"><img src="{{imageURL}}" alt=""></a></li>',

        // generic field template 
        field: '<li><label>{{name}}</label><span title="{{value}}">{{value}}</span></li>',

        /**
        * render a specific template with data
        *        
        * @param {tmpl} - template name
        * @param {data} - dictionary of key/value to replace 
        * 
        * @return rendered html
        */
        getHTML: function (tmpl, data) {

            var that = this,
                html = that[tmpl];

            for (var i in data) {
                
                html = html.replace(new RegExp('\{\{' + i + '\}\}', 'g'), data[i]);
            }

            return html;
        }

    };

    // enumeration of item field types
    var enumFieldType = {
        // specify text field
        "TextBox": 1,
        // specify text area field
        "TextArea": 3,
        // specify date field
        "Date": 5,
        // specify date & time field
        "DateAndTime": 6,
        // specify integer field
        "NumberInetger": 7,
        // specify decimal field
        "NumberReal": 8,
        // specify currency field
        "Currency": 9,
        // specify boolean field
        "Boolean": 10,
        // specify multiple options field
        "ComboBox": 11,
        // specify multiple options field
        "MultiTickBox": 12,
        // specify seperator (view only) field
        "Separator": 13,
        // specify address field
        "Address": 14,
        // specify percentage field
        "Percentage": 15,
        // specify email field
        "Email": 18,
        // specify image field
        "Image": 20,
        // specify attachment field
        "Attachment": 24,
        // specify link field
        "Link": 26,
        // specify image url field
        "ImageURL": 27
    };

    var
        // catalog uid
        _catalogUID = 0,
        //  search code
        _searchCode = null,
        // access token
        _accessToken = null;

    // search options object contains all search properties
    var _searchOptions = {
        CatalogUID: 0, // the catalog id 
        SearchText: '', // filter by text
        OrderBy: '', // order by the results by field
        Ascending: true, // search results ascending
        MainCategoryUID: 0, // filter by main category 
        FilterUID: 0, // filter by filter id
        SmartSearch: {} // filter by smart 
    };


    /**
    * main initialization function
    *        
    * @param {options} - object that contains display options
    */
    function init(options) {


        _options = options;

        api.host = options.host;
        _accessToken = options.accessToken;
        _catalogUID = options.catalogUid;

        // initialize ui         
        ui.init(options);

        // display loader
        ui.loader(true);


        // async call to: mainCategoryAndFilters, smartSearch and items
        return $.when(api.mainCategoryAndFilters()).then(function () {

            // recive the data from the api calls
            var mainCategoryFilters = arguments[0];

            // generate html for main category & filters
            if (options.displayMainCategory) {
                mainCategory.init(mainCategoryFilters.MainCategoryList, mainCategoryFilters.FilterList);
            }

            return api.setSearchPreference({ CatalogUID: _catalogUID }, function (json) {

                _searchCode = json.SearchCode;

                if (options.displaySmartSearch) {
                    smartSearch.init(json.SmartSearchList);
                }

                api.items().then(function () {

                    var items = arguments[0];

                    // display item count on ui
                    ui.setItemsCount(items.TotalRows);

                    // generate html for thumbnails
                    thumbnails.init(items.Rows, items.UIControl); // items.UIControl

                });

            });

        });
    }

    var ui = {

        container: null,

        /**
        * initialization ui 
        *        
        * @param {options} - options for initialization 
        * 
        */
        init: function (options) {

            var that = this;

            // set the container elemnet
            that.container = options.container;
            
            that.container.find('h1.title').html(options.title);            

            // show the container
            that.container.show();
            

            // display search?
            if (options.displaySearch) {
                that.container.find('.search-container').show();
            }

        },

        /**
        * show/hide loader element
        *        
        * @param {flag} - flag to show or hide the loader        
        *         
        */
        loader: function (flag) {

            var that = this;

            if (typeof that.loaderElement === 'undefined') {
                that.loaderElement = $('.loader');
            }



            if (flag) {
                that.loaderElement.show();
                $('.not-found').hide();
            } else {
                that.loaderElement.hide();
            }

        },
        /**
        * set total items count
        *        
        * @param {count} - the total items count        
        * 
       
        */
        setItemsCount: function (count) {

            thumbnails.itemsCount = count;

            $('#spnItemsCount').html(count);

            if (thumbnails.itemsCount == 0) {
                $('.not-found').show();

            } else {
                $('.not-found').hide();
            }

        },

        /**
        * display a error message on screen
        *        
        * @param {message} - template name        
        *         
        */
        displayError: function (message) {

            $('.ul-catalog').html('');

        }

    }

    // 
    var thumbnails = {

        page: 0, // set 
        perPage: 50,
        itemsCount: 0,



        /**
        * initialization thumbails function
        *        
        * @param {items} - array of catalog items
        * @param {uiControl} - ui control settings 
        *        
        */
        init: function (items, uiControl) {

            var that = this;

            // set events of thumbnails
            that.attachEvents();

            // generate html of thumbails
            that.build(items, uiControl);

        },
        /**
        * attach thumbnails events
        *               
        */
        attachEvents: function () {

            var that = this,
                wnd = $(window),
                doc = $(document);

            wnd.on('scroll', function (e) {

                if (wnd.scrollTop() + wnd.height() > doc.height() - 450) {

                    if (api.inRequest) {
                        return;
                    }

                    if (that.itemsCount > (that.perPage * that.page)) {

                        var indexStart = that.page * that.perPage,
                            indexEnd = indexStart + that.perPage;

                        ui.loader(true);

                        api.items(indexStart, indexEnd, function (json) {

                            that.build(json.Rows, json.UIControl);

                            ui.loader(false);

                        });
                    }
                }
            });

        },
        /**
        * generate html of thumbails
        *        
        * @param {items} - array of catalog items
        * @param {uiControl} - ui control settings 
        *         
        */
        build: function (items, uiControl) {

            var that = this,
                html = [];

            var qsField = 0;

            for (var i = 0; i < items.length; i++) {
                html.push(that.buildItem(items[i], uiControl));
            }

            ui.container.find('.ul-catalog').append(html.join(''));
        },
        /**
        * render a specific item
        *        
        * @param {item} - catalog item
        * @param {uiControl} - ui control settings 
        * 
        * @return rendered html
        */
        buildItem: function (item, uiControl) {

            var that = this,
                html = ['<li><ul>'];


            var ignoreFields = ['ItemHasActiveCampaign', 'ItemIndicatorsWithoutCampaign', 'ObjectMenu'];


            for (var i = 0; i < item.Fields.length; i++) {

                var currentField = item.Fields[i],
                    uiField = uiControl.ControlFields[i]; //uiControl.ControlFields[i];

                if (ignoreFields.indexOf(currentField.ApiName) > -1) {
                    continue;
                }

                if (uiField.FieldType == enumFieldType.Image || uiField.FieldType == enumFieldType.ImageURL) {
                    html.push(template.getHTML('image', { imageURL: currentField.FormattedValue }));
                } else {
                    html.push(template.getHTML('field', { name: uiField.Title, value: currentField.FormattedValue }));
                }

            }

            html.push('</ul></li>');

            return html.join('');
        },
        /**
        * handler on search preference change 
        *        
        * @param {data} - search preference data        
        *         
        */
        onSearchPreferenceChange: function (data) {

            var that = this;

            that.clear();

            ui.loader(true);

            if (typeof data.MainCategoryUID !== 'undefined' || typeof data.FilterUID !== 'undefined') {
                smartSearch.clearAll(false);
            }
            
            // make search preference api call
            api.setSearchPreference(data, function (json) {

                _searchCode = json.SearchCode;

                var indexStart = that.page * that.perPage,
                    indexEnd = indexStart + that.perPage;

                $('html, body').animate({
                    scrollTop: $(".thumbnails").offset().top - 200
                }, 50);

                if (_options.displaySmartSearch) {
                    smartSearch.build(json.SmartSearchList, data);
                }

                // make items api call
                api.items(indexStart, indexEnd, function (json) {

                    // set items count
                    ui.setItemsCount(json.TotalRows);

                    // generate html for the returned items
                    that.build(json.Rows, json.UIControl);

                    ui.loader(false);

                });

            });

        },
        /**
        * clear thumbnails html and data
        *        
        */
        clear: function () {

            var that = this;

            // reset current page
            that.page = 0;

            // remove thumbnail html
            $('.ul-catalog').html('');

        }
    };

    // main cateogry handler
    var mainCategory = {

        // main cateogry main element 
        container: null,
        /**
        * initialize main cateogry and filter
        *        
        * @param {mainCateogry} - main cateogry array 
        * @param {filter} - filter array 
        * 
        * @return rendered html
        */
        init: function (mainCateogry, filter) {

            var that = this;

            that.container = $('#dvMainCategory').show();

            that.attachEvents();

            that.build(mainCateogry, filter);
        },
        /**
        * configuere events for main cateogry and filters
        *        
        */
        attachEvents: function () {

            var that = this;

            that.container

                .on('click', '[data-maincategory]', function (e) {

                    var $this = $(this),
                        mainCategoryUid = $this.attr('data-maincategory'),
                        filterUid = $this.find('ul li:first-child').attr('data-filter');

                    $this.parent('ul').find('ul:visible').hide();
                    $this.find('ul').show();


                    $(that.container).find('.selected').removeClass('selected');
                    $this.find('ul li:first-child').addClass('selected');

                    $this.addClass('selected');

                    thumbnails.onSearchPreferenceChange({
                        MainCategoryUID: mainCategoryUid,
                        FilterUID: filterUid,
                        SearchText: $('#txtSearch').val()
                    });

                })

                .on('click', '[data-filter]', function (e) {

                    var $this = $(this),
                        mainCategoryUid = $this.parents('[data-maincategory]').attr('data-maincategory'),
                        filterUid = $this.attr('data-filter');

                    $(that.container).find('.selected').removeClass('selected');


                    $this.parents('li:eq(0)').addClass('selected');
                    $this.addClass('selected');

                    thumbnails.onSearchPreferenceChange({
                        MainCategoryUID: mainCategoryUid,
                        FilterUID: filterUid,
                        SearchText: $('#txtSearch').val()
                    });

                    return false;
                });


        },
        /**
        * generate html for main cateogry and filters
        *        
        * @param {mainCateogry} - main cateogry array 
        * @param {filter} - filter array 
        * 
        * @return rendered html
        */
        build: function (mainCateogry, filter) {

            var that = this,
                html = [],
                htmlAll = [];

            var hasAtleastOne = false;

            htmlAll.push('<li data-maincategory="0"> All'); //  filtersHtml.join(''), '</li>']

            htmlAll.push('<ul class="ul-filter">');

            //htmlAll.push(['<li data-filter="0"> All </li>'].join(''));

            for (var i = 0; i < filter.length; i++) {

                var existInAllBrand = true;

                var f = filter[i];

                for (var j = 0; j < mainCateogry.length; j++) {

                    if (mainCateogry[j].FilterUIDList && mainCateogry[j].FilterUIDList.indexOf(f.UID) === -1) {
                        existInAllBrand = false;
                        break;
                    }
                }

                if (existInAllBrand) {
                    htmlAll.push(['<li data-filter="', f.UID, '">', f.Name, '</li>'].join(''));
                    hasAtleastOne = true;

                    if (_searchOptions.FilterUID == 0) {
                        _searchOptions.FilterUID = f.UID;
                    }

                }

            }

            htmlAll.push('</ul>');
            htmlAll.push('</li>');

            if (hasAtleastOne) {
                html.push(htmlAll.join(''));
            }           

            for (var i = 0; i < mainCateogry.length; i++) {

                var mc = mainCateogry[i],
                    filtersHtml = [],
                    filters = mc.FilterUIDList || [];

                if (filters.length > 0) {

                    filtersHtml.length = 0;

                    filtersHtml.push('<ul class="ul-filter" style="display:none;">');

                    for (var j = 0; j < filters.length; j++) {

                        var f = $.grep(filter, function (val) { return val.UID == filters[j] })[0]

                        if (_searchOptions.FilterUID == 0) {
                            _searchOptions.FilterUID = f.UID;
                        }

                        filtersHtml.push(['<li data-filter="', f.UID, '">', f.Name, '</li>'].join(''));

                    }

                    filtersHtml.push('</ul>');
                }
                html.push(['<li data-maincategory="', mc.UID, '">', mc.MainCategory, filtersHtml.join(''), '</li>'].join(''));
            }


            that.container.find('ul').html(html.join(''));

            that.container.find('li:first-child ul').show().find('li:first-child').addClass('selected');
            that.container.find('li:first-child').addClass('selected');
        }

    }

    var smartSearch = {

        menu: null,
        container: null,

        data: {},

        types: {
            text: 1, checkbox: 2, date: 3, number: 4, dateAndTime: 6
        },
        /**
        * initialize smart search 
        *                
        * @param {data} - smart search array
        * 
        */
        init: function (data) {

            var that = this;

            that.container = $('#dvSmartSearch');
            that.menu = $('.smart-search-menu');

            if (data.length == 0) {
                $('#dvSmartSearch').hide();
                return;
            }

            $('#dvSmartSearch').show();

            that.attachEvents();

            that.build(data);

        },
        /**
        * attach events for smart search 
        *                                        
        */
        attachEvents: function () {

            var that = this;

            $(window).on('scroll', debounce(function () {
                that.menu.hide();
            }, 50));

            $('aside').on('scroll', debounce(function () {
                that.menu.hide();
            }, 50));

            that.container

                .on('click', 'li', function (e) {

                    var $this = $(this);

                    that.open($this, $this.attr('data-smartsearch'));

                })
                
                .on('click', 'a.clear', function (e) {                    

                    that.clearAll(true);

                });


            that.menu

                .on('click', 'li', function (e) {

                    var $this = $(this),
                        apiname = that.menu.find('ul').attr('data-apiname'),
                        fieldType = that.menu.find('ul').attr('data-fieldType') * 1;

                    if (fieldType != that.types.checkbox) {
                        return;
                    }

                    var selected = $this.find('input[type=checkbox]').prop('checked'),
                        key = $this.attr('data-key');

                    if ($(e.target).is('input[type=checkbox]')) {
                        selected = !selected;
                    }

                    $this.find('input[type=checkbox]').prop('checked', !selected);


                    $.grep(that.data[apiname].Values, function (v, i) {
                        return v.Key == key;
                    })[0].selected = !selected;

                    /*
                    that.data[apiname].Values[key].selected = !selected;
                    */

                    that.setSelected(apiname, fieldType);

                })

                .on('click', '.done', function (e) {

                    var apiname = that.menu.find('ul').attr('data-apiname'),
                        fieldType = that.menu.find('ul').attr('data-fieldType') * 1;

                    that.save(apiname, fieldType);

                    that.close(apiname);

                    that.setSelected(apiname, fieldType);


                    var smartSearchData = that.exportData();

                    thumbnails.onSearchPreferenceChange({ SmartSearch: smartSearchData });

                })

                .on('click', '.clear', function (e) {

                    var apiname = that.menu.find('ul').attr('data-apiname'),
                        fieldType = that.menu.find('ul').attr('data-fieldType') * 1;

                    that.clear(apiname);

                    that.setSelected(apiname, fieldType);

                    _searchOptions.SmartSearch = $.grep(_searchOptions.SmartSearch, function (val) {
                        return val.ApiName !== apiname;
                    });
                    
                    thumbnails.onSearchPreferenceChange({});

                });


            $('.search-container input[type=text]').on('keypress', function (e) {

                if (e.which == 13) {
                    thumbnails.onSearchPreferenceChange({ SearchText: $(this).val() });
                    return false;
                }

            });

            $('.search-container .search-icon').on('click', function (e) {
                
                var val = $('#txtSearch').val()

                thumbnails.onSearchPreferenceChange({ SearchText: val });
                return false;

            });

        },
        /**
        * generate html for smart search properties
        *        
        * @param {smartSearchArray} - smart search properties array
        * 
        * @return rendered html
        */
        build: function (smartSearchArray, dataSelected) {

            var that = this,
                html = [];

            for (var i = 0; i < smartSearchArray.length; i++) {

                var ss = smartSearchArray[i],
                    filtersHtml = [];

                html.push(['<li data-smartsearch="', ss.ApiName, '">', ss.Title, '</li>'].join(''));

                /*
                var selected = false;

                if (that.data && that.data[ss.ApiName]) {
                    selected = that.data[ss.ApiName].selected || false;
                }                 
                */

                that.data[ss.ApiName] = ss;

                //that.data[ss.ApiName].selected = selected;                

                // for debug - temporary fix 
                that.data[ss.ApiName].FieldType = enumFieldType.ComboBox;
            }

            if (dataSelected && dataSelected.SmartSearch && dataSelected.SmartSearch.length > 0) {                

                for (var i = 0; i < dataSelected.SmartSearch.length; i++) {
                    var item = dataSelected.SmartSearch[i];

                    var selectedItems = item.Values;

                    for (var j = 0; j < selectedItems.length; j++) {

                        var found = $.grep(that.data[item.ApiName].Values, function (val, i) {
                            return val.Key == selectedItems[j];
                        });

                        if (found.length > 0) { 
                            found[0].selected = true;
                        }

                    }
                }


            }

            that.container.find('ul').html(html.join(''));

        },
        /**
        * open menu for a specific property 
        *        
        * @param {element} - the clicked html element 
        * @param {apiname} - property apiname 
        *         
        */
        open: function (element, apiname) {

            var that = this,
                data = that.data[apiname],
                fieldType = that.getType(data.FieldType);


            that.menu.find('ul').attr('data-apiname', apiname);
            that.menu.find('ul').attr('data-fieldType', fieldType);


            if (fieldType == that.types.text) {

                that.menu.find('ul').html($('.smart-search-text').find('ul').html());

            } else if (fieldType == that.types.checkbox) {

                that.getValues(apiname, function (html) {
                    $('.smart-search-menu ul').html(html);
                });

            } else if (fieldType == that.types.date) {

                that.menu.find('ul').html($('.smart-search-extend').find('ul').html());

                that.menu.find('ul').find('input[type=text]').datepicker();

            } else if (fieldType == that.types.dateAndTime) {

                that.menu.find('ul').html($('.smart-search-extend').find('ul').html());

                that.menu.find('ul').find('input[type=text]').datetimepicker({
                    controlType: 'select',
                    oneLine: true,
                    timeFormat: 'hh:mm tt'
                });

            } else if (fieldType == that.types.number) {

                that.menu.find('ul').html($('.smart-search-extend').find('ul').html());

                data.smallerThan = $('input[type=text].smaller-than', '.smart-search-menu').val();
            }

            if (fieldType == that.types.date || fieldType == that.types.dateAndTime) {
                that.menu.find('input[type=text]').addClass('date-icon');
            }

            if (fieldType != that.types.checkbox) {

                data.Values = data.Values || {};

                that.menu.find('ul').find('[type=text]').val(data.Values.text);

                if (data.Values.smallerThan) {
                    that.menu.find('ul').find('.smaller-than').val(data.Values.smallerThan);
                    that.menu.find('ul').find('[name=rdbSmartSearch].smaller-than').prop('checked', true);
                } else if (data.Values.greaterThan) {
                    that.menu.find('ul').find('.greater-than').val(data.Values.greaterThan);
                    that.menu.find('ul').find('[name=rdbSmartSearch].greater-than').prop('checked', true);
                } else if (data.Values.betweenStart || data.Values.betweenEnd) {
                    that.menu.find('ul').find('.between-start').val(data.Values.betweenStart);
                    that.menu.find('ul').find('.between-end').val(data.Values.betweenEnd);
                    that.menu.find('ul').find('[name=rdbSmartSearch].between').prop('checked', true);
                }

            }
            //that.menu.css({ left: element.offset().left + element.outerWidth(), top: element.position().top });             // element.position().top + $('aside').position().top - 20

            var left = element.offset().left + element.outerWidth(),
                top = element.offset().top - $(window).scrollTop();
            
            that.menu.css({ left: left, top: top, bottom: 'auto' }).scrollTop(0).show();

            if (that.menu.is(':offscreen')) {
                that.menu.css({ left: element.offset().left + element.outerWidth(), bottom: 0, top: 'initial' }).show();
            }

        },
        /**
        * close the menu
        *                        
        */
        close: function () {

            var that = this;

            that.menu.hide();

        },
        /**
        * clear specific smart search property
        *        
        * @param {apiname} - property apiname        
        *         
        */
        clear: function (apiname) {

            var that = this;

            var values = that.data[apiname].Values;

            for (var i = 0; i < values.length; i++) {
                values[i].selected = false;
            }

            that.close();
        },

        clearAll: function (searchPreferenceChange) {

            var that = this;

            for (var i in that.data) {

                var apiname = that.data[i].ApiName,
                    fieldType = that.data[i].FieldType;

                that.clear(apiname);

                that.setSelected(apiname, fieldType);

            }

            // reset smart search array
            _searchOptions.SmartSearch = [];

            if (searchPreferenceChange) {
                thumbnails.onSearchPreferenceChange({});
            }

            that.container.find('a.clear').hide();

        },
        /**
        * render a specific template with data
        *        
        * @param {apiname} - property apiname 
        * @param {fieldType} - type of propety field
        * 
        * @return rendered html
        */
        save: function (apiname, fieldType) {

            var that = this,

                data = {};

            if (fieldType == that.types.text) {

                data.text = $('input[type=text]', '.smart-search-menu').val();

                that.data[apiname].Values = data;

            } else if (fieldType == that.types.checkbox) {


            } else if (fieldType == that.types.date || fieldType == that.types.number || fieldType == that.types.dateAndTime) {

                var selectedRadio = $('input[name=rdbSmartSearch]:checked', '.smart-search-menu');

                if (selectedRadio.hasClass('smaller-than')) {
                    data.smallerThan = $('input[type=text].smaller-than', '.smart-search-menu').val();
                } else if (selectedRadio.hasClass('greater-than')) {
                    data.greaterThan = $('input[type=text].greater-than', '.smart-search-menu').val();
                } else if (selectedRadio.hasClass('between')) {
                    data.betweenStart = $('input[type=text].between-start', '.smart-search-menu').val();
                    data.betweenEnd = $('input[type=text].between-end', '.smart-search-menu').val();
                }

                that.data[apiname].Values = data;
            }
        },
        /**
        * get menu type by a given field type
        *        
        * @param {fieldType} - type of propety field        
        * 
        * @return the menu type ( text / date / date & time / checkbox )
        */
        getType: function (fieldType) {

            var that = this;

            switch (fieldType) {
                case enumFieldType.TextBox:
                case enumFieldType.TextArea:
                case enumFieldType.Email:
                case enumFieldType.Link:
                case enumFieldType.ImageURL:

                    return that.types.text;

                case enumFieldType.Date:

                    return that.types.date;

                case enumFieldType.DateAndTime:

                    return that.types.dateAndTime;

                case enumFieldType.NumberInetger:
                case enumFieldType.NumberReal:
                case enumFieldType.Currency:
                case enumFieldType.Percentage:

                    return that.types.number;

                case enumFieldType.Boolean:
                case enumFieldType.ComboBox:
                case enumFieldType.MultiTickBox:

                    return that.types.checkbox;

                default:
                    return that.types.text;
            }

        },
        /**
        * get values for specific smart search property
        *        
        * @param {apiname} - property apiname        
        * @param {fn} - callback function         
        *         
        */
        getValues: function (apiname, fn) {

            var that = this,
                html = [];


            var values = that.data[apiname].Values;

            for (var i = 0; i < values.length; i++) {

                var item = values[i];

                if (!item.Key) {
                    continue;
                }

                if (typeof item.selected === 'undefined') {
                    item.selected = false;
                }

                html.push(['<li data-key="', item.Key, '"><input type="checkbox"', item.selected ? ' checked="checked" ' : '', '/>', item.Value, '</li>'].join(''));
            }

            fn(html.join(''));



            /*
            api.smartSearchValues(apiname, function (data) {

                var values = data.Values;

                if (typeof that.data[apiname].values === 'undefined') {
                    that.data[apiname].values = {};
                }


                for (var i = 0; i < values.length; i++) {

                    var item = values[i];

                    if (!item.Key) {
                        continue;
                    }

                    if (typeof that.data[apiname].values[item.Key] === 'undefined') {
                        that.data[apiname].values[item.Key] = { selected: false };
                    }

                    html.push(['<li data-key="', item.Key, '"><input type="checkbox"', that.data[apiname].values[item.Key].selected ? ' checked="checked" ' : '', '/>', item.Value, '</li>'].join(''));
                }

                fn(html.join(''));
            });
            */

        },
        /**
        * render a specific template with data
        *        
        * @param {apiname} - property apiname 
        * @param {fieldType} - type of propety field
        *         
        */
        setSelected: function (apiname, fieldType) {

            var that = this,
                values = that.data[apiname].Values,
                markSelected = false;

            if (fieldType == that.types.text) {

                markSelected = !!values.text;

            } else if (fieldType == that.types.checkbox) {

                for (var i in values) {
                    if (values[i].selected) {
                        markSelected = true;
                        break;
                    }
                }

            } else if (fieldType == that.types.date || fieldType == that.types.number || fieldType == that.types.dateAndTime) {

                markSelected = !!values.smallerThan ||
                               !!values.greaterThan ||
                               !!values.betweenStart ||
                               !!values.betweenEnd;
            }

            if (markSelected) {

                that.container.find('[data-smartsearch=' + apiname + ']').addClass('selected');
                that.container.find('a.clear').show();

            } else {

                that.container.find('[data-smartsearch=' + apiname + ']').removeClass('selected');

            }

        },
        /**
        * serialize the smart search data
        *                
        * @return serialized smart search data 
        */
        exportData: function () {

            var that = this;

            var data = [];

            for (var i in that.data) {

                var item = that.data[i],
                    fieldType = that.getType(item.FieldType),
                    hasValue = false;

                var smartSearchItem = {
                    ApiName: item.ApiName
                }

                item.Values = item.Values || {};

                if (fieldType == that.types.text) {

                    hasValue = !!item.Values.text;
                    smartSearchItem.ComparisonType = 'Contains';
                    smartSearchItem.Value = item.Values.text;

                } else if (fieldType == that.types.checkbox) {

                    smartSearchItem.ComparisonType = 'Values';
                    smartSearchItem.Values = [];



                    for (var k = 0; k < item.Values.length; k++) {                                            
                        if (item.Values[k].selected) {
                            smartSearchItem.Values.push(item.Values[k].Key);
                            hasValue = true;
                        }
                    }

                    /*
                    for (var k in item.Values) {
                        if (item.Values[k].selected) {
                            smartSearchItem.Values.push(k);
                            hasValue = true;
                        }
                    }
                    */


                } else if (fieldType == that.types.date || fieldType == that.types.number || fieldType == that.types.dateAndTime) {

                    if (item.Values.smallerThan) {

                        hasValue = true;
                        smartSearchItem.ComparisonType = 'SmallerThan';
                        smartSearchItem.Value = item.Values.smallerThan;

                    } else if (item.Values.greaterThan) {

                        hasValue = true;
                        smartSearchItem.ComparisonType = 'GreaterThan';
                        smartSearchItem.Value = item.Values.greaterThan;

                    } else if (!!item.Values.betweenStart && !!item.Values.betweenEnd) {

                        hasValue = true;
                        smartSearchItem.ComparisonType = 'Between';
                        smartSearchItem.RangeValue = { Start: item.Values.betweenStart, End: item.Values.betweenEnd };

                    }

                }

                if (hasValue) {
                    data.push(smartSearchItem);
                }

            }

            return data;
        }

    };

    var api = {

        // specify weather a call to items has started and didn't finished yet.
        inRequest: false,

        // api url
        host: '',


        /**
        * generic ajax request 
        *         
        * @param {options} - ajax options
        *
        */
        request: function (options) {
            
            log('start: api call to ' + options.url + ' in:' + new Date().toString());

            var ajaxOptions = {
                url: options.url,
                type: options.type || 'POST',
                data: JSON.stringify(options.data),

                contentType: 'application/json',
                dateType: 'json',
                crossDomain: true,                

                timeout: 1000 * 60 * 3,

                success: function (data) {

                    log('success:' + new Date().toString());

                    options.success && options.success(data);

                },

                error: function (xhr, ajaxOptions, thrownError) {

                    log('error:' + new Date().toString());

                    handleError({ ErrorMessage: thrownError });
                }
            };

            if (_accessToken) {
                ajaxOptions.headers = {
                    "Authorization": 'Bearer ' + _accessToken,
                    "TimeStamp": new Date().getTime()
                };

            }

            return $.ajax(ajaxOptions);

        },
        /**
         * set search preference - set the 
         *         
         * @param {searchOptions} - the token provided by the pepperi wsim user
         * @param {fn} - callback function when the async call is finished 
         */
        setSearchPreference: function (searchOptions, fn) {

            _searchOptions = $.extend(false, {}, _searchOptions, searchOptions);

            log('_searchOptions', _searchOptions);

            return $.ajax({
                url: this.host + 'Catalogs/' + _catalogUID + '/Items/Search',
                type: 'POST',
                data: JSON.stringify(_searchOptions),


                contentType: 'application/json',
                dateType: 'json',
                crossDomain: true,

                headers: {
                    "Authorization": 'Bearer ' + _accessToken,
                    //"TimeStamp": new Date().getTime()
                },

                timeout: 1000 * 60 * 2,

                success: function (data) {

                    if (data.Success) {
                        fn && fn(data);
                    } else {
                        handleError(data);
                    }

                },

                error: function (xhr, ajaxOptions, thrownError) {
                    handleError({ ErrorMessage: thrownError });
                }
            });

        },
        /**
         * get a list of main category and filters 
         *         
         * @param {fn} - callback function when the async call is finished 
         */
        mainCategoryAndFilters: function (fn) {

            return $.ajax({
                url: this.host + 'Catalogs/' + _catalogUID + '/MainCategoryAndFilters',
                type: 'GET',

                contentType: 'application/json',
                dateType: 'json',
                crossDomain: true,

                headers: {
                    "Authorization": 'Bearer ' + _accessToken,
                },

                timeout: 1000 * 60 * 2, // 2 minutes

                success: function (data) {
                    if (data.Success) {
                        fn && fn(data);
                    } else {
                        handleError(data);
                    }
                },

                error: function (xhr, ajaxOptions, thrownError) {
                    handleError({ ErrorMessage: thrownError });
                }
            });

        },

        /**
         * get items array for a specific catalog & search code
         * 
         * @param {indexStart} - get item from index
         * @param {indexEnd} - get item to index
         * @param {fn} - callback function when the async call is finished 
         */
        items: function (indexStart, indexEnd, fn) {

            if (!indexStart) {
                indexStart = 0;
            }

            if (!indexEnd) {
                indexEnd = thumbnails.perPage;
            }

            var url = this.host + 'Catalogs/' + _catalogUID + '/Items/' + _searchCode + '/' + indexStart + '/' + indexEnd;

            var that = this;

            that.inRequest = true;
            ui.loader(true);

            return $.ajax({
                url: url,
                type: 'GET',

                contentType: 'application/json',
                dateType: 'json',
                crossDomain: true,

                headers: {
                    "Authorization": 'Bearer ' + _accessToken,
                },

                timeout: 1000 * 60 * 2,

                success: function (data) {

                    if (data.Success) {

                        ui.setItemsCount(data.TotalRows);

                        fn && fn(data);

                    } else {
                        handleError(data);
                    }



                },

                error: function (xhr, ajaxOptions, thrownError) {
                    handleError({ ErrorMessage: thrownError });
                }


            }).done(function () {

                that.inRequest = false;
                ui.loader(false);
                thumbnails.page++;

            });

        },


    }

    function handleError(data) {

        api.inRequest = false;
        ui.loader(false);

        var friendly = {
            'E1002 ': 'Oops...Your session has timed out. Please refresh your browser'
        };
                
        for (var i in friendly) {
            if (data.ErrorMessage.indexOf(i) === 0) {
                data.ErrorMessage = friendly[i];
            }
        }
        
        alert(data.ErrorMessage);

        return false;
    }

    ns.init = init;
    ns.api = api;
    ns.ui = ui;
    ns.smartSearch = smartSearch;
    ns.handleError = handleError;

    ns.urlParameter = urlParameter;

    ns.searchOptions = _searchOptions;

})(window['pepperi'] = window['pepperi'] || {}, jQuery);