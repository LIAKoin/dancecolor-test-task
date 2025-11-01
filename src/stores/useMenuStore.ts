import { reactive } from 'vue'

interface MenuStore {
  isOpen: boolean
  toggle: () => void
  open: () => void
  close: () => void
}

export const menuStore = reactive<MenuStore>({
  isOpen: false,
  toggle() { menuStore.isOpen = !menuStore.isOpen },
  open() { menuStore.isOpen = true },
  close() { menuStore.isOpen = false }
})