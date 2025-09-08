declare module './src/plugins/vite-plugin-bundle-analyzer' {
  export function bundleAnalyzer(options?: {
    open?: boolean;
    gzipSize?: boolean;
    brotliSize?: boolean;
    filename?: string;
  }): any;

  export function removeConsolePlugin(): any;

  export function inlineCriticalCssPlugin(options?: {
    cssFiles?: string[];
  }): any;

  const defaultExport: {
    bundleAnalyzer: typeof bundleAnalyzer;
    removeConsolePlugin: typeof removeConsolePlugin;
    inlineCriticalCssPlugin: typeof inlineCriticalCssPlugin;
  };

  export default defaultExport;
}
