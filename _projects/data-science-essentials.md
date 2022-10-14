---
layout: page
title: Data Science Essentials
description: Final Project for Data Science Essentials Course
img: assets/img/tn_map.png
importance: 1
category: fun
---

# Data Science Essentials Final Project
**TN Med Helper** is a fictional company whose mission is to ensure access to healthcare for all Tennesseans. TN Med Helper has approached your data science consultancy for help identifying communities in Tennessee that need the most help in expanding access to healthcare.

In this project, we will use the [Medicare Disparities](https://data.cms.gov/mapping-medicare-disparities) data as a starting point for identifying such communities. Specifically, you will be provided with datasets containing the percent of Medicare beneficiaries who had an annual wellness visit (annual_wellness.csv), the number of all-cause hospitilizations per 1000 beneficiaries (hospitalizations.csv), and the number of emergency department visits per 1000 beneficiaries (emergency_department.csv). Over the next 8 weeks, you will work towards addressing the following three objectives.

First, TN Med Helper is concerned about communities either lacking access to healthcare or losing access to healthcare. They are looking to expand telehealth technologies into the vulnerable communities, and need your help to priortize areas most needing attention. your first objective is to identify which counties in Tennessee have the most severe lack of access to healthcare (either due to lack of hospitals, physicians, or both). Once you have identified these counties, see if you can find any common demographic or economic characteristics for these areas.

Second, TN Med Helper is interested in reducing the number of potentially preventable hospitalizations. Do areas that lack access to healthcare tend to have higher rates of emergency department visits or hospitalizations? Is there an association between the percentage of beneficiaries who had an annual wellness visit and rate of hospitalizations or emergency department visits?

Finally, TN Med Helper is trying to identify specific subpopulations to focus more attention on. Using data from [the Behavioral Risk Factor Surveillance System](https://www.cdc.gov/brfss/index.html), build a model to predict whether an individual has not had a checkup in the last year. Apply this model to the counties you identified above to predict how likely it is that the average person from those counties has not had a checkup in the last year. Which groups within these counties might need to be focused on to maximize the impact of TN Med Helper's efforts?

Over the course of this class, you will build up your data analysis skills and work towards answering these questions. At the end of the project, teams will present their findings to **TN Med Helper**.

### Looking at the data
- Annual wellness visits is a percentage (of beneficiaries).
- Emergency department visits is a number per 1000 beneficiaries.
- All-cause hospitalizations is number per 1000 beneficiaries.


```python
import pandas as pd
import geopandas as gpd
import matplotlib.pyplot as plt
import seaborn as sns
```


```python
hospitalizations = pd.read_csv("../data/Medicare_Disparities_by_Population/hospitalizations.csv")
hospitalizations.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 3222 entries, 0 to 3221
    Data columns (total 18 columns):
     #   Column               Non-Null Count  Dtype 
    ---  ------               --------------  ----- 
     0   year                 3222 non-null   int64 
     1   geography            3222 non-null   object
     2   measure              3222 non-null   object
     3   adjustment           3222 non-null   object
     4   analysis             3222 non-null   object
     5   domain               3222 non-null   object
     6   condition            3222 non-null   object
     7   primary_sex          3222 non-null   object
     8   primary_age          3222 non-null   object
     9   primary_dual         3222 non-null   object
     10  fips                 3222 non-null   int64 
     11  county               3205 non-null   object
     12  state                3222 non-null   object
     13  urban                3222 non-null   object
     14  primary_race         3222 non-null   object
     15  primary_eligibility  3222 non-null   object
     16  primary_denominator  3222 non-null   object
     17  analysis_value       3222 non-null   int64 
    dtypes: int64(3), object(15)
    memory usage: 453.2+ KB



```python
annual_wellness = pd.read_csv("../data/Medicare_Disparities_by_Population/annual_wellness.csv")
annual_wellness.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 3220 entries, 0 to 3219
    Data columns (total 18 columns):
     #   Column               Non-Null Count  Dtype 
    ---  ------               --------------  ----- 
     0   year                 3220 non-null   int64 
     1   geography            3220 non-null   object
     2   measure              3220 non-null   object
     3   adjustment           3220 non-null   object
     4   analysis             3220 non-null   object
     5   domain               3220 non-null   object
     6   condition            3220 non-null   object
     7   primary_sex          3220 non-null   object
     8   primary_age          3220 non-null   object
     9   primary_dual         3220 non-null   object
     10  fips                 3220 non-null   int64 
     11  county               3205 non-null   object
     12  state                3220 non-null   object
     13  urban                3220 non-null   object
     14  primary_race         3220 non-null   object
     15  primary_eligibility  3220 non-null   object
     16  primary_denominator  3220 non-null   object
     17  analysis_value       3220 non-null   int64 
    dtypes: int64(3), object(15)
    memory usage: 452.9+ KB



```python
emergency_department = pd.read_csv("../data/Medicare_Disparities_by_Population/emergency_department.csv")
emergency_department.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 3220 entries, 0 to 3219
    Data columns (total 18 columns):
     #   Column               Non-Null Count  Dtype 
    ---  ------               --------------  ----- 
     0   year                 3220 non-null   int64 
     1   geography            3220 non-null   object
     2   measure              3220 non-null   object
     3   adjustment           3220 non-null   object
     4   analysis             3220 non-null   object
     5   domain               3220 non-null   object
     6   condition            3220 non-null   object
     7   primary_sex          3220 non-null   object
     8   primary_age          3220 non-null   object
     9   primary_dual         3220 non-null   object
     10  fips                 3220 non-null   int64 
     11  county               3205 non-null   object
     12  state                3220 non-null   object
     13  urban                3220 non-null   object
     14  primary_race         3220 non-null   object
     15  primary_eligibility  3220 non-null   object
     16  primary_denominator  3220 non-null   object
     17  analysis_value       3220 non-null   int64 
    dtypes: int64(3), object(15)
    memory usage: 452.9+ KB


All three data structures are the same, with the same column names (unfortunately). I will merge them, and rename the columns that I want to keep from each.


```python
emergency_department.iloc[1] == hospitalizations.iloc[1]
```




    year                    True
    geography               True
    measure                False
    adjustment              True
    analysis                True
    domain                  True
    condition              False
    primary_sex             True
    primary_age             True
    primary_dual            True
    fips                    True
    county                  True
    state                   True
    urban                   True
    primary_race            True
    primary_eligibility     True
    primary_denominator    False
    analysis_value         False
    Name: 1, dtype: bool




```python
emer_dict = {}
for i in emergency_department:
    emer_dict[i] = set(emergency_department[i])
```


```python
emer_dict['fips'] = []
emer_dict['county'] = []
emer_dict['state'] = []
emer_dict['analysis_value'] = []
emer_dict
```




    {'year': {2019},
     'geography': {'County'},
     'measure': {'Emergency department visit rate'},
     'adjustment': {'Unsmoothed actual'},
     'analysis': {'Base measure'},
     'domain': {'Primary chronic conditions'},
     'condition': {'All Emergency Department Visits'},
     'primary_sex': {'All'},
     'primary_age': {'All'},
     'primary_dual': {'Dual & non-dual'},
     'fips': [],
     'county': [],
     'state': [],
     'urban': {'Rural', 'Urban'},
     'primary_race': {'All'},
     'primary_eligibility': {'All'},
     'primary_denominator': {'undefined'},
     'analysis_value': []}



The comparison above shows which columns are unique to each dataframe: measure, condition, primary_denominator, and analysis_value. All other columns except urban only have one value.


```python
hospitalizations = hospitalizations[['fips','measure','primary_denominator', 'analysis_value']]
emergency_department = emergency_department[['fips','measure','primary_denominator', 'analysis_value']]
```


```python
hospitalizations.columns = ['fips','measure_hosp','primary_denominator_hosp', 'analysis_value_hosp']
emergency_department.columns = ['fips','measure_emer','primary_denominator_emer', 'analysis_value_emer']

```


```python
annual_wellness.columns = annual_wellness.columns.str.replace("analysis_value","analysis_value_well")
annual_wellness.columns = annual_wellness.columns.str.replace("measure","measure_well")
annual_wellness.columns = annual_wellness.columns.str.replace("primary_denominator","primary_denominator_well")
```


```python
disparities = pd.merge(left = annual_wellness, left_on = 'fips',
         right = hospitalizations, right_on = 'fips')
```


```python
disparities = pd.merge(left = disparities, left_on = 'fips',
         right = emergency_department, right_on = 'fips')
```


```python
disparities.info()
```

    <class 'pandas.core.frame.DataFrame'>
    Int64Index: 3220 entries, 0 to 3219
    Data columns (total 24 columns):
     #   Column                    Non-Null Count  Dtype 
    ---  ------                    --------------  ----- 
     0   year                      3220 non-null   int64 
     1   geography                 3220 non-null   object
     2   measure_well              3220 non-null   object
     3   adjustment                3220 non-null   object
     4   analysis                  3220 non-null   object
     5   domain                    3220 non-null   object
     6   condition                 3220 non-null   object
     7   primary_sex               3220 non-null   object
     8   primary_age               3220 non-null   object
     9   primary_dual              3220 non-null   object
     10  fips                      3220 non-null   int64 
     11  county                    3205 non-null   object
     12  state                     3220 non-null   object
     13  urban                     3220 non-null   object
     14  primary_race              3220 non-null   object
     15  primary_eligibility       3220 non-null   object
     16  primary_denominator_well  3220 non-null   object
     17  analysis_value_well       3220 non-null   int64 
     18  measure_hosp              3220 non-null   object
     19  primary_denominator_hosp  3220 non-null   object
     20  analysis_value_hosp       3220 non-null   int64 
     21  measure_emer              3220 non-null   object
     22  primary_denominator_emer  3220 non-null   object
     23  analysis_value_emer       3220 non-null   int64 
    dtypes: int64(5), object(19)
    memory usage: 628.9+ KB



```python
print(set(disparities.adjustment),set(disparities.analysis),set(disparities.domain),set(disparities.condition))
```

    {'Unsmoothed actual'} {'Base measure'} {'Preventive Services'} {'Annual Wellness Visit'}


Each of the columns above only has one value, so I am going to remove them.


```python
disparities = disparities.drop(['adjustment','analysis','domain','condition'], axis = 1)
disparities.head(2)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>year</th>
      <th>geography</th>
      <th>measure_well</th>
      <th>primary_sex</th>
      <th>primary_age</th>
      <th>primary_dual</th>
      <th>fips</th>
      <th>county</th>
      <th>state</th>
      <th>urban</th>
      <th>primary_race</th>
      <th>primary_eligibility</th>
      <th>primary_denominator_well</th>
      <th>analysis_value_well</th>
      <th>measure_hosp</th>
      <th>primary_denominator_hosp</th>
      <th>analysis_value_hosp</th>
      <th>measure_emer</th>
      <th>primary_denominator_emer</th>
      <th>analysis_value_emer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2019</td>
      <td>County</td>
      <td>Preventive Services</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>1001</td>
      <td>Autauga County</td>
      <td>ALABAMA</td>
      <td>Urban</td>
      <td>All</td>
      <td>All</td>
      <td>1,000-4,999</td>
      <td>29</td>
      <td>Hospitalization</td>
      <td>5,000-9,999</td>
      <td>299</td>
      <td>Emergency department visit rate</td>
      <td>undefined</td>
      <td>723</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2019</td>
      <td>County</td>
      <td>Preventive Services</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>1003</td>
      <td>Baldwin County</td>
      <td>ALABAMA</td>
      <td>Rural</td>
      <td>All</td>
      <td>All</td>
      <td>10,000+</td>
      <td>29</td>
      <td>Hospitalization</td>
      <td>10,000+</td>
      <td>268</td>
      <td>Emergency department visit rate</td>
      <td>undefined</td>
      <td>601</td>
    </tr>
  </tbody>
</table>
</div>



Lastly, I will narrow down the list to only counties in TN.


```python
disparities = disparities.loc[disparities.state == 'TENNESSEE']
```


```python
disparities.info()
```

    <class 'pandas.core.frame.DataFrame'>
    Int64Index: 95 entries, 2428 to 2522
    Data columns (total 20 columns):
     #   Column                    Non-Null Count  Dtype 
    ---  ------                    --------------  ----- 
     0   year                      95 non-null     int64 
     1   geography                 95 non-null     object
     2   measure_well              95 non-null     object
     3   primary_sex               95 non-null     object
     4   primary_age               95 non-null     object
     5   primary_dual              95 non-null     object
     6   fips                      95 non-null     int64 
     7   county                    95 non-null     object
     8   state                     95 non-null     object
     9   urban                     95 non-null     object
     10  primary_race              95 non-null     object
     11  primary_eligibility       95 non-null     object
     12  primary_denominator_well  95 non-null     object
     13  analysis_value_well       95 non-null     int64 
     14  measure_hosp              95 non-null     object
     15  primary_denominator_hosp  95 non-null     object
     16  analysis_value_hosp       95 non-null     int64 
     17  measure_emer              95 non-null     object
     18  primary_denominator_emer  95 non-null     object
     19  analysis_value_emer       95 non-null     int64 
    dtypes: int64(5), object(15)
    memory usage: 15.6+ KB


As before, we have all 95 counties in TN.

## Question 1: Identify which counties in TN have the most severe lack of access to healthcare.

### Which counties have low numbers of physicians?


```python
physicians = pd.read_csv('../data/primary_care_physicians.csv')
```


```python
physicians = physicians.loc[physicians.state == 'Tennessee']
physicians.shape
```




    (95, 4)




```python
population = pd.read_csv('../data/population_by_county.csv')
population.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>FIPS</th>
      <th>population</th>
      <th>county</th>
      <th>state</th>
      <th>urban</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>17051</td>
      <td>21565</td>
      <td>Fayette County</td>
      <td>ILLINOIS</td>
      <td>Rural</td>
    </tr>
    <tr>
      <th>1</th>
      <td>17107</td>
      <td>29003</td>
      <td>Logan County</td>
      <td>ILLINOIS</td>
      <td>Rural</td>
    </tr>
    <tr>
      <th>2</th>
      <td>17165</td>
      <td>23994</td>
      <td>Saline County</td>
      <td>ILLINOIS</td>
      <td>Rural</td>
    </tr>
    <tr>
      <th>3</th>
      <td>17097</td>
      <td>701473</td>
      <td>Lake County</td>
      <td>ILLINOIS</td>
      <td>Urban</td>
    </tr>
    <tr>
      <th>4</th>
      <td>17127</td>
      <td>14219</td>
      <td>Massac County</td>
      <td>ILLINOIS</td>
      <td>Rural</td>
    </tr>
  </tbody>
</table>
</div>




```python
physicians = pd.merge(left = physicians, right = population[['FIPS','population','urban']], left_on='FIPS', right_on = 'FIPS')
```


```python
physicians['urban'].value_counts()
```




    Rural    57
    Urban    38
    Name: urban, dtype: int64




```python
physicians.loc[physicians.population/physicians.primary_care_physicians < 1500,'supply'] = 'adequate'
physicians.loc[(physicians.population/physicians.primary_care_physicians > 1500) &
               (physicians.population/physicians.primary_care_physicians < 3500),'supply'] = 'moderately adequate'
physicians.loc[physicians.population/physicians.primary_care_physicians > 3500,'supply'] = 'low inadequate'
```


```python
physicians = physicians.rename({'supply':'shadac_category'}, axis = 'columns')
```


```python
import matplotlib.pyplot as plt
pd.crosstab(physicians.urban, physicians.shadac_category, normalize='index').plot(kind = 'bar', stacked = True)
plt.xticks(rotation = 0)
plt.legend(bbox_to_anchor = (1, 0.8), loc = 'upper left');   # move the legend to the right side of the plot
plt.title("SHADAC Category by Type of County")
```




    Text(0.5, 1.0, 'SHADAC Category by Type of County')




<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_33_1.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div>     



```python
physicians
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>FIPS</th>
      <th>state</th>
      <th>county</th>
      <th>primary_care_physicians</th>
      <th>population</th>
      <th>urban</th>
      <th>shadac_category</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>47001</td>
      <td>Tennessee</td>
      <td>Anderson</td>
      <td>39.0</td>
      <td>76061</td>
      <td>Urban</td>
      <td>moderately adequate</td>
    </tr>
    <tr>
      <th>1</th>
      <td>47003</td>
      <td>Tennessee</td>
      <td>Bedford</td>
      <td>15.0</td>
      <td>48292</td>
      <td>Rural</td>
      <td>moderately adequate</td>
    </tr>
    <tr>
      <th>2</th>
      <td>47005</td>
      <td>Tennessee</td>
      <td>Benton</td>
      <td>3.0</td>
      <td>16140</td>
      <td>Rural</td>
      <td>low inadequate</td>
    </tr>
    <tr>
      <th>3</th>
      <td>47007</td>
      <td>Tennessee</td>
      <td>Bledsoe</td>
      <td>1.0</td>
      <td>14836</td>
      <td>Rural</td>
      <td>low inadequate</td>
    </tr>
    <tr>
      <th>4</th>
      <td>47009</td>
      <td>Tennessee</td>
      <td>Blount</td>
      <td>90.0</td>
      <td>129927</td>
      <td>Urban</td>
      <td>adequate</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>90</th>
      <td>47181</td>
      <td>Tennessee</td>
      <td>Wayne</td>
      <td>5.0</td>
      <td>16693</td>
      <td>Rural</td>
      <td>moderately adequate</td>
    </tr>
    <tr>
      <th>91</th>
      <td>47183</td>
      <td>Tennessee</td>
      <td>Weakley</td>
      <td>18.0</td>
      <td>33510</td>
      <td>Rural</td>
      <td>moderately adequate</td>
    </tr>
    <tr>
      <th>92</th>
      <td>47185</td>
      <td>Tennessee</td>
      <td>White</td>
      <td>9.0</td>
      <td>26800</td>
      <td>Rural</td>
      <td>moderately adequate</td>
    </tr>
    <tr>
      <th>93</th>
      <td>47187</td>
      <td>Tennessee</td>
      <td>Williamson</td>
      <td>338.0</td>
      <td>225389</td>
      <td>Urban</td>
      <td>adequate</td>
    </tr>
    <tr>
      <th>94</th>
      <td>47189</td>
      <td>Tennessee</td>
      <td>Wilson</td>
      <td>43.0</td>
      <td>136666</td>
      <td>Urban</td>
      <td>moderately adequate</td>
    </tr>
  </tbody>
</table>
<p>95 rows × 7 columns</p>
</div>




```python
unemployment = pd.read_csv('../data/tn_unemployment.csv')
unemployment.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>laus_code</th>
      <th>State</th>
      <th>County</th>
      <th>Name</th>
      <th>Period</th>
      <th>LF</th>
      <th>Employed</th>
      <th>Unemployed</th>
      <th>unemployment_rate</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>CN4700100000000</td>
      <td>47</td>
      <td>1</td>
      <td>Anderson County, TN</td>
      <td>Mar-21</td>
      <td>34704</td>
      <td>33010</td>
      <td>1694</td>
      <td>4.9</td>
    </tr>
    <tr>
      <th>1</th>
      <td>CN4700300000000</td>
      <td>47</td>
      <td>3</td>
      <td>Bedford County, TN</td>
      <td>Mar-21</td>
      <td>20623</td>
      <td>19550</td>
      <td>1073</td>
      <td>5.2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>CN4700500000000</td>
      <td>47</td>
      <td>5</td>
      <td>Benton County, TN</td>
      <td>Mar-21</td>
      <td>6723</td>
      <td>6305</td>
      <td>418</td>
      <td>6.2</td>
    </tr>
    <tr>
      <th>3</th>
      <td>CN4700700000000</td>
      <td>47</td>
      <td>7</td>
      <td>Bledsoe County, TN</td>
      <td>Mar-21</td>
      <td>4252</td>
      <td>3947</td>
      <td>305</td>
      <td>7.2</td>
    </tr>
    <tr>
      <th>4</th>
      <td>CN4700900000000</td>
      <td>47</td>
      <td>9</td>
      <td>Blount County, TN</td>
      <td>Mar-21</td>
      <td>64098</td>
      <td>61119</td>
      <td>2979</td>
      <td>4.6</td>
    </tr>
  </tbody>
</table>
</div>




```python
unemployment.Name = unemployment.Name.str.split(' County, TN', expand = True)[0]
```


```python
physicians = pd.merge(left=unemployment[['laus_code','Name','Employed','Unemployed','unemployment_rate']], left_on='Name',
        right = physicians[['FIPS','county','primary_care_physicians','population','urban','shadac_category']], right_on='county')
```


```python
physicians
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>laus_code</th>
      <th>Name</th>
      <th>Employed</th>
      <th>Unemployed</th>
      <th>unemployment_rate</th>
      <th>FIPS</th>
      <th>county</th>
      <th>primary_care_physicians</th>
      <th>population</th>
      <th>urban</th>
      <th>shadac_category</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>CN4700100000000</td>
      <td>Anderson</td>
      <td>33010</td>
      <td>1694</td>
      <td>4.9</td>
      <td>47001</td>
      <td>Anderson</td>
      <td>39.0</td>
      <td>76061</td>
      <td>Urban</td>
      <td>moderately adequate</td>
    </tr>
    <tr>
      <th>1</th>
      <td>CN4700300000000</td>
      <td>Bedford</td>
      <td>19550</td>
      <td>1073</td>
      <td>5.2</td>
      <td>47003</td>
      <td>Bedford</td>
      <td>15.0</td>
      <td>48292</td>
      <td>Rural</td>
      <td>moderately adequate</td>
    </tr>
    <tr>
      <th>2</th>
      <td>CN4700500000000</td>
      <td>Benton</td>
      <td>6305</td>
      <td>418</td>
      <td>6.2</td>
      <td>47005</td>
      <td>Benton</td>
      <td>3.0</td>
      <td>16140</td>
      <td>Rural</td>
      <td>low inadequate</td>
    </tr>
    <tr>
      <th>3</th>
      <td>CN4700700000000</td>
      <td>Bledsoe</td>
      <td>3947</td>
      <td>305</td>
      <td>7.2</td>
      <td>47007</td>
      <td>Bledsoe</td>
      <td>1.0</td>
      <td>14836</td>
      <td>Rural</td>
      <td>low inadequate</td>
    </tr>
    <tr>
      <th>4</th>
      <td>CN4700900000000</td>
      <td>Blount</td>
      <td>61119</td>
      <td>2979</td>
      <td>4.6</td>
      <td>47009</td>
      <td>Blount</td>
      <td>90.0</td>
      <td>129927</td>
      <td>Urban</td>
      <td>adequate</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>90</th>
      <td>CN4718100000000</td>
      <td>Wayne</td>
      <td>6074</td>
      <td>342</td>
      <td>5.3</td>
      <td>47181</td>
      <td>Wayne</td>
      <td>5.0</td>
      <td>16693</td>
      <td>Rural</td>
      <td>moderately adequate</td>
    </tr>
    <tr>
      <th>91</th>
      <td>CN4718300000000</td>
      <td>Weakley</td>
      <td>14783</td>
      <td>711</td>
      <td>4.6</td>
      <td>47183</td>
      <td>Weakley</td>
      <td>18.0</td>
      <td>33510</td>
      <td>Rural</td>
      <td>moderately adequate</td>
    </tr>
    <tr>
      <th>92</th>
      <td>CN4718500000000</td>
      <td>White</td>
      <td>11484</td>
      <td>601</td>
      <td>5.0</td>
      <td>47185</td>
      <td>White</td>
      <td>9.0</td>
      <td>26800</td>
      <td>Rural</td>
      <td>moderately adequate</td>
    </tr>
    <tr>
      <th>93</th>
      <td>CN4718700000000</td>
      <td>Williamson</td>
      <td>125213</td>
      <td>4271</td>
      <td>3.3</td>
      <td>47187</td>
      <td>Williamson</td>
      <td>338.0</td>
      <td>225389</td>
      <td>Urban</td>
      <td>adequate</td>
    </tr>
    <tr>
      <th>94</th>
      <td>CN4718900000000</td>
      <td>Wilson</td>
      <td>74347</td>
      <td>3079</td>
      <td>4.0</td>
      <td>47189</td>
      <td>Wilson</td>
      <td>43.0</td>
      <td>136666</td>
      <td>Urban</td>
      <td>moderately adequate</td>
    </tr>
  </tbody>
</table>
<p>95 rows × 11 columns</p>
</div>




```python
import seaborn as sns
sns.boxplot(physicians.urban,physicians.unemployment_rate)
plt.xticks(rotation = 0)
plt.title("Unemployment by Type of County")
```

    /Users/smgroves/Documents/anaconda3/envs/geo_dse/lib/python3.9/site-packages/seaborn/_decorators.py:36: FutureWarning: Pass the following variables as keyword args: x, y. From version 0.12, the only valid positional argument will be `data`, and passing other arguments without an explicit keyword will result in an error or misinterpretation.
      warnings.warn(





    Text(0.5, 1.0, 'Unemployment by Type of County')



<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_39_2.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div>     



```python
physicians['pcp_per_100k'] = physicians.primary_care_physicians/physicians.population*100000
```


```python
sns.lmplot(data = physicians, y = 'pcp_per_100k', x = 'unemployment_rate')
plt.ylabel = "PCP per 100k residents"
plt.xlabel = "Unemployment Rate"
```

<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_41_0.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
        



```python
physicians[['unemployment_rate', 'pcp_per_100k']].corr()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>unemployment_rate</th>
      <th>pcp_per_100k</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>unemployment_rate</th>
      <td>1.000000</td>
      <td>-0.335333</td>
    </tr>
    <tr>
      <th>pcp_per_100k</th>
      <td>-0.335333</td>
      <td>1.000000</td>
    </tr>
  </tbody>
</table>
</div>




```python
disparities = pd.merge(left = disparities, left_on = 'fips',
         right = physicians, right_on = 'FIPS')
```

Now get rid of repetitive columns:


```python
disparities.head(2)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>year</th>
      <th>geography</th>
      <th>measure_well</th>
      <th>primary_sex</th>
      <th>primary_age</th>
      <th>primary_dual</th>
      <th>fips</th>
      <th>county_x</th>
      <th>state</th>
      <th>urban_x</th>
      <th>...</th>
      <th>Employed</th>
      <th>Unemployed</th>
      <th>unemployment_rate</th>
      <th>FIPS</th>
      <th>county_y</th>
      <th>primary_care_physicians</th>
      <th>population</th>
      <th>urban_y</th>
      <th>shadac_category</th>
      <th>pcp_per_100k</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2019</td>
      <td>County</td>
      <td>Preventive Services</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>47001</td>
      <td>Anderson County</td>
      <td>TENNESSEE</td>
      <td>Urban</td>
      <td>...</td>
      <td>33010</td>
      <td>1694</td>
      <td>4.9</td>
      <td>47001</td>
      <td>Anderson</td>
      <td>39.0</td>
      <td>76061</td>
      <td>Urban</td>
      <td>moderately adequate</td>
      <td>51.274635</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2019</td>
      <td>County</td>
      <td>Preventive Services</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>47003</td>
      <td>Bedford County</td>
      <td>TENNESSEE</td>
      <td>Rural</td>
      <td>...</td>
      <td>19550</td>
      <td>1073</td>
      <td>5.2</td>
      <td>47003</td>
      <td>Bedford</td>
      <td>15.0</td>
      <td>48292</td>
      <td>Rural</td>
      <td>moderately adequate</td>
      <td>31.061045</td>
    </tr>
  </tbody>
</table>
<p>2 rows × 32 columns</p>
</div>




```python
disparities.info()
```

    <class 'pandas.core.frame.DataFrame'>
    Int64Index: 95 entries, 0 to 94
    Data columns (total 32 columns):
     #   Column                    Non-Null Count  Dtype  
    ---  ------                    --------------  -----  
     0   year                      95 non-null     int64  
     1   geography                 95 non-null     object 
     2   measure_well              95 non-null     object 
     3   primary_sex               95 non-null     object 
     4   primary_age               95 non-null     object 
     5   primary_dual              95 non-null     object 
     6   fips                      95 non-null     int64  
     7   county_x                  95 non-null     object 
     8   state                     95 non-null     object 
     9   urban_x                   95 non-null     object 
     10  primary_race              95 non-null     object 
     11  primary_eligibility       95 non-null     object 
     12  primary_denominator_well  95 non-null     object 
     13  analysis_value_well       95 non-null     int64  
     14  measure_hosp              95 non-null     object 
     15  primary_denominator_hosp  95 non-null     object 
     16  analysis_value_hosp       95 non-null     int64  
     17  measure_emer              95 non-null     object 
     18  primary_denominator_emer  95 non-null     object 
     19  analysis_value_emer       95 non-null     int64  
     20  laus_code                 95 non-null     object 
     21  Name                      95 non-null     object 
     22  Employed                  95 non-null     int64  
     23  Unemployed                95 non-null     int64  
     24  unemployment_rate         95 non-null     float64
     25  FIPS                      95 non-null     int64  
     26  county_y                  95 non-null     object 
     27  primary_care_physicians   95 non-null     float64
     28  population                95 non-null     int64  
     29  urban_y                   95 non-null     object 
     30  shadac_category           95 non-null     object 
     31  pcp_per_100k              95 non-null     float64
    dtypes: float64(3), int64(9), object(20)
    memory usage: 24.5+ KB



```python
disparities = disparities.drop(['geography','county_x','urban_x', 'fips'], axis = 1)
disparities.index = disparities.FIPS
disparities.columns = disparities.columns.str.replace('county_y', 'county')
```


```python
disparities.columns = disparities.columns.str.replace('urban_y', 'urban')
```


```python
print(set(disparities.measure_well),set(disparities.measure_emer),set(disparities.measure_hosp))
```

    {'Preventive Services'} {'Emergency department visit rate'} {'Hospitalization'}



```python
disparities = disparities.drop(['measure_well','measure_emer','measure_hosp'], axis = 1)

```


```python
disparities.iloc[0]
```




    year                                       2019
    primary_sex                                 All
    primary_age                                 All
    primary_dual                    Dual & non-dual
    state                                 TENNESSEE
    primary_race                                All
    primary_eligibility                         All
    primary_denominator_well            5,000-9,999
    analysis_value_well                          35
    primary_denominator_hosp                10,000+
    analysis_value_hosp                         267
    primary_denominator_emer              undefined
    analysis_value_emer                         617
    laus_code                       CN4700100000000
    Name                                   Anderson
    Employed                                  33010
    Unemployed                                 1694
    unemployment_rate                           4.9
    FIPS                                      47001
    county                                 Anderson
    primary_care_physicians                    39.0
    population                                76061
    urban                                     Urban
    shadac_category             moderately adequate
    pcp_per_100k                          51.274635
    Name: 47001, dtype: object




```python
disparities.to_csv("../data/disparities.csv")
```

## Analyzing disparities in access: physicians


```python
disparities = pd.read_csv('../data/disparities.csv', index_col = 0)
```


```python
hospitals = pd.read_csv('../data/Hospitals.csv')
hospitals = hospitals.loc[hospitals.STATE =='TN']
hospitals.COUNTYFIPS = pd.to_numeric(hospitals['COUNTYFIPS'])
```


```python
disparities.corr().style.background_gradient('viridis')
```

    /Users/smgroves/Documents/anaconda3/envs/geo_dse/lib/python3.9/site-packages/pandas/io/formats/style.py:2813: RuntimeWarning: All-NaN slice encountered
      smin = np.nanmin(gmap) if vmin is None else vmin
    /Users/smgroves/Documents/anaconda3/envs/geo_dse/lib/python3.9/site-packages/pandas/io/formats/style.py:2814: RuntimeWarning: All-NaN slice encountered
      smax = np.nanmax(gmap) if vmax is None else vmax





<style type="text/css">
#T_edc25_row0_col0, #T_edc25_row0_col1, #T_edc25_row0_col2, #T_edc25_row0_col3, #T_edc25_row0_col4, #T_edc25_row0_col5, #T_edc25_row0_col6, #T_edc25_row0_col7, #T_edc25_row0_col8, #T_edc25_row0_col9, #T_edc25_row0_col10, #T_edc25_row1_col0, #T_edc25_row2_col0, #T_edc25_row3_col0, #T_edc25_row4_col0, #T_edc25_row5_col0, #T_edc25_row6_col0, #T_edc25_row7_col0, #T_edc25_row8_col0, #T_edc25_row9_col0, #T_edc25_row10_col0 {
  background-color: #000000;
  color: #f1f1f1;
}
#T_edc25_row1_col1, #T_edc25_row2_col2, #T_edc25_row3_col3, #T_edc25_row4_col4, #T_edc25_row5_col5, #T_edc25_row6_col6, #T_edc25_row7_col7, #T_edc25_row8_col8, #T_edc25_row9_col9, #T_edc25_row10_col10 {
  background-color: #fde725;
  color: #000000;
}
#T_edc25_row1_col2, #T_edc25_row1_col3, #T_edc25_row2_col1, #T_edc25_row3_col1, #T_edc25_row3_col5, #T_edc25_row3_col8, #T_edc25_row3_col9, #T_edc25_row3_col10, #T_edc25_row6_col4, #T_edc25_row6_col7, #T_edc25_row10_col6 {
  background-color: #440154;
  color: #f1f1f1;
}
#T_edc25_row1_col4 {
  background-color: #29798e;
  color: #f1f1f1;
}
#T_edc25_row1_col5 {
  background-color: #34618d;
  color: #f1f1f1;
}
#T_edc25_row1_col6 {
  background-color: #440256;
  color: #f1f1f1;
}
#T_edc25_row1_col7 {
  background-color: #472c7a;
  color: #f1f1f1;
}
#T_edc25_row1_col8 {
  background-color: #26818e;
  color: #f1f1f1;
}
#T_edc25_row1_col9 {
  background-color: #2b758e;
  color: #f1f1f1;
}
#T_edc25_row1_col10 {
  background-color: #2ab07f;
  color: #f1f1f1;
}
#T_edc25_row2_col3, #T_edc25_row3_col2 {
  background-color: #52c569;
  color: #000000;
}
#T_edc25_row2_col4 {
  background-color: #482071;
  color: #f1f1f1;
}
#T_edc25_row2_col5 {
  background-color: #48186a;
  color: #f1f1f1;
}
#T_edc25_row2_col6 {
  background-color: #24868e;
  color: #f1f1f1;
}
#T_edc25_row2_col7, #T_edc25_row7_col6 {
  background-color: #443b84;
  color: #f1f1f1;
}
#T_edc25_row2_col8, #T_edc25_row2_col9 {
  background-color: #481a6c;
  color: #f1f1f1;
}
#T_edc25_row2_col10 {
  background-color: #481769;
  color: #f1f1f1;
}
#T_edc25_row3_col4, #T_edc25_row6_col9 {
  background-color: #450559;
  color: #f1f1f1;
}
#T_edc25_row3_col6 {
  background-color: #25ac82;
  color: #f1f1f1;
}
#T_edc25_row3_col7 {
  background-color: #481467;
  color: #f1f1f1;
}
#T_edc25_row4_col1 {
  background-color: #1f948c;
  color: #f1f1f1;
}
#T_edc25_row4_col2, #T_edc25_row9_col2 {
  background-color: #39558c;
  color: #f1f1f1;
}
#T_edc25_row4_col3 {
  background-color: #414487;
  color: #f1f1f1;
}
#T_edc25_row4_col5, #T_edc25_row5_col4, #T_edc25_row8_col9, #T_edc25_row9_col8 {
  background-color: #ece51b;
  color: #000000;
}
#T_edc25_row4_col6, #T_edc25_row6_col1 {
  background-color: #482576;
  color: #f1f1f1;
}
#T_edc25_row4_col7, #T_edc25_row5_col7, #T_edc25_row8_col7, #T_edc25_row9_col7 {
  background-color: #433d84;
  color: #f1f1f1;
}
#T_edc25_row4_col8, #T_edc25_row8_col4 {
  background-color: #eae51a;
  color: #000000;
}
#T_edc25_row4_col9, #T_edc25_row9_col4 {
  background-color: #fbe723;
  color: #000000;
}
#T_edc25_row4_col10, #T_edc25_row9_col10 {
  background-color: #2db27d;
  color: #f1f1f1;
}
#T_edc25_row5_col1 {
  background-color: #238a8d;
  color: #f1f1f1;
}
#T_edc25_row5_col2 {
  background-color: #365d8d;
  color: #f1f1f1;
}
#T_edc25_row5_col3, #T_edc25_row7_col8, #T_edc25_row8_col2 {
  background-color: #3c508b;
  color: #f1f1f1;
}
#T_edc25_row5_col6 {
  background-color: #424186;
  color: #f1f1f1;
}
#T_edc25_row5_col8 {
  background-color: #dde318;
  color: #000000;
}
#T_edc25_row5_col9, #T_edc25_row9_col5 {
  background-color: #f6e620;
  color: #000000;
}
#T_edc25_row5_col10 {
  background-color: #21a685;
  color: #f1f1f1;
}
#T_edc25_row6_col2 {
  background-color: #20928c;
  color: #f1f1f1;
}
#T_edc25_row6_col3 {
  background-color: #2fb47c;
  color: #f1f1f1;
}
#T_edc25_row6_col5 {
  background-color: #471063;
  color: #f1f1f1;
}
#T_edc25_row6_col8 {
  background-color: #470d60;
  color: #f1f1f1;
}
#T_edc25_row6_col10 {
  background-color: #471164;
  color: #f1f1f1;
}
#T_edc25_row7_col1 {
  background-color: #2f6b8e;
  color: #f1f1f1;
}
#T_edc25_row7_col2 {
  background-color: #2c738e;
  color: #f1f1f1;
}
#T_edc25_row7_col3 {
  background-color: #355e8d;
  color: #f1f1f1;
}
#T_edc25_row7_col4 {
  background-color: #3c4f8a;
  color: #f1f1f1;
}
#T_edc25_row7_col5, #T_edc25_row8_col3, #T_edc25_row10_col7 {
  background-color: #424086;
  color: #f1f1f1;
}
#T_edc25_row7_col9 {
  background-color: #3e4a89;
  color: #f1f1f1;
}
#T_edc25_row7_col10 {
  background-color: #2e6e8e;
  color: #f1f1f1;
}
#T_edc25_row8_col1 {
  background-color: #1f9a8a;
  color: #f1f1f1;
}
#T_edc25_row8_col5 {
  background-color: #dae319;
  color: #000000;
}
#T_edc25_row8_col6 {
  background-color: #472e7c;
  color: #f1f1f1;
}
#T_edc25_row8_col10 {
  background-color: #54c568;
  color: #000000;
}
#T_edc25_row9_col1 {
  background-color: #20938c;
  color: #f1f1f1;
}
#T_edc25_row9_col3 {
  background-color: #404688;
  color: #f1f1f1;
}
#T_edc25_row9_col6 {
  background-color: #472f7d;
  color: #f1f1f1;
}
#T_edc25_row10_col1 {
  background-color: #31b57b;
  color: #f1f1f1;
}
#T_edc25_row10_col2 {
  background-color: #482979;
  color: #f1f1f1;
}
#T_edc25_row10_col3 {
  background-color: #481668;
  color: #f1f1f1;
}
#T_edc25_row10_col4 {
  background-color: #20a486;
  color: #f1f1f1;
}
#T_edc25_row10_col5 {
  background-color: #218f8d;
  color: #f1f1f1;
}
#T_edc25_row10_col8 {
  background-color: #3fbc73;
  color: #f1f1f1;
}
#T_edc25_row10_col9 {
  background-color: #1fa287;
  color: #f1f1f1;
}
</style>
<table id="T_edc25_">
  <thead>
    <tr>
      <th class="blank level0" >&nbsp;</th>
      <th class="col_heading level0 col0" >year</th>
      <th class="col_heading level0 col1" >analysis_value_well</th>
      <th class="col_heading level0 col2" >analysis_value_hosp</th>
      <th class="col_heading level0 col3" >analysis_value_emer</th>
      <th class="col_heading level0 col4" >Employed</th>
      <th class="col_heading level0 col5" >Unemployed</th>
      <th class="col_heading level0 col6" >unemployment_rate</th>
      <th class="col_heading level0 col7" >FIPS.1</th>
      <th class="col_heading level0 col8" >primary_care_physicians</th>
      <th class="col_heading level0 col9" >population</th>
      <th class="col_heading level0 col10" >pcp_per_100k</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th id="T_edc25_level0_row0" class="row_heading level0 row0" >year</th>
      <td id="T_edc25_row0_col0" class="data row0 col0" >nan</td>
      <td id="T_edc25_row0_col1" class="data row0 col1" >nan</td>
      <td id="T_edc25_row0_col2" class="data row0 col2" >nan</td>
      <td id="T_edc25_row0_col3" class="data row0 col3" >nan</td>
      <td id="T_edc25_row0_col4" class="data row0 col4" >nan</td>
      <td id="T_edc25_row0_col5" class="data row0 col5" >nan</td>
      <td id="T_edc25_row0_col6" class="data row0 col6" >nan</td>
      <td id="T_edc25_row0_col7" class="data row0 col7" >nan</td>
      <td id="T_edc25_row0_col8" class="data row0 col8" >nan</td>
      <td id="T_edc25_row0_col9" class="data row0 col9" >nan</td>
      <td id="T_edc25_row0_col10" class="data row0 col10" >nan</td>
    </tr>
    <tr>
      <th id="T_edc25_level0_row1" class="row_heading level0 row1" >analysis_value_well</th>
      <td id="T_edc25_row1_col0" class="data row1 col0" >nan</td>
      <td id="T_edc25_row1_col1" class="data row1 col1" >1.000000</td>
      <td id="T_edc25_row1_col2" class="data row1 col2" >-0.480732</td>
      <td id="T_edc25_row1_col3" class="data row1 col3" >-0.480607</td>
      <td id="T_edc25_row1_col4" class="data row1 col4" >0.288357</td>
      <td id="T_edc25_row1_col5" class="data row1 col5" >0.221078</td>
      <td id="T_edc25_row1_col6" class="data row1 col6" >-0.325228</td>
      <td id="T_edc25_row1_col7" class="data row1 col7" >0.032489</td>
      <td id="T_edc25_row1_col8" class="data row1 col8" >0.319609</td>
      <td id="T_edc25_row1_col9" class="data row1 col9" >0.281995</td>
      <td id="T_edc25_row1_col10" class="data row1 col10" >0.488941</td>
    </tr>
    <tr>
      <th id="T_edc25_level0_row2" class="row_heading level0 row2" >analysis_value_hosp</th>
      <td id="T_edc25_row2_col0" class="data row2 col0" >nan</td>
      <td id="T_edc25_row2_col1" class="data row2 col1" >-0.480732</td>
      <td id="T_edc25_row2_col2" class="data row2 col2" >1.000000</td>
      <td id="T_edc25_row2_col3" class="data row2 col3" >0.599412</td>
      <td id="T_edc25_row2_col4" class="data row2 col4" >-0.093001</td>
      <td id="T_edc25_row2_col5" class="data row2 col5" >-0.049513</td>
      <td id="T_edc25_row2_col6" class="data row2 col6" >0.275980</td>
      <td id="T_edc25_row2_col7" class="data row2 col7" >0.085773</td>
      <td id="T_edc25_row2_col8" class="data row2 col8" >-0.121397</td>
      <td id="T_edc25_row2_col9" class="data row2 col9" >-0.091323</td>
      <td id="T_edc25_row2_col10" class="data row2 col10" >-0.308934</td>
    </tr>
    <tr>
      <th id="T_edc25_level0_row3" class="row_heading level0 row3" >analysis_value_emer</th>
      <td id="T_edc25_row3_col0" class="data row3 col0" >nan</td>
      <td id="T_edc25_row3_col1" class="data row3 col1" >-0.480607</td>
      <td id="T_edc25_row3_col2" class="data row3 col2" >0.599412</td>
      <td id="T_edc25_row3_col3" class="data row3 col3" >1.000000</td>
      <td id="T_edc25_row3_col4" class="data row3 col4" >-0.179994</td>
      <td id="T_edc25_row3_col5" class="data row3 col5" >-0.121924</td>
      <td id="T_edc25_row3_col6" class="data row3 col6" >0.484027</td>
      <td id="T_edc25_row3_col7" class="data row3 col7" >-0.044881</td>
      <td id="T_edc25_row3_col8" class="data row3 col8" >-0.202044</td>
      <td id="T_edc25_row3_col9" class="data row3 col9" >-0.172820</td>
      <td id="T_edc25_row3_col10" class="data row3 col10" >-0.396181</td>
    </tr>
    <tr>
      <th id="T_edc25_level0_row4" class="row_heading level0 row4" >Employed</th>
      <td id="T_edc25_row4_col0" class="data row4 col0" >nan</td>
      <td id="T_edc25_row4_col1" class="data row4 col1" >0.288357</td>
      <td id="T_edc25_row4_col2" class="data row4 col2" >-0.093001</td>
      <td id="T_edc25_row4_col3" class="data row4 col3" >-0.179994</td>
      <td id="T_edc25_row4_col4" class="data row4 col4" >1.000000</td>
      <td id="T_edc25_row4_col5" class="data row4 col5" >0.965032</td>
      <td id="T_edc25_row4_col6" class="data row4 col6" >-0.196023</td>
      <td id="T_edc25_row4_col7" class="data row4 col7" >0.089982</td>
      <td id="T_edc25_row4_col8" class="data row4 col8" >0.961056</td>
      <td id="T_edc25_row4_col9" class="data row4 col9" >0.992966</td>
      <td id="T_edc25_row4_col10" class="data row4 col10" >0.502287</td>
    </tr>
    <tr>
      <th id="T_edc25_level0_row5" class="row_heading level0 row5" >Unemployed</th>
      <td id="T_edc25_row5_col0" class="data row5 col0" >nan</td>
      <td id="T_edc25_row5_col1" class="data row5 col1" >0.221078</td>
      <td id="T_edc25_row5_col2" class="data row5 col2" >-0.049513</td>
      <td id="T_edc25_row5_col3" class="data row5 col3" >-0.121924</td>
      <td id="T_edc25_row5_col4" class="data row5 col4" >0.965032</td>
      <td id="T_edc25_row5_col5" class="data row5 col5" >1.000000</td>
      <td id="T_edc25_row5_col6" class="data row5 col6" >-0.077655</td>
      <td id="T_edc25_row5_col7" class="data row5 col7" >0.091267</td>
      <td id="T_edc25_row5_col8" class="data row5 col8" >0.934610</td>
      <td id="T_edc25_row5_col9" class="data row5 col9" >0.985295</td>
      <td id="T_edc25_row5_col10" class="data row5 col10" >0.432351</td>
    </tr>
    <tr>
      <th id="T_edc25_level0_row6" class="row_heading level0 row6" >unemployment_rate</th>
      <td id="T_edc25_row6_col0" class="data row6 col0" >nan</td>
      <td id="T_edc25_row6_col1" class="data row6 col1" >-0.325228</td>
      <td id="T_edc25_row6_col2" class="data row6 col2" >0.275980</td>
      <td id="T_edc25_row6_col3" class="data row6 col3" >0.484027</td>
      <td id="T_edc25_row6_col4" class="data row6 col4" >-0.196023</td>
      <td id="T_edc25_row6_col5" class="data row6 col5" >-0.077655</td>
      <td id="T_edc25_row6_col6" class="data row6 col6" >1.000000</td>
      <td id="T_edc25_row6_col7" class="data row6 col7" >-0.104688</td>
      <td id="T_edc25_row6_col8" class="data row6 col8" >-0.159979</td>
      <td id="T_edc25_row6_col9" class="data row6 col9" >-0.156259</td>
      <td id="T_edc25_row6_col10" class="data row6 col10" >-0.335333</td>
    </tr>
    <tr>
      <th id="T_edc25_level0_row7" class="row_heading level0 row7" >FIPS.1</th>
      <td id="T_edc25_row7_col0" class="data row7 col0" >nan</td>
      <td id="T_edc25_row7_col1" class="data row7 col1" >0.032489</td>
      <td id="T_edc25_row7_col2" class="data row7 col2" >0.085773</td>
      <td id="T_edc25_row7_col3" class="data row7 col3" >-0.044881</td>
      <td id="T_edc25_row7_col4" class="data row7 col4" >0.089982</td>
      <td id="T_edc25_row7_col5" class="data row7 col5" >0.091267</td>
      <td id="T_edc25_row7_col6" class="data row7 col6" >-0.104688</td>
      <td id="T_edc25_row7_col7" class="data row7 col7" >1.000000</td>
      <td id="T_edc25_row7_col8" class="data row7 col8" >0.093030</td>
      <td id="T_edc25_row7_col9" class="data row7 col9" >0.091808</td>
      <td id="T_edc25_row7_col10" class="data row7 col10" >0.103152</td>
    </tr>
    <tr>
      <th id="T_edc25_level0_row8" class="row_heading level0 row8" >primary_care_physicians</th>
      <td id="T_edc25_row8_col0" class="data row8 col0" >nan</td>
      <td id="T_edc25_row8_col1" class="data row8 col1" >0.319609</td>
      <td id="T_edc25_row8_col2" class="data row8 col2" >-0.121397</td>
      <td id="T_edc25_row8_col3" class="data row8 col3" >-0.202044</td>
      <td id="T_edc25_row8_col4" class="data row8 col4" >0.961056</td>
      <td id="T_edc25_row8_col5" class="data row8 col5" >0.934610</td>
      <td id="T_edc25_row8_col6" class="data row8 col6" >-0.159979</td>
      <td id="T_edc25_row8_col7" class="data row8 col7" >0.093030</td>
      <td id="T_edc25_row8_col8" class="data row8 col8" >1.000000</td>
      <td id="T_edc25_row8_col9" class="data row8 col9" >0.964170</td>
      <td id="T_edc25_row8_col10" class="data row8 col10" >0.624601</td>
    </tr>
    <tr>
      <th id="T_edc25_level0_row9" class="row_heading level0 row9" >population</th>
      <td id="T_edc25_row9_col0" class="data row9 col0" >nan</td>
      <td id="T_edc25_row9_col1" class="data row9 col1" >0.281995</td>
      <td id="T_edc25_row9_col2" class="data row9 col2" >-0.091323</td>
      <td id="T_edc25_row9_col3" class="data row9 col3" >-0.172820</td>
      <td id="T_edc25_row9_col4" class="data row9 col4" >0.992966</td>
      <td id="T_edc25_row9_col5" class="data row9 col5" >0.985295</td>
      <td id="T_edc25_row9_col6" class="data row9 col6" >-0.156259</td>
      <td id="T_edc25_row9_col7" class="data row9 col7" >0.091808</td>
      <td id="T_edc25_row9_col8" class="data row9 col8" >0.964170</td>
      <td id="T_edc25_row9_col9" class="data row9 col9" >1.000000</td>
      <td id="T_edc25_row9_col10" class="data row9 col10" >0.501609</td>
    </tr>
    <tr>
      <th id="T_edc25_level0_row10" class="row_heading level0 row10" >pcp_per_100k</th>
      <td id="T_edc25_row10_col0" class="data row10 col0" >nan</td>
      <td id="T_edc25_row10_col1" class="data row10 col1" >0.488941</td>
      <td id="T_edc25_row10_col2" class="data row10 col2" >-0.308934</td>
      <td id="T_edc25_row10_col3" class="data row10 col3" >-0.396181</td>
      <td id="T_edc25_row10_col4" class="data row10 col4" >0.502287</td>
      <td id="T_edc25_row10_col5" class="data row10 col5" >0.432351</td>
      <td id="T_edc25_row10_col6" class="data row10 col6" >-0.335333</td>
      <td id="T_edc25_row10_col7" class="data row10 col7" >0.103152</td>
      <td id="T_edc25_row10_col8" class="data row10 col8" >0.624601</td>
      <td id="T_edc25_row10_col9" class="data row10 col9" >0.501609</td>
      <td id="T_edc25_row10_col10" class="data row10 col10" >1.000000</td>
    </tr>
  </tbody>
