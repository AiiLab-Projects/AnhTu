import Link from "next/link";
import { siteContent } from "@/content/site";
import { Icon } from "./Icon";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p><strong>Cô Tú</strong> · {siteContent.footer.note}</p>
      <Link href="/lien-he"><Icon name="mail" size={16} /> Liên hệ Cô Tú</Link>
    </footer>
  );
}
