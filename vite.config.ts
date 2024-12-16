import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [viteCommonjs(), reactRouter(), tsconfigPaths()],
});
