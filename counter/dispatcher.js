import * as stores from './stores/index';
import * as actions from './actions/index';
import { createDispatcher } from 'redux';

console.log("module",module);

// const dispatcher =
//   module.hot && module.hot.data && module.hot.data.dispatcher ||
//   createDispatcher();
//
// console.log("dispatcher",dispatcher);
//
// dispatcher.receive(stores, actions);
//
// module.hot.dispose(data => {
//   data.dispatcher = dispatcher;
// });

//简化版本

const dispatcher = createDispatcher();

dispatcher.receive(stores, actions);

export default dispatcher;
