/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import store from '@/store/index'
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify';

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  app.use(vuetify)
  app.use(store)
  app.use(
    Vue3Toasity,
    {
      autoClose: 3000,
      position: 'top-right',
      theme: 'colored'
    } as ToastContainerOptions
  )
}
