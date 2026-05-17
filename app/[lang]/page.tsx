import { notFound } from 'next/navigation'
import HomeClient from './HomeClient'

const locales = ['ru', 'az', 'en', 'es'] as const
type Lang = (typeof locales)[number]

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!locales.includes(lang as Lang)) notFound()
  return <HomeClient lang={lang as Lang} />
}
