'use client'

import { useState, useEffect, useRef } from 'react'

const content = {
  ru: {
    tagline: ['Скоро здесь будет о гештальте в Азербайджане.', 'А возможно о гештальте от А до Z.', 'Возможно, получится создать профессиональную среду для гештальт терапевтов.'],
    sections: [
      ['Про эмоции', 'Описание, как их проживать, произведения искусства и выдержки из книг, кинофильмов, стихов. Ведь точно ты не один сейчас это чувствуешь.'],
      ['Базовые задачи', 'С которыми работает гештальт терапия: сепарация, возрастные кризисы, депрессия, зависимости. Основные книги и библиотека знаний.'],
      ['Терапевты', 'Подтверждённые дипломами, с личной терапией и супервизией. Только те, у кого всё в порядке с базовыми нормами.'],
      ['Авторы', 'Блог тех, кто хочет писать и насыщать профессиональное пространство. Под статьёй — не лайк, а карта эмоций.'],
      ['Коллективная эмоция', 'Из суммы всех эмоций складывается фон этого сайта. Он будет цветным, живым и меняться от взаимодействия с нами.'],
    ],
    author: 'Такова идея ♥  А я — Любa Литовченко',
    insta: 'Пока можно подписаться на мой instagram',
  },
  az: {
    tagline: ['Tezliklə burada Azərbaycanda Gestalt haqqında olacaq.', 'Bəlkə də A-dan Z-yə qədər Gestalt haqqında.', 'Bəlkə Gestalt terapevtləri üçün peşəkar mühit yaratmaq mümkün olacaq.'],
    sections: [
      ['Emosiyalar haqqında', 'Onları necə yaşamaq, sənət əsərləri, kitablardan, filmlərdən, şeirlərdən parçalar. Axı bu hissi indi tək sən yaşamırsan.'],
      ['Əsas məsələlər', 'Gestalt terapiyasının işlədiyi mövzular: ayrılıq, yaş böhranları, depressiya, asılılıqlar. Əsas kitablar və bilik kitabxanası.'],
      ['Terapevtlər', 'Diplomları təsdiqlənmiş, şəxsi terapiyası və superviziyası olan mütəxəssislər. Yalnız əsas normalara uyğun olanlar.'],
      ['Müəlliflər', 'Peşəkar məkana töhfə vermək istəyənlərin bloqu. Məqalənin altında like deyil — emosiya xəritəsi.'],
      ['Kollektiv emosiya', 'Bütün emosiyaların cəmindən saytın fonu yaranır. O rəngli, canlı olacaq və bizimlə qarşılıqlı əlaqədən dəyişəcək.'],
    ],
    author: 'Bu belədir ♥  Mən — Lyubov Litovçenko',
    insta: 'İndi instagramıma abunə ola bilərsiniz',
  },
  en: {
    tagline: ['Soon this will be about Gestalt therapy in Azerbaijan.', 'Perhaps about Gestalt from A to Z.', 'Perhaps a professional space for Gestalt therapists.'],
    sections: [
      ['About emotions', "How to live through them — art, excerpts from books, films, poetry. Because you're definitely not the only one feeling this right now."],
      ['Core themes', 'What Gestalt therapy works with: separation, life-stage crises, depression, addiction. Key books and a knowledge library.'],
      ['Therapists', 'Verified by diplomas, with personal therapy and supervision. Only those who meet the basic professional standards.'],
      ['Authors', 'A blog for those who want to write and enrich the professional space. Below each article — not a like, but an emotion map.'],
      ['Collective emotion', "The sum of all emotions shapes this site's background. It will be colourful, alive, and change through interaction with us."],
    ],
    author: "That's the idea ♥  I'm Lyubov Litovchenko",
    insta: 'For now, you can follow my instagram',
  },
  es: {
    tagline: ['Pronto esto será sobre la terapia Gestalt en Azerbaiyán.', 'Quizás sobre el Gestalt de la A a la Z.', 'Quizás lograremos crear un espacio profesional para terapeutas Gestalt.'],
    sections: [
      ['Sobre las emociones', 'Cómo vivirlas: arte, fragmentos de libros, películas, poesía. Porque definitivamente no eres el único que siente esto ahora.'],
      ['Temas centrales', 'Con qué trabaja la terapia Gestalt: separación, crisis vitales, depresión, adicciones. Libros clave y una biblioteca de conocimiento.'],
      ['Terapeutas', 'Verificados con diplomas, con terapia personal y supervisión. Solo quienes cumplen los estándares profesionales básicos.'],
      ['Autores', 'Un blog para quienes quieren escribir y enriquecer el espacio profesional. Bajo cada artículo — no un like, sino un mapa de emociones.'],
      ['Emoción colectiva', 'La suma de todas las emociones forma el fondo de este sitio. Será colorido, vivo y cambiará con nuestra interacción.'],
    ],
    author: 'Esa es la idea ♥  Soy Lyubov Litovchenko',
    insta: 'Por ahora puedes seguirme en instagram',
  },
}

type Lang = keyof typeof content

interface Bubble {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  hue: number
  phase: number
  speed: number
}

