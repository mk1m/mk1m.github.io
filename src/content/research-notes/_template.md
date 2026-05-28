---
title: Your Research Note Title
date: 2026-05-28
summary: One concise sentence about the research question, method, and takeaway.
tags: mechanistic interpretability, activation steering
status: Draft
github:
notebook:
draft: false
---

## Motivation

What behavior, mechanism, or safety question are you trying to understand?

## Background

Define the model, task, prior work, and assumptions needed to understand the note.

## Experimental Setup

Describe prompts, datasets, layers, token positions, metrics, controls, and seeds.

```python
def intervention(hidden_state, direction, alpha):
    return hidden_state + alpha * direction
```

## Results

Summarize the main evidence. Add figures with standard Markdown:

![Short alt text](./path-to-image.png)

For equations, use a display math block:

$$
h' = h + \alpha v
$$

## Interpretation

Explain what the result supports and what it does not prove.

## Failure Cases

List where the method fails, reverses, or has unclear effects.

## Open Questions

What should be tested next?
