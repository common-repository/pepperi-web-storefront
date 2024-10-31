
function log() { try { typeof console !== 'undefined' && console.log.apply(console, arguments); } catch (e) { } }

jQuery.fn.outerHTML = function (s) { return s ? this.before(s).remove() : jQuery("<p>").append(this.eq(0).clone()).html(); };


var UIControlFieldType =
{
    'TextBox': 1,
    'LimitedLengthTextBox': 2,
    'TextArea': 3,
    'TextHeader': 4,
    'Date': 5,
    'DateAndTime': 6,
    'NumberInetger': 7,
    'NumberReal': 8,
    'Currency': 9,
    'Boolean': 10,
    'ComboBox': 11,
    'MultiTickBox': 12,
    'Separator': 13,
    'Address': 14,
    'Percentage': 15,
    'EmptyComboBox': 16,
    'InternalLink': 17, // for reps, Contacts, Locations & Catalogs
    'Email': 18,
    'LimitedDate': 19,
    'Image': 20,
    'MultiTickBoxToComboBox': 21,
    'EmptyMultiTickBox': 22,
    'Totals': 23,
    'Attachment': 24,
    'Signature': 25,
    'Link': 26,
    'ImageURL': 27,
    'NumberIntegerQuantitySelector': 28,
    'NumberRealQuantitySelector': 29,
    'NumberIntegerForMatrix': 30,
    'NumberRealForMatrix': 31,
    'Images': 32,
    'Indicators': 33,
    'CalculatedReal': 34,
    'CalculatedInt': 35,
    'CalculatedString': 36,
    'CalculatedDate': 37,
    'CalculatedBool': 38,
    'MapDataDropDown': 39,
    'MapDataReal': 40,
    'MapDataString': 41,
    'MapDataInt': 42,
    'Sum': 43,
    'Phone': 44
}

var uiControlData = [
    { ItemHasActiveCampaign: '', ItemIndicatorsWithoutCampaign: '', Share: '', Info: '', Image: 'http://ichef-1.bbci.co.uk/news/660/cpsprodpb/17A21/production/_85310869_85310700.jpg', ItemExternalID: '1234', ItemName: 'new item', QuantitySelector: '0' },
    { ItemHasActiveCampaign: '', ItemIndicatorsWithoutCampaign: '', Share: '', Info: '', Image: 'http://ichef-1.bbci.co.uk/news/660/cpsprodpb/17A21/production/_85310869_85310700.jpg', ItemExternalID: '1256', ItemName: 'item test', QuantitySelector: '0' },
    { ItemHasActiveCampaign: '', ItemIndicatorsWithoutCampaign: '', Share: '', Info: '', Image: 'http://ichef-1.bbci.co.uk/news/660/cpsprodpb/17A21/production/_85310869_85310700.jpg', ItemExternalID: '9833', ItemName: 'shlomi', QuantitySelector: '0' },
    { ItemHasActiveCampaign: '', ItemIndicatorsWithoutCampaign: '', Share: '', Info: '', Image: 'http://ichef-1.bbci.co.uk/news/660/cpsprodpb/17A21/production/_85310869_85310700.jpg', ItemExternalID: '8383', ItemName: 'komemi', QuantitySelector: '0' },
    { ItemHasActiveCampaign: '', ItemIndicatorsWithoutCampaign: '', Share: '', Info: '', Image: 'http://ichef-1.bbci.co.uk/news/660/cpsprodpb/17A21/production/_85310869_85310700.jpg', ItemExternalID: '1111', ItemName: 'bla bla', QuantitySelector: '0' },
    { ItemHasActiveCampaign: '', ItemIndicatorsWithoutCampaign: '', Share: '', Info: '', Image: 'http://ichef-1.bbci.co.uk/news/660/cpsprodpb/17A21/production/_85310869_85310700.jpg', ItemExternalID: '555', ItemName: 'new 1', QuantitySelector: '0' },
    { ItemHasActiveCampaign: '', ItemIndicatorsWithoutCampaign: '', Share: '', Info: '', Image: 'http://ichef-1.bbci.co.uk/news/660/cpsprodpb/17A21/production/_85310869_85310700.jpg', ItemExternalID: '444', ItemName: '222 test', QuantitySelector: '0' },
    { ItemHasActiveCampaign: '', ItemIndicatorsWithoutCampaign: '', Share: '', Info: '', Image: 'http://ichef-1.bbci.co.uk/news/660/cpsprodpb/17A21/production/_85310869_85310700.jpg', ItemExternalID: '66', ItemName: 'hello', QuantitySelector: '0' },
    { ItemHasActiveCampaign: '', ItemIndicatorsWithoutCampaign: '', Share: '', Info: '', Image: 'http://ichef-1.bbci.co.uk/news/660/cpsprodpb/17A21/production/_85310869_85310700.jpg', ItemExternalID: '234', ItemName: 'world!', QuantitySelector: '0' },
    { ItemHasActiveCampaign: '', ItemIndicatorsWithoutCampaign: '', Share: '', Info: '', Image: 'http://ichef-1.bbci.co.uk/news/660/cpsprodpb/17A21/production/_85310869_85310700.jpg', ItemExternalID: '44', ItemName: 'lool!', QuantitySelector: '0' }
];


