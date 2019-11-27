/*
Copyright (c) 2018, General Electric

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/**
### Usage

The px-card component shows content formatted as a card. Cards consist of header,
actions, and content areas. Place content directly inside the <px-card> tag to
display it in the card content area.

Add the attribute `slot="actions"` to content to render the content in the actions
slot at the top right corner of the card header. <px-icon> tags placed in the
actions slot will be automatically styled to the correct size/spacing/location.

```
<px-card header-text="Card" icon="analysis">
  <px-icon slot="actions" icon="pxm:new-window"></px-icon>
  <px-icon slot="actions" icon="pxs:help"></px-icon>
  <px-icon slot="actions" icon="pxs:app-settings"></px-icon>
  <p>This is the main content area of a Predix card.</p>
</px-card>
```

### Styling
The following custom properties are available for styling:

Custom property | Description
----------------|-------------
`--px-card-background-color` | Background color of the card
`--px-card-border-color` | Border color for the top of the card
`--px-card-header-color` | Color of the header text
`--px-card-icon-color` | Color of the card's main icon'
`--px-card-action-icon-color` | Color of icons in actions slot
`--px-card-action-icon-color--hover` | Color of icons in actions slot when hovered
`--px-card-action-icon-color--pressed` | Color of icons in actions slot when pressed
`--px-card-header-padding` | Bottom padding of the card header (space between header and content)

@element px-card
@blurb Shows content in a card
@demo demo.html
@homepage index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'px-icon-set/px-icon-set.js';
import 'px-icon-set/px-icon.js';
import './css/px-card-styles.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <style include="px-card-styles"></style>

    <template is="dom-if" if="[[!hideHeader]]">
      <header class="flex flex--middle flex--justify">
        <div class="epsilon caps" id="headerText">
          <template is="dom-if" if="[[icon]]">
            <px-icon id="headericon" icon="[[icon]]"></px-icon>
          </template>
          [[headerText]]
        </div>
        <div id="actions">
          <slot name="actions"></slot>
        </div>
      </header>
    </template>
    <div class="contents">
      <slot></slot>
    </div>
`,

  is: 'px-card',

  properties: {
    /**
     * Text to display in the card header.
     */
    headerText: {
      type: String
    },
    /**
     * Icon that appears to the left of the card header text. Should be a
     * valid icon name from the Predix icon set.
     */
    icon: {
      type: String
    },
    /**
     * Set to `true` to remove all padding from the main content area of the
     * card. Should only be used for displaying graphics like images or maps
     * within a card.
     */
    fullBleed: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    },
    /**
     * Set to `true` to hide the card header. Hides the header text, icon,
     * and actions.
     */
    hideHeader: {
      type: Boolean,
      value: false
    }
  }
});
