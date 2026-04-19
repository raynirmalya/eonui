# jarvis-autocomplete



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                 | Description | Type                                                     | Default                     |
| ---------------------- | ------------------------- | ----------- | -------------------------------------------------------- | --------------------------- |
| `acceptCustomValue`    | `accept-custom-value`     |             | `boolean`                                                | `false`                     |
| `clearButton`          | `clear-button`            |             | `boolean`                                                | `false`                     |
| `disabled`             | `disabled`                |             | `boolean`                                                | `false`                     |
| `label`                | `label`                   |             | `string`                                                 | `''`                        |
| `minSearchLength`      | `min-search-length`       |             | `number`                                                 | `0`                         |
| `noDataText`           | `no-data-text`            |             | `string`                                                 | `'No matching suggestions'` |
| `openOnFieldClick`     | `open-on-field-click`     |             | `boolean`                                                | `true`                      |
| `opened`               | `opened`                  |             | `boolean`                                                | `false`                     |
| `placeholder`          | `placeholder`             |             | `string`                                                 | `'Start typing'`            |
| `searchMode`           | `search-mode`             |             | `"contains" \| "equals" \| "startsWith" \| "startswith"` | `'contains'`                |
| `showClearButton`      | `show-clear-button`       |             | `boolean`                                                | `false`                     |
| `showDataBeforeSearch` | `show-data-before-search` |             | `boolean`                                                | `true`                      |
| `suggestions`          | `suggestions`             |             | `string`                                                 | `''`                        |
| `value`                | `value`                   |             | `string`                                                 | `''`                        |


## Events

| Event                    | Description | Type                              |
| ------------------------ | ----------- | --------------------------------- |
| `jarvisClosed`           |             | `CustomEvent<void>`               |
| `jarvisCustomItemCreate` |             | `CustomEvent<{ value: string; }>` |
| `jarvisInput`            |             | `CustomEvent<{ value: string; }>` |
| `jarvisOpened`           |             | `CustomEvent<void>`               |
| `jarvisSelect`           |             | `CustomEvent<{ value: string; }>` |


## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"base"`    |             |
| `"clear"`   |             |
| `"control"` |             |
| `"option"`  |             |
| `"panel"`   |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
