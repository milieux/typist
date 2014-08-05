define(['backbone'], function(Backbone){
    'use strict';

    return Backbone.View.extend({
        el: '#typist',
        events: {
            'keyup .entry': 'onKeypress',
            'click .reload': 'resetWords'
        },

        initialize: function(){
            this.$input = this.$('input');
            this.$reload = this.$('.reload');
            this.$timer = this.$('.timer');
            this.statsTemplate = _.template($('#stats').html());

            this.resetUI();
        },

        render: function(){
            var self = this;

            var typedWords = self.collection.typed().length;
            var correctWords = self.collection.correct().length;
            var incorrectWords = typedWords - correctWords;

            $(this.el).append(this.statsTemplate({
                typed: typedWords,
                correct: correctWords,
                incorrect: incorrectWords,
                keystrokes: self.keystrokes
            }));

            this.$stats = this.$('.stats');

            return this;
        },

        isModelActive: function(){
            this.activeModel = this.collection.active();

            if (!this.activeModel) {
                return false;
            }

            return true;
        },

        onKeypress: function(evt){
            var self = this;

            if (!this.timeIsRunning) {
                this.timeIsRunning = true;
                this.initTimer();
            }

            if (!this.isModelActive()) {
                this.complete();
                return;
            }

            this.keystrokes++;

            var activeText = self.activeModel.get('text');
            var inputText = this.$input.val();
            var trimmedText = $.trim(inputText);
            var key = evt.which;

            if (!trimmedText.length) {
                this.$input.val('');
                return;
            }

            if (self.activeModel.get('typed') === false) {
                self.activeModel.set({ typed: true });
            }

            if (key === 32){
                if (trimmedText === activeText){
                    self.activeModel.set({ correct: true });
                } else {
                    self.activeModel.set({ correct: false });
                }

                this.clearWord();

                if (!this.isModelActive()) {
                    this.complete();
                }

                return;
            }

            inputText.split('').forEach(function(letter, idx){
                if (letter !== activeText.charAt(idx)){
                    self.activeModel.set({ correct: false });
                    return;
                }
            });
        },

        clearWord: function(){
            this.$input.val('');
            this.activeModel.set({ active:false });
            this.collection.setNextActive(this.activeModel);
        },

        initTimer: function(){
            var self = this;
            var countDownTimer = 59;

            function countdown(){
                var second = countDownTimer--;
                var display = (second > 9 ? second : '0' + second).toString();

                self.$timer.text('0:' + display);

                if (second === 0){
                    self.complete();
                    return;
                }

                self.timeout = setTimeout(countdown, 1000);
            }

            this.timeout = setTimeout(countdown, 1000);
        },

        complete: function(){
            this.$input.prop('disabled', true);
            this.render();

            window.clearTimeout(this.timeout);
        },

        resetUI: function() {
            this.keystrokes = 0;
            this.timeIsRunning = false;
            this.$timer.text('1:00');
            this.$reload.prop('disabled', false);
            this.$input.prop('disabled', false).val('').focus();
        },

        resetWords: function() {
            window.clearTimeout(this.timeout);
            this.collection.trigger('refresh');
            this.resetUI();
            if (this.$stats) {
                this.$stats.remove();
            }
        }
    });

});
