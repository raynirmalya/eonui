# jarvis-vector-map



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type                                  | Default                       |
| -------------- | --------------- | ----------- | ------------------------------------- | ----------------------------- |
| `allowZoom`    | `allow-zoom`    |             | `boolean`                             | `true`                        |
| `heading`      | `heading`       |             | `string`                              | `'Nominal GDP'`               |
| `items`        | `items`         |             | `string`                              | `defaultRegions`              |
| `legendMode`   | `legend-mode`   |             | `"buckets" \| "top-regions"`          | `'buckets'`                   |
| `legendTitle`  | `legend-title`  |             | `string`                              | `'Legend'`                    |
| `markers`      | `markers`       |             | `string`                              | `defaultMarkers`              |
| `routes`       | `routes`        |             | `string`                              | `defaultRoutes`               |
| `showControls` | `show-controls` |             | `boolean`                             | `true`                        |
| `showLabels`   | `show-labels`   |             | `boolean`                             | `true`                        |
| `showLegend`   | `show-legend`   |             | `boolean`                             | `true`                        |
| `showMarkers`  | `show-markers`  |             | `boolean`                             | `true`                        |
| `showRoutes`   | `show-routes`   |             | `boolean`                             | `true`                        |
| `subtitle`     | `subtitle`      |             | `string`                              | `'in millions of US dollars'` |
| `valueFormat`  | `value-format`  |             | `"compact" \| "currency" \| "number"` | `'compact'`                   |


## Events

| Event          | Description | Type                                            |
| -------------- | ----------- | ----------------------------------------------- |
| `jarvisSelect` |             | `CustomEvent<{ name: string; value: number; }>` |


## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"base"`    |             |
| `"header"`  |             |
| `"legend"`  |             |
| `"panel"`   |             |
| `"tooltip"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
