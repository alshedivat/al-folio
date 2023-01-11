---
layout: post
title:  Simulating the Monty Hall problem
date:   2022-09-20
description: Convincing myself of the Monty Hall problem's result, and understanding where my intuition went wrong.
---
<em>Relevant code is in [this repository](https://github.com/alison-campion/monty-hall-sim).</em>

When the Monty Hall problem came up in my statsitics class this semester, my instinct was to roll my eyes at the gimmicky statistics trick I've heard too many times to count. <em>Yeah, yeah, it's actually 2/3 chance of winning if you switch...something about the probabilities...hand wave, hand wave...</em> But I realized that this was probably my last chance to actually get it- gimmick or not- before some day a student asks me about it and isn't satisfied with my hand waving. So I decided to give it another shot.

If you're not familiar with the Monty Hall problem, it comes from the game show <em>Let's Make a Deal</em>, hosted by Monty Hall. In the game, a contesetant is faced with three doors. One door has a prize (a car) behind it while the other two don't (traditionally they have goats behind them). The contestant chooses one of the doors in hopes of picking the car. Monty Hall then picks one of the two doors the contestant __hasn't__ chosen and opesn it to reveal a goat. The contestant then has a choice to either __stay__ with the original door they selected, or __switch__ to the other unopened door. The question is: which is the better strategy- switch or stay? 

At this point it feels intuitive to say the two strategies are equal. There are two doors in front of you, one with a car and the other with a goat behind it. Shouldn't that mean there is a 50-50 chance to win the car by picking either switch or stay? It turns out no, though it wasn't always clear to me why.

For me, the key was in thinking about the problem not as the probability of the car being behind one of the two remaining doors, but rather the probability that the strategy you pick is the winning one. The choice is not between two doors randomly placed in front of you, but rather between switching or staying with your original choice after being provided crucial insider information.

When you first chose your door, it was random. There is a 1/3 chance the car is behind it, meaning there is a 2/3 chance the car is behind one of the other two doors. If you stay, you still have a 1/3 chance of winning the car. But if you switch to one of the other doors, you have a 2/3 chance- and now that the losing door has been revealed, you can simply switch to the remaining door. Thus, switching will always give you a 2/3 chance of picking the car while staying gives you a 1/3 chance.

When Monty Hall reveals the door that does not have the car, he introduces non-random information that you use to update your prior about which door the car is behind. Crucially, Monty Hall <em>must</em> reveal a goat. Because there is a 2/3 chance that out of the two doors he has to choose from, one has a goat and the other has a car behind it, then 2/3 of the time when he reveals the goat, the remaining door has the car behind it.

This problem only works becuase you carry forward information about which door you first picked when you see which door Monty Hall opens. Say, instead, the two remaining doors were randomized then you would not be picking switch or stay, you would no longer know which door you first chose so you would simply be picking at random. In this case you would have no information to update your prior and your choice would in fact be 50-50.

To fully convince myself, I simulated the Monty Hall problem using the two different methods. First, the classic switch vs. stay choice. Second, random selection. You can see the code and walk through the simulation in a notebook in [this repository](https://github.com/alison-campion/monty-hall-sim). 

In creating the simulation of the random choice to arrive at the result my intuition was pointing towards, I could see how the classic problem differed and where my Bayesian intuition had failed. The classic set-up gives the classic result of 2/3 chance of winning if you switch while random selection gives you a 50-50 chance of winning by picking either door. And now I have to admit, that the Monty Hall problem is pretty cool after all.
