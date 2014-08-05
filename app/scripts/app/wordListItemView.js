define(['backbone'], function(Backbone){
    'use strict';

    return Backbone.View.extend({
        tagName: 'li',

        initialize: function(){
            this.listenTo(this.model, 'change:active', this.setActive);
            this.listenTo(this.model, 'change:correct', this.setCorrect);
            this.listenTo(this.model, 'reset', this.remove);
        },

        render: function(){
            $(this.el).html(this.model.toJSON().text);
            return this;
        },

        setActive: function(){
            if (this.model.get('active')) {
                $(this.el).addClass('active');
                this.scroll();
            } else {
                $(this.el).removeClass('active');
            }
        },

        setCorrect: function(){
            if (this.model.get('correct')) {
                $(this.el).addClass('correct').removeClass('incorrect');
            } else {
                $(this.el).addClass('incorrect').removeClass('correct');
            }
        },

        scroll: function(){
            if (!$(this.el).prev().length) {
                return;
            }

            var currentWordPos = $(this.el).offset();
            var prevWord = $(this.el).prev().offset();
            var currentPos = parseInt($(this.el).parent().css('top'), 10) || 0;

            if (currentWordPos.top > prevWord.top){
                $(this.el).parent().css('top', currentPos-36);
            }

        }
    });

});
