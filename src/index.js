import MainView from './Main/MainView';
import Marionette from 'backbone.marionette';
import './style.scss';
import {getGlobalQuoteBySymbol} from "./StockQuote/StockQuoteService";
import {createFromGlobalQuote, StockQuoteCollection} from "./StockQuote/StockQuoteModel";
import {StockQuoteCollectionView} from "./StockQuote/StockQuoteCollectionView";

document.addEventListener('DOMContentLoaded', () => {

    // SETUP
    const StockWatcherApp = new Marionette.Application();
    StockWatcherApp.start();

    const mainView = new MainView()
    mainView.render();

    const stockQuoteCollection = new StockQuoteCollection()

    const globalQuotes = Promise.all(
        ['IBM', 'AAPL']
            .map(getGlobalQuoteBySymbol)
    )
        .then(globalQuotes => stockQuoteCollection.add(globalQuotes.map(createFromGlobalQuote)));

    new StockQuoteCollectionView({el: '#stock-quotes', collection: stockQuoteCollection}).render();

    // UPDATE
    const addNewQuoteToCollection = (globalQuote) => {
        stockQuoteCollection.add(createFromGlobalQuote(globalQuote));
    }

    mainView.on("stockSearch", function(e) {
        const searchSymbol = e.symbol;

        getGlobalQuoteBySymbol(searchSymbol)
            .then(quote => stockQuoteCollection.add(createFromGlobalQuote(quote)))
    })
})