export async function generateStaticParams() {
  return [{ lang: 'ru' }, { lang: 'az' }, { lang: 'en' }, { lang: 'es' }]
}

export default function LangLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
