import "dotenv/config";
import path from "node:path";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const dbUrl =
  process.env.DATABASE_URL ??
  `file:${path.join(process.cwd(), "prisma", "dev.db")}`;

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: dbUrl }),
});

async function main() {
  // ---------- Profile ----------
  await prisma.profile.deleteMany();
  await prisma.profile.create({
    data: {
      name: "Tri Basuki Kurniawan, S.Kom, M.Eng, Ph.D",
      title: "Senior Lecturer & Peneliti — Universiti Kebangsaan Malaysia (UKM)",
      bio: "Dr. Tri Basuki Kurniawan adalah dosen dan peneliti dengan lebih dari 25 tahun pengalaman di bidang Teknologi Informasi, mencakup pengembangan perangkat lunak, keamanan aplikasi dan jaringan, kecerdasan buatan, serta sistem informasi geografis. Beliau meraih gelar Ph.D dalam bidang Information Technology dari Universiti Kebangsaan Malaysia (UKM), M.Eng dalam Mechatronics and Robotics dari Universiti Teknologi Malaysia (UTM), dan B.CompSc dari Universitas Bina Darma, Palembang. Saat ini menjabat sebagai Senior Lecturer di UKM, dengan rekam jejak panjang sebagai konsultan IT, peneliti, dan pengajar untuk berbagai instansi pemerintah dan swasta di Indonesia dan Malaysia. Website ini merupakan dokumentasi Tri Dharma Perguruan Tinggi (Pendidikan, Penelitian, dan Pengabdian) serta kegiatan penunjang beliau, disusun sebagai landasan pengisian data SISTER.",
      email: "tribasukikurniawan@gmail.com",
      phone: "+62 812 717 95190 (Indonesia) / +60 10 983 9075 (Malaysia)",
      address:
        "Komplek Pemda Blok H3 No 35, Jl Kol Sulaiman Amin KM 7, Talang Buruk, Palembang, Sumatera Selatan, Indonesia",
      scopusUrl:
        "https://www.scopus.com/authid/detail.uri?authorId=23492445600",
      scopusHIndex: "8",
      scholarUrl: "https://scholar.google.com/citations?user=pzjCu2kAAAAJ&hl=en",
      scholarHIndex: "9",
    },
  });

  // ---------- Education ----------
  await prisma.education.deleteMany();
  await prisma.education.createMany({
    data: [
      {
        level: "S3 — Doktor (Ph.D)",
        institution: "Universiti Kebangsaan Malaysia (UKM)",
        faculty: "Faculty of Information Science and Technology",
        major: "Information Technology",
        period: "2010 – 2018",
        location: "Selangor, Malaysia",
        sortOrder: 0,
      },
      {
        level: "S2 — Magister (M.Eng)",
        institution: "Universiti Teknologi Malaysia (UTM)",
        faculty: "Faculty of Electrical Engineering",
        major: "Mechatronics and Robotics",
        period: "2007 – 2009",
        location: "Johor, Malaysia",
        sortOrder: 1,
      },
      {
        level: "S1 — Sarjana (B.CompSc)",
        institution: "Universitas Bina Darma",
        faculty: "Faculty of Computer Science",
        major: "Information Technology",
        period: "1995 – 2000",
        location: "Palembang, Indonesia",
        sortOrder: 2,
      },
    ],
  });

  // ---------- Experience ----------
  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: [
      { position: "Senior Lecturer", institution: "Universiti Kebangsaan Malaysia (UKM), Bangi, Malaysia", period: "Feb 2023 – Sekarang", current: true, sortOrder: 0 },
      { position: "Senior Python Software Engineer", institution: "The Lorry Sdn Bhd, Malaysia", period: "Sep 2020 – Nov 2022", current: false, sortOrder: 1 },
      { position: "Vice Director of Research and Innovation", institution: "Universitas Bina Darma, Palembang", period: "2020 – Jan 2022", current: false, sortOrder: 2 },
      { position: "Post-Doctoral Program", institution: "Institute of Energy Infrastructure, Universiti Tenaga Nasional (UNITEN), Malaysia", period: "Nov 2019 – Sep 2020", current: false, sortOrder: 3 },
      { position: "IT Consultant, Trainer, Programmer, and Researcher", institution: "IDWAL Sdn Bhd, Malaysia", period: "Jul 2019 – Okt 2019", current: false, sortOrder: 4 },
      { position: "Director of System and Information Technology (DSTI)", institution: "Universitas Bina Darma, Palembang", period: "2019 – 2020", current: false, sortOrder: 5 },
      { position: "IT Consultant", institution: "Uniten Research and Development (UR&D) Sdn Bhd, UNITEN Malaysia", period: "2015 – 2016", current: false, sortOrder: 6 },
      { position: "IT Consultant", institution: "MyXLab, Augmented Reality Lab and Research Centre, UKM Bangi", period: "2014 – 2016", current: false, sortOrder: 7 },
      { position: "IT Consultant", institution: "Department of Agriculture (DOA), Malaysia", period: "2013 – 2018", current: false, sortOrder: 8 },
      { position: "IT Consultant, Trainer, Programmer and Researcher", institution: "Alam Informasi Sdn Bhd, Cyberjaya, Malaysia", period: "2013 – 2016", current: false, sortOrder: 9 },
      { position: "IT Consultant", institution: "Data Mining and Optimization (DMO) Research Group – Centre of Artificial Intelligence Technology (CAIT), FTSM, UKM Bangi", period: "2008 – 2016", current: false, sortOrder: 10 },
      { position: "Senior Lecturer", institution: "Kopertis Wilayah II, Sumbagsel Dpk Universitas Bina Darma, Palembang", period: "2005 – Sekarang", current: true, sortOrder: 11 },
      { position: "Senior Programmer", institution: "Digital Kreasi, Palembang", period: "2002 – 2005", current: false, sortOrder: 12 },
      { position: "Director", institution: "Visual Mandiri Informatika, Palembang", period: "2000 – 2005", current: false, sortOrder: 13 },
      { position: "MIS Staff", institution: "Tania Selatan, Palembang", period: "1999 – 2002", current: false, sortOrder: 14 },
      { position: "EDP Manager", institution: "Handrata Dinatama, Palembang", period: "1996 – 1998", current: false, sortOrder: 15 },
      { position: "EDP Staff", institution: "Group Apotik JAYA, Palembang", period: "1994 – 1996", current: false, sortOrder: 16 },
    ],
  });

  // ---------- Skills ----------
  await prisma.skill.deleteMany();
  await prisma.skill.createMany({
    data: [
      { category: "Operating System", items: "DOS, Ms. Windows, Ms. Windows NT, Ms. Windows Server, Linux (berbagai distro), Mac OS", sortOrder: 0 },
      { category: "Databases", items: "Advanced Revelation (ARev), Dbase, Clipper, FoxPro, Ms. Access, Ms. SQL Server, MySQL, Oracle, PostgreSQL", sortOrder: 1 },
      { category: "DOS Programming", items: "Basic, Pascal, C/C++, Fortran, COBOL", sortOrder: 2 },
      { category: "Desktop Programming", items: "Ms. Visual Basic (.NET), Ms. FoxPro, Ms. Visual C++ (.NET), Borland Delphi, Java, C#(.NET), Gambas", sortOrder: 3 },
      { category: "Mobile Programming", items: "iOS (Objective C), Swift, Android (Java), RhoMobile, PhoneGap, Cordova, MonoTouch, Mono Android, Ionic Framework", sortOrder: 4 },
      { category: "Web-based Programming", items: "PHP (Laravel, CI), JSP, ASP, JavaScript, VBScript, Perl, Java, ColdFusion, HTML5, CSS, jQuery, Bootstrap, ASP.NET Core MVC, Django", sortOrder: 5 },
      { category: "CMS & Developer", items: "Joomla, Drupal, Liferay, SharePoint", sortOrder: 6 },
      { category: "System Control Programming", items: "Assembly, C/C++, Java", sortOrder: 7 },
      { category: "Scripting Programming", items: "Perl, Python, JavaScript, VBScript, Ruby on Rails", sortOrder: 8 },
      { category: "Embedded System Programming", items: "Java, C#, Objective C", sortOrder: 9 },
      { category: "Reporting Tools", items: "Crystal Report, JasperReport, Report Builder, iReport, Pentaho", sortOrder: 10 },
      { category: "Integration Tools", items: "Pentaho, Kettle, Talend Open Studio, QlikView, JasperSoft ETL", sortOrder: 11 },
      { category: "Data Science", items: "Python, MATLAB, R Language, Hadoop, MapReduce, Apache Spark", sortOrder: 12 },
      { category: "Application Framework", items: "jQuery Mobile, Stripes, Spring, Hibernate, Zkoss, Django, Laravel", sortOrder: 13 },
      { category: "GIS Web Application", items: "ArcGIS Desktop, ArcGIS Server, QuantumGIS Desktop, QGIS Server/MapServer, GoogleMap, OpenStreet, Luciad", sortOrder: 14 },
      { category: "Business Intelligence", items: "QlikView, Pentaho, RapidMiner, SQL Server Analysis Services, Orange", sortOrder: 15 },
    ],
  });

  // ---------- Research Interests ----------
  await prisma.researchInterest.deleteMany();
  await prisma.researchInterest.createMany({
    data: [
      { text: "Data Security & Cryptography", sortOrder: 0 },
      { text: "Control System and Microcontroller Programming", sortOrder: 1 },
      { text: "Geographical Information System (GIS) and WebGIS", sortOrder: 2 },
      { text: "Parallel and Distribution Programming", sortOrder: 3 },
      { text: "Artificial Intelligence: Expert System, Neural Network, Decision Support System, Augmented Reality, Pattern Recognition", sortOrder: 4 },
      { text: "Internet Security and Network Intrusion Detection System", sortOrder: 5 },
      { text: "Optimization: Single/Multi-Objective, Swarm Intelligence (PSO, ACO), Genetic & Evolutionary Algorithm", sortOrder: 6 },
      { text: "Latent Semantic Indexing (LSI) and Information Retrieval", sortOrder: 7 },
      { text: "Watermarking, Image Security, Image Enhancement (Image Processing)", sortOrder: 8 },
      { text: "Natural Language Processing, Ontology Learning/Population/Enrichment for Semantic Web", sortOrder: 9 },
      { text: "Radio Frequency Identification (RFID) and Its Applications", sortOrder: 10 },
      { text: "Data Mining (Classification/Clustering), Graph Mining, Association Mining, Machine Learning, Deep Learning, Soft Computing", sortOrder: 11 },
      { text: "Multi-Agent System", sortOrder: 12 },
      { text: "Big Data Processing: Hadoop, MapReduce, Apache Spark", sortOrder: 13 },
      { text: "Riset Magister: DNA Computing — DNA Sequence Design menggunakan Swarm Intelligence (ACO dan PSO) [Optimization]", sortOrder: 14 },
      { text: "Riset Doktoral: Taxonomy Learning from Malay Text using Firefly Algorithm based hierarchical clustering [NLP, Text Mining, Optimization]", sortOrder: 15 },
    ],
  });

  // ---------- Certifications ----------
  await prisma.certification.deleteMany();
  await prisma.certification.createMany({
    data: [
      { title: "Certified Application Security Engineering (CASE) — Staff IT JPJ Centre, Cyberjaya, Malaysia", year: "27–29 Jun 2022", provider: "JPJ Centre", sortOrder: 0 },
      { title: ".NET Web Application Security — Staff IT Custommedia Sdn Bhd, Technology Park Malaysia (TPM), Bukit Jalil, Malaysia", year: "17–19 Jun 2019", provider: "Custommedia Sdn Bhd", sortOrder: 1 },
      { title: "Certified Web Application Security Professional — Staff IT Jabatan MAMPU, Malaysia", year: "14–18 Des 2009", provider: "Jabatan MAMPU", sortOrder: 2 },
    ],
  });

  // ---------- Publications ----------
  await prisma.publication.deleteMany();
  await prisma.publication.createMany({
    data: [
      // BOOK
      { category: "BOOK", title: "Tri Basuki Kurniawan dan Misinem, \"Bahasa C++\", ISBN: 979-1118-02-7, Ardana Media, Yogyakarta", year: "2006", sortOrder: 0 },
      { category: "BOOK", title: "Tri Basuki Kurniawan dan Misinem, \"Pemrograman pada Port Printer\", ISBN: 979-1118-01-9, Ardana Media, Yogyakarta", year: "2005", sortOrder: 1 },

      // BOOK_CHAPTER
      { category: "BOOK_CHAPTER", title: "Mohd Zakree Ahmad Nazri, Tri Basuki Kurniawan dan Abdul Razak Hamdan, \"Pembelajaran Taksonomi dari Teks Menggunakan Algoritma Kelip-kelip\", dalam Sains Data: Penerokaan Pengetahuan dari Data Raya, Penerbit UKM", year: "2018", sortOrder: 0 },
      { category: "BOOK_CHAPTER", title: "Noor Khafifah Khalid, Zuwairie Ibrahim, Tri Basuki Kurniawan, dan Marzuki Khalid, \"DNA Sequence Optimization: A Methodology Overview\", dalam Progress in Computation Intelligence In Vitro and In Silico (pp. 62–84), UTM", year: "2008", sortOrder: 1 },
      { category: "BOOK_CHAPTER", title: "Noor Khafifah Khalid, Zuwairie Ibrahim, Tri Basuki Kurniawan, Marzuki Khalid, Andries P. Engelbrecht, dan Martin Middendorf, \"Design of Nucleic Acid Sequence Based on Swarm Intelligence\", dalam Progress in Computation Intelligence In Vitro and In Silico (pp. 85–113), UTM", year: "2008", sortOrder: 2 },

      // JOURNAL_INTL
      { category: "JOURNAL_INTL", title: "Fatihah R, Shahrul Azman Mohd Noah, Tri Basuki Kurniawan, \"Using Ontology-based approach to improved information retrieval semantically for historical domain\", International Journal on Advanced Science, Engineering and Information Technology, Vol. 10 No. 3, pp. 1130-1136", year: "2020", sortOrder: 0 },
      { category: "JOURNAL_INTL", title: "Mohd Zakree Ahmad Nazri, Tri Basuki Kurniawan dan Abdul Razak Hamdan, \"Pembangunan Taksonomi dari Teks Melayu Menggunakan Algoritma Kunang–kunang Pembahagi Dua Sama\", Gema Online: Journal of Language Study, Vol. 18, No. 2", year: "2018", sortOrder: 1 },
      { category: "JOURNAL_INTL", title: "Fathoni Usman, Nursimaa Banuar, Tri Basuki Kurniawan, Mohd Nadzari Ismail, Nor Azura Othman, \"Integration of Spherical 360° Panoramic Virtual Tour with Assessment Data for Risk Assessment and Maintenance of Tunnel and Cavern\", Applied Mechanics and Materials, Vol. 858, pp. 50-56", year: "2017", sortOrder: 2 },
      { category: "JOURNAL_INTL", title: "M. Ayob, M. Nazri, Tri Basuki Kurniawan, Y. Feim T. Yassen, \"Constructive Heuristic for Discreet Berth Allocation Problems\", International Journal of Advancements in Computing Technology, Vol. 6 No. 2: 31", year: "2014", sortOrder: 3 },
      { category: "JOURNAL_INTL", title: "Mohd Zakree Ahmad Nazri, M. Daman Huri, Azuraliza Abu Bakar, Salwani Abdullah, Masri Ayob dan Tri Basuki Kurniawan, \"DNA Sequence Design Using Artificial Immune Systems\", Journal of Engineering and Applied Sciences, 8: 49-57", year: "2013", sortOrder: 4 },
      { category: "JOURNAL_INTL", title: "Masri Ayob, Mohd Zakree Ahmad Nazri, Suhaila Zainuddin dan Tri Basuki Kurniawan, \"Component Pick and Place Scheduling for Surface Mount Device Placement Machine\", International Journal of Soft Computing, Vol. 8, No. 1, pp. 29-41", year: "2013", sortOrder: 5 },
      { category: "JOURNAL_INTL", title: "Zuwairie Ibrahim, Tri Basuki Kurniawan, Noor Khafifah Khalid, Shahdan Sudin, dan Marzuki Khalid, \"Implementation of Ant Colony System for DNA Sequence Optimization\", Artificial Life and Robotics, Springer-Japan, Vol. 14, No. 2, pp. 293-296", year: "2009", sortOrder: 6 },
      { category: "JOURNAL_INTL", title: "Noor Khafifah Khalid, Zuwairie Ibrahim, Tri Basuki Kurniawan, Marzuki Khalid, Nor Haniza Sarmin, dan Andries P. Engelbrecht, \"Function Minimization in DNA Sequence Design Based on Continuous Particle Swarm Optimization\", ICIC Express Letters (ICIC-EL), Vol. 3, No. 1, pp. 27-32", year: "2009", sortOrder: 7 },
      { category: "JOURNAL_INTL", title: "Noor Khafifah Khalid, Zuwairie Ibrahim, Tri Basuki Kurniawan, Mohamad Shukri Zainal Abidin, Marzuki Khalid, dan Andries P. Engelbrecht, \"DNA Sequence Optimization Based on Continuous Particle Swarm Optimization for Reliable DNA Computing and DNA Nanotechnology\", Journal of Computer Science, Vol. 4, No. 11, pp. 942-950", year: "2008", sortOrder: 8 },
      { category: "JOURNAL_INTL", title: "Zuwairie Ibrahim, Tri Basuki Kurniawan, Marzuki Khalid, dan Nor Haniza Sarmin, \"A DNA Sequence Design for Direct-Proportional Length-Based DNA Computing using DNASequenceGenerator\", International Journal of Simulation: Systems, Science, and Technology, Vol. 9, No. 2, pp. 65-72", year: "2008", sortOrder: 9 },

      // JOURNAL_NATIONAL
      { category: "JOURNAL_NATIONAL", title: "Jepri Yandi, Tri Basuki Kurniawan, Edi Surya Negara dan Muhamad Akbar, \"Prediksi Lokasi Titik Panas Kebakaran Hutan menggunakan Metode Regresi SVM (Support Vector Machine) pada Data Kebakaran Hutan DAOPS Manggala AGNI OKI, Provinsi Sumatera Selatan Tahun 2019\", Jurnal Informatika dan Teknologi Jaringan (InfoTekJar), Vol 6(1)", year: "2021", sortOrder: 0 },
      { category: "JOURNAL_NATIONAL", title: "M. Riski Qisthiano, Tri Basuki Kurniawan, Edi Surya Negara dan Muhamad Akbar, \"Pengembangan Model untuk Prediksi Tingkat Kelulusan Mahasiswa Tepat Waktu dengan metode Naïve Bayes\", Jurnal Media Informatika Budidarma, Vol. 5(3), pp. 987-994", year: "2021", sortOrder: 1 },
      { category: "JOURNAL_NATIONAL", title: "Anggari Ayu Prahartiningsyah dan Tri Basuki Kurniawan, \"Pengenalan Pola Angka Menggunakan Pendekatan Optimisasi Sistem Kekebalan Buatan (Artificial Immune System)\", Jurnal Media Informatika Budidarma, Vol. 5(3), pp. 856-865", year: "2021", sortOrder: 2 },
      { category: "JOURNAL_NATIONAL", title: "Benny Jannakha Putra, Tri Basuki Kurniawan, Darius Antoni dan Ahmad Haidar Mirza, \"Prediksi Kebutuhan Alat Kesehatan Rumah Sakit Menggunakan Metode Regression Linear dan Naïve Bayes\", Jurnal Informatika Global, Vol 11(2)", year: "2020", sortOrder: 3 },
      { category: "JOURNAL_NATIONAL", title: "Iski Zaliman, Tri Basuki Kurniawan dan Darius Antoni, \"Sistem Penentuan Lokasi Pusat Layanan Terpadu bagi Penderita Penyakit Demam Berdarah dengan Menggunakan K-Means Clustering\", Jurnal Informatika Global, Vol 11(2)", year: "2020", sortOrder: 4 },
      { category: "JOURNAL_NATIONAL", title: "Indah Hidayanti, Tri Basuki Kurniawan dan Afriyudi Afriyudi, \"Perbandingan dan Analisa Metode Klasifikasi untuk Menentukan Konsentrasi Jurusan\", Jurnal Informatika Global, Vol 11(1)", year: "2020", sortOrder: 5 },
      { category: "JOURNAL_NATIONAL", title: "Joan Angelina Widians, Novianti Puspitasari, Tri Basuki Kurniawan, \"Sistem Pakar Bawang Dayak sebagai Obat Alternatif\", Jurnal Bina Komputer, Vol 2(2), pp. 122-130", year: "2020", sortOrder: 6 },
      { category: "JOURNAL_NATIONAL", title: "Misinem Misinem, Tri Basuki Kurniawan, Astried Astried, Joan Angelina Widians, \"Model Penyelesaian Masalah Perjalanan Penjual Menggunakan Pendekatan Kecerdasan Buatan, Optimisasi Koloni Semut\", Jurnal Bina Komputer, Vol. 2(2), pp. 89-98", year: "2020", sortOrder: 7 },
      { category: "JOURNAL_NATIONAL", title: "Evi Novilia, Widya Cholil, Tri Basuki Kurniawan, \"Analisa Tingkat Layanan IT Service Management pada Penerapan Sistem Ujian Nasional berbasis Komputer dengan Menggunakan Kerangka Kerja ITIL v3\", Jurnal Sains, Aplikasi, Komputasi dan Teknologi Informasi, Vol 2(1), pp. 24-34", year: "2020", sortOrder: 8 },
      { category: "JOURNAL_NATIONAL", title: "Sunda Ariana, Hadi Syaputra dan Tri Basuki Kurniawan, \"Identification Word Spacing of Erroneous Sentences on Indonesian Scientific\", APTIKOM Journal on Computer Science and Information Technologies, Vol. 5, No. 1", year: "2020", sortOrder: 9 },
      { category: "JOURNAL_NATIONAL", title: "Usman Ependi, Tri Basuki Kurniawan dan Febriyanti Panjaitan, \"System Usability Scale vs Heuristic Evaluation: A Review\", Jurnal Simetris, Vol 10, No 1", year: "2019", sortOrder: 10 },
      { category: "JOURNAL_NATIONAL", title: "M. Daman Huri, Mohd Zakree Ahmad Nazri, Azuraliza Abu Bakar, Tri Basuki Kurniawan, \"Reka Bentuk DNA Mengguna Sistem Imun Buatan Objektif Tunggal\", Jurnal Teknologi Maklumat dan Multimedia, 11: 41-48", year: "2011", sortOrder: 11 },
      { category: "JOURNAL_NATIONAL", title: "Astried dan Tri Basuki Kurniawan, \"Peningkatan Kecepatan Proses pada Metode Color Ordering dan Mapping dengan Pendekatan Delapan-Ketetanggan\", Telkomnika, Vol. 7 No. 1, pp. 51-56", year: "2009", sortOrder: 12 },
      { category: "JOURNAL_NATIONAL", title: "Zuwairie Ibrahim, Tri Basuki Kurniawan, Nor Haniza Sarmin, dan Marzuki Khalid, \"A DNA Sequence Design for Molecular Computation of Hamiltonian Path Problem with Output Visualization based on Real-Time PCR\", ELEKTRIKA, Vol. 10, No. 2", year: "2008", sortOrder: 13 },
      { category: "JOURNAL_NATIONAL", title: "Tri Basuki Kurniawan, \"Perangkat Lunak Bantu Penyelesaian Persamaan Logika Menggunakan Tabel Kebenaran\", Matrik, Vol. 7 No. 1, ISSN: 1411-1624, Universitas Bina Darma Palembang", year: "2005", sortOrder: 14 },

      // CONF_INTL
      { category: "CONF_INTL", title: "Tri Basuki Kurniawan, Fathoni Usman, Rohayu Che Omar dan Khairul Amri Sanusi, \"Preferences System for Guided and Selection of Improvement Type and Assessment of Soil based on Expert Opinion with Weighted System\", 2nd International Conference on Disaster Management (ICDM 2020), IOP Conference Series: Earth and Environmental Science, Vol 708(1)", year: "2021", sortOrder: 0 },
      { category: "CONF_INTL", title: "Misinem, Ermatita, Dian Palupi Rini, Reza Firsandaya Malik, dan Tri Basuki Kurniawan, \"Population-based Ant Colony Optimization with New Hierarchical Pheromone Updating Mechanism for DNA Sequence Design Problem\", Sriwijaya International Conference on Information Technology and Its Application (SICONIAN)", year: "2020", sortOrder: 1 },
      { category: "CONF_INTL", title: "Febriyanti Panjaitan, Siti Nurmaini, Muhammad Akbar, Ahmad Haidar Mirza, Hadi Syaputra dan Tri Basuki Kurniawan, \"Identification of Classification Method for Sudden Cardiac Death\", International Conference on Electrical Engineering and Computer Science (ICECOS)", year: "2019", sortOrder: 2 },
      { category: "CONF_INTL", title: "Fatihah R, Shahrul Azman Mohd Noah, Tri Basuki Kurniawan, \"Ontology-based information retrieval for historical documents\", Third International Conference on Information Retrieval and Knowledge Management (CAMP)", year: "2016", sortOrder: 3 },
      { category: "CONF_INTL", title: "Tri Basuki Kurniawan, Misinem dan Mohd Zakree Ahmad Nazri, \"New Pheromone Updating Mechanism for Ant Colony Optimization in Designing DNA Sequence\", The 4th ICIBA – International Conference Information Technology and Business Application", year: "2015", sortOrder: 4 },
      { category: "CONF_INTL", title: "Zulkifli Md. Yusof, Muhammad Arif Abdul Rahim, Sophan Wahyudi Nawawi, Kamal Khalil, Zuwairie Ibrahim dan Tri Basuki Kurniawan, \"DNA Sequence Design for Direct-Proportional Length-Based DNA Computing: Particle Swarm Optimization vs Population based Ant Colony Optimization\", 2012 Fourth International Conference on Computational Intelligence, Modelling and Simulation (CIMSim)", year: "2012", sortOrder: 5 },
      { category: "CONF_INTL", title: "Noor Khafifah Khalid, Zuwairie Ibrahim, Tri Basuki Kurniawan, dan Mohamad Shukri Zainal Abidin, \"A DNA Sequence Design Based on Continuous and Binary Particle Swarm Optimization\", International Conference on Software Engineering and Computer Systems, pp. 60-65, Kuantan, Pahang, Malaysia", year: "2009", sortOrder: 6 },
      { category: "CONF_INTL", title: "Tri Basuki Kurniawan, Noor Khafifah Khalid, Zuwairie Ibrahim, Mohamad Shukri Zainal Abidin, dan Marzuki Khalid, \"Sequence Design for Direct-proportional Length-based DNA Computing using Population-based Ant Colony Optimization\", ICROS-SICE International Joint Conference, pp. 1486-1491, Fukuoka, Japan", year: "2009", sortOrder: 7 },
      { category: "CONF_INTL", title: "Tri Basuki Kurniawan, Zuwairie Ibrahim, Noor Khafifah Khalid, dan Marzuki Khalid, \"A Population-based Ant Colony Optimization Approach for DNA Sequence Optimization\", Third Asia International Conference on Modelling & Simulation (AMS 2009), pp. 246-251, Bandung & Bali, Indonesia", year: "2009", sortOrder: 8 },
      { category: "CONF_INTL", title: "Noor Khafifah Khalid, Zuwairie Ibrahim, Tri Basuki Kurniawan, Marzuki Khalid, dan Andries P. Engelbrecht, \"Implementation of Binary Particle Swarm Optimization for DNA Sequence Design\", International Symposium on Distributed Computing and Artificial Intelligence (DCAI'09), LNCS 5517, University of Salamanca, Spain", year: "2009", sortOrder: 9 },
      { category: "CONF_INTL", title: "Tri Basuki Kurniawan, Zuwairie Ibrahim, Noor Khafifah Khalid, dan Marzuki Khalid, \"An Optimized Ant System Approach for DNA Sequence Optimization\", International Symposium on Distributed Computing and Artificial Intelligence (DCAI'09), LNCS 5517, University of Salamanca, Spain", year: "2009", sortOrder: 10 },
      { category: "CONF_INTL", title: "Noor Khafifah Khalid, Zuwairie Ibrahim, Tri Basuki Kurniawan, Shahdan Sudin, dan Marzuki Khalid, \"DNA Sequence Optimization: A Methodology Overview\", The Second International Conference on Control, Instrumentation and Mechatronics Engineering (CIM 2009), pp. 385-391, Malacca, Malaysia", year: "2009", sortOrder: 11 },
      { category: "CONF_INTL", title: "Zuwairie Ibrahim, Tri Basuki Kurniawan, Noor Khafifah Khalid, dan Marzuki Khalid, \"Implementation of Ant Colony System for DNA Sequence Optimization\", The Fourteenth International Symposium on Artificial Life and Robotics (AROB 2009), pp. 712-715, Oita, Japan", year: "2009", sortOrder: 12 },
      { category: "CONF_INTL", title: "Noor Khafifah Khalid, Zuwairie Ibrahim, Tri Basuki Kurniawan, Marzuki Khalid, dan Shahdan Sudin, \"A DNA Sequence Design Approach based on Particle Swarm Optimization with Sequence Support System\", Symposium on Engineering and Technology, Kuching, Malaysia", year: "2008", sortOrder: 13 },
      { category: "CONF_INTL", title: "Tri Basuki Kurniawan, Zuwairie Ibrahim, Noor Khafifah Khalid, Marzuki Khalid, dan Nor Haniza Sarmin, \"A Generate-and-Test Approach for DNA Sequence Design of the Direct-Proportional Length-Based DNA Computing\", Student Conference on Research and Development (SCOReD 2008), UTM, Johor, Malaysia", year: "2008", sortOrder: 14 },
      { category: "CONF_INTL", title: "Noor Khafifah Khalid, Tri Basuki Kurniawan, Zuwairie Ibrahim, dan Marzuki Khalid, \"Binary Particle Swarm Optimization for Single Objective DNA Sequence Design\", Student Conference on Research and Development (SCOReD 2008), UTM, Johor, Malaysia", year: "2008", sortOrder: 15 },
      { category: "CONF_INTL", title: "Tri Basuki Kurniawan, Zuwairie Ibrahim, Muhammad Faiz Mohamed Saaid, dan Azli Yahya, \"Implementation of Ant System for DNA Sequence Optimization\", NANO-SciTech 2008, Shah Alam, Malaysia", year: "2008", sortOrder: 16 },
      { category: "CONF_INTL", title: "Noor Khafifah Khalid, Zuwairie Ibrahim, Tri Basuki Kurniawan, Marzuki Khalid, dan Andries P. Engelbrecht, \"Design of DNA Sequences Based on Particle Swarm Optimization\", NANO-SciTech 2008, Shah Alam, Malaysia", year: "2008", sortOrder: 17 },
      { category: "CONF_INTL", title: "Noor Khafifah Khalid, Tri Basuki Kurniawan, Zuwairie Ibrahim, Zulkifli Md Yusof, Marzuki Khalid, dan Andries P. Engelbrecht, \"A Model to Optimize DNA Sequences Based on Particle Swarm Optimization\", Asia International Conference on Modelling and Simulation (AMS 2008), pp. 712-715, Kuala Lumpur, Malaysia", year: "2008", sortOrder: 18 },
      { category: "CONF_INTL", title: "Tri Basuki Kurniawan, Noor Khafifah Khalid, Zuwairie Ibrahim, Marzuki Khalid, dan Martin Middendorf, \"Evaluation of Ordering Methods for DNA Sequence Design Based on Ant Colony System\", Asia International Conference on Modelling and Simulation (AMS 2008), pp. 905-910, Kuala Lumpur, Malaysia", year: "2008", sortOrder: 19 },
      { category: "CONF_INTL", title: "Tri Basuki Kurniawan, Noor Khafifah Khalid, Zuwairie Ibrahim, Marzuki Khalid, dan Martin Middendorf, \"An Ant Colony System for DNA Sequence Design Based On Thermodynamics\", Proceedings of the Fourth IASTED International Conference ACST 2008, pp. 144-149, Langkawi, Malaysia", year: "2008", sortOrder: 20 },
      { category: "CONF_INTL", title: "Zuwairie Ibrahim, Tri Basuki Kurniawan dan Marzuki Khalid, \"A DNA Sequence Design for Molecular Computation of HPP with Output Visualization Based on Real-Time PCR\", IEEE Congress on Evolutionary Computation (CEC) 2007, Singapore", year: "2007", sortOrder: 21 },
      { category: "CONF_INTL", title: "Zuwairie Ibrahim, Tri Basuki Kurniawan, Marzuki Khalid, dan Osamo Ono, \"A DNA Sequence Design for Direct-Proportional Length-Based DNA Computing using DNASequenceGenerator\", The Second International Conference on Innovative Computing, Information and Control (ICICIC), Kumamoto, Japan", year: "2007", sortOrder: 22 },

      // CONF_NATIONAL
      { category: "CONF_NATIONAL", title: "Dendi Suwanto, Tri Basuki Kurniawan, \"Perancangan Sistem Informasi Geografis Lokasi Lowongan Pekerjaan di Kota Palembang berbasis mobile\", Bina Darma Conference on Computer Science (BDCCS), Vol 1, Issue 3, pp. 771-779", year: "2019", sortOrder: 0 },
      { category: "CONF_NATIONAL", title: "Noor Khafifah Khalid, Zuwairie Ibrahim, Tri Basuki Kurniawan, Zulkifli Md Yusof, Marzuki Khalid, \"Single Objective Optimization of DNA Sequence Based on Particle Swarm Optimization\", Simposium Kebangsaan Sains Matematik ke-16, Kota Bharu, Kelantan, Malaysia", year: "2008", sortOrder: 1 },

      // PATENT
      { category: "PATENT", title: "\"An ant colony system for DNA sequence design based on thermodynamics\" — Nomor Paten: PI2008 1644", year: "2008", sortOrder: 0 },
    ],
  });

  // ---------- Projects (dipetakan ke Pengabdian) ----------
  await prisma.project.deleteMany();
  const projects: { title: string; client: string; year: string; link?: string }[] = [
    { title: "Route Optimization API and Geo Parser API", client: "The Lorry Sdn Bhd, Malaysia", year: "2020" },
    { title: "Sistem Pengurusan Aktiviti Penguatkuasa Kebajikan", client: "Jabatan Perkhidmatan Veterinar, Putrajaya, Malaysia", year: "2020" },
    { title: "Natural Language Processing (NLP)/Text Mining Tools in Bahasa and Malay Language", client: "Data Mining and Optimization (DMO) Research Group, UKM, Bangi, Malaysia", year: "2019" },
    { title: "Sinkronisasi Data (Integrasi/ETL) untuk Aplikasi Simren, Simda, Simdal dan Sakip", client: "Pemda Muara Enim, Sumatera Selatan, Indonesia", year: "2018" },
    { title: "Scheduling System", client: "Universitas Bina Darma, Palembang, Indonesia", year: "2018" },
    { title: "Automatic Correction and Suggestion Indonesian Language Software (ACSILS)", client: "Universitas Bina Darma, Palembang, Indonesia", year: "2018" },
    { title: "EODirectory (Hybrid Mobile Application)", client: "Jabatan Pertanian Malaysia", year: "2017" },
    { title: "Farmer Field School (FFS) (Hybrid Mobile Application)", client: "Jabatan Pertanian Malaysia", year: "2017" },
    { title: "RiceCheck (Hybrid Mobile Application)", client: "Jabatan Pertanian Malaysia", year: "2017" },
    { title: "Sistem Informasi Akademik (SIA) — Web & Hybrid Mobile Application", client: "Politeknik Kesehatan Palembang, Indonesia", year: "2016" },
    { title: "Makmal Residu (Web Application)", client: "Jabatan Pertanian Malaysia", year: "2016" },
    { title: "Real Monitoring System for Multiple Mobile Sensoring System", client: "Universiti Tenaga Nasional (UNITEN), Malaysia", year: "2016" },
    { title: "PergauWeb — Tunnel & Cavern Monitoring and Information System (t-InfoS)", client: "Universiti Tenaga Nasional (UNITEN), Malaysia", year: "2016" },
    { title: "AgriMath — Asas Matematik Pertanian (Hybrid Mobile Application)", client: "Jabatan Pertanian Malaysia", year: "2016" },
    { title: "Tips Pertanian (Hybrid Mobile Application)", client: "Jabatan Pertanian Malaysia", year: "2016" },
    { title: "Masjid — Web Application for Mosque Management System", client: "Universiti Kebangsaan Malaysia (UKM), Malaysia", year: "2015" },
    { title: "File Tracking (Hybrid Mobile Application)", client: "Jabatan Pertanian Malaysia", year: "2015" },
    { title: "Gross Pollutant Trap (GPT) Web and Mobile Mapping Application", client: "Jabatan Pengairan dan Saliran (JPS), Malaysia", year: "2015", link: "http://shgis.alami.my/gptweb" },
    { title: "Visual Condition Assessment Main Access Tunnel (MAT) System", client: "Universiti Tenaga Nasional (UNITEN), Malaysia", year: "2015" },
    { title: "CinemAR — Reservation and Ticketing Cinema System with Augmented Reality", client: "Universiti Kebangsaan Malaysia (UKM), Malaysia", year: "2015" },
    { title: "agrIS — Information System for Product of Agriculture", client: "Jabatan Pertanian Malaysia", year: "2015", link: "http://agris.doa.gov.my/agrisv2" },
    { title: "MyXScan — Augmented Reality (AR) SDK for Android and iOS", client: "Universiti Kebangsaan Malaysia (UKM), Malaysia", year: "2015", link: "http://myxscan.net" },
    { title: "VEAS — Value Engineering Advisory System", client: "Universiti Tenaga Nasional (UNITEN), Malaysia", year: "2014", link: "http://veadvise.net" },
    { title: "Ontology Biodiversity", client: "Kementerian Sumber Asli dan Alam Sekitar, Malaysia", year: "2014" },
    { title: "eCert — Electronic Certificate (Data Integration/ETL)", client: "Jabatan Pertanian Malaysia", year: "2014", link: "http://ecert.gov.my/ecert/" },
    { title: "Mypesticide — Permohonan Sijil Racun Makhluk Perosak", client: "Jabatan Pertanian Malaysia", year: "2014", link: "http://mypesticide.doa.gov.my/mypesticide" },
    { title: "SOAP XML, Web API and SMTP/IMAP untuk MyPhyto Application", client: "Jabatan Pertanian Malaysia", year: "2014" },
    { title: "WebView untuk MyPhyto Application (Data Integration/ETL)", client: "Jabatan Pertanian Malaysia", year: "2014" },
    { title: "Malaysian Phytosanitary Certification System (MyPhyto)", client: "Jabatan Pertanian Malaysia", year: "2013", link: "http://myphyto.gov.my/v7" },
    { title: "Bank Soalan", client: "Institut Pertanian di bawah Kementerian Pertanian, Malaysia", year: "2012" },
    { title: "Portal Intranet", client: "Jabatan Penerangan Malaysia", year: "2011" },
    { title: "Official Website", client: "Jabatan Kerja Raya, Selangor, Malaysia", year: "2011" },
    { title: "Official Website", client: "JNA IT Development (M) Sdn Bhd", year: "2011" },
    { title: "Awan — Academic Writing and Author Networking (VIVO based Application)", client: "Fakulti Teknologi Sains dan Maklumat, UKM, Bangi, Selangor", year: "2011" },
    { title: "Sequent Frequent Pattern for Data Production", client: "Fakulti Teknologi Sains dan Maklumat, UKM, Bangi, Selangor", year: "2011" },
    { title: "Kursi — Kemudahan Urus Sidang (Conference Management System)", client: "Fakulti Teknologi Sains dan Maklumat, UKM, Bangi, Selangor", year: "2010", link: "http://dmo.ukm.my/kursidmo" },
    { title: "Mynda (Mine Your Own Data)", client: "Fakulti Teknologi Sains dan Maklumat, UKM, Bangi, Selangor", year: "2010", link: "http://dmo.ukm.my/mynda" },
    { title: "International Organization for Standardization (ISO) Reporting and Analysis", client: "Fakulti Teknologi Sains dan Maklumat, UKM, Bangi, Selangor", year: "2010" },
    { title: "Information Technology Strategy Performance Evaluation (ITSPE)", client: "Fakulti Teknologi Sains dan Maklumat, UKM, Bangi, Selangor", year: "2010" },
    { title: "Postgrad — Data Mining and Optimization Group Research Collaboration System (Data Integration/ETL)", client: "Fakulti Teknologi Sains dan Maklumat, UKM, Bangi, Selangor", year: "2009" },
    { title: "Information Technology Strategic Planning (ITSP) — Performance Monitoring System", client: "Fakulti Teknologi Sains dan Maklumat, UKM, Bangi, Selangor", year: "2008" },
    { title: "eProcurement", client: "PT. Pertamina, UP III, Plaju, Palembang", year: "2005" },
    { title: "Hospital Information System", client: "PT. Pertamina, UP III, Plaju, Palembang", year: "2004" },
    { title: "Integrated Cash Register and Inventory System", client: "Michael Mini Market, Palembang", year: "2004" },
    { title: "Inventory and Accounting System", client: "Christa Buana, Palembang", year: "2003" },
    { title: "Management Information System for Consortium Transportation of CPO", client: "Setia Maima, Palembang", year: "2003" },
    { title: "Management Information System for Army Weapon", client: "KODAM II Sriwijaya", year: "2002" },
    { title: "Call Back System (CBS), Bank Message", client: "PT. Handrata Dinatama, Palembang", year: "1999" },
    { title: "Easy Card — Multi-Level Marketing (MLM) Discount Card", client: "PT. Handrata Dinatama, Palembang", year: "1996" },
    { title: "Chain Supply System", client: "Group Apotik Jaya, Palembang", year: "1994" },
  ];
  await prisma.project.createMany({
    data: projects.map((p, i) => ({ ...p, sortOrder: i })),
  });

  // ---------- Teaching / Training (Pengajaran) ----------
  await prisma.teaching.deleteMany();
  const trainings: { title: string; institution: string; year: string }[] = [
    { title: "Certified Application Security Engineering (CASE)", institution: "Staff IT JPJ, Cyberjaya, Malaysia", year: "27–29 Jun 2022" },
    { title: "Development a Dynamic Web Application using PHP and MySQL", institution: "Staff IT Heitech Padu Sdn Bhd, Malaysia", year: "11–14 Okt 2021" },
    { title: "Laravel Basic Training Course (online)", institution: "Staff IT Alam Informasi, Cyberjaya, Malaysia", year: "4–5 Mei 2020" },
    { title: "Machine Learning and Chatbots based on Python Programming", institution: "Staff IT BIT Group, Cyberjaya, Malaysia", year: "27–29 Des 2019" },
    { title: "ASP.NET Core MVC Web Programming", institution: "Staff IT Kementerian Pertahanan (mindef), Malaysia", year: "16–20 Des 2019" },
    { title: "Basic Laravel and Jaspersoft Reporting Tools", institution: "Staff IT Idwal Sdn Bhd, Bangi, Selangor, Malaysia", year: "22–26 Jul 2019" },
    { title: "Advanced ASP.NET Core 2 MVC", institution: "Staff IT Alam Informasi Sdn Bhd, Cyberjaya, Malaysia", year: "16–19 Jul 2019" },
    { title: "Java and Liferay Portal Development", institution: "Staff IT Kementerian Kewangan (MOF), Presint 2, Putrajaya, Malaysia", year: "24–28 Jun 2019" },
    { title: ".NET Web Application Security", institution: "Staff IT Custommedia Sdn Bhd, Technology Park Malaysia (TPM), Bukit Jalil, Malaysia", year: "17–19 Jun 2019" },
    { title: "Java SOAP Web Services", institution: "Staff IT myIPO, UOA Bangsar, Malaysia", year: "10–14 Jun 2019" },
    { title: "Liferay Portal Development", institution: "Staff IT Heitech Padu Sdn Bhd, Malaysia", year: "12–15 Nov 2018" },
    { title: "Joget Workflow", institution: "Staff IT Heitech Padu Sdn Bhd, Malaysia", year: "1–4 Okt 2018" },
    { title: "Data Mining using RapidMiner", institution: "Dosen Program Studi Sistem Informasi, Fakultas Ilmu Komputer, Universitas Bina Darma, Palembang", year: "3–4 Sep 2018" },
    { title: "Data Mining with Python", institution: "Dosen Program Studi Teknik Informatika, Fakultas Ilmu Komputer, Universitas Bina Darma, Palembang", year: "30 Agu–1 Sep 2018" },
    { title: "Administering Microsoft SQL Server 2016", institution: "Staff IT Jabatan Pengairan dan Saliran, Putrajaya, Malaysia", year: "10–12 Okt 2017" },
    { title: "GIS Mobile Application", institution: "Staff IT Alam Informasi, Cyberjaya, Malaysia", year: "10–12 Apr 2017" },
    { title: "Advanced Microsoft SQL Server 2012", institution: "Jabatan Ukur Negara, Kuching, Sarawak, Malaysia", year: "28 Okt–2 Nov 2013" },
    { title: "Windows Server 2013", institution: "Jabatan Ukur Negara, Kota Kinabalu, Malaysia", year: "23–27 Sep 2013" },
    { title: "iReport (Jasper Report GUI Tools)", institution: "Staff Pusat Teknologi Maklumat (PTM), Universiti Kebangsaan Malaysia (UKM)", year: "20–22 Mar 2013" },
    { title: "Joomla 2.5", institution: "Staff IT Kementerian Pertahanan (mindef), Bahagian Gaji dan KETTHA, Malaysia", year: "18–19 Mar 2013" },
    { title: "Joomla 2.5", institution: "Staff IT Kementerian Dalam Negeri, Malaysia", year: "18–22 Feb 2013" },
    { title: "Visual Studio 2012 (Session 2)", institution: "Staff IT Kementerian Pertahanan (mindef), Bahagian Gaji, Malaysia", year: "29–31 Jan 2013" },
    { title: "Visual Studio 2012", institution: "Staff IT Kementerian Pertahanan (mindef), Bahagian Gaji, Malaysia", year: "2–4 Jan 2013" },
    { title: "Crystal Report 2011 (Basic–Advanced Design, Server and Programming Implementation in Visual Studio 2010 & Java)", institution: "Staff Pusat Teknologi Maklumat (PTM), UKM", year: "19–21 Des 2012" },
    { title: "ASP.NET MVC 3", institution: "Programmer Alam Informasi Sdn Bhd, Malaysia", year: "17–18 Des 2012" },
    { title: "Programming in C# with Microsoft Visual Studio 2010", institution: "Staff IT Ministry of Science, Technology and Innovation (MOSTI), Malaysia", year: "10–14 Des 2012" },
    { title: "Fundamental of Java Programming Language", institution: "Staff IT MAMPU, Jabatan Perdana Menteri Malaysia", year: "4, 5 dan 7 Des 2012" },
    { title: "Writing SQL using Ms SQL Server 2008 Transact SQL", institution: "Programmer Sdn Bhd, Malaysia", year: "21–23 Nov 2012" },
    { title: "Pentaho Open Source Reporting Tools", institution: "Staff IT Kementerian Pertahanan (mindef), Malaysia", year: "5–9 Nov 2012" },
    { title: "ColdFusion Component", institution: "Staff Pusat Teknologi Maklumat (PTM), UKM", year: "18–20 Jul 2012" },
    { title: "Fast Track and Advanced ColdFusion 9", institution: "Staff IT Proton, Malaysia", year: "18–21 Jun 2012" },
    { title: "Crystal Report XI", institution: "Staff IT Korporat di Malaysia dan Brunei", year: "14–15 Jun 2012" },
    { title: "Joomla Component", institution: "Staff IT Suruhanjaya Pilihan Raya (SPR), Malaysia", year: "11–13 Jun 2012" },
    { title: "MySQL (Administration, High Performance and High Availability)", institution: "Staff IT Kementerian Kewangan Malaysia, Bahagian Pinjaman Perumahan, Malaysia", year: "21 Mei–6 Jun 2012" },
    { title: "Web Application Technologies with Microsoft Visual Studio 2005 (2543–2544)", institution: "Staff IT Universiti Teknologi Petronas, Malaysia", year: "23–27 Apr 2012" },
    { title: "JSP and MySQL", institution: "Staff IT Kementerian Pendidikan (MOE), Bahagian Buku Teks, Malaysia", year: "13–16 Feb 2012" },
    { title: "Joomla CMS Development", institution: "Staff IT Suruhanjaya Pilihan Raya (SPR), Malaysia", year: "21–23 Nov 2011" },
    { title: "Ms Windows Server 2008", institution: "Staff IT Suruhanjaya Pilihan Raya (SPR), Malaysia", year: "14–16 Nov 2011" },
    { title: "ASP.NET with C# 2010", institution: "Badan Zakat Penang, Malaysia", year: "29 Okt–1 Nov 2011" },
    { title: "MySQL Server Administrator", institution: "Staff IT Kementerian Dalam Negeri, Malaysia", year: "10–14 Okt 2011" },
    { title: "C# Development", institution: "Staff IT Kementerian Pertahanan Malaysia, Bahagian Pencen Tentera, Malaysia", year: "4–7 Okt 2011" },
    { title: "PHP Programming", institution: "Staff IT Kementerian Pertahanan (mindef), Malaysia", year: "19 Sep 2011" },
    { title: "XHTML, CSS dan JavaScript", institution: "Staff IT Kementerian Pendidikan (MOE), Bahagian Buku Teks, Malaysia", year: "7–9 Sep 2011" },
    { title: "Pelatihan C# for Web Development", institution: "Programmer @ERP 21 Sdn Bhd, Malaysia", year: "17–19 Agu 2011" },
    { title: "Microsoft Visual Basic 2010", institution: "Tentera Udara Diraja Malaysia (TUDM)", year: "4–8 Jul 2011" },
    { title: "Course of Computer Based Training (Linux Administration & Client)", institution: "Bahagian Teknologi Maklumat, Jabatan Penerangan Malaysia", year: "23–27 Jun 2011" },
    { title: "ColdFusion 8", institution: "Staff IT Lembaga Pertubuhan Peladang, Malaysia", year: "9–13 Mei 2011" },
    { title: "PHP and MySQL — Joomla CMS Developing", institution: "Staff IT Tentera Laut Diraja Malaysia (TLDM)", year: "4–8 Apr 2011" },
    { title: "Oracle Developer 2000 Forms & Report", institution: "Staff IT Tentera Udara Diraja Malaysia (TUDM)", year: "11–15 Okt 2010" },
    { title: "Programming with Microsoft FoxPro 9", institution: "Jabatan Perkhidmatan Awam (JPA), Bahagian ICT Pasca Perkhidmatan, Malaysia", year: "31 Mei–4 Jun 2010" },
    { title: "Content Management System (CMS) Joomla", institution: "Bahagian Teknologi Maklumat, Jabatan Penerangan, Malaysia", year: "18–22 Mar 2010" },
    { title: "Certified Web Application Security Professional", institution: "Staff IT Jabatan MAMPU, Malaysia", year: "14–18 Des 2009" },
    { title: "Programming with Oracle Developer", institution: "Staff IT Majlis Bandaraya Ipoh (MBI), Malaysia", year: "7–9 Des 2009" },
    { title: "PHP and MySQL", institution: "Staff IT Jabatan MAMPU, Malaysia", year: "28 Sep–1 Okt 2009" },
    { title: "ColdFusion 8 — Advanced Programming", institution: "Staff IT UiTM, Shah Alam, Selangor, Malaysia", year: "20–24 Jul 2009" },
    { title: "Microsoft Project Server", institution: "Redynamics Asia Sdn Bhd, Malaysia", year: "6–8 Jul 2009" },
    { title: "Oracle JDeveloper and Crystal Report", institution: "Staff IT Lembaga Hasil Dalam Negeri Malaysia (LHDNM)", year: "4 Jun 2009" },
    { title: "Crystal Report — Business Reporting", institution: "Staff IT Lembaga Hasil Dalam Negeri Malaysia (LHDNM)", year: "27–28 Mei 2009" },
    { title: "Oracle JDeveloper 10g", institution: "Staff IT Lembaga Hasil Dalam Negeri Malaysia (LHDNM)", year: "18–22 Mei 2009" },
    { title: "Java, Servlet and JSP", institution: "Jabatan Peguam Negara (JPN), Malaysia", year: "10–22 Des 2008" },
    { title: "Oracle 10g Administrator", institution: "Institut Tanah dan Ukur Negara (INSTUN), Behrang, Ipoh, Malaysia", year: "26–29 Agu 2008" },
    { title: "Upgrading Web Development Skills from ASP to Microsoft ASP.NET", institution: "Bangunan SAPURA, Seri Kembangan, Malaysia", year: "4–20 Agu 2008" },
    { title: "Macromedia ColdFusion MX 7", institution: "Staff IT SUK, Selangor, Malaysia", year: "29–31 Jul 2008" },
    { title: "PHP and MySQL (CMS Joomla)", institution: "Lembaga Peperiksaan, Kementerian Pendidikan, Malaysia", year: "7–11 Apr 2008" },
  ];
  await prisma.teaching.createMany({
    data: trainings.map((t, i) => ({ ...t, sortOrder: i })),
  });

  // ---------- Admin User ----------
  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password = process.env.ADMIN_PASSWORD ?? "changeme123";
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.adminUser.upsert({
    where: { username },
    update: { passwordHash },
    create: { username, passwordHash },
  });

  console.log("Seed selesai.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
