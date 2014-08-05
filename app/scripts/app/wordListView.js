define(['backbone', 'app/wordListItemView'], function(Backbone, WordListItemView){
    'use strict';

    return Backbone.View.extend({
        tagName: 'ul',
        className: 'list-of-words',

        initialize: function(){
            this.listenTo(this.collection, 'reset', this.render);
        },

        render: function(){
            var container = document.createDocumentFragment();

            _.each(this.collection.models, function(word, index){
                container.appendChild(new WordListItemView({ model: word }).render().el);
                if (index === 0) {
                    word.set({ active: true });
                }
            }, this);

            $(this.el).css('top', 0).html('').append(container);

            return this;
        }
    });

});
