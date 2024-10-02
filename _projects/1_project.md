---
layout: page
title: LLM based Chatbot 🤖💬
description: PDF searching using Large Language Models (LLM) and semantic search. 
img: assets/img/tarikhbot.png
importance: 1
category: work
related_publications: false
---

#### **Overview 📄**
The goal of this project was to develop a chatbot that can serve as a valuable resource for individuals interested in learning about Moroccan history. The chatbot utilizes a large language model (LLM) to process and understand user queries, and then employ semantic search techniques to retrieve the most relevant information from a curated dataset of historical documents, texts, and articles. This approach enables the chatbot to provide informative and engaging responses, even for complex or open-ended questions.

#### **Key Stages 🔑**
The figure below showcases the development workflow key stages:

**Data Collection:** Data is gathered from multiple sources, including web scraping Wikipedia and manually collecting PDFs about Moroccan history.

**Data Cleaning:** Collected data is cleaned and preprocessed to ensure its quality by removing irrelevant, incomplete and unreliable data.

**Dataset Creation:** A question-answer (QA) dataset is created by splitting the collected data into text chunks and corresponding questions ([the dataset link](https://huggingface.co/datasets/KBayoud/MoroccanHistory-QA-Dataset)).

**Model Fine-Tuning:** We used Falcon-7B ([link](https://huggingface.co/tiiuae/falcon-7b)) and further performed instruction fine-tuning using **LoRA** technique to train the model on the task of question answering. However, instruction fine-tuning alone does not enable the model to know everything about Moroccan history, so we incorporated an external database from which factual information could be retrieved.

**Semantic Search & Retrieval:** When a user asks a question, a sentence transformer model converts the question into an embedding. We used cosine similarity to search through the external database for chunks with embeddings similar to the user's question.

**Response Generation:** The chatbot generates a human-like response based on the most relevant chunks, leveraging its newly acquired question-answering capabilities.


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/chatbot_data_collection.png" title="Project workflow" class="img-fluid rounded z-depth-1" style="max-height: 200px; height: auto;"%}
    </div>
</div>
<div class="caption">
    Figure 1 : Overall Workflow
</div>


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Screen Shot 2023-06-24 at 23.06.09.png" title="Conversation example 1" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Figure 2: Conversation example 1
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Screen Shot 2023-06-24 at 23.06.44.png" title="Conversation example 2" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Figure 3: Conversation example 2
</div>

### **Technical Stack 🛠️**

**Pytorch & Transformers :** Coding Framework.

**Weights & Biases (wandb) :** Monitoring model fine-tuning.

**Pinecone :** Vector database.

**Langcahin :** Orchestration.

**HuggingFace :** LLM provider.

**HTML and Tailwind CSS:** Interface.

**JavaScript (JS):**  Dynamic Functionality.

**Flask :** Backend Intergration.

