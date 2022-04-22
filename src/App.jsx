import React, { useEffect } from "react";
import { themeChange } from "theme-change";

import ThemeSwitch from "./components/ThemeSwitch";

function App() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto">
      <div className="flex flex-row items-center justify-between m-1">
        <div className="text-2xl font-medium">Crypto Arbitrage</div>
        <ThemeSwitch />
      </div>
    </div>
  );
}

export default App;
