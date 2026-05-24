# eon-toast



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description | Type                                                                                                          | Default                |
| ----------------- | ------------------- | ----------- | ------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `density`         | `density`           |             | `"comfortable" \| "compact"`                                                                                  | `'comfortable'`        |
| `dismissLabel`    | `dismiss-label`     |             | `string`                                                                                                      | `'Close notification'` |
| `duration`        | `duration`          |             | `number`                                                                                                      | `0`                    |
| `heading`         | `heading`           |             | `string`                                                                                                      | `''`                   |
| `icon`            | `icon`              |             | `string`                                                                                                      | `''`                   |
| `pauseOnHover`    | `pause-on-hover`    |             | `boolean`                                                                                                     | `false`                |
| `polite`          | `polite`            |             | `"assertive" \| "polite"`                                                                                     | `'polite'`             |
| `position`        | `position`          |             | `"bottom-center" \| "bottom-left" \| "bottom-right" \| "inline" \| "top-center" \| "top-left" \| "top-right"` | `'inline'`             |
| `showCloseButton` | `show-close-button` |             | `boolean`                                                                                                     | `false`                |
| `showIcon`        | `show-icon`         |             | `boolean`                                                                                                     | `true`                 |
| `showProgressBar` | `show-progress-bar` |             | `boolean`                                                                                                     | `false`                |
| `showTimestamp`   | `show-timestamp`    |             | `boolean`                                                                                                     | `false`                |
| `stackIndex`      | `stack-index`       |             | `number`                                                                                                      | `0`                    |
| `timestamp`       | `timestamp`         |             | `string`                                                                                                      | `''`                   |
| `tone`            | `tone`              |             | `"danger" \| "neutral" \| "success" \| "warning"`                                                             | `'neutral'`            |
| `visible`         | `visible`           |             | `boolean`                                                                                                     | `true`                 |


## Events

| Event     | Description | Type                                                                 |
| --------- | ----------- | -------------------------------------------------------------------- |
| `eonHide` |             | `CustomEvent<{ reason: "timeout" \| "dismiss" \| "programmatic"; }>` |
| `eonShow` |             | `CustomEvent<void>`                                                  |


## Methods

### `hide(reason?: "dismiss" | "programmatic" | "timeout") => Promise<void>`



#### Parameters

| Name     | Type                                       | Description |
| -------- | ------------------------------------------ | ----------- |
| `reason` | `"timeout" \| "dismiss" \| "programmatic"` |             |

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part             | Description |
| ---------------- | ----------- |
| `"actions"`      |             |
| `"base"`         |             |
| `"close-button"` |             |
| `"content"`      |             |
| `"icon"`         |             |
| `"progress-bar"` |             |
| `"timestamp"`    |             |
| `"title"`        |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
