# BALMON PEKANBARU — GLOBAL DATA CONTEXT

> Dokumentasi terpusat seluruh sumber data JSON frontend.
> Dokumen ini disusun untuk memberikan konteks lengkap kepada LLM dan AI coding agent.

---

## 1. Project Information

- **Project:** Balai Monitor Spektrum Frekuensi Radio Kelas I Pekanbaru
- **Module:** Frontend Global Data
- **Source:** `frontend/src/lib/data/`
- **Output:** `dokumentasi-global/GLOBAL_DATA_CONTEXT.md`
- **Format:** Markdown
- **Data Format:** JSON
- **Total JSON Files:** 22
- **Generated:** 2026-11-05 10:09:50

---

## 2. Instructions for LLM

Dokumen ini merupakan referensi sumber data frontend Balmon Pekanbaru.

Ketentuan penggunaan:
1. Gunakan isi JSON sebagai referensi utama data frontend.
2. Jangan mengarang, mengubah, atau mengasumsikan nilai data yang tidak tersedia.
3. Pertahankan struktur JSON dan relasi antar-data.
4. Sebelum mengubah data, periksa file sumber aslinya.
5. Jangan mengubah business logic hanya berdasarkan dokumentasi ini.
6. Jika terdapat perbedaan antara dokumentasi dan source code, prioritaskan source code aktual.
7. Perhatikan konsistensi data antarhalaman, komponen, dan modul.

---

## 3. Directory Structure

```text
data/
  contacts/
  coverage/
  institution/
  performance/
  public_information/
  publications/
  services/
  site_content/
  contacts\office.json
  coverage\districts.json
  coverage\spectrum-applications.json
  coverage\summary.json
  institution\functions.json
  institution\legal-bases.json
  institution\organization.json
  institution\profile.json
  performance\distribution-2025.json
  performance\metrics-2025.json
  performance\reports.json
  public_information\documents.json
  public_information\ppid.json
  publications\articles.json
  publications\education.json
  publications\featured-video.json
  services\catalog.json
  services\complaint.json
  services\faqs.json
  services\portals.json
  site_content\hero.json
  site_content\homepage.json
```

---

## 4. Data Inventory

| No. | Module | File | Size (Bytes) | Status |
|---:|---|---|---:|---|
| 1 | contacts | `office.json` | 1493 | VALID |
| 2 | coverage | `districts.json` | 1904 | VALID |
| 3 | coverage | `spectrum-applications.json` | 3749 | VALID |
| 4 | coverage | `summary.json` | 809 | VALID |
| 5 | institution | `functions.json` | 2267 | VALID |
| 6 | institution | `legal-bases.json` | 822 | VALID |
| 7 | institution | `organization.json` | 1025 | VALID |
| 8 | institution | `profile.json` | 1724 | VALID |
| 9 | performance | `distribution-2025.json` | 693 | VALID |
| 10 | performance | `metrics-2025.json` | 2218 | VALID |
| 11 | performance | `reports.json` | 276 | VALID |
| 12 | public_information | `documents.json` | 5375 | VALID |
| 13 | public_information | `ppid.json` | 1582 | VALID |
| 14 | publications | `articles.json` | 10742 | VALID |
| 15 | publications | `education.json` | 7885 | VALID |
| 16 | publications | `featured-video.json` | 457 | VALID |
| 17 | services | `catalog.json` | 3110 | VALID |
| 18 | services | `complaint.json` | 1997 | VALID |
| 19 | services | `faqs.json` | 1190 | VALID |
| 20 | services | `portals.json` | 1692 | VALID |
| 21 | site_content | `hero.json` | 511 | VALID |
| 22 | site_content | `homepage.json` | 2052 | VALID |

---

## 5. Complete JSON Data Sources

> Setiap bagian berikut berisi isi file JSON aktual dari source directory.


## Module: contacts

### office.json

- **Path:** `frontend/src/lib/data/contacts\office.json`
- **Size:** 1493 bytes

**JSON Content:**

```json
{
    "$schema":  "../../contracts/schemas/contacts.schema.json",
    "officeName":  "Balai Monitor Spektrum Frekuensi Radio Kelas I Pekanbaru",
    "parentAgency":  "Kementerian Komunikasi dan Digital Republik Indonesia",
    "address":  {
                    "street":  "Jl. Soekarno - Hatta No. 244, Arengka Atas, Pekanbaru, Riau",
                    "city":  "Pekanbaru",
                    "postalCode":  "28125",
                    "directions":  "Berada di jalur utama Soekarno-Hatta (Arengka Atas), dekat persimpangan lampu merah Arifin Achmad."
                },
    "phone":  {
                  "display":  "(0761) 65735",
                  "uri":  "tel:+6276165735"
              },
    "whatsapp":  {
                     "display":  "0811-7512-748",
                     "uri":  "https://api.whatsapp.com/send/?phone=628117512748\u0026text\u0026type=phone_number\u0026app_absent=0"
                 },
    "email":  {
                  "display":  "upt_pekanbaru@postel.go.id",
                  "uri":  "mailto:upt_pekanbaru@postel.go.id"
              },
    "serviceHours":  {
                         "days":  "Senin – Jumat",
                         "time":  "08.00 – 16.00 WIB",
                         "note":  "Hari Sabtu, Minggu, dan Hari Libur Nasional tutup. Layanan aduan interferensi darurat keselamatan tetap dipantau."
                     },
    "location":  {
                     "latitude":  0.4410711688313704,
                     "longitude":  101.42136007621846,
                     "targetUrl":  "https://www.google.com/maps/search/?api=1\u0026query=0.4410711688313704,101.42136007621846",
                     "embedUrl":  "https://www.google.com/maps?q=0.4410711688313704,101.42136007621846\u0026z=17\u0026hl=id\u0026output=embed"
                 },
    "socials":  {
                    "instagram":  {
                                      "label":  "@balmon_pekanbaru",
                                      "url":  "https://www.instagram.com/balmon_pekanbaru/"
                                  }
                }
}
```

---

## Module: coverage

### districts.json

- **Path:** `frontend/src/lib/data/coverage\districts.json`
- **Size:** 1904 bytes

**JSON Content:**

```json
{
    "value":  [
                  {
                      "name":  "Kota Pekanbaru",
                      "type":  "Kota",
                      "areaKm2":  632.26,
                      "population":  1036560,
                      "totalIsr":  193,
                      "monitoredIsr":  191
                  },
                  {
                      "name":  "Kota Dumai",
                      "type":  "Kota",
                      "areaKm2":  2065.59,
                      "population":  349389,
                      "totalIsr":  134,
                      "monitoredIsr":  128
                  },
                  {
                      "name":  "Kab. Pelalawan",
                      "type":  "Kabupaten",
                      "areaKm2":  13408.72,
                      "population":  434590,
                      "totalIsr":  145,
                      "monitoredIsr":  91
                  },
                  {
                      "name":  "Kab. Bengkalis",
                      "type":  "Kabupaten",
                      "areaKm2":  8612.56,
                      "population":  591800,
                      "totalIsr":  117,
                      "monitoredIsr":  66
                  },
                  {
                      "name":  "Kab. Siak",
                      "type":  "Kabupaten",
                      "areaKm2":  8556.09,
                      "population":  495760,
                      "totalIsr":  78,
                      "monitoredIsr":  70
                  },
                  {
                      "name":  "Kab. Rokan Hilir",
                      "type":  "Kabupaten",
                      "areaKm2":  9068.63,
                      "population":  688073,
                      "totalIsr":  70,
                      "monitoredIsr":  55
                  },
                  {
                      "name":  "Kab. Kampar",
                      "type":  "Kabupaten",
                      "areaKm2":  11289.28,
                      "population":  908390,
                      "totalIsr":  55,
                      "monitoredIsr":  54
                  },
                  {
                      "name":  "Kab. Indragiri Hilir",
                      "type":  "Kabupaten",
                      "areaKm2":  13136.14,
                      "population":  692190,
                      "totalIsr":  46,
                      "monitoredIsr":  32
                  },
                  {
                      "name":  "Kab. Indragiri Hulu",
                      "type":  "Kabupaten",
                      "areaKm2":  8198.21,
                      "population":  487039,
                      "totalIsr":  40,
                      "monitoredIsr":  25
                  },
                  {
                      "name":  "Kab. Rokan Hulu",
                      "type":  "Kabupaten",
                      "areaKm2":  7588.13,
                      "population":  586994,
                      "totalIsr":  33,
                      "monitoredIsr":  33
                  },
                  {
                      "name":  "Kab. Kuantan Singingi",
                      "type":  "Kabupaten",
                      "areaKm2":  7656.03,
                      "population":  365989,
                      "totalIsr":  32,
                      "monitoredIsr":  25
                  },
                  {
                      "name":  "Kab. Kepulauan Meranti",
                      "type":  "Kabupaten",
                      "areaKm2":  3144.18,
                      "population":  212000,
                      "totalIsr":  15,
                      "monitoredIsr":  14
                  }
              ],
    "Count":  12
}
```

---
### spectrum-applications.json

- **Path:** `frontend/src/lib/data/coverage\spectrum-applications.json`
- **Size:** 3749 bytes

**JSON Content:**

