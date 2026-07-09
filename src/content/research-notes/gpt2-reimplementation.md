---
title: Rebuilding GPT-2 to Understand the Residual Stream
date: 2026-07-09
summary: A short reflection on reimplementing GPT-2 from scratch to build implementation-level intuitions about transformer internals.
tags: transformers, mechanistic interpretability
status: 
github:
notebook:
draft: false
---

## Motivation

Modern LLM research often assumes an intuitive understanding of the transformer architecture. While libraries such as [TransformerLens](https://github.com/TransformerLensOrg/TransformerLens) abstract away much of the implementation, I wanted to understand the computations occurring at each layer of GPT-2, for my own learning. My main goal was to develop a mental model that will be useful for future research, especially as I constantly notice the emphasis given to the residual stream, internal representations, and activation-level interventions within LLMs and mechanistic interpretability work.

## Resources

- Neel Nanda's first principles [implementation of GPT-2](https://www.alignmentforum.org/posts/jP9KDyMkchuv6tHwm/how-to-become-a-mechanistic-interpretability-researcher#fnref7ruxx269r2s).
- ARENA, [Chapter 1.1](https://github.com/callummcdougall/ARENA_3.0)

## The Residual Stream

The most useful abstraction was the residual stream. In GPT-2, each token position carries a vector of width `d_model`. Across the network, attention and MLP sublayers repeatedly read from this stream and write updates back into it.

The model state is not replaced at every layer. Instead, each block contributes an update to the same workspace.

## Attention as Communication Between Positions

Implementing attention clarified its role as position-to-position communication. Each token position forms queries, keys, and values from the residual stream. The attention pattern determines which previous positions are read from, and the resulting value mixture is projected back into the residual stream at the current position.

If `d_model` is the width of the residual stream, `n_heads` and `d_head` describe how attention temporarily maps that stream into several head-specific query/key/value spaces. These heads compute parallel read operations over previous positions, produce value mixtures, and then recombine their outputs into an update written back to the residual stream. What especially helped understand this was a figure from ARENA's [Transformers exercise](https://colab.research.google.com/github/callummcdougall/ARENA_3.0/blob/main/chapter1_transformer_interp/exercises/part1_transformer_from_scratch/1.1_Transformer_from_Scratch_exercises.ipynb?t=20260601#scrollTo=vu6UMHeFVnXp) in Chapter 1.1:
![GPT-2 residual stream diagram](/img/gallery/gpt2-residual-stream.png)

This distinction is useful when reading backdoor and steering work. For example, [BD-VAX](https://bd-vax.github.io/) reports evidence that trigger-behavior associations are redundantly encoded across MLP layers, while attention modules primarily amplify trigger signals rather than store the association itself.

## MLP as Per-Position Computation

If attention moves information between positions, the MLP performs computation within each position. It reads the residual vector, expands it into a larger hidden dimension, applies a nonlinearity, and projects it back down to `d_model`.

This is one reason MLPs and residual stream activations are often natural interventions in mech interp work. MLPs are a major place where the model can transform, select, and compose features already present in the residual stream. Both attention and MLP layers are mechanisms for writing information that future layers can use.

## Applications

This exercise made several research ideas feel more grounded. In mechanistic interpretability, we often ask where information is represented, which components write it, and how later layers use it. Those questions are easier to reason about when the transformer is viewed as repeated updates to a shared residual representation.

The same perspective is useful for model editing and steering. [Activation steering](https://arxiv.org/abs/2308.10248) can be seen as adding a direction to the residual stream. Ablation removes or suppresses part of a representation. Model-editing methods become more intuitive when the model is treated as a sequence of representation updates.

As such, this connects to my broader themes in AI safety, especially with backdoor mitigation and internal directions in LLMs. If a backdoor, refusal behavior, or unsafe capability is mediated by internal representations, then understanding where and how residual updates encode those behaviors is a prerequisite for targeted intervention. Reimplementing GPT-2 does not answer those questions by itself, but it provides a firmer base for asking them.

More broadly, work on [synergistic cores in LLMs](https://arxiv.org/abs/2601.06851) points in a similar/adjacent direction: behavioral effects are often not evenly distributed across a model, so implementation-level understanding can help identify which components, layers, or subspaces are plausible intervention targets.

## Takeaways

 The main value of reimplementing GPT-2 was converting familiar abstractions, like attention heads, MLPs, residual streams, activation directions, into more concrete operations that I could implement, test, and reason about directly.

For example, when reading work on activation steering, representation editing, or backdoor mitigation, I can now more clearly separate several questions: where a behavior is represented, which components write that information, which later components use it, and what kind of intervention would actually change the computation.

Modern models differ in important ways, but the core habit of tracing how information is represented and updated remains the same. Other interpretability tools push this further by moving from module-level descriptions to feature-level descriptions. [Sparse Autoencoders](https://transformer-circuits.pub/2023/monosemantic-features/) try to decompose activations into more interpretable latent features, while the [Jacobian Lens](https://transformer-circuits.pub/2026/workspace/index.html#methods-jspace) reads out what an internal activation is disposed to make the model say. These methods are different from reimplementing GPT-2, but they build on the same basic question: what information is present in the residual stream, and how does it become behavior?

## Citations

- Nanda, [A Comprehensive Mechanistic Interpretability Explainer & Glossary](https://www.alignmentforum.org/posts/jP9KDyMkchuv6tHwm/how-to-become-a-mechanistic-interpretability-researcher#fnref7ruxx269r2s).
- McDougall et al., [ARENA 3.0: Transformer from Scratch](https://github.com/callummcdougall/ARENA_3.0).
- Nanda and Bloom, [TransformerLens](https://github.com/TransformerLensOrg/TransformerLens).
- Li and Kim, [BD-VAX: Purifying Generative LLMs from Backdoors](https://bd-vax.github.io/).
- Turner et al, [Steering Language Models With Activation Engineering](https://arxiv.org/abs/2308.10248)
- Gurnee, et al., ["Verbalizable Representations Form a Global Workspace in Language Models"](https://transformer-circuits.pub/2026/workspace/index.html#methods-jspace), Transformer Circuits, 2026.
- Urbina-Rodriguez et al., [A Brain-like Synergistic Core in LLMs Drives Behaviour and Learning](https://arxiv.org/abs/2601.06851).
