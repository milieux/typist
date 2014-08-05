define(['backbone'], function(Backbone){
    'use strict';

    return Backbone.Model.extend({
        defaults: {
            active: false,
            typed: false
        }
    });

});
