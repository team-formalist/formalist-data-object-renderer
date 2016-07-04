# Formalist Data Object Renderer

Convert a Formalist AST into a plain old JavaScript object of its values. It will discard any presentational data associated with the form definition.

## Usage

```js
import createDataObjectRenderer from 'formalist-data-object-renderer'
const dataObjectRenderer = createDataObjectRenderer()

const data = [...] // Formalist compatible AST

const dataObject = dataObjectRenderer(data)
// -> { ... data as object }
```

## Tests

```
$ npm run test
```

