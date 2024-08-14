import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import complaintsReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  complaintsReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
