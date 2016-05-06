'use strict';

import React from 'react';

export default class App extends React.Component {
  constructor () {
    super();
    this.state = {
      items: []
    };
  }
  renderItems (item, index) {
    const isOpen = item.isOpen ? 'open' : 'closed';
    const isVisible = item.isVisible ? '' : 'hidden';
    const klass = `${isOpen} ${isVisible}`;
    return (
      <ListItem key={index} index={index} text={item.text} klass={klass} itemClickHandler={this.itemClickHandler.bind(this)}/>
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
  openAllHandler () {
    const items = this.state.items.map((item) => Object.assign({}, item, {isOpen: true}));
    this.setState({items: items});
  }
  closeAllHandler () {
    const items = this.state.items.map((item) => Object.assign({}, item, {isOpen: false}));
    this.setState({items: items});
  }
  toggleAllHandler () {
    const items = this.state.items.map((item) => Object.assign({}, item, {isOpen: !item.isOpen}));
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
  searchHandler (searchText) {
    const searchRegex = new RegExp(searchText, 'i');
    const items = this.state.items.map((item) => {
      return Object.assign({}, item, {isVisible: searchRegex.test(item.text)});
    });
    this.setState({items: items});
  }
  render () {
    return (
      <div>
        <SearchBox searchHandler={this.searchHandler.bind(this)}/>
        <ul id="listContainer">
          {this.state.items.map(this.renderItems.bind(this))}
        </ul>
        <div id="buttonContainer">
          <OpenAll openAllHandler={this.openAllHandler.bind(this)}/>
          <CloseAll closeAllHandler={this.closeAllHandler.bind(this)}/>
          <ToggleAll toggleAllHandler={this.toggleAllHandler.bind(this)}/>
          <AddItem addItemHandler={this.addItemHandler.bind(this)}/>
        </div>
      </div>
    );
  }
}

class ListItem extends React.Component {
  onItemClick () {
    var index = this.props.index;
    this.props.itemClickHandler(index);
  }
  render () {
    const klass = `list-item ${this.props.klass}`;
    return (
      <li className={klass} onClick={this.onItemClick.bind(this)}>{this.props.text}</li>
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
      <input type="button" name="addItem" value="Add" onClick={this.onButtonClick.bind(this)}/>
    );
  }
}
AddItem.propTypes = {
  addItemHandler: React.PropTypes.func.isRequired
}

class OpenAll extends React.Component {
  onButtonClick () {
    this.props.openAllHandler();
  }
  render () {
    return (
      <input type="button" name="openAll" value="Open All" onClick={this.onButtonClick.bind(this)}/>
    );
  }
}
OpenAll.propTypes = {
  openAllHandler: React.PropTypes.func.isRequired
}

class CloseAll extends React.Component {
  onButtonClick () {
    this.props.closeAllHandler();
  }
  render () {
    return (
      <input type="button" name="closeAll" value="Close All" onClick={this.onButtonClick.bind(this)}/>
    );
  }
}
CloseAll.propTypes = {
  closeAllHandler: React.PropTypes.func.isRequired
}

class ToggleAll extends React.Component {
  onButtonClick () {
    this.props.toggleAllHandler();
  }
  render () {
    return (
      <input type="button" name="toggleAll" value="ToggleAll" onClick={this.onButtonClick.bind(this)}/>
    );
  }
}
ToggleAll.propTypes = {
  toggleAllHandler: React.PropTypes.func.isRequired
}

class SearchBox extends React.Component {
  keyUpHandler (event) {
    this.props.searchHandler(event.target.value);
  }
  render () {
    return (
      <input type="text" id="search" onKeyUp={this.keyUpHandler.bind(this)} placeholder="Search"/>
    );
  }
}
SearchBox.propTypes = {
  searchHandler: React.PropTypes.func.isRequired
}
