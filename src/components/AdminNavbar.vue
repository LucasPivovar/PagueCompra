<template>
  <header class="navbar h-[80px] bg-white border-b border-gray-100 flex justify-between items-center fixed top-0 w-full z-50 px-0">
    <div class="navbar-left flex items-center h-full">
      <!-- Logo Container - Fixed width for alignment -->
      <div class="hidden lg:flex items-center w-[250px] h-full border-r border-dashed border-gray-200 relative transition-all duration-300 pl-0"
           :class="{ 'border-none': isCollapsed }">
        <img src="../assets/logo.png" alt="Compra Segura" class="h-14 w-auto object-contain transition-all duration-300" />
        
        <!-- Desktop Toggle Button - Positioned on the border -->
        <button @click="$emit('toggle-sidebar')" 
                class="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-white border border-dashed border-gray-400 rounded-full items-center justify-center text-gray-500 hover:text-[#005858] hover:border-[#005858] hover:border-solid shadow-sm transition-all cursor-pointer z-[60]">
          <ChevronLeft v-if="!isCollapsed" :size="16" />
          <ChevronRight v-else :size="16" />
        </button>
      </div>

      <!-- Mobile Logo (Always visible on Left) -->
      <div class="lg:hidden pl-4">
        <img src="../assets/logo.png" alt="Logo" class="h-10 w-auto" />
      </div>
    </div>

    <div class="navbar-right flex items-center gap-2 pr-4 sm:pr-8">
      <!-- Notification Button -->
      <button 
        @click="$emit('toggle-notifications')"
        class="p-2 rounded-full hover:bg-gray-50 text-gray-500 transition-colors relative group cursor-pointer"
      >
        <Bell :size="22" />
        <!-- Badge with count -->
        <span 
          v-if="notificationCount > 0"
          class="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-white"
        >
          {{ notificationCount }}
        </span>
      </button>

      <!-- Desktop Admin Avatar (icon only, no name/role) -->
      <div class="hidden lg:flex items-center pl-2 border-l border-gray-100 ml-1">
        <div class="w-9 h-9 rounded-full bg-[#005858] flex items-center justify-center text-white font-bold text-sm shadow-sm cursor-pointer hover:opacity-90 transition-opacity">
          AD
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <button 
        @click="$emit('toggle-sidebar')" 
        class="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors cursor-pointer"
      >
        <Menu :size="24" />
      </button>
    </div>
  </header>
</template>

<script>
import { Menu, ChevronLeft, ChevronRight, Bell } from 'lucide-vue-next'

export default {
  name: 'AdminNavbar',
  emits: ['toggle-sidebar', 'toggle-notifications'],
  components: {
    Menu,
    ChevronLeft,
    ChevronRight,
    Bell
  },
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    },
    notificationCount: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
@reference "tailwindcss";
</style>
