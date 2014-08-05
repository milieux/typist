define(['backbone', 'app/wordModel'], function(Backbone, Word){
    'use strict';

    return Backbone.Collection.extend({
        model: Word,
        url: '/data/words.json',

        initialize: function(){
            this.on('refresh', this.refreshModels, this);
        },

        active: function(){
            return this.findWhere({ active:true });
        },

        typed: function(){
            return this.where({ typed:true });
        },

        correct: function(){
            return this.where({ correct:true });
        },

        setNextActive: function(currentActiveModel){
            var nextActiveIndex = this.indexOf(currentActiveModel) + 1;
            if (nextActiveIndex !== this.length) {
                this.at(nextActiveIndex).set({ active:true });
            }
        },

        refreshModels: function(){
            var prevModels = this.clone().models;

            prevModels.forEach(function(model){
                model.set({ typed:false }, { silent: true });
                model.set({ active:false }, { silent: true });
                model.unset('correct', { silent: true });
            });

            var newModels = this.randomizeArray(prevModels);

            this.reset(newModels);
        },

        randomizeArray: function(arr){
            var i = arr.length - 1;

            for (; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }

            return arr;
        }
    });

});
