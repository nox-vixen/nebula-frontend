import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode
} from "react";

interface ClusterContextValue {
  visible: boolean;
  setVisible: (value: boolean) => void;

  countdown: number;
  setCountdown: (value: number) => void;

  refreshing: boolean;
  setRefreshing: (value: boolean) => void;
}

const NebulaClusterContext =
  createContext<ClusterContextValue | null>(null);

export function NebulaClusterProvider({
  children
}: {
  children: ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [refreshing, setRefreshing] = useState(false);

  const value = useMemo(
    () => ({
      visible,
      setVisible,
      countdown,
      setCountdown,
      refreshing,
      setRefreshing
    }),
    [visible, countdown, refreshing]
  );

  return (
    <NebulaClusterContext.Provider value={value}>
      {children}
    </NebulaClusterContext.Provider>
  );
}

export function useNebulaCluster() {
  const ctx = useContext(NebulaClusterContext);

  if (!ctx) {
    throw new Error(
      "useNebulaCluster must be used inside NebulaClusterProvider"
    );
  }

  return ctx;
}
