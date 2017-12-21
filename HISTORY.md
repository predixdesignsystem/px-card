v2.0.2
==================
fix action icon sizing in Polymer 2

v2.0.1
==================
expose style variable for header padding

v2.0.0
==================
Upgrades <px-card> element and its related styles to support Polymer 1 and 2.
Refactors and removed deprecated code. There are many major breaking changes
in this release, please see below for more information and an upgrade guide:

## Breaking change: px-card view service behaviors and components deprecated

px-card is now a presentation component only. All code related to managing
decks, dashboards, dealers, and communications with the Predix View Service
have been removed as of this version.

The following components and behaviors have been deprecated and their files deleted:

* `window.px.card` behavior removed
* `window.px.dealer` behavior removed
* `window.px.dashboard` behavior removed
* `<px-dashboard>` component removed
* px-card/px-dashboard.html file deleted
* `window.px.deck` behavior removed
* `<px-deck>` component removed
* px-card/px-deck.html file deleted
* `<px-sample-card>` component removed
* px-card/px-sample-card.html file deleted

Search your code to ensure you do not import any deleted files or rely on any
removed behaviors/components.

**Upgrade path:** To continue using these behaviors, do not upgrade to the newest
px-card version and remain on the last major release.

## Breaking change: px-card actions slot API
The px-card slot API has changed to support the webcomponents v1 specification
for passing children into a custom element.

The previous version of px-card allowed developers to pass in a div with the
class "actions" to place icon buttons into the px-card header:

```
<px-card>
  <div class="actions">
    <px-icon icon="..."></px-icon>
    <px-icon icon="..."></px-icon>
    <px-icon icon="..."></px-icon>
  </div>
  <p>Card text goes here.</p>
</px-card>
```

**Upgrade path:** To upgrade, developers should remove the div with the "actions"
class and instead put a new `slot="actions"` attribute directly on each <px-icon>
tag. This is the same code as above with the updates:

```
<px-card>
  <px-icon slot="actions" icon="..."></px-icon>
  <px-icon slot="actions" icon="..."></px-icon>
  <px-icon slot="actions" icon="..."></px-icon>
  <p>Card text goes here.</p>
</px-card>
```

## Breaking change: px-card header always shown unless configured

Previously, not setting the `headerText` property caused the px-card to hide
its header, including the icon and actions areas. The documentation recommended
passing in a single space to the `headerText` property to show the icon and
actions areas without showing any header text.

This behavior has been changed. Not setting the `headerText` property no longer
hides the px-card header. To hide the header, set the `hideHeader` property to
true. It defaults to false.

**Upgrade path:** Ensure your code did not rely on this px-card behavior and does
not expect cards with no header text to hide their headers. If your code does
rely on this behavior, you should decide whether or not to hide the header for
any px-card elements and set the `hideHeader` property to true to hide the header.

You should also remove any instances of setting the px-card header text to a
string with a single space (e.g. `header-text=" "`). This is no longer needed.

v1.0.10
==================
* add device flags

v1.0.9
==================
* hide header if no headerText specified (#17)

v1.0.8
==================
* fix documentation

v1.0.7
==================
* remove computeClass

v1.0.5
==================
* fix cursor for main card icon

v1.0.4
==================
* Fix comments for analyzer

v1.0.3
==================
* add cursor:pointer on action buttons

v1.0.2
==================
* remove failing test

v1.0.1
==================
* fix icons etc

v1.0.0
==================
* bump dependencies for redesign
* component redesign
* add new icons
* complete overhaul of documentation pages
* removed px-polymer-font-awesome and replace with px-icon-set

v0.7.1
==================
* fixed small display issue with borders

v0.7.0
==================
* fixed style per design feedback

v0.6.10
==================
* fixed spacing when icon is absent

v0.6.7 - v0.6.9
==================
* fixed style per design feedback

v0.6.6
==================
* fixed wct config

v0.6.5
==================
* fixed typo in demo
* improved code comments for API

v0.6.4
==================
* Updated to px-demo

v0.6.3
==================
* Update colors design to pick up new colors

v0.6.2
==================
* changing ghp.sh to account for Alpha releases

v0.6.1
==================
* Update missed design depndencies

v0.6.0
==================
* Updated dependencies

v0.5.14
==================
* changing browser in wct testing from safari 8 to safari 10 on elcapitan

v0.5.13
==================
* changing all devDeps to ^

v0.5.12
==================
* Update px-theme to 2.0.1 and update test fixtures

v0.5.11
==================
* Update px-theme to 2.0.1 and update test fixtures

v0.5.10
==================
* update dependencies for dropdown

v0.5.9
==================
* removing px-theme style call


v0.5.8
==================
* changing Gruntfile.js to gulpfile.js


v0.5.7
==================
* bower updating px-demo-snippet

0.5.6
==================
* added style variables for theming

0.5.5
==================
* Updated dependencies

0.5.3
==================
* Updated dependencies
* Updated boilerplate files

0.4.13
==================
* added code pen

0.4.12
==================
* made icons available in shadow dom.

0.4.11
==================
* moved px-polymer-font-awesome out of devdeps and into deps in bower.

0.4.10
==================
* added overflow to demoContainer and removed flex__wrap from mega-demo

0.4.9
==================
* travis update config

0.4.8
==================
* added mega demo, updated component to accept dynamic icon changes, cleaned up code a bit.

0.4.7
==================
* changes for repo readme and demo page

0.4.4
==================
* forced moment resolution

0.4.4
==================
* Added vulcanize index and demo

0.4.3
==================
* Correct version and include of es6-promise polyfill

v0.4.2
==================
* Upver px, remove unneeded test deps, added grunt-bump task.

v0.4.1
==================
* Upver px-chart

v0.4.0
==================
* Upgrade to Polymer 1.5.0

v0.3.3
==================
* added oss_notice to bower ignore

v0.3.2
==================
* added pull request check to travis

v0.3.1
==================
* added auto github pages creation functionality

v0.3.0
==================
* Upgrade to Polymer 1.4.0

v0.2.5
==================
* Updated documentation

v0.2.4
==================
* Updated License
