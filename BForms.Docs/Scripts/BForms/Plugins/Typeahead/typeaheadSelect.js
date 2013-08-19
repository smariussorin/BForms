﻿(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(['jquery', 'typeahead'], function ($) {
            factory($, window.jQuery.fn.typeahead);
        });
    } else {
        factory(window.jQuery, window.jQuery.fn.typeahead);
    }
})(function ($, typeahead) {

    var typeaheadSelect = function ($elem, opts) {
        this.$elem = $elem;
        this.options = opts;
        this.init();
    };

    typeaheadSelect.prototype.init = function () {
        this._settings = this._getSettings();
        this._initElement();
        this._applyTypeahead();
    };

    typeaheadSelect.prototype._getSettings = function () {
        var settings = {
            value: ''
        };

        if (this.options.ajaxQuery === false) {
            settings.local = [];

            if (this.$elem.is('select')) {

                this.$elem.find('option').each($.proxy(function (idx, opt) {
                    var $opt = $(opt),
                        val = $opt.val();

                    if (typeof val !== "undefined" && val !== '') {

                        var tagText = this.options.textTag === true ? $opt.text() : val;
                        settings.local.push(tagText);

                        if ($opt.prop('selected') == true) {
                            settings.value = tagText;
                        }

                    } else {
                        settings.placeholder = $opt.text();
                    }

                }, this));
            }
        }

        return settings;

    };

    typeaheadSelect.prototype._initElement = function () {
        var $input = $('<input></input>');

        $input.prop('type', 'text');

        $input.prop('id', this.$elem.prop('id'));
        $input.prop('name', this.$elem.prop('name'));
        $input.prop('class', this.$elem.prop('class'));

        this._settings.name = this.$elem.prop('name');

        $input.data(this.$elem.data());

        this.$elem.prop('id', 'autocomplete_' + $input.prop('id'));
        this.$elem.prop('name', 'autocomplete_' + $input.prop('name'));

        this.$input = $input;

        this.$elem.hide()
                  .before(this.$input);
    };

    typeaheadSelect.prototype._applyTypeahead = function () {
        this.$input.typeahead(this._settings);
        
        if(typeof this._settings.placeholder !== "undefined") {
            this.$input.prop('placeholder', this._settings.placeholder);
        }
        
        if (typeof this._settings.value !== "undefined") {
            this.$input.val(this._settings.value);
        }
    };

    jQuery.fn.typeaheadSelectDefaults = {
        ajaxQuery: false,
        textTag: true
    };

    $.fn.typeaheadSelect = function (opts) {
        return new typeaheadSelect($(this), $.extend(true, {}, $.fn.typeaheadSelectDefaults, opts));
    };

});