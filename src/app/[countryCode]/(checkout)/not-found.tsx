import InteractiveLink from "@modules/common/components/interactive-link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "404",
  description: "Coś poszło nie tak",
}

export default async function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi text-ui-fg-base">Strona nie została znaleziona</h1>
      <p className="text-small-regular text-ui-fg-base">
        Strona, którą próbowałe(a)ś wyświetlić nie istnieje.
      </p>
      <InteractiveLink href="/">Wróć do strony głównej</InteractiveLink>
    </div>
  )
}
