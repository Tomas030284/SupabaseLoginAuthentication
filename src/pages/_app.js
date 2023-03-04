// import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <header>
        <h1>📗 IziQ-Study</h1>
      </header>
      <Component {...pageProps} />
    </>
  );
}
