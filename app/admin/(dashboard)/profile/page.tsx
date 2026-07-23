import { Suspense } from "react";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { updateProfile } from "./actions";
import { ProfilePhotoField } from "../../_components/profile-photo-field";
import { SavedToast } from "../../_components/saved-toast";

export default async function AdminProfilePage() {
  await requireAdmin();
  const profile = await prisma.profile.findFirst();

  return (
    <div className="max-w-2xl">
      <Suspense fallback={null}>
        <SavedToast />
      </Suspense>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Edit Profil</h1>

      <form action={updateProfile} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
        <ProfilePhotoField name="photoUrl" label="Foto Profil" defaultValue={profile?.photoUrl} />

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            required
            defaultValue={profile?.name ?? ""}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Jabatan / Gelar <span className="text-red-500">*</span>
          </label>
          <input
            name="title"
            required
            defaultValue={profile?.title ?? ""}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Bio <span className="text-red-500">*</span>
          </label>
          <textarea
            name="bio"
            required
            rows={6}
            defaultValue={profile?.bio ?? ""}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              name="email"
              defaultValue={profile?.email ?? ""}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Telepon</label>
            <input
              name="phone"
              defaultValue={profile?.phone ?? ""}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Alamat</label>
          <input
            name="address"
            defaultValue={profile?.address ?? ""}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">URL Scopus</label>
            <input
              name="scopusUrl"
              defaultValue={profile?.scopusUrl ?? ""}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">h-index Scopus</label>
            <input
              name="scopusHIndex"
              defaultValue={profile?.scopusHIndex ?? ""}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">URL Google Scholar</label>
            <input
              name="scholarUrl"
              defaultValue={profile?.scholarUrl ?? ""}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">h-index Scholar</label>
            <input
              name="scholarHIndex"
              defaultValue={profile?.scholarHIndex ?? ""}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-primary hover:bg-blue-900 text-white rounded-lg transition-colors font-medium"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
