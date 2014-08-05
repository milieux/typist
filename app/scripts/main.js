(function(){

    'use strict';

    require.config({
        urlArgs: 'v=' + (new Date()).getTime(),
        paths: {
            jquery: 'vendor/jquery',
            backbone: 'vendor/backbone',
            underscore: 'vendor/lodash'
        }
    });

    require([
        'jquery',
        'app/wordCollection',
        'app/wordListView',
        'app/typistView'
    ], function ($, WordCollection, WordListView, TypistView) {

        var words = new WordCollection();

        var initApp = function(collection){
            new TypistView({ collection: collection });
            var wordList = new WordListView({ collection: collection });
            $('.box').append(wordList.render().el);
        };

        words.fetch({
            success: initApp
        });

    });

})();
