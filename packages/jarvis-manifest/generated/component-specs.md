## jarvis-button

Primary action trigger.

### Anatomy
- root
- prefix
- label
- suffix

### Variants
- solid
- outline
- ghost

### States
- default
- hover
- focus-visible
- active
- disabled
- loading

### Interactions
- Click and keyboard activation trigger the same action.
- Loading preserves label alignment and disables repeated submission.
- Prefix and suffix content should not shift vertical rhythm across variants.

## jarvis-icon-button

Compact icon-only button.

### Anatomy
- root

### Variants
- default

### States
- default
- hover
- focus-visible
- active
- disabled
- loading

### Interactions
- Icon-only action should be equally actionable by pointer and keyboard with identical activation behavior.
- Loading state keeps the icon region centered and suppresses interaction noise.
- Icon-only labels must remain explicitly announced via `label`.

## jarvis-input

Single-line text entry field.

### Anatomy
- label
- control
- help-text

### Variants
- text
- email
- password
- search
- clear action
- password reveal
- character count

### States
- empty
- filled
- focus
- disabled
- read-only
- required
- invalid
- with help text
- with error text
- cleared
- revealed

### Interactions
- Input value updates on each keystroke and emits jarvisInput.
- Focus state must be visible without overpowering nearby content.
- Helper and error text remain attached to the field through described-by relationships.
- Inline actions should not collapse the typing area or shift surrounding content.

## jarvis-textarea

Multi-line text entry field.

### Anatomy
- root

### Variants
- default
- auto resize
- character count

### States
- empty
- filled
- focus
- disabled
- read-only
- required
- invalid
- resized

### Interactions
- Supports vertical resizing without breaking surrounding layout rhythm.
- Validation and helper messaging mirror input field behavior.
- Padding and line height should make long-form text comfortable to scan.
- Auto-resize should grow smoothly without causing abrupt layout jumps.

## jarvis-checkbox

Binary choice control.

### Anatomy
- root

### Variants
- default
- three-state
- small
- large
- required
- readonly

### States
- unchecked
- checked
- mixed
- focus
- disabled
- invalid
- read-only

### Interactions
- Label and indicator form a single hit target.
- Checked mark should animate in without blurring legibility.
- Group usage should preserve vertical rhythm when stacked.
- Mixed state should remain visually distinct from a checked state.
- Helper and error copy should stay visually attached without collapsing control spacing.

## jarvis-radio

Single selection within a set.

### Anatomy
- root

### Variants
- default
- required
- readonly

### States
- unchecked
- checked
- focus
- disabled
- invalid
- read-only

### Interactions
- Radio dot animation should remain crisp and centered.
- Multiple radios in a group should feel visually related.
- Indicator and label act as one selection target.
- Single radios should still support helper and error copy without feeling disconnected from grouped radios.

## jarvis-switch

Immediate toggle for settings.

### Anatomy
- root

### Variants
- default
- text on track
- small
- large
- required
- readonly

### States
- off
- on
- focus
- disabled
- read-only
- invalid

### Interactions
- Thumb travel should feel smooth and measurable, not jumpy.
- Track and thumb both communicate current state.
- Switch should be used for immediate settings rather than form submission.
- Track text should remain readable without obscuring thumb travel.
- Supporting copy should sit below the field without breaking the compact settings rhythm.

## jarvis-select

Native-backed select with Jarvis styling.

### Anatomy
- root

### Variants
- default

### States
- placeholder/empty
- selected
- focus
- disabled
- required
- invalid
- with help text
- with error text

### Interactions
- Uses native select semantics with Jarvis theming.
- Chevron treatment should remain aligned across themes and densities.
- Text truncation should remain readable inside narrower layouts.

## jarvis-badge

Compact status label.

### Anatomy
- root

### Variants
- neutral
- success
- warning
- danger

### States
- resting

### Interactions
- Badge tone changes should be perceptible and legible in dense table or toolbar contexts.
- Text alignment should stay centered and stable when tone updates.

## jarvis-alert

Inline system message.

### Anatomy
- root

### Variants
- neutral
- success
- warning
- danger

### States
- inline
- announcement
- assertive
- dismissible

