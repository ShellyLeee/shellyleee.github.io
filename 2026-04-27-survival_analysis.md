---
layout: post
title: When Do Customers Leave? A Survival Analysis of Telco Churn Behavior
date: 2026-04-27 21:01:00
description: Explore customer churn through a survival analysis perspective using the IBM Telco dataset. By treating churn as a time-to-event problem, we uncover how contract types, technical support, and customer characteristics influence retention over time.
tags: research
categories: research-blog
thumbnail: assets/img/survival_analysis/survival_analysis.png
---



## 1. Introduction

Survival analysis is a statistical framework used to study the time until an event occurs. In business analytics, it is especially useful when the outcome is not only whether a customer leaves, but also how long the customer remains active before leaving.

In this project, the survival analysis task was applied to the [IBM Telco Customer Churn dataset](https://github.com/IBM/telco-customer-churn-on-icp4d/blob/master/data/Telco-Customer-Churn.csv). The survival setting was defined as follows:

- **Event**: customer churn
- **Duration**: customer tenure, measured in months
- **Censoring**: customers who had not churned by the time of observation

Under this definition, customers with `Churn = Yes` are treated as observed events, while customers with `Churn = No` are treated as right-censored observations. This allows the analysis to reflect both customers who left and customers who were still retained at the end of the recorded period.



------



## 2. Methodology

### 2.1 Data preprocessing

The dataset was loaded from the CSV file `Telco-Customer-Churn.csv` into a standard PySpark environment using an explicit schema. This avoided reliance on automatic type inference and made the workflow reproducible outside Databricks.

Several preprocessing steps were performed before the survival analysis:

- The original churn field was converted from `Yes/No` into a binary event variable:
  - `churn = 1` for customers who left
  - `churn = 0` for customers who remained
- The `tenure` field was used as the survival duration and interpreted as the number of months a customer had stayed with the company.
- The `TotalCharges` field was cleaned carefully because the dataset contains blank values. These blank entries correspond to customers with `tenure = 0`, so they were handled consistently during cleaning rather than dropped blindly.
- A curated analysis table was then created for descriptive statistics, survival tables, and group comparisons.

### 2.2 Survival analysis approach

The analysis used a Kaplan-Meier style survival estimation implemented in PySpark with a discrete-time monthly approximation. Since `tenure` is recorded in whole months, survival probabilities were computed month by month.

For each tenure month, the analysis calculated:

- the number of customers at risk at the beginning of the month
- the number of churn events observed in that month
- the number of censored observations in that month
- the corresponding conditional hazard
- the cumulative survival probability

The Kaplan-Meier estimator was then approximated as:

$$
S(t) = \prod_{i \le t}\left(1 - \frac{d_i}{n_i}\right) 
$$
where:

- $d_i$ is the number of churn events at month \(i\)
- $n_i$ is the number of customers at risk at the start of month \(i\)

To understand heterogeneity in customer retention, separate survival curves and subgroup summaries were examined for meaningful customer characteristics, including:

- `Contract`
- `SeniorCitizen`
- `TechSupport`

These variables were selected because they are business-relevant and plausibly associated with customer stability and churn risk.



------



## 3. Validation

The results were reviewed and verified through an iterative interaction process. Rather than accepting the first implementation mechanically, the outputs were examined carefully for internal consistency and business plausibility.

The validation process included the following checks:

- survival tables were compared against the raw churn data
- early-month Kaplan-Meier calculations were checked manually for consistency
- final survival probabilities were cross-checked across exported result tables
- subgroup results were reviewed to confirm that the direction of effects matched reasonable expectations

The overall churn counts, monthly risk sets, event counts, and survival probabilities were all found to be consistent with the underlying dataset.



------



## 4. Results

### 4.1 Churn distribution

The curated dataset contained **7,043** customers in total.

The churn distribution was:

- **No churn / censored**: 5,174 customers (**73.46%**)
- **Churn event**: 1,869 customers (**26.54%**)

This indicates that most customers were retained at the observation endpoint, but a substantial minority had churned.

Table 1 summarizes the observed churn distribution in the curated dataset.

| Churn status        | Customers | Percentage |
| ------------------- | --------: | ---------: |
| No churn / censored |     5,174 |     73.46% |
| Churn event         |     1,869 |     26.54% |

*Table 1. Churn distribution in the curated Telco customer dataset.*

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/survival_analysis/churn_distribution.png" title="churn_distribution" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
     Figure 1. Churn distribution bar chart 
</div>



### 4.2 Overall Kaplan-Meier survival behavior

The overall Kaplan-Meier curve showed a clear decline in survival probability over time, with the steepest drop occurring in the earliest months of customer tenure.

The first few months illustrate this pattern clearly:

- At month 0, survival began at 1.000
- At month 1, survival dropped to about **0.946**
- At month 2, survival dropped further to about **0.928**
- At month 4, survival was about **0.901**

By the end of the observation window, the estimated survival probability at month 72 was approximately **0.593**.

This pattern suggests that churn risk is highest early in the customer lifecycle, after which the remaining customer base becomes relatively more stable.

Table 2 shows a representative excerpt from the monthly survival table used to compute the Kaplan-Meier curve.

| Tenure month | At risk | Events | Censored | Hazard |
| ------------ | ------: | -----: | -------: | -----: |
| 0            |   7,043 |      0 |       11 | 0.0000 |
| 1            |   7,032 |    380 |      233 | 0.0540 |
| 2            |   6,419 |    123 |      115 | 0.0192 |
| 3            |   6,181 |     94 |      106 | 0.0152 |
| 4            |   5,981 |     83 |       93 | 0.0139 |
| 5            |   5,805 |     64 |       69 | 0.0110 |
| 6            |   5,672 |     40 |       70 | 0.0071 |
| 7            |   5,562 |     51 |       80 | 0.0092 |
| 8            |   5,431 |     42 |       81 | 0.0077 |
| 9            |   5,308 |     46 |       73 | 0.0087 |

*Table 2. Representative rows from the overall monthly survival table.*

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/survival_analysis/km_curve.png" title="km_curve" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
     Figure 2. Overall Kaplan-Meier survival curve 
</div>





### 4.3 Descriptive differences by churn status

Customers who churned had systematically shorter tenure and higher monthly charges than those who stayed:

- **Non-churned customers**
  - mean tenure: **37.57 months**
  - mean monthly charges: **61.27**
  - mean total charges: **2549.91**

- **Churned customers**
  - mean tenure: **17.98 months**
  - mean monthly charges: **74.44**
  - mean total charges: **1531.80**

These differences are consistent with the survival analysis results. Customers who leave tend to do so earlier, and they also tend to pay higher monthly rates.

Table 3 summarizes the main descriptive differences between churned and non-churned customers.

| Churn group         | Customers | Mean tenure (months) | SD tenure | Mean monthly charges | SD monthly charges | Mean total charges | SD total charges |
| ------------------- | --------: | -------------------: | --------: | -------------------: | -----------------: | -----------------: | ---------------: |
| No churn / censored |     5,174 |                37.57 |     24.11 |                61.27 |              31.09 |            2549.91 |          2329.95 |
| Churn event         |     1,869 |                17.98 |     19.53 |                74.44 |              24.67 |            1531.80 |          1890.82 |

*Table 3. Descriptive statistics by churn status.*

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/survival_analysis/tenure_distribution_by_churn.png" title="tenure_distribution_by_churn" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
     Figure 3. Tenure distribution by churn status 
</div>



### 4.4 Group comparison: Contract type

Contract type showed the strongest and clearest survival separation.

The estimated final survival probabilities were approximately:

- **Month-to-month**: **0.129**
- **One year**: **0.568**
- **Two year**: **0.936**

This pattern is highly interpretable. Customers on month-to-month plans experience much lower retention over time, while two-year contract customers are substantially more stable. The month-to-month curve declines sharply in the early periods, indicating strong early churn risk.

Table 4 reports the final Kaplan-Meier survival probabilities by contract type.

| Contract type  | Final tenure month | Final survival probability |
| -------------- | -----------------: | -------------------------: |
| Month-to-month |                 72 |                     0.1290 |
| One year       |                 72 |                     0.5681 |
| Two year       |                 72 |                     0.9357 |

*Table 4. Final survival probabilities by contract type.*

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/survival_analysis/contract_survival.png" title="contract_survival" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
     Figure 4. Survival curves grouped by contract type 
</div>



### 4.5 Group comparison: SeniorCitizen

Senior status also showed a meaningful difference.

The estimated final survival probabilities were approximately:

- **Non-senior customers**: **0.634**
- **Senior customers**: **0.421**

This suggests that senior customers in this dataset experienced higher churn risk and lower long-term survival than non-senior customers.

Table 5 reports the final Kaplan-Meier survival probabilities by senior citizen status.

| Senior citizen group | Final tenure month | Final survival probability |
| -------------------- | -----------------: | -------------------------: |
| Non-senior customers |                 72 |                     0.6339 |
| Senior customers     |                 72 |                     0.4213 |

*Table 5. Final survival probabilities by senior citizen status.*

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/survival_analysis/senior_survival.png" title="senior_survival" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
     Figure 5. Survival curves grouped by senior citizen status 
</div>



### 4.6 Group comparison: TechSupport

Where subgroup summaries were available, `TechSupport` also appeared to be associated with retention differences.

The observed pattern was logically consistent:

- customers with **no tech support** had the weakest retention
- customers with **tech support** showed better retention
- customers with **no internet service** appeared most stable

This pattern is plausible from a business perspective. Customers lacking technical support may be more vulnerable to dissatisfaction or service friction, increasing churn risk. By contrast, customers with support or with simpler service configurations tend to be more stable.

Table 6 reports the final Kaplan-Meier survival probabilities by `TechSupport` status.

| TechSupport group   | Final tenure month | Final survival probability |
| ------------------- | -----------------: | -------------------------: |
| No                  |                 72 |                     0.3492 |
| No internet service |                 72 |                     0.9015 |
| Yes                 |                 72 |                     0.7608 |

*Table 6. Final survival probabilities by TechSupport status.*

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/survival_analysis/techsupport_survival.png" title="techsupport_survival" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
     Figure 6. Kaplan-Meier survival curves grouped by TechSupport status 
</div>



At month 72, customers without tech support had the lowest estimated survival probability at **0.3492**, while customers with tech support reached **0.7608**. The highest survival probability, **0.9015**, was observed for customers with no internet service.

These output values are consistent with the plotted curves and suggest that access to technical support is associated with stronger customer retention in this dataset.



------



## 5. Insights

Several factors appear to influence churn risk strongly.

First, **contract type** is the dominant factor in the survival analysis. Month-to-month customers have much lower survival than customers with one-year or two-year contracts. This suggests that commitment structure is closely tied to retention.

Second, **customer age category**, represented here by `SeniorCitizen`, is associated with lower survival among senior customers. While this does not explain why the difference exists, it signals that this segment may require more targeted retention support.

Third, **service support conditions** matter. Customers without technical support appear more vulnerable to churn, which may reflect unresolved service issues, weaker engagement, or lower perceived value.

From a business perspective, the results imply that churn risk is concentrated among customers with:

- short tenure
- flexible month-to-month contracts
- weaker service support conditions
- higher monthly charges

These findings suggest several practical retention strategies:

- prioritize onboarding and retention efforts in the first few months
- design incentives for migration from month-to-month to longer contracts
- expand proactive support for at-risk service groups
- monitor high-bill customers for dissatisfaction signals



------



## 6. Limitations

This analysis has several important limitations.

First, the Kaplan-Meier procedure was implemented as a **discrete monthly approximation** because tenure is recorded in whole months. This is appropriate for the dataset, but it is still a grouped version of survival analysis rather than a fully continuous-time formulation.

Second, the analysis did **not include formal statistical hypothesis testing**, such as a log-rank test. As a result, the subgroup differences can be described and visualized, but not formally tested for statistical significance within this notebook.

Third, the dataset is **observational**. The results identify associations between customer characteristics and retention patterns, but they should not be interpreted as causal effects.

Finally, some subgroup conclusions depend on descriptive survival comparisons rather than multivariable modeling. This means that confounding between factors may still be present.



------



## 7. Conclusion

This survival analysis shows that the IBM Telco Customer Churn dataset contains strong and interpretable retention patterns when churn is treated as the event and tenure is treated as the survival duration.

The results indicate that churn risk is highest early in the customer lifecycle and that survival differs substantially across customer groups. In particular:

- month-to-month contracts are associated with the lowest survival
- two-year contracts are associated with the strongest retention
- senior customers show lower survival than non-senior customers
- technical support status is also related to customer stability

Overall, the Kaplan-Meier analysis provides a clear and credible view of customer retention dynamics. Even without a parametric survival model, the descriptive survival framework offers useful evidence for understanding churn timing, identifying high-risk groups, and informing retention strategy.
