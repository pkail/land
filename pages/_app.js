import '@/styles/globals.css'
import {NextUIProvider} from "@nextui-org/react";
import { saveState, loadState } from '../components/localStorage';
import { Provider } from 'react-redux';
import { wrapper } from '../components/store';
require ('../styles/globals.css');

export default function App({ Component, pageProps }) {
 const { store, props } = wrapper.useWrappedStore(pageProps);
  store.subscribe(() => saveState({
		acre: store.getState().acre,
		range: store.getState().range}))
	  return (
	  <Provider store={store}>
		  <NextUIProvider>
		  <Component {...pageProps} />
	  </NextUIProvider>
	  </Provider>
  );
}
