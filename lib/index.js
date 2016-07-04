'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createDataObjectRenderer;

var _formalistCompose = require('formalist-compose');

var _formalistCompose2 = _interopRequireDefault(_formalistCompose);

var _createDataObjectConfig = require('./create-data-object-config');

var _createDataObjectConfig2 = _interopRequireDefault(_createDataObjectConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 */
function createDataObjectRenderer() {
  var formConfig = (0, _formalistCompose.createFormConfig)((0, _createDataObjectConfig2.default)());
  return function (data) {
    var form = (0, _formalistCompose2.default)(formConfig);
    return form(data).render().reduce(_createDataObjectConfig.objectReducer, {});
  };
}