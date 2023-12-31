import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  counter
  // ... other reducers
});

export default rootReducer;
