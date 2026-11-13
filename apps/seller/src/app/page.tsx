import { Button, Card } from "@waslu/ui";
import { t } from "@/i18n";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-3xl min-w-[360px] p-4 xs:p-6">
      <Card className="space-y-3">
        <p className="text-sm text-neutral-600">{t("seller.home.meta")}</p>
        <h1 className="text-2xl font-semibold text-neutral-900">{t("seller.home.title")}</h1>
        <p className="text-neutral-700">{t("seller.home.description")}</p>
        <Button>{t("seller.home.cta")}</Button>
        <p>Issue 1 doneee</p>
      </Card>
    </main>
  );
}
