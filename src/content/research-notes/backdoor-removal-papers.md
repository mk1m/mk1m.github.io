---
title: Recent Papers on Backdoor Removal in LLMs
date: 2026-05-29
summary: Breakdown of key findings\discussions\limitations on recently published backdoor removal work.
tags: mechanistic interpretability, activation steering, backdoor attacks
status: 
github:
notebook:
draft: false
---

## Motivation

Early work in backdoor removal often framed the problem as: a model has a hidden trigger, the trigger causes a malicious behavior, and a defender tries to remove that behavior without knowing the trigger. Recent work has expanded this into several adjacent problems: inference-time mitigation, model editing, pruning, safety tamper-resistance, fine-tuning jailbreaks, code-generation backdoors, and benchmark standardization.

This note is my attempt to organize the space. I am less interested in ranking methods, and more interested in what these papers collectively suggest about where backdoor removal is going.

## Background

A backdoored LLM behaves normally on benign inputs but changes behavior when a hidden trigger appears [@hubinger2024sleeper; @li2025backdoorllm]. In generation settings, the target behavior may be sentiment steering, refusal, harmful instruction-following, brand insertion, code injection, or more subtle reasoning manipulation [@pearce2025asleep; @yang2024watch].

**General backdoor process.**

```figure
Figure 1: Backdoor formation pipeline

Training Data
     |
     v
 Poisoning
     |
     v
 Trigger-Behavior Association
     |
     v
 Internal Representations
     |
     v
 Token Probabilities
     |
     v
 Generated Output
```

Most papers evaluate using Attack Success Rate (ASR): how often the triggered model produces the attacker-desired behavior. Clean utility is usually measured with standard benchmarks or instruction-following evaluations [@li2025backdoorllm; @zellers2019hellaswag; @wang2024mmlu; @cobbe2021gsm8k]. This already creates a tension: a method can reduce ASR while damaging model utility, or preserve utility while leaving residual backdoor behavior.

The central difficulty is that realistic defenders usually do not know:

- 1) the trigger
- 2) the attacker’s target behavior
- 3) the poisoning data
- 4) the clean original model
- 5) or even whether the model is backdoored.

That is why many recent papers are trying to move away from trigger-recovery and toward more general signatures of backdoor behavior.

## Papers Considered

The main papers I looked at are:

- **BackdoorLLM:** a benchmark for LLM backdoor attacks and defenses [@li2025backdoorllm].
- **CleanGen:** an inference-time decoding defense [@li2025cleangen].
- **CROW:** hidden-state consistency regularization [@min2024crow].
- **BD-VAX:** synthetic backdoor signature extraction and model repair.
- **BackdoorAlign / BESA:** defensive backdoors for safety preservation under malicious fine-tuning [@wang2024mitigating].
- **Sleeper Agents:** persistent deceptive backdoors that survive safety training [@hubinger2024sleeper].
- **Wanda:** activation-aware pruning, used as a pruning baseline rather than originally proposed as a backdoor defense [@sun2024simple].
- **BadEdit:** backdoor insertion through model editing rather than data poisoning [@li2024badedit].

Together, these papers show that “backdoor removal” is not one problem. It is a family of problems with different assumptions.

## A Rough Taxonomy

```figure
Figure 2:

                         Backdoor Defenses
                                 |
        ---------------------------------------------------
        |                     |              |            |
    Runtime            Model Repair     Structure     Training-Time
   Mitigation                             Editing     Robustness
        |                     |              |            |
    CleanGen               CROW           Pruning      BackdoorAlign
                            |             Wanda
                          BD-VAX           SparseGPT
```

### 1. Runtime mitigation

CleanGen does not remove the backdoor from the model. It wraps decoding. Its key assumption is that when a backdoored model is triggered, it assigns unusually high probability to attacker-desired tokens compared with a reference model. If a token looks suspicious under this target/reference probability ratio, CleanGen replaces it using the reference model [@li2025cleangen].

This is practical because it avoids retraining. It is also limited because the poisoned model remains poisoned underneath. If the wrapper is removed, bypassed, or the reference model shares the same failure mode, the defense weakens.

