import { call, put, takeEvery, all } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_COMPLAINTS_REQUEST,
  DELETE_COMPLAINT_REQUEST,
  deleteComplaintSuccess,
  deleteComplaintFailure,
  fetchComplaintsRequest,
  fetchComplaintsSuccess,
  fetchComplaintsFailure,
} from './actions';

// Fetch complaints saga
function* fetchComplaints() {
  try {
    const response = yield call(axios.get, 'http://localhost:9000/complaints');
    yield put(fetchComplaintsSuccess(response.data));
  } catch (error) {
    yield put(fetchComplaintsFailure(error.message));
  }
}

// Delete complaint saga
function* deleteComplaint(action) {
  try {
    yield call(axios.delete, `http://localhost:9000/complaints/${action.payload}`);
    yield put(deleteComplaintSuccess(action.payload));
    // Fetch complaints again to update the list after deletion
    yield put(fetchComplaintsRequest());
  } catch (error) {
    yield put(deleteComplaintFailure(error.message));
  }
}

// Watcher sagas
function* watchFetchComplaints() {
  yield takeEvery(FETCH_COMPLAINTS_REQUEST, fetchComplaints);
}

function* watchDeleteComplaint() {
  yield takeEvery(DELETE_COMPLAINT_REQUEST, deleteComplaint);
}

export default function* rootSaga() {
  yield all([
    watchFetchComplaints(),
    watchDeleteComplaint(),
  ]);
}