```json
{
    "value":  [
                  {
                      "id":  "aeronautical",
                      "label":  "Keselamatan Penerbangan",
                      "serviceCategory":  "Dinas Penerbangan VHF",
                      "frequencyBand":  "108 – 137 MHz",
                      "userSector":  "AirNav Indonesia \u0026 Bandara SSK II Pekanbaru",
                      "criticality":  "Kritis",
                      "description":  "Komunikasi navigasi udara dan pemandu lalu lintas pesawat udara yang wajib bebas dari interferensi pancaran ilegal.",
                      "imageUrl":  "https://thumb.viva.co.id/media/frontend/thumbs3/2020/01/26/5e2d7f4c8567b-gedung-jakarta-air-traffic-service-center-jatsc-airnav-bandara-soetta_1265_711.jpg",
                      "imageAlt":  "Pemandu lalu lintas penerbangan udara"
                  },
                  {
                      "id":  "maritime",
                      "label":  "Komunikasi Pelayaran \u0026 Nelayan",
                      "serviceCategory":  "Dinas Maritim VHF/HF \u0026 IKRAN",
                      "frequencyBand":  "156 – 174 MHz \u0026 HF Nelayan",
                      "userSector":  "Kapal Niaga, Penjaga Pantai, Nelayan Selat Malaka",
                      "criticality":  "Kritis",
                      "description":  "Jalur komunikasi keselamatan kapal di perairan internasional Selat Malaka, didukung perizinan radio nelayan terpadu (MOTS/IKRAN).",
                      "imageUrl":  "https://gmdsstesters.com/images/radio-survey/marine_radios_1.png",
                      "imageAlt":  "Peralatan komunikasi radio maritim kapal"
                  },
                  {
                      "id":  "cellular",
                      "label":  "Jaringan Bergerak Seluler",
                      "serviceCategory":  "IMT \u0026 Broadband Data",
                      "frequencyBand":  "800, 900, 1800, 2100, 2300 MHz",
                      "userSector":  "Telkomsel, Indosat Ooredoo Hutchison, XL Axiata",
                      "criticality":  "Tinggi",
                      "description":  "Tulang punggung akses data internet broadband masyarakat yang dipantau melalui pengujian kualitas layanan drive test di 12 Kabupaten/Kota.",
                      "imageUrl":  "https://dct.co.id/wp-content/uploads/2023/10/9.-Infrastruktur-Telco-Tower-Tips-Manfaat-Cara-Kerja-dan-Pengaplikasiannya-DCT-1.webp",
                      "imageAlt":  "Infrastruktur menara telekomunikasi seluler"
                  },
                  {
                      "id":  "broadcasting",
                      "label":  "Penyiaran Radio FM \u0026 TV Digital",
                      "serviceCategory":  "Dinas Siaran Terestrial",
                      "frequencyBand":  "87 – 108 MHz \u0026 478 – 806 MHz",
                      "userSector":  "53 Lembaga Penyiaran Radio \u0026 10 TV Digital Riau",
                      "criticality":  "Standar",
                      "description":  "Diseminasi informasi publik dan hiburan terestrial yang diukur daya pancar, lebar pita, serta harmonisa frekuensinya.",
                      "imageUrl":  "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/TVRI_Kalimantan_Timur.jpg/250px-TVRI_Kalimantan_Timur.jpg",
                      "imageAlt":  "Pemancar siaran televisi dan radio"
                  },
                  {
                      "id":  "public-protection",
                      "label":  "Layanan Darurat \u0026 Kebencanaan",
                      "serviceCategory":  "Komrad Instansi Pemerintah \u0026 Telsus",
                      "frequencyBand":  "137 – 174 MHz \u0026 300 – 470 MHz",
                      "userSector":  "BPBD Riau, Basarnas, Kepolisian, Komunitas Radio",
                      "criticality":  "Tinggi",
                      "description":  "Frekuensi tanggap darurat bencana alam, kebakaran hutan dan lahan, serta koordinasi teknis kepolisian daerah.",
                      "imageUrl":  "https://disasterchannel.co/wp-content/uploads/2024/09/HT2.jpg",
                      "imageAlt":  "Perangkat radio komunikasi darurat kebencanaan"
                  },
                  {
                      "id":  "fixed-transport",
                      "label":  "Transmisi Backbone Microwave",
                      "serviceCategory":  "Dinas Tetap Point-to-Point",
                      "frequencyBand":  "Pita Gelombang Mikro GHz",
                      "userSector":  "Penyelenggara Jaringan Telekomunikasi \u0026 ISP",
                      "criticality":  "Standar",
                      "description":  "Jalur transmisi data antar-menara telekomunikasi yang divalidasi koordinatnya melalui Program PrimaAksi.",
                      "imageUrl":  "https://static.wixstatic.com/media/2d350d_0add8c97d2914bd29dd11a9403645541~mv2.jpeg/v1/fill/w_568,h_344,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/2d350d_0add8c97d2914bd29dd11a9403645541~mv2.jpeg",
                      "imageAlt":  "Antena microwave link pada menara komunikasi"
                  }
              ],
    "Count":  6
}
```

---
### summary.json

- **Path:** `frontend/src/lib/data/coverage\summary.json`
- **Size:** 809 bytes

**JSON Content:**

```json
{
    "province":  "Riau",
    "coverageArea":  "12 Kabupaten/Kota (100% Termonitor)",
    "areaKm2":  "89.935,90 km²",
    "infrastructure":  "6 Stasiun Tetap, 2 Transportable (Rumbai, Tenayan, Bengkalis, Dumai, Bagansiapiapi), 1 Mobile DF",
    "statistics":  [
                       {
                           "value":  "10",
                           "label":  "Kabupaten",
                           "description":  "Wilayah administratif kabupaten daratan dan pesisir"
                       },
                       {
                           "value":  "2",
                           "label":  "Kota",
                           "description":  "Pusat aktivitas Kota Pekanbaru dan Kota Dumai"
                       },
                       {
                           "value":  "100%",
                           "label":  "Capaian Monitoring",
                           "description":  "12 Kabupaten/Kota termonitor penuh (Target 80%)"
                       },
                       {
                           "value":  "89.936 km²",
                           "label":  "Luas Wilayah Kerja",
                           "description":  "Meliputi 144 pulau dan pesisir Selat Malaka"
                       }
                   ]
}
```

---

## Module: institution

### functions.json

- **Path:** `frontend/src/lib/data/institution\functions.json`
- **Size:** 2267 bytes

**JSON Content:**

```json
{
    "value":  [
                  {
                      "code":  "01",
                      "title":  "Perencanaan \u0026 Program",
                      "description":  "Penyusunan rencana kerja, penganggaran, dan evaluasi pemantauan spektrum.",
                      "icon":  "bar-chart-3",
                      "metric":  "Kualitas Pelaporan UAKPA 100%"
                  },
                  {
                      "code":  "02",
                      "title":  "Observasi \u0026 Deteksi Emisi",
                      "description":  "Pengamatan spektrum, pelacakan arah sinyal (DF), dan pemantauan okupansi pita frekuensi.",
                      "icon":  "activity",
                      "metric":  "784 ISR Teridentifikasi"
                  },
                  {
                      "code":  "03",
                      "title":  "Operasi Penertiban \u0026 Sanksi",
                      "description":  "Penertiban perangkat ilegal, penegakan hukum, dan penetapan sanksi denda administratif.",
                      "icon":  "shield-check",
                      "metric":  "32 Stasiun Ditertibkan (100% Lunas)"
                  },
                  {
                      "code":  "04",
                      "title":  "Pengukuran \u0026 Validasi ISR",
                      "description":  "Inspeksi open shelter, remote site microwave link, serta audit emisi TV digital dan radio FM.",
                      "icon":  "ruler",
                      "metric":  "6.360 ISR \u0026 Stasiun Terukur"
                  },
                  {
                      "code":  "05",
                      "title":  "Penyampaian SPP \u0026 Piutang",
                      "description":  "Distribusi Surat Perintah Pembayaran BHP Frekuensi serta penagihan piutang negara (PPNTO).",
                      "icon":  "file-text",
                      "metric":  "253 SPP \u0026 Tagihan BHP Tertangani"
                  },
                  {
                      "code":  "06",
                      "title":  "Penanganan Gangguan Radio",
                      "description":  "Penyelidikan interferensi berbahaya (harmful interference) penerbangan, maritim, dan seluler.",
                      "icon":  "crosshair",
                      "metric":  "100% Aduan Selesai (Nihil Insiden)"
                  },
                  {
                      "code":  "07",
                      "title":  "Pemeliharaan Sarana SMFR",
                      "description":  "Perawatan berkelanjutan perangkat monitoring tetap, transportable, bergerak, dan alat ukur.",
                      "icon":  "radio-tower",
                      "metric":  "Ketersediaan SMFR 92% (Target 85%)"
                  },
                  {
                      "code":  "08",
                      "title":  "Sertifikasi Operator Radio",
                      "description":  "Ujian Negara Amatir Radio (UNAR CAT) dan sertifikasi maritim nelayan (MOTS/IKRAN/SRC).",
                      "icon":  "file-check-2",
                      "metric":  "101 Lulus UNAR \u0026 97 MOTS"
                  },
                  {
                      "code":  "09",
                      "title":  "Tata Kelola Internal \u0026 BMN",
                      "description":  "Pengelolaan keuangan, kepegawaian ASN, aset negara, persuratan dinas, dan layanan kehumasan.",
                      "icon":  "landmark",
                      "metric":  "Aset BMN Rp46,05 Miliar"
                  }
              ],
    "Count":  9
}
```

---
### legal-bases.json

- **Path:** `frontend/src/lib/data/institution\legal-bases.json`
- **Size:** 822 bytes

**JSON Content:**

```json
{
    "value":  [
                  {
                      "id":  "uu-36-1999",
                      "title":  "Undang-Undang RI No. 36 Tahun 1999 tentang Telekomunikasi."
                  },
                  {
                      "id":  "uu-25-2009",
                      "title":  "Undang-Undang RI No. 25 Tahun 2009 tentang Pelayanan Publik."
                  },
                  {
                      "id":  "perppu-2-2022",
                      "title":  "Peraturan Pemerintah Pengganti Undang-Undang No. 2 Tahun 2022 tentang Cipta Kerja."
                  },
                  {
                      "id":  "permen-1-2022",
                      "title":  "Peraturan Menteri Kominfo No. 1 Tahun 2022 tentang Organisasi dan Tata Kerja UPT Bidang Monitor SFR."
                  },
                  {
                      "id":  "permen-1-2025",
                      "title":  "Peraturan Menteri Komunikasi dan Digital No. 1 Tahun 2025 tentang Organisasi \u0026 Tata Kerja Komdigi."
                  },
                  {
                      "id":  "perdirjen-3-2025",
                      "title":  "Peraturan Direktur Jenderal SDPPI No. 3 Tahun 2025 tentang Tata Cara Pembinaan, Pengawasan, dan Sanksi SFR/APT."
                  }
              ],
    "Count":  6
}
```