var uiControl = {
    "__type": "WrntyCommon.UIControl",
    "ObjectID": 1166139,
    "Type": "[OA#21879]OrderCenterView2",
    "ControlFields": [
    {
        "ParentField": "Image",
        "Title": "",
        "WrntyFieldName": "Item has active Campaign",
        "MandatoryField": false,
        "ReadOnlyField": false,
        "FieldConditions": [],
        "CustomField": false,
        "ApiName": "ItemHasActiveCampaign",
        "FieldType": 10,
        "OptionalValues": null,
        "MinValue": -1000000000,
        "MaxValue": 1000000000,
        "MaxCharacters": 0,
        "MaxLines": 0,
        "Layout": {
            "X": 0,
            "Y": 0,
            "Width": 2,
            "Line_Number": 0,
            "Field_Height": 1,
            "xAlignment": 1,
            "yAlignment": 3
        },
        "ColumnWidth": 10,
        "ObjectTypeReference": 0,
        "DefaultValue": "",
        "Hidden": false
    },
    {
        "ParentField": "Image",
        "Title": "",
        "WrntyFieldName": "Product Hints & Campaign",
        "MandatoryField": false,
        "ReadOnlyField": true,
        "FieldConditions": [],
        "CustomField": false,
        "ApiName": "ItemIndicatorsWithoutCampaign",
        "FieldType": 33,
        "OptionalValues": null,
        "MinValue": -1000000000,
        "MaxValue": 1000000000,
        "MaxCharacters": 0,
        "MaxLines": 0,
        "Layout": {
            "X": 2,
            "Y": 0,
            "Width": 4,
            "Line_Number": 0,
            "Field_Height": 1,
            "xAlignment": 1,
            "yAlignment": 3
        },
        "ColumnWidth": 10,
        "ObjectTypeReference": 0,
        "DefaultValue": "",
        "Hidden": false
    },
    {
        "ParentField": "Image",
        "Title": "",
        "WrntyFieldName": "",
        "MandatoryField": false,
        "ReadOnlyField": false,
        "FieldConditions": [],
        "CustomField": false,
        "ApiName": "Share",
        "FieldType": 13,
        "OptionalValues": [],
        "MinValue": 0,
        "MaxValue": 100,
        "MaxCharacters": 0,
        "MaxLines": 0,
        "Layout": {
            "X": 6,
            "Y": 0,
            "Width": 2,
            "Line_Number": 0,
            "Field_Height": 1,
            "xAlignment": 2,
            "yAlignment": 3
        },
        "ColumnWidth": 10,
        "ObjectTypeReference": 0,
        "DefaultValue": "",
        "Hidden": false
    },
    {
        "ParentField": "Image",
        "Title": "",
        "WrntyFieldName": "",
        "MandatoryField": false,
        "ReadOnlyField": false,
        "FieldConditions": [],
        "CustomField": false,
        "ApiName": "Info",
        "FieldType": 13,
        "OptionalValues": [],
        "MinValue": 0,
        "MaxValue": 100,
        "MaxCharacters": 0,
        "MaxLines": 0,
        "Layout": {
            "X": 8,
            "Y": 0,
            "Width": 2,
            "Line_Number": 0,
            "Field_Height": 1,
            "xAlignment": 2,
            "yAlignment": 3
        },
        "ColumnWidth": 10,
        "ObjectTypeReference": 0,
        "DefaultValue": "",
        "Hidden": false
    },
    {
        "ParentField": "",
        "Title": "",
        "WrntyFieldName": "Image",
        "MandatoryField": false,
        "ReadOnlyField": false,
        "FieldConditions": [],
        "CustomField": false,
        "ApiName": "Image",
        "FieldType": 20,
        "OptionalValues": null,
        "MinValue": -1000000000,
        "MaxValue": 1000000000,
        "MaxCharacters": 0,
        "MaxLines": 0,
        "Layout": {
            "X": 0,
            "Y": 1,
            "Width": 3,
            "Line_Number": 0,
            "Field_Height": 4,
            "xAlignment": 3,
            "yAlignment": 3
        },
        "ColumnWidth": 10,
        "ObjectTypeReference": 0,
        "DefaultValue": "",
        "Hidden": false
    },
    {
        "ParentField": "",
        "Title": "",
        "WrntyFieldName": "Item External ID",
        "MandatoryField": false,
        "ReadOnlyField": true,
        "FieldConditions": [],
        "CustomField": false,
        "ApiName": "ItemExternalID",
        "FieldType": 1,
        "OptionalValues": null,
        "MinValue": -1000000000,
        "MaxValue": 1000000000,
        "MaxCharacters": 0,
        "MaxLines": 0,
        "Layout": {
            "X": 3,
            "Y": 1,
            "Width": 7,
            "Line_Number": 0,
            "Field_Height": 1,
            "xAlignment": 3,
            "yAlignment": 3
        },
        "ColumnWidth": 25,
        "ObjectTypeReference": 0,
        "DefaultValue": "",
        "Hidden": false
    },
    {
        "ParentField": "",
        "Title": "",
        "WrntyFieldName": "Item Description",
        "MandatoryField": false,
        "ReadOnlyField": true,
        "FieldConditions": [],
        "CustomField": false,
        "ApiName": "ItemName",
        "FieldType": 1,
        "OptionalValues": null,
        "MinValue": -1000000000,
        "MaxValue": 1000000000,
        "MaxCharacters": 0,
        "MaxLines": 0,
        "Layout": {
            "X": 3,
            "Y": 2,
            "Width": 7,
            "Line_Number": 0,
            "Field_Height": 1,
            "xAlignment": 3,
            "yAlignment": 3
        },
        "ColumnWidth": 25,
        "ObjectTypeReference": 0,
        "DefaultValue": "",
        "Hidden": false
    },
    {
        "ParentField": "",
        "Title": "",
        "WrntyFieldName": "",
        "MandatoryField": false,
        "ReadOnlyField": false,
        "FieldConditions": [],
        "CustomField": false,
        "ApiName": "QuantitySelector",
        "FieldType": 28,
        "OptionalValues": [],
        "MinValue": 0,
        "MaxValue": 100,
        "MaxCharacters": 0,
        "MaxLines": 0,
        "Layout": {
            "X": 3,
            "Y": 3,
            "Width": 7,
            "Line_Number": 0,
            "Field_Height": 2,
            "xAlignment": 3,
            "yAlignment": 3
        },
        "ColumnWidth": 10,
        "ObjectTypeReference": 0,
        "DefaultValue": "",
        "Hidden": false
    }
    ],
    "ControlConditions": [],
    "Family": "Catalog",
    "Name": "[Obsolete]",
    "DisplayName": "Rep",
    "HighlightFirst": true,
    "Columns": 10,
    "SortBy": null,
    "SortAsc": false,
    "GroupBy": "-1",
    "Flat": false,
    "ActivityTypesID": null,
    "Statuses": null,
    "ControlName": null,
    "ViewType": 0,
    "PermissionRoleID": 466,
    "PermissionRoleName": "Rep",
    "Version": 2,
    "Layout": {
        "columnDefinitions": [
        {
            "title": null,
            "apiName": null,
            "width": 10,
            "Mode": 1
        },
        {
            "title": null,
            "apiName": null,
            "width": 10,
            "Mode": 1
        },
        {
            "title": null,
            "apiName": null,
            "width": 10,
            "Mode": 1
        },
        {
            "title": null,
            "apiName": null,
            "width": 10,
            "Mode": 1
        },
        {
            "title": null,
            "apiName": null,
            "width": 10,
            "Mode": 1
        },
        {
            "title": null,
            "apiName": null,
            "width": 10,
            "Mode": 1
        },
        {
            "title": null,
            "apiName": null,
            "width": 10,
            "Mode": 1
        },
        {
            "title": null,
            "apiName": null,
            "width": 10,
            "Mode": 1
        },
        {
            "title": null,
            "apiName": null,
            "width": 10,
            "Mode": 1
        },
        {
            "title": null,
            "apiName": null,
            "width": 10,
            "Mode": 1
        }
        ],
        "rowDefinitions": [
        {
            "mode": 1
        },
        {
            "mode": 0
        },
        {
            "mode": 0
        },
        {
            "mode": 0
        },
        {
            "mode": 0
        }
        ],
        "frozenColumnsCount": 0
    },
    "IsSuccess": true,
    "HasSession": true,
    "Message": "",
    "MessageDescription": null,
    "MessageInnerDescription": null,
    "MessageType": 0,
    "Pager": null,
    "Sorting": null,
    "FilterCollection": null,
    "Data": null
}





