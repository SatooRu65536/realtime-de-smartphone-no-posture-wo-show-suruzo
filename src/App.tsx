import { useEffect } from "react";
import { listen } from "@tauri-apps/api/event";

export default function App() {
  useEffect(() => {
    (async () => {
      const unlisten = await listen("message", (event) => {
        console.log(event.payload);
      });

      return () => {
        unlisten();
      };
    })();
  }, []);

  return <main>Hello</main>;
}
