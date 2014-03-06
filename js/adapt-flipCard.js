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
            if(flipType == "individualFlip") {
                if(selectedElement.hasClass('flipCard-card')) {
                    selectedElement.toggleClass('flipCard-flipped');
                } else {
                    selectedElement.closest('.flipCard-card').toggleClass("flipCard-flipped")
                }
            } else if(flipType == "singleFlip") {
                if(selectedElement.hasClass('flipCard-card')) {
                    if(selectedElement.hasClass('flipCard-flipped')) {
                        selectedElement.closest('.flipCard-container').find('.flipCard-card').removeClass('flipCard-flipped');
                    } else {
                        selectedElement.closest('.flipCard-container').find('.flipCard-card').removeClass('flipCard-flipped');
                        selectedElement.addClass('flipCard-flipped');
                    }
                } else {
                    var containerCard = selectedElement.closest('.flipCard-card');
                    if(containerCard.hasClass('flipCard-flipped')) {
                        selectedElement.closest('.flipCard-container').find('.flipCard-card').removeClass('flipCard-flipped');
                    } else {
                        selectedElement.closest('.flipCard-container').find('.flipCard-card').removeClass('flipCard-flipped');
                        containerCard.addClass('flipCard-flipped');
                    }
                }
            }
		}
    });

    Adapt.register("flipCard", FlipCard);
    return FlipCard;
});