var ListFieldValues = [
         {
    "Custom_Values": {
        "Value": null,
        "Date_Time": null,
        "CustomAddress": null,
        "Totals": 4,
        "Connected": 4,
        "ListIds": null,
        "ListValues": null
    },
    "KeyValueList": null,
    "ConectedToFields": [
    ""
    ]
},
         {
    "Custom_Values": {
        "Value": "1111",
        "Date_Time": null,
        "CustomAddress": null,
        "Totals": 0,
        "Connected": 0,
        "ListIds": null,
        "ListValues": null
    },
    "KeyValueList": null,
    "ConectedToFields": [
    ""
    ]
},
         {
    "Custom_Values": {
        "Value": "d",
        "Date_Time": null,
        "CustomAddress": null,
        "Totals": 0,
        "Connected": 0,
        "ListIds": null,
        "ListValues": null
    },
    "KeyValueList": null,
    "ConectedToFields": [
    ""
    ]
},
         {
    "Custom_Values": {
        "Value": null,
        "Date_Time": null,
        "CustomAddress": {
            "Address": {
                "Street": "",
                "City": "",
                "State": "",
                "StateISOAlpha2Code": "",
                "Country": "Algeria",
                "CountryISOAlpha2Code": "DZ",
                "ZipCode": "",
                "Latitude": 37.08982,
                "Longitude": 11.999999
            },
            "States": [],
            "Countries": [
            {
                "key": "",
                "value": "-"
            },
            {
                "key": "AF",
                "value": "Afghanistan"
            },
            {
                "key": "AX",
                "value": "Åland Islands"
            },
            {
                "key": "AL",
                "value": "Albania"
            },
            {
                "key": "DZ",
                "value": "Algeria"
            },
            {
                "key": "AS",
                "value": "American Samoa"
            },
            {
                "key": "AD",
                "value": "Andorra"
            },
            {
                "key": "AO",
                "value": "Angola"
            },
            {
                "key": "AI",
                "value": "Anguilla"
            },
            {
                "key": "AQ",
                "value": "Antarctica"
            },
            {
                "key": "AG",
                "value": "Antigua And Barbuda"
            },
            {
                "key": "AR",
                "value": "Argentina"
            },
            {
                "key": "AM",
                "value": "Armenia"
            },
            {
                "key": "AW",
                "value": "Aruba"
            },
            {
                "key": "AU",
                "value": "Australia"
            },
            {
                "key": "AT",
                "value": "Austria"
            },
            {
                "key": "AZ",
                "value": "Azerbaijan"
            },
            {
                "key": "BS",
                "value": "Bahamas"
            },
            {
                "key": "BH",
                "value": "Bahrain"
            },
            {
                "key": "BD",
                "value": "Bangladesh"
            },
            {
                "key": "BB",
                "value": "Barbados"
            },
            {
                "key": "BY",
                "value": "Belarus"
            },
            {
                "key": "BE",
                "value": "Belgium"
            },
            {
                "key": "BZ",
                "value": "Belize"
            },
            {
                "key": "BJ",
                "value": "Benin"
            },
            {
                "key": "BM",
                "value": "Bermuda"
            },
            {
                "key": "BT",
                "value": "Bhutan"
            },
            {
                "key": "BO",
                "value": "Bolivia"
            },
            {
                "key": "BA",
                "value": "Bosnia And Herzegovina"
            },
            {
                "key": "BW",
                "value": "Botswana"
            },
            {
                "key": "BV",
                "value": "Bouvet Island"
            },
            {
                "key": "BR",
                "value": "Brazil"
            },
            {
                "key": "IO",
                "value": "British Indian Ocean Territory"
            },
            {
                "key": "BN",
                "value": "Brunei Darussalam"
            },
            {
                "key": "BG",
                "value": "Bulgaria"
            },
            {
                "key": "BF",
                "value": "Burkina Faso"
            },
            {
                "key": "BI",
                "value": "Burundi"
            },
            {
                "key": "KH",
                "value": "Cambodia"
            },
            {
                "key": "CM",
                "value": "Cameroon"
            },
            {
                "key": "CA",
                "value": "Canada"
            },
            {
                "key": "CV",
                "value": "Cape Verde"
            },
            {
                "key": "KY",
                "value": "Cayman Islands"
            },
            {
                "key": "CF",
                "value": "Central African Republic"
            },
            {
                "key": "TD",
                "value": "Chad"
            },
            {
                "key": "CL",
                "value": "Chile"
            },
            {
                "key": "CN",
                "value": "China"
            },
            {
                "key": "CX",
                "value": "Christmas Island"
            },
            {
                "key": "CC",
                "value": "Cocos (Keeling) Islands"
            },
            {
                "key": "CO",
                "value": "Colombia"
            },
            {
                "key": "KM",
                "value": "Comoros"
            },
            {
                "key": "CD",
                "value": "Congo"
            },
            {
                "key": "CG",
                "value": "Congo"
            },
            {
                "key": "CK",
                "value": "Cook Islands"
            },
            {
                "key": "CR",
                "value": "Costa rica"
            },
            {
                "key": "CI",
                "value": "Côte D'ivoire"
            },
            {
                "key": "HR",
                "value": "Croatia"
            },
            {
                "key": "CU",
                "value": "Cuba"
            },
            {
                "key": "CY",
                "value": "Cyprus"
            },
            {
                "key": "CZ",
                "value": "Czech Republic"
            },
            {
                "key": "DK",
                "value": "Denmark"
            },
            {
                "key": "DJ",
                "value": "Djibouti"
            },
            {
                "key": "DM",
                "value": "Dominica"
            },
            {
                "key": "DO",
                "value": "Dominican Republic"
            },
            {
                "key": "EC",
                "value": "Ecuador"
            },
            {
                "key": "EG",
                "value": "Egypt"
            },
            {
                "key": "SV",
                "value": "El Salvador"
            },
            {
                "key": "GQ",
                "value": "Equatorial Guinea"
            },
            {
                "key": "ER",
                "value": "Eritrea"
            },
            {
                "key": "EE",
                "value": "Estonia"
            },
            {
                "key": "ET",
                "value": "Ethiopia"
            },
            {
                "key": "FK",
                "value": "Falkland Islands (Malvinas)"
            },
            {
                "key": "FO",
                "value": "Faroe Islands"
            },
            {
                "key": "FJ",
                "value": "Fiji"
            },
            {
                "key": "FI",
                "value": "Finland"
            },
            {
                "key": "FR",
                "value": "France"
            },
            {
                "key": "GF",
                "value": "French Guiana"
            },
            {
                "key": "PF",
                "value": "French Polynesia"
            },
            {
                "key": "TF",
                "value": "French Southern Territories"
            },
            {
                "key": "GA",
                "value": "Gabon"
            },
            {
                "key": "GM",
                "value": "Gambia"
            },
            {
                "key": "GE",
                "value": "Georgia"
            },
            {
                "key": "DE",
                "value": "Germany"
            },
            {
                "key": "GH",
                "value": "Ghana"
            },
            {
                "key": "GI",
                "value": "Gibraltar"
            },
            {
                "key": "GR",
                "value": "Greece"
            },
            {
                "key": "GL",
                "value": "Greenland"
            },
            {
                "key": "GD",
                "value": "Grenada"
            },
            {
                "key": "GP",
                "value": "Guadeloupe"
            },
            {
                "key": "GU",
                "value": "Guam"
            },
            {
                "key": "GT",
                "value": "Guatemala"
            },
            {
                "key": "GG",
                "value": "Guernsey"
            },
            {
                "key": "GN",
                "value": "Guinea"
            },
            {
                "key": "GW",
                "value": "Guinea-Bissau"
            },
            {
                "key": "GY",
                "value": "Guyana"
            },
            {
                "key": "HT",
                "value": "Haiti"
            },
            {
                "key": "HM",
                "value": "Heard Island And Mcdonald Islands"
            },
            {
                "key": "NL",
                "value": "Holland"
            },
            {
                "key": "HN",
                "value": "Honduras"
            },
            {
                "key": "HK",
                "value": "Hong Kong"
            },
            {
                "key": "HU",
                "value": "Hungary"
            },
            {
                "key": "IS",
                "value": "Iceland"
            },
            {
                "key": "IN",
                "value": "India"
            },
            {
                "key": "ID",
                "value": "Indonesia"
            },
            {
                "key": "IR",
                "value": "Iran"
            },
            {
                "key": "IQ",
                "value": "Iraq"
            },
            {
                "key": "IE",
                "value": "Ireland"
            },
            {
                "key": "IM",
                "value": "Isle Of Man"
            },
            {
                "key": "IL",
                "value": "Israel"
            },
            {
                "key": "IT",
                "value": "Italy"
            },
            {
                "key": "JM",
                "value": "Jamaica"
            },
            {
                "key": "JP",
                "value": "Japan"
            },
            {
                "key": "JE",
                "value": "Jersey"
            },
            {
                "key": "JO",
                "value": "Jordan"
            },
            {
                "key": "KZ",
                "value": "Kazakhstan"
            },
            {
                "key": "KE",
                "value": "Kenya"
            },
            {
                "key": "KI",
                "value": "Kiribati"
            },
            {
                "key": "XK",
                "value": "Kosovo"
            },
            {
                "key": "KW",
                "value": "Kuwait"
            },
            {
                "key": "KG",
                "value": "Kyrgyzstan"
            },
            {
                "key": "LA",
                "value": "Lao"
            },
            {
                "key": "LV",
                "value": "Latvia"
            },
            {
                "key": "LB",
                "value": "Lebanon"
            },
            {
                "key": "LS",
                "value": "Lesotho"
            },
            {
                "key": "LR",
                "value": "Liberia"
            },
            {
                "key": "LY",
                "value": "Libyan Arab Jamahiriya"
            },
            {
                "key": "LI",
                "value": "Liechtenstein"
            },
            {
                "key": "LT",
                "value": "Lithuania"
            },
            {
                "key": "LU",
                "value": "Luxembourg"
            },
            {
                "key": "MO",
                "value": "Macao"
            },
            {
                "key": "MK",
                "value": "Macedonia"
            },
            {
                "key": "MG",
                "value": "Madagascar"
            },
            {
                "key": "MW",
                "value": "Malawi"
            },
            {
                "key": "MY",
                "value": "Malaysia"
            },
            {
                "key": "MV",
                "value": "Maldives"
            },
            {
                "key": "ML",
                "value": "Mali"
            },
            {
                "key": "MT",
                "value": "Malta"
            },
            {
                "key": "MH",
                "value": "Marshall Islands"
            },
            {
                "key": "MQ",
                "value": "Martinique"
            },
            {
                "key": "MR",
                "value": "Mauritania"
            },
            {
                "key": "MU",
                "value": "Mauritius"
            },
            {
                "key": "YT",
                "value": "Mayotte"
            },
            {
                "key": "MX",
                "value": "Mexico"
            },
            {
                "key": "FM",
                "value": "Micronesia"
            },
            {
                "key": "MD",
                "value": "Moldova"
            },
            {
                "key": "MC",
                "value": "Monaco"
            },
            {
                "key": "MN",
                "value": "Mongolia"
            },
            {
                "key": "ME",
                "value": "Montenegro"
            },
            {
                "key": "MS",
                "value": "Montserrat"
            },
            {
                "key": "MA",
                "value": "Morocco"
            },
            {
                "key": "MZ",
                "value": "Mozambique"
            },
            {
                "key": "MM",
                "value": "Myanmar"
            },
            {
                "key": "NA",
                "value": "Namibia"
            },
            {
                "key": "NR",
                "value": "Nauru"
            },
            {
                "key": "NP",
                "value": "Nepal"
            },
            {
                "key": "AN",
                "value": "Netherlands Antilles"
            },
            {
                "key": "NC",
                "value": "New Caledonia"
            },
            {
                "key": "NZ",
                "value": "New Zealand"
            },
            {
                "key": "NI",
                "value": "Nicaragua"
            },
            {
                "key": "NE",
                "value": "Niger"
            },
            {
                "key": "NG",
                "value": "Nigeria"
            },
            {
                "key": "NU",
                "value": "Niue"
            },
            {
                "key": "NF",
                "value": "Norfolk Island"
            },
            {
                "key": "KP",
                "value": "North korea"
            },
            {
                "key": "MP",
                "value": "Northern Mariana Islands"
            },
            {
                "key": "NO",
                "value": "Norway"
            },
            {
                "key": "OM",
                "value": "Oman"
            },
            {
                "key": "PK",
                "value": "Pakistan"
            },
            {
                "key": "PS",
                "value": "Palestinian Territory"
            },
            {
                "key": "PA",
                "value": "Panama"
            },
            {
                "key": "PG",
                "value": "Papua New Guinea"
            },
            {
                "key": "PY",
                "value": "Paraguay"
            },
            {
                "key": "PE",
                "value": "Peru"
            },
            {
                "key": "PH",
                "value": "Philippines"
            },
            {
                "key": "PN",
                "value": "Pitcairn"
            },
            {
                "key": "PL",
                "value": "Poland"
            },
            {
                "key": "PT",
                "value": "Portugal"
            },
            {
                "key": "PR",
                "value": "Puerto Rico"
            },
            {
                "key": "QA",
                "value": "Qatar"
            },
            {
                "key": "RE",
                "value": "Réunion"
            },
            {
                "key": "RO",
                "value": "Romania"
            },
            {
                "key": "RU",
                "value": "Russian Federation"
            },
            {
                "key": "BL",
                "value": "Saint Barthélemy"
            },
            {
                "key": "SH",
                "value": "Saint Helena"
            },
            {
                "key": "KN",
                "value": "Saint kitts and nevis"
            },
            {
                "key": "LC",
                "value": "Saint Lucia"
            },
            {
                "key": "PM",
                "value": "Saint Pierre And Miquelon"
            },
            {
                "key": "VC",
                "value": "Saint Vincent And The Grenadines"
            },
            {
                "key": "WS",
                "value": "Samoa"
            },
            {
                "key": "SM",
                "value": "San Marino"
            },
            {
                "key": "ST",
                "value": "Sao Tome And Principe"
            },
            {
                "key": "SA",
                "value": "Saudi Arabia"
            },
            {
                "key": "SN",
                "value": "Senegal"
            },
            {
                "key": "RS",
                "value": "Serbia"
            },
            {
                "key": "SC",
                "value": "Seychelles"
            },
            {
                "key": "SL",
                "value": "Sierra Leone"
            },
            {
                "key": "SG",
                "value": "Singapore"
            },
            {
                "key": "SK",
                "value": "Slovakia"
            },
            {
                "key": "SI",
                "value": "Slovenia"
            },
            {
                "key": "SB",
                "value": "Solomon Islands"
            },
            {
                "key": "SO",
                "value": "Somalia"
            },
            {
                "key": "ZA",
                "value": "South Africa"
            },
            {
                "key": "GS",
                "value": "South Georgia And The South Sandwich Islands"
            },
            {
                "key": "KR",
                "value": "South korea"
            },
            {
                "key": "ES",
                "value": "Spain"
            },
            {
                "key": "LK",
                "value": "Sri Lanka"
            },
            {
                "key": "SD",
                "value": "Sudan"
            },
            {
                "key": "SR",
                "value": "Suriname"
            },
            {
                "key": "SJ",
                "value": "Svalbard And Jan Mayen"
            },
            {
                "key": "SZ",
                "value": "Swaziland"
            },
            {
                "key": "SE",
                "value": "Sweden"
            },
            {
                "key": "CH",
                "value": "Switzerland"
            },
            {
                "key": "SY",
                "value": "Syrian Arab Republic"
            },
            {
                "key": "TW",
                "value": "Taiwan"
            },
            {
                "key": "TJ",
                "value": "Tajikistan"
            },
            {
                "key": "TZ",
                "value": "Tanzania"
            },
            {
                "key": "TH",
                "value": "Thailand"
            },
            {
                "key": "TL",
                "value": "Timor-Leste"
            },
            {
                "key": "TK",
                "value": "Tokelau"
            },
            {
                "key": "TO",
                "value": "Tonga"
            },
            {
                "key": "TT",
                "value": "Trinidad And Tobago"
            },
            {
                "key": "TN",
                "value": "Tunisia"
            },
            {
                "key": "TR",
                "value": "Turkey"
            },
            {
                "key": "TM",
                "value": "Turkmenistan"
            },
            {
                "key": "TC",
                "value": "Turks And Caicos Islands"
            },
            {
                "key": "TV",
                "value": "Tuvalu"
            },
            {
                "key": "UG",
                "value": "Uganda"
            },
            {
                "key": "GB",
                "value": "UK"
            },
            {
                "key": "UA",
                "value": "Ukraine"
            },
            {
                "key": "AE",
                "value": "United Arab Emirates"
            },
            {
                "key": "UM",
                "value": "United States Minor Outlying Islands"
            },
            {
                "key": "UY",
                "value": "Uruguay"
            },
            {
                "key": "US",
                "value": "USA"
            },
            {
                "key": "UZ",
                "value": "Uzbekistan"
            },
            {
                "key": "VU",
                "value": "Vanuatu"
            },
            {
                "key": "VA",
                "value": "Vatican City Utate"
            },
            {
                "key": "VE",
                "value": "Venezuela"
            },
            {
                "key": "VN",
                "value": "Viet Nam"
            },
            {
                "key": "VG",
                "value": "Virgin Islands, British"
            },
            {
                "key": "VI",
                "value": "Virgin Islands, U.S."
            },
            {
                "key": "WF",
                "value": "Wallis And Futuna"
            },
            {
                "key": "EH",
                "value": "Western Sahara"
            },
            {
                "key": "YE",
                "value": "Yemen"
            },
            {
                "key": "ZM",
                "value": "Zambia"
            },
            {
                "key": "ZW",
                "value": "Zimbabwe"
            }
            ]
        },
        "Totals": 0,
        "Connected": 0,
        "ListIds": null,
        "ListValues": null
    },
    "KeyValueList": null,
    "ConectedToFields": [
    ""
    ]
},
         {
    "Custom_Values": {
        "Value": "",
        "Date_Time": null,
        "CustomAddress": null,
        "Totals": 0,
        "Connected": 0,
        "ListIds": null,
        "ListValues": null
    },
    "KeyValueList": null,
    "ConectedToFields": [
    ""
    ]
},
         {
    "Custom_Values": {
        "Value": "",
        "Date_Time": null,
        "CustomAddress": null,
        "Totals": 0,
        "Connected": 0,
        "ListIds": null,
        "ListValues": null
    },
    "KeyValueList": null,
    "ConectedToFields": [
    ""
    ]
},
         {
    "Custom_Values": {
        "Value": "",
        "Date_Time": null,
        "CustomAddress": null,
        "Totals": 0,
        "Connected": 0,
        "ListIds": null,
        "ListValues": null
    },
    "KeyValueList": null,
    "ConectedToFields": [
    ""
    ]
},
         {
    "Custom_Values": {
        "Value": null,
        "Date_Time": null,
        "CustomAddress": null,
        "Totals": 0,
        "Connected": 0,
        "ListIds": null,
        "ListValues": null
    },
    "KeyValueList": null,
    "ConectedToFields": [
    ""
    ]
},
         {
    "Custom_Values": {
        "Value": "",
        "Date_Time": null,
        "CustomAddress": null,
        "Totals": 0,
        "Connected": 0,
        "ListIds": null,
        "ListValues": null
    },
    "KeyValueList": null,
    "ConectedToFields": [
    ""
    ]
},
         {
    "Custom_Values": {
        "Value": "",
        "Date_Time": null,
        "CustomAddress": null,
        "Totals": 0,
        "Connected": 0,
        "ListIds": null,
        "ListValues": null
    },
    "KeyValueList": null,
    "ConectedToFields": [
    ""
    ]
},
         {
    "Custom_Values": {
        "Value": "0",
        "Date_Time": null,
        "CustomAddress": null,
        "Totals": 0,
        "Connected": 0,
        "ListIds": null,
        "ListValues": null
    },
    "KeyValueList": null,
    "ConectedToFields": [
    ""
    ]
},
         {
    "Custom_Values": {
        "Value": "0",
        "Date_Time": null,
        "CustomAddress": null,
        "Totals": 0,
        "Connected": 0,
        "ListIds": null,
        "ListValues": null
    },
    "KeyValueList": [],
    "ConectedToFields": [
    ""
    ]
},
         {
    "Custom_Values": {
        "Value": "",
        "Date_Time": null,
        "CustomAddress": null,
        "Totals": 0,
        "Connected": 0,
        "ListIds": null,
        "ListValues": null
    },
    "KeyValueList": null,
    "ConectedToFields": [
    ""
    ]
},
         {
    "Custom_Values": {
        "Value": null,
        "Date_Time": null,
        "CustomAddress": null,
        "Totals": 0,
        "Connected": 0,
        "ListIds": null,
        "ListValues": null
    },
    "KeyValueList": null,
    "ConectedToFields": [
    ""
    ]
},
         {
    "Custom_Values": {
        "Value": null,
        "Date_Time": null,
        "CustomAddress": null,
        "Totals": 0,
        "Connected": 4,
        "ListIds": null,
        "ListValues": null
    },
    "KeyValueList": null,
    "ConectedToFields": [
    ""
    ]
},
         {
    "Custom_Values": {
        "Value": "itay",
        "Date_Time": null,
        "CustomAddress": null,
        "Totals": 0,
        "Connected": 0,
        "ListIds": null,
        "ListValues": null
    },
    "KeyValueList": null,
    "ConectedToFields": [
    ""
    ]
},
         {
    "Custom_Values": {
        "Value": null,
        "Date_Time": null,
        "CustomAddress": null,
        "Totals": 8,
        "Connected": 3,
        "ListIds": [
        25956,
        159983,
        175399
        ],
        "ListValues": null
    },
    "KeyValueList": null,
    "ConectedToFields": [
    ""
    ]
},
         {
    "Custom_Values": {
        "Value": "False",
        "Date_Time": null,
        "CustomAddress": null,
        "Totals": 0,
        "Connected": 0,
        "ListIds": null,
        "ListValues": null
    },
    "KeyValueList": null,
    "ConectedToFields": [
    ""
    ]
},
         {
    "Custom_Values": {
        "Value": null,
        "Date_Time": null,
        "CustomAddress": null,
        "Totals": 0,
        "Connected": 0,
        "ListIds": null,
        "ListValues": []
    },
    "KeyValueList": null,
    "ConectedToFields": [
    ""
    ]
},
         {
    "Custom_Values": {
        "Value": null,
        "Date_Time": null,
        "CustomAddress": null,
        "Totals": 0,
        "Connected": 0,
        "ListIds": null,
        "ListValues": [
        "",
        "",
        ""
        ]
    },
    "KeyValueList": null,
    "ConectedToFields": [
    ""
    ]
},
         {
    "Custom_Values": {
        "Value": "",
        "Date_Time": null,
        "CustomAddress": null,
        "Totals": 0,
        "Connected": 0,
        "ListIds": null,
        "ListValues": null
    },
    "KeyValueList": null,
    "ConectedToFields": [
    ""
    ]
},
         {
    "Custom_Values": {
        "Value": "nir.t@pepperi.com",
        "Date_Time": null,
        "CustomAddress": null,
        "Totals": 0,
        "Connected": 0,
        "ListIds": null,
        "ListValues": null
    },
    "KeyValueList": null,
    "ConectedToFields": [
    ""
    ]
}
];