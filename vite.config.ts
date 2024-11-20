import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath } from 'url';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(),
    Components({
        resolvers: [AntDesignVueResolver()]
    })
    ],

    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    }
    ,
})
