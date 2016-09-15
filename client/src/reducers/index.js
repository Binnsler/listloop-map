import {combineReducers} from 'redux';
import formReducer from './form_reducer';
import restaurantReducer from './restaurant_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  restaurants: restaurantReducer
});

export default rootReducer;
