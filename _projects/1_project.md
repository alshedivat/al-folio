---
layout: page
title: Computer Vision
description: Anything involving images.
img: assets/img/gif/homero.gif
importance: 1
category: fun
related_publications: true
---

I created art and can't even draw a straight line! The following projects were all built in `python` primarily using the `pytorch` and `tensorflow` libraries:

- [Simpson face generation](#simpson-face-generation)
- [Recoloring CIFAR10](#recoloring-cifar10)
- [Supervised approaches to CIFAR10](#supervised-approaches-to-cifar10)


### Simpson face generation

Generative Adversarial Networks for the task of generating simpson faces. The code can be found [here](https://github.com/m4mbo/simpsons-gan).

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/gif/simpsons.gif" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Evolution of GAN generated images over n timesteps starting from noise.
</div>


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/gif/homero.gif" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/gif/marge.gif" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>


#### Generator

{% raw %}

```python
class Generator(nn.Module):
    """Generator model"""
    def __init__(self, Z):
        super(Generator, self).__init__()
        self.Z = Z

        self.gen_model = nn.Sequential(

            nn.Linear(self.Z, 1024*8*8),
            nn.BatchNorm1d(1024*8*8),
            nn.LeakyReLU(0.2),

            Reshape((-1, 1024, 8, 8)),

            nn.ConvTranspose2d(1024, 512, 5, 2, 1, 0),
            nn.BatchNorm2d(512),
            nn.LeakyReLU(0.2),

            nn.ConvTranspose2d(512, 256, 5, 2, 2, 0),
            nn.BatchNorm2d(256),
            nn.LeakyReLU(0.2),

            nn.ConvTranspose2d(256, 128, 5, 2, 2, 0),
            nn.BatchNorm2d(128),
            nn.LeakyReLU(0.2),

            nn.ConvTranspose2d(128, 64, 5, 2, 2, 1),
            nn.BatchNorm2d(64),
            nn.LeakyReLU(0.2),

            nn.Conv2d(64, 3, 5, 1, 1),

        )

    def forward(self, noise):

        x = self.gen_model(noise)

        x = F.tanh(x)

        return x
```

{% endraw %}

#### Discriminator

{% raw %}


```python
class Discriminator(nn.Module):
    """Discriminator model"""
    def __init__(self):
        super(Discriminator, self).__init__()
        self.disc_model = nn.Sequential(
            nn.Conv2d(in_channels=3, out_channels=64, kernel_size=5, stride=2, padding=1),
            nn.BatchNorm2d(64),
            nn.LeakyReLU(0.2),

            nn.Conv2d(in_channels=64, out_channels=128, kernel_size=5, stride=2, padding=1),
            nn.BatchNorm2d(128),
            nn.LeakyReLU(0.2),

            nn.Conv2d(in_channels=128, out_channels=256, kernel_size=5, stride=2, padding=1),
            nn.BatchNorm2d(256),
            nn.LeakyReLU(0.2),

            nn.Conv2d(in_channels=256, out_channels=512, kernel_size=5, stride=1, padding=2),
            nn.BatchNorm2d(512),
            nn.LeakyReLU(0.2),

            nn.Conv2d(in_channels=512, out_channels=1024, kernel_size=5, stride=2, padding=2),
            nn.BatchNorm2d(1024),
            nn.LeakyReLU(0.2),


        )
        self.linearization = nn.Sequential(

            nn.Flatten(1,-1),
            nn.Linear(1024*8*8, 1)

        )

        self.sigmoid = nn.Sigmoid()

    def forward(self, x):

        x = self.disc_model(x)

        x = self.linearization(x)

        x = self.sigmoid(x)

        return x
```

{% endraw %}


#### Training


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/simpson-graph.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Generator vs discriminator loss on the training set.
</div>


### Recoloring CIFAR10


### Supervised approaches to CIFAR10 