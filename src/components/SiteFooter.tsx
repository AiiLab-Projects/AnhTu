import Link from "next/link";
import { siteContent } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p><strong>Cô Tú</strong> · {siteContent.footer.note}</p>
      <Link href="/lien-he">✉️ Liên hệ Cô Tú</Link>
    </footer>
  );
}
