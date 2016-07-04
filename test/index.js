import test from 'tape'
import isFunction from '@f/is-function'
import createDataObjectRenderer from '../src'
import data from './fixtures/data'

test('it should', (nest) => {
  let dataObjectRenderer = createDataObjectRenderer()

  nest.test('... create an object renderer', (assert) => {
    assert.ok(isFunction(dataObjectRenderer), 'is a functino')
    assert.end()
  })

  nest.test('... render an object from an AST', (assert) => {
    let actual = dataObjectRenderer(data)
    let expected = {
      text_field: 'Text field value',
      number_field: 'Number field value',
      check_box: 'Check box value',
      select_box: '3',
      radio_buttons: '2',
      text_area: 'Text area value',
      date_field: '2016-03-10',
      date_time_field: '2016-03-10 17:00:00 +1100',
      section_text_field: 'Section text field value',
      section_number_field: 123,
      group_text_field: 'Group text field value',
      group_number_field: 123,
      many: [{
        many_text_field: 'Many text field 1',
        many_date_field: '2016-03-10',
      }, {
        many_text_field: 'Many text field 2',
        many_date_field: '2016-03-09',
      }],
      attr: {
        attr_text_field: 'Attr text field value',
        attr_date_field: '2016-03-10',
      },
      compound_field_text_field: 'Compound text field value',
      compound_field_date_field: '2016-03-10',
    }
    assert.deepLooseEqual(actual, expected, 'object graph matches')
    assert.end()
  })
})