### Interactions
- Status iconography and message copy should align to the same baseline.
- Role should adapt between status and alert per tone/polite combinations.
- Heading and content spacing must remain stable when heading is omitted.

## jarvis-avatar

User image or initials fallback.

### Anatomy
- root

### Variants
- sm
- md
- lg

### States
- with-image
- with-fallback
- loading

### Interactions
- When `src` is valid, render image with rounded crop and fallback to initials when missing.
- Fallback initials should remain centered and stable in width and height.
- Name changes should update fallback text without layout shift.

## jarvis-breadcrumb

Hierarchical location trail.

### Anatomy
- root

### Variants
- default

### States
- default
- overflowing labels

### Interactions
- Breadcrumb items should preserve a readable trail even with long labels.
- Separators support theme personality without overpowering hierarchy.

## jarvis-card

Composable surfaced container.

### Anatomy
- root

### Variants
- default

### States
- resting
- hovered
- interactive
- elevated

### Interactions
- Cards should support content grouping without becoming visually noisy.
- Hover lift is optional and should never disrupt text readability.
- Header, body, and footer spacing stays consistent across layouts.

## jarvis-chip

Compact selected value or filter token.

### Anatomy
- root

### Variants
- default
- removable

### States
- resting
- hover
- focus
- removable

### Interactions
- Chips should stay compact without collapsing text readability.
- Remove affordance appears as a secondary action, not a competing primary control.

## jarvis-divider

Visual or semantic separation line.

### Anatomy
- root

### Variants
- default

### States
- default

### Interactions
- Divider should remain unobtrusive and avoid visual weight unless acting as section separator.
- Orientation changes should maintain 1px rhythm consistency.

## jarvis-empty-state

Guided placeholder when no data is available.

### Anatomy
- root

### Variants
- default

### States
- empty
- with-visual
- with-actions
- loaded

### Interactions
- Preserve centered alignment for heading, description, and actions.
- Keep copy concise and supportive, allowing optional visual slot content.
- Action region should remain visible while retaining calm focus hierarchy.

## jarvis-list

Simple ordered, searchable, or selectable content list.

### Anatomy
- root

### Variants
- slot content
- searchable list
- single-select
- multi-select
- toolbar bulk actions
- status summary

### States
- default
- active
- selected
- filtered empty
- bulk-selected

### Interactions
- Lists should support both authored slot content and data-driven row rendering without changing the visual family.
- Filtering should preserve group headings only when at least one child row remains visible.
- Bulk actions should apply only to rows still visible after filtering so search-first workflows stay predictable.

## jarvis-pagination

Paged navigation control.

### Anatomy
- root

### Variants
- default

### States
- first page
- middle page
- last page
- disabled

### Interactions
- Previous and next controls clamp to the available page range.
- Status text should remain readable and stable as page values change.

## jarvis-tabs

Tabbed content switcher.

### Anatomy
- root

### Variants
- default

### States
- default
- active
- focus
- disabled if implemented

### Interactions
- Arrow key navigation should move between tabs without shifting layout unexpectedly.
- Active indicator motion should be fluid but calm.
- Tab label sizing should remain balanced across short and long labels.

## jarvis-skeleton

Loading placeholder block.

### Anatomy
- root

### Variants
- rectangular
- text
- avatar

### States
- loading
- finished

### Interactions
- Skeleton blocks should reserve final content space to avoid layout shifts.
- Shimmer and pulse should remain low-contrast and calm.
- Width, height, and radius changes should stay predictable.

## jarvis-toast

Transient global notification surface.

### Anatomy
- root

### Variants
- inline
- auto-hide
- dismissible
- stacked global
- compact timestamped

### States
- visible
- hidden
- hover paused
- assertive
- timed out

### Interactions
- Auto-hide should feel predictable and pause cleanly when pauseOnHover is enabled.
- Global stacks should preserve legibility while offsetting multiple notifications.

## jarvis-toolbar

Action grouping bar for dense controls.

### Anatomy
- root

### Variants
- default
- sticky utility bar
- divided groups
- aligned regions
- nowrap command bar

### States
- default
- dense actions
- compact
- sticky
- wrapped
- nowrap