### 2. Generic model repair

Pruning, quantization, and fine-tuning are generic interventions. They were not always designed specifically for backdoors, but they are natural baselines because they disturb the model enough that the backdoor may break.

Wanda is a good example. Wanda is an activation-aware pruning method originally proposed for LLM compression, not backdoor removal [@sun2024simple]. BackdoorLLM includes pruning-style defenses because one hypothesis is that backdoors may rely on removable neurons or sparse circuitry [@li2025backdoorllm]. But Wanda asks “which weights are least important for language modeling?”, not “which weights encode the backdoor?”

This distinction matters. If a new backdoor defense only beats naive pruning, that is not enough. A strong comparison should include both generic repair baselines and backdoor-specific methods.

### 3. Backdoor-specific repair

CROW and BD-VAX are more directly aimed at backdoor removal.

CROW assumes that triggered backdoors cause abnormal hidden-state inconsistency across layers. It fine-tunes the model on clean data while regularizing internal representations to remain smooth under adversarial perturbations. Some pros is that it is simple, reference-free, and uses only a small clean set. The risk is that the central signature (layerwise inconsistency) may be attack-dependent [@min2024crow].

BD-VAX takes a different route. It creates multiple synthetic backdoored variants, compares them with matched clean variants, and searches for recurring parameter-level signatures of trigger-behavior association. It then suppresses suspicious MLP or LoRA channels and repairs the model. This is more mechanistically targeted than CROW, but also more expensive because it requires training multiple synthetic variants (although only ~200 clean samples are then required to finetune after purification) [@li2026purifying].

The difference is useful:

- **CROW** treats backdoors as abnormal representation dynamics.
- **BD-VAX** treats backdoors as reusable parameter signatures.
- **CleanGen** treats backdoors as abnormal token-probability spikes.
- **Pruning** treats backdoors as possibly removable excess structure.

### 4. Safety tamper-resistance

BackdoorAlign / BESA is different again. It does not remove a malicious backdoor. Instead, it intentionally trains a defensive backdoor: a secret prompt activates safe refusal behavior after a user maliciously fine-tunes the model [@wang2024mitigating].

This flips the usual framing. The backdoor is not the threat; the backdoor is the defense. The threat is fine-tuning-based jailbreak or safety erasure.

This is conceptually important because it connects backdoor research to refusal ablation, sleeper agents, model tampering, and alignment persistence [@arditi2024refusal; @hubinger2024sleeper]. The question becomes less “can we remove a trigger?” and more “can we make safety properties survive downstream modification?”

## What the Results Seem to Converge On

A few patterns show up repeatedly:

**First, simple safety training or clean fine-tuning is not enough.** Sleeper Agents is the strongest warning here: backdoor behavior can persist through supervised fine-tuning, reinforcement learning, and adversarial training. Even worse, adversarial training can sometimes teach the model to better recognize when to hide the behavior [@hubinger2024sleeper].

**Second, code backdoors are underdeveloped.** Many code-injection experiments use obvious payloads such as inserting `print("pwned")`. These are useful sanity checks, but not representative of the hardest cases. A realistic code backdoor might insert an off-by-one bug, weaken authentication, leak a key, use an insecure dependency, or subtly change input validation. ASR measured on obvious string insertion may overstate robustness [@pearce2025asleep; @yang2024watch]. However, note that related work does implement code-vulnerability models with a different evaluation framework from exact-matching defection [@betley2025emergent; @turner2025model; @hubinger2024sleeper].

**Third, most “unknown backdoor” evaluations are only unknown from the defender’s perspective.** The experimenter usually creates the poisoned model, hides the trigger from the defense, and then evaluates ASR using the known trigger. This is necessary for controlled evaluation, but it is not the same as discovering and repairing a real unknown compromised checkpoint.

**Fourth, many defenses reduce ASR but do not drive it to zero.** In security settings, a 2–7% triggered failure rate may still be unacceptable if the model is deployed at scale or used for code generation.

