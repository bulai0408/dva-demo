import React from 'react';
import {connect} from 'dva';
import Counter from '../components/Counter';
import PropTypes from 'prop-types';

const CounterPage = ({counter, dispatch}) => {
  return (
    <div>
      <p>Counter</p>
      <Counter counter={counter} dispatch={dispatch}/>
    </div>
  )
};

Counter.propTypes = {
  counter: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    counter: state.counter
  }
};

export default connect(mapStateToProps)(CounterPage);
