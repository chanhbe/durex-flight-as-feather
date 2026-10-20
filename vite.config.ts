import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Cho phép xem qua link tunnel tạm (VS Code Ports, Cloudflare, ngrok)
    allowedHosts: ['.devtunnels.ms', '.trycloudflare.com', '.ngrok-free.app'],
  },
})
