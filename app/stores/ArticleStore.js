import AppDispatcher from '../dispatcher/AppDispatcher';
import ArticleConstants from '../constants/ArticleConstants';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let _articles = [];
let _article = {};

function setArticles(articles) {
    _articles = articles;
}

class ArticleStoreClass extends EventEmitter {

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback)
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    }

    getSavedArticles() {
        return _articles;
    }
}

const ArticleStore = new ArticleStoreClass();

// Here we register a callback for the dispatcher
// and look for our various action types so we can
// respond appropriately
ArticleStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {
    case ArticleConstants.RECEIVE_ARTICLES:
      setArticles(action.articles);
      // We need to call emitChange so the event listener
      // knows that a change has been made
      ArticleStore.emitChange();
      break

    case ArticleConstants.RECEIVE_ARTICLE:
      setArticle(action.article);
      ArticleStore.emitChange();
      break

    case ArticleConstants.RECEIVE_ARTICLE_ERROR:
      alert(action.message);
      ArticleStore.emitChange();
      break

    case ArticleConstants.RECEIVE_ARTICLES_ERROR:
      alert(action.message);
      ArticleStore.emitChange();
      break

    default:
  }

});

export default ArticleStore;
