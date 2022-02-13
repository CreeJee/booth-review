import { inspect } from '@xstate/inspect';
import type { AppProps } from 'next/app';
import '../styles/globals.css';


inspect({
  // options
  // url: 'https://statecharts.io/inspect', // (default)
  iframe: false // open in new window
});
function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App
