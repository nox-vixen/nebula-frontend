import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import { AuthProvider } from "../hooks/useAuth";
import { NebulaClusterProvider } from "../context/NebulaClusterContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <NebulaClusterProvider>
          <Component {...pageProps} />
        </NebulaClusterProvider>
      </AuthProvider>
    </RecoilRoot>
  );
}

export default MyApp;
