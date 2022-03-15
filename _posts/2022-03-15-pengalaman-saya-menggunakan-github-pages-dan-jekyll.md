---
layout: post
title: Pengalaman saya menggunakan Github Pages dan Jekyll
description: Mengenal Github Pages dan Jekyll serta pengalaman saya pertama kali
  menggunakannya.
date: 2022-03-15T05:34:27.273Z
author: Satya Wibawa
toc: true
comments: true
tags: github-pages jekyll ruby
categories: web-development
---
![Logo Github Pages dan Jekyll](/assets/uploads/pengalaman-saya-menggunakan-github-pages-dan-jekyll.png "Logo Github Pages dan Jekyll"){:class="img-fluid rounded z-depth-1"}
<div class="caption">
    Logo Github Pages dan Jekyll
</div>

Berangkat dari keinginan untuk mencari hostingan handal dan gratis untuk website pribadi saya, [Github Pages](https://pages.github.com/) menarik perhatian saya. 

### Hosting gratis Github Pages

Github Pages adalah salah satu fitur dari Github yang memungkinkan kita meng-hosting website dari repository kita secara langsung. Untuk tingkat keamanan dan kehandalan dari Github Pages sendiri tidak usah diragukan lagi. Terlebih lagi Github Pages memberikan kebebasan kita mengkustomisasi website kita dari sisi kode. Dan juga Github Pages menggunakan simple flat-file based, yang membuat website kita ditampilkan secara cepat, was wes wos, sat set sot. Kalau kita ingin mengkustomisasi domain website kita nantinya, Github Pages memfasilitasi hal tersebut. Karena keuntungan-keuntungan inilah akhirnya saya memilih Github Pages menjadi tempat hosting saya.  

Lihat [Pembaruan Website Personal Gung Satya dengan Jekyll](https://gungsatya.github.io/news/announcement_2/).

Namun sayangnya Github Pages hanya mendukung static site hosting. Jadi tidak bisa tuh yang namanya kita hosting wordpress di Github Pages. Kita hanya menyimpan HTML, CSS dan Javascript static yang nantinya akan di-hosting pada Github Pages yang bersifat serverless. Karena itulah akhirnya saya mencari sebuah generator website statis yang berujung dengan sesuatu yang bernama Jekyll.

### Pembuat website statis Jekyll

Menurut menurut penjelasan yang dimuat pada [repositori Github](https://github.com/jekyll/jekyll)-nya, Jekyll adalah sebuah generator website statis simple yang cocok dalam mengembangkan website personal, project dan perusahaan. Hal-hal yang disorot pada wesbite resminya adalah *simple, static, dan blog-aware*.

> **Simple**: Jekyll tidak membutuhkan basis data serta konfigurasinya yang rumit, tidak ada moderator komentar dan pembaruan yang mengganggu. Jekyll hanya berfokus pada konten.
>
> **Static**: Segala produk yang dihasilkan jekyll bersifat statis dan siap untuk langsung di-deploy.
>
> **Blog-Aware**: Jekyll lebih didesain untuk kepentingan blog sehingga dilengkapi dengan hal-hal pendukung blog yaitu permalinks, pengkategorian konten, pages, posts dan kustomisasi layout.

### Pengalaman saya menggunakan Github Pages dan Jekyll

Setelah saya mencoba menggunakan Github Pages dan meng-hosting website pribadi saya yang menggunakan Jekyll, saya membuat testimoni sebagai berikut.

**Pros**

* Github Pages dan Jekyll merupakan layanan yang gratis.
* Tingkat keamanan dan kehandalan yang tinggi.
* Sistem penyimpanan yang simple berbasis flat-file content management.
* Domain website dapat diubah sesuai keinginan sendiri.
* Fitur Seo sudah disediakan oleh Jekyll.
* SSL gratis dari Github Pages.
* Waktu reload yang cepat.

**Cons**

* Tidak dapat menyimpan interaksi dari pengguna, seperti contact form, dsb.
* Konten tidak ditampilkan secara dinamik, seperti tidak bisa menampilkan post secara urutan popularitas, dsb.
* Tidak ada manipulasi gambar seperti crop ataupun resizing.
* Penjadwalan konten tidak tersedia.
* Menggunakan teknologi yang jarang digunakan sehingga perlu dipelajari lebih lanjut.
* Tidak tersedia customer support, jadi segala masalah harus diselesaikan sendiri. 
* Feedback dari penggunjung seperti komentar pada website tidak tersedia, terkecuali menggunakan aplikasi pihak ketiga.

### Kesimpulan

Saya merekomendasikan penggunaan Github Pages dan Jekyll kepada pengguna yang mencari hosting simple dan gratis dengan response yang cepat. Direkomendasikan untuk memanfaatkannya untuk kepentingan blog dan pembagian konten statis yang ringan, misalnya website blog pribadi, website pengenalan perusahaan, website dokumentasi project.

Saya tidak merekomendasikan pengguanaan Github Pages dan Jekyll untuk kepentingan komersial seperti berjualan online atau sistem aplikasi yang membutuhkan pemrosesan data di bagian server. 

Demikian yang dapat saya share terkait Pengalaman saya menggunakan Github Pages dan Jekyll, semoga artikel ini bermanfaat. Terimakasih sudah membaca.

Artikel pendukung yang berkaitan.

* [Blogging on GitHub Pages: The Pros and Cons](https://www.bloggingpro.com/42537-2/)
* [The Pros and Cons of Building a Website with Jekyll](https://ericnish.io/blog/jekyll-pros-and-cons/)