</table>





```python
disparities.columns
```




    Index(['year', 'primary_sex', 'primary_age', 'primary_dual', 'state',
           'primary_race', 'primary_eligibility', 'primary_denominator_well',
           'analysis_value_well', 'primary_denominator_hosp',
           'analysis_value_hosp', 'primary_denominator_emer',
           'analysis_value_emer', 'laus_code', 'Name', 'Employed', 'Unemployed',
           'unemployment_rate', 'FIPS.1', 'county', 'primary_care_physicians',
           'population', 'urban', 'shadac_category', 'pcp_per_100k'],
          dtype='object')




```python
import seaborn as sns
sns.pairplot(disparities[['analysis_value_well', 
                          'analysis_value_hosp', 
                          'analysis_value_emer',
                          'unemployment_rate',
                          'population',
                          'pcp_per_100k','urban'
                         ]], hue = 'urban')
```




    <seaborn.axisgrid.PairGrid at 0x19f0b01c0>


<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_58_1.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 

    
    


First, we will look at primary care physicians by county. We already did this, so we will summarize in plots below.


```python
sns.boxplot(disparities.shadac_category, disparities.pcp_per_100k)
```

    /Users/smgroves/Documents/anaconda3/envs/geo_dse/lib/python3.9/site-packages/seaborn/_decorators.py:36: FutureWarning: Pass the following variables as keyword args: x, y. From version 0.12, the only valid positional argument will be `data`, and passing other arguments without an explicit keyword will result in an error or misinterpretation.
      warnings.warn(





    <AxesSubplot:xlabel='shadac_category', ylabel='pcp_per_100k'>



<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_60_2.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
    
    



```python
disparities.shadac_category.value_counts()
```




    moderately adequate    50
    low inadequate         31
    adequate               14
    Name: shadac_category, dtype: int64



There are 31 counties considered low inadequate (>3500 residents per physician).


```python
low_shadac = disparities.loc[disparities.shadac_category == 'low inadequate']
```


```python
low_shadac.sort_values('pcp_per_100k').head(10)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>year</th>
      <th>primary_sex</th>
      <th>primary_age</th>
      <th>primary_dual</th>
      <th>state</th>
      <th>primary_race</th>
      <th>primary_eligibility</th>
      <th>primary_denominator_well</th>
      <th>analysis_value_well</th>
      <th>primary_denominator_hosp</th>
      <th>...</th>
      <th>Employed</th>
      <th>Unemployed</th>
      <th>unemployment_rate</th>
      <th>FIPS.1</th>
      <th>county</th>
      <th>primary_care_physicians</th>
      <th>population</th>
      <th>urban</th>
      <th>shadac_category</th>
      <th>pcp_per_100k</th>
    </tr>
    <tr>
      <th>FIPS</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>47175</th>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>500-999</td>
      <td>31</td>
      <td>500-999</td>
      <td>...</td>
      <td>1884</td>
      <td>137</td>
      <td>6.8</td>
      <td>47175</td>
      <td>Van Buren</td>
      <td>0.0</td>
      <td>5760</td>
      <td>Rural</td>
      <td>low inadequate</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>47033</th>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>1,000-4,999</td>
      <td>25</td>
      <td>1,000-4,999</td>
      <td>...</td>
      <td>6494</td>
      <td>344</td>
      <td>5.0</td>
      <td>47033</td>
      <td>Crockett</td>
      <td>0.0</td>
      <td>14399</td>
      <td>Rural</td>
      <td>low inadequate</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>47061</th>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>1,000-4,999</td>
      <td>34</td>
      <td>1,000-4,999</td>
      <td>...</td>
      <td>4655</td>
      <td>322</td>
      <td>6.5</td>
      <td>47061</td>
      <td>Grundy</td>
      <td>0.0</td>
      <td>13344</td>
      <td>Rural</td>
      <td>low inadequate</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>47095</th>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>500-999</td>
      <td>20</td>
      <td>1,000-4,999</td>
      <td>...</td>
      <td>1537</td>
      <td>157</td>
      <td>9.3</td>
      <td>47095</td>
      <td>Lake</td>
      <td>0.0</td>
      <td>7401</td>
      <td>Rural</td>
      <td>low inadequate</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>47007</th>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>1,000-4,999</td>
      <td>19</td>
      <td>1,000-4,999</td>
      <td>...</td>
      <td>3947</td>
      <td>305</td>
      <td>7.2</td>
      <td>47007</td>
      <td>Bledsoe</td>
      <td>1.0</td>
      <td>14836</td>
      <td>Rural</td>
      <td>low inadequate</td>
      <td>6.740361</td>
    </tr>
    <tr>
      <th>47161</th>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>1,000-4,999</td>
      <td>39</td>
      <td>1,000-4,999</td>
      <td>...</td>
      <td>5146</td>
      <td>305</td>
      <td>5.6</td>
      <td>47161</td>
      <td>Stewart</td>
      <td>1.0</td>
      <td>13427</td>
      <td>Urban</td>
      <td>low inadequate</td>
      <td>7.447680</td>
    </tr>
    <tr>
      <th>47097</th>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>1,000-4,999</td>
      <td>36</td>
      <td>1,000-4,999</td>
      <td>...</td>
      <td>9075</td>
      <td>658</td>
      <td>6.8</td>
      <td>47097</td>
      <td>Lauderdale</td>
      <td>2.0</td>
      <td>25989</td>
      <td>Rural</td>
      <td>low inadequate</td>
      <td>7.695564</td>
    </tr>
    <tr>
      <th>47129</th>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>1,000-4,999</td>
      <td>23</td>
      <td>1,000-4,999</td>
      <td>...</td>
      <td>7327</td>
      <td>455</td>
      <td>5.8</td>
      <td>47129</td>
      <td>Morgan</td>
      <td>3.0</td>
      <td>21545</td>
      <td>Rural</td>
      <td>low inadequate</td>
      <td>13.924344</td>
    </tr>
    <tr>
      <th>47117</th>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>1,000-4,999</td>
      <td>20</td>
      <td>1,000-4,999</td>
      <td>...</td>
      <td>14422</td>
      <td>735</td>
      <td>4.8</td>
      <td>47117</td>
      <td>Marshall</td>
      <td>5.0</td>
      <td>32965</td>
      <td>Rural</td>
      <td>low inadequate</td>
      <td>15.167602</td>
    </tr>
    <tr>
      <th>47067</th>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>500-999</td>
      <td>27</td>
      <td>500-999</td>
      <td>...</td>
      <td>1997</td>
      <td>144</td>
      <td>6.7</td>
      <td>47067</td>
      <td>Hancock</td>
      <td>1.0</td>
      <td>6587</td>
      <td>Rural</td>
      <td>low inadequate</td>
      <td>15.181418</td>
    </tr>
  </tbody>
</table>
<p>10 rows × 25 columns</p>
</div>



There are 31 counties with low access to physicians, by SHADAC category.
<b>In particular, 4 counties have 0 physicians: Van Buren, Crockett, Grundy, and Lake.</b> All four are rural, though Crockett and Grundy have almost 15,000 residents.



```python

```

### Analyzing disparities in access: hospitals

We would like to add hospitals per 100K residents for each county to disparities. To do this, we need to get hospitals.COUNTY and disparities.county in the same format, and then we can add up the # of hospitals (plus associated variables) for each county by population.


```python
hospitals.iloc[0]
```




    X                                           -9409026.0792
    Y                                            4210878.1252
    OBJECTID                                              517
    ID                                               14737331
    NAME                 STARR REGIONAL MEDICAL CENTER ETOWAH
    ADDRESS                             886 HIGHWAY 411 NORTH
    CITY                                               ETOWAH
    STATE                                                  TN
    ZIP                                                 37331
    ZIP4                                        NOT AVAILABLE
    TELEPHONE                                  (423) 263-3600
    TYPE                                   GENERAL ACUTE CARE
    STATUS                                               OPEN
    POPULATION                                             72
    COUNTY                                             MCMINN
    COUNTYFIPS                                          47107
    COUNTRY                                               USA
    LATITUDE                                        35.345099
    LONGITUDE                                      -84.522719
    NAICS_CODE                                         622110
    NAICS_DESC         GENERAL MEDICAL AND SURGICAL HOSPITALS
    SOURCE        https://apps.health.tn.gov/facilitylistings
    SOURCEDATE                            2019/08/10 00:00:00
    VAL_METHOD                                        IMAGERY
    VAL_DATE                              2014/02/10 00:00:00
    WEBSITE                     http://www.starrregional.com/
    STATE_ID                                    NOT AVAILABLE
    ALT_NAME                          WOODS MEMORIAL HOSPITAL
    ST_FIPS                                                47
    OWNER                                          NON-PROFIT
    TTL_STAFF                                            -999
    BEDS                                                   72
    TRAUMA                                          LEVEL III
    HELIPAD                                                 Y
    Name: 515, dtype: object




```python
hospitals.COUNTYFIPS.value_counts()
```




    47157    23
    47037    15
    47065    13
    47093    11
    47179     7
             ..
    47019     1
    47177     1
    47027     1
    47159     1
    47181     1
    Name: COUNTYFIPS, Length: 80, dtype: int64




```python
for i in range(len(hospitals.COUNTYFIPS.value_counts())):
    ind = (hospitals.COUNTYFIPS.value_counts().index[i])
    count = (hospitals.COUNTYFIPS.value_counts()[ind])
    disparities.loc[ind, 'num_hospitals'] = count
```

However, some of these hospitals are closed.


```python
set(hospitals.STATUS)
```




    {'CLOSED', 'OPEN'}




```python
hospitals.groupby('COUNTYFIPS').STATUS.value_counts()
```




    COUNTYFIPS  STATUS
    47001       OPEN      1
    47003       CLOSED    1
                OPEN      1
    47005       OPEN      1
    47007       OPEN      1
                         ..
    47181       OPEN      1
    47183       OPEN      2
    47185       OPEN      1
    47187       OPEN      2
    47189       OPEN      2
    Name: STATUS, Length: 89, dtype: int64




```python
for i in range(len(hospitals.loc[hospitals.STATUS == 'OPEN'].COUNTYFIPS.value_counts())):
    ind = (hospitals.loc[hospitals.STATUS == 'OPEN'].COUNTYFIPS.value_counts().index[i])
    count = (hospitals.loc[hospitals.STATUS == 'OPEN'].COUNTYFIPS.value_counts()[ind])
    disparities.loc[ind, 'num_hospitals_open'] = count
```


```python
disparities
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>year</th>
      <th>primary_sex</th>
      <th>primary_age</th>
      <th>primary_dual</th>
      <th>state</th>
      <th>primary_race</th>
      <th>primary_eligibility</th>
      <th>primary_denominator_well</th>
      <th>analysis_value_well</th>
      <th>primary_denominator_hosp</th>
      <th>...</th>
      <th>unemployment_rate</th>
      <th>FIPS.1</th>
      <th>county</th>
      <th>primary_care_physicians</th>
      <th>population</th>
      <th>urban</th>
      <th>shadac_category</th>
      <th>pcp_per_100k</th>
      <th>num_hospitals</th>
      <th>num_hospitals_open</th>
    </tr>
    <tr>
      <th>FIPS</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>47001</th>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>5,000-9,999</td>
      <td>35</td>
      <td>10,000+</td>
      <td>...</td>
      <td>4.9</td>
      <td>47001</td>
      <td>Anderson</td>
      <td>39.0</td>
      <td>76061</td>
      <td>Urban</td>
      <td>moderately adequate</td>
      <td>51.274635</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>47003</th>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>1,000-4,999</td>
      <td>46</td>
      <td>5,000-9,999</td>
      <td>...</td>
      <td>5.2</td>
      <td>47003</td>
      <td>Bedford</td>
      <td>15.0</td>
      <td>48292</td>
      <td>Rural</td>
      <td>moderately adequate</td>
      <td>31.061045</td>
      <td>2.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>47005</th>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>1,000-4,999</td>
      <td>30</td>
      <td>1,000-4,999</td>
      <td>...</td>
      <td>6.2</td>
      <td>47005</td>
      <td>Benton</td>
      <td>3.0</td>
      <td>16140</td>
      <td>Rural</td>
      <td>low inadequate</td>
      <td>18.587361</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>47007</th>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>1,000-4,999</td>
      <td>19</td>
      <td>1,000-4,999</td>
      <td>...</td>
      <td>7.2</td>
      <td>47007</td>
      <td>Bledsoe</td>
      <td>1.0</td>
      <td>14836</td>
      <td>Rural</td>
      <td>low inadequate</td>
      <td>6.740361</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>47009</th>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>10,000+</td>
      <td>43</td>
      <td>10,000+</td>
      <td>...</td>
      <td>4.6</td>
      <td>47009</td>
      <td>Blount</td>
      <td>90.0</td>
      <td>129927</td>
      <td>Urban</td>
      <td>adequate</td>
      <td>69.269667</td>
      <td>2.0</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>47181</th>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>1,000-4,999</td>
      <td>15</td>
      <td>1,000-4,999</td>
      <td>...</td>
      <td>5.3</td>
      <td>47181</td>
      <td>Wayne</td>
      <td>5.0</td>
      <td>16693</td>
      <td>Rural</td>
      <td>moderately adequate</td>
      <td>29.952675</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>47183</th>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>1,000-4,999</td>
      <td>30</td>
      <td>5,000-9,999</td>
      <td>...</td>
      <td>4.6</td>
      <td>47183</td>
      <td>Weakley</td>
      <td>18.0</td>
      <td>33510</td>
      <td>Rural</td>
      <td>moderately adequate</td>
      <td>53.715309</td>
      <td>2.0</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>47185</th>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>1,000-4,999</td>
      <td>35</td>
      <td>5,000-9,999</td>
      <td>...</td>
      <td>5.0</td>
      <td>47185</td>
      <td>White</td>
      <td>9.0</td>
      <td>26800</td>
      <td>Rural</td>
      <td>moderately adequate</td>
      <td>33.582090</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>47187</th>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>10,000+</td>
      <td>48</td>
      <td>10,000+</td>
      <td>...</td>
      <td>3.3</td>
      <td>47187</td>
      <td>Williamson</td>
      <td>338.0</td>
      <td>225389</td>
      <td>Urban</td>
      <td>adequate</td>
      <td>149.962953</td>
      <td>2.0</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>47189</th>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>10,000+</td>
      <td>45</td>
      <td>10,000+</td>
      <td>...</td>
      <td>4.0</td>
      <td>47189</td>
      <td>Wilson</td>
      <td>43.0</td>
      <td>136666</td>
      <td>Urban</td>
      <td>moderately adequate</td>
      <td>31.463568</td>
      <td>2.0</td>
      <td>2.0</td>
    </tr>
  </tbody>
</table>
<p>95 rows × 27 columns</p>
</div>




```python
sns.scatterplot(data = disparities, x = 'pcp_per_100k', y = 'num_hospitals_open', hue = 'urban')
```




    <AxesSubplot:xlabel='pcp_per_100k', ylabel='num_hospitals_open'>



<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_77_1.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
    
    



```python
disparities = disparities.fillna(0)
```


```python
disparities.loc[(disparities.pcp_per_100k < 15) &
                (disparities.num_hospitals_open < 2 )]['county']
```




    FIPS
    47007       Bledsoe
    47033      Crockett
    47061        Grundy
    47095          Lake
    47097    Lauderdale
    47129        Morgan
    47161       Stewart
    47175     Van Buren
    Name: county, dtype: object



The counties above are the ones with fewer than 2 open hospitals and fewer than 15 pcp per 100k

Lastly, we can take a look at number of beds. We need to fillna (-999) with 0 so it doesn't mess up the counts.


```python
hospitals.BEDS = hospitals.BEDS.replace(-999,0)
```


```python
for i in range(len(hospitals.loc[hospitals.STATUS == 'OPEN'].COUNTYFIPS.value_counts())):
    ind = (hospitals.loc[hospitals.STATUS == 'OPEN'].COUNTYFIPS.value_counts().index[i])
    count = (hospitals.loc[hospitals.STATUS == 'OPEN'].groupby('COUNTYFIPS').BEDS.mean()[ind])
    disparities.loc[ind, 'mean_beds'] = count
```


```python
for i in range(len(hospitals.loc[hospitals.STATUS == 'OPEN'].COUNTYFIPS.value_counts())):
    ind = (hospitals.loc[hospitals.STATUS == 'OPEN'].COUNTYFIPS.value_counts().index[i])
    count = (hospitals.loc[hospitals.STATUS == 'OPEN'].groupby('COUNTYFIPS').BEDS.sum()[ind])
    disparities.loc[ind, 'num_beds'] = count

```


```python
disparities.num_beds = disparities.num_beds.fillna(0)
```


```python
sns.scatterplot(data = disparities.loc[disparities.urban == 'Rural'], x = 'num_hospitals_open', y = 'num_beds')#, hue = 'urban')
```




    <AxesSubplot:xlabel='num_hospitals_open', ylabel='num_beds'>



<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_86_1.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
    
    



```python
sns.scatterplot(data = disparities, x = 'pcp_per_100k', y = 'num_beds', hue = 'urban')
```




    <AxesSubplot:xlabel='pcp_per_100k', ylabel='num_beds'>


<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_87_1.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 

    
    



```python
disparities.to_csv('../data/disparities.csv')
```

### Plotting disparities


```python
median_income = pd.read_excel('../data/est18all.xls',
              sheet_name = 'est18ALL',
             header = 3,
             usecols = 'C,D,W')
```


```python
median_income.head(2)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Postal Code</th>
      <th>Name</th>
      <th>Median Household Income</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>US</td>
      <td>United States</td>
      <td>61937</td>
    </tr>
    <tr>
      <th>1</th>
      <td>AL</td>
      <td>Alabama</td>
      <td>49881</td>
    </tr>
  </tbody>
</table>
</div>



For this map, we only need the counties located in Tennessee.


```python
median_income = median_income.loc[median_income['Postal Code'] == 'TN']
median_income.head(2)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Postal Code</th>
      <th>Name</th>
      <th>Median Household Income</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2471</th>
      <td>TN</td>
      <td>Tennessee</td>
      <td>52366</td>
    </tr>
    <tr>
      <th>2472</th>
      <td>TN</td>
      <td>Anderson County</td>
      <td>50672</td>
    </tr>
  </tbody>
</table>
</div>



We can remove the first row.


```python
median_income = median_income.iloc[1:]
median_income.head(2)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Postal Code</th>
      <th>Name</th>
      <th>Median Household Income</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2472</th>
      <td>TN</td>
      <td>Anderson County</td>
      <td>50672</td>
    </tr>
    <tr>
      <th>2473</th>
      <td>TN</td>
      <td>Bedford County</td>
      <td>49860</td>
    </tr>
  </tbody>
</table>
</div>



Now, let's read in our counties shapefiles. This one was obtained from http://www.tngis.org/administrative-boundaries.htm

This creates a geopandas DataFrame, which is like a pandas DataFrame, but has geometry associated with it.


```python
counties = gpd.read_file('../data/county/tncounty.shp')
```


```python
counties.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>OBJECTID</th>
      <th>NAME</th>
      <th>KEY</th>
      <th>SHAPE_AREA</th>
      <th>SHAPE_LEN</th>
      <th>geometry</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>76</td>
      <td>Chester</td>
      <td>47023</td>
      <td>8.049024e+09</td>
      <td>520461.080124</td>
      <td>POLYGON ((1137985.762 344601.643, 1137965.070 ...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>77</td>
      <td>Wayne</td>
      <td>47181</td>
      <td>2.050741e+10</td>
      <td>666520.678598</td>
      <td>POLYGON ((1365052.057 391716.806, 1365746.554 ...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>78</td>
      <td>Tipton</td>
      <td>47167</td>
      <td>1.319125e+10</td>
      <td>865093.887634</td>
      <td>MULTIPOLYGON (((886814.330 400456.525, 886774....</td>
    </tr>
    <tr>
      <th>3</th>
      <td>79</td>
      <td>Hamilton</td>
      <td>47065</td>
      <td>1.604776e+10</td>
      <td>652926.001078</td>
      <td>POLYGON ((2274954.438 239788.911, 2274090.610 ...</td>
    </tr>
    <tr>
      <th>4</th>
      <td>80</td>
      <td>Stewart</td>
      <td>47161</td>
      <td>1.375003e+10</td>
      <td>490090.336180</td>
      <td>POLYGON ((1382472.783 743972.302, 1382445.171 ...</td>
    </tr>
  </tbody>
</table>
</div>




```python
median_income['NAME'] = median_income['Name'].str[:-7]
counties = pd.merge(left = counties,
                    right = median_income[['NAME', 'Median Household Income']])
counties['Median Household Income'] = pd.to_numeric(counties['Median Household Income'])
```


```python
from matplotlib.lines import Line2D

fig, ax = plt.subplots(figsize=(16,4))

counties.plot(column = 'Median Household Income', 
              edgecolor = 'black',
              legend = True,
              cmap = 'Blues',
              scheme="NaturalBreaks",
              ax = ax)

leg = ax.get_legend()

# Adjust the formatting of the legend
labels = []
n = len(leg.get_texts())
for i, lbl in enumerate(leg.get_texts()):
    label_text = lbl.get_text()
    lower = float(label_text.split()[0][:-1])
    upper = float(label_text.split()[1][:-1])
    if i == 0:
        new_text = "Below " + "\${:,.0f}".format(upper + 1)
    elif i == n - 1:
        new_text = "Above " + "\${:,.0f}".format(lower)
    else:
        new_text = "\${:,.0f}".format(lower + 1) + " - " + "\${:,.0f}".format(upper)
        
    labels.append(new_text)

# Adjust the marker appearance
# Extract the old markers and then modify by setting the edgecolor and edgewidth
markers = []
for line in leg.get_lines():
    marker = Line2D([0],[0], marker = 'o', 
                    markersize = line.get_markersize(), 
                    color = line.get_markerfacecolor(),
                    linestyle = 'None',
                    markeredgecolor = 'black',
                    markeredgewidth = 1)
    markers.append(marker)

# Redraw the legend with the new labels and markers
plt.legend(markers, labels, fontsize = 12)
leg = ax.get_legend()
leg.set_bbox_to_anchor((1, 0.5))
    
plt.title('Median Household Income by County, 2018', fontsize = 18)

ax.axis('off');
```

<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_100_0.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
        



```python
counties = pd.merge(left = counties, left_on = 'NAME',
         right = disparities, right_on = 'county')
```


```python
counties
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>OBJECTID</th>
      <th>NAME</th>
      <th>KEY</th>
      <th>SHAPE_AREA</th>
      <th>SHAPE_LEN</th>
      <th>geometry</th>
      <th>Median Household Income</th>
      <th>year</th>
      <th>primary_sex</th>
      <th>primary_age</th>
      <th>...</th>
      <th>county</th>
      <th>primary_care_physicians</th>
      <th>population</th>
      <th>urban</th>
      <th>shadac_category</th>
      <th>pcp_per_100k</th>
      <th>num_hospitals</th>
      <th>num_hospitals_open</th>
      <th>mean_beds</th>
      <th>num_beds</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>76</td>
      <td>Chester</td>
      <td>47023</td>
      <td>8.049024e+09</td>
      <td>520461.080124</td>
      <td>POLYGON ((1137985.762 344601.643, 1137965.070 ...</td>
      <td>47508</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>...</td>
      <td>Chester</td>
      <td>4.0</td>
      <td>17190</td>
      <td>Urban</td>
      <td>low inadequate</td>
      <td>23.269343</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>NaN</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>77</td>
      <td>Wayne</td>
      <td>47181</td>
      <td>2.050741e+10</td>
      <td>666520.678598</td>
      <td>POLYGON ((1365052.057 391716.806, 1365746.554 ...</td>
      <td>38879</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>...</td>
      <td>Wayne</td>
      <td>5.0</td>
      <td>16693</td>
      <td>Rural</td>
      <td>moderately adequate</td>
      <td>29.952675</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>80.0</td>
      <td>80.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>78</td>
      <td>Tipton</td>
      <td>47167</td>
      <td>1.319125e+10</td>
      <td>865093.887634</td>
      <td>MULTIPOLYGON (((886814.330 400456.525, 886774....</td>
      <td>60874</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>...</td>
      <td>Tipton</td>
      <td>17.0</td>
      <td>61447</td>
      <td>Urban</td>
      <td>low inadequate</td>
      <td>27.666119</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>100.0</td>
      <td>100.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>79</td>
      <td>Hamilton</td>
      <td>47065</td>
      <td>1.604776e+10</td>
      <td>652926.001078</td>
      <td>POLYGON ((2274954.438 239788.911, 2274090.610 ...</td>
      <td>57196</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>...</td>
      <td>Hamilton</td>
      <td>403.0</td>
      <td>360919</td>
      <td>Urban</td>
      <td>adequate</td>
      <td>111.659403</td>
      <td>13.0</td>
      <td>12.0</td>
      <td>160.0</td>
      <td>1920.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>80</td>
      <td>Stewart</td>
      <td>47161</td>
      <td>1.375003e+10</td>
      <td>490090.336180</td>
      <td>POLYGON ((1382472.783 743972.302, 1382445.171 ...</td>
      <td>46565</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>...</td>
      <td>Stewart</td>
      <td>1.0</td>
      <td>13427</td>
      <td>Urban</td>
      <td>low inadequate</td>
      <td>7.447680</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>NaN</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>90</th>
      <td>91</td>
      <td>McNairy</td>
      <td>47109</td>
      <td>1.563586e+10</td>
      <td>566369.132062</td>
      <td>POLYGON ((1137985.762 344601.643, 1139350.519 ...</td>
      <td>39859</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>...</td>
      <td>McNairy</td>
      <td>9.0</td>
      <td>25844</td>
      <td>Rural</td>
      <td>moderately adequate</td>
      <td>34.824331</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>NaN</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>91</th>
      <td>92</td>
      <td>Franklin</td>
      <td>47051</td>
      <td>1.605093e+10</td>
      <td>621176.096919</td>
      <td>POLYGON ((1873015.265 239618.144, 1872957.848 ...</td>
      <td>50201</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>...</td>
      <td>Franklin</td>
      <td>27.0</td>
      <td>41725</td>
      <td>Rural</td>
      <td>moderately adequate</td>
      <td>64.709407</td>
      <td>2.0</td>
      <td>2.0</td>
      <td>86.5</td>
      <td>173.0</td>
    </tr>
    <tr>
      <th>92</th>
      <td>93</td>
      <td>Bradley</td>
      <td>47011</td>
      <td>9.241234e+09</td>
      <td>457372.233476</td>
      <td>POLYGON ((2274954.438 239788.911, 2275552.803 ...</td>
      <td>50427</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>...</td>
      <td>Bradley</td>
      <td>55.0</td>
      <td>105749</td>
      <td>Urban</td>
      <td>moderately adequate</td>
      <td>52.009948</td>
      <td>2.0</td>
      <td>2.0</td>
      <td>174.0</td>
      <td>348.0</td>
    </tr>
    <tr>
      <th>93</th>
      <td>94</td>
      <td>Marion</td>
      <td>47115</td>
      <td>1.428734e+10</td>
      <td>529431.591556</td>
      <td>POLYGON ((2126056.390 236919.771, 2122873.509 ...</td>
      <td>50819</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>...</td>
      <td>Marion</td>
      <td>12.0</td>
      <td>28538</td>
      <td>Urban</td>
      <td>moderately adequate</td>
      <td>42.049198</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>68.0</td>
      <td>68.0</td>
    </tr>
    <tr>
      <th>94</th>
      <td>95</td>
      <td>Polk</td>
      <td>47139</td>
      <td>1.233228e+10</td>
      <td>479994.126988</td>
      <td>POLYGON ((2355580.184 332970.851, 2355673.384 ...</td>
      <td>41968</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>...</td>
      <td>Polk</td>
      <td>8.0</td>
      <td>16814</td>
      <td>Urban</td>
      <td>moderately adequate</td>
      <td>47.579398</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>NaN</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
<p>95 rows × 36 columns</p>
</div>




```python
counties
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>OBJECTID</th>
      <th>NAME</th>
      <th>KEY</th>
      <th>SHAPE_AREA</th>
      <th>SHAPE_LEN</th>
      <th>geometry</th>
      <th>Median Household Income</th>
      <th>year</th>
      <th>primary_sex</th>
      <th>primary_age</th>
      <th>...</th>
      <th>primary_care_physicians</th>
      <th>population</th>
      <th>urban</th>
      <th>shadac_category</th>
      <th>pcp_per_100k</th>
      <th>num_hospitals</th>
      <th>num_hospitals_open</th>
      <th>mean_beds</th>
      <th>num_beds</th>
      <th>num_hospitals_per_100k</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>76</td>
      <td>Chester</td>
      <td>47023</td>
      <td>8.049024e+09</td>
      <td>520461.080124</td>
      <td>POLYGON ((1137985.762 344601.643, 1137965.070 ...</td>
      <td>47508</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>...</td>
      <td>4.0</td>
      <td>17190</td>
      <td>Urban</td>
      <td>low inadequate</td>
      <td>23.269343</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>NaN</td>
      <td>0.0</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>1</th>
      <td>77</td>
      <td>Wayne</td>
      <td>47181</td>
      <td>2.050741e+10</td>
      <td>666520.678598</td>
      <td>POLYGON ((1365052.057 391716.806, 1365746.554 ...</td>
      <td>38879</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>...</td>
      <td>5.0</td>
      <td>16693</td>
      <td>Rural</td>
      <td>moderately adequate</td>
      <td>29.952675</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>80.0</td>
      <td>80.0</td>
      <td>5.990535</td>
    </tr>
    <tr>
      <th>2</th>
      <td>78</td>
      <td>Tipton</td>
      <td>47167</td>
      <td>1.319125e+10</td>
      <td>865093.887634</td>
      <td>MULTIPOLYGON (((886814.330 400456.525, 886774....</td>
      <td>60874</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>...</td>
      <td>17.0</td>
      <td>61447</td>
      <td>Urban</td>
      <td>low inadequate</td>
      <td>27.666119</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>100.0</td>
      <td>100.0</td>
      <td>1.627419</td>
    </tr>
    <tr>
      <th>3</th>
      <td>79</td>
      <td>Hamilton</td>
      <td>47065</td>
      <td>1.604776e+10</td>
      <td>652926.001078</td>
      <td>POLYGON ((2274954.438 239788.911, 2274090.610 ...</td>
      <td>57196</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>...</td>
      <td>403.0</td>
      <td>360919</td>
      <td>Urban</td>
      <td>adequate</td>
      <td>111.659403</td>
      <td>13.0</td>
      <td>12.0</td>
      <td>160.0</td>
      <td>1920.0</td>
      <td>3.324846</td>
    </tr>
    <tr>
      <th>4</th>
      <td>80</td>
      <td>Stewart</td>
      <td>47161</td>
      <td>1.375003e+10</td>
      <td>490090.336180</td>
      <td>POLYGON ((1382472.783 743972.302, 1382445.171 ...</td>
      <td>46565</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>...</td>
      <td>1.0</td>
      <td>13427</td>
      <td>Urban</td>
      <td>low inadequate</td>
      <td>7.447680</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>NaN</td>
      <td>0.0</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>90</th>
      <td>91</td>
      <td>McNairy</td>
      <td>47109</td>
      <td>1.563586e+10</td>
      <td>566369.132062</td>
      <td>POLYGON ((1137985.762 344601.643, 1139350.519 ...</td>
      <td>39859</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>...</td>
      <td>9.0</td>
      <td>25844</td>
      <td>Rural</td>
      <td>moderately adequate</td>
      <td>34.824331</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>NaN</td>
      <td>0.0</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>91</th>
      <td>92</td>
      <td>Franklin</td>
      <td>47051</td>
      <td>1.605093e+10</td>
      <td>621176.096919</td>
      <td>POLYGON ((1873015.265 239618.144, 1872957.848 ...</td>
      <td>50201</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>...</td>
      <td>27.0</td>
      <td>41725</td>
      <td>Rural</td>
      <td>moderately adequate</td>
      <td>64.709407</td>
      <td>2.0</td>
      <td>2.0</td>
      <td>86.5</td>
      <td>173.0</td>
      <td>4.793289</td>
    </tr>
    <tr>
      <th>92</th>
      <td>93</td>
      <td>Bradley</td>
      <td>47011</td>
      <td>9.241234e+09</td>
      <td>457372.233476</td>
      <td>POLYGON ((2274954.438 239788.911, 2275552.803 ...</td>
      <td>50427</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>...</td>
      <td>55.0</td>
      <td>105749</td>
      <td>Urban</td>
      <td>moderately adequate</td>
      <td>52.009948</td>
      <td>2.0</td>
      <td>2.0</td>
      <td>174.0</td>
      <td>348.0</td>
      <td>1.891271</td>
    </tr>
    <tr>
      <th>93</th>
      <td>94</td>
      <td>Marion</td>
      <td>47115</td>
      <td>1.428734e+10</td>
      <td>529431.591556</td>
      <td>POLYGON ((2126056.390 236919.771, 2122873.509 ...</td>
      <td>50819</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>...</td>
      <td>12.0</td>
      <td>28538</td>
      <td>Urban</td>
      <td>moderately adequate</td>
      <td>42.049198</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>68.0</td>
      <td>68.0</td>
      <td>3.504100</td>
    </tr>
    <tr>
      <th>94</th>
      <td>95</td>
      <td>Polk</td>
      <td>47139</td>
      <td>1.233228e+10</td>
      <td>479994.126988</td>
      <td>POLYGON ((2355580.184 332970.851, 2355673.384 ...</td>
      <td>41968</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>...</td>
      <td>8.0</td>
      <td>16814</td>
      <td>Urban</td>
      <td>moderately adequate</td>
      <td>47.579398</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>NaN</td>
      <td>0.0</td>
      <td>0.000000</td>
    </tr>
  </tbody>
</table>
<p>95 rows × 37 columns</p>
</div>




```python
from matplotlib.lines import Line2D

fig, ax = plt.subplots(figsize=(16,4))

counties.plot(column = 'num_hospitals_per_100k', 
              edgecolor = 'black',
              legend = True,
              cmap = 'Blues',
              scheme="Quantiles",
              ax = ax,
              # missing_kwds={
              # "color": "lightgrey",
              # "edgecolor": "grey",
              # "label": "Missing values",
              # },
              # classification_kwds ={k : 10}
)

leg = ax.get_legend()

# Adjust the formatting of the legend
labels = []
n = len(leg.get_texts())
for i, lbl in enumerate(leg.get_texts()):
    label_text = lbl.get_text()
    if label_text == 'Missing values': 
        labels.append(label_text)
        continue
    lower = float(label_text.split()[0][:-1])
    upper = float(label_text.split()[1][:-1])
    if i == 0:
        new_text = "Below " + "{:,.0f}".format(upper + 1)
    elif i == n - 1:
        new_text = "Above " + "{:,.0f}".format(lower)
    else:
        new_text = "{:,.0f}".format(lower + 1) + " - " + "{:,.0f}".format(upper)
        
    labels.append(new_text)

# Adjust the marker appearance
# Extract the old markers and then modify by setting the edgecolor and edgewidth
markers = []
for line in leg.get_lines():
    marker = Line2D([0],[0], marker = 'o', 
                    markersize = line.get_markersize(), 
                    color = line.get_markerfacecolor(),
                    linestyle = 'None',
                    markeredgecolor = 'black',
                    markeredgewidth = 1)
    markers.append(marker)

# Redraw the legend with the new labels and markers
plt.legend(markers, labels, fontsize = 12)
leg = ax.get_legend()
leg.set_bbox_to_anchor((1, 0.5))
    
plt.title('Number of Hospitals per 100K Residents by County', fontsize = 18)

ax.axis('off');
```

<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_104_0.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
    
    



```python
from matplotlib.lines import Line2D

fig, ax = plt.subplots(figsize=(16,4))

counties.plot(column = 'pcp_per_100k', 
              edgecolor = 'black',
              legend = True,
              cmap = 'Blues',
              scheme="Quantiles",
              ax = ax,
              # missing_kwds={
              # "color": "lightgrey",
              # "edgecolor": "grey",
              # "label": "Missing values",
              # },
              # classification_kwds ={k : 10}
)

leg = ax.get_legend()

# Adjust the formatting of the legend
labels = []
n = len(leg.get_texts())
for i, lbl in enumerate(leg.get_texts()):
    label_text = lbl.get_text()
    if label_text == 'Missing values': 
        labels.append(label_text)
        continue
    lower = float(label_text.split()[0][:-1])
    upper = float(label_text.split()[1][:-1])
    if i == 0:
        new_text = "Below " + "{:,.0f}".format(upper + 1)
    elif i == n - 1:
        new_text = "Above " + "{:,.0f}".format(lower)
    else:
        new_text = "{:,.0f}".format(lower + 1) + " - " + "{:,.0f}".format(upper)
        
    labels.append(new_text)

# Adjust the marker appearance
# Extract the old markers and then modify by setting the edgecolor and edgewidth
markers = []
for line in leg.get_lines():
    marker = Line2D([0],[0], marker = 'o', 
                    markersize = line.get_markersize(), 
                    color = line.get_markerfacecolor(),
                    linestyle = 'None',
                    markeredgecolor = 'black',
                    markeredgewidth = 1)
    markers.append(marker)

# Redraw the legend with the new labels and markers
plt.legend(markers, labels, fontsize = 12)
leg = ax.get_legend()
leg.set_bbox_to_anchor((1, 0.5))
    
plt.title('Number of PCP per 100K Residents by County', fontsize = 18)

ax.axis('off');
```

<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_105_0.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
    
    



```python
sns.scatterplot(data = counties, x = 'Median Household Income', y = 'num_beds', hue = 'shadac_category')
```




    <AxesSubplot:xlabel='Median Household Income', ylabel='num_beds'>



<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_106_1.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
        



```python
counties['num_hospitals_per_100k']=counties.num_hospitals_open/counties.population*100000
```


```python
sns.scatterplot(data = counties, x = 'Median Household Income', y = 'num_hospitals_open', hue = 'shadac_category')
```




    <AxesSubplot:xlabel='Median Household Income', ylabel='num_hospitals_open'>



<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_108_1.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
        



```python
sns.scatterplot(data = counties, x = 'Median Household Income', y = 'num_hospitals_per_100k', hue = 'urban')
plt.ylabel("Number Open Hospitals per 100K Residents")
plt.savefig('income_vs_hosp_urban.pdf')
```

<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_109_0.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
        



```python
disparities.sort_values(['pcp_per_100k','population'], ascending = [True,False])[['county', 'num_beds','num_hospitals','pcp_per_100k','population']][0:25]
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>county</th>
      <th>num_beds</th>
      <th>num_hospitals</th>
      <th>pcp_per_100k</th>
      <th>population</th>
    </tr>
    <tr>
      <th>FIPS</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>47033</th>
      <td>Crockett</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.000000</td>
      <td>14399</td>
    </tr>
    <tr>
      <th>47061</th>
      <td>Grundy</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.000000</td>
      <td>13344</td>
    </tr>
    <tr>
      <th>47095</th>
      <td>Lake</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.000000</td>
      <td>7401</td>
    </tr>
    <tr>
      <th>47175</th>
      <td>Van Buren</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.000000</td>
      <td>5760</td>
    </tr>
    <tr>
      <th>47007</th>
      <td>Bledsoe</td>
      <td>25.0</td>
      <td>1.0</td>
      <td>6.740361</td>
      <td>14836</td>
    </tr>
    <tr>
      <th>47161</th>
      <td>Stewart</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>7.447680</td>
      <td>13427</td>
    </tr>
    <tr>
      <th>47097</th>
      <td>Lauderdale</td>
      <td>25.0</td>
      <td>1.0</td>
      <td>7.695564</td>
      <td>25989</td>
    </tr>
    <tr>
      <th>47129</th>
      <td>Morgan</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>13.924344</td>
      <td>21545</td>
    </tr>
    <tr>
      <th>47117</th>
      <td>Marshall</td>
      <td>25.0</td>
      <td>1.0</td>
      <td>15.167602</td>
      <td>32965</td>
    </tr>
    <tr>
      <th>47067</th>
      <td>Hancock</td>
      <td>10.0</td>
      <td>1.0</td>
      <td>15.181418</td>
      <td>6587</td>
    </tr>
    <tr>
      <th>47173</th>
      <td>Union</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>15.394089</td>
      <td>19488</td>
    </tr>
    <tr>
      <th>47127</th>
      <td>Moore</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>15.678896</td>
      <td>6378</td>
    </tr>
    <tr>
      <th>47069</th>
      <td>Hardeman</td>
      <td>25.0</td>
      <td>1.0</td>
      <td>15.721416</td>
      <td>25443</td>
    </tr>
    <tr>
      <th>47101</th>
      <td>Lewis</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>16.629251</td>
      <td>12027</td>
    </tr>
    <tr>
      <th>47111</th>
      <td>Macon</td>
      <td>25.0</td>
      <td>1.0</td>
      <td>16.777116</td>
      <td>23842</td>
    </tr>
    <tr>
      <th>47087</th>
      <td>Jackson</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>17.120356</td>
      <td>11682</td>
    </tr>
    <tr>
      <th>47005</th>
      <td>Benton</td>
      <td>25.0</td>
      <td>1.0</td>
      <td>18.587361</td>
      <td>16140</td>
    </tr>
    <tr>
      <th>47123</th>
      <td>Monroe</td>
      <td>59.0</td>
      <td>1.0</td>
      <td>19.538034</td>
      <td>46064</td>
    </tr>
    <tr>
      <th>47169</th>
      <td>Trousdale</td>
      <td>25.0</td>
      <td>1.0</td>
      <td>19.548431</td>
      <td>10231</td>
    </tr>
    <tr>
      <th>47081</th>
      <td>Hickman</td>
      <td>25.0</td>
      <td>1.0</td>
      <td>20.150727</td>
      <td>24813</td>
    </tr>
    <tr>
      <th>47015</th>
      <td>Cannon</td>
      <td>60.0</td>
      <td>1.0</td>
      <td>21.159543</td>
      <td>14178</td>
    </tr>
    <tr>
      <th>47057</th>
      <td>Grainger</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>21.644085</td>
      <td>23101</td>
    </tr>
    <tr>
      <th>47023</th>
      <td>Chester</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>23.269343</td>
      <td>17190</td>
    </tr>
    <tr>
      <th>47083</th>
      <td>Houston</td>
      <td>25.0</td>
      <td>1.0</td>
      <td>24.497795</td>
      <td>8164</td>
    </tr>
    <tr>
      <th>47077</th>
      <td>Henderson</td>
      <td>45.0</td>
      <td>1.0</td>
      <td>25.020553</td>
      <td>27977</td>
    </tr>
  </tbody>
</table>
</div>



### What happens if we add a few hospitals in TN?


```python
sns.kdeplot(disparities.num_hospitals_open, hue = disparities.urban)
```




    <AxesSubplot:xlabel='num_hospitals_open', ylabel='Density'>



<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_112_1.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div>    



```python
predict = disparities.copy()
```


```python
disparities.sort_values(['num_hospitals_open','pcp_per_100k'])[0:1]
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>year</th>
      <th>primary_sex</th>
      <th>primary_age</th>
      <th>primary_dual</th>
      <th>state</th>
      <th>primary_race</th>
      <th>primary_eligibility</th>
      <th>primary_denominator_well</th>
      <th>analysis_value_well</th>
      <th>primary_denominator_hosp</th>
      <th>...</th>
      <th>county</th>
      <th>primary_care_physicians</th>
      <th>population</th>
      <th>urban</th>
      <th>shadac_category</th>
      <th>pcp_per_100k</th>
      <th>num_hospitals</th>
      <th>num_hospitals_open</th>
      <th>mean_beds</th>
      <th>num_beds</th>
    </tr>
    <tr>
      <th>FIPS</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>47033</th>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>1,000-4,999</td>
      <td>25</td>
      <td>1,000-4,999</td>
      <td>...</td>
      <td>Crockett</td>
      <td>0.0</td>
      <td>14399</td>
      <td>Rural</td>
      <td>low inadequate</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>NaN</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
<p>1 rows × 29 columns</p>
</div>




```python
import numpy as np
def add_hospitals_weak_link(data, category, num_hospitals = 5, return_mean = False, print_bool = True):
    df = data.copy()
    sorted_df = df.sort_values([category,'population'], ascending = [True, False])
    # print(sorted_df.head(3))
    worst = sorted_df.index[0]
    df.loc[worst,'num_hospitals_open'] = num_hospitals
    # df['num_hospitals_open_per_100k'] = df.num_hospitals_open*100000/df.population
    if print_bool ==True:
        print("Baseline mean number of open hospitals per 100k before adding hospitals: "+str(np.round(data['num_hospitals_open'].mean(),4)))

        print(f"Mean number of open hospitals per 100k after adding {num_hospitals} hospitals to {df.loc[worst,'county']} County: "
          +str(np.round(df['num_hospitals_open'].mean(), 4)))
    return df['num_hospitals_open'].mean() if return_mean ==True else None

add_hospitals_weak_link(disparities, category = 'pcp_per_100k')
```

    Baseline mean number of open hospitals per 100k before adding hospitals: 1.6421
    Mean number of open hospitals per 100k after adding 5 hospitals to Crockett County: 1.6947



```python
import numpy as np
def add_hospitals_equitably(data, category, num_hospitals = 5, num_counties = 5, copy = False, print_bool = True, return_mean = False):
    df = data.copy()
    sorted_df = df.sort_values([category,'population'], ascending = [True, False])
    # print(sorted_df.head(3))
    worst = sorted_df.index[0:num_counties]
    for i in worst:
        df.loc[i,'num_hospitals_open'] = num_hospitals/num_counties
    # df['num_hospitals_open'] = df.num_hospitals_open*100000/df.population
    if print_bool == True:
        print("Baseline mean number of open hospitals per 100k before adding hospitals: "+str(np.round(data['num_hospitals_open'].mean(), 4)))

        print(f"Mean number of open hospitals per 100k after adding {num_hospitals} hospitals to {df.loc[worst,'county'].values} Counties: "
          +str(np.round(df['num_hospitals_open'].mean(), 4)))
    return df['num_hospitals_open'].mean() if return_mean == True else None

add_hospitals_equitably(disparities, category = 'pcp_per_100k')
```

    Baseline mean number of open hospitals per 100k before adding hospitals: 1.6421
    Mean number of open hospitals per 100k after adding 5 hospitals to ['Crockett' 'Grundy' 'Lake' 'Van Buren' 'Bledsoe'] Counties: 1.6842



```python
add_hospitals_weak_link(disparities, category = 'pcp_per_100k', num_hospitals=10)
add_hospitals_equitably(disparities, category = 'pcp_per_100k', num_hospitals=10)
```

    Baseline mean number of open hospitals per 100k before adding hospitals: 1.6421
    Mean number of open hospitals per 100k after adding 10 hospitals to Crockett County: 1.7474
    Baseline mean number of open hospitals per 100k before adding hospitals: 1.6421
    Mean number of open hospitals per 100k after adding 10 hospitals to ['Crockett' 'Grundy' 'Lake' 'Van Buren' 'Bledsoe'] Counties: 1.7368



```python
means_weak = []
means_equit = []
for i in range(20):
    means_weak.append(add_hospitals_weak_link(disparities, category='pcp_per_100k', num_hospitals=i, print_bool=False, return_mean = True))
    means_equit.append(add_hospitals_equitably(disparities, category='pcp_per_100k', num_hospitals=i,num_counties=4, print_bool=False, return_mean = True))

print(means_weak)
print(means_equit)

```

    [1.6421052631578947, 1.6526315789473685, 1.6631578947368422, 1.6736842105263159, 1.6842105263157894, 1.694736842105263, 1.7052631578947368, 1.7157894736842105, 1.7263157894736842, 1.736842105263158, 1.7473684210526317, 1.7578947368421052, 1.768421052631579, 1.7789473684210526, 1.7894736842105263, 1.8, 1.8105263157894738, 1.8210526315789475, 1.831578947368421, 1.8421052631578947]
    [1.6421052631578947, 1.6526315789473685, 1.6631578947368422, 1.6736842105263159, 1.6842105263157894, 1.694736842105263, 1.7052631578947368, 1.7157894736842105, 1.7263157894736842, 1.736842105263158, 1.7473684210526317, 1.7578947368421052, 1.768421052631579, 1.7789473684210526, 1.7894736842105263, 1.8, 1.8105263157894738, 1.8210526315789475, 1.831578947368421, 1.8421052631578947]


# Question 2: What is the relationship between areas without access and ER visits?
Do areas that lack access to healthcare tend to have higher rates of emergency department visits or hospitalizations? Is there an association between the percentage of beneficiaries who had an annual wellness visit and rate of hospitalizations or emergency department visits?



Reordering `disparities` in order of least acess:


```python
disparities = disparities.sort_values(['pcp_per_100k','population'], ascending = [True,False]).reset_index()
```


```python
disparities.columns
```




    Index(['FIPS', 'year', 'primary_sex', 'primary_age', 'primary_dual', 'state',
           'primary_race', 'primary_eligibility', 'primary_denominator_well',
           'analysis_value_well', 'primary_denominator_hosp',
           'analysis_value_hosp', 'primary_denominator_emer',
           'analysis_value_emer', 'laus_code', 'Name', 'Employed', 'Unemployed',
           'unemployment_rate', 'FIPS.1', 'county', 'primary_care_physicians',
           'population', 'urban', 'shadac_category', 'pcp_per_100k',
           'num_hospitals', 'num_hospitals_open', 'mean_beds', 'num_beds'],
          dtype='object')




```python
from imp import reload
reload(plt)
plt.figure()
sns.scatterplot(x = disparities., y = disparities.analysis_value_well, hue = disparities.shadac_category)
plt.ylabel("Emergency department visits per 100K")
plt.xlabel("PCP per 100k")

```




    Text(0.5, 0, 'PCP per 100k')





<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_123_1.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
    



```python
plt.figure()
sns.scatterplot(x = counties['Median Household Income'], y = counties.analysis_value_emer, hue = disparities.shadac_category)
plt.ylabel("Emergency Visits per 1K")
plt.xlabel("Median Household Income")

```




    Text(0.5, 0, 'Median Household Income')





<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_124_1.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
    



```python
sns.boxplot(x = counties.urban, y = counties.analysis_value_emer)
plt.ylabel("Hospitalizations per 1K")

```




    Text(0, 0.5, 'Hospitalizations per 1K')




<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_125_1.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
        


## Association between the percentage of beneficiaries who had an annual wellness visit and rate of hospitalizations or emergency department visits


```python
plt.figure()
sns.lmplot(data =disparities, y = "analysis_value_hosp", x = "analysis_value_well")
plt.ylabel("Hospitalizations per 100K")
plt.xlabel("Percentage annual wellness visits")

```




    Text(0.5, 21.70625000000002, 'Percentage annual wellness visits')




    <Figure size 432x288 with 0 Axes>



<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_127_2.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
        



```python
emer_per_100k =disparities.analysis_value_emer
hosp_per_100k =disparities.analysis_value_hosp
well_rate = disparities.analysis_value_well
```


```python
rates = pd.DataFrame([emer_per_100k, hosp_per_100k, well_rate, disparities.pcp_per_100k, disparities.shadac_category,counties['Median Household Income']], index=['Emergency Visits','Hospitalizations','Wellness Visits', 'pcp', 'shadac', 'Income']).T
```


```python
sns.pairplot(rates, hue = 'shadac', corner = True)
```




    <seaborn.axisgrid.PairGrid at 0x1a5eb4190>




<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_130_1.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
        



```python
rates[['emer','hosp','well', 'pcp']] = rates[['emer','hosp','well', 'pcp']].astype(float)
```


```python
rates.drop('shadac', axis = 1)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Emergency Visits</th>
      <th>Hospitalizations</th>
      <th>Wellness Visits</th>
      <th>pcp</th>
      <th>Income</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>622</td>
      <td>289</td>
      <td>25</td>
      <td>0.0</td>
      <td>47508</td>
    </tr>
    <tr>
      <th>1</th>
      <td>651</td>
      <td>285</td>
      <td>34</td>
      <td>0.0</td>
      <td>38879</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1000</td>
      <td>401</td>
      <td>20</td>
      <td>0.0</td>
      <td>60874</td>
    </tr>
    <tr>
      <th>3</th>
      <td>759</td>
      <td>304</td>
      <td>31</td>
      <td>0.0</td>
      <td>57196</td>
    </tr>
    <tr>
      <th>4</th>
      <td>750</td>
      <td>313</td>
      <td>19</td>
      <td>6.740361</td>
      <td>46565</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>90</th>
      <td>559</td>
      <td>234</td>
      <td>56</td>
      <td>112.772823</td>
      <td>39859</td>
    </tr>
    <tr>
      <th>91</th>
      <td>584</td>
      <td>261</td>
      <td>52</td>
      <td>126.711238</td>
      <td>50201</td>
    </tr>
    <tr>
      <th>92</th>
      <td>666</td>
      <td>255</td>
      <td>43</td>
      <td>132.138284</td>
      <td>50427</td>
    </tr>
    <tr>
      <th>93</th>
      <td>469</td>
      <td>201</td>
      <td>48</td>
      <td>149.962953</td>
      <td>50819</td>
    </tr>
    <tr>
      <th>94</th>
      <td>504</td>
      <td>256</td>
      <td>57</td>
      <td>176.831892</td>
      <td>41968</td>
    </tr>
  </tbody>
</table>
<p>95 rows × 5 columns</p>
</div>




```python
rates.drop('shadac', axis = 1).astype(float).corr().style.background_gradient('coolwarm')


```




<style type="text/css">
#T_be3e4_row0_col0, #T_be3e4_row1_col1, #T_be3e4_row2_col2, #T_be3e4_row3_col3, #T_be3e4_row4_col4 {
  background-color: #b40426;
  color: #f1f1f1;
}
#T_be3e4_row0_col1, #T_be3e4_row1_col0 {
  background-color: #f6a283;
  color: #000000;
}
#T_be3e4_row0_col2, #T_be3e4_row0_col3, #T_be3e4_row1_col2, #T_be3e4_row2_col0, #T_be3e4_row2_col1, #T_be3e4_row3_col4 {
  background-color: #3b4cc0;
  color: #f1f1f1;
}
#T_be3e4_row0_col4 {
  background-color: #81a4fb;
  color: #f1f1f1;
}
#T_be3e4_row1_col3 {
  background-color: #4c66d6;
  color: #f1f1f1;
}
#T_be3e4_row1_col4 {
  background-color: #799cf8;
  color: #f1f1f1;
}
#T_be3e4_row2_col3 {
  background-color: #f5c1a9;
  color: #000000;
}
#T_be3e4_row2_col4 {
  background-color: #3c4ec2;
  color: #f1f1f1;
}
#T_be3e4_row3_col0 {
  background-color: #4b64d5;
  color: #f1f1f1;
}
#T_be3e4_row3_col1 {
  background-color: #5e7de7;
  color: #f1f1f1;
}
#T_be3e4_row3_col2 {
  background-color: #f7bca1;
  color: #000000;
}
#T_be3e4_row4_col0 {
  background-color: #c9d7f0;
  color: #000000;
}
#T_be3e4_row4_col1 {
  background-color: #c4d5f3;
  color: #000000;
}
#T_be3e4_row4_col2 {
  background-color: #96b7ff;
  color: #000000;
}
#T_be3e4_row4_col3 {
  background-color: #84a7fc;
  color: #f1f1f1;
}
</style>
<table id="T_be3e4_">
  <thead>
    <tr>
      <th class="blank level0" >&nbsp;</th>
      <th class="col_heading level0 col0" >Emergency Visits</th>
      <th class="col_heading level0 col1" >Hospitalizations</th>
      <th class="col_heading level0 col2" >Wellness Visits</th>
      <th class="col_heading level0 col3" >pcp</th>
      <th class="col_heading level0 col4" >Income</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th id="T_be3e4_level0_row0" class="row_heading level0 row0" >Emergency Visits</th>
      <td id="T_be3e4_row0_col0" class="data row0 col0" >1.000000</td>
      <td id="T_be3e4_row0_col1" class="data row0 col1" >0.599412</td>
      <td id="T_be3e4_row0_col2" class="data row0 col2" >-0.480607</td>
      <td id="T_be3e4_row0_col3" class="data row0 col3" >-0.396181</td>
      <td id="T_be3e4_row0_col4" class="data row0 col4" >0.153085</td>
    </tr>
    <tr>
      <th id="T_be3e4_level0_row1" class="row_heading level0 row1" >Hospitalizations</th>
      <td id="T_be3e4_row1_col0" class="data row1 col0" >0.599412</td>
      <td id="T_be3e4_row1_col1" class="data row1 col1" >1.000000</td>
      <td id="T_be3e4_row1_col2" class="data row1 col2" >-0.480732</td>
      <td id="T_be3e4_row1_col3" class="data row1 col3" >-0.308934</td>
      <td id="T_be3e4_row1_col4" class="data row1 col4" >0.126632</td>
    </tr>
    <tr>
      <th id="T_be3e4_level0_row2" class="row_heading level0 row2" >Wellness Visits</th>
      <td id="T_be3e4_row2_col0" class="data row2 col0" >-0.480607</td>
      <td id="T_be3e4_row2_col1" class="data row2 col1" >-0.480732</td>
      <td id="T_be3e4_row2_col2" class="data row2 col2" >1.000000</td>
      <td id="T_be3e4_row2_col3" class="data row2 col3" >0.488941</td>
      <td id="T_be3e4_row2_col4" class="data row2 col4" >-0.073377</td>
    </tr>
    <tr>
      <th id="T_be3e4_level0_row3" class="row_heading level0 row3" >pcp</th>
      <td id="T_be3e4_row3_col0" class="data row3 col0" >-0.396181</td>
      <td id="T_be3e4_row3_col1" class="data row3 col1" >-0.308934</td>
      <td id="T_be3e4_row3_col2" class="data row3 col2" >0.488941</td>
      <td id="T_be3e4_row3_col3" class="data row3 col3" >1.000000</td>
      <td id="T_be3e4_row3_col4" class="data row3 col4" >-0.080277</td>
    </tr>
    <tr>
      <th id="T_be3e4_level0_row4" class="row_heading level0 row4" >Income</th>
      <td id="T_be3e4_row4_col0" class="data row4 col0" >0.153085</td>
      <td id="T_be3e4_row4_col1" class="data row4 col1" >0.126632</td>
      <td id="T_be3e4_row4_col2" class="data row4 col2" >-0.073377</td>
      <td id="T_be3e4_row4_col3" class="data row4 col3" >-0.080277</td>
      <td id="T_be3e4_row4_col4" class="data row4 col4" >1.000000</td>
    </tr>
  </tbody>
</table>





```python
counties.to_csv('../data/counties_full.csv')
```


```python
disparities.to_csv('../data/disparities.csv')
```

# Question 3: Which subpopulations need more attention?
Finally, TN Med Helper is trying to identify specific subpopulations to focus more attention on. Using data from the Behavioral Risk Factor Surveillance System, build a model to predict whether an individual has not had a checkup in the last year. Apply this model to the counties you identified above to predict how likely it is that the average person from those counties has not had a checkup in the last year. Which groups within these counties might need to be focused on to maximize the impact of TN Med Helper's efforts?


```python
import pandas as pd
import geopandas as gpd
import matplotlib.pyplot as plt
import seaborn as sns
```


```python
disparities = pd.read_csv('../data/disparities.csv',header = 0, index_col = 0)
disparities.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>FIPS</th>
      <th>year</th>
      <th>primary_sex</th>
      <th>primary_age</th>
      <th>primary_dual</th>
      <th>state</th>
      <th>primary_race</th>
      <th>primary_eligibility</th>
      <th>primary_denominator_well</th>
      <th>analysis_value_well</th>
      <th>...</th>
      <th>county</th>
      <th>primary_care_physicians</th>
      <th>population</th>
      <th>urban</th>
      <th>shadac_category</th>
      <th>pcp_per_100k</th>
      <th>num_hospitals</th>
      <th>num_hospitals_open</th>
      <th>mean_beds</th>
      <th>num_beds</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>47033</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>1,000-4,999</td>
      <td>25</td>
      <td>...</td>
      <td>Crockett</td>
      <td>0.0</td>
      <td>14399</td>
      <td>Rural</td>
      <td>low inadequate</td>
      <td>0.000000</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>NaN</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>47061</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>1,000-4,999</td>
      <td>34</td>
      <td>...</td>
      <td>Grundy</td>
      <td>0.0</td>
      <td>13344</td>
      <td>Rural</td>
      <td>low inadequate</td>
      <td>0.000000</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>NaN</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>47095</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>500-999</td>
      <td>20</td>
      <td>...</td>
      <td>Lake</td>
      <td>0.0</td>
      <td>7401</td>
      <td>Rural</td>
      <td>low inadequate</td>
      <td>0.000000</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>NaN</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>47175</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>500-999</td>
      <td>31</td>
      <td>...</td>
      <td>Van Buren</td>
      <td>0.0</td>
      <td>5760</td>
      <td>Rural</td>
      <td>low inadequate</td>
      <td>0.000000</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>NaN</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>47007</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>1,000-4,999</td>
      <td>19</td>
      <td>...</td>
      <td>Bledsoe</td>
      <td>1.0</td>
      <td>14836</td>
      <td>Rural</td>
      <td>low inadequate</td>
      <td>6.740361</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>25.0</td>
      <td>25.0</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 30 columns</p>
</div>



The file brfss.csv contains a subset of the responses and variables from the [2019 Behavioral Risk Factor Surveillance System (BRFSS)](https://www.cdc.gov/brfss/). This dataset can be downloaded using this link: [https://drive.google.com/file/d/1acJKmT2aFf2nZl_VYLE897yx0LPNajoY/view?usp=sharing](https://drive.google.com/file/d/1acJKmT2aFf2nZl_VYLE897yx0LPNajoY/view?usp=sharing).

A detailed Codebook can be found [here](https://www.cdc.gov/brfss/annual_data/2019/pdf/codebook19_llcp-v2-508.HTML).

Our target variable is the CHECKUP1 column, which contains the responses to the question "About how long has it been since you last visited a doctor for a routine checkup?   [A routine checkup is a general physical exam, not an exam for a specific injury, illness, or condition.]" Specifically, we want to try and predict if someone gives an answer besides "Within past year (anytime less than 12 months ago)".



```python
brfss = pd.read_csv('../data/brfss.csv', header = 0)
brfss.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>GENHLTH</th>
      <th>HLTHPLN1</th>
      <th>PERSDOC2</th>
      <th>MEDCOST</th>
      <th>CHECKUP1</th>
      <th>_RFHYPE5</th>
      <th>TOLDHI2</th>
      <th>CVDINFR4</th>
      <th>CVDCRHD4</th>
      <th>CVDSTRK3</th>
      <th>...</th>
      <th>EXERANY2</th>
      <th>_METSTAT</th>
      <th>_URBSTAT</th>
      <th>_IMPRACE</th>
      <th>_RFBMI5</th>
      <th>_RFSMOK3</th>
      <th>_RFBING5</th>
      <th>_RFDRHV7</th>
      <th>_TOTINDA</th>
      <th>target</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Good</td>
      <td>Yes</td>
      <td>Yes, only one</td>
      <td>No</td>
      <td>Within past year (anytime less than 12 months ...</td>
      <td>Yes</td>
      <td>Yes</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>...</td>
      <td>No</td>
      <td>Metropolitan counties (_URBNRRL = 1,2,3,4)</td>
      <td>Urban counties (_URBNRRL = 1,2,3,4,5)</td>
      <td>Black, Non-Hispanic</td>
      <td>Yes</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No physical activity or exercise in last 30 days</td>
      <td>True</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Fair</td>
      <td>Yes</td>
      <td>Yes, only one</td>
      <td>No</td>
      <td>Within past year (anytime less than 12 months ...</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>...</td>
      <td>Yes</td>
      <td>Metropolitan counties (_URBNRRL = 1,2,3,4)</td>
      <td>Urban counties (_URBNRRL = 1,2,3,4,5)</td>
      <td>White, Non-Hispanic</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>Had physical activity or exercise</td>
      <td>True</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Good</td>
      <td>Yes</td>
      <td>More than one</td>
      <td>No</td>
      <td>Within past year (anytime less than 12 months ...</td>
      <td>Yes</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>...</td>
      <td>Yes</td>
      <td>Metropolitan counties (_URBNRRL = 1,2,3,4)</td>
      <td>Urban counties (_URBNRRL = 1,2,3,4,5)</td>
      <td>Black, Non-Hispanic</td>
      <td>Yes</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>Had physical activity or exercise</td>
      <td>True</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Very good</td>
      <td>Yes</td>
      <td>Yes, only one</td>
      <td>No</td>
      <td>Within past year (anytime less than 12 months ...</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>...</td>
      <td>Yes</td>
      <td>Nonmetropolitan counties (_URBNRRL = 5,6)</td>
      <td>Rural counties (_URBNRRL = 6)</td>
      <td>White, Non-Hispanic</td>
      <td>Yes</td>
      <td>Yes</td>
      <td>No</td>
      <td>No</td>
      <td>Had physical activity or exercise</td>
      <td>True</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Poor</td>
      <td>Yes</td>
      <td>Yes, only one</td>
      <td>No</td>
      <td>Within past year (anytime less than 12 months ...</td>
      <td>No</td>
      <td>Yes</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>...</td>
      <td>No</td>
      <td>Metropolitan counties (_URBNRRL = 1,2,3,4)</td>
      <td>Urban counties (_URBNRRL = 1,2,3,4,5)</td>
      <td>White, Non-Hispanic</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No physical activity or exercise in last 30 days</td>
      <td>True</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 40 columns</p>
</div>




First, create a new coumn, "target" by converting this to a binary outcome. After you do this, drop the CHECKUP1 column from your dataframe so that you don't accidentally make predictions based off of it.



```python
set(brfss.CHECKUP1)
```




    {'5 or more years ago',
     'Never',
     'Within past 2 years (1 year but less than 2 years ago)',
     'Within past 5 years (2 years but less than 5 years ago)',
     'Within past year (anytime less than 12 months ago)'}




```python
target = []
for x in brfss.CHECKUP1:
    if x == 'Within past year (anytime less than 12 months ago)':
        target.append(True)
    else: target.append(False)
```


```python
brfss['target'] = target
```


```python
brfss = brfss.drop('CHECKUP1', axis = 1)
```


```python
brfss.target.value_counts()
```




    True     215875
    False     46174
    Name: target, dtype: int64



## Using data from the Behavioral Risk Factor Surveillance System, build a model to predict whether an individual has not had a checkup in the last year.
Then, experiment with making a logistic regression model to predict the target variable using one or more of the other columns. Note that you will need to convert the precictor columns into dummy variable prior to fitting a model. What do you find?


- GENHLTH: Would you say that in general your health is
- HLTHPLN1: Do you have any kind of health care coverage, including health insurance, prepaid plans such as HMOs, or government plans such as Medicare, or Indian Health Service?
- PERSDOC2:   Do you have one person you think of as your personal doctor or health care provider?
- MEDCOST: Was there a time in the past 12 months when you needed to see a doctor but could not because of cost?
- \_RFHYPE5: Adults who have been told they have high blood pressure by a doctor, nurse, or other health professional
- TOLDHI2: Have you ever been told by a doctor, nurse or other health professional that your blood cholesterol is high?
- CVDINFR4: (Ever told) you had a heart attack, also called a myocardial infarction?
- CVDCRHD4: (Ever told) you had angina or coronary heart disease?
- CVDSTRK3: (Ever told) you had a stroke.
- ASTHMA3: (Ever told) you had asthma?
- CHCSCNCR: (Ever told) you had skin cancer?
- CHCOCNCR: (Ever told) you had other cancer?
- CHCCOPD2: (Ever told) you had COPD?
- ADDEPEV3: (Ever told) (you had) a depressive disorder
- CHCKDNY2: were you ever told you had kidney disease?
- DIABETE4: (Ever told) diabetes?
- HAVARTH4: Arthritis
- MARITAL: Marital status
- EDUCA: What is the highest grade or year of school you completed?
- RENTHOM1: Own or rent home
- VETERAN3: Veteran?
- EMPLOY1: Employment
- INCOME2: Income categories
- DEAF
- BLIND
- DECIDE: Trouble concentrating/deciding
- DIFFWALK: Difficulty walking
- DIFFDRES: Difficulty dressing
- DIFFALON: Difficulty errands alone
- EXERANY2: Exercise in past month
- _METSTAT: Metropolitan Status
- _URBSTAT: Urban status
- _IMPRACE: Imputed race/ethnicity value
- _RFBMI5: Adults who have a body mass index greater than 25.00 (Overweight or Obese)
- _RFSMOK3: Adults who are current smokers
- _RFBING5: Binge drinkers 
- _RFDRHV7: Heavy drinkers
- _TOTINDA: Adults who reported doing physical activity or exercise during the past 30 days other than their regular job
- target


We only really want categorical variables that we know about counties, so we need to look at County Health Rankings to figure out which of these variables we have percentages on. For example, we can use \_IMPRACE because we have percentages of races by TN county.

In the County Health Rankings Data:
1. GENHLTH == "Poor or fair health" (percentage)
2. HLTHPLN1 == "% Uninsured"
3. PERSDOC2 == ratio primary care physicians?
4. DIABETES4 == "diabetes prevalence"
5. _RFBING5 & _RFDRHV7 == Binge and heavy drinkers == "Excessive drinking"
6. RENTHOM1 == "Homeownership"
7. \_IMPRACE = race %
8. \_URBSTAT = 'rural'
9. MARITAL ~ % single-parent households
10. EDUCA == "High school graduation rate, % some college
11. EMPLOY1 = % unemployed
12. INCOME2 = household income
13. _TOTINDA ~ % physically inactive
14. _RFBMI5 BMI > 25, % adults with obesity == BMI > 30...
15. _RFSMOK3 == '% smokers
16. ADDEPEV3 ~ frequent mental distress


```python
categorical_variables = ['GENHLTH', 'HLTHPLN1', 'PERSDOC2', 'DIABETE4','_RFBING5','_RFDRHV7','RENTHOM1','_IMPRACE','_URBSTAT','EDUCA','EMPLOY1','INCOME2','_TOTINDA','_RFSMOK3']
predict = pd.get_dummies(brfss, columns = categorical_variables)
```


```python
predict.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>MEDCOST</th>
      <th>_RFHYPE5</th>
      <th>TOLDHI2</th>
      <th>CVDINFR4</th>
      <th>CVDCRHD4</th>
      <th>CVDSTRK3</th>
      <th>ASTHMA3</th>
      <th>CHCSCNCR</th>
      <th>CHCOCNCR</th>
      <th>CHCCOPD2</th>
      <th>...</th>
      <th>INCOME2_Less than $15,000 ($10,000 to less than $15,000)</th>
      <th>INCOME2_Less than $20,000 ($15,000 to less than $20,000)</th>
      <th>INCOME2_Less than $25,000 ($20,000 to less than $25,000)</th>
      <th>INCOME2_Less than $35,000 ($25,000 to less than $35,000)</th>
      <th>INCOME2_Less than $50,000 ($35,000 to less than $50,000)</th>
      <th>INCOME2_Less than $75,000 ($50,000 to less than $75,000)</th>
      <th>_TOTINDA_Had physical activity or exercise</th>
      <th>_TOTINDA_No physical activity or exercise in last 30 days</th>
      <th>_RFSMOK3_No</th>
      <th>_RFSMOK3_Yes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>No</td>
      <td>Yes</td>
      <td>Yes</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>...</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>No</td>
      <td>Yes</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>Yes</td>
      <td>No</td>
      <td>No</td>
      <td>Yes</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>No</td>
      <td>No</td>
      <td>Yes</td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>Yes</td>
      <td>No</td>
      <td>No</td>
      <td>Yes</td>
      <td>...</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>1</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 80 columns</p>
</div>




```python
predict = predict.drop(predict.columns[0:24], axis = 1)

```

First, we need to get these boolean values to match up with our county info, so when we use the model later we can use the same variables.
- GENHLTH:
    - Change GENHLTH columns to "GENHLTH_Poor_or_Fair"
    - Matched county % poor or fair health in Ranked Measure data
- HLTHPLN1
    - Matches inverse of county % uninsured in Additional Measure data
- DIABETE4
    - Change DIABETE4 columns to combine Yes's and No's
    - Matches % adults with diabetes in Additional Measure data
- _RFBING5 and _RFDRHV7
    - Combine so binge and heavy drinking are one category
    - Matches excessive drinking in Ranked Measure data
- RENTHOM1
    - Own == 1, else == 0
    - Matches % homeowners
- _IMPRACE
    - Should be able to keep the same
    - Matches demographic %s in Additional Measure Data
- _URBSTAT
    - replace with Boolean for rural
    - matches inverse of % rural
- EDUCA
    - "Grade 12 or GED (High school graduate)" 
    - matches "High school graduation rate" in ranked measure data
    - "College 1 year to 3 years (Some college or technical school)" or "College 4 years or more (College graduate)" == % some college
- EMPLOY1
    - "Out of work for 1 year or more" or "Out of work for less than 1 year" or "Unable to work" == % unemployment rate in Ranked measure data
- INCOME2:
    - group "Household Income (AIAN)" into same groups as above
- _TOTINDA
    - only "No physical activity..."
    - % physically inactive
- _RFSMOK3_Yes
    - % smokers


```python
X = predict.copy()
```

### Rural


```python
X['Rural'] = [{ "Urban counties (_URBNRRL = 1,2,3,4,5)":0,"Rural counties (_URBNRRL = 6)":1}[i] for i in brfss._URBSTAT]
```


```python
X = X.drop([i for i in X.columns if "URBSTAT" in str(i)], axis = 1)
```

### Diabetes


```python
X.loc[(X['DIABETE4_Yes, but female told only during pregnancy'] == 1) |
      (X["DIABETE4_Yes"]==1), 'Diabetes'] = 1
X.loc[(X['DIABETE4_Yes, but female told only during pregnancy'] == 0) &
      (X["DIABETE4_Yes"]==0), 'Diabetes'] = 0
```


```python
X = X.drop([i for i in X.columns if "DIABETE4" in str(i)], axis = 1)
```

### GENHLTH


```python
X.loc[(X['GENHLTH_Fair'] == 1) |
      (X["GENHLTH_Poor"]==1), 'General_health'] = 1
X.loc[(X['GENHLTH_Fair'] == 0) &
      (X["GENHLTH_Poor"]==0), 'General_health'] = 0

```


```python
X = X.drop([i for i in X.columns if "GENHLTH" in str(i)], axis = 1)
```

### HLTHPLN1


```python
X['Health_plan'] = X.HLTHPLN1_Yes
```


```python
X = X.drop([i for i in X.columns if "HLTHPLN1" in str(i)], axis = 1)
```

### _RFBING5 and _RFDRHV7


```python
X.loc[(X._RFDRHV7_Yes == 1) |
      (X._RFBING5_Yes==1), 'Excessive_drinking'] = 1
X.loc[(X['_RFDRHV7_Yes'] == 0) &
      (X["_RFBING5_Yes"]==0), 'Excessive_drinking'] = 0
```


```python
X = X.drop([i for i in X.columns if "_RFDRHV" in str(i)], axis = 1)
X = X.drop([i for i in X.columns if "_RFBING" in str(i)], axis = 1)
```

### RENTHOM1


```python
X['Owns_home'] = X['RENTHOM1_Own']
X = X.drop([i for i in X.columns if "RENTHOM1" in str(i)], axis = 1)
```

### EDUCA


```python
X['High_school_grad'] = X['EDUCA_Grade 12 or GED (High school graduate)']
X.loc[(X['EDUCA_College 1 year to 3 years (Some college or technical school)'] == 1) |
      (X['EDUCA_College 4 years or more (College graduate)']==1), 'College'] = 1
X.loc[(X['EDUCA_College 1 year to 3 years (Some college or technical school)'] == 0) &
      (X["EDUCA_College 4 years or more (College graduate)"]==0), 'College'] = 0
```


```python
X = X.drop([i for i in X.columns if "EDUCA" in str(i)], axis = 1)
```

### EMPLOY1


```python
X.loc[(X['EMPLOY1_Out of work for 1 year or more'] == 1) |
      (X['EMPLOY1_Out of work for less than 1 year']==1) |
      (X['EMPLOY1_Unable to work']==1), 'Unemployed'] = 1
X.loc[(X['EMPLOY1_Out of work for 1 year or more'] == 0) &
      (X['EMPLOY1_Out of work for less than 1 year']==0) &
      (X['EMPLOY1_Unable to work']==0), 'Unemployed'] = 0
```


```python
X = X.drop([i for i in X.columns if "EMPLOY1" in str(i)], axis = 1)
```

### _TOTINDA


```python
X['Inactivity'] = X['_TOTINDA_No physical activity or exercise in last 30 days']
X = X.drop([i for i in X.columns if "_TOTINDA" in str(i)], axis = 1)
```

### _RFSMOK3_Yes


```python
X['Smoker'] = X._RFSMOK3_Yes
X = X.drop([i for i in X.columns if "_RFSMOK3" in str(i)], axis = 1)
```


```python
X = X.drop([i for i in X.columns if "PERSDOC" in str(i)], axis = 1)
```


```python
X.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 262049 entries, 0 to 262048
    Data columns (total 26 columns):
     #   Column                                                    Non-Null Count   Dtype  
    ---  ------                                                    --------------   -----  
     0   target                                                    262049 non-null  bool   
     1   _IMPRACE_American Indian/Alaskan Native, Non-Hispanic     262049 non-null  uint8  
     2   _IMPRACE_Asian, Non-Hispanic                              262049 non-null  uint8  
     3   _IMPRACE_Black, Non-Hispanic                              262049 non-null  uint8  
     4   _IMPRACE_Hispanic                                         262049 non-null  uint8  
     5   _IMPRACE_Other race, Non-Hispanic                         262049 non-null  uint8  
     6   _IMPRACE_White, Non-Hispanic                              262049 non-null  uint8  
     7   INCOME2_$75,000 or more                                   262049 non-null  uint8  
     8   INCOME2_Less than $10,000                                 262049 non-null  uint8  
     9   INCOME2_Less than $15,000 ($10,000 to less than $15,000)  262049 non-null  uint8  
     10  INCOME2_Less than $20,000 ($15,000 to less than $20,000)  262049 non-null  uint8  
     11  INCOME2_Less than $25,000 ($20,000 to less than $25,000)  262049 non-null  uint8  
     12  INCOME2_Less than $35,000 ($25,000 to less than $35,000)  262049 non-null  uint8  
     13  INCOME2_Less than $50,000 ($35,000 to less than $50,000)  262049 non-null  uint8  
     14  INCOME2_Less than $75,000 ($50,000 to less than $75,000)  262049 non-null  uint8  
     15  Rural                                                     262049 non-null  int64  
     16  Diabetes                                                  262049 non-null  float64
     17  General_health                                            262049 non-null  float64
     18  Health_plan                                               262049 non-null  uint8  
     19  Excessive_drinking                                        262049 non-null  float64
     20  Owns_home                                                 262049 non-null  uint8  
     21  High_school_grad                                          262049 non-null  uint8  
     22  College                                                   262049 non-null  float64
     23  Unemployed                                                262049 non-null  float64
     24  Inactivity                                                262049 non-null  uint8  
     25  Smoker                                                    262049 non-null  uint8  
    dtypes: bool(1), float64(5), int64(1), uint8(19)
    memory usage: 17.0 MB



```python
X.to_csv("../data/predictors.csv")
```


```python
y = X.pop('target')
```

The main objective is to have a model which makes good predictions on _unseen_ data. Therefore, in order to evaluate how good a model is, it is necessary to set aside some data as a test set for evaulation purposes. This can be accomplished using the `train_test_split` function.


```python
from sklearn.model_selection import train_test_split
```


```python
X_train, X_test, y_train, y_test = train_test_split(X, y,
                                                    stratify = y,     # Keep the same proportions of the target in the training and test data
                                                    test_size = 0.25,
                                                    random_state = 321)
```


```python
from sklearn.linear_model import LogisticRegression
```


```python
logreg = LogisticRegression()         # Create a logistic regression model
logreg.fit(X_train, y_train)          # Fit it to the training data
```




    LogisticRegression()



To understand the model, we can look at its coefficients.


```python
logreg.intercept_
```




    array([-0.06956167])




```python
logreg.coef_
```




    array([[-0.15000703, -0.12631886,  0.53903011, -0.1734734 , -0.12965132,
            -0.02906713, -0.17897394,  0.02512163,  0.13639016,  0.09111363,
             0.06724727, -0.03598943, -0.04823376, -0.12616319, -0.09815453,
             1.19410076,  0.44202482,  1.4508977 , -0.35476091,  0.4756881 ,
             0.01472026, -0.00793255,  0.15622678, -0.04213603, -0.36442622]])




```python
y_pred_prob = logreg.predict_proba(X_test)[:,1]
```


```python
i = 120

print('Patient Information:\n{}'.format(X_test.iloc[i]))
print('---------------------------------')
print('Predicted Probability of Checkup in Last Year: {}'.format(y_pred_prob[i]))
print('Actual: {}'.format(y_test.iloc[i]))
```

    Patient Information:
    _IMPRACE_American Indian/Alaskan Native, Non-Hispanic       0.0
    _IMPRACE_Asian, Non-Hispanic                                0.0
    _IMPRACE_Black, Non-Hispanic                                0.0
    _IMPRACE_Hispanic                                           0.0
    _IMPRACE_Other race, Non-Hispanic                           0.0
    _IMPRACE_White, Non-Hispanic                                1.0
    INCOME2_$75,000 or more                                     1.0
    INCOME2_Less than $10,000                                   0.0
    INCOME2_Less than $15,000 ($10,000 to less than $15,000)    0.0
    INCOME2_Less than $20,000 ($15,000 to less than $20,000)    0.0
    INCOME2_Less than $25,000 ($20,000 to less than $25,000)    0.0
    INCOME2_Less than $35,000 ($25,000 to less than $35,000)    0.0
    INCOME2_Less than $50,000 ($35,000 to less than $50,000)    0.0
    INCOME2_Less than $75,000 ($50,000 to less than $75,000)    0.0
    Rural                                                       0.0
    Diabetes                                                    0.0
    General_health                                              0.0
    Health_plan                                                 1.0
    Excessive_drinking                                          0.0
    Owns_home                                                   1.0
    High_school_grad                                            0.0
    College                                                     1.0
    Unemployed                                                  1.0
    Inactivity                                                  0.0
    Smoker                                                      0.0
    Name: 232982, dtype: float64
    ---------------------------------
    Predicted Probability of Checkup in Last Year: 0.857817177035579
    Actual: True


One way to analyze your model is to look at the receiver operating characteristic (ROC) curve. This shows how the true positive rate and false positive rate change as the prediction threshold changes.

This value can be interpreted as how likely the model is to assign a higher probability to a positive observation compared to a negative one.


```python
from sklearn.metrics import roc_auc_score, roc_curve
```


```python
fp_rate, tp_rate, thresholds = roc_curve(y_test == 1, y_pred_prob)

plt.plot(fp_rate, tp_rate)
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.0])
plt.title('ROC curve for Heart Disease Prediction')
plt.xlabel('False Positive Rate (1 - Specificity)')
plt.ylabel('True Positive Rate (Sensitivity)')
plt.grid(True)
```


<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_198_0.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
        


### AUC - percentage of the ROC plot that is under the curve

A perfect model would have AUC = 1.


```python
roc_auc_score(y_test, y_pred_prob)
```




    0.6789666785879891



## Analyzing Predictions

To generate predictions, you can use the `predict` method of your model.


```python
from sklearn.metrics import confusion_matrix, classification_report
from cm import plot_confusion_matrix
```


```python
y_pred = logreg.predict(X_test)
```


```python
confusion_matrix(y_test, y_pred)
```




    array([[ 1052, 10492],
           [  772, 53197]])




```python
print(classification_report(y_test, y_pred))
```

                  precision    recall  f1-score   support
    
           False       0.58      0.09      0.16     11544
            True       0.84      0.99      0.90     53969
    
        accuracy                           0.83     65513
       macro avg       0.71      0.54      0.53     65513
    weighted avg       0.79      0.83      0.77     65513
    



```python
plot_confusion_matrix(y_test, y_pred, labels = ['No', 'Yes'])
```


<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_206_0.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
        


There are a number of metrics you can use to evalute your model. 

**Accuracy:** the total proportion of predictions which are correct.


```python
plot_confusion_matrix(y_test, y_pred, labels = ['No', 'Yes'], metric = 'accuracy')
```

<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_208_0.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
        


**Sensitivity/True Positive Rate:** The proportion of true positives (in our case, people who survived) that are identified as such.


```python
plot_confusion_matrix(y_test, y_pred, labels = ['No', 'Yes'], metric = 'sensitivity')
```


<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_210_0.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
        


**Specificity/True Negative Rate:** The proportion of true negatives (in our case, people who died) that are identified as such.


```python
plot_confusion_matrix(y_test, y_pred, labels = ['No', 'Yes'], metric = 'specificity')
```


<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_212_0.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
    

    


**Precision:** The proportion of predicted positives that are actually positive (survived).


```python
plot_confusion_matrix(y_test, y_pred, labels = ['No', 'Yes'], metric = 'precision')
```


<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_214_0.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
    

    


We have only used a single predictor in the above model. Let's see if we can improve our model by using the rest of the predictors.

With so many predictors, it takes longer for the coefficients to converge. Let's increase the number of iterations.


```python
logreg = LogisticRegression(max_iter = 10000)
logreg.fit(X_train, y_train)
```




    LogisticRegression(max_iter=10000)




```python
y_test
```




    149338     True
    201150     True
    63901      True
    17995     False
    192704     True
              ...  
    218617     True
    181851     True
    54798      True
    177920    False
    22276      True
    Name: target, Length: 65513, dtype: bool



Let's take a look at the coefficients.

**Caution:** Our variables are on vastly different scales, so do not interpret the value of a coefficient as the importance.


```python
coefficients = pd.DataFrame({
    'variable': X.columns,
    'coefficient': logreg.coef_[0]
})
```


```python
importances = pd.DataFrame({'variable': coefficients.variable,
                           'importance': coefficients.coefficient}).sort_values('importance', ascending = False)


fig, ax = plt.subplots(figsize = (7,8))
sns.barplot(data = importances,
            x = 'importance', y = 'variable', ax = ax, edgecolor = 'black')
plt.title('Logistic Regression Coefficients');
```


<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_221_0.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
    

    



```python
fig, ax = plt.subplots(figsize = (7,5))
sns.barplot(data = coefficients,
            x = 'coefficient', 
            y = 'variable', 
            ax = ax, 
            edgecolor = 'black')
plt.title('Logistic Regression Coefficients')

ymin, ymax = plt.ylim()
plt.vlines(x = 0, ymin = ymin, ymax = ymax);
```


<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_222_0.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
    

    


 Try using regularization or a tree-based model to improve your model's performance on the BRFSS dataset.



```python

```


```python
from sklearn.tree import DecisionTreeClassifier
```

A decision tree model is fit in much the same way as a logistic regression model.


```python
tree = DecisionTreeClassifier(random_state = 321).fit(X_train, y_train)
```

First, let's see how it does on the training data.


```python
y_pred = tree.predict(X_test)
plot_confusion_matrix(y_train, tree.predict(X_train), labels = ['No', 'Yes'], metric = 'accuracy')
```


<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_229_0.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
    

    



```python
y_train.value_counts()
```




    True     161906
    False     34630
    Name: target, dtype: int64



Since decision trees are so flexible, they will often perfectly predict the training data. Remember though, that what we care about is how well the model generalizes.


```python
y_pred = tree.predict(X_test)
plot_confusion_matrix(y_test, y_pred, labels = ['No', 'Yes'], metric = 'accuracy')
```


<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_232_0.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
    

    



```python
roc_auc_score(y_test, tree.predict_proba(X_test)[:,1])
```




    0.6345258214120431



We do see a drop in model performance on the test data. This is a sign of overfitting.

To correct for this problem, we can take an ensemble approach, which means that we will build many decision trees on subsets of the features and data and then average the predictions of all of the trees. This will force our model to try and find more general patterns that will work on the test set.


```python
from sklearn.ensemble import RandomForestClassifier
```


```python
forest = RandomForestClassifier(random_state = 321)
forest.fit(X_train, y_train)
```




    RandomForestClassifier(random_state=321)




```python
y_pred = forest.predict(X_test)
plot_confusion_matrix(y_test, y_pred, labels = ['No', 'Yes'], metric = 'accuracy')
```


<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_237_0.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
    

    



```python
roc_auc_score(y_test, forest.predict_proba(X_test)[:,1])
```




    0.6501432873215749



We see some improvement over using a single tree, but we could do better. Random forests have a lot of hyperparameters that can be tuned to improve out model. Here are a few of these parameters:

* **n_estimators:** Number of decision trees to train. Default is 10. More trees = less variance, but slower to train and predict
* **max_depth:** Maximum depth (number of splits). By default, there is no max depth.
* **min_samples_leaf:** Minimum number of samples per leaf. Setting this higher keeps the decision trees from paying too much attention to any single data point.

These parameters can be tuned to try to improve the model that you get, and there are ways to automatically tune these parameters. See, for example, sklearn's GridSearchCV or RandomSearchCV.


```python
forest = RandomForestClassifier(n_estimators = 1000, max_depth = 5, min_samples_leaf = 5, random_state = 321)
forest.fit(X_train, y_train)
```




    RandomForestClassifier(max_depth=5, min_samples_leaf=5, n_estimators=1000,
                           random_state=321)




```python
y_pred = forest.predict(X_test)
plot_confusion_matrix(y_test, y_pred, labels = ['No', 'Yes'], metric = 'accuracy')
```


<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_241_0.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
    

    



```python

```


```python
plot_confusion_matrix(y_test, y_pred, labels = ['No', 'Yes'], metric = 'sensitivity')
```


<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_243_0.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
    

    


**Specificity/True Negative Rate:** The proportion of true negatives (in our case, people who died) that are identified as such.


```python
plot_confusion_matrix(y_test, y_pred, labels = ['No', 'Yes'], metric = 'specificity')
```


<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_245_0.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
    

    



```python
roc_auc_score(y_test, forest.predict_proba(X_test)[:,1])
```




    0.678213761501158




```python
fp_rate, tp_rate, thresholds = roc_curve(y_test == 1, forest.predict_proba(X_test)[:,1])

plt.plot(fp_rate, tp_rate)
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.0])
plt.title('ROC curve for Heart Disease Prediction')
plt.xlabel('False Positive Rate (1 - Specificity)')
plt.ylabel('True Positive Rate (Sensitivity)')
plt.grid(True)
```


<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_247_0.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
    

    


A nice perk of using random forest models is that we can see which features are the most important in making predictions.

**Caution:** Feature importances tell which features the model is using, but not _how_ it is using those features.


```python
importances = pd.DataFrame({'variable': X.columns,
                           'importance': forest.feature_importances_}).sort_values('importance', ascending = False)


fig, ax = plt.subplots(figsize = (7,8))
sns.barplot(data = importances,
            x = 'importance', y = 'variable', ax = ax, edgecolor = 'black')
plt.title('Random Forest Feature Importance');
```


<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_249_0.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
    

    


## Apply this model to the counties you identified above to predict how likely it is that the average person from those counties has not had a checkup in the last year.


```python
df1 = pd.read_csv('../data/County_Health_Rankings/Ranked_measure_data_TN.csv', header = 0, index_col = 0)
df1.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>State</th>
      <th>County</th>
      <th>Deaths</th>
      <th>Years of Potential Life Lost Rate</th>
      <th>95% CI - Low</th>
      <th>95% CI - High</th>
      <th>Quartile</th>
      <th>YPLL Rate (AIAN)</th>
      <th>YPLL Rate (AIAN) 95% CI - Low</th>
      <th>YPLL Rate (AIAN) 95% CI - High</th>
      <th>...</th>
      <th>% Drive Alone (Hispanic) 95% CI - Low</th>
      <th>% Drive Alone (Hispanic) 95% CI - High</th>
      <th>% Drive Alone (White)</th>
      <th>% Drive Alone (White) 95% CI - Low</th>
      <th>% Drive Alone (White) 95% CI - High</th>
      <th># Workers who Drive Alone</th>
      <th>% Long Commute - Drives Alone</th>
      <th>95% CI - Low.18</th>
      <th>95% CI - High.18</th>
      <th>Quartile.34</th>
    </tr>
    <tr>
      <th>FIPS</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>47000</th>
      <td>Tennessee</td>
      <td>NaN</td>
      <td>106691</td>
      <td>9285</td>
      <td>9202</td>
      <td>9368</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>3003226</td>
      <td>35</td>
      <td>34</td>
      <td>35</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>47001</th>
      <td>Tennessee</td>
      <td>Anderson</td>
      <td>1369</td>
      <td>10009</td>
      <td>9172</td>
      <td>10846</td>
      <td>2.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>63.0</td>
      <td>96.0</td>
      <td>90.0</td>
      <td>89.0</td>
      <td>92.0</td>
      <td>32206</td>
      <td>36</td>
      <td>32</td>
      <td>39</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>47003</th>
      <td>Tennessee</td>
      <td>Bedford</td>
      <td>859</td>
      <td>10294</td>
      <td>9268</td>
      <td>11319</td>
      <td>2.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>54.0</td>
      <td>74.0</td>
      <td>80.0</td>
      <td>76.0</td>
      <td>84.0</td>
      <td>21250</td>
      <td>35</td>
      <td>31</td>
      <td>38</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>47005</th>
      <td>Tennessee</td>
      <td>Benton</td>
      <td>428</td>
      <td>14479</td>
      <td>12233</td>
      <td>16726</td>
      <td>4.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>5448</td>
      <td>28</td>
      <td>23</td>
      <td>33</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>47007</th>
      <td>Tennessee</td>
      <td>Bledsoe</td>
      <td>229</td>
      <td>8126</td>
      <td>6427</td>
      <td>9824</td>
      <td>1.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>5603</td>
      <td>53</td>
      <td>43</td>
      <td>62</td>
      <td>4.0</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 239 columns</p>
</div>




```python
df2 = pd.read_csv('../data/County_Health_Rankings/Addition_measure_data_TN.csv', header = 0, index_col = 0)
df2.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>State</th>
      <th>County</th>
      <th>Life Expectancy</th>
      <th>95% CI - Low</th>
      <th>95% CI - High</th>
      <th>Life Expectancy (AIAN)</th>
      <th>Life Expectancy (AIAN) 95% CI - Low</th>
      <th>Life Expectancy (AIAN) 95% CI - High</th>
      <th>Life Expectancy (Asian)</th>
      <th>Life Expectancy (Asian) 95% CI - Low</th>
      <th>...</th>
      <th>% Hispanic</th>
      <th># Non-Hispanic White</th>
      <th>% Non-Hispanic White</th>
      <th># Not Proficient in English</th>
      <th>% Not Proficient in English</th>
      <th>95% CI - Low.19</th>
      <th>95% CI - High.19</th>
      <th>% Female</th>
      <th># Rural</th>
      <th>% Rural</th>
    </tr>
    <tr>
      <th>FIPS</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>47000</th>
      <td>Tennessee</td>
      <td>NaN</td>
      <td>76.0</td>
      <td>75.9</td>
      <td>76.1</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>5.6</td>
      <td>4989758</td>
      <td>73.7</td>
      <td>94554</td>
      <td>2</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>51.2</td>
      <td>2132860</td>
      <td>33.6</td>
    </tr>
    <tr>
      <th>47001</th>
      <td>Tennessee</td>
      <td>Anderson</td>
      <td>75.5</td>
      <td>74.9</td>
      <td>76.2</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>3.1</td>
      <td>68116</td>
      <td>89.1</td>
      <td>619</td>
      <td>1</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>51.3</td>
      <td>26041</td>
      <td>34.7</td>
    </tr>
    <tr>
      <th>47003</th>
      <td>Tennessee</td>
      <td>Bedford</td>
      <td>74.3</td>
      <td>73.5</td>
      <td>75.1</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>12.6</td>
      <td>37556</td>
      <td>76.6</td>
      <td>1474</td>
      <td>3</td>
      <td>2.0</td>
      <td>4.0</td>
      <td>50.9</td>
      <td>25053</td>
      <td>55.6</td>
    </tr>
    <tr>
      <th>47005</th>
      <td>Tennessee</td>
      <td>Benton</td>
      <td>71.7</td>
      <td>70.2</td>
      <td>73.2</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>2.5</td>
      <td>14970</td>
      <td>92.5</td>
      <td>25</td>
      <td>0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>51.0</td>
      <td>12937</td>
      <td>78.5</td>
    </tr>
    <tr>
      <th>47007</th>
      <td>Tennessee</td>
      <td>Bledsoe</td>
      <td>78.0</td>
      <td>76.4</td>
      <td>79.6</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>...</td>
      <td>2.5</td>
      <td>13038</td>
      <td>88.4</td>
      <td>245</td>
      <td>2</td>
      <td>0.0</td>
      <td>3.0</td>
      <td>41.1</td>
      <td>12876</td>
      <td>100.0</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 269 columns</p>
</div>



First, we need to get these boolean values to match up with our county info, so when we use the model later we can use the same variables.
- GENHLTH:
    - Matched county % poor or fair health in Ranked Measure data
- HLTHPLN1
    - Matches inverse of county % uninsured in Additional Measure data
- DIABETE4
    - Matches % adults with diabetes in Additional Measure data
- _RFBING5 and _RFDRHV7
    - Matches excessive drinking in Ranked Measure data
- RENTHOM1
    - Matches % homeowners in Additional
- _IMPRACE
    - Matches demographic %s in Additional Measure Data
- _URBSTAT
    - matches inverse of % rural in additional
- EDUCA
    - "Grade 12 or GED (High school graduate)" 
    - matches "High school graduation rate" in ranked measure data
    - "College 1 year to 3 years (Some college or technical school)" or "College 4 years or more (College graduate)" == % some college
- EMPLOY1
    - "Out of work for 1 year or more" or "Out of work for less than 1 year" or "Unable to work" == % unemployment rate in Ranked measure data
- INCOME2:
    - group "Household Income (AIAN)" into same groups as above in additional
- _TOTINDA
    - % physically inactive in ranked data
- _RFSMOK3_Yes
    - % smokers in ranked


```python
# [print(i) for i in df2 if "%" in str(i)]
```


```python
df1 = df1[['% Fair or Poor Health', "% Excessive Drinking","High School Graduation Rate","% Some College","% Unemployed","% Physically Inactive","% Smokers"]]
```


```python
df2 = df2[["% Uninsured","% Adults with Diabetes","% Homeowners","% Rural","Median Household Income",
     "% Non-Hispanic White", "% Black","% American Indian & Alaska Native","% Asian","% Native Hawaiian/Other Pacific Islander","% Hispanic"]]
```

We now need to convert these columns to the ones in X.


```python
county_demo = df1.join(df2)
```


```python
#everything is a percentage except Income, so divide by 100 and then fix income column
county_demo = county_demo/100
county_demo['Median Household Income'] *=100 
```


```python
county_demo
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>% Fair or Poor Health</th>
      <th>% Excessive Drinking</th>
      <th>High School Graduation Rate</th>
      <th>% Some College</th>
      <th>% Unemployed</th>
      <th>% Physically Inactive</th>
      <th>% Smokers</th>
      <th>% Uninsured</th>
      <th>% Adults with Diabetes</th>
      <th>% Homeowners</th>
      <th>% Rural</th>
      <th>Median Household Income</th>
      <th>% Non-Hispanic White</th>
      <th>% Black</th>
      <th>% American Indian &amp; Alaska Native</th>
      <th>% Asian</th>
      <th>% Native Hawaiian/Other Pacific Islander</th>
      <th>% Hispanic</th>
    </tr>
    <tr>
      <th>FIPS</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>47000</th>
      <td>0.20</td>
      <td>0.14</td>
      <td>0.90</td>
      <td>0.61</td>
      <td>0.035</td>
      <td>0.27</td>
      <td>0.23</td>
      <td>0.14</td>
      <td>0.13</td>
      <td>0.66</td>
      <td>0.336</td>
      <td>52366.0</td>
      <td>0.737</td>
      <td>0.167</td>
      <td>0.005</td>
      <td>0.019</td>
      <td>0.001</td>
      <td>0.056</td>
    </tr>
    <tr>
      <th>47001</th>
      <td>0.19</td>
      <td>0.14</td>
      <td>0.92</td>
      <td>0.58</td>
      <td>0.038</td>
      <td>0.26</td>
      <td>0.21</td>
      <td>0.13</td>
      <td>0.11</td>
      <td>0.68</td>
      <td>0.347</td>
      <td>50672.0</td>
      <td>0.891</td>
      <td>0.039</td>
      <td>0.005</td>
      <td>0.015</td>
      <td>0.001</td>
      <td>0.031</td>
    </tr>
    <tr>
      <th>47003</th>
      <td>0.22</td>
      <td>0.16</td>
      <td>0.91</td>
      <td>0.41</td>
      <td>0.037</td>
      <td>0.32</td>
      <td>0.23</td>
      <td>0.18</td>
      <td>0.11</td>
      <td>0.68</td>
      <td>0.556</td>
      <td>49860.0</td>
      <td>0.766</td>
      <td>0.076</td>
      <td>0.011</td>
      <td>0.011</td>
      <td>0.002</td>
      <td>0.126</td>
    </tr>
    <tr>
      <th>47005</th>
      <td>0.23</td>
      <td>0.12</td>
      <td>0.96</td>
      <td>0.47</td>
      <td>0.049</td>
      <td>0.29</td>
      <td>0.24</td>
      <td>0.15</td>
      <td>0.14</td>
      <td>0.76</td>
      <td>0.785</td>
      <td>38940.0</td>
      <td>0.925</td>
      <td>0.024</td>
      <td>0.006</td>
      <td>0.006</td>
      <td>0.000</td>
      <td>0.025</td>
    </tr>
    <tr>
      <th>47007</th>
      <td>0.23</td>
      <td>0.15</td>
      <td>0.85</td>
      <td>0.38</td>
      <td>0.058</td>
      <td>0.26</td>
      <td>0.25</td>
      <td>0.18</td>
      <td>0.10</td>
      <td>0.74</td>
      <td>1.000</td>
      <td>40195.0</td>
      <td>0.884</td>
      <td>0.071</td>
      <td>0.006</td>
      <td>0.003</td>
      <td>0.000</td>
      <td>0.025</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>47181</th>
      <td>0.24</td>
      <td>0.14</td>
      <td>0.96</td>
      <td>0.40</td>
      <td>0.049</td>
      <td>0.41</td>
      <td>0.25</td>
      <td>0.14</td>
      <td>0.15</td>
      <td>0.81</td>
      <td>1.000</td>
      <td>38879.0</td>
      <td>0.899</td>
      <td>0.063</td>
      <td>0.004</td>
      <td>0.003</td>
      <td>0.000</td>
      <td>0.021</td>
    </tr>
    <tr>
      <th>47183</th>
      <td>0.22</td>
      <td>0.14</td>
      <td>0.92</td>
      <td>0.56</td>
      <td>0.042</td>
      <td>0.34</td>
      <td>0.22</td>
      <td>0.12</td>
      <td>0.11</td>
      <td>0.66</td>
      <td>0.670</td>
      <td>42351.0</td>
      <td>0.868</td>
      <td>0.075</td>
      <td>0.004</td>
      <td>0.012</td>
      <td>0.000</td>
      <td>0.027</td>
    </tr>
    <tr>
      <th>47185</th>
      <td>0.25</td>
      <td>0.13</td>
      <td>0.94</td>
      <td>0.49</td>
      <td>0.037</td>
      <td>0.23</td>
      <td>0.23</td>
      <td>0.14</td>
      <td>0.22</td>
      <td>0.81</td>
      <td>0.782</td>
      <td>42603.0</td>
      <td>0.930</td>
      <td>0.018</td>
      <td>0.005</td>
      <td>0.004</td>
      <td>0.001</td>
      <td>0.028</td>
    </tr>
    <tr>
      <th>47187</th>
      <td>0.14</td>
      <td>0.16</td>
      <td>0.96</td>
      <td>0.87</td>
      <td>0.025</td>
      <td>0.18</td>
      <td>0.15</td>
      <td>0.08</td>
      <td>0.08</td>
      <td>0.81</td>
      <td>0.194</td>
      <td>115930.0</td>
      <td>0.843</td>
      <td>0.043</td>
      <td>0.003</td>
      <td>0.047</td>
      <td>0.001</td>
      <td>0.049</td>
    </tr>
    <tr>
      <th>47189</th>
      <td>0.17</td>
      <td>0.17</td>
      <td>0.96</td>
      <td>0.69</td>
      <td>0.028</td>
      <td>0.21</td>
      <td>0.18</td>
      <td>0.10</td>
      <td>0.11</td>
      <td>0.77</td>
      <td>0.385</td>
      <td>76507.0</td>
      <td>0.847</td>
      <td>0.071</td>
      <td>0.005</td>
      <td>0.017</td>
      <td>0.001</td>
      <td>0.045</td>
    </tr>
  </tbody>
</table>
<p>96 rows × 18 columns</p>
</div>




```python
county_demo.columns
```




    Index(['% Fair or Poor Health', '% Excessive Drinking',
           'High School Graduation Rate', '% Some College', '% Unemployed',
           '% Physically Inactive', '% Smokers', '% Uninsured',
           '% Adults with Diabetes', '% Homeowners', '% Rural',
           'Median Household Income', '% Non-Hispanic White', '% Black',
           '% American Indian & Alaska Native', '% Asian',
           '% Native Hawaiian/Other Pacific Islander', '% Hispanic'],
          dtype='object')




```python
X.columns
```




    Index(['_IMPRACE_American Indian/Alaskan Native, Non-Hispanic',
           '_IMPRACE_Asian, Non-Hispanic', '_IMPRACE_Black, Non-Hispanic',
           '_IMPRACE_Hispanic', '_IMPRACE_Other race, Non-Hispanic',
           '_IMPRACE_White, Non-Hispanic', 'INCOME2_$75,000 or more',
           'INCOME2_Less than $10,000',
           'INCOME2_Less than $15,000 ($10,000 to less than $15,000)',
           'INCOME2_Less than $20,000 ($15,000 to less than $20,000)',
           'INCOME2_Less than $25,000 ($20,000 to less than $25,000)',
           'INCOME2_Less than $35,000 ($25,000 to less than $35,000)',
           'INCOME2_Less than $50,000 ($35,000 to less than $50,000)',
           'INCOME2_Less than $75,000 ($50,000 to less than $75,000)', 'Rural',
           'Diabetes', 'General_health', 'Health_plan', 'Excessive_drinking',
           'Owns_home', 'High_school_grad', 'College', 'Unemployed', 'Inactivity',
           'Smoker'],
          dtype='object')




```python
column_dict = {'% Fair or Poor Health':"General_health", '% Excessive Drinking':"Excessive_drinking",
'High School Graduation Rate':"High_school_grad", '% Some College':"College", '% Unemployed':"Unemployed",
'% Physically Inactive':"Inactivity", '% Smokers':"Smoker", '% Uninsured':"Health_plan",
'% Adults with Diabetes':"Diabetes", '% Homeowners':"Owns_home", '% Rural':"Rural",
'% Non-Hispanic White':"_IMPRACE_White, Non-Hispanic", 
'% Black':'_IMPRACE_Black, Non-Hispanic',
'% American Indian & Alaska Native':'_IMPRACE_American Indian/Alaskan Native, Non-Hispanic', 
'% Asian':"_IMPRACE_Asian, Non-Hispanic",
'% Native Hawaiian/Other Pacific Islander':"_IMPRACE_Other race, Non-Hispanic", 
'% Hispanic':"_IMPRACE_Hispanic"}
```


```python
for i in column_dict:
    county_demo.columns = county_demo.columns.str.replace(i,column_dict[i])
```


```python
county_demo
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>General_health</th>
      <th>Excessive_drinking</th>
      <th>High_school_grad</th>
      <th>College</th>
      <th>Unemployed</th>
      <th>Inactivity</th>
      <th>Smoker</th>
      <th>Health_plan</th>
      <th>Diabetes</th>
      <th>Owns_home</th>
      <th>Rural</th>
      <th>Median Household Income</th>
      <th>_IMPRACE_White, Non-Hispanic</th>
      <th>_IMPRACE_Black, Non-Hispanic</th>
      <th>_IMPRACE_American Indian/Alaskan Native, Non-Hispanic</th>
      <th>_IMPRACE_Asian, Non-Hispanic</th>
      <th>_IMPRACE_Other race, Non-Hispanic</th>
      <th>_IMPRACE_Hispanic</th>
    </tr>
    <tr>
      <th>FIPS</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>47000</th>
      <td>0.20</td>
      <td>0.14</td>
      <td>0.90</td>
      <td>0.61</td>
      <td>0.035</td>
      <td>0.27</td>
      <td>0.23</td>
      <td>0.14</td>
      <td>0.13</td>
      <td>0.66</td>
      <td>0.336</td>
      <td>52366.0</td>
      <td>0.737</td>
      <td>0.167</td>
      <td>0.005</td>
      <td>0.019</td>
      <td>0.001</td>
      <td>0.056</td>
    </tr>
    <tr>
      <th>47001</th>
      <td>0.19</td>
      <td>0.14</td>
      <td>0.92</td>
      <td>0.58</td>
      <td>0.038</td>
      <td>0.26</td>
      <td>0.21</td>
      <td>0.13</td>
      <td>0.11</td>
      <td>0.68</td>
      <td>0.347</td>
      <td>50672.0</td>
      <td>0.891</td>
      <td>0.039</td>
      <td>0.005</td>
      <td>0.015</td>
      <td>0.001</td>
      <td>0.031</td>
    </tr>
    <tr>
      <th>47003</th>
      <td>0.22</td>
      <td>0.16</td>
      <td>0.91</td>
      <td>0.41</td>
      <td>0.037</td>
      <td>0.32</td>
      <td>0.23</td>
      <td>0.18</td>
      <td>0.11</td>
      <td>0.68</td>
      <td>0.556</td>
      <td>49860.0</td>
      <td>0.766</td>
      <td>0.076</td>
      <td>0.011</td>
      <td>0.011</td>
      <td>0.002</td>
      <td>0.126</td>
    </tr>
    <tr>
      <th>47005</th>
      <td>0.23</td>
      <td>0.12</td>
      <td>0.96</td>
      <td>0.47</td>
      <td>0.049</td>
      <td>0.29</td>
      <td>0.24</td>
      <td>0.15</td>
      <td>0.14</td>
      <td>0.76</td>
      <td>0.785</td>
      <td>38940.0</td>
      <td>0.925</td>
      <td>0.024</td>
      <td>0.006</td>
      <td>0.006</td>
      <td>0.000</td>
      <td>0.025</td>
    </tr>
    <tr>
      <th>47007</th>
      <td>0.23</td>
      <td>0.15</td>
      <td>0.85</td>
      <td>0.38</td>
      <td>0.058</td>
      <td>0.26</td>
      <td>0.25</td>
      <td>0.18</td>
      <td>0.10</td>
      <td>0.74</td>
      <td>1.000</td>
      <td>40195.0</td>
      <td>0.884</td>
      <td>0.071</td>
      <td>0.006</td>
      <td>0.003</td>
      <td>0.000</td>
      <td>0.025</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>47181</th>
      <td>0.24</td>
      <td>0.14</td>
      <td>0.96</td>
      <td>0.40</td>
      <td>0.049</td>
      <td>0.41</td>
      <td>0.25</td>
      <td>0.14</td>
      <td>0.15</td>
      <td>0.81</td>
      <td>1.000</td>
      <td>38879.0</td>
      <td>0.899</td>
      <td>0.063</td>
      <td>0.004</td>
      <td>0.003</td>
      <td>0.000</td>
      <td>0.021</td>
    </tr>
    <tr>
      <th>47183</th>
      <td>0.22</td>
      <td>0.14</td>
      <td>0.92</td>
      <td>0.56</td>
      <td>0.042</td>
      <td>0.34</td>
      <td>0.22</td>
      <td>0.12</td>
      <td>0.11</td>
      <td>0.66</td>
      <td>0.670</td>
      <td>42351.0</td>
      <td>0.868</td>
      <td>0.075</td>
      <td>0.004</td>
      <td>0.012</td>
      <td>0.000</td>
      <td>0.027</td>
    </tr>
    <tr>
      <th>47185</th>
      <td>0.25</td>
      <td>0.13</td>
      <td>0.94</td>
      <td>0.49</td>
      <td>0.037</td>
      <td>0.23</td>
      <td>0.23</td>
      <td>0.14</td>
      <td>0.22</td>
      <td>0.81</td>
      <td>0.782</td>
      <td>42603.0</td>
      <td>0.930</td>
      <td>0.018</td>
      <td>0.005</td>
      <td>0.004</td>
      <td>0.001</td>
      <td>0.028</td>
    </tr>
    <tr>
      <th>47187</th>
      <td>0.14</td>
      <td>0.16</td>
      <td>0.96</td>
      <td>0.87</td>
      <td>0.025</td>
      <td>0.18</td>
      <td>0.15</td>
      <td>0.08</td>
      <td>0.08</td>
      <td>0.81</td>
      <td>0.194</td>
      <td>115930.0</td>
      <td>0.843</td>
      <td>0.043</td>
      <td>0.003</td>
      <td>0.047</td>
      <td>0.001</td>
      <td>0.049</td>
    </tr>
    <tr>
      <th>47189</th>
      <td>0.17</td>
      <td>0.17</td>
      <td>0.96</td>
      <td>0.69</td>
      <td>0.028</td>
      <td>0.21</td>
      <td>0.18</td>
      <td>0.10</td>
      <td>0.11</td>
      <td>0.77</td>
      <td>0.385</td>
      <td>76507.0</td>
      <td>0.847</td>
      <td>0.071</td>
      <td>0.005</td>
      <td>0.017</td>
      <td>0.001</td>
      <td>0.045</td>
    </tr>
  </tbody>
</table>
<p>96 rows × 18 columns</p>
</div>



Don't forget, we need 1-Health Plan (% Uninsured --> Health plan). All others should already be accounted for if "negative," such as physical inactivity, unemployed, etc. i.e. TRUE for Unemployed truly means unemployed.



```python
county_demo['Health_plan'] = 1- county_demo['Health_plan']
```

Now we work on income categories.


```python
income_categories = []
for i in county_demo['Median Household Income']:
    if float(i) < 10000:
        income_categories.append('INCOME2_Less than $10,000')
    elif (i >= 10000) & (i < 15000):
        income_categories.append('INCOME2_Less than $15,000 ($10,000 to less than $15,000)')
    elif (i >= 15000) & (i < 20000):
        income_categories.append('INCOME2_Less than $20,000 ($15,000 to less than $20,000)')
    elif (i >= 20000) & (i < 25000):
        income_categories.append('INCOME2_Less than $25,000 ($20,000 to less than $25,000)')
    elif (i >= 25000) & (i < 35000):
        income_categories.append('INCOME2_Less than $35,000 ($25,000 to less than $35,000)')
    elif (i >= 35000) & (i < 50000):
        income_categories.append('INCOME2_Less than $50,000 ($35,000 to less than $50,000)')
    elif (i >= 50000) & (i < 75000):
        income_categories.append('INCOME2_Less than $75,000 ($50,000 to less than $75,000)')
    elif (i >= 75000):
        income_categories.append('INCOME2_$75,000 or more')
```


```python
county_demo['income_categories'] = income_categories
```


```python
county_demo = pd.get_dummies(county_demo, 'income_categories')
county_demo = county_demo.drop('Median Household Income', axis = 1)
```


```python
county_demo['INCOME2_Less than $25,000 ($20,000 to less than $25,000)'] = 0
county_demo['INCOME2_Less than $20,000 ($15,000 to less than $20,000)'] = 0
county_demo['INCOME2_Less than $15,000 ($10,000 to less than $15,000)'] = 0
county_demo['INCOME2_Less than $10,000'] = 0
```


```python
county_demo.columns = county_demo.columns.str.replace("income_categories_", "")
```


```python
county_demo
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>General_health</th>
      <th>Excessive_drinking</th>
      <th>High_school_grad</th>
      <th>College</th>
      <th>Unemployed</th>
      <th>Inactivity</th>
      <th>Smoker</th>
      <th>Health_plan</th>
      <th>Diabetes</th>
      <th>Owns_home</th>
      <th>...</th>
      <th>_IMPRACE_Other race, Non-Hispanic</th>
      <th>_IMPRACE_Hispanic</th>
      <th>INCOME2_$75,000 or more</th>
      <th>INCOME2_Less than $35,000 ($25,000 to less than $35,000)</th>
      <th>INCOME2_Less than $50,000 ($35,000 to less than $50,000)</th>
      <th>INCOME2_Less than $75,000 ($50,000 to less than $75,000)</th>
      <th>INCOME2_Less than $25,000 ($20,000 to less than $25,000)</th>
      <th>INCOME2_Less than $20,000 ($15,000 to less than $20,000)</th>
      <th>INCOME2_Less than $15,000 ($10,000 to less than $15,000)</th>
      <th>INCOME2_Less than $10,000</th>
    </tr>
    <tr>
      <th>FIPS</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>47000</th>
      <td>0.20</td>
      <td>0.14</td>
      <td>0.90</td>
      <td>0.61</td>
      <td>0.035</td>
      <td>0.27</td>
      <td>0.23</td>
      <td>0.86</td>
      <td>0.13</td>
      <td>0.66</td>
      <td>...</td>
      <td>0.001</td>
      <td>0.056</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>47001</th>
      <td>0.19</td>
      <td>0.14</td>
      <td>0.92</td>
      <td>0.58</td>
      <td>0.038</td>
      <td>0.26</td>
      <td>0.21</td>
      <td>0.87</td>
      <td>0.11</td>
      <td>0.68</td>
      <td>...</td>
      <td>0.001</td>
      <td>0.031</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>47003</th>
      <td>0.22</td>
      <td>0.16</td>
      <td>0.91</td>
      <td>0.41</td>
      <td>0.037</td>
      <td>0.32</td>
      <td>0.23</td>
      <td>0.82</td>
      <td>0.11</td>
      <td>0.68</td>
      <td>...</td>
      <td>0.002</td>
      <td>0.126</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>47005</th>
      <td>0.23</td>
      <td>0.12</td>
      <td>0.96</td>
      <td>0.47</td>
      <td>0.049</td>
      <td>0.29</td>
      <td>0.24</td>
      <td>0.85</td>
      <td>0.14</td>
      <td>0.76</td>
      <td>...</td>
      <td>0.000</td>
      <td>0.025</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>47007</th>
      <td>0.23</td>
      <td>0.15</td>
      <td>0.85</td>
      <td>0.38</td>
      <td>0.058</td>
      <td>0.26</td>
      <td>0.25</td>
      <td>0.82</td>
      <td>0.10</td>
      <td>0.74</td>
      <td>...</td>
      <td>0.000</td>
      <td>0.025</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>47181</th>
      <td>0.24</td>
      <td>0.14</td>
      <td>0.96</td>
      <td>0.40</td>
      <td>0.049</td>
      <td>0.41</td>
      <td>0.25</td>
      <td>0.86</td>
      <td>0.15</td>
      <td>0.81</td>
      <td>...</td>
      <td>0.000</td>
      <td>0.021</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>47183</th>
      <td>0.22</td>
      <td>0.14</td>
      <td>0.92</td>
      <td>0.56</td>
      <td>0.042</td>
      <td>0.34</td>
      <td>0.22</td>
      <td>0.88</td>
      <td>0.11</td>
      <td>0.66</td>
      <td>...</td>
      <td>0.000</td>
      <td>0.027</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>47185</th>
      <td>0.25</td>
      <td>0.13</td>
      <td>0.94</td>
      <td>0.49</td>
      <td>0.037</td>
      <td>0.23</td>
      <td>0.23</td>
      <td>0.86</td>
      <td>0.22</td>
      <td>0.81</td>
      <td>...</td>
      <td>0.001</td>
      <td>0.028</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>47187</th>
      <td>0.14</td>
      <td>0.16</td>
      <td>0.96</td>
      <td>0.87</td>
      <td>0.025</td>
      <td>0.18</td>
      <td>0.15</td>
      <td>0.92</td>
      <td>0.08</td>
      <td>0.81</td>
      <td>...</td>
      <td>0.001</td>
      <td>0.049</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>47189</th>
      <td>0.17</td>
      <td>0.17</td>
      <td>0.96</td>
      <td>0.69</td>
      <td>0.028</td>
      <td>0.21</td>
      <td>0.18</td>
      <td>0.90</td>
      <td>0.11</td>
      <td>0.77</td>
      <td>...</td>
      <td>0.001</td>
      <td>0.045</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
<p>96 rows × 25 columns</p>
</div>




```python
county_pred = tree.predict(county_demo)

```


```python
county_pred_prob = forest.predict_proba(county_demo)[:,1]
```


```python
county_demo['predict_prob'] = county_pred_prob
```


```python
county_demo
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>General_health</th>
      <th>Excessive_drinking</th>
      <th>High_school_grad</th>
      <th>College</th>
      <th>Unemployed</th>
      <th>Inactivity</th>
      <th>Smoker</th>
      <th>Health_plan</th>
      <th>Diabetes</th>
      <th>Owns_home</th>
      <th>...</th>
      <th>_IMPRACE_Hispanic</th>
      <th>INCOME2_$75,000 or more</th>
      <th>INCOME2_Less than $35,000 ($25,000 to less than $35,000)</th>
      <th>INCOME2_Less than $50,000 ($35,000 to less than $50,000)</th>
      <th>INCOME2_Less than $75,000 ($50,000 to less than $75,000)</th>
      <th>INCOME2_Less than $25,000 ($20,000 to less than $25,000)</th>
      <th>INCOME2_Less than $20,000 ($15,000 to less than $20,000)</th>
      <th>INCOME2_Less than $15,000 ($10,000 to less than $15,000)</th>
      <th>INCOME2_Less than $10,000</th>
      <th>predict_prob</th>
    </tr>
    <tr>
      <th>FIPS</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>47000</th>
      <td>0.20</td>
      <td>0.14</td>
      <td>0.90</td>
      <td>0.61</td>
      <td>0.035</td>
      <td>0.27</td>
      <td>0.23</td>
      <td>0.86</td>
      <td>0.13</td>
      <td>0.66</td>
      <td>...</td>
      <td>0.056</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0.640059</td>
    </tr>
    <tr>
      <th>47001</th>
      <td>0.19</td>
      <td>0.14</td>
      <td>0.92</td>
      <td>0.58</td>
      <td>0.038</td>
      <td>0.26</td>
      <td>0.21</td>
      <td>0.87</td>
      <td>0.11</td>
      <td>0.68</td>
      <td>...</td>
      <td>0.031</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0.640059</td>
    </tr>
    <tr>
      <th>47003</th>
      <td>0.22</td>
      <td>0.16</td>
      <td>0.91</td>
      <td>0.41</td>
      <td>0.037</td>
      <td>0.32</td>
      <td>0.23</td>
      <td>0.82</td>
      <td>0.11</td>
      <td>0.68</td>
      <td>...</td>
      <td>0.126</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0.687877</td>
    </tr>
    <tr>
      <th>47005</th>
      <td>0.23</td>
      <td>0.12</td>
      <td>0.96</td>
      <td>0.47</td>
      <td>0.049</td>
      <td>0.29</td>
      <td>0.24</td>
      <td>0.85</td>
      <td>0.14</td>
      <td>0.76</td>
      <td>...</td>
      <td>0.025</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0.687877</td>
    </tr>
    <tr>
      <th>47007</th>
      <td>0.23</td>
      <td>0.15</td>
      <td>0.85</td>
      <td>0.38</td>
      <td>0.058</td>
      <td>0.26</td>
      <td>0.25</td>
      <td>0.82</td>
      <td>0.10</td>
      <td>0.74</td>
      <td>...</td>
      <td>0.025</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0.687877</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>47181</th>
      <td>0.24</td>
      <td>0.14</td>
      <td>0.96</td>
      <td>0.40</td>
      <td>0.049</td>
      <td>0.41</td>
      <td>0.25</td>
      <td>0.86</td>
      <td>0.15</td>
      <td>0.81</td>
      <td>...</td>
      <td>0.021</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0.687877</td>
    </tr>
    <tr>
      <th>47183</th>
      <td>0.22</td>
      <td>0.14</td>
      <td>0.92</td>
      <td>0.56</td>
      <td>0.042</td>
      <td>0.34</td>
      <td>0.22</td>
      <td>0.88</td>
      <td>0.11</td>
      <td>0.66</td>
      <td>...</td>
      <td>0.027</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0.667665</td>
    </tr>
    <tr>
      <th>47185</th>
      <td>0.25</td>
      <td>0.13</td>
      <td>0.94</td>
      <td>0.49</td>
      <td>0.037</td>
      <td>0.23</td>
      <td>0.23</td>
      <td>0.86</td>
      <td>0.22</td>
      <td>0.81</td>
      <td>...</td>
      <td>0.028</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0.687877</td>
    </tr>
    <tr>
      <th>47187</th>
      <td>0.14</td>
      <td>0.16</td>
      <td>0.96</td>
      <td>0.87</td>
      <td>0.025</td>
      <td>0.18</td>
      <td>0.15</td>
      <td>0.92</td>
      <td>0.08</td>
      <td>0.81</td>
      <td>...</td>
      <td>0.049</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0.812499</td>
    </tr>
    <tr>
      <th>47189</th>
      <td>0.17</td>
      <td>0.17</td>
      <td>0.96</td>
      <td>0.69</td>
      <td>0.028</td>
      <td>0.21</td>
      <td>0.18</td>
      <td>0.90</td>
      <td>0.11</td>
      <td>0.77</td>
      <td>...</td>
      <td>0.045</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0.812499</td>
    </tr>
  </tbody>
</table>
<p>96 rows × 26 columns</p>
</div>




```python
disparities = pd.read_csv('../data/disparities.csv', header = 0, index_col = 0)
disparities.index = disparities.FIPS
disparities
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>FIPS</th>
      <th>year</th>
      <th>primary_sex</th>
      <th>primary_age</th>
      <th>primary_dual</th>
      <th>state</th>
      <th>primary_race</th>
      <th>primary_eligibility</th>
      <th>primary_denominator_well</th>
      <th>analysis_value_well</th>
      <th>...</th>
      <th>county</th>
      <th>primary_care_physicians</th>
      <th>population</th>
      <th>urban</th>
      <th>shadac_category</th>
      <th>pcp_per_100k</th>
      <th>num_hospitals</th>
      <th>num_hospitals_open</th>
      <th>mean_beds</th>
      <th>num_beds</th>
    </tr>
    <tr>
      <th>FIPS</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>47033</th>
      <td>47033</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>1,000-4,999</td>
      <td>25</td>
      <td>...</td>
      <td>Crockett</td>
      <td>0.0</td>
      <td>14399</td>
      <td>Rural</td>
      <td>low inadequate</td>
      <td>0.000000</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>NaN</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>47061</th>
      <td>47061</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>1,000-4,999</td>
      <td>34</td>
      <td>...</td>
      <td>Grundy</td>
      <td>0.0</td>
      <td>13344</td>
      <td>Rural</td>
      <td>low inadequate</td>
      <td>0.000000</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>NaN</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>47095</th>
      <td>47095</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>500-999</td>
      <td>20</td>
      <td>...</td>
      <td>Lake</td>
      <td>0.0</td>
      <td>7401</td>
      <td>Rural</td>
      <td>low inadequate</td>
      <td>0.000000</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>NaN</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>47175</th>
      <td>47175</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>500-999</td>
      <td>31</td>
      <td>...</td>
      <td>Van Buren</td>
      <td>0.0</td>
      <td>5760</td>
      <td>Rural</td>
      <td>low inadequate</td>
      <td>0.000000</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>NaN</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>47007</th>
      <td>47007</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>1,000-4,999</td>
      <td>19</td>
      <td>...</td>
      <td>Bledsoe</td>
      <td>1.0</td>
      <td>14836</td>
      <td>Rural</td>
      <td>low inadequate</td>
      <td>6.740361</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>25.000000</td>
      <td>25.0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>47093</th>
      <td>47093</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>10,000+</td>
      <td>56</td>
      <td>...</td>
      <td>Knox</td>
      <td>520.0</td>
      <td>461104</td>
      <td>Urban</td>
      <td>adequate</td>
      <td>112.772823</td>
      <td>11.0</td>
      <td>10.0</td>
      <td>306.600000</td>
      <td>3066.0</td>
    </tr>
    <tr>
      <th>47163</th>
      <td>47163</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>10,000+</td>
      <td>52</td>
      <td>...</td>
      <td>Sullivan</td>
      <td>199.0</td>
      <td>157050</td>
      <td>Urban</td>
      <td>adequate</td>
      <td>126.711238</td>
      <td>5.0</td>
      <td>5.0</td>
      <td>235.000000</td>
      <td>1175.0</td>
    </tr>
    <tr>
      <th>47113</th>
      <td>47113</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>10,000+</td>
      <td>43</td>
      <td>...</td>
      <td>Madison</td>
      <td>129.0</td>
      <td>97625</td>
      <td>Urban</td>
      <td>adequate</td>
      <td>132.138284</td>
      <td>3.0</td>
      <td>3.0</td>
      <td>330.666667</td>
      <td>992.0</td>
    </tr>
    <tr>
      <th>47187</th>
      <td>47187</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>10,000+</td>
      <td>48</td>
      <td>...</td>
      <td>Williamson</td>
      <td>338.0</td>
      <td>225389</td>
      <td>Urban</td>
      <td>adequate</td>
      <td>149.962953</td>
      <td>2.0</td>
      <td>2.0</td>
      <td>112.500000</td>
      <td>225.0</td>
    </tr>
    <tr>
      <th>47179</th>
      <td>47179</td>
      <td>2019</td>
      <td>All</td>
      <td>All</td>
      <td>Dual &amp; non-dual</td>
      <td>TENNESSEE</td>
      <td>All</td>
      <td>All</td>
      <td>10,000+</td>
      <td>57</td>
      <td>...</td>
      <td>Washington</td>
      <td>226.0</td>
      <td>127805</td>
      <td>Urban</td>
      <td>adequate</td>
      <td>176.831892</td>
      <td>7.0</td>
      <td>6.0</td>
      <td>167.000000</td>
      <td>1002.0</td>
    </tr>
  </tbody>
</table>
<p>95 rows × 30 columns</p>
</div>




```python
full_df = disparities.join(county_demo, lsuffix = 'disp', rsuffix = 'demo')
```


```python
full_df.sort_values('predict_prob')[['county','predict_prob']]
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>county</th>
      <th>predict_prob</th>
    </tr>
    <tr>
      <th>FIPS</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>47027</th>
      <td>Clay</td>
      <td>0.615584</td>
    </tr>
    <tr>
      <th>47095</th>
      <td>Lake</td>
      <td>0.615584</td>
    </tr>
    <tr>
      <th>47067</th>
      <td>Hancock</td>
      <td>0.615584</td>
    </tr>
    <tr>
      <th>47149</th>
      <td>Rutherford</td>
      <td>0.640059</td>
    </tr>
    <tr>
      <th>47125</th>
      <td>Montgomery</td>
      <td>0.640059</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>47091</th>
      <td>Johnson</td>
      <td>0.687877</td>
    </tr>
    <tr>
      <th>47055</th>
      <td>Giles</td>
      <td>0.687877</td>
    </tr>
    <tr>
      <th>47075</th>
      <td>Haywood</td>
      <td>0.692379</td>
    </tr>
    <tr>
      <th>47189</th>
      <td>Wilson</td>
      <td>0.812499</td>
    </tr>
    <tr>
      <th>47187</th>
      <td>Williamson</td>
      <td>0.812499</td>
    </tr>
  </tbody>
</table>
<p>95 rows × 2 columns</p>
</div>




```python
full_df.columns
```




    Index(['FIPS', 'year', 'primary_sex', 'primary_age', 'primary_dual', 'state',
           'primary_race', 'primary_eligibility', 'primary_denominator_well',
           'analysis_value_well', 'primary_denominator_hosp',
           'analysis_value_hosp', 'primary_denominator_emer',
           'analysis_value_emer', 'laus_code', 'Name', 'Employed',
           'Unemployeddisp', 'unemployment_rate', 'FIPS.1', 'county',
           'primary_care_physicians', 'population', 'urban', 'shadac_category',
           'pcp_per_100k', 'num_hospitals', 'num_hospitals_open', 'mean_beds',
           'num_beds', 'General_health', 'Excessive_drinking', 'High_school_grad',
           'College', 'Unemployeddemo', 'Inactivity', 'Smoker', 'Health_plan',
           'Diabetes', 'Owns_home', 'Rural', '_IMPRACE_White, Non-Hispanic',
           '_IMPRACE_Black, Non-Hispanic',
           '_IMPRACE_American Indian/Alaskan Native, Non-Hispanic',
           '_IMPRACE_Asian, Non-Hispanic', '_IMPRACE_Other race, Non-Hispanic',
           '_IMPRACE_Hispanic', 'INCOME2_$75,000 or more',
           'INCOME2_Less than $35,000 ($25,000 to less than $35,000)',
           'INCOME2_Less than $50,000 ($35,000 to less than $50,000)',
           'INCOME2_Less than $75,000 ($50,000 to less than $75,000)',
           'INCOME2_Less than $25,000 ($20,000 to less than $25,000)',
           'INCOME2_Less than $20,000 ($15,000 to less than $20,000)',
           'INCOME2_Less than $15,000 ($10,000 to less than $15,000)',
           'INCOME2_Less than $10,000', 'predict_prob'],
          dtype='object')




```python
sns.scatterplot(full_df['Health_plan'] , full_df.predict_prob)
```

    /Users/smgroves/Documents/anaconda3/envs/geo_dse/lib/python3.9/site-packages/seaborn/_decorators.py:36: FutureWarning: Pass the following variables as keyword args: x, y. From version 0.12, the only valid positional argument will be `data`, and passing other arguments without an explicit keyword will result in an error or misinterpretation.
      warnings.warn(





    <AxesSubplot:xlabel='Health_plan', ylabel='predict_prob'>




<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_283_2.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
    

    



```python
(county_demo).plot(kind = 'box', figsize = (10,10))
plt.xticks(rotation = 90)
```




    (array([ 1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17,
            18, 19, 20, 21, 22, 23, 24, 25, 26]),
     [Text(1, 0, 'General_health'),
      Text(2, 0, 'Excessive_drinking'),
      Text(3, 0, 'High_school_grad'),
      Text(4, 0, 'College'),
      Text(5, 0, 'Unemployed'),
      Text(6, 0, 'Inactivity'),
      Text(7, 0, 'Smoker'),
      Text(8, 0, 'Health_plan'),
      Text(9, 0, 'Diabetes'),
      Text(10, 0, 'Owns_home'),
      Text(11, 0, 'Rural'),
      Text(12, 0, '_IMPRACE_White, Non-Hispanic'),
      Text(13, 0, '_IMPRACE_Black, Non-Hispanic'),
      Text(14, 0, '_IMPRACE_American Indian/Alaskan Native, Non-Hispanic'),
      Text(15, 0, '_IMPRACE_Asian, Non-Hispanic'),
      Text(16, 0, '_IMPRACE_Other race, Non-Hispanic'),
      Text(17, 0, '_IMPRACE_Hispanic'),
      Text(18, 0, 'INCOME2_$75,000 or more'),
      Text(19, 0, 'INCOME2_Less than $35,000 ($25,000 to less than $35,000)'),
      Text(20, 0, 'INCOME2_Less than $50,000 ($35,000 to less than $50,000)'),
      Text(21, 0, 'INCOME2_Less than $75,000 ($50,000 to less than $75,000)'),
      Text(22, 0, 'INCOME2_Less than $25,000 ($20,000 to less than $25,000)'),
      Text(23, 0, 'INCOME2_Less than $20,000 ($15,000 to less than $20,000)'),
      Text(24, 0, 'INCOME2_Less than $15,000 ($10,000 to less than $15,000)'),
      Text(25, 0, 'INCOME2_Less than $10,000'),
      Text(26, 0, 'predict_prob')])




<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_284_1.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
    

    


## Which groups within these counties might need to be focused on to maximize the impact of TN Med Helper's efforts?


```python
counties = gpd.read_file('../data/county/tncounty.shp')
```


```python
counties
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>OBJECTID</th>
      <th>NAME</th>
      <th>KEY</th>
      <th>SHAPE_AREA</th>
      <th>SHAPE_LEN</th>
      <th>geometry</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>76</td>
      <td>Chester</td>
      <td>47023</td>
      <td>8.049024e+09</td>
      <td>520461.080124</td>
      <td>POLYGON ((1137985.762 344601.643, 1137965.070 ...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>77</td>
      <td>Wayne</td>
      <td>47181</td>
      <td>2.050741e+10</td>
      <td>666520.678598</td>
      <td>POLYGON ((1365052.057 391716.806, 1365746.554 ...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>78</td>
      <td>Tipton</td>
      <td>47167</td>
      <td>1.319125e+10</td>
      <td>865093.887634</td>
      <td>MULTIPOLYGON (((886814.330 400456.525, 886774....</td>
    </tr>
    <tr>
      <th>3</th>
      <td>79</td>
      <td>Hamilton</td>
      <td>47065</td>
      <td>1.604776e+10</td>
      <td>652926.001078</td>
      <td>POLYGON ((2274954.438 239788.911, 2274090.610 ...</td>
    </tr>
    <tr>
      <th>4</th>
      <td>80</td>
      <td>Stewart</td>
      <td>47161</td>
      <td>1.375003e+10</td>
      <td>490090.336180</td>
      <td>POLYGON ((1382472.783 743972.302, 1382445.171 ...</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>90</th>
      <td>91</td>
      <td>McNairy</td>
      <td>47109</td>
      <td>1.563586e+10</td>
      <td>566369.132062</td>
      <td>POLYGON ((1137985.762 344601.643, 1139350.519 ...</td>
    </tr>
    <tr>
      <th>91</th>
      <td>92</td>
      <td>Franklin</td>
      <td>47051</td>
      <td>1.605093e+10</td>
      <td>621176.096919</td>
      <td>POLYGON ((1873015.265 239618.144, 1872957.848 ...</td>
    </tr>
    <tr>
      <th>92</th>
      <td>93</td>
      <td>Bradley</td>
      <td>47011</td>
      <td>9.241234e+09</td>
      <td>457372.233476</td>
      <td>POLYGON ((2274954.438 239788.911, 2275552.803 ...</td>
    </tr>
    <tr>
      <th>93</th>
      <td>94</td>
      <td>Marion</td>
      <td>47115</td>
      <td>1.428734e+10</td>
      <td>529431.591556</td>
      <td>POLYGON ((2126056.390 236919.771, 2122873.509 ...</td>
    </tr>
    <tr>
      <th>94</th>
      <td>95</td>
      <td>Polk</td>
      <td>47139</td>
      <td>1.233228e+10</td>
      <td>479994.126988</td>
      <td>POLYGON ((2355580.184 332970.851, 2355673.384 ...</td>
    </tr>
  </tbody>
</table>
<p>95 rows × 6 columns</p>
</div>




```python
full_df.county
```




    FIPS
    47033      Crockett
    47061        Grundy
    47095          Lake
    47175     Van Buren
    47007       Bledsoe
                ...    
    47093          Knox
    47163      Sullivan
    47113       Madison
    47187    Williamson
    47179    Washington
    Name: county, Length: 95, dtype: object




```python
counties = pd.merge(left = counties,left_on = 'NAME',
                    right = full_df[['county', 'predict_prob']], right_on = 'county')
```


```python
counties['no_checkup'] = 1- counties.predict_prob
```


```python

```


```python
from matplotlib.lines import Line2D

fig, ax = plt.subplots(figsize=(16,4))

counties.plot(column = 'no_checkup', 
              edgecolor = 'black',
              legend = True,
              cmap = 'viridis',
              # scheme="NaturalBreaks",
              ax = ax)



# Adjust the marker appearance
# Extract the old markers and then modify by setting the edgecolor and edgewidth
# markers = []
# for line in leg.get_lines():
#     marker = Line2D([0],[0], marker = 'o', 
#                     markersize = line.get_markersize(), 
#                     color = line.get_markerfacecolor(),
#                     linestyle = 'None',
#                     markeredgecolor = 'black',
#                     markeredgewidth = 1)
#     markers.append(marker)

# Redraw the legend with the new labels and markers
plt.legend(markers, labels, fontsize = 12)
leg = ax.get_legend()
leg.set_bbox_to_anchor((1, 0.5))
    
plt.title('Predicted No Checkup in the Last Year for Average Resident', fontsize = 18)

ax.axis('off');
```


<div class="img">
 <img src="{{ site.baseurl }}/assets/img/bb/data-science-project/output_292_0.png"  style='height: 100%; width: 100%; object-fit: contain'>
</div> 
    

    

