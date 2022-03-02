---
layout: page
title: Customer Segmentation
description: The 'average customer' is a concept of the past
img: assets/img/lego.jpg
importance: 1
category: data science
---







Businesses need to be able to segment their customer base into clusters and tailor experiences for each customer segment. A company may segment their customers according to demographics like age, gender, marital status, location, or buying habits.

By segmenting customers, a company can—

1. Create and communicate targeted marketing messages that will resonate more with a particular segment
2. Find the best communication channel for a segment
3. Establish stronger customer relationships
4. Identify which segments are particularly profitable.


Hitting the average does not mean hitting the majority. Modern marketplaces require companies to provide tailored experiences to a diverse set of customers.
<br>
<br>
<h2>Project Overview</h2>
<br>
Today you will see customer segmentation applied on an E-commerce database that lists purchases made by ~40000 customers over a period of one year. Based on the analysis, we will develop a model that will be made by a new customer for the upcoming year.
<br>
High-Level Overview—
1. Data Preparation
2. Data Exploration
3. Data Analysis on Product Categories
4. Data Analysis on Customer Categories
5. Classifying Customers
6. Testing Predictions

<br>
<h2>1. Data Preparation</h2>
<br>
We will load and clean the data.


{% highlight c++ linenos %}
# READ THE DATA
df_initial = pd.read_csv('data.csv',encoding="ISO-8859-1",
                         dtype={'CustomerID': str,'InvoiceID': str})
print('Dataframe dimensions:', df_initial.shape)
#______
df_initial['InvoiceDate'] = pd.to_datetime(df_initial['InvoiceDate'])
#____________________________________________________________
# gives some infos on columns types and number of null values
tab_info=pd.DataFrame(df_initial.dtypes).T.rename(index={0:'column type'})
tab_info=tab_info.append(pd.DataFrame(df_initial.isnull().sum()).T.rename(index={0:'null values (nb)'}))
tab_info=tab_info.append(pd.DataFrame(df_initial.isnull().sum()/df_initial.shape[0]*100).T.
                         rename(index={0:'null values (%)'}))
display(tab_info)
#__________________
# show first lines
display(df_initial[:5])
{% endhighlight %}