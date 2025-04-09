---
permalink: /assets/js/photoswipe-setup.js
---
import PhotoSwipeLightbox from "{{ site.third_party_libraries.photoswipe-lightbox.url.js }}";
import PhotoSwipe from "{{ site.third_party_libraries.photoswipe.url.js }}";
const photoswipe = new PhotoSwipeLightbox({
  gallery: ".pswp-gallery",
  children: "a",
  pswpModule: PhotoSwipe,
});
photoswipe.init();
