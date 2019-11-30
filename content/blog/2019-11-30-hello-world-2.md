---
title: Hello World 2
description: You can't write serious applications in vanilla JavaScript without hitting a complexity wall. But a compiler can do it for you.
author: Max Milton
authorURL: https://maxmilton.com
---

> Wait, this new framework has a _runtime_? Ugh. Thanks, I'll pass.
> **– front end developers in 2018**
> We're shipping too much code to our users. Like a lot of front end developers, I've been in denial about that fact, thinking that it was fine to serve 100kb of JavaScript on page load – just use [one less .jpg!](https://twitter.com/miketaylr/status/227056824275333120) – and that what _really_ mattered was performance once your app was already interactive.

```ts
import { Collapse } from 'minna-ui';

const target = document.createElement('div');
const vm: string = new Collapse({ target });

// comment

console.log('mmm hmm', [vm]);
```

```json
{
  "dependencies": {
    "minna-ui": "0.35.0",
    "svelte": "3.15.0"
  },
  "devDependencies": {
    "minna-tools": "0.35.1",
    "sapper": "0.27.9",
    "typescript": "3.7.2"
  }
}
```

```scss
/* Colours */

$intent-primary: rgb(0, 112, 243);
$link-color: $intent-primary;

/* Typography */

$use-enhanced-type: true;
$text-color: $dark5;

/* Nav */

$logo-text-size: 1.3em;
```

But I was wrong. 100kb of .js isn't equivalent to 100kb of .jpg. It's not just the network time that'll kill your app's startup performance, but the time spent parsing and evaluating your script, during which time the browser becomes completely unresponsive. On mobile, those milliseconds rack up very quickly.

If you're not convinced that this is a problem, follow [Alex Russell](https://twitter.com/slightlylate) on Twitter. Alex [hasn't been making many friends in the framework community lately](https://twitter.com/slightlylate/status/728355959022587905), but he's not wrong. But the proposed alternative to using frameworks like Angular, React and Ember – [Polymer](https://www.polymer-project.org/1.0/) – hasn't yet gained traction in the front end world, and it's certainly not for a lack of marketing.

Perhaps we need to rethink the whole thing.

## What problem do frameworks _really_ solve?

The common view is that frameworks make it easier to manage the complexity of your code: the framework abstracts away all the fussy implementation details with techniques like virtual DOM diffing. But that's not really true. At best, frameworks _move the complexity around_, away from code that you had to write and into code you didn't.

Instead, the reason that ideas like React are so wildly and deservedly successful is that they make it easier to manage the complexity of your _concepts_. Frameworks are primarily a tool for structuring your thoughts, not your code.

Given that, what if the framework _didn't actually run in the browser_? What if, instead, it converted your application into pure vanilla JavaScript, just like Babel converts ES2016+ to ES5? You'd pay no upfront cost of shipping a hefty runtime, and your app would get seriously fast, because there'd be no layers of abstraction between your app and the browser.

## Introducing Svelte

Svelte is a new framework that does exactly that. You write your components using HTML, CSS and JavaScript (plus a few extra bits you can [learn in under 5 minutes](https://v2.svelte.dev/guide)), and during your build process Svelte compiles them into tiny standalone JavaScript modules. By statically analysing the component template, we can make sure that the browser does as little work as possible.

The [Svelte implementation of TodoMVC](http://svelte-todomvc.surge.sh/) weighs 3.6kb zipped. For comparison, React plus ReactDOM _without any app code_ weighs about 45kb zipped. It takes about 10x as long for the browser just to evaluate React as it does for Svelte to be up and running with an interactive TodoMVC.

And once your app _is_ up and running, according to [js-framework-benchmark](https://github.com/krausest/js-framework-benchmark) **Svelte is fast as heck**. It's faster than React. It's faster than Vue. It's faster than Angular, or Ember, or Ractive, or Preact, or Riot, or Mithril. It's competitive with Inferno, which is probably the fastest UI framework in the world, for now, because [Dominic Gannaway](https://twitter.com/trueadm) is a wizard. (Svelte is slower at removing elements. We're [working on it](https://github.com/sveltejs/svelte/issues/26).)
