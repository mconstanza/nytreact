import AppDispatcher from '../dispatcher/AppDispatcher';
import ArticleConstants from '../constants/ArticleConstants';
import ArticlesAPI from '../utils/ArticlesAPI';

import AuthStore from '../stores/AuthStore';



export default {

  receiveArticles: () => {
    var user = JSON.parse(AuthStore.getUser());

    ArticlesAPI
      // .getSavedArticles('http://localhost:3000/api/users/' + user.user_id +'/saved')
      .getSavedArticles('https://nyt-reaction.herokuapp.com/api/users/' + user.user_id +'/saved')
      .then(articles => {
        // console.log("articles in dispatch: " + JSON.stringify(articles))
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

  saveArticle: (articleId) => {
    var user = JSON.parse(AuthStore.getUser());
    ArticlesAPI
    // .saveArticle('http://localhost:3000/api/users/' + user.user_id + '/saved', articleId)
    .saveArticle('https://nyt-reaction.herokuapp.com/api/users/' + user.user_id + '/saved', articleId)
    .then(function(response) {
      console.log(response);
    })

  },

  deleteArticle: (articleId) => {
    var user = JSON.parse(AuthStore.getUser());
    ArticlesAPI
    // .deleteArticle('http://localhost:3000/api/users/' + user.user_id + '/saved/' + articleId)
    .deleteArticle('https://nyt-reaction.herokuapp.com/api/users/' + user.user_id + '/saved/' + articleId)
    .then(function(response) {
      console.log(response);
    })
  }
}
