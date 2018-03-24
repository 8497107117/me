import { fromJS, List } from 'immutable';
import { RECEIVE_CATEGORIES, RECEIVE_ARTICLES_IN_CATEGORY } from '../actions/categoriesActions';

const initialState = fromJS({
  categories: [],
  articles: {}
});

const Categories = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return state.set('categories', List(action.categories));
    case RECEIVE_ARTICLES_IN_CATEGORY:
      return state.setIn(['articles', action.categoryName], List(action.articles));
    default:
      return state;
  }
};

export default Categories;
