---
layout: distill
title: Cara Mendapatkan OAuth 2.0 dari Google Fit
description: Mengatur autensikasi aplikasi terhadap Google Fit
date: 2021-12-20
authors: Satya Wibawa
toc: true
---

## Pendahuluan

Dalam membuat aplikasi yang tersinkronisasi dengan Google Fit melalui REST API<d-footnote><b>REST API</b> (juga dikenal sebagai RESTful API) adalah antarmuka pemrograman aplikasi (API atau web API) yang sesuai dengan batasan gaya arsitektur REST dan memungkinkan interaksi dengan layanan web RESTful. REST yang merupakan singkatan dari <i>Representational State Transfer</i>, diciptakan oleh ilmuwan komputer Roy Fielding.</d-footnote> terlebih dahulu kita perlu mendapatkan autentikasi [OAuth 2.0](https://oauth.net/2/). Langkah-langkah cara mendapatkan OAuth 2.0 dari Google Fit adalah sebagai berikut.

## 1. Masuk ke dalam Google Console

Silahkan masuk kedalam Google Console melalui [link berikut](https://console.developers.google.com/flows/enableapi?apiid=fitness).
<img class="img-fluid z-depth-1 my-2" src="/assets/img/blog/2021-12-20-cara_mendapatkan_oauth_2_dari_google/1-masuk-ke-dalam-google-console.png" alt="Masuk ke dalam Google Console">

## 2. Buat _project_ baru

Buat project baru dengan mengklik tombol <i><b>Create Project</b></i>.

<img class="img-fluid z-depth-1 my-2" src="/assets/img/blog/2021-12-20-cara_mendapatkan_oauth_2_dari_google/2-membuat-project-baru.jpg" alt="Buat project baru">

Jika sudah terdapat project baru dengan nama <i><b>My First Project</b></i>, silahkan lewati hingga [langkah 4](#4-konfirmasi-project)

## 3. Sesuaikan data aplikasi

Silahkan isi _form_ seperti gambar dibawah ini. Sesuaikan dengan data aplikasi yang akan dibuat.

<img class="img-fluid z-depth-1 my-2" src="/assets/img/blog/2021-12-20-cara_mendapatkan_oauth_2_dari_google/3-sesuaikan-data-aplikasi.png" alt="Sesuaikan data aplikasi">

## 4. Konfirmasi _project_

Konfirmasi project dengan mengklik tombol <i><b>Next</b></i>.

<img class="img-fluid z-depth-1 my-2" src="/assets/img/blog/2021-12-20-cara_mendapatkan_oauth_2_dari_google/4-konfirmasi-project.png" alt="Sesuaikan data aplikasi">

## 5. Mengaktifkan Google Fit API

Aktifkan Google Fit API dengan mengklik tombol <i><b>Enable</b></i>.

<img class="img-fluid z-depth-1 my-2" src="/assets/img/blog/2021-12-20-cara_mendapatkan_oauth_2_dari_google/5-enable-project.png" alt="Enable project">

## 6. Buka halaman _credentials_

Setelah APi aktif, silahkan menuju halaman _credentials_.

<img class="img-fluid z-depth-1 my-2" src="/assets/img/blog/2021-12-20-cara_mendapatkan_oauth_2_dari_google/6-menuju-halaman-credentials.png" alt="Buka halaman credentials">

## 7. Membuat _credentials_

Pada halaman _credentials_, klik tombol <i><b>Create Credentials</b></i> kemudian pilih 
<i><b>Oauth client ID</b></i>.

<img class="img-fluid z-depth-1 my-2" src="/assets/img/blog/2021-12-20-cara_mendapatkan_oauth_2_dari_google/7-membuat-credentials.png" alt="Membuat credentials">

## 8. Atur tipe pengguna

Selanjutnya adalah mengatur tipe pengguna, pilih _user type_ <i><b>External</b></i> kemudian klik tombol <i><b>Create</b></i>.

<img class="img-fluid z-depth-1 my-2" src="/assets/img/blog/2021-12-20-cara_mendapatkan_oauth_2_dari_google/8-atur-tipe-user.png" alt="Memilih tipe pengguna">

## 9. Mengatur _consent screen_ 

_Whoops_ ternyata kita lupa mengatur _consent screen_ dari project yang kita buat. Untuk itu kita atur terlebih _consent screen_ dengan menekan tombol <i><b>Configure Consent Screen</b></i>.
<img class="img-fluid z-depth-1 my-2" src="/assets/img/blog/2021-12-20-cara_mendapatkan_oauth_2_dari_google/9-atur-user-consent-1.png" alt="Mengatur consent screen 1">

- Isi formulir _App Information_ dan pastikan semua _field_ bertanda bintang __(*)__ diisi. Kemudian klik tombol <i><b>Save and Continue</b></i>.
<img class="img-fluid z-depth-1 my-2" src="/assets/img/blog/2021-12-20-cara_mendapatkan_oauth_2_dari_google/9-atur-user-consent-2.png" alt="Mengatur consent screen 2">

- Atur _scope_ dari aplikasi dengan klik tombol<i><b>Add or Remove Scope</b></i>.
<img class="img-fluid z-depth-1 my-2" src="/assets/img/blog/2021-12-20-cara_mendapatkan_oauth_2_dari_google/9-atur-user-consent-3.png" alt="Mengatur consent screen 3">
Ketik `Google Fit` pada _filter_, centang semua yang ada pada tabel dan klik tombol <i><b>Update</b></i>.
<img class="img-fluid z-depth-1 my-2" src="/assets/img/blog/2021-12-20-cara_mendapatkan_oauth_2_dari_google/9-atur-user-consent-4.jpg" alt="Mengatur consent screen 4">
Kemudian klik tombol <i><b>Save and Continue</b></i>.
<img class="img-fluid z-depth-1 my-2" src="/assets/img/blog/2021-12-20-cara_mendapatkan_oauth_2_dari_google/9-atur-user-consent-5.png" alt="Mengatur consent screen 5">

- Tambahkan email pengguna yang digunakan untuk mencoba aplikasi. Kemudian klik tombol <i><b>Save and Continue</b></i>.
<img class="img-fluid z-depth-1 my-2" src="/assets/img/blog/2021-12-20-cara_mendapatkan_oauth_2_dari_google/9-atur-user-consent-6.png" alt="Mengatur consent screen 6">

- Cek kembali _summary consent screen_ dari aplikasi yang sudah kita atur.
<img class="img-fluid z-depth-1 my-2" src="/assets/img/blog/2021-12-20-cara_mendapatkan_oauth_2_dari_google/9-atur-user-consent-7.jpg" alt="Mengatur consent screen 7">

- Kembali lagi ke [langkah 6](#6-buka-halaman-credentials) dan [langkah 7](#7-membuat-credentials)

## 10. Membuat OAuth Client ID

Lengkapi formulir pembuatan Oauth tersebut. Sesuaikan _Authorised Redirect URIs_ dengan URI pada aplikasi yang bertugas menyimpan access code kita. Kemudian klik tombol <i><b>Create</b></i>
<img class="img-fluid z-depth-1 my-2" src="/assets/img/blog/2021-12-20-cara_mendapatkan_oauth_2_dari_google/10-create-oauth.png" alt="Membuat OAuth Client ID">

## 11. Mengunduh _data credential_

_Foala~_. Oauth telah selesai dibuat. Unduh data json-nya dengan mengklik tombol <i><b>Download Json</b></i>
<img class="img-fluid z-depth-1 my-2" src="/assets/img/blog/2021-12-20-cara_mendapatkan_oauth_2_dari_google/11-download-oauth-client-json.png" alt="Mengunduh data credential">

Sekian **Cara Mendapatkan OAuth 2.0 dari Google Fit** saya buat. Semoga bermanfaat.