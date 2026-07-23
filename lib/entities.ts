export type FieldType = "text" | "textarea" | "url" | "number" | "checkbox" | "select" | "image";

export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { value: string; label: string }[];
};

export type EntityConfig = {
  slug: string;
  label: string;
  model: string;
  fields: FieldConfig[];
  listColumns: string[];
  titleField: string;
};

export const PUBLICATION_CATEGORIES = [
  { value: "BOOK", label: "Buku" },
  { value: "BOOK_CHAPTER", label: "Book Chapter" },
  { value: "JOURNAL_INTL", label: "Jurnal Internasional" },
  { value: "JOURNAL_NATIONAL", label: "Jurnal Nasional" },
  { value: "CONF_INTL", label: "Konferensi Internasional" },
  { value: "CONF_NATIONAL", label: "Konferensi Nasional" },
  { value: "PATENT", label: "Paten" },
];

export const ENTITIES: EntityConfig[] = [
  {
    slug: "education",
    label: "Pendidikan",
    model: "education",
    titleField: "level",
    listColumns: ["level", "institution", "period"],
    fields: [
      { name: "level", label: "Jenjang (mis. S3 — Doktor)", type: "text", required: true },
      { name: "institution", label: "Institusi", type: "text", required: true },
      { name: "faculty", label: "Fakultas", type: "text" },
      { name: "major", label: "Program Studi / Jurusan", type: "text" },
      { name: "period", label: "Periode (mis. 2010 – 2018)", type: "text", required: true },
      { name: "location", label: "Lokasi", type: "text" },
      { name: "sortOrder", label: "Urutan Tampil", type: "number" },
    ],
  },
  {
    slug: "experience",
    label: "Pengalaman Kerja",
    model: "experience",
    titleField: "position",
    listColumns: ["position", "institution", "period"],
    fields: [
      { name: "position", label: "Jabatan / Posisi", type: "text", required: true },
      { name: "institution", label: "Institusi", type: "text", required: true },
      { name: "period", label: "Periode", type: "text", required: true },
      { name: "current", label: "Masih Berjalan", type: "checkbox" },
      { name: "sortOrder", label: "Urutan Tampil", type: "number" },
    ],
  },
  {
    slug: "teaching",
    label: "Pengajaran",
    model: "teaching",
    titleField: "title",
    listColumns: ["title", "institution", "year"],
    fields: [
      { name: "title", label: "Topik / Materi", type: "text", required: true },
      { name: "institution", label: "Instansi", type: "text", required: true },
      { name: "year", label: "Tahun / Tanggal", type: "text", required: true },
      { name: "description", label: "Keterangan", type: "textarea" },
      { name: "link", label: "Tautan", type: "url" },
      { name: "sortOrder", label: "Urutan Tampil", type: "number" },
    ],
  },
  {
    slug: "publication",
    label: "Publikasi",
    model: "publication",
    titleField: "title",
    listColumns: ["category", "title", "year"],
    fields: [
      { name: "category", label: "Kategori", type: "select", required: true, options: PUBLICATION_CATEGORIES },
      { name: "title", label: "Judul / Sitasi Lengkap", type: "textarea", required: true },
      { name: "authors", label: "Penulis", type: "text" },
      { name: "year", label: "Tahun", type: "text", required: true },
      { name: "venue", label: "Penerbit / Jurnal / Konferensi", type: "text" },
      { name: "details", label: "Detail Tambahan", type: "textarea" },
      { name: "link", label: "Tautan", type: "url" },
      { name: "sortOrder", label: "Urutan Tampil", type: "number" },
    ],
  },
  {
    slug: "project",
    label: "Pengabdian",
    model: "project",
    titleField: "title",
    listColumns: ["title", "client", "year"],
    fields: [
      { name: "title", label: "Nama Proyek/Kegiatan", type: "text", required: true },
      { name: "year", label: "Tahun", type: "text", required: true },
      { name: "client", label: "Instansi / Mitra", type: "text" },
      { name: "description", label: "Deskripsi", type: "textarea" },
      { name: "link", label: "Tautan", type: "url" },
      { name: "imageUrl", label: "Gambar (opsional)", type: "image" },
      { name: "sortOrder", label: "Urutan Tampil", type: "number" },
    ],
  },
  {
    slug: "skill",
    label: "Keahlian Teknis",
    model: "skill",
    titleField: "category",
    listColumns: ["category", "items"],
    fields: [
      { name: "category", label: "Kategori", type: "text", required: true },
      { name: "items", label: "Daftar Keahlian (pisahkan dengan koma)", type: "textarea", required: true },
      { name: "sortOrder", label: "Urutan Tampil", type: "number" },
    ],
  },
  {
    slug: "research-interest",
    label: "Minat Riset",
    model: "researchInterest",
    titleField: "text",
    listColumns: ["text"],
    fields: [
      { name: "text", label: "Minat Riset", type: "textarea", required: true },
      { name: "sortOrder", label: "Urutan Tampil", type: "number" },
    ],
  },
  {
    slug: "certification",
    label: "Sertifikasi",
    model: "certification",
    titleField: "title",
    listColumns: ["title", "provider", "year"],
    fields: [
      { name: "title", label: "Nama Sertifikasi / Pelatihan", type: "text", required: true },
      { name: "year", label: "Tahun", type: "text", required: true },
      { name: "provider", label: "Penyelenggara", type: "text" },
      { name: "sortOrder", label: "Urutan Tampil", type: "number" },
    ],
  },
  {
    slug: "link",
    label: "Tautan",
    model: "customLink",
    titleField: "label",
    listColumns: ["label", "url"],
    fields: [
      { name: "label", label: "Label", type: "text", required: true },
      { name: "url", label: "URL", type: "url", required: true },
      { name: "icon", label: "Ikon (opsional)", type: "text" },
      { name: "sortOrder", label: "Urutan Tampil", type: "number" },
    ],
  },
];

export function getEntity(slug: string): EntityConfig | undefined {
  return ENTITIES.find((e) => e.slug === slug);
}
