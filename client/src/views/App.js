'use strict';

import React from 'react';
import classNames from 'classnames';

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
      <ListItem key={index} index={index} text={item.text} className={className} itemClickHandler={this.itemClickHandler.bind(this)}/>
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
    const target = this.state.items[index];
    const targetItem = Object.assign({}, target, {isOpen: !target.isOpen})
    const items = [...this.state.items.slice(0, index),
                   targetItem,
                   ...this.state.items.slice(index+1)
                  ];
    this.setState({items: items});
  }
  render () {
    return (
      <div>
        <SearchBox changeAllHandler={this.changeAllHandler}/>
        <ul id="listContainer">
          {this.state.items.map(this.renderItems.bind(this))}
        </ul>
        <div id="buttonContainer">
          <OpenAll changeAllHandler={this.changeAllHandler}/>
          <CloseAll changeAllHandler={this.changeAllHandler}/>
          <ToggleAll changeAllHandler={this.changeAllHandler}/>
          <AddItem addItemHandler={this.addItemHandler.bind(this)}/>
        </div>
      </div>
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
    this.props.addItemHandler(text);
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
    this.props.changeAllHandler(item => ({isOpen: true}));
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
    this.props.changeAllHandler(item => ({isOpen: false}));
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
    this.props.changeAllHandler(item => ({isOpen: !item.isOpen}));
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
    const searchRegex = new RegExp(event.target.value, 'i');
    this.props.changeAllHandler(item => ({isVisible: searchRegex.test(item.text)}));
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
