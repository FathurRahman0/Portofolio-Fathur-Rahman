// ============ DATA PROYEK ============
// Ganti / tambah sesuai proyekmu sendiri.
// "images" sekarang berupa ARRAY (bisa lebih dari 1 gambar → jadi slide).
// Urutan array = urutan slide. Gambar pertama juga dipakai sebagai
// thumbnail di kartu proyek.
const projects = [
  {
    title: "Retail Sales Analysis",
    eyebrow: "Proyek 01 · Python, SQL & Power BI",
    desc: "Menganalisis 11.971 transaksi retail untuk mengetahui performa penjualan, kategori produk, metode pembayaran, lokasi transaksi, dan kontribusi pelanggan melalui proses data cleaning, EDA, SQL, data warehouse, dan dashboard Power BI.",
    tools: ["Python", "Pandas", "SQL Server", "Power BI"],
    features: [
      "Data cleaning dan Exploratory Data Analysis menggunakan Python & Pandas",
      "18 analisis SQL untuk menemukan KPI, tren penjualan, kategori, dan kontribusi customer",
      "Membangun Data Warehouse dengan Star Schema",
      "Dashboard Power BI untuk memvisualisasikan KPI, kategori, payment method, lokasi, tren bulanan, dan Top 10 Customer",
      "Menghasilkan business insights dan rekomendasi berdasarkan data"
    ],
    images: [
      "assets/img/projects/Retail_Sales_Dashboard.png"
    ],
    github: "https://github.com/FathurRahman0/Retail_Sales_Analysis.git"
  },
  {
    title: "RFM Customer Segmentation",
    eyebrow: "Proyek 02 · BigQuery SQL & Power BI",
    desc: "Menganalisis 27.635 pelanggan dari dataset e-commerce publik theLook menggunakan metode Recency, Frequency, dan Monetary (RFM). Proyek ini mencakup pengolahan data menggunakan Google BigQuery SQL, pemberian skor RFM, segmentasi pelanggan menjadi enam kelompok, serta visualisasi hasil analisis melalui dashboard Power BI untuk mendukung strategi retensi dan reaktivasi pelanggan.",
    tools: ["Google BigQuery", "SQL", "Power BI"],
    features: [
      "Menghitung metrik Recency, Frequency, dan Monetary untuk setiap pelanggan berdasarkan data pesanan berstatus Complete",
      "Memberikan skor RFM menggunakan pembagian kuantil untuk Recency dan Monetary serta aturan khusus untuk Frequency",
      "Mengelompokkan pelanggan menjadi enam segmen: Champions, Loyal Customers, Recent Customers, Needs Attention, At Risk, dan Hibernating",
      "Membangun dashboard Power BI yang menampilkan KPI pelanggan, distribusi segmen melalui donut chart, jumlah pelanggan per segmen, serta rata-rata Monetary",
      "Menyajikan tabel ringkasan pelanggan berdasarkan segmen, termasuk metrik Recency, Frequency, dan Monetary",
      "Menghasilkan insight untuk mengidentifikasi pelanggan bernilai tinggi dan segmen yang berpotensi menjadi sasaran strategi retensi atau reaktivasi"
    ],
    images: [
      "assets/img/projects/Dasboard_RFM_Customer_Segmentation.png"
    ],
    github: "https://github.com/FathurRahman0/Bigdata_RFM-Customer-Segmentation.git"
  },
  {
  title: "Retail Sales Data Pipeline",
  eyebrow: "Proyek 03 · Python, SQL Server & Data Engineering",
  desc: "Membangun pipeline data penjualan retail menggunakan Python dan SQL Server, mulai dari ekstraksi data CSV, transformasi dan validasi kualitas data, penyimpanan hasil transformasi, hingga incremental loading ke database staging. Proyek ini juga mencakup automated quality checks dan rekonsiliasi data antara sumber CSV dan database.",
  tools: ["Python", "Pandas", "SQL Server", "pyodbc", "pytest"],
  features: [
    "Mengambil 12.575 baris data penjualan dari file CSV",
    "Melakukan transformasi dan validasi data menggunakan Python dan Pandas",
    "Memeriksa Transaction ID kosong atau duplikat, tanggal tidak valid, dan konsistensi perhitungan Total Spent",
    "Menyimpan hasil transformasi ke data/processed/retail_sales_processed.csv",
    "Menerapkan incremental loading untuk menghindari pemuatan ulang transaksi yang sudah ada",
    "Membuat automated tests untuk validasi kualitas data menggunakan pytest",
    "Membandingkan data CSV dengan database SQL Server melalui proses reconciliation"
  ],
  images: [
    "assets/img/projects/foto_urutan.jpg",
    "assets/img/projects/foto_hasilrun.png",
    "assets/img/projects/foto_database.png"
  ],
  github: "https://github.com/FathurRahman0/Retail_Sales_Data_Pipeline.git"
},
{
    cardTitle: "Kimia Farma Analytics",
    cardDesc: "Analisis transaksi Kimia Farma (2020–2023).",
    title: "Kimia Farma Business Performance Analytics 2020–2023",
    eyebrow: "Proyek 04 · BigQuery, SQL & Looker Studio",
    desc: "Menganalisis 672.458 transaksi Kimia Farma selama periode 2020–2023 untuk mengevaluasi performa penjualan, estimasi keuntungan, jumlah transaksi, dan rating cabang melalui proses data validation, data transformation, SQL analysis, dan dashboard Looker Studio.",
    tools: ["Google BigQuery", "SQL", "Looker Studio"],
    features: [
      "Melakukan data validation untuk memeriksa duplikasi, kelengkapan data, integritas relasi, dan konsistensi harga",
      "Menggabungkan data transaksi, produk, dan kantor cabang menggunakan SQL JOIN",
      "Membuat tabel analisis (kf_analisa) dengan 672.458 baris dan 17 kolom sebagai sumber analisis bisnis",
      "Melakukan 6 analisis SQL untuk mengevaluasi performa tahunan, transaksi cabang, penjualan, estimasi keuntungan, dan rating cabang",
      "Membangun dashboard Looker Studio untuk memvisualisasikan KPI, tren penjualan tahunan, performa cabang, rating, dan estimasi keuntungan berdasarkan provinsi"
    ],
    images: [
      "assets/img/projects/Dashboard_Kimia_Farma.jpg"
    ],
    github: "https://github.com/FathurRahman0/kimia-farma-business-performance-analytics.git"
},
]