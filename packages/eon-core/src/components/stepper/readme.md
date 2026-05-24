# eon-stepper



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description | Type                                         | Default        |
| ---------------- | ----------------- | ----------- | -------------------------------------------- | -------------- |
| `ariaLabel`      | `aria-label`      |             | `string`                                     | `'Stepper'`    |
| `completed`      | `completed`       |             | `string`                                     | `''`           |
| `current`        | `current`         |             | `number`                                     | `0`            |
| `disabled`       | `disabled`        |             | `boolean`                                    | `false`        |
| `disabledSteps`  | `disabled-steps`  |             | `string`                                     | `''`           |
| `displayMode`    | `display-mode`    |             | `"auto" \| "icons" \| "labels" \| "numbers"` | `'auto'`       |
| `invalidSteps`   | `invalid-steps`   |             | `string`                                     | `''`           |
| `items`          | `items`           |             | `string`                                     | `''`           |
| `linear`         | `linear`          |             | `boolean`                                    | `false`        |
| `orientation`    | `orientation`     |             | `"horizontal" \| "vertical"`                 | `'horizontal'` |
| `readOnly`       | `read-only`       |             | `boolean`                                    | `false`        |
| `selectOnFocus`  | `select-on-focus` |             | `boolean`                                    | `false`        |
| `showConnectors` | `show-connectors` |             | `boolean`                                    | `true`         |
| `size`           | `size`            |             | `"lg" \| "md" \| "sm"`                       | `'md'`         |


## Events

| Event           | Description | Type                                             |
| --------------- | ----------- | ------------------------------------------------ |
| `eonStepChange` |             | `CustomEvent<{ index: number; label: string; }>` |


## Methods

### `next() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `previous() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"base"`      |             |
| `"connector"` |             |
| `"indicator"` |             |
| `"label"`     |             |
| `"step"`      |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