---
### organization.json

- **Path:** `frontend/src/lib/data/institution\organization.json`
- **Size:** 1025 bytes

**JSON Content:**

```json
{
    "title":  "Pimpinan \u0026 Tim Kerja Strategis",
    "description":  "Berdasarkan Keputusan Penataan SOTK Ditjen Infrastruktur Digital, Balmon Pekanbaru dijalankan oleh pejabat definitif dan fungsional ahli:",
    "leaders":  [
                    {
                        "name":  "Toninotito, S.T., M.T.",
                        "role":  "Plt. Kepala Balmon SFR Kelas I Pekanbaru",
                        "grade":  "Pengendali Frekuensi Radio Ahli Madya"
                    },
                    {
                        "name":  "Wan Fachrurazi, S.T., M.M.",
                        "role":  "Kepala Subbagian Umum",
                        "grade":  "Pembina - IV/a"
                    },
                    {
                        "name":  "Toninotito, S.T., M.T.",
                        "role":  "Ketua Tim Monitoring \u0026 Penertiban SFR/APT",
                        "grade":  "Pengendali Frekuensi Radio Ahli Madya"
                    },
                    {
                        "name":  "Nofriadi, S.Kom., M.Kom.",
                        "role":  "Ketua Tim Sarpras Monitoring \u0026 Layanan",
                        "grade":  "Pengendali Frekuensi Radio Ahli Muda"
                    },
                    {
                        "name":  "Mulyadi, S.Kom., M.H.",
                        "role":  "Ketua Tim Kualitas Layanan Infrastruktur Digital",
                        "grade":  "Pengendali Frekuensi Radio Ahli Madya"
                    }
                ]
}
```

---
### profile.json

- **Path:** `frontend/src/lib/data/institution\profile.json`
- **Size:** 1724 bytes

**JSON Content:**

```json
{
    "eyebrow":  "Profil Instansi Resmi",
    "name":  "Balai Monitor Spektrum Frekuensi Radio Kelas I Pekanbaru",
    "parentAgency":  "Direktorat Jenderal Infrastruktur Digital, Kementerian Komunikasi dan Digital Republik Indonesia",
    "about":  "Balai Monitor Spektrum Frekuensi Radio Kelas I Pekanbaru merupakan Unit Pelaksana Teknis (UPT) di lingkungan Direktorat Jenderal Infrastruktur Digital, Kementerian Komunikasi dan Digital. Balmon Pekanbaru bertindak sebagai perpanjangan tangan pemerintah di Provinsi Riau yang bertugas melaksanakan pengawasan dan pengendalian spektrum frekuensi radio guna memastikan layanan telekomunikasi yang andal, tertib, aman, dan berkualitas.",
    "vision":  "Terwujudnya Infrastruktur Digital Nasional yang Inklusif, berkualitas, efektif dan efisien serta Berkelanjutan untuk Mendukung Transformasi Digital dalam rangka mewujudkan Asta Cita.",
    "missions":  [
                     "Mendukung percepatan konektivitas digital yang inklusif, berkualitas, dan terjangkau termasuk ekosistem digital yang aman dan berkelanjutan.",
                     "Mendorong pertumbuhan industri yang berkelanjutan dalam mempercepat tersedianya konektivitas digital.",
                     "Meningkatkan pengawasan dan pengendalian dalam rangka mengurangi gangguan, marabahaya, serta peredaran perangkat digital ilegal.",
                     "Meningkatkan profesionalitas dan kapasitas SDM Ditjen Infrastruktur Digital dalam tata kelola yang adaptif dan berintegritas."
                 ],
    "quote":  {
                  "eyebrow":  "Mandat Transformasi Digital",
                  "text":  "Mewujudkan konektivitas digital yang merata, aman, dan bebas interferensi,",
                  "accent":  "Mendukung kedaulatan infrastruktur digital di Provinsi Riau.",
                  "source":  "Renstra Kementerian Komunikasi dan Digital 2025–2029"
              }
}
```

---

## Module: performance

### distribution-2025.json

- **Path:** `frontend/src/lib/data/performance\distribution-2025.json`
- **Size:** 693 bytes

**JSON Content:**

```json
{
    "eyebrow":  "Output Layanan Publik",
    "title":  "Volume perizinan \u0026 sertifikasi",
    "year":  "2025",
    "totalValue":  "451",
    "totalLabel":  "Total Output",
    "gradient":  "conic-gradient(#0874D1 0% 38.8%, #C7942F 38.8% 61.2%, #67C6D2 61.2% 82.7%, #1761A0 82.7% 100%)",
    "items":  [
                  {
                      "label":  "SPP BHP Frekuensi (175)",
                      "color":  "#0874D1",
                      "count":  175
                  },
                  {
                      "label":  "Kelulusan UNAR CAT (101)",
                      "color":  "#C7942F",
                      "count":  101
                  },
                  {
                      "label":  "Layanan Nelayan MOTS (97)",
                      "color":  "#67C6D2",
                      "count":  97
                  },
                  {
                      "label":  "Surat Tagihan Piutang (78)",
                      "color":  "#1761A0",
                      "count":  78
                  }
              ]
}
```

---
### metrics-2025.json

- **Path:** `frontend/src/lib/data/performance\metrics-2025.json`
- **Size:** 2218 bytes

**JSON Content:**

```json
{
    "year":  2025,
    "eyebrow":  "Akuntabilitas Kinerja",
    "title":  {
                  "first":  "Kinerja Nyata",
                  "second":  "untuk Publik."
              },
    "description":  "Data capaian pengawasan spektrum frekuensi radio, pengukuran kualitas layanan, dan sertifikasi publik berdasarkan LAKIP 2025 Balmon Kelas I Pekanbaru.",
    "documentId":  "lap-lakip-2025",
    "metrics":  [
                    {
                        "id":  "monitored-spectrum",
                        "value":  "784 ISR",
                        "label":  "Spektrum Termonitor (12 Kab/Kota)",
                        "caption":  "Termonitor di 12 Kabupaten/Kota",
                        "icon":  "radio-tower"
                    },
                    {
                        "id":  "inspections",
                        "value":  "6.360",
                        "label":  "Inspeksi Stasiun Radio \u0026 Siaran",
                        "caption":  "Inspeksi \u0026 pengukuran teknis",
                        "icon":  "bar-chart-3"
                    },
                    {
                        "id":  "complaint-resolution",
                        "value":  "100%",
                        "label":  "Penanganan Gangguan Radio (SLA 24 Jam)",
                        "caption":  "Tuntas (SLA Respons Cepat 1x24 Jam)",
                        "icon":  "triangle-alert"
                    },
                    {
                        "id":  "ikm",
                        "value":  "3.92 / 4",
                        "label":  "Indeks Kepuasan Masyarakat (IKM A)",
                        "caption":  "Mutu Pelayanan A (Sangat Baik)",
                        "icon":  "file-check-2"
                    },
                    {
                        "id":  "ipak",
                        "value":  "3.96 / 4.00",
                        "label":  "Indeks Integritas (IIPP/IPAK)",
                        "caption":  "Bebas Pungli \u0026 Anti Percaloan",
                        "highlight":  true
                    },
                    {
                        "id":  "prima-aksi",
                        "value":  "2.534 Site",
                        "label":  "Verifikasi Site PrimaAksi",
                        "caption":  "Tercapai 100% Validasi Koordinat"
                    }
                ],
    "chart":  {
                  "eyebrow":  "Kesiapan Sarana SMFR",
                  "title":  "Ketersediaan Operasional Stasiun Monitor (SLA)",
                  "year":  "2025",
                  "months":  [
                                 "Jan",
                                 "Feb",
                                 "Mar",
                                 "Apr",
                                 "Mei",
                                 "Jun",
                                 "Jul",
                                 "Agu",
                                 "Sep",
                                 "Okt",
                                 "Nov",
                                 "Des"
                             ],
                  "averageAvailability":  "Rata-rata 92% (Target 85%)",
                  "targetAvailability":  "85%",
                  "areaPath":  "M0 25 C30 25 50 25 63 25 S100 36 127 36 S170 40 190 40 S230 75 254 75 S290 48 318 48 S360 34 382 34 S420 50 445 50 S490 68 509 68 S550 68 572 68 S615 42 700 40 L700 180 L0 180 Z",
                  "linePath":  "M0 25 C30 25 50 25 63 25 S100 36 127 36 S170 40 190 40 S230 75 254 75 S290 48 318 48 S360 34 382 34 S420 50 445 50 S490 68 509 68 S550 68 572 68 S615 42 700 40"
              }
}
```

---
### reports.json

- **Path:** `frontend/src/lib/data/performance\reports.json`
- **Size:** 276 bytes

**JSON Content:**

```json
{
    "value":  [
                  {
                      "id":  "rep-lakip-2025",
                      "year":  2025,
                      "documentId":  "lap-lakip-2025",
                      "title":  "Laporan Kinerja Balai Monitor Spektrum Frekuensi Radio Kelas I Pekanbaru 2025",
                      "ikm":  3.92,
                      "ipak":  3.96,
                      "slaAvailability":  92.0,
                      "totalOutput":  451
                  }
              ],
    "Count":  1
}
```

---

## Module: public_information

### documents.json

- **Path:** `frontend/src/lib/data/public_information\documents.json`
- **Size:** 5375 bytes

**JSON Content:**

