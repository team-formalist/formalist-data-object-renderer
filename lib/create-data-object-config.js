'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.objectReducer = objectReducer;
exports.default = createDataObjectConfig;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Merge objects together
 * @param  {Object} a
 * @param  {Object} b
 * @return {Object} Merged combination of `a` and `b`
 */
function objectReducer(a, b) {
  return Object.assign(a, b);
}

/**
 * Pass through, i.e., render the children of this component type
 * @param  {Mixed} options.children Children to render
 * @return {Object}
 */
function passThrough(_ref) {
  var children = _ref.children;

  return children.reduce(objectReducer, {});
}

/**
 * Render a single value
 * @param  {String} options.name Component name
 * @param  {Mixed} options.value Component value
 * @return {Object} Object defined with a name/value key pair
 */
function value(_ref2) {
  var name = _ref2.name;
  var value = _ref2.value;

  return _defineProperty({}, '' + name, value);
}

/**
 * Render a single value and cast it to a string
 * @param  {String} options.name Component name
 * @param  {Mixed} options.value Component value
 * @return {Object} Object defined with a name/value key pair
 */
function valueStringify(_ref4) {
  var name = _ref4.name;
  var value = _ref4.value;

  console.log('valueStringify', value);
  value = value && value.toJS ? value.toJS() : value;
  return _defineProperty({}, '' + name, JSON.stringify(value));
}

/**
 * Render an attr block
 * @param  {String} options.name Block name
 * @param  {Object} options.children Children of the block
 * @return {Object} Object defined with a name/value key pair
 */
function attr(_ref6) {
  var name = _ref6.name;
  var children = _ref6.children;

  children = children.toJS ? children.toJS() : children;
  return _defineProperty({}, '' + name, children.reduce(objectReducer, {}));
}

/**
 * Render a many block
 * @param  {String} options.name Block name
 * @param  {Array} options.children Children of the block
 * @return {Object} Object defined with a name/value key pair
 */
function many(_ref8) {
  var name = _ref8.name;
  var children = _ref8.children;

  children = children.toJS ? children.toJS() : children;
  return _defineProperty({}, '' + name, children.map(function (c) {
    return c.reduce(objectReducer, {});
  }));
}

/**
 * Create data object config
 * @return {Object} An object referencing the render functions above for each
 * component type
 */
function createDataObjectConfig() {
  var definition = {
    fields: {
      default: value,
      richTextArea: valueStringify
    },
    attr: attr,
    many: many,
    compoundField: passThrough,
    group: passThrough,
    section: passThrough
  };

  return definition;
}