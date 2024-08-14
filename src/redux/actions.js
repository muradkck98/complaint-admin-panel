export const FETCH_COMPLAINTS_REQUEST = 'FETCH_COMPLAINTS_REQUEST';
export const FETCH_COMPLAINTS_SUCCESS = 'FETCH_COMPLAINTS_SUCCESS';
export const FETCH_COMPLAINTS_FAILURE = 'FETCH_COMPLAINTS_FAILURE';

export const DELETE_COMPLAINT_REQUEST = 'DELETE_COMPLAINT_REQUEST';
export const DELETE_COMPLAINT_SUCCESS = 'DELETE_COMPLAINT_SUCCESS';
export const DELETE_COMPLAINT_FAILURE = 'DELETE_COMPLAINT_FAILURE';

export const fetchComplaintsRequest = () => ({ type: FETCH_COMPLAINTS_REQUEST });
export const fetchComplaintsSuccess = (data) => ({ type: FETCH_COMPLAINTS_SUCCESS, payload: data });
export const fetchComplaintsFailure = (error) => ({ type: FETCH_COMPLAINTS_FAILURE, payload: error });

export const deleteComplaintRequest = (id) => ({ type: DELETE_COMPLAINT_REQUEST, payload: id });
export const deleteComplaintSuccess = (id) => ({ type: DELETE_COMPLAINT_SUCCESS, payload: id });
export const deleteComplaintFailure = (error) => ({ type: DELETE_COMPLAINT_FAILURE, payload: error });
