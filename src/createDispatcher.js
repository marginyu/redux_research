import mapValues from 'lodash/object/mapValues';

// An action dispatched to init store state
const BOOTSTRAP_STORE = {
  type: 'BOOTSTRAP_STORE'
};

export default function createDispatcher() {
  
  let observers = {};//观察者
  let stores = {};
  let actionCreators = {};
  let currentState = {};
  let currentTransaction = null;
  let committedState = {};

  // To compute the next state, combine the next states of every store
  // 计算出新的state
  function computeNextState(state, action) {

    console.log("computeNextState",state,action);

    console.log("oldStores",stores);

    let newStores =  mapValues(stores,
      (store, key) => {console.log("key",key);return store(state[key], action);}
    );

    console.log("newStores",newStores);

    return newStores;
  }

  // Notify observers about the changed stores
  // 将变化告诉观察者们
  function emitChange(changedKeys) {
    
    console.debug("变变变changedKeys",changedKeys);
    
    if (!changedKeys.length) {
      return;
    }

    // Gather the affected observers 观察者
    const notifyObservers = [];
    changedKeys.forEach(key => {
      observers[key].forEach(o => {
        if (notifyObservers.indexOf(o) === -1) {
          notifyObservers.push(o);
        }
      });
    });

    // Emit change
    notifyObservers.forEach(o => o());
  }

  // Update state and emit change if needed
  // 更新state,触发变化
  function updateState(nextState) {

    console.log("updateState",nextState);

    // Swap the state
    const previousState = currentState;
    currentState = nextState;

    // Notify the observers
    const changedKeys = Object.keys(currentState).filter(key =>
      currentState[key] !== previousState[key]
    );
    emitChange(changedKeys);
  }

  // Reassign the current state on each dispatch
  // 重新分配在各个dispatch的当前state
  function dispatch(action) {
    console.log("dispatch",action);

    if (typeof action.type !== 'string') {
      throw new Error('Action type must be a string.');
    }

    const nextState = computeNextState(currentState, action);
    updateState(nextState);
  }

  // Provide subscription and unsubscription  订阅和退订
  function observeStores(observedKeys, onChange) {
    
    console.log("提供订阅和退订",observedKeys,onChange);
    
    // Emit the state update
    function handleChange() {
      onChange(currentState);
    }

    // Synchronously emit the initial value
    handleChange();

    // Register the observer for each relevant key
    observedKeys.forEach(key =>
      observers[key].push(handleChange)
    );

    // Let it unregister when the time comes
    // 返回退订函数
    return () => {
      observedKeys.forEach(key => {
        const index = observers[key].indexOf(handleChange);
        observers[key].splice(index, 1);
      });
    };
  }

  // Dispatch in the context of current transaction
  function dispatchInTransaction(action) {
    console.log("dispatchInTransaction",action);

    if (currentTransaction) {
      currentTransaction.push(action);
    }
    dispatch(action);
  }

  // Bind action creator to the dispatcher
  // 将 action创建者绑定到dispatcher上
  function wrapActionCreator(actionCreator) {
    console.log("wrapActionCreator",actionCreator);
    return function dispatchAction(...args) {
      const action = actionCreator(...args);
      if (typeof action === 'function') {
        // Async action creator
        action(dispatchInTransaction);
      } else {
        // Sync action creator
        dispatchInTransaction(action);
      }
    };
  }

  // Provide dispatching
  //提供dispatching
  function getActions() {
    return actionCreators;
  }

  // Provide a way to receive new stores and actions
  //提供一种接收新store和action的方法
  function receive(nextStores, nextActionCreators) {

    console.log("receive",nextStores,nextActionCreators);

    stores = nextStores;
    actionCreators = mapValues(nextActionCreators, wrapActionCreator);

    // Merge the observers
    observers = mapValues(stores,
      (store, key) => observers[key] || []
    );

    // Dispatch to initialize stores
    if (currentTransaction) {
      updateState(committedState);
      currentTransaction.forEach(dispatch);
    } else {
      dispatch(BOOTSTRAP_STORE);
    }
  }

  return {
    getActions,
    observeStores,
    receive
  };
}