### Interactions
- Start, center, and end regions should preserve alignment under wrapping pressure.
- Dense action sets must remain scannable without collapsing spacing.
- Alignment changes should not break keyboard order or accessible naming.

## jarvis-accordion

Expandable content sections.

### Anatomy
- root

### Variants
- single disclosure
- stacked disclosures
- readonly

### States
- collapsed
- expanded
- focus
- disabled
- readonly

### Interactions
- Stacked items should preserve rhythm so multiple sections feel like one intentional disclosure system.
- Trigger rows should support Arrow key navigation without trapping focus inside expanded content.
- Panel reveal should feel smooth and should not jolt surrounding layout.

## jarvis-combobox

Filterable single-select text input with suggestion list.

### Anatomy
- root

### Variants
- default
- clear button
- custom value
- exact match search

### States
- resting
- open
- selected
- empty
- disabled
- readonly
- custom value ready

### Interactions
- Typing should filter the suggestion list immediately without losing the currently selected display value.
- Closing the popup should either restore the selected label, commit the matching option, or create a custom value when allowed.
- Keyboard navigation should cover Arrow keys, Home, End, Enter, Escape, and Tab predictably.

## jarvis-drawer

Edge-anchored overlay panel for navigation or details.

### Anatomy
- root

### Variants
- left
- right

### States
- closed
- opening
- open
- closing

### Interactions
- Opening should reveal panel movement without disrupting background task context.
- Focus must be trapped inside the panel while open.
- Closing returns focus to the trigger context.
- Backdrop click and escape close are mandatory dismissal channels.

## jarvis-dropdown-menu

Menu of contextual actions anchored to a trigger.

### Anatomy
- root

### Variants
- grouped actions
- selection state
- hover trigger

### States
- closed
- open
- active item
- selected item
- keyboard navigation
- empty

### Interactions
- Arrow keys move the active item predictably through grouped menu items without skipping section context.
- Selection closes the panel and emits the chosen value and label.
- Outside interaction dismisses the panel without trapping focus.

## jarvis-popover

Anchored overlay for lightweight contextual content.

### Anatomy
- root

### Variants
- anchored details
- hover hint
- side placement

### States
- closed
- open
- hover-triggered
- dismissible

### Interactions
- Trigger toggles a lightweight contextual panel that should feel anchored rather than detached.
- Header, description, and dismiss controls should stay balanced even in compact widths.
- Panel placement should remain visually anchored to the trigger.

## jarvis-tooltip

Contextual hover/focus hint.

### Anatomy
- root

### Variants
- hover
- focus
- click
- rich content

### States
- closed
- open
- interactive
- disabled

### Interactions
- Tooltips should appear quickly enough to feel helpful without creating accidental flicker.
- Rich content should remain lightweight and guidance-oriented instead of becoming a substitute for a popover.
- Interactive tooltips should stay dismissible with Escape and outside interaction.

## jarvis-dialog

Modal dialog surface.

### Anatomy
- root

### Variants
- default
- built-in header
- slotted header
- quiet backdrop

### States
- closed
- opening
- open
- closing
- dismissed
- programmatic close

### Interactions
- Entry and exit motion should preserve context without delaying interaction.
- Backdrop and panel work together as one modal system.
- Header, body, and footer slots support consistent decision layouts.
- Built-in headings should make common confirmation flows easy without forcing extra slot markup.

## jarvis-progress

Determinate or indeterminate progress indicator with optional labels and helper text.

### Anatomy
- root

### Variants
- labeled
- tone variants
- indeterminate

### States
- idle
- determinate
- indeterminate

### Interactions
- Progress bars should explain what is happening without forcing nearby body copy to carry the whole status.
- Indeterminate motion must feel present but never distracting.
- Value labels should line up cleanly with longer task names.

## jarvis-spinner

Indeterminate loading indicator.

### Anatomy
- root

### Variants
- spinner

### States
- running
- paused
- finished

### Interactions
- Spinner provides motion feedback for background activity.
- Motion must remain accessible and not overpower nearby interactive content.
- Label should map to status announcements when embedded in loading regions.

## jarvis-stack

Responsive one-dimensional layout primitive.

### Anatomy
- root

### Variants
- single

### States
- default
- wrapped
- compact

