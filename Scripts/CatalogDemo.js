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



    var template = {

        // image field template
        image: '<li class="image"><a href="{{imageURL}}"><img src="{{imageURL}}" alt=""></a></li>',

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

        api.url = options.url;
        _accessToken = options.accessToken;
        _catalogUID = options.CatalogUID;

        // initialize ui         
        ui.init(options);

        // display loader
        ui.loader(true);

        return api.setSearchPreference({ CatalogUID: _catalogUID }, function (json) {

            _searchCode = json.SearchCode;

        }).then(function () {

            // async call to: mainCategoryAndFilters, smartSearch and items
            return $.when(api.mainCategoryAndFilters(), api.smartSearch(), api.items()).then(function () {

                // recive the data from the api calls
                var mainCategoryFilters = arguments[0][0],
                    smartsearch = arguments[1][0],
                    items = arguments[2][0];

                // display item count on ui
                ui.setItemsCount(items.TotalRows);

                // generate html for thumbnails
                thumbnails.init(items.Rows, items.UIControl); // items.UIControl

                // generate html for main category & filters
                if (options.displayMainCategory) {
                    mainCategory.init(mainCategoryFilters.MainCategoryList, mainCategoryFilters.FilterList);
                }

                // generate html for smart search
                if (options.displaySmartSearch) {
                    smartSearch.init(smartsearch.SmartSearchList);
                }

                // hide loader
                ui.loader(false);
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
            that.container = options.container || $('.thumbnails-view');
            that.container.find('h1.title').html(options.title);

            // show the container
            that.container.show();


            that.container.find('.logo img').attr('src', options.logo);

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
        * @param {data} - ui control settings 
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

            // make search preference api call
            api.setSearchPreference(data, function (json) {

                _searchCode = json.SearchCode;

                var indexStart = that.page * that.perPage,
                    indexEnd = indexStart + that.perPage;

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
                html = [];

            for (var i = 0; i < mainCateogry.length; i++) {

                var mc = mainCateogry[i],
                    filtersHtml = [],
                    filters = mc.FilterUIDList;

                if (filters.length > 0) {

                    filtersHtml.length = 0;

                    filtersHtml.push('<ul class="ul-filter" style="display:none;">');

                    for (var j = 0; j < filters.length; j++) {

                        var f = $.grep(filter, function (val) { return val.UID == filters[j] })[0]
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
        * render a specific template with data
        *        
        * @param {tmpl} - template name
        * @param {data} - dictionary of key/value to replace 
        * 
        * @return rendered html
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
        * render a specific template with data
        *        
        * @param {tmpl} - template name
        * @param {data} - dictionary of key/value to replace 
        * 
        * @return rendered html
        */
        attachEvents: function () {

            var that = this;

            $(window).on('scroll', debounce(function () {
                that.menu.hide();
            }, 250));
                            
            $('aside').on('scroll', debounce(function () {
                that.menu.hide();
            }, 250));

            that.container

                .on('click', 'li', function (e) {

                    var $this = $(this);

                    that.open($this, $this.attr('data-smartsearch'));

                })

                .on('click', 'a.clear', function (e) {

                    var $this = $(this);

                    for (var i in that.data) {

                        var apiname = that.data[i].ApiName,
                            fieldType = that.data[i].FieldType;

                        that.clear(apiname);

                        that.setSelected(apiname, fieldType);

                    }

                    thumbnails.onSearchPreferenceChange({});

                    that.container.find('a.clear').hide();

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
                    that.data[apiname].values[key].selected = !selected;

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

                    thumbnails.onSearchPreferenceChange({});

                });


            $('.search-container input[type=text]').on('keypress', function (e) {

                if (e.which == 13) {
                    thumbnails.onSearchPreferenceChange({ SearchText: $(this).val() });
                    return false;
                }

            });

        },
        /**
        * render a specific template with data
        *        
        * @param {tmpl} - template name
        * @param {data} - dictionary of key/value to replace 
        * 
        * @return rendered html
        */
        build: function (smartSearchArray) {

            var that = this,
                html = [];

            for (var i = 0; i < smartSearchArray.length; i++) {

                var ss = smartSearchArray[i],
                    filtersHtml = [];

                html.push(['<li data-smartsearch="', ss.ApiName, '">', ss.Title, '</li>'].join(''));

                that.data[ss.ApiName] = ss;

                // for debug - temporary fix 
                that.data[ss.ApiName].FieldType = enumFieldType.ComboBox;
            }

            that.container.find('ul').html(html.join(''));

        },
        /**
        * render a specific template with data
        *        
        * @param {tmpl} - template name
        * @param {data} - dictionary of key/value to replace 
        * 
        * @return rendered html
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

                    if (that.menu.is(':offscreen')) { 
                        that.menu.css({ left: element.offset().left + element.outerWidth(), bottom: 0, top: 'initial' }).show();
                    }
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

                data.values = data.values || {};

                that.menu.find('ul').find('[type=text]').val(data.values.text);

                if (data.values.smallerThan) {
                    that.menu.find('ul').find('.smaller-than').val(data.values.smallerThan);
                    that.menu.find('ul').find('[name=rdbSmartSearch].smaller-than').prop('checked', true);
                } else if (data.values.greaterThan) {
                    that.menu.find('ul').find('.greater-than').val(data.values.greaterThan);
                    that.menu.find('ul').find('[name=rdbSmartSearch].greater-than').prop('checked', true);
                } else if (data.values.betweenStart || data.values.betweenEnd) {
                    that.menu.find('ul').find('.between-start').val(data.values.betweenStart);
                    that.menu.find('ul').find('.between-end').val(data.values.betweenEnd);
                    that.menu.find('ul').find('[name=rdbSmartSearch].between').prop('checked', true);
                }

            }

            that.menu.css({ left: element.offset().left + element.outerWidth(), top: element.position().top });             // element.position().top + $('aside').position().top - 20


            that.menu.find('ul').html('<li class="sm-loader"></li>');

            that.menu.show();

            if (that.menu.is(':offscreen')) { 
                that.menu.css({ left: element.offset().left + element.outerWidth(), bottom: 0, top: 'initial' }).show();
            }

        },
        /**
        * render a specific template with data
        *        
        * @param {tmpl} - template name
        * @param {data} - dictionary of key/value to replace 
        * 
        * @return rendered html
        */
        close: function (apiname) {

            var that = this;

            that.menu.hide();

        },
        /**
        * render a specific template with data
        *        
        * @param {tmpl} - template name
        * @param {data} - dictionary of key/value to replace 
        * 
        * @return rendered html
        */
        clear: function (apiname) {

            var that = this;

            that.data[apiname].values = {};

            that.close();
        },
        /**
        * render a specific template with data
        *        
        * @param {tmpl} - template name
        * @param {data} - dictionary of key/value to replace 
        * 
        * @return rendered html
        */
        save: function (apiname, fieldType) {

            var that = this,

                data = {};

            if (fieldType == that.types.text) {

                data.text = $('input[type=text]', '.smart-search-menu').val();

                that.data[apiname].values = data;

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

                that.data[apiname].values = data;
            }
        },
        /**
        * render a specific template with data
        *        
        * @param {tmpl} - template name
        * @param {data} - dictionary of key/value to replace 
        * 
        * @return rendered html
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
        * render a specific template with data
        *        
        * @param {tmpl} - template name
        * @param {data} - dictionary of key/value to replace 
        * 
        * @return rendered html
        */
        getValues: function (apiname, fn) {

            var that = this,
                html = [];

            api.smartSearchValues(apiname, function (data) {

                var values = data.Values;

                if (typeof that.data[apiname].values === 'undefined') {
                    that.data[apiname].values = {};
                }


                for (var i = 0; i < values.length; i++) {

                    var item = values[i];


                    if (typeof that.data[apiname].values[item.key] === 'undefined') {
                        that.data[apiname].values[item.key] = { selected: false };
                    }

                    html.push(['<li data-key="', item.key, '"><input type="checkbox"', that.data[apiname].values[item.key].selected ? ' checked="checked" ' : '', '/>', item.value, '</li>'].join(''));
                }

                fn(html.join(''));
            });

        },
        /**
        * render a specific template with data
        *        
        * @param {tmpl} - template name
        * @param {data} - dictionary of key/value to replace 
        * 
        * @return rendered html
        */
        setSelected: function (apiname, fieldType) {

            var that = this,
                values = that.data[apiname].values,
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
        * render a specific template with data
        *        
        * @param {tmpl} - template name
        * @param {data} - dictionary of key/value to replace 
        * 
        * @return rendered html
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

                item.values = item.values || {};

                if (fieldType == that.types.text) {

                    hasValue = !!item.values.text;
                    smartSearchItem.ComparisonType = 'Contains';
                    smartSearchItem.Value = item.values.text;

                } else if (fieldType == that.types.checkbox) {

                    smartSearchItem.ComparisonType = 'Values';
                    smartSearchItem.Values = []; // item.values.text;

                } else if (fieldType == that.types.date || fieldType == that.types.number || fieldType == that.types.dateAndTime) {

                    if (item.values.smallerThan) {

                        hasValue = true;
                        smartSearchItem.ComparisonType = 'SmallerThan';
                        smartSearchItem.Value = item.values.smallerThan;

                    } else if (item.values.greaterThan) {

                        hasValue = true;
                        smartSearchItem.ComparisonType = 'GreaterThan';
                        smartSearchItem.Value = item.values.greaterThan;

                    } else if (!!item.values.betweenStart && !!item.values.betweenEnd) {

                        hasValue = true;
                        smartSearchItem.ComparisonType = 'Between';
                        smartSearchItem.RangeValue = { Start: item.values.betweenStart, End: item.values.betweenEnd };

                    }

                }

                if (hasValue) {
                    data.push(smartSearchItem);
                }

            }

            return data;
        }

    };

    var helper = {
        /**
        * get path helper
        *        
        * @param {path} - full path
        * @param {port} - port of the url
        * 
        * @return url
        */
        getPath: function (path, port) {

            return baseUrl.replace('{port}', port) + path;
        }
    }

    var api = {

        // specify weather a call to items has started and didn't finished yet.
        inRequest: false,

        // api url
        url: '',


        base: function () {

            return $.ajax({
                url: this.url + 'Catalogs/' + _catalogUID + '/MainCategoryAndFilters',
                type: 'GET',

                contentType: 'application/json',
                dateType: 'json',
                crossDomain: true,

                headers: {
                    "Authorization": 'Bearer ' + _accessToken,
                },

                success: function (data) {
                    fn && fn(data);
                }
            });

        },

        /**
         * refresh access token
         *
         * @param {accessToken} - the temporary access token
         * @param {fn} - callback function when the async call is finished 
         */
        refreshUserToken: function (token, fn) {

            var data = {
                Token: token
            }

            return $.ajax({
                url: '/Views/Sandbox/ajax/RefreshUserToken.json',
                type: 'GET', // POST
                success: function (json) {
                    fn && fn(json);
                }
            });

        },

        /**
         * set search preference - set the 
         *
         * @param {accessToken} - the temporary access token
         * @param {searchOptions} - the token provided by the pepperi wsim user
         * @param {fn} - callback function when the async call is finished 
         */
        setSearchPreference: function (searchOptions, fn) {

            _searchOptions = $.extend(true, {}, _searchOptions, searchOptions);

            console.log('_searchOptions', _searchOptions);

            return $.ajax({
                url: this.url + 'Catalogs/' + _catalogUID + '/SetSearchPreference',
                type: 'POST',
                data: JSON.stringify(_searchOptions),


                contentType: 'application/json',
                dateType: 'json',
                crossDomain: true,

                headers: {
                    "Authorization": 'Bearer ' + _accessToken,
                },

                success: function (data) {
                    fn && fn(data);
                }

            });

        },
        /**
         * get 
         *
         * @param {accessToken} - the temporary access token
         * @param {catalogUid} - the catalog uid
         * @param {fn} - callback function when the async call is finished 
         */
        mainCategoryAndFilters: function (fn) {

            return $.ajax({
                url: this.url + 'Catalogs/' + _catalogUID + '/MainCategoryAndFilters',
                type: 'GET',

                contentType: 'application/json',
                dateType: 'json',
                crossDomain: true,

                headers: {
                    "Authorization": 'Bearer ' + _accessToken,
                },

                success: function (data) {
                    fn && fn(data);
                }
            });

        },
        /**
         * generates a user access token from token
         * 
         *
         * @param {accessToken} - the temporary access token         
         * @param {catalogUid} - the catalog uid
         * @param {fn} - callback function when the async call is finished 
         */
        smartSearch: function (fn) {

            //GET /v1/Catalogs/{CatalogUID}/SmartSearchOptions

            return $.ajax({
                url: this.url + '/Catalogs/' + _catalogUID + '/SmartSearchOptions',
                type: 'GET',

                contentType: 'application/json',
                dateType: 'json',
                crossDomain: true,

                headers: {
                    "Authorization": 'Bearer ' + _accessToken,
                },

                success: function (data) {
                    fn && fn(data);
                }
            });

        },
        /**
         * generates a user access token from token
         *
         * @param {accessToken} - the temporary access token
         * @param {apiname} - apiname for values
         * @param {fn} - callback function when the async call is finished 
         */
        smartSearchValues: function (apiname, fn) {

            return $.ajax({
                //url: '/Views/Sandbox/ajax/SmartSearchValues.json',
                url: this.url + 'Catalogs/' + _catalogUID + '/SmartSearchValues/' + _searchCode + '/' + apiname,

                contentType: 'application/json',
                dateType: 'json',
                crossDomain: true,
                headers: {
                    "Authorization": 'Bearer ' + _accessToken,
                },


                type: 'GET',
                success: function (data) {
                    fn && fn(data);
                }
            });

        },
        /**
         * generates a user access token from token
         *
         * @param {catalogUid} - the catalog uid
         * @param {searchCode} - the search preference code
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

            var url = this.url + 'Catalogs/' + _catalogUID + '/Items/' + _searchCode + '/' + indexStart + '/' + indexEnd;

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

                success: function (json) {

                    ui.setItemsCount(json.TotalRows);

                    fn && fn(json);

                }
            }).done(function () {

                that.inRequest = false;
                ui.loader(false);
                thumbnails.page++;

            });

        },
        /**
         * generates a user access token from token
         *     
         * @param {catalogUid} - the catalog uid
         * @param {searchCode} - the search preference code
         * @param {fn} - callback function when the async call is finished 
         */
        itemsCount: function (catalogUid, searchCode, fn) {
            return $.ajax({
                type: 'GET',
                url: helper.getPath('GetCatalogItemsCount/' + orderId),
                success: function (count) {
                    fn(count);
                }
            });
        },

    }

    ns.init = init;
    ns.api = api;
    ns.ui = ui;
    ns.smartSearch = smartSearch;

})(window['pepperi'] = window['pepperi'] || {}, jQuery);