﻿define([
// Dojo
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/topic",
    "dojo/dom-geometry",
// Dijit
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
//Custom
    "epi/i18n!epi/cms/nls/powerslice.createdialog",
    "dojo/text!./templates/CreateContentInSlice.html"
], function (
// Dojo
    declare,
    lang,
    topic,
    domGeometry,
// Dijit
    _Widget,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
// Custom
    resources,
    template
) {
    return declare([_Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {
            templateString: template,
            epi: epi,
            resources: resources,
            
            onClose: function() {
                // event  
            },

            postCreate: function () {
                this.inherited(arguments);
                this.createButton.set('disabled', true);
                //TODO: Set focus on contentName
            },
            
            _nameChanged: function(value) {
                var nameValid = lang.trim(value).length > 0;
                this.createButton.set('disabled', !nameValid);
            },

            _createContent: function() {
                var settings = this.settings;
                topic.publish("/epi/shell/action/changeview", "powerslice/components/CreateSpecificContent", null, {
                    predefinedParentId: settings.parent,
                    predefinedContentTypeId: settings.contentTypeId,
                    predefinedContentName: lang.trim(this.contentName.get("value"))
                });
                this._close();
            },
            
            _cancel: function() {
                this._close();
            },
            
            _close: function () {
                this.onClose();
                this.destroy();
            }
        });
});