```json
{
    "value":  [
                  {
                      "id":  "layanan-sosialisasi-2026",
                      "title":  "Sosialisasi Tahun 2026",
                      "category":  "layanan",
                      "year":  "2026",
                      "description":  "Folder materi sosialisasi tahun 2026 yang tercantum pada daftar tautan pelayanan Balmon Pekanbaru.",
                      "source":  {
                                     "label":  "Daftar Link Pelayanan Balmon Pekanbaru",
                                     "publisher":  "Balai Monitor Spektrum Frekuensi Radio Kelas I Pekanbaru",
                                     "url":  "https://drive.google.com/drive/folders/15cmOA-3zS3waldyrNESC_OPDb5Grx834?usp=sharing"
                                 }
                  },
                  {
                      "id":  "reg-uu-36-1999",
                      "title":  "Undang-Undang Nomor 36 Tahun 1999 tentang Telekomunikasi",
                      "category":  "regulasi",
                      "year":  "1999",
                      "number":  "UU No. 36 Tahun 1999",
                      "description":  "Dasar hukum penyelenggaraan telekomunikasi di Indonesia.",
                      "source":  {
                                     "label":  "JDIH Kemkomdigi",
                                     "publisher":  "Kementerian Komunikasi dan Digital",
                                     "url":  "https://jdih.komdigi.go.id/produk_hukum/view/id/564/t/undangundang%2Bnomor%2B36%2Btahun%2B1999"
                                 }
                  },
                  {
                      "id":  "reg-uu-14-2008",
                      "title":  "Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik",
                      "category":  "regulasi",
                      "year":  "2008",
                      "number":  "UU No. 14 Tahun 2008",
                      "description":  "Mengatur hak memperoleh informasi serta kewajiban badan publik dalam penyediaan informasi publik.",
                      "source":  {
                                     "label":  "Database Peraturan BPK",
                                     "publisher":  "Badan Pemeriksa Keuangan Republik Indonesia",
                                     "url":  "https://peraturan.bpk.go.id/Details/39047/uu-no-14-tahun2008"
                                 }
                  },
                  {
                      "id":  "reg-pp-61-2010",
                      "title":  "Peraturan Pemerintah Nomor 61 Tahun 2010 tentang Pelaksanaan UU Keterbukaan Informasi Publik",
                      "category":  "regulasi",
                      "year":  "2010",
                      "number":  "PP No. 61 Tahun 2010",
                      "description":  "Peraturan pelaksanaan Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik.",
                      "source":  {
                                     "label":  "Database Peraturan Perundang-undangan",
                                     "publisher":  "Direktorat Jenderal Peraturan Perundang-undangan",
                                     "url":  "https://peraturan.go.id/id/pp-no-61-tahun-2010"
                                 }
                  },
                  {
                      "id":  "reg-pp-46-2021",
                      "title":  "Peraturan Pemerintah Nomor 46 Tahun 2021 tentang Pos, Telekomunikasi, dan Penyiaran",
                      "category":  "regulasi",
                      "year":  "2021",
                      "number":  "PP No. 46 Tahun 2021",
                      "description":  "Mengatur penyelenggaraan pos, telekomunikasi, penggunaan spektrum frekuensi radio, dan penyiaran.",
                      "source":  {
                                     "label":  "Database Peraturan BPK",
                                     "publisher":  "Badan Pemeriksa Keuangan Republik Indonesia",
                                     "url":  "https://peraturan.bpk.go.id/Details/161970/pp-no-46-tahun-2021"
                                 }
                  },
                  {
                      "id":  "reg-permen-8-2026",
                      "title":  "Peraturan Menteri Komunikasi dan Digital Nomor 8 Tahun 2026 tentang Tabel Alokasi Spektrum Frekuensi Radio Indonesia",
                      "category":  "regulasi",
                      "year":  "2026",
                      "number":  "Permen Komdigi No. 8 Tahun 2026",
                      "description":  "Ketentuan Tabel Alokasi Spektrum Frekuensi Radio Indonesia yang berstatus berlaku.",
                      "source":  {
                                     "label":  "JDIH Kemkomdigi",
                                     "publisher":  "Kementerian Komunikasi dan Digital",
                                     "url":  "https://jdih.komdigi.go.id/produk_hukum/view/id/1005/t/peraturan%2Bmenteri%2Bkomunikasi%2Bdan%2Bdigital%2Bnomor%2B8%2Btahun%2B2026"
                                 }
                  },
                  {
                      "id":  "layanan-penanganan-gangguan",
                      "title":  "Prosedur Penanganan Gangguan Spektrum Frekuensi Radio",
                      "category":  "layanan",
                      "year":  "2026",
                      "description":  "Informasi resmi mengenai prosedur penanganan gangguan spektrum frekuensi radio.",
                      "source":  {
                                     "label":  "Direktorat Jenderal Infrastruktur Digital",
                                     "publisher":  "Kementerian Komunikasi dan Digital",
                                     "url":  "https://infradigital.komdigi.go.id/artikel-monitoring-spektrum-frekuensi-radio-prosedur-penanganan-gangguan-11-610"
                                 }
                  },
                  {
                      "id":  "layanan-standar-pelayanan",
                      "title":  "Standar Pelayanan Direktorat Jenderal Infrastruktur Digital",
                      "category":  "layanan",
                      "year":  "2026",
                      "description":  "Halaman resmi standar pelayanan spektrum frekuensi radio dan layanan terkait.",
                      "source":  {
                                     "label":  "Direktorat Jenderal Infrastruktur Digital",
                                     "publisher":  "Kementerian Komunikasi dan Digital",
                                     "url":  "https://infradigital.komdigi.go.id/artikel-standar-pelayanan-116-5241"
                                 }
                  },
                  {
                      "id":  "lap-lakip-2025",
                      "title":  "Laporan Kinerja Balai Monitor Spektrum Frekuensi Radio Kelas I Pekanbaru 2025",
                      "category":  "laporan",
                      "year":  "2025",
                      "description":  "Laporan Kinerja Balai Monitor Spektrum Frekuensi Radio Kelas I Pekanbaru Tahun 2025.",
                      "source":  {
                                     "label":  "Direktorat Jenderal Infrastruktur Digital",
                                     "publisher":  "Kementerian Komunikasi dan Digital",
                                     "url":  "https://infradigital.komdigi.go.id/publikasi-lakip-balai-monitor-kelas-i-pekanbaru-84"
                                 }
                  },
                  {
                      "id":  "lap-lakip-2024",
                      "title":  "Laporan Kinerja Balai Monitor Spektrum Frekuensi Radio Kelas I Pekanbaru 2024",
                      "category":  "laporan",
                      "year":  "2024",
                      "description":  "Laporan Kinerja Balai Monitor Spektrum Frekuensi Radio Kelas I Pekanbaru Tahun 2024.",
                      "source":  {
                                     "label":  "Direktorat Jenderal Infrastruktur Digital",
                                     "publisher":  "Kementerian Komunikasi dan Digital",
                                     "url":  "https://infradigital.komdigi.go.id/publikasi-lakip-balai-monitor-kelas-i-pekanbaru-84"
                                 }
                  }
              ],
    "Count":  10
}
```

---
### ppid.json

- **Path:** `frontend/src/lib/data/public_information\ppid.json`
- **Size:** 1582 bytes

**JSON Content:**

```json
{
    "eyebrow":  "Keterbukaan Informasi Publik",
    "title":  "PPID Kementerian Komunikasi dan Digital",
    "description":  "Layanan resmi Kementerian Komunikasi dan Digital untuk mengakses serta mengajukan permintaan informasi publik.",
    "legalBasis":  "Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik",
    "procedures":  [
                       {
                           "step":  "1. Akses layanan ePPID",
                           "detail":  "Buka layanan Permintaan Informasi pada portal resmi ePPID Kementerian Komunikasi dan Digital."
                       },
                       {
                           "step":  "2. Lengkapi informasi permohonan",
                           "detail":  "Isi identitas pemohon serta informasi yang dibutuhkan sesuai formulir resmi permintaan informasi publik."
                       },
                       {
                           "step":  "3. Pilih cara memperoleh informasi",
                           "detail":  "Formulir resmi menyediakan pilihan cara memperoleh dan menerima informasi sesuai kanal yang tersedia."
                       }
                   ],
    "rights":  [
                   "Memperoleh informasi publik sesuai ketentuan peraturan perundang-undangan.",
                   "Mendapatkan salinan informasi publik melalui permintaan informasi.",
                   "Mengajukan keberatan atau penyelesaian sengketa informasi sesuai mekanisme yang berlaku."
               ],
    "contact":  {
                    "officer":  "PPID Kementerian Komunikasi dan Digital",
                    "email":  "pelayanan@mail.komdigi.go.id",
                    "phone":  "0811-56-3344",
                    "deskLocation":  "Gedung B Lantai 1, Kementerian Komunikasi dan Digital, Jl. Medan Merdeka Barat No. 9, Jakarta Pusat"
                },
    "source":  {
                   "label":  "ePPID Kemkomdigi",
                   "publisher":  "Kementerian Komunikasi dan Digital",
                   "url":  "https://eppid.komdigi.go.id/beranda"
               }
}
```

---

## Module: publications

### articles.json

- **Path:** `frontend/src/lib/data/publications\articles.json`
- **Size:** 10742 bytes

**JSON Content:**

