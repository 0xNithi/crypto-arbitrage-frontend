import React from "react";
import { ChevronDownIcon, ColorSwatchIcon } from "@heroicons/react/outline";

import { themes } from "./config";

function ThemeSwitch() {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="flex gap-1 btn">
        <ColorSwatchIcon className="w-5 h-5" />
        <span className="hidden sm:inline">Theme</span>
        <ChevronDownIcon className="w-5 h-5" />
      </label>
      <ul
        tabIndex={0}
        className="p-2 space-y-2 overflow-y-auto rounded shadow dropdown-content menu bg-base-200 w-44 max-h-64"
      >
        {themes.map((theme) => (
          <li data-theme={theme} className="rounded">
            <button
              data-set-theme={theme}
              data-act-class="outline-base-content"
              className="!rounded p-2 bg-base-100 text-base-content capitalize"
            >
              <div class="flex-grow text-sm font-bold text-left">{theme}</div>
              <div class="flex flex-wrap flex-shrink-0 gap-1">
                <div class="w-2 h-2 rounded bg-primary" />
                <div class="w-2 h-2 rounded bg-secondary" />
                <div class="w-2 h-2 rounded bg-accent" />
                <div class="w-2 h-2 rounded bg-neutral" />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ThemeSwitch;
