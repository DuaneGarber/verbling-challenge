'use strict';

import React from 'react';
import classNames from 'classnames';
import Store from './../data/Store';
import Actions from './../actions/Actions';

let itemId = 0;

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      items: []
    };

    this.changeAllHandler = this.changeAllHandler.bind(this);
  }
  renderItems (item, index) {
    const isOpen = item.isOpen ? 'open' : 'closed';
    const isVisible = item.isVisible ? '' : 'hidden';
    const className = classNames('list-item', {'open' : item.isOpen, 'hidden': !item.isVisible});
    return (
      <ListItem key={index} index={index} text={item.text} className={className} itemClickHandler={this.itemClickHandler.bind(this, index)}/>
    );
  }
  addItemHandler (text) {
    const item = {
      text: text,
      isOpen: false,
      isVisible: true
    }
    const items = [...this.state.items, item];
    this.setState({items: items});
  }
  changeAllHandler (callback) {
    const items = this.state.items.map((item) => Object.assign({}, item, callback(item)));
    this.setState({items: items});
  }
  itemClickHandler (index) {
    Store.dispatch({
      type: Actions.TOGGLE_ITEM,
      id: index
    });
  }
  render () {
    return (
      <section>
        <div id="itemContainer">
          <SearchBox changeAllHandler={this.changeAllHandler}/>
          <ul id="listContainer">
            {Store.getState().map(this.renderItems.bind(this))}
          </ul>
        </div>
        <div id="buttonContainer">
          <OpenAll changeAllHandler={this.changeAllHandler}/>
          <CloseAll changeAllHandler={this.changeAllHandler}/>
          <ToggleAll changeAllHandler={this.changeAllHandler}/>
          <AddItem addItemHandler={this.addItemHandler.bind(this)}/>
        </div>
      </section>
    );
  }
}

class ListItem extends React.Component {
  onItemClick (index) {
    this.props.itemClickHandler(index);
  }
  render () {
    return (
      <li className={this.props.className} onClick={this.onItemClick.bind(this, this.props.index)}>{this.props.text}</li>
    );
  }
}
ListItem.propTypes = {
  text: React.PropTypes.string.isRequired,
  itemClickHandler: React.PropTypes.func.isRequired
}

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
AddItem.propTypes = {
  addItemHandler: React.PropTypes.func.isRequired
}

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
OpenAll.propTypes = {
  changeAllHandler: React.PropTypes.func.isRequired
}

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
CloseAll.propTypes = {
  changeAllHandler: React.PropTypes.func.isRequired
}

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
ToggleAll.propTypes = {
  changeAllHandler: React.PropTypes.func.isRequired
}

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
SearchBox.propTypes = {
  changeAllHandler: React.PropTypes.func.isRequired
}