### Interactions
- Controls gap and alignment through CSS variables rather than explicit style props.
- Spacing should remain consistent even as children change size.
- Vertical rhythm should stay smooth in responsive wraps.

## jarvis-grid

Responsive two-dimensional layout primitive.

### Anatomy
- root

### Variants
- single

### States
- default
- compact
- wide

### Interactions
- Grid columns should adapt based on available width and `--grid-min` token.
- Gaps should remain consistent across breakpoints.
- Auto-placement should keep alignment when children vary in intrinsic size.

## jarvis-surface

Themed surface container.

### Anatomy
- root

### Variants
- default
- elevated

### States
- resting
- elevated

### Interactions
- Surface acts as a foundational container for nested content and other components.
- Elevation should be communicated through contrast and depth, not heavy borders.

## jarvis-section

Semantic content section with title and actions.

### Anatomy
- root

### Variants
- default

### States
- with heading
- with description
- with actions

### Interactions
- Header and content spacing should remain balanced as actions are added.
- Section supports semantic grouping without requiring heavyweight card chrome.

## jarvis-button-group

Segmented button set for single or multi selection.

### Anatomy
- root

### Variants
- segmented single-select
- segmented multi-select
- descriptive segment rows

### States
- resting
- selected
- focus
- disabled
- readonly
- invalid
- vertical

### Interactions
- Selection should feel immediate and predictable for both single and multi-select flows.
- Pressed and selected states must remain visually distinct in compact layouts.
- Arrow keys should move focus across enabled segments and preserve predictable one-of-many selection in single mode.

## jarvis-menu

Structured command menu with nested submenus.

### Anatomy
- root

### Variants
- horizontal catalog
- vertical command menu
- descriptive rows

### States
- closed
- submenu open
- active item
- focus
- disabled item
- destructive item

### Interactions
- Nested paths should open as cascading submenus without losing context.
- Orientation should only affect the first level; nested panels remain vertical.
- Typeahead should move focus to the next matching command within the active branch.
- Keyboard and programmatic expansion should both preserve the selected leaf state.

## jarvis-context-menu

Right-click or long-press contextual action menu.

### Anatomy
- root

### Variants
- default
- descriptive rows

### States
- closed
- open
- submenu open
- disabled item
- destructive item

### Interactions
- Context menu should anchor to the pointer position and dismiss on outside interaction.
- Nested actions should open to the side without obscuring the hovered command.
- Typeahead should move focus across sibling actions while preserving the current branch.
- Leaf selection should be remembered when the same contextual menu reopens.

## jarvis-stepper

Multi-step progress and navigation indicator.

### Anatomy
- root

### Variants
- horizontal
- vertical
- linear
- compact
- focus-select
- readonly review

### States
- upcoming
- current
- complete
- blocked
- invalid
- externally completed

### Interactions
- Completed and active steps must remain distinguishable at a glance.
- Orientation changes should preserve label readability and connector alignment.
- Externally-driven invalid and disabled states should override implicit progress assumptions.

## jarvis-autocomplete

Freeform text input with inline suggestion popup.

### Anatomy
- root

### Variants
- default
- with clear button
- custom value

### States
- empty
- focused
- showing suggestions
- disabled
- custom value ready

### Interactions
- Suggestions filter in real time as the value changes.
- Selection fills the field and collapses the suggestion panel.
- Optional custom values let the field act as a hybrid autocomplete + freeform input.

## jarvis-radio-group

Radio input group with horizontal or vertical layout.

### Anatomy
- root

### Variants
- vertical
- horizontal
- required
- described rows

### States
- resting
- selected
- disabled
- invalid
- read-only

### Interactions
- Selection must switch immediately with clear one-of-many affordance.
- Legend, items, and supporting text should feel like one field block.
- Arrow keys should move selection across enabled items without trapping focus in disabled rows.

## jarvis-select-box

Searchable dropdown selector with optional grouping.

### Anatomy
- root

### Variants
- default
- search
- grouped
- clear button
- custom value

### States
- resting
- open
- selected
- disabled
- readonly
- required
- invalid
- empty
- custom value ready

