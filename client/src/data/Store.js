'use strict';

import Actions from './../actions/Actions';

const itemsApp = (state = [], action = {}) => {
  
  switch (action.type) {
    case Actions.ADD_ITEM:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          isOpen: false,
          isVisible: true
        }
      ]
    case Actions.TOGGLE_ALL:
      return  state.map(item => Object.assign({}, item, {isOpen: !item.isOpen}));
    case Actions.OPEN_ALL:
      return  state.map(item => Object.assign({}, item, {isOpen: true}));
    case Actions.CLOSE_ALL:
      return  state.map(item => Object.assign({}, item, {isOpen: false}));
    case Actions.TOGGLE_ITEM:
      const target = state[action.id];
      const targetItem = Object.assign({}, target, {isOpen: !target.isOpen})
      return [ ...state.slice(0, action.id),
               targetItem,
               ...state.slice(action.id + 1)
             ];
    case Actions.ITEM_FILTER:
      const searchRegex = new RegExp(action.search, 'i');
      return  state.map(item => Object.assign({}, item, {isVisible: searchRegex.test(item.text)}));
    default:
      return state;
  }
}

import { createStore } from 'redux';
const store = createStore(itemsApp);

module.exports = store;
