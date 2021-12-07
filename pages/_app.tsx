import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "../redux/reducers";
import { Provider } from "react-redux";
import LoggedIn from "../components/utils/LoggedIn";
import Loading from "../components/utils/Loading";

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
