---
layout: page
title: Whisper
description: Chatbot sarana pengaduan masyarakat kepada pemerintah.
date: 2018-07-10T04:22:05.959Z
thumbnail: /assets/uploads/photo_2018-05-22_21-47-02.jpg
importance: 1
category: work
---


<nav class="l-text figcaption">
    <h3>Daftar Isi</h3>
    {% include toc.html html=content %}
</nav>


## Latar Belakang

Whisper adalah aplikasi yang saya buat untuk memenuhi syarat dalam menyelesaikan pendidikan S1 saya. Saya merancang sebuah aplikasi chatbot[^1] "berbasis aturan" guna menjembatani aspirasi masyarakat yang disimpan dan diregistrasi langsung kepada pemerintah. Aplikasi ini kemudian saya beri nama "Whisper".
{: .text-justify }

## Mekanisme Aplikasi

![Mekanisme kerja Whisper](/assets/uploads/mekanisme-whisper.png "Mekanisme kerja Whisper"){:class="img-fluid rounded z-depth-1"}
<div class="caption">
    Alur mekanisme Whisper
</div>

Whisper memiliki 2 modul aplikasi yaitu aplikasi chatbot[^1] pada Telegram, dan aplikasi website untuk pemerintah. Masyarakat yang ingin mengadukan permasalah mengirim pesan pengaduan  pada aplikasi chatbot[^1] Whisper. Pesan tersebut diolah menggunakan bahasa pemrograman Python dan disimpan pada basis data MySQL. Pengaduan yang dibuat tadi akan diregistrasi dengan nomor pengaduan Nomor pengaduan ini nantinya akan digunakan oleh masyarakat untuk memonitor apakah pengaduannya telah disampaikan kepada pemerintah yang terkait. Pemerintah yang terkait dapat melihat kumpulan pengaduan masyarakat melalui aplikasi website.
{: .text-justify }

## Tangkapan Layar Aplikasi

Beberapa tangkapan layar dari aplikasi Whisper.

### Aplikasi Modul Chatbot

<div class="row justify-content-sm-center">
    <div class="col-sm-4 mt-3 mt-md-0">
        <img src="/assets/uploads/chatbot_whisper_1.png" title="Tangkap layar chatbot Whisper 1" class="img-fluid rounded z-depth-1 p-1" >
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        <img src="/assets/uploads/chatbot_whisper_2.png" title="Tangkap layar chatbot Whisper 2" class="img-fluid rounded z-depth-1 p-1" >
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        <img src="/assets/uploads/chatbot_whisper_3.png" title="Tangkap layar chatbot Whisper 3" class="img-fluid rounded z-depth-1 p-1" >
    </div>
</div>
<div class="caption">
    Tangkapan layar aplikasi chatbot[^1] Whisper
</div>

### Aplikasi Modul Website

<div class="row justify-content-sm-center">
    <div class="col-sm-12">
        <img src="/assets/uploads/website_whisper_1.png" title="Tangkap layar website Whisper 1" class="img-fluid rounded z-depth-1 p-1" >
    </div>
    <div class="col-sm-12">
        <img src="/assets/uploads/website_whisper_2.png" title="Tangkap layar website Whisper 2" class="img-fluid rounded z-depth-1 p-1" >
    </div>
    <div class="col-sm-12">
        <img src="/assets/uploads/website_whisper_3.png" title="Tangkap layar website Whisper 3" class="img-fluid rounded z-depth-1 p-1" >
    </div>
</div>
<div class="caption">
    Tangkapan layar aplikasi website Whisper
</div>

*[^1]: Sebuah program komputer yang dirancang untuk menyimulasikan percakapan intelektual dengan satu atau lebih manusia baik secara audio maupun teks. ([Sumber](https://id.wikipedia.org/wiki/Chatterbot))


