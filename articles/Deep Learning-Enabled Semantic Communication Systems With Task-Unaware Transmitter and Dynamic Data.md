---
title: 12.3 (2)
abstract: 具有任务无意识发射器和动态数据的深度学习语义通信系统
category: 论文阅读
---

# Deep Learning-Enabled Semantic Communication Systems With Task-Unaware Transmitter and Dynamic Data

> [Deep Learning-Enabled Semantic Communication Systems With Task-Unaware Transmitter and Dynamic Data | IEEE Journals & Magazine | IEEE Xplore](https://ieeexplore.ieee.org/abstract/document/9953099)
>
> JSAC，2022

## 介绍

语义通信使得任务准确度上升，并且使用神经网络已经成为主流。

上述方法通常需要接收器和发送器共享同一个知识库，并且发送器知道接收器的具体任务是什么。问题在于，虽然接收器可以通过多次通信告知发送器具体任务的内容，但这样通信压力太大，并且如果存在数据隐私协议，，那么发送器会不知道具体任务。

另一方面，要传输的数据分布可能在变化，训练时用的数据分布和传输时的数据分布不同，导致效果下降，重训练模型的成本又太高。

本文聚焦于**接收器**领导的动态语音通信系统，发送器不知道具体的任务是什么。模型训练分为两个阶段，准备阶段和工作阶段。其中工作阶段实际遇到的数据和之前背景知识中的数据分布不同。

挑战：

1. 接送器必须在不发送自身语义信息的情况下完成对发送器的启发，指导发送器对信息进行编码
2. 语义通信策略应该是适应性的，以适应经验数据和可观察数据之间可能存在的差异

语义编码网络+数据适应网络，在两个阶段中分别训练。

第一阶段语义编码网络在发送器和接收器上训练，对可观察信息进行编码，并根据只有接收器知道的实际信息进行解码；第二阶段数据适应网络只在传输器训练，把新观察到的数据类型转换为第一阶段训练的语义编码网络无需重新训练即可重用的数据形式。

**贡献：**

1. 提出一个发送器端任务不可知的算法
2. 提出专门针对图像传输的新型损失函数
3. 提出数据适应网络，解决不同数据环境的问题

## 模型系统

![image-20241129164355280](C:\Users\ocl\AppData\Roaming\Typora\typora-user-images\image-20241129164355280.png)

Observation Space中的数据为会在接收器端使用到的真实数据，对发送器不可见。Library data来自背景知识，其中数据记为K，真实的任务记为Z，Z对发送器不可见。发送器需要在不可见真实数据和真实任务的情况下将真实数据进行数据适应，同时根据K语义编码，发送到接受器端可以正确解码，应用于相应的真实任务

**数据均为RGB图像，通过8位符号三维向量表示**

两个阶段：准备阶段、工作阶段。准备阶段中发送器和接收器通过K、Z训练编码解码器，工作阶段中发送器根据S和K训练数据适应网络。

**数据传输过程：**接收器初始化一个数据请求，发送器从S中选一些数据，如果S和K不是同分布，那么将S进入数据适应，将它转化为相同分布$\tilde S$。再将$\tilde S$通过编码器，得到频道输入X（X同样是8位符号三维向量表示）。

> 压缩率$CR=log|X|/log|K|$

X会通过AWGN通道传输，输出Y=X+N，N是未知噪声。接收器收到Y后会解码出一个$\hat S$作为真实使用的数据，并通过Pragmatic Function $\phi(·)$重构出一个对应的任务$\hat Z$执行.

本文中数据适应网络、编码解码网络为神经网络需要训练，Pragmatic Function为预训练好的。

## 语义编码网络

### 语义编码网络训练

![image-20241129190624484](C:\Users\ocl\AppData\Roaming\Typora\typora-user-images\image-20241129190624484.png)

![image-20241129190634084](C:\Users\ocl\AppData\Roaming\Typora\typora-user-images\image-20241129190634084.png)

编码器先编码K为X，发送出去，接收器接收到Y，进行解码得到$\hat Z$，根据$(K,\hat K, Z, \hat Z)$计算损失，其中接收器的梯度可以直接计算，发送器的梯度需要计算$L$对$Y$的导后由接收器发送给发送器，再在发送器端计算$Y$的导后相乘得到

### 损失函数设计

损失函数一般包含语义信息损失和可观察信息损失，本文也一样。

**语义失真：**![image-20241129191939995](C:\Users\ocl\AppData\Roaming\Typora\typora-user-images\image-20241129191939995.png)

任务损失和数据损失。

> 语义信息是由特定的任务决定的，而不是数据的内在特征，因此在损失中需要计算任务损失

**经验语义失真：**给定训练批次T![image-20241129192317184](C:\Users\ocl\AppData\Roaming\Typora\typora-user-images\image-20241129192317184.png)

**损失函数：**![image-20241129192703954](C:\Users\ocl\AppData\Roaming\Typora\typora-user-images\image-20241129192703954.png)

## 数据适应网络

### 适应器网络架构

![image-20241129215345581](C:\Users\ocl\AppData\Roaming\Typora\typora-user-images\image-20241129215345581.png)

采用cycle GAN，一个生成器，将可观察数据$S$转化为背景知识的数据$K$，一个判别器，区分$S$和$S$生成的$K$生成的$S$。

![image-20241129215619994](C:\Users\ocl\AppData\Roaming\Typora\typora-user-images\image-20241129215619994.png)
