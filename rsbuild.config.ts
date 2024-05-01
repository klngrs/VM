import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";

export default defineConfig({
  server: {
    port: 2000,
  },
  dev: {
    // It is necessary to configure assetPrefix, and in the production environment, you need to configure output.assetPrefix
    assetPrefix: 'http://localhost:2000',
    startUrl: 'http://localhost:2000/mf-manifest.json',
    writeToDisk: true,
  },
  output: {
    assetPrefix: 'https://gateway.ipfs.io/ipns/klngrs.cloud/', // near-vm ipfs folder CID
    // externals: {
    //   react: {
    //     commonjs: "react",
    //     commonjs2: "react",
    //     amd: "react",
    //     root: "React",
    //   },
    //   "react-dom": {
    //     commonjs: "react-dom",
    //     commonjs2: "react-dom",
    //     amd: "react-dom",
    //     root: "ReactDOM",
    //   },
    // }
  }, //
  tools: {
    rspack: (config, { appendPlugins }) => {
      appendPlugins([
        new ModuleFederationPlugin({
          name: 'near_vm',
          exposes: {
            './index': './src/index.tsx',
          },
          shared: {
            react: {
              singleton: true,
            },
            'react-dom': {
              singleton: true,
            },
          },
          // shared: ['react', 'react-dom'], // externals
        }),
      ]);
    },
  },
  plugins: [pluginNodePolyfill(), pluginReact()],
});