```json
{
    "value":  [
                  {
                      "id":  "news-gnss-2026",
                      "slug":  "mitigasi-gangguan-gnss-keselamatan-penerbangan",
                      "title":  "Komdigi, Kemhan, dan TNI AU Perkuat Mitigasi Gangguan GNSS untuk Keselamatan Penerbangan",
                      "excerpt":  "Komdigi bersama Kemhan dan TNI AU melakukan pengujian teknis untuk memperkuat mitigasi gangguan spektrum pada layanan GNSS.",
                      "content":  [
                                      "Pengujian dilakukan untuk mengetahui karakteristik pancaran perangkat anti-drone atau jammer serta dampaknya terhadap penerimaan sinyal GNSS yang digunakan dalam berbagai kebutuhan navigasi.",
                                      "Hasil pengukuran digunakan sebagai bahan analisis untuk memperkuat koordinasi dan menentukan langkah mitigasi gangguan, khususnya yang berkaitan dengan keselamatan penerbangan."
                                  ],
                      "publishedAt":  "2026-10-01",
                      "category":  "Pengendalian Spektrum",
                      "source":  {
                                     "label":  "Direktorat Jenderal Infrastruktur Digital",
                                     "publisher":  "Kementerian Komunikasi dan Digital",
                                     "url":  "https://infradigital.komdigi.go.id/berita-komdigi-kemhan-dan-tni-au-perkuat-mitigasi-gangguan-gnss-untuk-keselamatan-penerbangan-27-6862"
                                 },
                      "image":  {
                                    "type":  "url",
                                    "url":  "https://postel.go.id/uploads/pages/20261006080955-GNSS_1.jpg",
                                    "alt":  "Mitigasi gangguan GNSS untuk keselamatan penerbangan",
                                    "width":  1600,
                                    "height":  900
                                },
                      "featured":  true,
                      "published":  true
                  },
                  {
                      "id":  "news-tertib-spektrum-2026",
                      "slug":  "spektrum-tertib-komunikasi-lancar",
                      "title":  "Spektrum Tertib, Komunikasi Lancar: Jaga Frekuensi Radio untuk Layanan Masyarakat",
                      "excerpt":  "Ketertiban penggunaan spektrum dan kepatuhan sertifikasi perangkat menjadi bagian penting dalam menjaga layanan komunikasi tetap andal.",
                      "content":  [
                                      "Spektrum frekuensi radio merupakan sumber daya yang terbatas dan strategis serta digunakan untuk berbagai kebutuhan, termasuk transportasi, logistik, industri, keamanan, dan penanggulangan bencana.",
                                      "Penggunaan frekuensi tanpa izin, tidak sesuai ISR, atau menggunakan perangkat yang belum memenuhi ketentuan dapat meningkatkan risiko interferensi dan menurunkan kualitas layanan komunikasi."
                                  ],
                      "publishedAt":  "2026-09-22",
                      "category":  "Edukasi \u0026 Kepatuhan",
                      "source":  {
                                     "label":  "Direktorat Jenderal Infrastruktur Digital",
                                     "publisher":  "Kementerian Komunikasi dan Digital",
                                     "url":  "https://infradigital.komdigi.go.id/berita-spektrum-tertib-komunikasi-lancar-jaga-frekuensi-radio-untuk-layanan-masyarakat-27-6855"
                                 },
                      "image":  {
                                    "type":  "url",
                                    "url":  "https://www.postel.go.id/uploads/pages/20240323114127-IMG_2745.JPG",
                                    "alt":  "Ketertiban penggunaan spektrum frekuensi radio",
                                    "width":  1600,
                                    "height":  900
                                },
                      "featured":  true,
                      "published":  true
                  },
                  {
                      "id":  "news-jcc-2026",
                      "slug":  "koordinasi-spektrum-indonesia-malaysia-2026",
                      "title":  "Indonesia–Malaysia Perkuat Koordinasi Spektrum Frekuensi Radio",
                      "excerpt":  "Indonesia dan Malaysia memperkuat koordinasi pengelolaan spektrum untuk meminimalkan interferensi di wilayah perbatasan.",
                      "content":  [
                                      "The 23rd Meeting of the Joint Committee on Communications membahas koordinasi penggunaan spektrum, registrasi dan notifikasi frekuensi, serta sejumlah pita yang digunakan untuk layanan komunikasi.",
                                      "Koordinasi lintas batas diperlukan agar pemanfaatan spektrum tetap efisien sekaligus meminimalkan potensi interferensi yang dapat memengaruhi kualitas komunikasi masyarakat."
                                  ],
                      "publishedAt":  "2026-09-18",
                      "category":  "Koordinasi Spektrum",
                      "source":  {
                                     "label":  "Direktorat Jenderal Infrastruktur Digital",
                                     "publisher":  "Kementerian Komunikasi dan Digital",
                                     "url":  "https://infradigital.komdigi.go.id/berita-jaga-kualitas-komunikasi-di-perbatasan-indonesia-malaysia-perkuat-koordinasi-spektrum-frekuensi-radio-27-6852"
                                 },
                      "image":  {
                                    "type":  "url",
                                    "url":  "https://postel.go.id/uploads/pages/20240820111751-IWN07996.JPG",
                                    "alt":  "Koordinasi spektrum frekuensi radio Indonesia dan Malaysia",
                                    "width":  1600,
                                    "height":  900
                                },
                      "featured":  true,
                      "published":  true
                  },
                  {
                      "id":  "news-kabalmon-pekanbaru-2026",
                      "slug":  "pelantikan-kepala-balmon-pekanbaru-2026",
                      "title":  "Nikolas, S.T., M.H. Dilantik sebagai Kepala Balai Monitor Pekanbaru",
                      "excerpt":  "Pelantikan Kepala UPT Ditjen Infrastruktur Digital menetapkan Nikolas, S.T., M.H. sebagai Kepala Balai Monitor Spektrum Frekuensi Radio dan Infrastruktur Digital Kelas I Pekanbaru.",
                      "content":  [
                                      "Menteri Komunikasi dan Digital melantik pejabat administrator dan pengawas di lingkungan Kemkomdigi pada Agustus 2026.",
                                      "Dalam daftar 35 Kepala UPT yang menerima amanah, Nikolas, S.T., M.H. ditetapkan sebagai Kepala Balai Monitor Spektrum Frekuensi Radio dan Infrastruktur Digital Kelas I Pekanbaru."
                                  ],
                      "publishedAt":  "2026-08-27",
                      "category":  "Organisasi",
                      "source":  {
                                     "label":  "Direktorat Jenderal Infrastruktur Digital",
                                     "publisher":  "Kementerian Komunikasi dan Digital",
                                     "url":  "https://infradigital.komdigi.go.id/berita-menkomdigi-lantik-pejabat-administrator-dan-pengawas-perkuat-kinerja-kemkomdigi-27-6829"
                                 },
                      "image":  {
                                    "type":  "url",
                                    "url":  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRcoiMPyBLsL8N8QQ5ljbpyF5JJ0dpru09yndMlFR9pnrCMMqPlJ_zTe0\u0026s=10",
                                    "alt":  "Pelantikan Kepala Balai Monitor Pekanbaru",
                                    "width":  1600,
                                    "height":  900
                                },
                      "featured":  false,
                      "published":  true
                  },
                  {
                      "id":  "news-standar-layanan-2026",
                      "slug":  "konsultasi-standar-layanan-pengawasan-telekomunikasi",
                      "title":  "Komdigi Libatkan Publik untuk Perkuat Standar Layanan Pengawasan Telekomunikasi",
                      "excerpt":  "DJID melibatkan pemangku kepentingan dalam forum konsultasi publik mengenai standar pelayanan pengawasan telekomunikasi dan spektrum.",
                      "content":  [
                                      "Forum membahas rancangan standar untuk layanan pengawasan kualitas telekomunikasi serta pengawasan dan pengendalian spektrum frekuensi radio.",
                                      "Rancangan tersebut dibahas bersama berbagai pemangku kepentingan sebelum disempurnakan dan ditetapkan untuk pelaksanaan pelayanan."
                                  ],
                      "publishedAt":  "2026-08-07",
                      "category":  "Pelayanan Publik",
                      "source":  {
                                     "label":  "Direktorat Jenderal Infrastruktur Digital",
                                     "publisher":  "Kementerian Komunikasi dan Digital",
                                     "url":  "https://infradigital.komdigi.go.id/berita-komdigi-libatkan-publik-untuk-perkuat-standar-layanan-pengawasan-telekomunikasi-27-6793"
                                 },
                      "image":  {
                                    "type":  "url",
                                    "url":  "https://postel.go.id/uploads/pages/20260807173032-DSC04990.JPG",
                                    "alt":  "Konsultasi publik standar layanan pengawasan telekomunikasi",
                                    "width":  1600,
                                    "height":  900
                                },
                      "featured":  false,
                      "published":  true
                  },
                  {
                      "id":  "news-tertib-frekuensi-2026",
                      "slug":  "tertib-frekuensi-fondasi-infrastruktur-digital",
                      "title":  "Tertib Frekuensi, Fondasi Infrastruktur Digital Indonesia yang Andal",
                      "excerpt":  "Komdigi memperkuat pengawasan penggunaan spektrum dan perangkat telekomunikasi untuk menjaga layanan komunikasi tetap andal.",
                      "content":  [
                                      "Penggunaan frekuensi tanpa ISR, parameter teknis yang tidak sesuai, dan perangkat yang belum memenuhi standar dapat memicu harmful interference.",
                                      "Pengawasan dan penegakan ketentuan diarahkan untuk mendorong kepatuhan serta menjaga kualitas layanan telekomunikasi masyarakat."
                                  ],
                      "publishedAt":  "2026-07-24",
                      "category":  "Pengendalian Spektrum",
                      "source":  {
                                     "label":  "Direktorat Jenderal Infrastruktur Digital",
                                     "publisher":  "Kementerian Komunikasi dan Digital",
                                     "url":  "https://infradigital.komdigi.go.id/berita-tertib-frekuensi-fondasi-infrastruktur-digital-indonesia-yang-andal-27-6789"
                                 },
                      "image":  {
                                    "type":  "url",
                                    "url":  "https://jdih.komdigi.go.id/storage/infografis/1706174712-Penggunaan_Spektrum_Frekuensi_Radio.png",
                                    "alt":  "Ilustrasi tertib penggunaan spektrum frekuensi radio",
                                    "width":  1600,
                                    "height":  900
                                },
                      "featured":  false,
                      "published":  true
                  },
                  {
                      "id":  "news-pemusnahan-balmon-2024",
                      "slug":  "balmon-pekanbaru-musnahkan-62-perangkat",
                      "title":  "Balmon Pekanbaru Musnahkan 62 Perangkat Telekomunikasi Tidak Bersertifikat",
                      "excerpt":  "Balmon Pekanbaru memusnahkan 62 alat dan perangkat telekomunikasi hasil penertiban dan pengawasan periode 2022–2023.",
                      "content":  [
                                      "Perangkat yang dimusnahkan terdiri atas pemancar FM rakitan, handy talky, RLAN, serta wireless outdoor 5,8 GHz.",
                                      "Kegiatan dilakukan setelah proses pendataan, verifikasi dokumen, gelar perkara, serta tahapan administratif terhadap perangkat yang diamankan."
                                  ],
                      "publishedAt":  "2024-12-17",
                      "category":  "Penertiban",
                      "source":  {
                                     "label":  "Direktorat Jenderal Infrastruktur Digital",
                                     "publisher":  "Kementerian Komunikasi dan Digital",
                                     "url":  "https://infradigital.komdigi.go.id/berita-balmon-pekanbaru-musnahkan-62-perangkat-telekomunikasi-tidak-bersertifikat-27-6386"
                                 },
                      "image":  {
                                    "type":  "url",
                                    "url":  "https://www.postel.go.id/uploads/pages/20241217123938-p9.jpg",
                                    "alt":  "Pemusnahan perangkat telekomunikasi oleh Balmon Pekanbaru",
                                    "width":  1600,
                                    "height":  900
                                },
                      "featured":  true,
                      "published":  true
                  },
                  {
                      "id":  "news-k3-balmon-2024",
                      "slug":  "pelatihan-k3-upt-balmon-2024",
                      "title":  "Ditjen SDPPI Bekali Pegawai UPT dengan Pelatihan K3 Ketinggian",
                      "excerpt":  "Pegawai dari berbagai UPT termasuk Balmon Pekanbaru mengikuti pelatihan keselamatan kerja untuk mendukung pekerjaan teknis lapangan.",
                      "content":  [
                                      "Pelatihan berlangsung pada September 2024 dan diikuti perwakilan UPT monitoring spektrum dari sejumlah wilayah, termasuk Pekanbaru.",
                                      "Materi berfokus pada keselamatan bekerja di ketinggian, penggunaan perangkat akses tali, serta praktik keselamatan yang relevan untuk pekerjaan teknis UPT."
                                  ],
                      "publishedAt":  "2024-10-01",
                      "category":  "SDM",
                      "source":  {
                                     "label":  "Direktorat Jenderal Infrastruktur Digital",
                                     "publisher":  "Kementerian Komunikasi dan Digital",
                                     "url":  "https://infradigital.komdigi.go.id/berita-miliki-tugas-dan-fungsi-teknis-lapangan-ditjen-sdppi-bekali-ilmu-k3-pada-pegawai-27-6316"
                                 },
                      "image":  {
                                    "type":  "url",
                                    "url":  "https://www.postel.go.id/uploads/pages/20241009154629-k3.jpg",
                                    "alt":  "Pelatihan K3 ketinggian bagi pegawai UPT monitoring spektrum",
                                    "width":  1600,
                                    "height":  900
                                },
                      "featured":  false,
                      "published":  true
                  }
              ],
    "Count":  8
}
```

