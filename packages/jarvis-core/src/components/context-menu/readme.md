# jarvis-context-menu



<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute                  | Description | Type                       | Default          |
| ------------------------ | -------------------------- | ----------- | -------------------------- | ---------------- |
| `ariaLabel`              | `aria-label`               |             | `string`                   | `'Context menu'` |
| `closeOnOutsideClick`    | `close-on-outside-click`   |             | `boolean`                  | `true`           |
| `closeOnSelect`          | `close-on-select`          |             | `boolean`                  | `true`           |
| `items`                  | `items`                    |             | `string`                   | `''`             |
| `longPressDelay`         | `long-press-delay`         |             | `number`                   | `420`            |
| `open`                   | `open`                     |             | `boolean`                  | `false`          |
| `showDescriptions`       | `show-descriptions`        |             | `boolean`                  | `true`           |
| `showOn`                 | `show-on`                  |             | `"click" \| "contextmenu"` | `'contextmenu'`  |
| `showSelectionIndicator` | `show-selection-indicator` |             | `boolean`                  | `true`           |
| `value`                  | `value`                    |             | `string`                   | `''`             |


## Events

| Event          | Description | Type                              |
| -------------- | ----------- | --------------------------------- |
| `jarvisSelect` |             | `CustomEvent<{ value: string; }>` |


## Methods

### `focusFirst() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `hide() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `showAt(clientX: number, clientY: number) => Promise<void>`



#### Parameters

| Name      | Type     | Description |
| --------- | -------- | ----------- |
| `clientX` | `number` |             |
| `clientY` | `number` |             |

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part       | Description |
| ---------- | ----------- |
| `"item"`   |             |
| `"panel"`  |             |
| `"target"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
