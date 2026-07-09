import { useCallback, useEffect, useState } from "react";
import { useNebulaCluster } from "../context/NebulaClusterContext";

export interface HomeSection {
  title: string;
  type: string;
  items: any[];
}

export interface HomePayload {
  success: boolean;
  provider?: string;
  cached?: boolean;
  refreshing?: boolean;
  sections: {
    banner: any[];
    sections: HomeSection[];
  };
}

export function useHomeData(initial: HomePayload) {
  const [home, setHome] = useState(initial);

  const cluster = useNebulaCluster();

  const reload = useCallback(async () => {
    try {
      const res = await fetch("/api/home");
      const json: HomePayload = await res.json();

      setHome(json);

      if (json.refreshing) {
        cluster.setRefreshing(true);
        cluster.setVisible(true);
      } else {
        cluster.setRefreshing(false);
        cluster.setVisible(false);
      }
    } catch (err) {
      console.error("[useHomeData]", err);
    }
  }, [cluster]);

  useEffect(() => {
    if (initial.refreshing) {
      cluster.setRefreshing(true);
      cluster.setVisible(true);
    }
  }, [initial.refreshing, cluster]);

  return {
    home,
    reload,
    setHome
  };
}
