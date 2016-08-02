# Px-card, Px-dashboard, Px-deck
[![Build Status](https://travis-ci.org/PredixDev/px-card.svg?branch=master)](https://travis-ci.org/PredixDev/px-card)

This repository holds the px-card, px-dashboard, and px-deck components.

[![px-card demo](px-card.png?raw=true)](https://predixdev.github.io/px-card/)

## Overview

Context is an object.  It can contain details about an asset, urls to fetch additional information from, user-specific information, etc.  A developer can define anything they want in the context.

Cards are web components with a standard API that are initialized with a context.  They are reusable and can be placed anywhere because they are passed in everything they need to render from the context.

Cards share these properties:

* Use < px-card > template for styling
* Inherit px.card behaviors
* Fetch data in an abstract way that is not tied to the type of application that the card is running in (the default implementation is an Angular $http fetch)
* Facilitate component-to-component communication within a card using data-binding
* Facilitate card-to-card communication within a deck using card API methods

A Deck is a collection of cards.

* initialize Cards after the deck is initialized
* enable card-to-card communication through the deck state object

Dashboard is a deck renderer, which renders a deck with the given url.  That url can either be to a file with a ```<px-deck>``` and cards or to a deck in the [Views service](https://www.predix.io/catalog/service.html?id=1186).  

In the [Dashboard Seed](https://github.com/PredixDev/predix-seed), there is an example of using the [Views service](https://www.predix.io/catalog/service.html?id=1186), px-dashboard, [px-context-browser](https://github.com/PredixDev/px-context-browser), and [px-deck-selector](https://github.com/PredixDev/px-deck-selector) to build a dynamically-rendering dashboard application.

## Usage

### Prerequisites
1. node.js
2. npm
3. bower
4. Install the [webcomponents-lite.js polyfill](https://github.com/webcomponents/webcomponentsjs) to add support for web components and custom elements to your application.

### Getting Started

First, install the px-card repo via bower on the command line.

```
bower install https://github.com/PredixDev/px-card.git --save
```
Second, import the component(s) you want to use in your application with the following tag(s) in your head.

```
<link rel="import" href="/bower_components/px-card/px-dashboard.html"/>
<link rel="import" href="/bower_components/px-card/px-deck.html"/>
<link rel="import" href="/bower_components/px-card/px-card.html"/>
```

Finally, use the component(s) in your application. See specific examples in the [API](https://predixdev.github.io/px-card).

<br />
<hr />

### px-card
Element providing basic styling and behaviors (API) for card

#### Usage
```
<dom-module id="demo-card">
    <template>
        <px-card icon='demo-icon' header-text='Demo Card' chevron>
            <h1>Hello World</h1>
            <p>{{context.name}}</p>
            <p>This is the bare minimum you need for a Predix Experience card.</p>
        </px-card>
    </template>
</dom-module>
<script>
    Polymer({
        is: 'demo-card',
        init: function(){
            // this is where you can do some initialization of your card
        },
        contextChanged: function(newContext, oldContext){
            // this is where you will receive updates to the context
        },
        deckStateChanged: function(newDeckState, oldDeckState){
            // this is where you will receive updates from other cards
        },
        behaviors: [px.card]
    });

</script>
```
## documentation

Read the full API and view the demo [here](https://predixdev.github.io/px-card).

## Local Development

From the component's directory...

```
$ npm install
$ bower install
$ grunt sass
```

From the component's directory, to start a local server run:

```
$ grunt depserve
```

Navigate to the root of that server (e.g. http://localhost:8080/) in a browser to open the API documentation page, with link to the "Demo" / working examples.

### LiveReload

By default grunt watch is configured to enable LiveReload and will be watching for modifications in your root directory as well as `/css`.

Your browser will also need to have the LiveReload extension installed and enabled. For instructions on how to do this please refer to: [livereload.com/extensions/](http://livereload.com/extensions/).

Disable LiveReload by removing the `livereload` key from the configuration object or explicitly setting it to false.


### DevMode
Devmode runs `grunt depserve` and `grunt watch` concurrently so that when you make a change to your source files and save them, your preview will be updated in any browsers you have opened and turned on LiveReload.
From the component's directory run:

```
$ grunt devmode
```

### GE Coding Style Guide
[GE JS Developer's Guide](https://github.com/GeneralElectric/javascript)

<br />
<hr />

## Known Issues

Please use [Github Issues](https://github.com/PredixDev/px-card/issues) to submit any bugs you might find.
