/**
 * Merge objects together
 * @param  {Object} a
 * @param  {Object} b
 * @return {Object} Merged combination of `a` and `b`
 */
export function objectReducer(a, b) {
  return Object.assign(a, b);
}

/**
 * Pass through, i.e., render the children of this component type
 * @param  {Mixed} options.children Children to render
 * @return {Object}
 */
function passThrough({ children }) {
  return children.reduce(objectReducer, {});
}

/**
 * Render a single value
 * @param  {String} options.name Component name
 * @param  {Mixed} options.value Component value
 * @return {Object} Object defined with a name/value key pair
 */
function value({ name, value }) {
  return {
    [`${name}`]: value,
  };
}

/**
 * Render a single value and but cast it to a string beforehand
 * @param  {String} options.name Component name
 * @param  {Mixed} options.value Component value
 * @return {Object} Object defined with a name/value key pair
 */
function valueStringify({ name, value }) {
  value = value && value.toJS ? value.toJS() : value;
  // Stringify if it's defined
  value = value != null ? JSON.stringify(value) : value;
  return {
    [`${name}`]: value,
  };
}

/**
 * Render an attr block
 * @param  {String} options.name Block name
 * @param  {Object} options.children Children of the block
 * @return {Object} Object defined with a name/value key pair
 */
function attr({ name, children }) {
  children = children.toJS ? children.toJS() : children;
  return {
    [`${name}`]: children.reduce(objectReducer, {}),
  };
}

/**
 * Render a many block
 * @param  {String} options.name Block name
 * @param  {Array} options.children Children of the block
 * @return {Object} Object defined with a name/value key pair
 */
function many({ name, children }) {
  children = children.toJS ? children.toJS() : children;
  return {
    [`${name}`]: children.map((c) => c.reduce(objectReducer, {})),
  };
}

function childForm({ name, attributes, children }) {
  children = children.toJS ? children.toJS() : children;
  return {
    ["name"]: name,
    ["data"]: children.reduce(objectReducer, {}),
  };
}

function manyForms({ name, children }) {
  children = children.toJS ? children.toJS() : children;
  return {
    [`${name}`]: children,
  };
}

/**
 * Render an attr block
 * @param  {String} options.name Block name
 * @param  {Object} options.children Children of the block
 * @return {Object} Object defined with a name/value key pair
 */
function formField({ name, children }) {
  children = children.toJS ? children.toJS() : children;
  return {
    [`${name}`]: children.reduce(objectReducer, {}),
  };
}

/**
 * Create data object config
 * @return {Object} An object referencing the render functions above for each
 * component type
 */
export default function createDataObjectConfig() {
  const definition = {
    fields: {
      default: value,
      richTextArea: valueStringify,
    },
    attr: attr,
    many: many,
    compoundField: passThrough,
    group: passThrough,
    section: passThrough,
    childForm: childForm,
    manyForms: manyForms,
    formField: formField,
  };

  return definition;
}
