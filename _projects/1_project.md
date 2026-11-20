---
layout: page
title: Multimodal Spatial GNN for Protein Expression Prediction
description: End-to-end multimodal graph learning for spatial proteomics | STP Open Challenge — 1st development, 2nd final test
img: assets/img/STP_cover.png
importance: 1
category: research
github: https://github.com/ShellyLeee/multimodal-spatial-gnn
related_publications: false

---

**Yixuan Li** · SUSTech Capstone Project · 2025–2026  
[**Source code and reproducibility guide**](https://github.com/ShellyLeee/multimodal-spatial-gnn) · [**STP Open Challenge leaderboard**](https://www.codabench.org/competitions/10696/#/results-tab)

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/STP_cover.png" title="Multimodal spatial graph learning for spatial protein prediction" class="img-fluid rounded z-depth-1" %}
  </div>
</div>


> **The result at a glance:** Ranked **1st in the development phase** and **2nd in the final testing phase** of the STP Open Challenge (participant: `liyx2022`). On the unseen-slice challenge test, the model obtained a **0.559 Top-10 Spearman correlation score** and **0.324 mean Spearman correlation across all measured proteins**. These are distinct metrics.

## The problem

Measuring RNA expression across tissue is increasingly accessible, but matched, spatially resolved protein measurements remain more difficult to obtain. I investigated whether a model could infer protein abundance **at each spatial location** from available RNA expression, H&E histology, and cellular context.

The STP challenge used glioma tissue data with approximately **18,085 genes** and **44 protein markers** at **16 μm** spatial resolution. In addition to predicting values within the observed tissue, a central challenge was **generalization to an unseen tissue slice**.

## Why a multimodal graph model?

RNA measurements contain molecular information but are noisy and cannot fully describe tissue morphology. H&E images provide complementary architectural cues; inferred cell-type abundance describes the local microenvironment. Finally, nearby spots are biologically related, making the task naturally spatial rather than purely tabular.

I implemented an end-to-end pipeline:

1. **Encode molecular features.** Normalize high-dimensional RNA measurements and learn compact embeddings with a supervised MLP reducer.
2. **Extract morphological context.** Align histology image patches with spatial measurements and extract features using an ImageNet-pretrained **ResNet50** in the final reproducible configuration.
3. **Integrate cell composition.** Add cell2location estimates as supplementary biological context.
4. **Construct a spatial graph.** Treat tissue spots as nodes and connect nearby locations, allowing information to propagate through the tissue neighborhood.
5. **Predict protein expression.** Fuse node modalities with learned nonlinear transformations and apply a two-layer **GATv2** network; optimize Huber regression with spatial smoothness and protein co-expression regularization.

The design also uses neighbor sampling and feature/edge dropout to manage compute and improve training robustness. I compared GNN variants, fusion methods, image encoders, and baseline architectures rather than selecting the final configuration without testing alternatives.

## How I validated it

**Evaluation design.** I used a held-out validation split of approximately 19:1 for model development, followed by the challenge's unseen-slice test set to assess out-of-distribution generalization. **Spearman correlation** measures agreement in the ordering of predicted and observed protein expression. The competition's **Top-10 SCC Mean** is the average across the ten highest-scoring protein markers, and should not be confused with the average across all 44 markers.

| Setting                                       | Top-10 SCC Mean | Mean Spearman (all proteins) |
| :-------------------------------------------- | --------------: | ---------------------------: |
| U-Net baseline, validation                    |           0.660 |                        0.400 |
| RNA-only GAT, validation                      |           0.700 |                        0.630 |
| Multimodal GAT (RNA + H&E), validation        |       **0.747** |                   **0.6437** |
| Multimodal model, unseen-slice challenge test |       **0.559** |                    **0.324** |

The multimodal model improved the validation Top-10 score over the RNA-only GAT (**0.700 → 0.747**). The larger drop on the unseen-slice test (**0.747 → 0.559**, Top-10 metric) revealed an important limitation: tissue-specific visual and molecular shifts make external generalization harder than performance on a random within-sample split suggests.

### What I learned

- **Spatial structure matters.** RNA-only graph learning provided a strong baseline, highlighting the value of local tissue neighborhoods.
- **Modalities are complementary.** H&E improved the Top-10 validation score, although the gain was smaller when averaging over all proteins.
- **Validation design matters.** Excellent in-distribution performance did not guarantee unseen-slice performance; distinguishing the two changed how I interpreted the model's success.
- **Reproducibility is part of the project.** The repository includes training and test entry points, modular model code, environment specifications, and instructions for obtaining necessary external artifacts.

## Implementation and reproducibility

The [GitHub repository](https://github.com/ShellyLeee/multimodal-spatial-gnn) contains the training pipeline (`train.py`), test inference (`test_final.py`), preprocessing modules, model components, experiment configurations, and a detailed reproduction guide. Larger challenge data, extracted features, and pretrained checkpoints are linked externally rather than committed to Git.

**Tech stack:** Python · PyTorch · PyTorch Geometric · GATv2 · multimodal learning · spatial transcriptomics · histology image features · biological regularization

## Limitations and next steps

This work does not establish clinical predictive validity. The main limitation is cross-slice distribution shift, including changes in tissue architecture, staining, and experimental noise. A second limitation is the reliance on inferred cell composition and pretrained image representations. Promising next steps include explicit domain adaptation, protein-specific uncertainty analysis, and evaluation on more independent patients and tissue types.

*Project context: This research was developed as a SUSTech capstone and STP Open Challenge submission. The project page describes the implemented and evaluated approach, not a deployed clinical system.*