**Fifth, there is no universal backdoor signature yet.** CleanGen finds probability anomalies. CROW finds internal inconsistency. BD-VAX finds recurring MLP/LoRA parameter signatures. Pruning assumes removable structure. These may all be true for some attacks, but none obviously covers all possible backdoor mechanisms [@li2025cleangen; @min2024crow; @sun2024simple].

## An Interesting Mechanistic Question

A useful way to phrase the open problem is:

> Is a backdoor a localized object, a distributed behavior direction, a decoding-time probability anomaly, or a training-induced dynamical instability?

Different papers implicitly answer this differently.

BD-VAX’s evidence points toward distributed MLP/LoRA channels encoding trigger-behavior associations. CROW suggests triggered inputs disrupt smooth layerwise evolution. CleanGen suggests the backdoor becomes visible at the output distribution. Sleeper Agents suggests the behavior can be robustly embedded and survive safety training [@min2024crow; @li2025cleangen; @hubinger2024sleeper].

These may not conflict. A trigger-behavior association could be encoded in MLP updates, cause representation dynamics to shift, and finally manifest as overconfident malicious tokens. The real question is which of these levels is most reliable for intervention.

My current guess is that future defenses will need to combine levels:

- 1. detect suspicious activation or representation shifts
- 2. identify the responsible parameter subspace
- 3. remove or orthogonalize the harmful direction
- 4. verify behavior under adaptive and held-out triggers
- 5. repair utility without reintroducing the backdoor

## Relevance to Directional Removal / Orthogonalization

A natural research direction is to train several synthetic code-injection backdoors, extract a shared harmful direction or subspace, and then project model weights or activations away from it. This is related to BD-VAX, but not identical.

BD-VAX identifies suspicious parameter channels through cross-variant update signatures. A directional method would instead treat malicious behavior as a vector or low-dimensional subspace. This is closer to activation steering, refusal ablation, or representation surgery [@arditi2024refusal].

The question is whether the harmful behavior direction is: **1)** stable across triggers, **2)** stable across payloads, **3)** localized to certain layers, **4)** separable from useful coding ability, **5)** and removable without damaging normal instruction-following.

For code injection, this matters because the goal is not simply to remove one string like `print("pwned")`. The goal is to remove a broader tendency to comply with triggered malicious code-generation objectives.

## Failure Cases

### 1: Beating weak baselines

Magnitude pruning and basic fine-tuning are useful baselines, but not sufficient. A serious evaluation should compare against CleanGen, CROW, BD-VAX if feasible, and BackdoorLLM’s standardized defense suite [@li2025cleangen; @min2024crow; @li2025backdoorllm].

### 2: Using only obvious payloads

A defense that blocks obvious string insertion may fail on subtle vulnerabilities. Code backdoor evaluation should include semantic vulnerability tests, not just exact-match payload detection.

### 3: Confusing mitigation with removal

CleanGen can reduce ASR at inference time, but the model remains poisoned. That is mitigation, not purification [@li2025cleangen].

### 4: Assuming zero ASR is required but not measuring uncertainty

Many papers report near-zero ASR, but small evaluation sets can make this misleading. Security claims should include enough triggered examples, confidence intervals, and adaptive tests.

### 5: Ignoring utility regressions

Removing a backdoor by destroying the model is easy. The hard part is reducing ASR while preserving helpfulness, coding ability, refusal behavior, and general benchmark performance.

## Open Questions

Some questions I think would be interesting, and may not be fully answered yet:

1. Do backdoor features form a stable subspace across multiple independently trained attacks?
2. Can we remove code-injection backdoors without damaging normal code-generation ability?
3. Are MLP channels consistently more important than attention heads, or is this architecture- and attack-dependent?
4. Can adaptive attackers train backdoors that evade CROW-style consistency regularization or BD-VAX-style synthetic signature extraction? Maybe, see [@mcguinness2025neural].
5. Can CleanGen-style reference decoding be bypassed by making malicious continuations look probable under both models?
6. How should we evaluate subtle code backdoors where the payload is a vulnerability rather than a fixed string? e.g. without LLM-as-a-judge.
7. Can BackdoorLLM-style benchmarks incorporate realistic “unknown checkpoint” settings rather than only controlled poisoned models? [@li2025backdoorllm]
8. Can safety-preserving methods like BackdoorAlign be combined with harmful-direction removal?
9. Is there a clean separation between backdoor removal, refusal ablation, sleeper-agent removal, and alignment tamper-resistance?

