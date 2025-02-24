---
title: 12.3 (3)
abstract: Segmenter：用于语义分割的 Transformer
category: 论文阅读
---

# Segmenter: Transformer for Semantic Segmentation

> Segmenter：用于语义分割的 Transformer
>
> [Strudel_Segmenter_Transformer_for_Semantic_Segmentation_ICCV_2021_paper.pdf](file:///D:/papers/AI+SC/Strudel_Segmenter_Transformer_for_Semantic_Segmentation_ICCV_2021_paper.pdf)

## 介绍

图像的语义分割目标是把每一个像素分一个标签给相应的底层物品，并为目标任务提供高等级的图像表示。由于上下文多样性、丰富的类内变化、图像遮挡、分辨率等因素，语义分割仍然具有挑战性。

近期的方法主要是卷积编码/解码架构，编码层提取图像特征，解码层上采样为具有每像素类分数的分割图。虽然效果不错，但是卷积的局部性质限制了对图像全局信息的把握。同时，分割图像时全局信息很重要。

本文基于Transformer架构，在模型的每一个阶段都会利用上下文信息。由于全局交互计算开销太大，根据最新进展Vision Transformer，本文将图像分割为块，并把线性块嵌入作为Transformer编码层的输入，然后Transformer解码层把编码后的上下文化的tokens序列上采样为每像素类分数。对于解码，本文考虑一个块嵌入到类得分的线性映射，或者一个基于Transformer解码层方案，其中可学习的类嵌入与块tokens一起处理以生成类掩码

**贡献：**

1. 提出基于ViT的语义分割方法，并展示一系列模型参数
2. 提出基于Transmformer的解码层，生成类掩码

![image-20241201211234808](C:\Users\ocl\AppData\Roaming\Typora\typora-user-images\image-20241201211234808.png)
