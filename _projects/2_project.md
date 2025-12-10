---
layout: page
title: Statistical Analysis of Mental Health Outcomes in Menopausal Women
description: A rigorous statistical analysis of menopausal women’s mental health using robust testing and confounder adjustment on a confidential population dataset
img: assets/img/menopause.jpg
importance: 2
category: research
giscus_comments: true
---

This project investigates mental health outcomes among menopausal women using a confidential, population-based survey dataset collected in Malaysia. The analysis required transforming real-world, noisy survey data into statistically valid evidence that now informs a broader multi-national study expansion.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/menopause.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## **1. Data Challenges in Real-World Populations**

This project analyzed mental health outcomes among menopausal women using a large, heterogeneous survey dataset from Malaysia. The raw data included multilingual responses, inconsistent scaling formats, and substantial item-level missingness across multi-stage assessments. My first task was to transform this complex dataset into a valid analytic structure, ensuring correct variable encoding, exclusion criteria for non-responders, and appropriate handling of partial missing data across baseline and follow-up assessments.

## **2. Robust Preprocessing & Non-Parametric Testing**

I built an R-based pipeline implementing systematic cleaning, recoding, and multiple imputation (predictive mean matching via *mice*) to recover scale-level completeness under missing-at-random assumptions. After formally assessing distributional assumptions using Shapiro–Wilk tests, I confirmed that most symptom scales exhibited non-normality.

Accordingly, I applied methodologically appropriate statistical tests:

- **Kruskal–Wallis tests** to compare continuous outcomes across menopausal stages.
- **Pearson chi-square or Fisher’s exact tests** for categorical variables depending on sparsity.
- **Paired t-tests** to evaluate changes between baseline and follow-up scale outcomes where assumptions were met.

This ensured inferential validity despite the noisy and heterogeneous nature of real-world population data.


## **3. Adjusting for Confounding via Stratified Modeling**

Because symptom severity is strongly intertwined with menopausal stage, I performed subgroup analyses explicitly adjusted for stage distribution.

- For continuous outcomes, I implemented **ANCOVA**, estimating adjusted marginal means with 95% confidence intervals.
- For categorical outcomes, I used **Cochran–Mantel–Haenszel (CMH) tests** to evaluate associations while preserving menopausal-stage stratification.

This modeling strategy allowed us to separate genuine health disparities from artifacts arising due to demographic imbalance.


## **4. Validated Findings (Non-Disclosure Compliant)**

The final analytic sample included 509 baseline participants and 371 follow-up participants after applying response-based inclusion rules. The analysis identified significant age stratifications (p < 0.001), distinct patterns across anxiety, insomnia, and depression symptom scales, and several baseline disparities that disappeared after confounder adjustment—demonstrating that raw comparisons were insufficient without rigorously controlled models.

These validated, methodologically robust insights now support a **confidential internal report** that is guiding the design of a **multi-national women’s health study**.
