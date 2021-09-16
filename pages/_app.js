import { Provider } from 'next-auth/client';
import DBProvider from '../DBContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <DBProvider>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </DBProvider>
  )
}

export default MyApp;