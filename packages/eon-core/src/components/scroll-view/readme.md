# eon-scroll-view



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description | Type                                               | Default                            |
| ------------------- | --------------------- | ----------- | -------------------------------------------------- | ---------------------------------- |
| `bottomStatusText`  | `bottom-status-text`  |             | `string`                                           | `'Reached the end of the content'` |
| `direction`         | `direction`           |             | `"both" \| "horizontal" \| "vertical"`             | `'vertical'`                       |
| `height`            | `height`              |             | `string`                                           | `'18rem'`                          |
| `reachOffset`       | `reach-offset`        |             | `number`                                           | `32`                               |
| `refreshLabel`      | `refresh-label`       |             | `string`                                           | `'Refresh'`                        |
| `refreshing`        | `refreshing`          |             | `boolean`                                          | `false`                            |
| `scrollByContent`   | `scroll-by-content`   |             | `boolean`                                          | `true`                             |
| `scrollByThumb`     | `scroll-by-thumb`     |             | `boolean`                                          | `true`                             |
| `showRefreshButton` | `show-refresh-button` |             | `boolean`                                          | `false`                            |
| `showScrollbar`     | `show-scrollbar`      |             | `"always" \| "never" \| "on-hover" \| "on-scroll"` | `'on-scroll'`                      |
| `showShadows`       | `show-shadows`        |             | `boolean`                                          | `true`                             |
| `topStatusText`     | `top-status-text`     |             | `string`                                           | `'Scroll for more'`                |


## Events

| Event            | Description | Type                                          |
| ---------------- | ----------- | --------------------------------------------- |
| `eonReachBottom` |             | `CustomEvent<void>`                           |
| `eonReachTop`    |             | `CustomEvent<void>`                           |
| `eonRefresh`     |             | `CustomEvent<void>`                           |
| `eonScroll`      |             | `CustomEvent<{ top: number; left: number; }>` |


## Methods

### `refresh() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `scrollToBottom() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `scrollToPosition(top: number, left?: number) => Promise<void>`



#### Parameters

| Name   | Type     | Description |
| ------ | -------- | ----------- |
| `top`  | `number` |             |
| `left` | `number` |             |

#### Returns

Type: `Promise<void>`



### `scrollToTop() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part               | Description |
| ------------------ | ----------- |
| `"base"`           |             |
| `"content"`        |             |
| `"refresh-button"` |             |
| `"status"`         |             |
| `"viewport"`       |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
