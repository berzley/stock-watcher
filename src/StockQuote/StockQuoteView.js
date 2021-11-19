import Marionette from 'backbone.marionette';
import template from './StockQuoteCard.html';
import _ from 'underscore';
import './stock-quote-card.scss'

export const StockQuoteView = Marionette.View.extend({
    className: "stock-card",
    template: _.template(template),

    initialize: function() {
        _.bindAll(this, 'template');
    },

    /**
     *
     * @param {String} value
     * @returns {*}
     */
    formatMoney: function(value) {
        return Math.round(parseFloat(value)*100)/100
    },

    /**
     * Indicate if the value has increased or decreased
     * @param  {Number} value 
     * @return {String}
     */
    increaseDecrease: function(value) {
        if(value == 0) {
            return ''
        }

        return value > 0 ? 'increase' : 'decrease'
    },

    /**
     * Percentage range the value falls in a given range
     * @param  {Number} value
     * @param  {Number} low  
     * @param  {Number} high 
     * @return {Number}      
     */
    currentValuePercent: function(value, low, high) {
        if(low == high) { return 0; }

        return Math.floor(100 * ( (parseFloat(value)-parseFloat(high)) / (parseFloat(low)-parseFloat(high)) ))
    }
})