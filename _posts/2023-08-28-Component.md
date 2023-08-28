---
layout: post
title: Components
date: 2023-08-26
description: Some basics components
tags: css htmlt code
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
