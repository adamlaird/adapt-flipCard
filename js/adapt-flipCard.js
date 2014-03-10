/*
 * adapt-flipCard
 * License - http://github.com/adaptlearning/adapt_framework/LICENSE
 * Maintainers - Aniket Dharia <aniket.dharia@credipoint.com>
 */
define(function(require) {
    var ComponentView = require('coreViews/componentView');
	var Adapt = require('coreJS/adapt');

    var FlipCard = ComponentView.extend({
        events: {
			'click .flipCard-container .flipCard-card' : 'flipItem'
        },
        /* this is use to set ready status for current component on postRender */
        postRender: function() {
			this.setReadyStatus();
        },
        /* handler click event for flip item */
		flipItem: function (event) {
			event.preventDefault();

            var selectedElement = $(event.target), flipType = this.model.get("_flipType");
            var flipCardElement, flipCardElementId;
            if(flipType == "individualFlip") {
                if(selectedElement.hasClass('flipCard-card')) {
                    flipCardElement = selectedElement;
                    flipCardElement.toggleClass('flipCard-flipped');
                } else {
                    flipCardElement = selectedElement.closest('.flipCard-card');
                    flipCardElement.toggleClass("flipCard-flipped");
                }
                flipCardElementId = flipCardElement.attr('id');
                this.setVisited(flipCardElementId[flipCardElementId.lastIndexOf('-') + 1]);
            } else if(flipType == "singleFlip") {
                if(selectedElement.hasClass('flipCard-card')) {
                    flipCardElement = selectedElement;
                    if(flipCardElement.hasClass('flipCard-flipped')) {
                        flipCardElement.closest('.flipCard-container').find('.flipCard-card').removeClass('flipCard-flipped');
                    } else {
                        flipCardElement.closest('.flipCard-container').find('.flipCard-card').removeClass('flipCard-flipped');
                        flipCardElement.addClass('flipCard-flipped');
                    }
                } else {
                    flipCardElement = selectedElement.closest('.flipCard-card');
                    if(flipCardElement.hasClass('flipCard-flipped')) {
                        selectedElement.closest('.flipCard-container').find('.flipCard-card').removeClass('flipCard-flipped');
                    } else {
                        selectedElement.closest('.flipCard-container').find('.flipCard-card').removeClass('flipCard-flipped');
                        flipCardElement.addClass('flipCard-flipped');
                    }
                }
                flipCardElementId = flipCardElement.attr('id');
                this.setVisited(flipCardElementId[flipCardElementId.lastIndexOf('-') + 1]);
            }
		},
        setVisited: function(index) {
            var item = this.model.get('items')[index];
            item._isVisited = true;
            this.checkCompletionStatus();
        },
        getVisitedItems: function() {
            return _.filter(this.model.get('items'), function(item) {
                return item._isVisited;
            });
        },
        /* this function will check or set the completion status of current component. */
        checkCompletionStatus: function() {
            if (!this.model.get('_isComplete')) {
                if (this.getVisitedItems().length == this.model.get('items').length) {
                    this.setCompletionStatus();
                }
            }
        }
    });

    Adapt.register("flipCard", FlipCard);
    return FlipCard;
});