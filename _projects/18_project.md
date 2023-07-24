---
layout: page
title: Evaluating Large Language Models on Code Generation
description: This repository contains the code and results for the performances in Python code generation of three different code generation models – CodeT5, CodeGen, and GPT-3.5
img: /assets/img/ChatGPT_logo.png
importance: 1
category: Data Science
---

*You can find the full code in [here](https://github.com/DanielDaCosta/CodeGPT)*

# Evaluating Large Language Models on Code Generation
In this study, the performances in Python code generation of three different code generation models – **CodeT5**, **CodeGen**, and **GPT-3.5** – were compared using the [Mostly Basic Python Problems (MBPP) dataset](https://huggingface.co/datasets/mbpp). The *pass@k* metric was used as the primary method of evaluation, and CodeT5 and CodeGen were evaluated in a few-shot setting, while GPT-3.5 was evaluated in zero-shot and few-shot settings. The findings suggest that GPT-3.5 performs best in the few-shot setting, followed by GPT-3.5 in the zero-shot setting, CodeT5 in the few-shot setting, and CodeGen in the few-shot setting. These results indicate that GPT-3.5 is a promising model for code generation tasks, particularly in situations where the training data is limited, and highlight the importance of providing contextual information through prompting to overcome certain deficiencies in the zero-shot setting.

## Problem Description 
Large language models can capture the syntax, semantics, and structure of programming languages and generate code snippets that are close to human-written code. However, the effectiveness of large language models for code generation may vary depending on the specific task and the available training data. Some code generation tasks require a significant amount of training data and fine-tuning to achieve optimal performance, while others may require the use of specialized models or techniques. Moreover, large language models are complex and require significant computational resources to train and optimize. The size and complexity of these models can make them challenging to use in real-world scenarios, where computational resources may be limited. This study compares the performances of several code generation models to reveal their strengths and weaknesses and discover ways in which they can be improved.

## Results

The dataset used to evaluate the code generation performances of the three models was the MBPP dataset. The dataset comprises approximately 1,000 crowd-sourced Python programming problems, where each problem contains a docstring of natural language text detailing the functionality of the code snippet, the code solution, and three assert statements (test cases). All three models were evaluated on the first 100 samples from the MBPP dataset.

The *pass@k* metric was used as the primary evaluation method, as it is commonly used to evaluate the performance of code generation models (Chen et al., 2021). It robustly estimates the probability that one of the k generations passes the tests where n is the generated candidate.
For example, if *pass@5* is 80%, it means that for 80% of the queries, the system returned at least one code snippet that passed all test statements among the top 5 results. The performance of CodeT5 and CodeGen was assessed using k values of 1, 2, and 5, while GPT-3.5 was only evaluated with k=1 due to the API's limitations in generating multiple outputs.

![table_results](Images/table_results.png)


BLEU score, which is also a common metric used to evaluate the quality of machine translation output, was not an appropriate metric for evaluating the performance of code generation models. BLEU score measures the overlap between a machine-generated text and one or more reference texts, based on n-gram matching. However, in the case of code generation, the generated code may differ significantly from the reference code even if it performs the same function, as there can be multiple ways of implementing the same function in code and the generated code may have a different structure or syntax from the reference code. 

The outputs of the models were categorized into six different qualitative outcomes: RuntimeError, CompileError, FailedTest, NoResult, PassedOneOrTwoTests, and PassedAllTests  (Le et al., 2022). In the RuntimeError outcome, an error occurred in the execution of the generated code, while in the CompileError outcome, an error occurred in program compilation. The NoResult outcome indicates that the model did not output any code at all, which may be due to vagueness in the task description in which the model required more information to be able to provide any meaningful results. The NoResult outcome was kept separate from the FailedTest outcome, in which the model was able to make sense of the task description and output the desired function, but failed the test cases because the outputs from the functions were not the in format that the tests required, or because the model assumed the input(s) to the functions to be in a format different to what the functions in the test cases expected.

### GPT-3.5

![gpt-errors](Images/GPT-Errors.jpeg)

We evaluated the gpt-3.5-turbo model on the dataset in both the zero-shot and few-shot settings to understand whether contextual information through prompting helps the model perform better in this scenario. 

The above figure shows that the model performs really well even in the zero-shot setting, passing all test cases for 40\% of the sample. However, we realized that there were some limitations in this setting. These included cases where the model required more information to output any code and cases where the model displayed a logically correct function, but still failed the tests due to differences in output formats. To deal with such cases and more, we evaluated the model in the few-shot setting, giving it the test cases to learn from.

In this setting, not only did we observe a considerable increase in performance, with the model passing at least one test for 83\% of the sample, but we also benefited from a reduction in the post-processing work (alluded to in the “Methods” section) as the model was able to understand the function name, input(s) and output(s) formats from the examples themselves. With the additional prompts, the model was able to understand the context and requirements surrounding the task descriptions as well, which invariably helped to considerably reduce the “No Result” category from 17 to 1. There were, however, certain instances where the model could not display good results even in this setting. This included instances where the task description required the model to understand certain mathematical concepts or where the arrangement of the inputs and outputs of the model did not align perfectly with the test cases (additional error cases are provided in the appendix). We believe that for many of these cases, we can improve the model performance by providing it with even richer details in the prompts and through reinforcement learning with human feedback - ideas to make use of in future work.

### CodeT5
The results of the CodeT5 model evaluated in the few-shot setting are shown below.

![gpt-errors](Images/CodeGen-CodeT5.png)

The results indicate that the runtime and compilation errors for code generated by the CodeT5 model in the few-shot setting are relatively high compared to that generated by the GPT-3.5 model in zero-shot and few-shot settings. This implies that CodeT5 is a weaker code generation model than GPT-3.5, as the code it generates may have more syntax errors that the model is unable to notice and address. Additionally, CodeT5 has a higher number of FailedTest outcomes than GPT-3.5, which indicates that although CodeT5 was also given three test cases along with the task description as input, it was unable to leverage the format of the test cases to reduce the formatting issues it produced. 


### CodeGen
The results of the CodeGen model with 2B parameters evaluated in the few-shot setting are shown in figure above.

Most noticeably, the CodeGen model was unable to generate code for significantly more samples than GPT-3.5 and CodeT5. This is likely due to the fact that CodeGen was trained on specific datasets with examples and labels, which were then used during inference to generate code. The MBPP dataset may be dissimilar to the datasets that it was trained on, thereby the model is likely unable to make sense of the task description objectives to produce any code. 


## Conclusions and Future Work

From this study, GPT-3.5 in the few-shot setting was found to have the best performance for Python code generation, followed by GPT-3.5 in the zero-shot setting, CodeT5 in the few-shot setting, and CodeGen in the few-shot setting. Based on these findings, it can be concluded that providing more context and information to large language models such as GPT-3.5 is extremely useful. Additional context may be provided by using a more rich task description and adding more instructions to the model input. Furthermore, post-processing can be performed by combining the inputs and outputs of two models, such as using the output from CodeT5 as input to GPT-3.5. Finally, bigger and more nuanced models such as GPT-4 can be explored to reveal whether the model can produce even better performance in Python code generation.

## Resource Requirements
The resource requirements for different code generation models varied. The pre-trained GPT-3.5 model was provided by OpenAI and accessed through its API. It was run locally and did not require any GPU resources. To run the CodeGen and CodeT5 models, GPU resources were required. A VM instance with GPU was created on Google Cloud Platform, specifically using an NVIDIA V100. However, even with NVIDIA V100, the multiple outputs inference for the CodeGen 6B model could not be run. As a result, the CodeGen 2B model was used, which is less computationally intensive but still capable of generating code snippets.

# References

- Jacob Austin, Augustus Odena, Maxwell I. Nye,
Maarten Bosma, Henryk Michalewski, David Do-
han, Ellen Jiang, Carrie J. Cai, Michael Terry,
Quoc V. Le, and Charles Sutton. 2021. Program
synthesis with large language models. CoRR,
abs/2108.07732

- Tom B. Brown, Benjamin Mann, Nick Ryder,
Melanie Subbiah, Jared Kaplan, Prafulla Dhari-
wal, Arvind Neelakantan, Pranav Shyam, Girish
Sastry, Amanda Askell, Sandhini Agarwal, Ariel
Herbert-Voss, Gretchen Krueger, Tom Henighan,
Rewon Child, Aditya Ramesh, Daniel M. Ziegler,
Jeffrey Wu, Clemens Winter, Christopher Hesse,
Mark Chen, Eric Sigler, Mateusz Litwin, Scott
Gray, Benjamin Chess, Jack Clark, Christopher
Berner, Sam McCandlish, Alec Radford, Ilya
Sutskever, and Dario Amodei. 2020. Language
models are few-shot learners.

- Mark Chen, Jerry Tworek, Heewoo Jun, Qiming
Yuan, Henrique Ponde de Oliveira Pinto, Jared
Kaplan, Harri Edwards, Yuri Burda, Nicholas
Joseph, Greg Brockman, Alex Ray, Raul Puri,
Gretchen Krueger, Michael Petrov, Heidy Khlaaf,
Girish Sastry, Pamela Mishkin, Brooke Chan,
Scott Gray, Nick Ryder, Mikhail Pavlov, Alethea
Power, Lukasz Kaiser, Mohammad Bavarian,
Clemens Winter, Philippe Tillet, Felipe Petroski
Such, Dave Cummings, Matthias Plappert, Fo-
tios Chantzis, Elizabeth Barnes, Ariel Herbert-
Voss, William Hebgen Guss, Alex Nichol, Alex
Paino, Nikolas Tezak, Jie Tang, Igor Babuschkin,
Suchir Balaji, Shantanu Jain, William Saunders,
Christopher Hesse, Andrew N. Carr, Jan Leike,
Josh Achiam, Vedant Misra, Evan Morikawa,
Alec Radford, Matthew Knight, Miles Brundage,
Mira Murati, Katie Mayer, Peter Welinder, Bob
McGrew, Dario Amodei, Sam McCandlish, Ilya
Sutskever, and Wojciech Zaremba. 2021. Evalu-
ating large language models trained on code.

- Hamel Husain, Ho-Hsiang Wu, Tiferet Gazit, Mil-
tiadis Allamanis, and Marc Brockschmidt. 2019.
Codesearchnet challenge: Evaluating the state
of semantic code search. CoRR, abs/1909.09436.

- Hung Le, Yue Wang, Akhilesh Deepak Gotmare, Sil-
vio Savarese, and Steven C. H. Hoi. 2022. Coderl:
Mastering code generation through pretrained
models and deep reinforcement learning.

- Erik Nijkamp, Bo Pang, Hiroaki Hayashi, Lifu Tu,
Huan Wang, Yingbo Zhou, Silvio Savarese, and
Caiming Xiong. 2023. Codegen: An open large
language model for code with multi-turn program
synthesis.

- Yue Wang, Weishi Wang, Shafiq R. Joty, and
Steven C. H. Hoi. 2021. Codet5: Identifier-aware
unified pre-trained encoder-decoder models for
code understanding and generation. CoRR,
abs/2109.00859.
