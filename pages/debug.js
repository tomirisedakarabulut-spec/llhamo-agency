export default function Debug() {
  return (
    <div style={{ padding: '20px', backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
      <h1>Debug Sayfası</h1>
      <p>Bu sayfa çalışıyorsa, temel Next.js kurulumu doğru.</p>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: 'red', color: 'white' }}>
        <h2>Test Bileşeni</h2>
        <p>Bu kırmızı kutu görünüyorsa, CSS çalışıyor.</p>
      </div>
    </div>
  )
}
