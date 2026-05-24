# eon-splitter



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute              | Description | Type                         | Default        |
| -------------------- | ---------------------- | ----------- | ---------------------------- | -------------- |
| `ariaLabel`          | `aria-label`           |             | `string`                     | `'Splitter'`   |
| `collapsed`          | `collapsed`            |             | `boolean`                    | `false`        |
| `collapsible`        | `collapsible`          |             | `boolean`                    | `false`        |
| `endLabel`           | `end-label`            |             | `string`                     | `'End pane'`   |
| `keyboardResizeStep` | `keyboard-resize-step` |             | `number`                     | `5`            |
| `max`                | `max`                  |             | `number`                     | `85`           |
| `min`                | `min`                  |             | `number`                     | `15`           |
| `orientation`        | `orientation`          |             | `"horizontal" \| "vertical"` | `'horizontal'` |
| `position`           | `position`             |             | `number`                     | `35`           |
| `startLabel`         | `start-label`          |             | `string`                     | `'Start pane'` |
| `step`               | `step`                 |             | `number`                     | `1`            |


## Events

| Event       | Description | Type                                                     |
| ----------- | ----------- | -------------------------------------------------------- |
| `eonChange` |             | `CustomEvent<{ position: number; collapsed: boolean; }>` |


## Methods

### `toggle() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part         | Description |
| ------------ | ----------- |
| `"base"`     |             |
| `"collapse"` |             |
| `"divider"`  |             |
| `"end"`      |             |
| `"start"`    |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
