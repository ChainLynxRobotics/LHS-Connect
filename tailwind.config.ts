import type { Config } from "tailwindcss";
import flowbite from "flowbite/plugin";

export default {
    content: [
        "./src/**/*.{html,js,svelte,ts}",
        "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
    ],
    theme: {
        extend: {
            colors: {
                
            }
        }
    },

    plugins: [
        flowbite
    ],

    darkMode: "class",
} as Config;