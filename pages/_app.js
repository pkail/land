import '@/styles/globals.css'
import {NextUIProvider} from "@nextui-org/react";
import { Provider } from 'react-redux';
import { wrapper } from '../components/store';

export default function App({ Component, pageProps }) {
 const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
	  <Provider store={store}>
		  <NextUIProvider>
		  <Component {...pageProps} />
	  </NextUIProvider>
	  </Provider>
  );
}
