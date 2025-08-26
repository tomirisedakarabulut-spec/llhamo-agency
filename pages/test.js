import Head from 'next/head'

export default function Test() {
  return (
    <>
      <Head>
        <title>Test Page</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">Test Page Works!</h1>
      </div>
    </>
  )
}
