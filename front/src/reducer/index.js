import { combineReducers } from 'redux';

import user from './user';
import artists from './artists';
import acts from './acts';
import shows from './shows';
import citys from './citys';

const allReducer = combineReducers({
  user,
  artists,
  acts,
  shows,
  citys,
})

export default allReducer;