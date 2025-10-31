---
layout: page
permalink: /misc/feeling-diary
title: Feeling Diary
description:
nav: false
---

<style>
.feelings-wrapper {
    background-color: var(--global-bg-color);
    border: 3px solid #999;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
}

.feeling-entry {
    padding: 30px;
    position: relative;
    background-color: var(--global-bg-color);
}

.feeling-entry:not(:last-child) {
    position: relative;
    padding-bottom: 40px;
}

.feeling-entry:not(:last-child)::after {
    content: '';
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    height: 10px;
    background-image: url("data:image/svg+xml,%3Csvg width='100%25' height='10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,5 L5,0 L10,5 L15,0 L20,5 L25,0 L30,5 L35,0 L40,5 L45,0 L50,5 L55,0 L60,5 L65,0 L70,5 L75,0 L80,5 L85,0 L90,5 L95,0 L100,5' stroke='%23999' stroke-width='2' fill='none' vector-effect='non-scaling-stroke'/%3E%3C/svg%3E");
    background-repeat: repeat-x;
    background-size: 100px 10px;
    background-position: center;
}

.feeling-timestamp {
    text-align: left;
    font-size: 0.85em;
    color: var(--global-text-color-light);
    margin-bottom: 8px;
    padding-bottom: 6px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.feeling-day {
    display: inline;
    font-weight: 600;
    color: var(--global-theme-color);
    margin-right: 8px;
}

.feeling-date-time {
    display: inline;
    opacity: 0.7;
}

.feeling-text {
    font-size: 1.05em;
    line-height: 1.8;
    color: var(--global-text-color);
    text-align: left;
    font-style: normal;
}

.diary-container {
    max-width: 650px;
    margin: 60px auto;
}

.diary-header {
    margin-bottom: 60px;
    text-align: left;
    font-style: normal;
    color: var(--global-text-color-light);
    font-size: 0.95em;
}
</style>

<div class="diary-container">
    <div class="diary-header">
        A record of what I am feeling, following John Koenig's vision in <em>The Dictionary of Obscure Sorrows</em>: "Words never do us justice. But we have to try anyway. Luckily, the palette of language is infinitely expandable. If we wanted to, we could build a new linguistic framework to fill in the gaps, this time rooted in our common humanity, our shared vulnerability, and our complexity as individuals... We could catalog even the faintest quirks of the human condition, even things that were only ever felt by one person -- though it is the working hypothesis of this book that none of us is truly alone in how we feel."
    </div>

    <div id="feelings-container">
        Loading...
    </div>
</div>

<script>
fetch('/assets/json/feelings.jsonl')
    .then(response => response.text())
    .then(data => {
        const lines = data.trim().split('\n');
        const entries = lines.map(line => JSON.parse(line));

        // Function to convert 12-hour time to 24-hour for sorting
        function convertTo24Hour(time, amPm) {
            const [hours, minutes] = time.split(':').map(num => parseInt(num));
            let hour24 = hours;

            if (amPm === 'PM' && hours !== 12) {
                hour24 = hours + 12;
            } else if (amPm === 'AM' && hours === 12) {
                hour24 = 0;
            }

            return `${String(hour24).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        }

        // Sort by date and time, most recent first
        entries.sort((a, b) => {
            const time24A = convertTo24Hour(a.time, a.am_pm);
            const time24B = convertTo24Hour(b.time, b.am_pm);
            const dateTimeA = new Date(a.date + 'T' + time24A);
            const dateTimeB = new Date(b.date + 'T' + time24B);
            return dateTimeB - dateTimeA;
        });

        const container = document.getElementById('feelings-container');
        container.innerHTML = '';

        // Create wrapper for all entries
        const wrapper = document.createElement('div');
        wrapper.className = 'feelings-wrapper';

        entries.forEach(entry => {
            const entryDiv = document.createElement('div');
            entryDiv.className = 'feeling-entry';

            const dayOfWeek = entry.day_of_week || new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long' });
            const timeDisplay = `${entry.time} ${entry.am_pm}`;

            entryDiv.innerHTML = `
                <div class="feeling-timestamp">
                    <span class="feeling-day">${dayOfWeek}</span>
                    <span class="feeling-date-time">${entry.date} • ${timeDisplay}</span>
                </div>
                <div class="feeling-text">${entry.feeling}</div>
            `;

            wrapper.appendChild(entryDiv);
        });

        container.appendChild(wrapper);
    })
    .catch(error => {
        document.getElementById('feelings-container').innerHTML =
            '<p style="color: var(--global-text-color-light); text-align: center;">Unable to load feelings</p>';
        console.error('Error loading feelings:', error);
    });
</script>
