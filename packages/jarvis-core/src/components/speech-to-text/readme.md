# jarvis-speech-to-text



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute               | Description | Type                               | Default                                                                |
| -------------------- | ----------------------- | ----------- | ---------------------------------- | ---------------------------------------------------------------------- |
| `animation`          | `animation`             |             | `boolean`                          | `true`                                                                 |
| `autoStopAfterFinal` | `auto-stop-after-final` |             | `boolean`                          | `false`                                                                |
| `availableLanguages` | `available-languages`   |             | `string`                           | `'en-US\|English (US);en-GB\|English (UK);hi-IN\|Hindi;fr-FR\|French'` |
| `clearOnStart`       | `clear-on-start`        |             | `boolean`                          | `false`                                                                |
| `continuous`         | `continuous`            |             | `boolean`                          | `false`                                                                |
| `disabled`           | `disabled`              |             | `boolean`                          | `false`                                                                |
| `displayMode`        | `display-mode`          |             | `"button" \| "extended" \| "icon"` | `'icon'`                                                               |
| `hint`               | `hint`                  |             | `string`                           | `'Recognized text will appear here...'`                                |
| `interimResults`     | `interim-results`       |             | `boolean`                          | `true`                                                                 |
| `label`              | `label`                 |             | `string`                           | `'Use voice recognition'`                                              |
| `language`           | `language`              |             | `string`                           | `'en-US'`                                                              |
| `maxLength`          | `max-length`            |             | `number`                           | `0`                                                                    |
| `showClearButton`    | `show-clear-button`     |             | `boolean`                          | `true`                                                                 |
| `showOptions`        | `show-options`          |             | `boolean`                          | `false`                                                                |
| `showTranscript`     | `show-transcript`       |             | `boolean`                          | `true`                                                                 |
| `startText`          | `start-text`            |             | `string`                           | `'Start listening'`                                                    |
| `stopText`           | `stop-text`             |             | `string`                           | `'Stop listening'`                                                     |
| `value`              | `value`                 |             | `string`                           | `''`                                                                   |


## Events

| Event               | Description | Type                                              |
| ------------------- | ----------- | ------------------------------------------------- |
| `jarvisEnd`         |             | `CustomEvent<{ value: string; }>`                 |
| `jarvisError`       |             | `CustomEvent<{ message: string; }>`               |
| `jarvisResult`      |             | `CustomEvent<{ value: string; final: boolean; }>` |
| `jarvisStart`       |             | `CustomEvent<void>`                               |
| `jarvisUnsupported` |             | `CustomEvent<void>`                               |


## Methods

### `clear() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `start() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `stop() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part             | Description |
| ---------------- | ----------- |
| `"base"`         |             |
| `"clear-button"` |             |
| `"options"`      |             |
| `"transcript"`   |             |
| `"trigger"`      |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
