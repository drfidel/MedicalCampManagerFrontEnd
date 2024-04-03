import Head from 'next/head'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/css/bootstrap.css"
import { Provider } from 'react-redux';
import store from '../src/redux/store/store';
import dynamic from 'next/dynamic';

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children }

    </div>
  )
  
}
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
          <SafeHydrate><Component {...pageProps} /></SafeHydrate>
      </Provider>
    </>
  )
  }

  export default dynamic(() => Promise.resolve(MyApp), {
    ssr: false,
  });