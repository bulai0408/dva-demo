import { delay } from 'dva/saga';
import { routerRedux } from 'dva/router';
import queryString from 'query-string';
import pathToRegexp from 'path-to-regexp';

export default {
  namespace: 'counter',
  state: {
    count: 1
  },
  subscriptions: {
    setup({ dispatch, history }) {
      window.onresize = () => {
        dispatch({ type: 'add' })
      }
    },
   
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        const match = pathToRegexp('/counter').exec(location.pathname);
        if (match) {
          dispatch({ type: 'add' })
        }
      })
    }
  },
  reducers: {
    add(state, action) {
      return {
        count: state.count + 1
      };
    },
  },
  effects: {
    * asyncAdd({ payload }, { call, put, select }) {
      const counter = yield select(state => state.counter);
      yield call(delay, 1000);
      yield put({ type: 'add' });
      yield put(routerRedux.push({
        pathname: '/',
        search: queryString.stringify({
          from: 'cyh'
        })
      }))
    }
  }
}
