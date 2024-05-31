import { store, wrapper } from '@/store/store';
import { HYDRATE } from 'next-redux-wrapper';
import React, { useEffect } from 'react';
import { Provider, useStore } from 'react-redux';

function App({ Component, pageProps }: any) {
    const { store, props } = wrapper.useWrappedStore(pageProps);
    return (
        <Provider store={store}>
            <Component {...props} />
        </Provider>
    );
}

export default wrapper.withRedux(App)