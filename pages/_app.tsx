import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import type { AppProps } from "next/app";
import { MantineProvider, createTheme } from "@mantine/core";
import MainLayout from "@/src/Layout/MainLayout";
import { Provider } from "react-redux";
import { store } from "@/src/redux/store";
import { Notifications } from "@mantine/notifications";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <MainLayout>
          <Notifications position="top-right" />
          <Component {...pageProps} />
        </MainLayout>
      </Provider>
    </MantineProvider>
  );
}
