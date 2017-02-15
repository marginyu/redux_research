import * as stores from './stores/index';
import * as actions from './actions/index';
import { createDispatcher } from 'redux';

//简化版本

const dispatcher = createDispatcher();

dispatcher.receive(stores, actions);

export default dispatcher;