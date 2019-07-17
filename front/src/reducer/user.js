const initialState = {
  token : '',
};

const user = (state = initialState, action) => {
  switch(action.type) {
    case 'USER_REGISTER' : {
      return {...action.user};
    }
    case 'USER_DISCONNECT' : {
      return { token : ''}
    }
    default :
    return state;
  }
};

export default user;