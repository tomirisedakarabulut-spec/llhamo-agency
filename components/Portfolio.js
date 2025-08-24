const projects = [
  { 
    name: 'E-Ticaret Platformu', 
    image: '/portfolio/1.svg',
    category: 'Web Tasarım',
    description: 'Modern e-ticaret deneyimi',
    link: '#case-study-1'
  },
  { 
    name: 'Kurumsal Web Sitesi', 
    image: '/portfolio/2.svg',
    category: 'Kurumsal',
    description: 'B2B odaklı kurumsal çözüm',
    link: '#case-study-2'
  },
  { 
    name: 'Mobil Uygulama', 
    image: '/portfolio/3.svg',
    category: 'Mobil',
    description: 'iOS & Android uygulaması',
    link: '#case-study-3'
  },
  { 
    name: 'Sosyal Medya Kampanyası', 
    image: '/portfolio/4.svg',
    category: 'Sosyal Medya',
    description: '360° dijital kampanya',
    link: '#case-study-4'
  },
  { 
    name: 'Marka Kimliği', 
    image: '/portfolio/5.svg',
    category: 'Branding',
    description: 'Kapsamlı marka yenileme',
    link: '#case-study-5'
  },
  { 
    name: 'SaaS Dashboard', 
    image: '/portfolio/6.svg',
    category: 'UI/UX',
    description: 'Kullanıcı dostu arayüz',
    link: '#case-study-6'
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="section scroll-mt-20 bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Portfolyomuz
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Son projelerimizden örnekler ve başarı hikayelerimiz.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <a
            key={p.name}
            href={p.link}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img loading="lazy" src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-600 rounded-full mb-3">
                  {p.category}
                </span>
                <h3 className="text-lg font-bold mb-2">{p.name}</h3>
                <p className="text-sm opacity-90 mb-4">{p.description}</p>
                <div className="flex items-center text-sm font-medium">
                  <span>Detaylar</span>
                  <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}