export default function Home() {
  const [lang, setLang] = useState<Lang>('ru')
  const [mounted, setMounted] = useState(false)
useEffect(() => setMounted(true), [])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bubblesRef = useRef<Bubble[]>([])
  const frameRef = useRef<number>(0)
  const tRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    bubblesRef.current = Array.from({ length: 18 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 40 + Math.random() * 90,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -0.15 - Math.random() * 0.3,
      hue: 60 + Math.random() * 60,
      phase: Math.random() * Math.PI * 2,
      speed: 0.008 + Math.random() * 0.012,
    }))

    const drawBubble = (b: Bubble, t: number) => {
      const shimmer = (Math.sin(t * b.speed + b.phase) + 1) / 2
      const hue = b.hue + shimmer * 40
      const grad = ctx.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.05, b.x, b.y, b.r)
      grad.addColorStop(0, `hsla(${hue}, 90%, 95%, 0.65)`)
      grad.addColorStop(0.4, `hsla(${hue + 20}, 80%, 80%, 0.3)`)
      grad.addColorStop(0.85, `hsla(${hue + 40}, 70%, 65%, 0.18)`)
      grad.addColorStop(1, `hsla(${hue}, 60%, 75%, 0.05)`)
      ctx.beginPath()
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()
      ctx.beginPath()
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
      ctx.strokeStyle = `hsla(${hue}, 70%, 85%, 0.45)`
      ctx.lineWidth = 1.2
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(b.x - b.r * 0.28, b.y - b.r * 0.28, b.r * 0.18, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(${hue}, 100%, 98%, 0.6)`
      ctx.fill()
    }

    const loop = () => {
      tRef.current++
      const t = tRef.current
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const b of bubblesRef.current) {
        b.x += b.vx + Math.sin(t * 0.01 + b.phase) * 0.2
        b.y += b.vy
        if (b.y + b.r < 0) { b.y = canvas.height + b.r; b.x = Math.random() * canvas.width }
        if (b.x - b.r > canvas.width) b.x = -b.r
        if (b.x + b.r < 0) b.x = canvas.width + b.r
        drawBubble(b, t)
      }
      frameRef.current = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(frameRef.current)
    }
  }, [mounted])

  const d = content[lang]
  const langs: Lang[] = ['ru', 'az', 'en', 'es']

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-2 py-4 sm:p-8">
      {mounted && <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />}

      {/* Language switcher */}
      <div className="relative z-10 flex gap-2 mb-6">
        {langs.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className="text-xs font-semibold tracking-widest px-4 py-1.5 rounded-full border-[1.5px] transition-all duration-200 backdrop-blur-sm"
            style={{
              fontFamily: 'Nunito, sans-serif',
              background: lang === l ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.25)',
              color: lang === l ? '#0d3a55' : '#4a7a96',
              borderColor: lang === l ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.5)',
              fontWeight: lang === l ? 700 : 600,
              boxShadow: lang === l ? '0 2px 12px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-2xl rounded-3xl px-4 py-6 sm:px-14 sm:py-12"
        style={{
          background: 'rgba(255,255,255,0.72)',
          backdropFilter: 'blur(18px)',
          border: '1px solid rgba(255,255,255,0.8)',
        }}
      >
        <h1 className="text-center mb-5" style={{ fontFamily: 'Nunito, sans-serif', fontSize: 'clamp(34px, 10vw, 52px)', fontWeight: 300, color: '#0d1b2e', letterSpacing: '-0.01em', lineHeight: 1 }}>
          Gestalt.az
        </h1>

        <p className="text-center mb-8 italic" style={{ fontFamily: 'Nunito, sans-serif', fontSize: '15px', color: '#3a5a72', lineHeight: 1.75 }}>
          {d.tagline.map((line, i) => (<span key={i}>{line}{i < d.tagline.length - 1 && <br />}</span>))}
        </p>

        <hr className="mb-6" style={{ borderColor: 'rgba(0,0,0,0.07)' }} />

        <div>
          {d.sections.map(([title, text]) => (
            <div key={title} className="py-3 border-b last:border-b-0" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
              <p className="flex items-center gap-2 mb-1" style={{ fontFamily: 'Nunito, sans-serif', fontSize: '14px', fontWeight: 600, color: '#0d1b2e' }}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#e91e8c' }} />
                {title}
              </p>
              <p className="pl-3.5" style={{ fontFamily: 'Nunito, sans-serif', fontSize: '13px', color: '#5a7a90', lineHeight: 1.65 }}>{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-7 text-center">
          <p className="italic mb-1" style={{ fontFamily: 'Nunito, sans-serif', fontSize: '15px', color: '#3a5a72' }}>{d.author}</p>
          <span className="block mb-4" style={{ fontFamily: 'Nunito, sans-serif', fontSize: '12px', color: '#8aabbd' }}>{d.insta}</span>
          <a
            href="https://instagram.com/LyubaLit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full text-white text-sm font-semibold transition-all hover:opacity-90 hover:scale-105"
            style={{ fontFamily: 'Nunito, sans-serif', background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            LyubaLit
          </a>
        </div>
      </div>
    </main>
  )
}
