import { combineReducers } from 'redux';

import user from './user'

const allReducer = combineReducers({
  user,
})

export default allReducer;