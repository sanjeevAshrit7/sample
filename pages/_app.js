import '../styles/globals.css'
import Link from 'next/link';


function MyApp({ Component, pageProps }) {
  return (
    <>
      <nav>
        <div>
          <Link href='/'>
              <a>
                <h1>
                  San's kitchen
                </h1>
              </a>
          </Link>
        </div>
      </nav>
      <main>
       < Component {...pageProps } />
      </main>
    </>
  )
}

export default MyApp
