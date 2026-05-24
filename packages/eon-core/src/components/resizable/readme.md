# eon-resizable



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description | Type                                   | Default               |
| ----------------- | ------------------- | ----------- | -------------------------------------- | --------------------- |
| `ariaLabel`       | `aria-label`        |             | `string`                               | `'Resizable surface'` |
| `disabled`        | `disabled`          |             | `boolean`                              | `false`               |
| `handles`         | `handles`           |             | `string`                               | `'right bottom'`      |
| `height`          | `height`            |             | `number`                               | `260`                 |
| `keepAspectRatio` | `keep-aspect-ratio` |             | `boolean`                              | `false`               |
| `maxHeight`       | `max-height`        |             | `number`                               | `720`                 |
| `maxWidth`        | `max-width`         |             | `number`                               | `960`                 |
| `minHeight`       | `min-height`        |             | `number`                               | `160`                 |
| `minWidth`        | `min-width`         |             | `number`                               | `240`                 |
| `resizeAxis`      | `resize-axis`       |             | `"both" \| "horizontal" \| "vertical"` | `'both'`              |
| `showSizeLabel`   | `show-size-label`   |             | `boolean`                              | `false`               |
| `step`            | `step`              |             | `number`                               | `8`                   |
| `width`           | `width`             |             | `number`                               | `420`                 |


## Events

| Event       | Description | Type                                              |
| ----------- | ----------- | ------------------------------------------------- |
| `eonResize` |             | `CustomEvent<{ width: number; height: number; }>` |


## Shadow Parts

| Part           | Description |
| -------------- | ----------- |
| `"base"`       |             |
| `"content"`    |             |
| `"handle"`     |             |
| `"size-label"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