### Interactions
- Open state should feel anchored and keep search inside the dropdown surface.
- Grouped lists should preserve clear visual hierarchy without overpowering item labels.
- Search and selection should support both strict item picking and optional freeform entry.
- Helper and error copy should stay visually attached to the field, matching the rest of the Jarvis box editors.

## jarvis-lookup

Expanded lookup picker with search-focused selection sheet.

### Anatomy
- root

### Variants
- default
- grouped
- search
- clear button

### States
- resting
- open
- selected
- empty
- disabled
- readonly
- required
- invalid

### Interactions
- Search should be the primary action and stay visible within the expanded sheet.
- Cancellation should close the sheet without committing changes.
- Opening and keyboard navigation should feel like a deliberate picker rather than a basic menu.
- Helper and error messaging should read like part of the field, not detached modal content.

## jarvis-drop-down-box

Advanced dropdown editor with embedded tree or list content.

### Anatomy
- root

### Variants
- tree content
- list content
- single select
- multiple select
- use buttons

### States
- resting
- open
- expanded
- selected
- filtered
- draft selection
- required
- invalid

### Interactions
- Embedded content should feel like a true picker surface rather than a regular menu.
- Tree selections must remain legible when multiple values are active.
- The list variant should support search, select-all, and optional custom values without losing embedded-picker clarity.
- Validation and helper text should remain attached to the trigger even while the embedded panel is open.

## jarvis-tag-box

Multi-select combobox that renders selected items as dismissible tags.

### Anatomy
- root

### Variants
- default
- search
- grouped
- multi-tag
- use buttons
- custom values

### States
- resting
- open
- selected
- empty
- disabled
- readonly
- draft selection
- required
- invalid

### Interactions
- Tags should remain easy to scan and dismiss without destabilizing the field height too aggressively.
- Collapsed multi-tag summaries should still communicate selection scale clearly.
- Search, custom tag creation, and select-all should work together without obscuring the current value set.
- Helper and error states should remain legible even when multi-tag summaries are active.

## jarvis-number-box

Numeric field with spin controls and clamping.

### Anatomy
- root

### Variants
- default
- spin buttons
- clear button
- formatted value modes
- helper and error text

### States
- empty
- focused
- disabled
- readonly
- clamped
- invalid

### Interactions
- Value changes should clamp cleanly to min/max bounds and normalize on blur.
- Spin buttons must preserve input alignment and never obscure typed values.
- Formatted display should collapse back to an editable numeric string on focus without losing the underlying value.

## jarvis-slider

Single-value range selector.

### Anatomy
- root

### Variants
- default
- labels
- tooltip
- ticks
- formatted values
- plain track
- helper and error text

### States
- resting
- dragging
- disabled
- focused
- readonly
- invalid

### Interactions
- Thumb dragging should update value continuously and smoothly while clamping to the allowed range.
- Optional tooltip stays visually tied to the thumb without obscuring the track.
- Ticks and tick labels should remain aligned to the actual numeric scale even when custom formatting is applied.
- Readonly and invalid states should still communicate the current value clearly without looking disabled by default.

## jarvis-range-slider

Dual-thumb slider for selecting a numeric range.

### Anatomy
- root

### Variants
- default
- labels
- tooltips
- ticks
- formatted values
- plain track
- helper and error text

### States
- resting
- dragging
- disabled
- focused
- readonly
- invalid

### Interactions
- Thumbs should never cross; the component enforces ordered range values and clamps each edge to the allowed range.
- Filled range between thumbs remains visually clear while dragging.
- Ticks and tick labels should stay aligned to the selected range even when formatted as currency, units, or percent values.
- Readonly and invalid states should preserve range legibility while reducing interaction affordance.

## jarvis-calendar

Interactive month calendar with single or multiple selection.

### Anatomy
- root

### Variants
- single-select
- multi-select
- week numbers
- constrained dates
- week-select
- today shortcut

### States
- default
- selected
- today
- outside-month
- disabled

### Interactions
- Month navigation should preserve selection state where possible.
- Selected days remain obvious without overpowering the rest of the grid.
- Disabled dates and range limits should read as visibly unavailable.
- Optional footer actions should help users return to the current month without stealing focus from the grid.

## jarvis-date-box

Date, time, or date-time field with Jarvis styling.

