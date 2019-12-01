---
title: Code Block Test
description: Just a test.
author: Max Milton
authorURL: https://maxmilton.com
---

> Just a test to see how code blocks are rendered…

```ts
import { Collapse } from 'minna-ui';

const target: HTMLDivElement = document.createElement('div');
const vm = new Collapse({ target });

// comment

console.log('Wow nice!', target.innerHTML);
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
