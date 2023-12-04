// В редукторе notificationReducer
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notification: null,
  };
  
  export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CREATE_NOTIFICATION':
        return {
          ...state,
          notification: action.payload.message,
        };
      default:
        return state;
    }
  };

  export default rootReducer
  




