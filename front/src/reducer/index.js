import { combineReducers } from 'redux';

import user from './user'
import artists from './artists'

const allReducer = combineReducers({
  user,
  artists,
})

export default allReducer;