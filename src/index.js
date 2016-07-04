import composeForm, {createFormConfig} from 'formalist-compose'
import createDataObjectConfig, {objectReducer} from './create-data-object-config'

/**
 * Create a data object renderer
 * @return {Function} A function that’ll render a data object from a formalist
 * AST
 */
export default function createDataObjectRenderer () {
  const formConfig = createFormConfig(createDataObjectConfig())
  return (data) => {
    const form = composeForm(formConfig)
    return form(data).render().reduce(objectReducer, {})
  }
}
