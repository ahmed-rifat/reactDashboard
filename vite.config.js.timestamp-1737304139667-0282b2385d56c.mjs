// vite.config.js
import { defineConfig } from "file:///F:/laravel-next/reactDashboard/node_modules/vite/dist/node/index.js";
import react from "file:///F:/laravel-next/reactDashboard/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  server: {
    host: "0.0.0.0",
    // Allows external access (not limited to localhost)
    port: 3e3,
    // Specify the port you want (default is 5173)
    open: true,
    // Automatically opens the browser
    proxy: {
      "/api": {
        target: "https://api.nextlevelitsolution.com",
        // Backend base URL (no `/api/auth` here)
        changeOrigin: true,
        // Set to true to modify the Origin header
        secure: false,
        // Set to false if using HTTPS with invalid certificates
        rewrite: (path) => path.replace(/^\/api/, "")
        // Removes the `/api` prefix before sending to the backend
      }
    }
  },
  plugins: [react()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxsYXJhdmVsLW5leHRcXFxccmVhY3REYXNoYm9hcmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXGxhcmF2ZWwtbmV4dFxcXFxyZWFjdERhc2hib2FyZFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovbGFyYXZlbC1uZXh0L3JlYWN0RGFzaGJvYXJkL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogJzAuMC4wLjAnLCAgLy8gQWxsb3dzIGV4dGVybmFsIGFjY2VzcyAobm90IGxpbWl0ZWQgdG8gbG9jYWxob3N0KVxyXG4gICAgcG9ydDogMzAwMCwgICAgICAgIC8vIFNwZWNpZnkgdGhlIHBvcnQgeW91IHdhbnQgKGRlZmF1bHQgaXMgNTE3MylcclxuICAgIG9wZW46IHRydWUsICAgICAgICAvLyBBdXRvbWF0aWNhbGx5IG9wZW5zIHRoZSBicm93c2VyXHJcbiAgICBwcm94eToge1xyXG4gICAgICAnL2FwaSc6IHtcclxuICAgICAgICB0YXJnZXQ6ICdodHRwczovL2FwaS5uZXh0bGV2ZWxpdHNvbHV0aW9uLmNvbScsIC8vIEJhY2tlbmQgYmFzZSBVUkwgKG5vIGAvYXBpL2F1dGhgIGhlcmUpXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLCAvLyBTZXQgdG8gdHJ1ZSB0byBtb2RpZnkgdGhlIE9yaWdpbiBoZWFkZXJcclxuICAgICAgICBzZWN1cmU6IGZhbHNlLCAgICAgIC8vIFNldCB0byBmYWxzZSBpZiB1c2luZyBIVFRQUyB3aXRoIGludmFsaWQgY2VydGlmaWNhdGVzXHJcbiAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKSwgLy8gUmVtb3ZlcyB0aGUgYC9hcGlgIHByZWZpeCBiZWZvcmUgc2VuZGluZyB0byB0aGUgYmFja2VuZFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBwbHVnaW5zOiBbcmVhY3QoKV0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtSLFNBQVMsb0JBQW9CO0FBQy9TLE9BQU8sV0FBVztBQUVsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUE7QUFBQSxJQUNOLE1BQU07QUFBQTtBQUFBLElBQ04sTUFBTTtBQUFBO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUE7QUFBQSxRQUNSLGNBQWM7QUFBQTtBQUFBLFFBQ2QsUUFBUTtBQUFBO0FBQUEsUUFDUixTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUE7QUFBQSxNQUM5QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFFQSxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQ25CLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