### Anatomy
- root

### Variants
- date
- time
- datetime-local
- current-value shortcut
- helper and error text
- staged apply buttons

### States
- empty
- filled
- disabled
- readonly
- required
- invalid
- min/max constrained
- dirty

### Interactions
- Different native input modes share one consistent Jarvis shell.
- Optional clear button resets the value without altering min/max constraints.
- The picker affordance should stay available without crowding the field text.
- Shortcut actions like Today or Now should feel secondary but still easy to reach in data-entry flows.
- Button-apply mode should let users review a pending value before committing it.

## jarvis-date-range-box

Paired start and end date selection field.

### Anatomy
- root

### Variants
- default
- with clear buttons
- explicit picker actions
- helper and error text
- staged apply buttons
- summary enabled

### States
- empty
- partial
- complete
- disabled
- readonly
- required
- invalid
- dirty

### Interactions
- Start and end values should read as one grouped control.
- Summary text should reinforce the selected range without replacing the actual fields.
- The second field should constrain itself relative to the first, and vice versa.
- Optional picker actions should remain aligned with the paired-field rhythm instead of looking bolted on.
- Button-apply mode should make staged date changes explicit.

## jarvis-file-uploader

File picker with drag-drop, validation, and manual or instant upload states.

### Anatomy
- root

### Variants
- manual upload
- instant upload
- validated dropzone
- list hidden

### States
- empty
- files selected
- uploading
- uploaded
- invalid
- disabled

### Interactions
- Dropzone should react visibly when files are dragged over it.
- Accepted and rejected files should be easy to distinguish without reading console output or hidden status text.
- Manual upload mode should not make a selected file look complete before upload begins.
- Upload progress feedback should remain readable for one or many files.

## jarvis-tree-view

Expandable hierarchical navigation and selection tree.

### Anatomy
- root

### Variants
- single-select
- multi-select
- search
- status summary
- toolbar controls
- bulk visible selection

### States
- collapsed
- expanded
- selected
- filtered
- mixed selection
- bulk-selected visible set

### Interactions
- Tree rows should support expansion without collapsing sibling state unexpectedly.
- Search filtering should retain only matching branches and their parents.
- Bulk selection should respect the filtered visibility state so users can refine before selecting.

## jarvis-drop-down-button

Button that opens a structured action menu.

### Anatomy
- root

### Variants
- standalone trigger
- split button
- icon leading
- outline trigger
- descriptive actions

### States
- closed
- open
- selected
- disabled
- danger action

### Interactions
- Trigger and menu should feel like one composed control.
- Menu closes after selection or outside interaction.
- Button alignment should remain stable whether an icon is present or not.
- Split-button mode should preserve a primary action while exposing secondary menu choices.

## jarvis-popup

Modal popup surface for focused detail or confirmation flows.

### Anatomy
- root

### Variants
- information
- detail card
- confirmation
- media style
- fullscreen

### States
- closed
- open
- dismissible
- focused
- body padding none

### Interactions
- Popup traps focus while open and closes with Escape.
- Backdrop click follows the closeOnOutsideClick contract.
- Header and footer regions should remain stable as content length changes.
- Opening focus should be explicit so keyboard users land on the close affordance or panel content predictably.

## jarvis-action-sheet

Bottom sheet or contextual action list for task-specific commands.

### Anatomy
- root

### Variants
- sheet
- popover
- descriptive actions

### States
- closed
- open
- cancel shown
- cancel hidden
- danger action
- disabled action

### Interactions
- Actions should be easy to scan and tap in both sheet and popover presentation.
- Cancel dismissal must be clearly separated from destructive actions.
- Remembering the last chosen action helps repeated workflows feel faster and more confident.
- Selection indicators should stay readable and avoid decorative glyph artifacts in dense command lists.

## jarvis-color-box

Color picker field with optional alpha-channel editing.

### Anatomy
- root

### Variants
- default
- alpha channel
- apply button
- preset swatches
- helper and error text

### States
- closed
- open
- read-only
- disabled
- required
- invalid

### Interactions
- Closed trigger should preview the active color clearly.
- Apply-button mode should allow review before committing a change.
- Alpha editing must keep the textual value legible.
- Preset swatches should allow quick theme selection without hiding the free-form picker.
- Validation and helper text should align with the rest of the Jarvis field family.

