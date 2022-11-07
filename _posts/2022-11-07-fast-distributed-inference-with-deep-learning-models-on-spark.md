---
layout: post
title: "Fast-distributed inference with Deep Learning models on Spark"
date: 2022-11-07 04:00:00
description: Learn how to efficiently distribute inference load on Spark
tags: ['Spark', 'Deep Learning']
---

Machine learning (ML) models are getting bigger and bigger and [this trend doesn't seem to be over](https://arxiv.org/abs/2001.08361). As a result of that, has become mainstream in the industry the use of big models, usually referred to as Deep Learning (DL) models. Although a few companies do have enough data and processing power to train DL from scratch, a common practice is to leverage these big models to produce embeddings, which are a kind of vectorial representation of "unstructured" data as text, images, audio, and videos. The embeddings may be the final product/objective of these models as the [Universal Sentence Encoder (USE)](https://arxiv.org/abs/1803.11175) or a by-product of getting the output of the internal layers of a model (eg. [BERT](https://arxiv.org/abs/1810.04805) internal layers). See Figure 1.

{% include figure.html path="assets/img/posts/2022-11-07-fast-distributed-inference-with-deep-learning-models-on-spark/extracting-embeddings.png" class="img-fluid rounded z-depth-1" zoomable=true 
caption = "Figure 1 - Embeddings generation with USE (the default output of the model) and with BERT (the embeddings are extracted from an internal layer or a combination of them)."
%}

Note: See [this](http://jalammar.github.io/illustrated-bert/#:~:text=BERT%20for%20feature%20extraction) to know more about using BERT to generate embeddings.


The use of these "embedders" is a good practice as it is a way to leverage pre-trained models to produce tabular data to later be fed in traditional ML techniques (eg. logistic regressions, multilayer perceptrons etc). Companies can then leverage their unstructured data to be used for multiple teams and projects, some companies also started using [vector databases](https://zilliz.com/learn/what-is-vector-database) (if you prefer the video format, [this is a good high-level intro](https://www.youtube.com/watch?v=g2bNHLeKlAg&ab_channel=SouthernDataScienceConference)) as a way to store these embeddings and have easy use of them in search scenarios.

In this context, some companies do the batch generation of these embeddings on big data, on a Spark cluster, as in the company I work on.

In a nutshell, [Spark](https://spark.apache.org/) is a distributed computing engine that is run on clusters. The architecture consists of a Driver node that sends jobs to, possibly, multiple Worker nodes.

<div style="text-align: center">
    {% include figure.html path="assets/img/posts/2022-11-07-fast-distributed-inference-with-deep-learning-models-on-spark/spark-cluster-overview.png" class="img-fluid rounded z-depth-1" zoomable=true 
    caption = "<small><i>Source: https://spark.apache.org/docs/latest/cluster-overview.html</i></small><br>
    Figure 1 - Spark Cluster overview."
    %}
</div>


As DL models usually involve many parallel operations (as matrix multiplications), a GPU can be multiple times faster than a multicore CPU to run inference/embedding generation. In this scenario, our team used a cluster comprised of multiple Worker nodes, each one with a single GPU (see Figure 2).

<div style="text-align: center">
    {% include figure.html path="assets/img/posts/2022-11-07-fast-distributed-inference-with-deep-learning-models-on-spark/cluster-configuration.png" class="img-fluid rounded z-depth-1" zoomable=true 
    width="50%"
    caption = "Figure 2 - Overview of cluster used."
    %}
</div>

With the right abstractions, an efficient [PySpark](https://spark.apache.org/docs/latest/api/python/) code would be something along these lines:

{% highlight python linenos %}

def generate_embeddings(embeder_model, dataframe: pyspark.sql.DataFrame) -> pyspark.sql.DataFrame:
    broacasted_embeddings_model = spark.sparkContext.broadcast(embeder_model)

    @pandas_udf(returnType=ArrayType(FloatType()))
    def batch_embed(dataset: pandas.Series) -> pandas.Series:
        model = broacasted_embeddings_model.value
        model.toGPU()

        embeddings = model.embed(dataset)
        
        embeddings_cpu = embeddings.numpy() if embeddings else []

        return pandas.Series(embeddings_cpu)
    
    return dataframe.withColumn(EMBEDDINGS_COLUMN_NAME, batch_embed(dataframe[DATA_COLUMN_NAME]))

{% endhighlight %}

Now for you to understand this pseudo-code we have some important notes:

* **Broadcast of the model**  
As each worker node needs the model, it has to be sent beforehand. Line 2 broadcasts the model from the driver node and in line 6 a worker node gets the python object back.

* **Why pandas UDF instead of Spark UDF?**  
Traditional Spark UDFs run row by row of the data frame while pandas UDFs run on batches of the data (multiple rows at once). Trying to run a DL model for each row separately would add unnecessary GPU to CPU communication and wouldn't leverage GPU's parallel capabilities.

Other important params of your code and Spark cluster might be:
* **Apache Arrow batch size**: you might need to reduce the default 10,000 value of `spark.sql.execution.arrow.maxRecordsPerBatch` if your data is too big (take a look [here](https://spark.apache.org/docs/3.0.1/sql-pyspark-pandas-with-arrow.html#setting-arrow-batch-size));
* **Data batch size for the GPU**: although choosing a power of 2 (eg. 32, 64, 128...) doesn't seem to have a real impact, it may help you reduce the search space of this parameter. The clear rule is to try to maximize your GPU memory use without running into Out Of Memory (OOM) errors;
* **GPU choice**: although the number of cores and memory available widely varies between GPUs, your choice may be restricted by what is available from your vendor and the size of the model used.

A final important note is that even if nodes with GPU are more expensive than CPU only, the final cost for running batch prediction ($$ $ = hourlyCost * hoursNeeded $$) is usually in favor of GPU clusters for DL models.

That's it! Feel free to reach out if you have doubts or some feedback to give.
