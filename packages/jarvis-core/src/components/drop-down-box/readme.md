# jarvis-drop-down-box



<!-- Auto Generated Below -->


## Properties

| Property                | Attribute                 | Description | Type                                                     | Default               |
| ----------------------- | ------------------------- | ----------- | -------------------------------------------------------- | --------------------- |
| `acceptCustomValue`     | `accept-custom-value`     |             | `boolean`                                                | `false`               |
| `applyValueMode`        | `apply-value-mode`        |             | `"instantly" \| "useButtons"`                            | `'instantly'`         |
| `contentType`           | `content-type`            |             | `"list" \| "tree"`                                       | `'tree'`              |
| `disabled`              | `disabled`                |             | `boolean`                                                | `false`               |
| `errorText`             | `error-text`              |             | `string`                                                 | `''`                  |
| `helpText`              | `help-text`               |             | `string`                                                 | `''`                  |
| `invalid`               | `invalid`                 |             | `boolean`                                                | `false`               |
| `items`                 | `items`                   |             | `string`                                                 | `''`                  |
| `label`                 | `label`                   |             | `string`                                                 | `''`                  |
| `minSearchLength`       | `min-search-length`       |             | `number`                                                 | `0`                   |
| `noDataText`            | `no-data-text`            |             | `string`                                                 | `'No matching items'` |
| `openOnFieldClick`      | `open-on-field-click`     |             | `boolean`                                                | `true`                |
| `opened`                | `opened`                  |             | `boolean`                                                | `false`               |
| `placeholder`           | `placeholder`             |             | `string`                                                 | `'Select a value...'` |
| `readOnly`              | `read-only`               |             | `boolean`                                                | `false`               |
| `required`              | `required`                |             | `boolean`                                                | `false`               |
| `searchEnabled`         | `search-enabled`          |             | `boolean`                                                | `true`                |
| `searchExpr`            | `search-expr`             |             | `string`                                                 | `''`                  |
| `searchMode`            | `search-mode`             |             | `"contains" \| "equals" \| "startsWith" \| "startswith"` | `'contains'`          |
| `searchPlaceholder`     | `search-placeholder`      |             | `string`                                                 | `'Search'`            |
| `selectionMode`         | `selection-mode`          |             | `"multiple" \| "single"`                                 | `'single'`            |
| `showClearButton`       | `show-clear-button`       |             | `boolean`                                                | `false`               |
| `showDataBeforeSearch`  | `show-data-before-search` |             | `boolean`                                                | `true`                |
| `showDropDownButton`    | `show-drop-down-button`   |             | `boolean`                                                | `true`                |
| `showSelectionControls` | `show-selection-controls` |             | `boolean`                                                | `true`                |
| `value`                 | `value`                   |             | `string`                                                 | `''`                  |


## Events

| Event                    | Description | Type                                 |
| ------------------------ | ----------- | ------------------------------------ |
| `jarvisChange`           |             | `CustomEvent<{ values: string[]; }>` |
| `jarvisClosed`           |             | `CustomEvent<void>`                  |
| `jarvisCustomItemCreate` |             | `CustomEvent<{ value: string; }>`    |
| `jarvisOpened`           |             | `CustomEvent<void>`                  |


## Shadow Parts

| Part           | Description |
| -------------- | ----------- |
| `"base"`       |             |
| `"control"`    |             |
| `"error-text"` |             |
| `"help-text"`  |             |
| `"panel"`      |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