## jarvis-gallery

Media gallery with slideshow, indicators, and navigation buttons.

### Anatomy
- root

### Variants
- manual navigation
- autoplay
- captions
- thumbnails
- side rail
- counter

### States
- first slide
- middle slide
- looping
- autoplay
- hover paused
- keyboard focused

### Interactions
- Navigation buttons and indicators must stay readable over rich imagery.
- Autoplay should pause or feel predictable instead of rushing the user.
- Caption and thumbnail metadata should support scanning without turning the gallery into a plain list.

## jarvis-load-indicator

Lightweight indeterminate loading indicator.

### Anatomy
- root

### Variants
- ring
- dots
- bars
- stacked label

### States
- visible
- hidden

### Interactions
- Indicators should stay subtle and never overpower the primary task surface.
- Motion must remain readable under reduced-motion settings.
- Visible labels should help explain status without forcing surrounding copy to do the entire job.

## jarvis-load-panel

Blocking or non-blocking loading overlay layered over content.

### Anatomy
- root

### Variants
- full overlay
- indicator hidden
- minimal pane
- determinate progress
- cancel action

### States
- hidden
- visible
- dismissible
- blocking
- non-blocking

### Interactions
- Load panel must clearly communicate blocked content without permanently obscuring context.
- Indicator and message should remain centered and readable at different content sizes.
- Supporting description and progress should help explain whether work is queued, in flight, or nearly complete.

## jarvis-scroll-view

Scrollable viewport with bottom-reach events and configurable scrollbar treatment.

### Anatomy
- root

### Variants
- vertical
- horizontal
- both

### States
- top
- middle
- reached bottom

### Interactions
- Scrollbars should match theme density without dominating the content.
- Reach-bottom behavior should be predictable for lazy loading or infinite lists.
- Edge shadows and status text should reinforce scroll position without overwhelming the content.
- Refresh affordances should sit in the utility row instead of covering the content surface.

## jarvis-tab-panel

Tabs plus synchronized panel content for grouped task or workflow views.

### Anatomy
- root

### Variants
- top tabs
- left rail
- secondary mode
- nav buttons
- full width

### States
- resting
- active tab
- disabled
- looping sequence

### Interactions
- Selected tab and panel content must stay tightly synchronized.
- Vertical and horizontal tab positions should both feel stable and intentional.
- Badges and disabled tabs should remain legible without destabilizing the layout.

## jarvis-splitter

Resizable split-pane layout with optional collapsible panel.

### Anatomy
- root

### Variants
- horizontal
- vertical
- collapsible

### States
- resting
- resizing
- collapsed

### Interactions
- Resize interaction should feel immediate and measurable.
- Collapsed state must preserve the surrounding layout without awkward gaps.
- Keyboard resizing should respect min, max, and configured resize steps.

## jarvis-resizable

Resize wrapper for dashboards, cards, and embedded surfaces.

### Anatomy
- root

### Variants
- edge handles
- corner handles
- aspect lock

### States
- resting
- resizing
- disabled

### Interactions
- Resize handles must remain discoverable without visually overwhelming the content.
- Aspect-lock mode should feel predictable for media or chart surfaces.
- Keyboard resizing should work on the enabled handles without violating axis limits.

## jarvis-floating-action-button

Floating primary action button with optional speed-dial actions.

### Anatomy
- fab shell
- primary action
- icon
- label
- speed-dial list
- secondary action

### Variants
- floating button
- extended button
- speed dial
- described actions
- persistent launcher

### States
- closed
- open
- disabled
- described actions hidden

### Interactions
- Primary tap should remain a single obvious action, with secondary actions only revealed intentionally.
- Speed-dial expansion should be directional, short, and easy to dismiss.
- Arrow keys should move focus across enabled actions when the speed dial is open.
- Destructive actions should stay clearly separated and remain visibly disabled when unavailable.

## jarvis-chat

Conversation surface with message bubbles, attachments, and a composer.

### Anatomy
- header
- day divider
- message bubble
- avatar
- attachment chip
- composer

