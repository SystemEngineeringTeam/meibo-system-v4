import pandacss from "@pandacss/dev/postcss";
import { reactRouter } from "@react-router/dev/vite";
import postcssPresetEnv from "postcss-preset-env";
import AutoImport from "unplugin-auto-import/vite";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths(),

    // NOTE: インポートなしにアイコンを使用できるようにするための設定
    // ref: https://github.com/unplugin/unplugin-icons/blob/3831eb07d96e94d503df62f45512f3ca3e50cc26/README.md#auto-importing
    AutoImport({
      resolvers: [
        IconsResolver({
          prefix: "Icon",
          extension: "jsx",
        }),
      ],
    }),
    Icons({
      autoInstall: true,
      compiler: "jsx",
      jsx: "react",
    }),
  ],
  css: {
    postcss: {
      plugins: [
        // @ts-expect-error: 本来 `postcss.config.cjs` で設定するものをここで設定している
        pandacss,
        // NOTE: PandaCSS で勧められている `autoprefixer`, `@csstools/postcss-cascade-layers` を内包している `postcss-preset-env` を使用
        // ref: https://github.com/csstools/postcss-plugins/tree/27b9126dc2f049aa20b02f7e3dbbb2c5c6c87f43/plugin-packs/postcss-preset-env
        postcssPresetEnv,
      ],
    },
  },

});
