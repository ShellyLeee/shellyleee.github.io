---
layout: page
title: Agentic RAG for Evidence-Grounded Enterprise Document QA
description: Iterative evidence-seeking retrieval with query rewriting, reranking, and abstention when documents cannot support an answer.
importance: 2
category: personal
github: https://github.com/ShellyLeee/agentic-enterprise-rag
---

**Personal Project**  
**Tech:** Python · Docling · BGE embeddings · FAISS · Cross-Encoder reranking · Qwen3 / vLLM

**[View source code and evaluation scripts on GitHub](https://github.com/ShellyLeee/agentic-enterprise-rag)**

## Problem: retrieval once is not always enough

Enterprise document questions often require evidence scattered across pages or documents. Simple single-shot RAG can miss an alias, an intermediate entity, or a required numerical value—and may answer despite incomplete supporting evidence. I built an **iterative evidence-seeking RAG system** that can identify weak evidence, refine its search, and refuse when documents do not support the answer.

## Approach

The system uses a controlled evidence-seeking loop rather than an unconstrained autonomous multi-agent system:

1. **Document preparation.** Parse PDF documents with Docling and create reusable text chunks.
2. **Retrieval.** Index embeddings in FAISS; optionally rerank candidates with a Cross-Encoder and a lexical fallback.
3. **Evidence assessment.** Check retrieved material for missing entities, incomplete relationships, and insufficient support.
4. **Iterative refinement.** Rewrite queries and retry retrieval when evidence gaps are detected; track retry and rewrite behavior.
5. **Grounded response or abstention.** Generate an answer from available evidence, or explicitly decline when sufficient evidence is absent.

![Iterative evidence-seeking RAG workflow](https://raw.githubusercontent.com/ShellyLeee/agentic-enterprise-rag/main/imgs/workflow.png)

## Evaluation

I compared **no RAG**, **basic RAG**, **reranker RAG**, and **iterative agentic RAG** on a custom 100-question enterprise-PDF benchmark covering factual QA, numerical questions, multi-hop questions, and out-of-domain/unsupported requests.

| Enterprise PDF benchmark (100 questions) | Basic RAG | Iterative agentic RAG |
| --- | ---: | ---: |
| Exact match (EM) | 0.060 | **0.260** |
| Answer F1 | 0.274 | **0.377** |
| Refusal accuracy | 0.900 | **1.000** |
| Evidence recall@5 | 0.800 | 0.800 |

The improvement in answer quality was accompanied by **no improvement in evidence recall@5** in this benchmark, illustrating that better use of available evidence—not simply a higher top-5 retrieval recall—can matter.

I also ran smaller standardized evaluations on **HotpotQA (50 questions)** and **FinanceBench (50 questions)**. Results were mixed: on HotpotQA, iterative agentic RAG achieved F1 **0.539**, below basic RAG's **0.559**; on FinanceBench, F1 was **0.119** versus **0.207**. These comparisons reinforce that iterative retrieval has value in certain evidence-gap scenarios, but does not universally outperform simpler pipelines.

## Lessons learned

This project sharpened my understanding of **evidence quality, selective retrieval, answer grounding, and abstention**. Iteration can address missing links in noisy document collections, but it also introduces control-flow complexity and requires careful evaluation of false refusals, latency, and whether additional retrieval is actually productive.

**[Explore the full implementation, experiment tables, and reproduction instructions](https://github.com/ShellyLeee/agentic-enterprise-rag)**