### Variants
- support thread
- attachments enabled
- composer hidden
- system messages
- status tones

### States
- idle
- typing
- disabled
- empty thread
- attachment limit

### Interactions
- Message rhythm should make scanning authorship and timestamps effortless.
- Composer should support fast send while keeping staged files obvious.
- System messages should stay visually distinct without competing with authored replies.

## jarvis-sortable

Drag-and-drop board for reordering cards across columns.

### Anatomy
- board
- column
- column header
- card
- accent rail
- drag grip

### Variants
- single board
- cross-column drag
- disabled
- compact board
- empty columns

### States
- resting
- dragging
- disabled
- empty column

### Interactions
- Cards must remain easy to pick up, track, and drop without losing context.
- Columns should preserve hierarchy while reflecting live counts and status color.
- Empty columns should stay visibly available so teams can drag cards into new stages without guessing the drop target.

## jarvis-speech-to-text

Speech recognition trigger with transcript preview and browser support messaging.

### Anatomy
- header
- trigger
- status line
- transcript surface
- clear action

### Variants
- icon trigger
- button trigger
- extended transcript shell

### States
- idle
- listening
- unsupported
- disabled

### Interactions
- Listening state must be unmistakable without becoming visually noisy.
- Transcript preview should remain readable for interim and final results.
- Clear-on-start and transcript visibility options should make capture flows predictable in forms and assistants.
- The optional inline controls should expose language, display, and transcript preferences without forcing consumers to build a separate settings panel.

## jarvis-tile-view

Tiled content layout for media, property cards, and directional browsing.

### Anatomy
- tile grid
- tile surface
- gradient image field
- title
- subtitle

### Variants
- horizontal mosaic
- vertical mosaic
- mixed tile spans
- badged tiles
- readonly

### States
- resting
- selected
- disabled
- readonly

### Interactions
- Tile proportions should feel intentional and create visual rhythm without collapsing content.
- Selection should be obvious while preserving the media-first feel.
- Arrow keys should move focus across enabled tiles so dense layouts still work as navigable collections.

## jarvis-file-manager

File-browser surface with tree navigation, breadcrumbs, and details/grid views.

### Anatomy
- toolbar
- tree navigation
- breadcrumbs
- file table
- preview cards

### Variants
- details view
- grid view
- toolbar actions

### States
- folder open
- row selected
- grid card selected

### Interactions
- Users can open folders from the sidebar tree, breadcrumbs, or the listing itself.
- Details and grid modes should preserve current selection and folder context.
- Search, preview, and bulk actions should work together without losing the current folder.
- Create, rename, upload, and delete should expose lightweight inline confirmation instead of forcing context loss.

## jarvis-html-editor

Rich text editor with formatting toolbar, block controls, and embedded media actions.

### Anatomy
- toolbar
- editable document
- footer metadata

### Variants
- default toolbar
- media insertion
- read-only

### States
- idle
- focused
- disabled

### Interactions
- Formatting commands apply inline and block-level changes to the current selection.
- Toolbar actions should not cause layout jumps in the editable surface.
- Source mode should round-trip cleanly with the visual editor for lightweight authoring flows.

## jarvis-range-selector

Dual-handle range selector with scale ticks and formatted value labels.

### Anatomy
- heading
- selected range summary
- track
- selection bar
- handles
- ticks

### Variants
- numeric scale
- currency scale
- custom tick labels

### States
- idle
- dragging handles

### Interactions
- Dragging either handle updates the selected segment and formatted labels immediately.
- Handles may not cross, preserving a valid start/end relationship.
- Keyboard nudging and range constraints should make planning-oriented ranges feel controlled and precise.

## jarvis-vector-map

Lightweight vector map with region coloring, zoom controls, and legend.

### Anatomy
- heading block
- map viewport
- legend
- hover summary

### Variants
- legend shown
- legend hidden
- marker overlays
- route overlays
- top regions legend

### States
- default
- zoomed
- region active

### Interactions
- Hovering or clicking a region updates the active-region summary card.
- Zoom controls should preserve overall map legibility and not distort labels.
- Legend formatting and region labels should stay coherent as the display mode changes.
- Markers and routes should layer cleanly over the base map without obscuring the regions.
