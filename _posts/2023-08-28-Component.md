---
layout: post
title: Components
date: 2023-08-26
description: Some basic components
tags: css html code compenent
categories: code
featured: true
toc:
  sidebar: left
---

# Avatar

<img class="avatar" alt="avatar" src="https://scontent.fcdg2-1.fna.fbcdn.net/v/t31.18172-8/464710_10151468301110945_346348306_o.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=F1Ayjb6EVFwAX_iYQ0N&_nc_ht=scontent.fcdg2-1.fna&oh=00_AfC_1bRREmjn_x501Xy2Kna9fIDPcnL0sGQhsU8R8e_BcQ&oe=65145FF7" />
<img class="avatar-large" alt="avatar-large" src="https://scontent.fcdg2-1.fna.fbcdn.net/v/t31.18172-8/464710_10151468301110945_346348306_o.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=F1Ayjb6EVFwAX_iYQ0N&_nc_ht=scontent.fcdg2-1.fna&oh=00_AfC_1bRREmjn_x501Xy2Kna9fIDPcnL0sGQhsU8R8e_BcQ&oe=65145FF7" />
<img class="avatar-bordered" alt="avatar-bordered" src="https://scontent.fcdg2-1.fna.fbcdn.net/v/t31.18172-8/464710_10151468301110945_346348306_o.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=F1Ayjb6EVFwAX_iYQ0N&_nc_ht=scontent.fcdg2-1.fna&oh=00_AfC_1bRREmjn_x501Xy2Kna9fIDPcnL0sGQhsU8R8e_BcQ&oe=65145FF7" />
<img class="avatar-square" alt="avatar-square" src="https://scontent.fcdg2-1.fna.fbcdn.net/v/t31.18172-8/464710_10151468301110945_346348306_o.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=F1Ayjb6EVFwAX_iYQ0N&_nc_ht=scontent.fcdg2-1.fna&oh=00_AfC_1bRREmjn_x501Xy2Kna9fIDPcnL0sGQhsU8R8e_BcQ&oe=65145FF7" />

````markdown
```css
.avatar {
  width: 40px;
  border-radius: 50%;
}

.avatar-large {
  width: 56px;
  border-radius: 50%;
}

.avatar-bordered {
  width: 40px;
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  border: white 1px solid;
}

.avatar-square {
  width: 40px;
  border-radius: 0px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  border: white 1px solid;
}
```
````

````markdown
```html
<img class="avatar" alt="avatar" src="https://scontent.fcdg2-1.fna.fbcdn.net/v/t31.18172-8/464710_10151468301110945_346348306_o.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=F1Ayjb6EVFwAX_iYQ0N&_nc_ht=scontent.fcdg2-1.fna&oh=00_AfC_1bRREmjn_x501Xy2Kna9fIDPcnL0sGQhsU8R8e_BcQ&oe=65145FF7" />
<img class="avatar-large" alt="avatar-large" src="https://scontent.fcdg2-1.fna.fbcdn.net/v/t31.18172-8/464710_10151468301110945_346348306_o.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=F1Ayjb6EVFwAX_iYQ0N&_nc_ht=scontent.fcdg2-1.fna&oh=00_AfC_1bRREmjn_x501Xy2Kna9fIDPcnL0sGQhsU8R8e_BcQ&oe=65145FF7" />
<img class="avatar-bordered" alt="avatar-bordered" src="https://scontent.fcdg2-1.fna.fbcdn.net/v/t31.18172-8/464710_10151468301110945_346348306_o.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=F1Ayjb6EVFwAX_iYQ0N&_nc_ht=scontent.fcdg2-1.fna&oh=00_AfC_1bRREmjn_x501Xy2Kna9fIDPcnL0sGQhsU8R8e_BcQ&oe=65145FF7" />
<img class="avatar-square" alt="avatar-square" src="https://scontent.fcdg2-1.fna.fbcdn.net/v/t31.18172-8/464710_10151468301110945_346348306_o.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=F1Ayjb6EVFwAX_iYQ0N&_nc_ht=scontent.fcdg2-1.fna&oh=00_AfC_1bRREmjn_x501Xy2Kna9fIDPcnL0sGQhsU8R8e_BcQ&oe=65145FF7" />
```
````
---

# Button

<a class="btn btn-ghost" href="#">Write a story</a>
<a class="btn btn-flat" href="#">Book now</a>
<a class="btn btn-gradient" href="#">Start now</a>

````markdown
```html
<a class="btn btn-ghost" href="#">Write a story</a>
<a class="btn btn-flat" href="#">Book now</a>
<a class="btn btn-gradient" href="#">Start now</a>
```
````

````markdown
```css
.btn-ghost {
  color: #4A4A4A;
  border: 1px solid #4A4A4A;
  padding: 8px 24px;
  border-radius: 50px;
  font-weight: lighter;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.btn-ghost:hover {
  opacity: 1;
}

.btn-flat {
  color: white;
  padding: 8px 24px;
  border-radius: 4px;
  background: #670BFF;
  transition: background 0.3s ease;
}

.btn-flat:hover {
  background: #4D04C4;
  color: white;
}

.btn-gradient {
  color: white;
  padding: 8px 24px;
  border-radius: 4px;
  font-weight: bold;
  background: linear-gradient(#167FFB, #0F60C4);
  transition: background 0.3s ease;
  border: 1px solid #0F60C4;
}

.btn-gradient:hover {
  background: linear-gradient(#147EFF, #0F67DA);
  color: white;
}
```
````
