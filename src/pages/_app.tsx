import { Provider } from "@/components/ui/provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NuqsAdapter } from "nuqs/adapters/next/pages";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

import { Toaster } from "@/components/ui/toaster";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <NuqsAdapter>
        <DndProvider
          backend={TouchBackend || HTML5Backend}
          options={{ enableMouseEvents: true }}
        >
          <Toaster />
          <Component {...pageProps} />
        </DndProvider>
      </NuqsAdapter>
    </Provider>
  );
}
