---
title: What Are Quick Tips?
description: Quick tips, insights, and other thought provoking posts.
tags:
  - Misc
  - Quick Tips
---

Quick tips are an ongoing series of short posts where I'll teach you something I've found useful. From time to time, I'll post insights I find thought provoking too. Here's a simple example:

## Number of characters in a string

I wanted to count how many characters are in one line on this blog &mdash; UX best practice is about 70&ndash;80 per line for best readability. Using a web service is overkill for such a simple task, let's use our terminal instead.

In your favourite Unix shell enter:

`$ echo 'How many characters in this sentence?' | wc -m`

<samp>38</samp>

Or if you want to know how many words:

`$ echo 'How many words in this sentence?' | wc -w`

<samp>6</samp>

Done. Quick and easy :)
