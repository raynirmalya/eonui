# eon-tag-box



<!-- Auto Generated Below -->


## Properties

| Property                | Attribute                 | Description | Type                                                     | Default               |
| ----------------------- | ------------------------- | ----------- | -------------------------------------------------------- | --------------------- |
| `acceptCustomValue`     | `accept-custom-value`     |             | `boolean`                                                | `false`               |
| `applyValueMode`        | `apply-value-mode`        |             | `"instantly" \| "useButtons"`                            | `'instantly'`         |
| `disabled`              | `disabled`                |             | `boolean`                                                | `false`               |
| `errorText`             | `error-text`              |             | `string`                                                 | `''`                  |
| `grouped`               | `grouped`                 |             | `boolean`                                                | `false`               |
| `helpText`              | `help-text`               |             | `string`                                                 | `''`                  |
| `hideSelectedItems`     | `hide-selected-items`     |             | `boolean`                                                | `false`               |
| `invalid`               | `invalid`                 |             | `boolean`                                                | `false`               |
| `items`                 | `items`                   |             | `string`                                                 | `''`                  |
| `label`                 | `label`                   |             | `string`                                                 | `''`                  |
| `maxDisplayedTags`      | `max-displayed-tags`      |             | `number`                                                 | `999`                 |
| `minSearchLength`       | `min-search-length`       |             | `number`                                                 | `0`                   |
| `noDataText`            | `no-data-text`            |             | `string`                                                 | `'No matching items'` |
| `openOnFieldClick`      | `open-on-field-click`     |             | `boolean`                                                | `true`                |
| `opened`                | `opened`                  |             | `boolean`                                                | `false`               |
| `placeholder`           | `placeholder`             |             | `string`                                                 | `'Select...'`         |
| `readOnly`              | `read-only`               |             | `boolean`                                                | `false`               |
| `required`              | `required`                |             | `boolean`                                                | `false`               |
| `searchEnabled`         | `search-enabled`          |             | `boolean`                                                | `false`               |
| `searchExpr`            | `search-expr`             |             | `string`                                                 | `''`                  |
| `searchMode`            | `search-mode`             |             | `"contains" \| "equals" \| "startsWith" \| "startswith"` | `'contains'`          |
| `searchPlaceholder`     | `search-placeholder`      |             | `string`                                                 | `'Search'`            |
| `selectAllMode`         | `select-all-mode`         |             | `"allPages" \| "page"`                                   | `'page'`              |
| `selectAllText`         | `select-all-text`         |             | `string`                                                 | `'Select all'`        |
| `showClearButton`       | `show-clear-button`       |             | `boolean`                                                | `false`               |
| `showDataBeforeSearch`  | `show-data-before-search` |             | `boolean`                                                | `true`                |
| `showDropDownButton`    | `show-drop-down-button`   |             | `boolean`                                                | `true`                |
| `showMultiTagOnly`      | `show-multi-tag-only`     |             | `boolean`                                                | `false`               |
| `showSelectionControls` | `show-selection-controls` |             | `boolean`                                                | `true`                |
| `value`                 | `value`                   |             | `string`                                                 | `''`                  |


## Events

| Event                 | Description | Type                                 |
| --------------------- | ----------- | ------------------------------------ |
| `eonChange`           |             | `CustomEvent<{ values: string[]; }>` |
| `eonClosed`           |             | `CustomEvent<void>`                  |
| `eonCustomItemCreate` |             | `CustomEvent<{ value: string; }>`    |
| `eonOpened`           |             | `CustomEvent<void>`                  |


## Shadow Parts

| Part           | Description |
| -------------- | ----------- |
| `"base"`       |             |
| `"control"`    |             |
| `"error-text"` |             |
| `"help-text"`  |             |
| `"panel"`      |             |
| `"search"`     |             |
| `"tag"`        |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
