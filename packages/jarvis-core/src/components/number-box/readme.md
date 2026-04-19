# jarvis-number-box



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description | Type                                                                                           | Default                    |
| ----------------- | ------------------- | ----------- | ---------------------------------------------------------------------------------------------- | -------------------------- |
| `currency`        | `currency`          |             | `string`                                                                                       | `'USD'`                    |
| `disabled`        | `disabled`          |             | `boolean`                                                                                      | `false`                    |
| `errorText`       | `error-text`        |             | `string`                                                                                       | `''`                       |
| `format`          | `format`            |             | `"accounting" \| "currency" \| "decimal" \| "fixed-point" \| "integer" \| "percent" \| "unit"` | `'decimal'`                |
| `fractionDigits`  | `fraction-digits`   |             | `number`                                                                                       | `-1`                       |
| `helpText`        | `help-text`         |             | `string`                                                                                       | `''`                       |
| `invalid`         | `invalid`           |             | `boolean`                                                                                      | `false`                    |
| `label`           | `label`             |             | `string`                                                                                       | `''`                       |
| `locale`          | `locale`            |             | `string`                                                                                       | `'en-US'`                  |
| `max`             | `max`               |             | `number`                                                                                       | `Number.POSITIVE_INFINITY` |
| `min`             | `min`               |             | `number`                                                                                       | `Number.NEGATIVE_INFINITY` |
| `placeholder`     | `placeholder`       |             | `string`                                                                                       | `''`                       |
| `readOnly`        | `read-only`         |             | `boolean`                                                                                      | `false`                    |
| `showClearButton` | `show-clear-button` |             | `boolean`                                                                                      | `false`                    |
| `showSpinButtons` | `show-spin-buttons` |             | `boolean`                                                                                      | `true`                     |
| `step`            | `step`              |             | `number`                                                                                       | `1`                        |
| `unit`            | `unit`              |             | `string`                                                                                       | `''`                       |
| `value`           | `value`             |             | `null \| number`                                                                               | `0`                        |


## Events

| Event          | Description | Type                                      |
| -------------- | ----------- | ----------------------------------------- |
| `jarvisChange` |             | `CustomEvent<{ value: number \| null; }>` |


## Shadow Parts

| Part             | Description |
| ---------------- | ----------- |
| `"base"`         |             |
| `"clear"`        |             |
| `"control"`      |             |
| `"error"`        |             |
| `"help"`         |             |
| `"spin-buttons"` |             |
| `"spin-down"`    |             |
| `"spin-up"`      |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
