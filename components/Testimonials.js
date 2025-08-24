import { useEffect, useState } from 'react'

const defaultTestimonials = [
  {
    name: 'Ayşe Demir',
    avatar: '/avatars/1.svg',
    text: 'Lhamo ile çalışmak markamız için dönüm noktası oldu. Hem tasarım hem performans açısından beklentimizin üzerine çıktılar.'
  },
  {
    name: 'Mehmet Yılmaz',
    avatar: '/avatars/2.svg',
    text: 'Hızlı, profesyonel ve sonuç odaklı bir ekip. Proje süreci boyunca iletişim kusursuzdu.'
  },
  {
    name: 'Elif Kaya',
    avatar: '/avatars/3.svg',
    text: 'Strateji ve uygulama tarafında harika bir iş çıkardılar. Kesinlikle tavsiye ederim.'
  }
]

export default function Testimonials({ items = defaultTestimonials, autoPlayMs = 4000 }) {
  const [index, setIndex] = useState(0)

  const total = items.length

  const goTo = (i) => setIndex(((i % total) + total) % total)
  const next = () => goTo(index + 1)
  const prev = () => goTo(index - 1)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % total)
    }, autoPlayMs)
    return () => clearInterval(id)
  }, [total, autoPlayMs])

  return (
    <section id="testimonials" className="section scroll-mt-20 bg-white">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Müşteri Görüşleri
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Bizimle çalışan müşterilerimizin deneyimleri.
        </p>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((t) => (
            <div key={t.name} className="min-w-full p-10 sm:p-12">
              <div className="mx-auto max-w-3xl text-center">
                <div className="mx-auto h-16 w-16 overflow-hidden rounded-full shadow-md ring-4 ring-blue-100">
                  <img loading="lazy" src={t.avatar} alt={t.name} className="h-full w-full object-cover" />
                </div>
                <p className="mt-6 text-lg text-gray-800 leading-relaxed">"{t.text}"</p>
                <div className="mt-4 font-semibold text-gray-900">{t.name}</div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Önceki yorum"
          className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-900 shadow-sm hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path fillRule="evenodd" d="M12.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L8.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Sonraki yorum"
          className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-900 shadow-sm hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path fillRule="evenodd" d="M7.293 4.293a1 1 0 011.414 0L13.707 9.293a1 1 0 010 1.414L8.707 15.707a1 1 0 01-1.414-1.414L11.586 10 7.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Slayt ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2.5 w-2.5 rounded-full ${index === i ? 'bg-blue-600' : 'bg-gray-300'} transition-colors`}
          />
        ))}
      </div>
    </section>
  )
}


