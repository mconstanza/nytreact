import AppDispatcher from '../dispatcher/AppDispatcher';
import ArticleConstants from '../constants/ArticleConstants';
import ArticlesAPI from '../utils/ArticlesAPI';



export default {

  receiveArticles: () => {
    ArticlesAPI
      .getSavedArticles('http://localhost:3000/api/saved')
      .then(articles => {
        console.log("articles in dispatch: " + JSON.stringify(articles))
        AppDispatcher.dispatch({
          actionType: ArticleConstants.RECEIVE_ARTICLES,
          articles: articles
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: ArticleConstants.RECEIVE_ARTICLES_ERROR,
          message: message
        });
      });
  },

  saveArticle: (article) => {
    ArticlesAPI
    .saveArticle('http://localhost:3000/api/saved', article)
    .then(function(response) {
      console.log(response);
    })

  },

  getArticle: (id) => {
    ArticlesAPI
      .getArticle('http://localhost:3000/api/saved/' + id)
      .then(article => {
        AppDispatcher.dispatch({
          actionType: ArticleConstants.RECEIVE_ARTICLE,
          article: article
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: ArticleConstants.RECEIVE_ARTICLE_ERROR,
          message: message
        });
      });
  }

}