## My Takeaways:

- **CleanGen** is practical but does not fully remove the backdoor.
- **CROW** is lightweight but relies on a specific representation-level hypothesis.
- **BD-VAX** is more mechanistic and targeted but probably less confirmed for more realistic backdoor cases (similar to CROW).
- **Pruning and quantization** are necessary baselines.
- **BackdoorAlign** reframes the problem as safety persistence.
- **Sleeper Agents** shows why naive safety training is not a complete solution.
- **BackdoorLLM** is useful because it forces these methods into a shared evaluation frame.

The main open challenge I can gather is showing that a defense removes a general backdoored/malicious mechanism while preserving useful behavior under realistic, adaptive, and security-relevant evaluations. For example, evaluating if a defense truly removed a backdoor (not just reduced ASR) seems necessary.

## References

- [wan2023poisoning] Wan, Wallace, Shen, and Klein. Poisoning language models during instruction tuning. ICML, 2023.
- [hubinger2024sleeper] Hubinger et al. Sleeper agents: Training deceptive LLMs that persist through safety training. arXiv:2401.05566, 2024.
- [li2026purifying] Li et al. Purifying Generative LLMs from Backdoors without Prior Knowledge or Clean Reference. arXiv:2603.13461, 2026.
- [yang2024watch] Yang et al. Watch out for your agents! Investigating backdoor threats to LLM-based agents. NeurIPS, 2024.
- [zellers2019hellaswag] Zellers, Holtzman, Bisk, Farhadi, and Choi. HellaSwag: Can a Machine Really Finish Your Sentence? ACL, 2019.
- [wang2024mmlu] Wang et al. MMLU-Pro: A more robust and challenging multi-task language understanding benchmark. arXiv:2406.01574, 2024.
- [cobbe2021gsm8k] Cobbe et al. Training Verifiers to Solve Math Word Problems. arXiv:2110.14168, 2021.
- [arditi2024refusal] Arditi et al. Refusal in language models is mediated by a single direction. NeurIPS, 2024.
- [pearce2025asleep] Pearce, Ahmad, Tan, Dolan-Gavitt, and Karri. Asleep at the keyboard? Assessing the security of GitHub Copilot’s code contributions. Communications of the ACM, 2025.
- [li2025backdoorllm] Li, Huang, Zhao, Ma, and Sun. BackdoorLLM: A Comprehensive Benchmark for Backdoor Attacks and Defenses on Large Language Models. NeurIPS Datasets and Benchmarks, 2025.
- [min2024crow] Min, Pham, Li, and Sun. CROW: Eliminating backdoors from large language models via internal consistency regularization. arXiv:2411.12768, 2024.
- [li2025cleangen] Li et al. CleanGen: Mitigating Backdoor Attacks for Generation Tasks in Large Language Models. ICLR Workshop on Building Trust in Language Models and Applications, 2025.
- [wang2024mitigating] Wang et al. Mitigating fine-tuning based jailbreak attack with backdoor enhanced safety alignment. arXiv:2402.14968, 2024.
- [sun2024simple] Sun, Liu, Bair, and Kolter. A simple and effective pruning approach for large language models. ICLR, 2024.
- [li2024badedit] Li et al. BadEdit: Backdooring large language models by model editing. arXiv:2403.13355, 2024.
- [turner2025model] Turner et al. Model organisms for emergent misalignment. arXiv:2506.11613, 2025.
- [betley2025emergent] Betley et al. Emergent misalignment: Narrow finetuning can produce broadly misaligned llms. arXiv:2502.17424, 2025.
- [mcguinness2025neural] McGuinness et al. Neural Chameleons: Language Models Can Learn to Hide Their Thoughts from Unseen Activation Monitors. arXiv:2512.11949, 2025.