---
### education.json

- **Path:** `frontend/src/lib/data/publications\education.json`
- **Size:** 7885 bytes

**JSON Content:**

```json
{
    "value":  [
                  {
                      "id":  "edu-spektrum",
                      "slug":  "mengenal-spektrum-frekuensi-radio",
                      "title":  "Apa Itu Spektrum Frekuensi Radio?",
                      "summary":  "Spektrum frekuensi radio merupakan sumber daya alam yang terbatas dan strategis sehingga penggunaannya perlu diatur dan dikelola.",
                      "content":  [
                                      "Spektrum frekuensi radio digunakan oleh berbagai sistem komunikasi nirkabel dan menjadi sumber daya yang digunakan bersama.",
                                      "Pengelolaannya perlu dilakukan secara efisien agar berbagai layanan dapat beroperasi sesuai alokasi serta meminimalkan interferensi."
                                  ],
                      "icon":  "waves",
                      "source":  {
                                     "label":  "JDIH Kemkomdigi",
                                     "publisher":  "Kementerian Komunikasi dan Digital",
                                     "url":  "https://jdih.komdigi.go.id/produk_hukum/view/id/1005/t/peraturan%2Bmenteri%2Bkomunikasi%2Bdan%2Bdigital%2Bnomor%2B8%2Btahun%2B2026"
                                 },
                      "image":  {
                                    "type":  "url",
                                    "url":  "https://radiokomunikasi.com/wp-content/uploads/2023/06/bands-radio-frequency-spectrum.webp",
                                    "alt":  "Ilustrasi edukasi spektrum frekuensi radio"
                                }
                  },
                  {
                      "id":  "edu-isr",
                      "slug":  "mengapa-penggunaan-frekuensi-harus-tertib",
                      "title":  "Mengapa Penggunaan Frekuensi Harus Tertib?",
                      "summary":  "Penggunaan frekuensi yang tidak sesuai izin atau parameter teknis dapat menimbulkan interferensi terhadap pengguna lain.",
                      "content":  [
                                      "Penggunaan frekuensi perlu mengikuti izin dan parameter teknis yang berlaku agar tidak mengganggu layanan komunikasi lain.",
                                      "Kepatuhan terhadap ISR dan ketentuan teknis merupakan bagian dari upaya menjaga kualitas komunikasi yang menggunakan spektrum bersama."
                                  ],
                      "icon":  "radio-tower",
                      "source":  {
                                     "label":  "Direktorat Jenderal Infrastruktur Digital",
                                     "publisher":  "Kementerian Komunikasi dan Digital",
                                     "url":  "https://infradigital.komdigi.go.id/berita-spektrum-tertib-komunikasi-lancar-jaga-frekuensi-radio-untuk-layanan-masyarakat-27-6855"
                                 },
                      "image":  {
                                    "type":  "url",
                                    "url":  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-HPqI3AixZqkUSUduX8jzF6-ohmweW8EBseo5vuF8qI3_gZXpgBBcA24\u0026s=10",
                                    "alt":  "Ilustrasi ketertiban penggunaan frekuensi radio"
                                },
                      "videoId":  "j7YUD0ZfuRw"
                  },
                  {
                      "id":  "edu-gangguan",
                      "slug":  "cara-penanganan-gangguan-spektrum",
                      "title":  "Bagaimana Gangguan Spektrum Ditangani?",
                      "summary":  "DJID menyediakan prosedur resmi penanganan gangguan spektrum frekuensi radio melalui kegiatan monitoring dan tindak lanjut teknis.",
                      "content":  [
                                      "Gangguan spektrum perlu dilaporkan melalui kanal resmi agar informasi teknis dapat diverifikasi dan ditindaklanjuti.",
                                      "UPT monitoring spektrum memiliki peran dalam pemantauan, pelacakan, pengukuran, dan penanganan sumber gangguan sesuai prosedur."
                                  ],
                      "icon":  "radar",
                      "source":  {
                                     "label":  "Direktorat Jenderal Infrastruktur Digital",
                                     "publisher":  "Kementerian Komunikasi dan Digital",
                                     "url":  "https://infradigital.komdigi.go.id/artikel-monitoring-spektrum-frekuensi-radio-prosedur-penanganan-gangguan-11-610"
                                 },
                      "image":  {
                                    "type":  "url",
                                    "url":  "https://postel.go.id/uploads/pages/20241218003332-Picture1.png",
                                    "alt":  "Ilustrasi penanganan gangguan spektrum frekuensi radio"
                                }
                  },
                  {
                      "id":  "edu-repeater",
                      "slug":  "repeater-seluler-ilegal",
                      "title":  "Mengapa Repeater Seluler Ilegal Bisa Mengganggu Jaringan?",
                      "summary":  "Repeater yang digunakan tanpa pengaturan yang tepat dapat menghasilkan pancaran yang mengganggu jaringan telekomunikasi di sekitarnya.",
                      "content":  [
                                      "Perangkat repeater memperkuat dan memancarkan ulang sinyal seluler. Penggunaan yang tidak terkontrol dapat mengganggu performa jaringan operator.",
                                      "Pemerintah melakukan monitoring dan penertiban terhadap penggunaan repeater yang tidak memenuhi ketentuan."
                                  ],
                      "icon":  "triangle-alert",
                      "source":  {
                                     "label":  "Direktorat Jenderal Infrastruktur Digital",
                                     "publisher":  "Kementerian Komunikasi dan Digital",
                                     "url":  "https://infradigital.komdigi.go.id/berita-gangguan-jaringan-telekomunikasi-akibat-penggunaan-repeater-seluler-26-2093"
                                 },
                      "image":  {
                                    "type":  "url",
                                    "url":  "https://postel.go.id/uploads/pages/20140102103108-mini-repeater-application.jpg",
                                    "alt":  "Ilustrasi gangguan jaringan akibat repeater seluler"
                                }
                  },
                  {
                      "id":  "edu-sertifikasi",
                      "slug":  "sertifikasi-perangkat-telekomunikasi",
                      "title":  "Mengapa Perangkat Telekomunikasi Perlu Tersertifikasi?",
                      "summary":  "Sertifikasi membantu memastikan perangkat yang digunakan di Indonesia memenuhi persyaratan teknis dan tidak menimbulkan interferensi.",
                      "content":  [
                                      "Sertifikasi alat dan perangkat telekomunikasi merupakan bagian dari pelayanan pemerintah untuk memastikan kesesuaian perangkat dengan persyaratan teknis.",
                                      "Pengujian dan sertifikasi membantu menjaga interoperabilitas serta mengurangi risiko gangguan ketika perangkat digunakan pada jaringan telekomunikasi."
                                  ],
                      "icon":  "shield-check",
                      "source":  {
                                     "label":  "Direktorat Jenderal Infrastruktur Digital",
                                     "publisher":  "Kementerian Komunikasi dan Digital",
                                     "url":  "https://infradigital.komdigi.go.id/artikel-hasil-survey-pelayanan-publik-1-2233"
                                 },
                      "image":  {
                                    "type":  "url",
                                    "url":  "https://sertifikatsdppi.id/wp-content/uploads/2023/02/foto-untuk-diisi-artikel-Tarif-1024x576.png",
                                    "alt":  "Ilustrasi sertifikasi perangkat telekomunikasi"
                                }
                  },
                  {
                      "id":  "edu-tasfri",
                      "slug":  "mengenal-tasfri-2026",
                      "title":  "Mengenal TASFRI 2026",
                      "summary":  "TASFRI menjadi pedoman pengalokasian pita frekuensi radio di Indonesia dan mengacu pada Radio Regulations ITU edisi 2024.",
                      "content":  [
                                      "Peraturan Menteri Komunikasi dan Digital Nomor 8 Tahun 2026 mengatur Tabel Alokasi Spektrum Frekuensi Radio Indonesia.",
                                      "Tabel ini digunakan sebagai pedoman perencanaan, pengelolaan, dan pemanfaatan spektrum frekuensi radio di Indonesia."
                                  ],
                      "icon":  "table-properties",
                      "source":  {
                                     "label":  "JDIH Kemkomdigi",
                                     "publisher":  "Kementerian Komunikasi dan Digital",
                                     "url":  "https://jdih.komdigi.go.id/produk_hukum/view/id/1005/t/peraturan%2Bmenteri%2Bkomunikasi%2Bdan%2Bdigital%2Bnomor%2B8%2Btahun%2B2026"
                                 },
                      "image":  {
                                    "type":  "url",
                                    "url":  "https://justisio.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fjustisio-public-asset%2Falokasi-spektrum-frekuensi-radio-indonesia-klasifikasi-dan-kerangka-pengelolaan-berdasarkan-permenkomdigital-no-8-2026-691880.webp\u0026w=3840\u0026q=75",
                                    "alt":  "Ilustrasi Tabel Alokasi Spektrum Frekuensi Radio Indonesia 2026"
                                }
                  },
                  {
                      "id":  "edu-gnss",
                      "slug":  "gangguan-gnss-dan-keselamatan-penerbangan",
                      "title":  "Gangguan GNSS dan Keselamatan Penerbangan",
                      "summary":  "Interferensi pada sinyal navigasi satelit perlu diidentifikasi dan dimitigasi karena GNSS digunakan dalam operasional penerbangan.",
                      "content":  [
                                      "GNSS menyediakan informasi posisi, navigasi, dan waktu yang digunakan untuk berbagai kebutuhan termasuk penerbangan.",
                                      "Pengukuran teknis terhadap sumber pancaran membantu pemerintah memahami karakteristik gangguan dan menentukan langkah mitigasi."
                                  ],
                      "icon":  "plane",
                      "source":  {
                                     "label":  "Direktorat Jenderal Infrastruktur Digital",
                                     "publisher":  "Kementerian Komunikasi dan Digital",
                                     "url":  "https://infradigital.komdigi.go.id/berita-komdigi-kemhan-dan-tni-au-perkuat-mitigasi-gangguan-gnss-untuk-keselamatan-penerbangan-27-6862"
                                 },
                      "image":  {
                                    "type":  "url",
                                    "url":  "https://media.springernature.com/m685/springer-static/image/art%3A10.1038%2Fs44453-025-00011-y/MediaObjects/44453_2025_11_Fig1_HTML.png",
                                    "alt":  "Ilustrasi gangguan GNSS dan keselamatan penerbangan"
                                }
                  }
              ],
    "Count":  7
}
```

