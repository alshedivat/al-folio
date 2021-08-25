---
layout: post
title:  Teaching with Microsoft Teams
date:   2021-08-25 15:40:16
description: A workflow that automates lecturing, handwriting, recording, and uploading.
comments: true
---
This article demonstrates a streamlined workflow for lecturing, handwriting, recording, and uploading.
You can save time setting up online lectures, uploading videos, and sending out links.

Microsoft Teams is chosen because of its tight integration with OneDrive.

This article assumes the reader is unfamiliar with Teams or OneDrive and thus come with some details.

## TL;DR

I use a Teams meeting room for teaching using a Surface Pro.
Signing into the same room on the classroom PC allows projecting slides and handwriting.
Teams automatically uploads the video recordings to OneDrive, where you can
create a dedicated, shared folder and post it on Canvas.

## Setting up Microsoft Teams meetings

First, let's set up a recurring Teams meeting and *invite all students*.

Open Microsoft Teams and log in with your instution account.
On the left panel, click on "Calendar" and
click on "New meeting" near the top right to schedule a new meeting.
The interface looks like below.

<img src="/assets/img/2021-08-23-teams-teaching/teams-new-meeting.png" width="800">

The steps are:

- Fill in the title, date and time for the first coming meeting.
- Add all students to the required attendee field using their instution email address.
- Set the meeting as recurring to end on the last day of the semester.

Save the meeting to continue.

## Setting up a shared folder for recordings

Next, we will ask Teams to create a folder for recording.
Back to the "Calendar" screen of Teams and locate the newly added meeting.

- Click on it and click on "Join". A meeting window will pop up.
- Click on the "..." to the left of the camera icon and click on "Start Recording".
- After a few seconds, click on the arrow on the left of the hang up button and select "End meeting".

Back to Teams and click on "Chat", a new meeting with the meeting name will show up.
You can pin it from the right-click menu.

Access your [Microsoft OneDrive Webapp](https://www.microsoft.com/en-us/microsoft-365?ms.url=officecom&shorturl=onedrive&rtc=1)
with the same instution account.
A folder named *Recordings* will appear with the just-recorded video.
Feel free to remove this test video. Next:

- Create a folder in the "Recording" folder (or elsewhere you prefer in this OneDrive).
  My folder is called "ECEN 5113 Fall 2021".
- Right click on the new folder and select *Share*.
- In the new window, click on *People you specify can view >* and change it to *People in [Your organization] with the link*.
- Click on *Apply* and select *Copy link* (see screenshot below). A unique link will be created for sharing on Canvas.

<img src="/assets/img/2021-08-23-teams-teaching/onedrive-share.png" width="800">

## Sharing the link on Canvas

Now, let's put it on Canvas.

- Created a module called *Streaming and Recording* and pinned it to the top.
- Click on the "+" sign on the right of the module title bar to add an *External URL*.
- Fill in a title (*Lecture Recording*, for example) and paste the copied sharing link.
- If you want to live stream lectures, add another *External URL* and provide the
  meeting link, which can be found in the Teams Calendar (see the screenshot below).
- Next, publish the module item when ready. Use the *Student View* to double check.


At the beginning of the semester, I sent out an email informing students that
lecture recordings will be available at the same link on Canvas, following lectures.

<img src="/assets/img/2021-08-23-teams-teaching/teams-meeting-link.png" width="800">

In addition, I created a folder for slides with ink notes and share it with all students.
The final Canvas module looks like below:

<img src="/assets/img/2021-08-23-teams-teaching/canvas-link.png" width="800">

## Classroom workflow

Since my classroom already has a PC connected to the projector, I typically bring
a stylus-enabled device for showing slides and writing notes.
The PowerPoint slides have blank pages inserted wherever I feel like writing.

My typical workflow is as follows:

- Log in my account on the classroom PC, open up Teams and join the meeting without connecting to audio.
- Start Teams on my Surface Pro. Connect to the same meeting with audio and video enabled.
- Start screen sharing.

When the class starts, **remember to start recording**. When finished, end the meeting and log out of the
classroom PC.

## After class

Above are the one-time setup steps.
The after-class steps are extremely simple:

1. Drag the new video recording in the OneDrive *Recordings* folder to the shared folder.
2. Save the slides with ink notes and drag it to the other OneDrive shared folder.

## Final Notes

It is important to add all students to the required attendees.
This allows the video recording to be automatically shared
to them.
If a student cannot see a particular recording, it indicates
s/he was not an attendee when it was recorded.
In such case, the video file needs to be shared separately.
