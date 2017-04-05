define(['jquery', 'underscore', 'backbone', 'text!modules/list/listView.html'],
function ($, _, Backbone, listViewTemplate) {
    var listView = Backbone.View.extend({
        template: _.template(listViewTemplate),
        render: function () {
            $(this.el).append(this.template());
            return this;
        }
    });
    return listView;
});