---
### featured-video.json

- **Path:** `frontend/src/lib/data/publications\featured-video.json`
- **Size:** 457 bytes

**JSON Content:**

```json
{
    "id":  "j7YUD0ZfuRw",
    "eyebrow":  "Video Resmi",
    "title":  "Perkuat Pengendalian Telekomunikasi Lewat Operasi “Langit Bersih”",
    "ariaLabel":  "Putar video resmi Operasi Langit Bersih 2026",
    "youtubeUrl":  "https://www.youtube.com/watch?v=j7YUD0ZfuRw",
    "embedUrl":  "https://www.youtube-nocookie.com/embed/j7YUD0ZfuRw?rel=0",
    "thumbnailUrl":  "https://i.ytimg.com/vi/j7YUD0ZfuRw/hqdefault.jpg",
    "thumbnailAlt":  "Operasi Langit Bersih 2026"
}
```

---

## Module: services

### catalog.json

- **Path:** `frontend/src/lib/data/services\catalog.json`
- **Size:** 3110 bytes

**JSON Content:**

```json
{
    "value":  [
                  {
                      "id":  "pengukuran",
                      "slug":  "pengukuran",
                      "title":  "Permohonan Pengukuran Spektrum",
                      "summary":  "Layanan pengukuran dan monitoring spektrum frekuensi radio.",
                      "description":  "Layanan pengukuran teknis parameter pancaran gelombang elektromagnetik, level daya, deviasi frekuensi, dan harmonisa untuk memastikan stasiun radio pemancar beroperasi sesuai spesifikasi teknis izin.",
                      "icon":  "ruler",
                      "featured":  true,
                      "homeOrder":  1,
                      "active":  true,
                      "requirements":  [
                                           "Memiliki Izin Stasiun Radio (ISR) yang masih berlaku",
                                           "Surat permohonan resmi dari instansi / badan hukum pemegang izin",
                                           "Data teknis perangkat pemancar dan titik koordinat stasiun"
                                       ],
                      "steps":  [
                                    "Pengajuan surat permohonan pengukuran ke Balmon Pekanbaru",
                                    "Verifikasi dokumen dan penjadwalan tim teknis lapangan",
                                    "Pelaksanaan pengukuran menggunakan alat ukur terkalibrasi",
                                    "Penerbitan Berita Acara / Laporan Hasil Pengukuran (LHP)"
                                ]
                  },
                  {
                      "id":  "sertifikasi",
                      "slug":  "sertifikasi",
                      "title":  "Sertifikasi \u0026 Standardisasi Perangkat",
                      "summary":  "Informasi dan fasilitasi sertifikasi perangkat telekomunikasi.",
                      "description":  "Panduan dan verifikasi kepatuhan sertifikasi alat dan perangkat telekomunikasi (Postel/SDPPI) yang beredar atau digunakan di wilayah Riau guna mencegah radiasi interferensi liar.",
                      "icon":  "radio",
                      "featured":  true,
                      "homeOrder":  2,
                      "active":  true,
                      "requirements":  [
                                           "Dokumen spesifikasi teknis alat / perangkat telekomunikasi",
                                           "Sertifikat tipe atau laporan hasil uji laboratorium terakreditasi",
                                           "Label sertifikasi SDPPI pada kemasan dan perangkat"
                                       ],
                      "officialUrl":  "https://sertifikasi.postel.go.id"
                  },
                  {
                      "id":  "konsultasi",
                      "slug":  "konsultasi",
                      "title":  "Konsultasi Spektrum Frekuensi",
                      "summary":  "Konsultasi teknis penggunaan spektrum dan koordinasi frekuensi.",
                      "description":  "Layanan asistensi bagi instansi pemerintah, BUMN, swasta, dan masyarakat mengenai ketersediaan kanal frekuensi, perencanaan penempatan antena, serta pencegahan interferensi.",
                      "icon":  "message-circle",
                      "featured":  true,
                      "homeOrder":  3,
                      "active":  true,
                      "requirements":  [
                                           "Identitas pemohon atau perwakilan instansi",
                                           "Rincian kebutuhan penggunaan jaringan radio telekomunikasi"
                                       ],
                      "officialUrl":  "https://api.whatsapp.com/send/?phone=628117512748\u0026text\u0026type=phone_number\u0026app_absent=0"
                  },
                  {
                      "id":  "perizinan",
                      "slug":  "perizinan",
                      "title":  "Informasi Perizinan Stasiun Radio (ISR)",
                      "summary":  "Panduan dan alur perizinan frekuensi radio melalui e-Licensing SDPPI.",
                      "description":  "Fasilitasi informasi alur penerbitan, perpanjangan, dan pembayaran Biaya Hak Penggunaan (BHP) Frekuensi Radio melalui sistem perizinan terintegrasi e-Licensing / SIMS Ditjen SDPPI.",
                      "icon":  "file-text",
                      "featured":  true,
                      "homeOrder":  4,
                      "active":  true,
                      "officialUrl":  "https://isr.postel.go.id/"
                  }
              ],
    "Count":  4
}
```

---
### complaint.json

- **Path:** `frontend/src/lib/data/services\complaint.json`
- **Size:** 1997 bytes

**JSON Content:**

