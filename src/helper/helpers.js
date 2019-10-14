const empty = '\u00A0';

function createElement(tag, props, ...children) {
  const element = document.createElement(tag);

  Object.keys(props).forEach(key => {
    if (key.startsWith('data-')) {
      element.setAttribute(key, props[key]);
    } else {
      element[key] = props[key];
    }
  });

  children.forEach(child => {
    let newChild = child;
    if (typeof child === 'string') {
      newChild = document.createTextNode(child);
    }

    element.appendChild(newChild);
  });

  return element;
}

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(type, listener) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
  }

  emit(type, arg) {
    if (this.events[type]) {
      this.events[type].forEach(listener => listener(arg));
    }
  }
}

function save(data) {
  const string = JSON.stringify(data);

  localStorage.setItem('todos', string);
}

function load() {
  const string = localStorage.getItem('todos');
  const data = JSON.parse(string);

  return data;
}

export { createElement, EventEmitter, save, load, empty };
