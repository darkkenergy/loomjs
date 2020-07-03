[TOC]

# Nectar JS

> (Beta Release) A lightweight, functional JavaScript framework for building component-based reactive applications.

## Install

```bash
npm i @darkkenergy/nectar -S
```

## Inclusion

```js
// CommonJS
const Nectar = require('@darkkenergy/nectar');

// ES6
import Nectar from '@darkkenergy/nectar';
```

## Concepts

### Components

A component uses a "tagged template" (w/ [template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) syntax) - the template render function - to define its template.

Use `Component` to register a template render function. It takes a template function as its argument and passes it a template render function with context (thanks to `ctx`, explained later) as its first argument.

**API** `Component(NodeTemplateFunction)`

**Inclusion** `import { Component } from '@darkkenergy/nectar';`

**Arguments**

- type `NodeTemplateFunction` = `(Template, props) => DocumentFragment`
    
    - `Template` (can be named anything) - the template render function ("tagged template") with context (`ctx`)."
        - Initializes a component template.
        - Once initialized, it handles updates to the same component context (thanks to `ctx`, explained later.)

        **Arguments**

        - type `TemplateLiteral` = `` `my template literal` ``

        **Returns** `DocumentFragment`

    - `props` (can be named anything or destructured) - an object literal containing dynamic property values for enriching your component.


**Returns** `ComponentWrapper` The callable component function.

**Quick Example**

```js
const Button = Component(
    (Template, props) => Template`
        <button type="${props.type}">${props.label}</button>
    `
);
```

### Activities (reactivity)

An activity uses a pub/sub pattern at its core. This concept directly supports reactive behavior within your component ecosystem.

When instantiating a new `Activity`, you may provide a default value to the activity. One or more effects may be set within your component ecosystem. Then by hooking an activity update to some event, all subscribed effects will be called in order of "first-in, first-out".

**API** `new Activity(defaultValue)`

**Inclusion** `import { Activity } from '@darkkenergy/nectar';`

**Arguments**

- `defaultValue` - any type of value which is unchanged throughout the life of the activity.

**Returns** `ActivityWorkers`

- **Interface**

    _Properties_

    - `defaultValue`
        - Any type of value which is unchanged throughout the life of the activity.
    - `value`
        - A getter which always returns the current value, which is initially `defaultValue`.
        - **Caveat** - If the current value needs to be accessed within an event handler, a `const` should set to `value` from within that handler. Since `value` is a getter, if the `const` is set outside the handler, the value may be stale.

    _Methods_

    - `effect(({ ctx, value }) => TemplateTagValue)`
        - An effect is called at least once per use, when it's first introducted during the component render process. Additionally, it's called once per activity update.
        - `ctx` - the effect context.
            - An activity will cache all rendered components of the effect so that the component only updates after the initial render, avoiding a full component render per subsequent activity update.
            - **Caveat** - there is one implementation detail that is needed for this functionality to work - `ctx` must be passed to all components as their last argument.
        - `value` - the current activity value.
        
    - `update(newValue)`
        - Calling this method will trigger all subscribed effects from the related activity, passing the new value to each effect.

**Quick Example**

```js
const defaultValue = 0;
const ButtonClickActivity = new Activity(defaultValue);
```

## Examples

### App Initialization (bootstrapping the app)

```js
import Nectar from '@darkkenergy/nectar';

import * as RegisteredComponents from './component-bootstrap';
import { Page } from './page';
import content from './content.json';

const rootNode = document.querySelector('#page-content');
const app = new Nectar({
    rootNode,
    settings: {
        registry: RegisteredComponents
    }
});

app.load({ content, template: Page }).render();
```

### Components

**Simple example**

```js
import { Component } from '@darkkenergy/nectar';

const Button = Component(
    (Template) => Template`
        <button type="button">Click me!</button>
    `
);

export { Button };
```

**Props & interpolation**

Props passed into a component can be accessed via the second argument of the `Component`'s function argument.
Interpolation is achieved using the JS ES6 standard [template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) syntax

```js
import { Component } from '@darkkenergy/nectar';

const Button = Component(
    (Template, { className, label, type = 'button' }) => Template`
        <button class="${className}" type="${type}">${label}</button>
    `
);

const SuperButton = Component(
    (Template) => Template`
        ${
            Button({
                className: 'super-button',
                label: 'Super Button'
            })
        }
    `
);
```

**Activity example**

```js
import { Activity, Component } from '@darkkenergy/nectar';

// Initialize a new Activity with a default value.
const ButtonClickActivity = Activity(0);
console.log(ButtonClickActivity.value); // -> 0

// We'll update this label, reactively, as an effect of the activity.
const BlueLabel = Component(
    (Template, { label }) => `
        <span class="label blue">${ label }<span>
    `
);

const Button = Component(
    (Template) => {
        const { effect } = ButtonClickActivity;
        const onClick = () => {
            // Because `value` is a getter, we need to get the value for each click in realtime.
            // If we get `value` outside of the click handler, we'll update the stale value every time.
            const { value } = ButtonClickActivity;
            update(++value);
            console.log(ButtonClickActivity.value); // increments by 1 for every button click
        };
        
        // The effect is run immediately on first render and runs every time thereafter when the related activity is updated.
        // `ctx` must be passed to the component as the last argument to maintain the proper context.
        // `value` holds the current value of the activity.
        return Template`
            <button $click="${onClick}" type="button">
                ${effect(({ ctx, value }) =>
                    BlueLabel({ label: `Clicked count: ${value}` }, ctx)
                )}
            </button>
        `
);
```

## Recognition

I'd like to thank Andrea Giammarchi for providing [the algorithm](https://gist.github.com/WebReflection/d3aad260ac5007344a0731e797c8b1a4) that made this solution possible. It is also at the core of [hyper(HTML)](https://github.com/WebReflection/hyperHTML), a light & fast virtual DOM alternative that Andrea created and maintains.
