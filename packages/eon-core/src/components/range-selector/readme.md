# eon-range-selector



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description | Type                                | Default          |
| ----------------- | ------------------- | ----------- | ----------------------------------- | ---------------- |
| `disabled`        | `disabled`          |             | `boolean`                           | `false`          |
| `end`             | `end`               |             | `number`                            | `80000`          |
| `format`          | `format`            |             | `"currency" \| "label" \| "number"` | `'currency'`     |
| `heading`         | `heading`           |             | `string`                            | `'Select range'` |
| `max`             | `max`               |             | `number`                            | `150000`         |
| `maxRange`        | `max-range`         |             | `number`                            | `0`              |
| `min`             | `min`               |             | `number`                            | `15000`          |
| `minRange`        | `min-range`         |             | `number`                            | `0`              |
| `readOnly`        | `read-only`         |             | `boolean`                           | `false`          |
| `showTicks`       | `show-ticks`        |             | `boolean`                           | `true`           |
| `showValueLabels` | `show-value-labels` |             | `boolean`                           | `true`           |
| `start`           | `start`             |             | `number`                            | `40000`          |
| `step`            | `step`              |             | `number`                            | `1000`           |
| `ticks`           | `ticks`             |             | `string`                            | `''`             |


## Events

| Event       | Description | Type                                           |
| ----------- | ----------- | ---------------------------------------------- |
| `eonChange` |             | `CustomEvent<{ start: number; end: number; }>` |


## Shadow Parts

| Part             | Description |
| ---------------- | ----------- |
| `"base"`         |             |
| `"end-handle"`   |             |
| `"header"`       |             |
| `"start-handle"` |             |
| `"ticks"`        |             |
| `"track"`        |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
