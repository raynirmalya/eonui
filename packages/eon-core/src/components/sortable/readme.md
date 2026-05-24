# eon-sortable



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description | Type      | Default                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------- | ------------------- | ----------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ariaLabel`       | `aria-label`        |             | `string`  | `'Sortable board'`                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `columns`         | `columns`           |             | `string`  | `''`                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `compact`         | `compact`           |             | `boolean` | `false`                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `disabled`        | `disabled`          |             | `boolean` | `false`                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `emptyColumnText` | `empty-column-text` |             | `string`  | `'Drop cards here'`                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `items`           | `items`             |             | `string`  | `'Not Started/Report on the State of Engineering Dept\|Bart Armaz\|success; Not Started/Staff Productivity Report\|Brett Wade\|success; Need Assistance/Update Employee Files with New NDA\|Greta Sims\|success; Need Assistance/Sign Updated NDA\|Ed Holmes\|warning; In Progress/Health Insurance\|Samantha Bright\|warning; In Progress/NDA\|Greta Sims\|warning; Deferred/New HDMI Spec\|Bart Armaz\|success; Deferred/Refund Request\|Ed Holmes\|danger'` |
| `showCounts`      | `show-counts`       |             | `boolean` | `true`                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `showMeta`        | `show-meta`         |             | `boolean` | `true`                                                                                                                                                                                                                                                                                                                                                                                                                                                         |


## Events

| Event        | Description | Type                                                                                   |
| ------------ | ----------- | -------------------------------------------------------------------------------------- |
| `eonReorder` |             | `CustomEvent<{ value: string; fromColumn: string; toColumn: string; index: number; }>` |


## Shadow Parts

| Part              | Description |
| ----------------- | ----------- |
| `"base"`          |             |
| `"card"`          |             |
| `"column"`        |             |
| `"column-header"` |             |
| `"empty-state"`   |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
