import { useState } from 'react'

export default function ContactForm({ formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID, emailJs = {} }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState({ submitting: false, success: null, error: null })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Name validation
    if (!form.name.trim()) {
      newErrors.name = 'İsim gereklidir'
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'İsim en az 2 karakter olmalıdır'
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.email.trim()) {
      newErrors.email = 'E-posta gereklidir'
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz'
    }
    
    // Message validation
    if (!form.message.trim()) {
      newErrors.message = 'Mesaj gereklidir'
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Mesaj en az 10 karakter olmalıdır'
    } else if (form.message.trim().length > 1000) {
      newErrors.message = 'Mesaj en fazla 1000 karakter olabilir'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    // Validate form before submission
    if (!validateForm()) {
      return
    }
    
    setStatus({ submitting: true, success: null, error: null })

    try {
      // Prefer Formspree if ID provided
      if (formspreeId) {
        const resp = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(e.currentTarget),
        })
        if (!resp.ok) throw new Error('Gönderim başarısız')
        setStatus({ submitting: false, success: 'Mesajınız gönderildi.', error: null })
        setForm({ name: '', email: '', message: '' })
        return
      }

      // Example: EmailJS (client-side) optional path
      if (emailJs.serviceId && emailJs.templateId && emailJs.publicKey && window.emailjs) {
        const { serviceId, templateId, publicKey } = emailJs
        window.emailjs.init(publicKey)
        await window.emailjs.send(serviceId, templateId, form)
        setStatus({ submitting: false, success: 'Mesajınız gönderildi.', error: null })
        setForm({ name: '', email: '', message: '' })
        return
      }

      throw new Error('Yapılandırma bulunamadı (Formspree veya EmailJS).')
    } catch (err) {
      setStatus({ submitting: false, success: null, error: err.message || 'Bir hata oluştu.' })
    }
  }

  return (
    <form id="contact" onSubmit={handleSubmit} className="max-w-xl space-y-4 scroll-mt-20">
      <div>
        <label className="label" htmlFor="name">İsim</label>
        <input
          id="name"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          className={`input ${errors.name ? 'border-red-500' : ''}`}
          placeholder="Adınız"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
      <div>
        <label className="label" htmlFor="email">E-posta</label>
        <input
          id="email"
          type="email"
          name="email"
          required
          value={form.email}
          onChange={handleChange}
          className={`input ${errors.email ? 'border-red-500' : ''}`}
          placeholder="ornek@mail.com"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
      <div>
        <label className="label" htmlFor="message">Mesaj</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          required
          value={form.message}
          onChange={handleChange}
          className={`textarea ${errors.message ? 'border-red-500' : ''}`}
          placeholder="Mesajınız"
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
      </div>
      <div className="pt-2">
        <button type="submit" disabled={status.submitting} className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
          {status.submitting ? 'Gönderiliyor…' : 'Gönder'}
        </button>
      </div>
      {status.success && <p className="text-sm text-green-600">{status.success}</p>}
      {status.error && <p className="text-sm text-red-600">{status.error}</p>}
    </form>
  )
}


