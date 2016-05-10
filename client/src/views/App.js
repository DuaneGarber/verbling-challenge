'use strict';

import React from 'react';
import classNames from 'classnames';
import Store from './../data/Store';
import Actions from './../actions/Actions';

// Used to maintain unique IDs for items
let itemId = 0;

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }
  // Render all the the List items
  renderItems (item, index) {
    const isOpen = item.isOpen ? 'open' : 'closed';
    const isVisible = item.isVisible ? '' : 'hidden';
    const className = classNames('list-item', {'open' : item.isOpen, 'hidden': !item.isVisible});
    return (
      <ListItem key={index} index={index} text={item.text} className={className}/>
    );
  }
  render () {
    return (
      <section>
        <div id="itemContainer">
          <SearchBox />
          <ul id="listContainer">
            {this.props.items.map(this.renderItems.bind(this))}
          </ul>
        </div>
        <div id="buttonContainer">
          <OpenAll />
          <CloseAll />
          <ToggleAll />
          <AddItem />
        </div>
      </section>
    );
  }
}

/**
 * Simple List Item display
 */
class ListItem extends React.Component {
  onItemClick (index) {
    Store.dispatch({
      type: Actions.TOGGLE_ITEM,
      id: index
    });
  }
  render () {
    return (
      <li className={this.props.className} onClick={() => this.onItemClick(this.props.index)}>{this.props.text}</li>
    );
  }
}
ListItem.propTypes = {
  text: React.PropTypes.string.isRequired
}

/**
 * Add Item Button
 */
class AddItem extends React.Component {
  onButtonClick () {
    const text = window.prompt("Please enter the new list item");
    Store.dispatch({
      type: Actions.ADD_ITEM,
      id: itemId++,
      text: text
    });
  }
  render () {
    return (
      <input type="button" name="addItem" value="Add" onClick={() => this.onButtonClick()}/>
    );
  }
}

/**
 * Open All Button
 */
class OpenAll extends React.Component {
  onButtonClick () {
    Store.dispatch({
      type: Actions.OPEN_ALL
    });
  }
  render () {
    return (
      <input type="button" name="openAll" value="Open All" onClick={() => this.onButtonClick()}/>
    );
  }
}

/**
 * Close All Button
 */
class CloseAll extends React.Component {
  onButtonClick () {
    Store.dispatch({
      type: Actions.CLOSE_ALL
    });
  }
  render () {
    return (
      <input type="button" name="closeAll" value="Close All" onClick={() => this.onButtonClick()}/>
    );
  }
}

/**
 * Toggle All Button
 */
class ToggleAll extends React.Component {
  onButtonClick () {
    Store.dispatch({
      type: Actions.TOGGLE_ALL
    });
  }
  render () {
    return (
      <input type="button" name="toggleAll" value="ToggleAll" onClick={() => this.onButtonClick()}/>
    );
  }
}

/**
 * Search Box controls
 */
class SearchBox extends React.Component {
  keyUpHandler (event) {
    Store.dispatch({
      type: Actions.ITEM_FILTER,
      search: event.target.value
    });
  }
  render () {
    return (
      <input type="text" id="search" onKeyUp={event => this.keyUpHandler(event)} placeholder="Search"/>
    );
  }
}