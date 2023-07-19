---
layout: page
title: Metafictional Gameplay in VR
description: To break the fourth wall in VR games
img: assets/img/mvrg-01.jpg
importance: 1
category: research
---

updating...

---

## Intro

Metafictional game (or metagame) is a unique genre that offers a self-reflective gaming experience by breaking the fourth wall between the game and players. This encourages unconventional and thought-provoking engagement with the medium. Virtual Reality (VR) is perfectly suited for this kind of gameplay, given its ability to merge virtual and real worlds and enhance the narrative essence of metafictional game.

However, most metafictional games are still focused on non-VR platforms. To address this gap, the project aims to explore the integration of VR and metafictional game and reveal the player experience within VR metafictional games.

---

<h2>VR Game Prototype</h2>

**1. Game Story** 📜

The game story is inspired by John Campbell's *The Hero's Journey*.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/Heroesjourney.svg" title="Heroesjourney" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig.1. Illustration of the hero's journey (Credit: https://upload.wikimedia.org/wikipedia/commons/1/1b/Heroesjourney.svg)
</div>

This game includes three scenes. In a medieval style game world with a "sword and magic" theme, the Player role plays as the Protagonist, who is called to an adventure and guided by the Mentor. (Fig.2. Journey's Beginning)  
Leaving the village to vanquish the Evil, the Protagonist embarks on a solitary journey through the Dangerous Wild, where he/she hones the skill of using multiple weapons. (Fig.3. Dangerous Wild)  
At the castle of Evil, the Protagonist duels with the Boss and saves the world finally. (Fig.4. Last Duel) 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/vrmg/scene1.PNG" title="Journey's Beginning" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/vrmg/scene2.PNG" title="Dangerous Wild" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/vrmg/scene3.PNG" title="Last Duel" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The snapshots of three game scenes. On the left, Fig.2. Journey's Beginning. Middle, Fig.3. Dangerous Wild. Right, Fig.4. Last Duel.
</div>

⚔️In the last scene, Boss will "read" the mind of the Protagonist/Player, making itself undefeatable. By implementing the metafictional gameplay(details in next section), the Protagonist and the Player will be divided. The Protagonist directly talks to the Player and asks the Player to save the virtual world from the real world. 

> *The Protagonist or the Player, who is the Hero?*

During the course of a VR game, players undergo stages akin to Campbell's depiction of the hero's journey, transitioning from the real world into the virtual world and then back to reality. Meanwhile, the metafictional gameplay creates a personalized and realistic adventure for players, allowing them to become heroes within the fusion of the virtual and real worlds.

**2. Metafictional Gameplay** 🎮

Two metafictional gameplay are implemented in the game.

- Utilizing Eye Tracking to Simulate the Boss can Read Mind.

We use eye tracking module in the HMD of HTC VIVE Pro Eye to predict the battle strategy of the player. As shown in the Fig.5., the Player looks at different weapons before he/she choosing the weapon, but the Boss will predict his/her choice and mock him/her. 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/vrmg/eye.PNG" title="eye-tracking-to-read-mind" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig.5.  The Boss reading minds.
</div>

- Manipulating Virtual Camera to Involve the Player as a Diegetic Element.

The Boss has the ability to read the minds of characters within the virtual world, making it impervious to harm from anyone within that world. However, there is still a chance to save the game world. By separating the Player from the Protagonist, the Player assumes their own identity from the real world rather than that of the Protagonist. In this way, the Player (from the real world) and the Protagonist (from the virtual world) fight together and rescue the game world.

By manipulating the virtual camera in the 3D space, the game transitions from a first-person perspective to a third-person perspective, separating the Player and the Protagonist. The Protagonist can then directly communicate with the Player and seek their assistance. 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/vrmg/heroTalk.PNG" title="Hero-talks-to-player" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig.6. The Protagonist talks to the Player.
</div>

The Protagonist is aware of the Player's existence beyond the boundaries of the game world and conveys this awareness to the Player. By addressing the Player within the game's narrative, the Player becomes an integral part of the story rather than a mere spectator.

**3. Apparatus** ⚙️

HTC VIVE Pro Eye

Unity (2021.3.8f1-LTS)

Plugin & SDK: OpenXR, Tobii-XR, SteamVR

Asset List: https://neoluxqq.github.io/page/vrmg-asset

Demo: (*We expect to release the demo and code during the next weeks*)

---

## User Study & Player Experience

Qualitative (thematic analysis) and quantitative (questionnaires like SUS and GEQ) methods have been used to investigate the player experience. 

Preliminary results indicate that VR Metafictional Game has the potential to enhance players' sensory and imaginative immersion. By breaking the fourth wall within the VR environment, it prompts players to reflect upon the relationship between reality and the virtual world.

---

## To-do

[ ] Incorporate body gestures to use different weapons/abilities, to achieve the collaboration of the Player and the Protagonist. 

---

## References

Wikipedia, "The Hero's Journey", https://en.wikipedia.org/wiki/Hero's_journey

Campbell, J. (2008). The hero with a thousand faces (Vol. 17). New World Library.

Wikipedia, "Fourth Wall", https://en.wikipedia.org/wiki/Fourth_wall#Video_games

Conway, S. (2010). A circular wall? Reformulating the fourth wall for videogames. Journal of Gaming & Virtual Worlds, 2(2), 145-155.