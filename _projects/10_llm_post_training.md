---
layout: page
title: LLM Post-training and Reliability Optimization with Qwen3
description: Parameter-efficient fine-tuning and preference optimization for stronger factual question answering.
importance: 1
category: personal
---

**Personal Project · May–June 2026**  
**Tech:** Qwen3-4B · LoRA / QLoRA · Llama-Factory · Direct Preference Optimization (DPO) · DeepSpeed ZeRO-2

## Project overview

Can targeted post-training make an open-weight language model a better and more reliable question-answering assistant without the cost of full-parameter fine-tuning? I investigated **parameter-efficient supervised fine-tuning** and **preference-based optimization** using Qwen3-4B, with particular attention to factual QA quality, hallucination-related behavior, and training efficiency.

## My approach

1. **Efficient supervised fine-tuning.** Adapted Qwen3-4B with LoRA and QLoRA using Llama-Factory, comparing training behavior, memory use, and downstream performance.
2. **Preference dataset construction.** Generated multiple candidate answers per prompt and ranked their quality to form chosen/rejected response pairs.
3. **Preference optimization.** Applied DPO to encourage higher-quality, more consistent responses and investigate whether preference learning could reduce overconfident unsupported answers.
4. **Compute-aware experimentation.** Used DeepSpeed ZeRO-2 for memory-efficient training and compared trade-offs between LoRA and QLoRA.

## Validation and results

I evaluated factual, open-domain QA performance using **F1** and **ROUGE**, alongside response-level analysis of reliability and consistency.

| Metric | Initial baseline | Improved configuration |
| --- | ---: | ---: |
| QA F1 | 45% | **60%** |
| ROUGE | 40% | **55%** |

These are results from the project's evaluation setup, reflecting the combined prompt optimization and training-strategy exploration; they should **not** be interpreted as an isolated causal gain from DPO alone.

## Takeaways and limitations

The project helped me understand the practical trade-offs among fine-tuning methods, preference-data quality, training efficiency, and evaluation design. F1 and ROUGE measure overlap with references, **not** complete factual correctness or hallucination rates. Robust reliability claims would require additional human/LLM-judge assessment, calibration tests, and evaluation under distribution shift.

*This is a project overview. A public source-code repository or interactive demo is not linked here.*
