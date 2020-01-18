import App from 'next/app';
import { useState } from 'react';
import { UserContext } from '../context';
import "../styles.less";

function MyApp({ Component, pageProps, user }) {
    const [state, setState] = useState({ user });
    if (user && user._id != state.user._id) {
        setState({ user });
    }
    return <UserContext.Provider value={state}>
        <Component {...pageProps} />
    </UserContext.Provider>
}

MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext);
    const user = appContext.ctx.req && appContext.ctx.req.user;
    return { ...appProps, user }
}

export default MyApp;