```json
{
    "eyebrow":  "Layanan Bebas Biaya",
    "title":  "Pengaduan Gangguan Frekuensi Radio",
    "description":  "Layanan prioritas penanganan laporan interferensi frekuensi radio untuk menjaga ketertiban, keselamatan penerbangan, maritim, dan keandalan komunikasi publik di Provinsi Riau.",
    "actionLabel":  "Hubungi Kanal Aduan",
    "requiredInformation":  [
                                "Identitas resmi pelapor dan kontak penanggung jawab teknis stasiun radio",
                                "Nomor Izin Stasiun Radio (ISR) yang sah dan masih aktif",
                                "Frekuensi kerja yang mengalami gangguan (misal: 121.5 MHz, 850 MHz, dll.)",
                                "Lokasi stasiun pemancar dan area sebaran terjadinya interferensi",
                                "Karakteristik gangguan (bunyi dengung, siaran tumpang tindih, intermodulasi, atau sinyal mati total)",
                                "Waktu dan durasi terjadinya gangguan (terus-menerus atau waktu tertentu)"
                            ],
    "steps":  [
                  {
                      "title":  "1. Pemeriksaan Mandiri",
                      "detail":  "Pastikan instalasi internal, kabel feeder, konektor, filter, dan antena pemancar Anda dalam kondisi prima."
                  },
                  {
                      "title":  "2. Pengumpulan Bukti Awal",
                      "detail":  "Catat jam terjadinya interferensi dan rekam sampel audio atau foto tampilan layar spectrum analyzer bila tersedia."
                  },
                  {
                      "title":  "3. Penyampaian Laporan",
                      "detail":  "Sampaikan laporan resmi melalui email, telepon hotline aduan, atau loket pelayanan Balmon Pekanbaru."
                  },
                  {
                      "title":  "4. Observasi \u0026 Pelacakan Lapangan",
                      "detail":  "Tim teknis Balmon bergerak ke titik lokasi menggunakan stasiun pemonitor bergerak (Mobile Direction Finding)."
                  },
                  {
                      "title":  "5. Tindakan Penghentian",
                      "detail":  "Petugas mengidentifikasi sumber pancaran ilegal dan melakukan penertiban secara terkoordinasi."
                  }
              ],
    "channels":  {
                     "phone":  "(0761) 65735",
                     "email":  "upt_pekanbaru@postel.go.id",
                     "office":  "Jl. Soekarno - Hatta No. 244, Arengka Atas, Pekanbaru, Riau 28125",
                     "onlinePortal":  "https://laporgangguansfr.postel.go.id/"
                 }
}
```

---
### faqs.json

- **Path:** `frontend/src/lib/data/services\faqs.json`
- **Size:** 1190 bytes

**JSON Content:**

```json
{
    "value":  [
                  {
                      "question":  "Apakah penanganan pengaduan gangguan frekuensi dikenakan biaya?",
                      "answer":  "Tidak. Seluruh proses observasi, pelacakan lapangan, dan penanganan gangguan frekuensi radio oleh Balmon Pekanbaru tidak dipungut biaya (bebas biaya/gratis)."
                  },
                  {
                      "question":  "Siapa yang berhak mengajukan aduan gangguan frekuensi?",
                      "answer":  "Setiap pengguna spektrum frekuensi radio yang memiliki Izin Stasiun Radio (ISR) sah dan aktif dari Kementerian Komunikasi dan Digital yang operasionalnya terganggu oleh sinyal liar."
                  },
                  {
                      "question":  "Bagaimana cara mengajukan Izin Stasiun Radio (ISR)?",
                      "answer":  "Permohonan ISR diajukan melalui portal resmi https://isr.postel.go.id/. Informasi tata cara penggunaan sistem dapat dilihat melalui https://pelayanansdppi.postel.go.id/panduan-tutorial."
                  },
                  {
                      "question":  "Mengapa penggunaan penguat sinyal (repeater/booster) mandiri dilarang?",
                      "answer":  "Repeater tanpa izin memancarkan sinyal bising liar (noise) yang mengacaukan base transceiver station (BTS) operator resmi dan dapat melumpuhkan layanan komunikasi seluler di sekitarnya. Penggunaan repeater ilegal melanggar UU Telekomunikasi."
                  }
              ],
    "Count":  4
}
```

---
### portals.json

- **Path:** `frontend/src/lib/data/services\portals.json`
- **Size:** 1692 bytes

**JSON Content:**

```json
{
    "value":  [
                  {
                      "id":  "panduan",
                      "title":  "Panduan Pelayanan SDPPI",
                      "category":  "panduan",
                      "url":  "https://pelayanansdppi.postel.go.id/panduan-tutorial",
                      "sourceUrl":  "https://linktr.ee/sarpel.balmon.pku"
                  },
                  {
                      "id":  "telsus",
                      "title":  "Perizinan Telekomunikasi Khusus",
                      "category":  "perizinan",
                      "url":  "https://telsus.komdigi.go.id/login",
                      "sourceUrl":  "https://linktr.ee/sarpel.balmon.pku"
                  },
                  {
                      "id":  "maritim",
                      "title":  "Perizinan Service Maritim",
                      "category":  "perizinan",
                      "url":  "https://isr-maritim.komdigi.go.id/",
                      "sourceUrl":  "https://linktr.ee/sarpel.balmon.pku"
                  },
                  {
                      "id":  "isr",
                      "title":  "Perizinan Stasiun Radio",
                      "category":  "perizinan",
                      "url":  "https://isr.postel.go.id/",
                      "sourceUrl":  "https://linktr.ee/sarpel.balmon.pku"
                  },
                  {
                      "id":  "billing",
                      "title":  "Billing Izin Stasiun Radio",
                      "category":  "pembayaran",
                      "url":  "https://billing-isr.komdigi.go.id/",
                      "sourceUrl":  "https://linktr.ee/sarpel.balmon.pku"
                  },
                  {
                      "id":  "gangguan",
                      "title":  "Aplikasi Trouble Ticket Gangguan SFR",
                      "category":  "pengaduan",
                      "url":  "https://laporgangguansfr.postel.go.id/",
                      "sourceUrl":  "https://linktr.ee/sarpel.balmon.pku"
                  },
                  {
                      "id":  "iar-ikrap",
                      "title":  "Perizinan Amatir Radio dan Komunikasi Antar Penduduk",
                      "category":  "perizinan",
                      "url":  "https://iar-ikrap.postel.go.id/",
                      "sourceUrl":  "https://linktr.ee/sarpel.balmon.pku"
                  },
                  {
                      "id":  "serena",
                      "title":  "Perizinan Service Maritime Nelayan",
                      "category":  "nelayan",
                      "url":  "https://serena.postel.go.id/",
                      "sourceUrl":  "https://linktr.ee/sarpel.balmon.pku"
                  }
              ],
    "Count":  8
}
```

---

## Module: site_content

### hero.json

- **Path:** `frontend/src/lib/data/site_content\hero.json`
- **Size:** 511 bytes

**JSON Content:**

```json
{
    "eyebrow":  "Balmon Pekanbaru · KOMDIGI",
    "title":  {
                  "first":  "Spektrum Tertib.",
                  "second":  "Riau Terhubung."
              },
    "description":  "Menjaga spektrum frekuensi radio tetap tertib, aman, dan andal untuk mendukung konektivitas di Riau.",
    "action":  {
                   "label":  "Lihat Layanan",
                   "href":  "/#services"
               },
    "slogan":  {
                   "label":  "3T KOMDIGI",
                   "items":  [
                                 "Terhubung",
                                 "Tumbuh",
                                 "Terjaga"
                             ]
               },
    "backgroundAssetKeys":  {
                                "desktop":  "hero-desktop",
                                "mobile":  "hero-mobile"
                            }
}
```

---
### homepage.json

- **Path:** `frontend/src/lib/data/site_content\homepage.json`
- **Size:** 2052 bytes

**JSON Content:**

```json
{
    "meta":  {
                 "title":  "Balmon Pekanbaru | Monitoring Spektrum Frekuensi Radio",
                 "description":  "Informasi layanan, monitoring spektrum, wilayah kerja, dan pengaduan gangguan Balmon Pekanbaru."
             },
    "quickAccess":  [
                        {
                            "label":  "Monitoring Spektrum",
                            "description":  "Pantau penggunaan frekuensi",
                            "href":  "/profil#tugas-fungsi",
                            "icon":  "waves",
                            "priority":  false
                        },
                        {
                            "label":  "Perizinan Radio",
                            "description":  "Informasi dan akses perizinan ISR",
                            "href":  "/layanan",
                            "icon":  "shield-check",
                            "priority":  false
                        },
                        {
                            "label":  "Pengaduan Gangguan",
                            "description":  "Laporkan interferensi radio",
                            "href":  "/layanan/pengaduan-gangguan",
                            "icon":  "radio-tower",
                            "priority":  true
                        },
                        {
                            "label":  "Informasi \u0026 FAQ",
                            "description":  "Temukan informasi Balmon",
                            "href":  "/layanan#faq",
                            "icon":  "circle-help",
                            "priority":  false
                        }
                    ],
    "servicesIntro":  {
                          "heading":  {
                                          "first":  "Cepat,",
                                          "second":  "Pasti,",
                                          "prefix":  "dan",
                                          "accent":  "Berintegritas."
                                      },
                          "description":  "Layanan publik terintegrasi Balmon Pekanbaru untuk perizinan spektrum, sertifikasi kecakapan operator, serta audit teknis telekomunikasi di Provinsi Riau."
                      },
    "updatesIntro":  {
                         "eyebrow":  "Organisasi \u0026 Berita",
                         "title":  {
                                       "first":  "Tim di Balik",
                                       "second":  "Layanan Publik."
                                   },
                         "description":  "Didukung oleh SDM yang menjalankan pengawasan, pengendalian, dan pelayanan publik di bidang spektrum frekuensi radio."
                     },
    "connectIntro":  {
                         "eyebrow":  "Edukasi \u0026 Hubungi Kami",
                         "title":  {
                                       "first":  "Belajar, Bertanya,",
                                       "second":  "Berkontribusi."
                                   },
                         "description":  "Akses materi edukasi, ajukan pertanyaan, atau hubungi kami untuk informasi lebih lanjut."
                     },
    "finalCTA":  {
                     "brand":  "Balmon Pekanbaru",
                     "title":  "Spektrum tertib, komunikasi lebih andal.",
                     "actionLabel":  "Jelajahi Layanan",
                     "actionHref":  "/layanan"
                 }
}
```

---

# 6. Extraction Summary

- **Total Files:** 22
- **Valid JSON:** 22
- **Invalid JSON:** 0
- **Extraction Date:** 2026-11-05 10:09:51

---

*Generated automatically from Balmon Pekanbaru frontend data sources.*
