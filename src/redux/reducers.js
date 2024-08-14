import {
  FETCH_COMPLAINTS_REQUEST,
  FETCH_COMPLAINTS_SUCCESS,
  FETCH_COMPLAINTS_FAILURE,
  DELETE_COMPLAINT_REQUEST,
  DELETE_COMPLAINT_SUCCESS,
  DELETE_COMPLAINT_FAILURE,
} from './actions';

const initialState = {
  complaints: [],
  loading: false,
  error: null
};

const complaintsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPLAINTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_COMPLAINTS_SUCCESS:
      return { ...state, complaints: action.payload, loading: false };
    case FETCH_COMPLAINTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_COMPLAINT_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_COMPLAINT_SUCCESS:
      return {
        ...state,
        complaints: state.complaints.filter(complaint => complaint.id !== action.payload),
        loading: false
      };
    case DELETE_COMPLAINT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default complaintsReducer;
