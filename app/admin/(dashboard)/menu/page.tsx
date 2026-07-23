import { requireAdmin } from "@/lib/dal";
import { getMenuOrder } from "@/lib/page-meta-actions";
import { MenuOrderTable } from "../../_components/menu-order-table";

export default async function MenuOrderPage() {
  await requireAdmin();
  const menu = await getMenuOrder();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Kelola Menu</h1>
      <p className="text-sm text-slate-500 mb-6">
        Seret (ikon <span className="inline-block align-middle">⠿</span>) untuk mengubah urutan
        menu di sidebar admin. Untuk mengubah nama menu, buka menu tersebut lalu klik ikon pensil
        di sebelah judul.
      </p>
      <MenuOrderTable items={menu} />
    </div>
  );
}
