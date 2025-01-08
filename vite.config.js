import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    host: '0.0.0.0',  // Allows external access (not limited to localhost)
    port: 3000,        // Specify the port you want (default is 5173)
    open: true,        // Automatically opens the browser
    proxy: {
      '/api': {
        target: 'https://api.nextlevelitsolution.com', // Backend base URL (no `/api/auth` here)
        changeOrigin: true, // Set to true to modify the Origin header
        secure: false,      // Set to false if using HTTPS with invalid certificates
        rewrite: (path) => path.replace(/^\/api/, ''), // Removes the `/api` prefix before sending to the backend
      },
    },
  },

  plugins: [react()],
});
