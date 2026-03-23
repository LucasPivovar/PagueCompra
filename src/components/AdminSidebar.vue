<template>
  <aside class="sidebar" :class="{ 'collapsed': isCollapsed }">
    <nav class="sidebar-nav py-6 font-poppins flex-1 overflow-y-auto overflow-x-hidden bg-white border-r border-dashed border-[#cbd5e1] transition-all duration-300 flex flex-col">
      <!-- Goal Progress Section -->
      <div v-show="!isCollapsed" class="px-7 mb-8 transition-all duration-300">
        <div class="flex justify-between items-center mb-2">
          <span class="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Meta Mensal</span>
          <span class="text-[10px] font-bold text-[#005858]">0%</span>
        </div>
        <div class="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-2">
          <div class="bg-[#005858] h-full rounded-full transition-all duration-500" style="width: 5%"></div>
        </div>
        <div class="text-[11px] font-bold text-gray-400">
          R$ 0,00 <span class="text-gray-300 mx-1">/</span> R$ 10.000,00
        </div>
      </div>

      <div class="px-3 mb-6">
        <span v-if="!isCollapsed" class="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-left block mb-4">Administração</span>
        <div class="flex flex-col gap-1">
          <router-link to="/" class="nav-item group">
            <LayoutDashboard :size="20" class="flex-shrink-0" />
            <span v-if="!isCollapsed" class="font-bold text-[14px]">Visão Geral</span>
          </router-link>
          
          <router-link to="/users" class="nav-item group">
            <Users :size="20" class="flex-shrink-0" />
            <span v-if="!isCollapsed" class="font-bold text-[14px]">Usuários</span>
          </router-link>

          <router-link to="/withdrawals" class="nav-item group">
            <CheckCircle2 :size="20" class="flex-shrink-0" />
            <span v-if="!isCollapsed" class="font-bold text-[14px]">Saques</span>
          </router-link>

          <!-- Transactions Items -->
          <div class="flex flex-col gap-1">
            <div 
              class="nav-item group text-gray-400 hover:text-[#333] transition-all cursor-pointer" 
              @click.stop="activeSubMenu = activeSubMenu === 'transactions' ? null : 'transactions'"
            >
              <Repeat :size="20" class="flex-shrink-0" />
              <span v-if="!isCollapsed" class="font-bold text-[14px]">Transações</span>
              <ChevronDown v-if="!isCollapsed" :size="14" class="ml-auto transition-transform duration-200" :class="{ 'rotate-180': activeSubMenu === 'transactions' }" />
            </div>
            
            <div v-show="activeSubMenu === 'transactions' && !isCollapsed" class="flex flex-col gap-1 ml-6 border-l border-gray-100 pl-2">
              <router-link to="/financial/transactions/income" class="nav-item group text-gray-500 py-2">
                 <ArrowDownCircle :size="16" class="flex-shrink-0" />
                 <span class="text-[12px] font-bold">Entradas</span>
              </router-link>
              <router-link to="/financial/transactions/outcome" class="nav-item group text-gray-500 py-2">
                 <ArrowUpCircle :size="16" class="flex-shrink-0" />
                 <span class="text-[12px] font-bold">Saídas</span>
              </router-link>
            </div>
          </div>

          <!-- Finance Section -->
          <div class="mt-4 mb-2">
            <span v-if="!isCollapsed" class="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-left block mb-2">Financeiro</span>
            <router-link to="/financial/wallets" class="nav-item group text-gray-500">
               <Wallet :size="20" class="flex-shrink-0" />
               <span v-if="!isCollapsed" class="font-bold text-[14px]">Carteiras</span>
            </router-link>
          </div>

          <!-- Settings Section -->
          <div class="flex flex-col gap-1">
            <div 
              class="nav-item group text-gray-400 hover:text-[#333] transition-all cursor-pointer" 
              @click.stop="activeSubMenu = activeSubMenu === 'settings' ? null : 'settings'"
              :class="{ 'router-link-active': $route.path.startsWith('/settings') }"
            >
              <Settings2 :size="20" class="flex-shrink-0" />
              <span v-if="!isCollapsed" class="font-bold text-[14px]">Configurações</span>
              <ChevronDown v-if="!isCollapsed" :size="14" class="ml-auto transition-transform duration-200" :class="{ 'rotate-180': activeSubMenu === 'settings' }" />
            </div>
            
            <div v-show="activeSubMenu === 'settings' && !isCollapsed" class="flex flex-col gap-1 ml-6 border-l border-gray-100 pl-2">
              <router-link to="/settings/general" class="nav-item group text-gray-500 py-2">
                 <Sliders :size="16" class="flex-shrink-0" />
                 <span class="text-[12px] font-bold">Gerais</span>
              </router-link>
              <router-link to="/settings/levels" class="nav-item group text-gray-500 py-2">
                 <ShieldCheck :size="16" class="flex-shrink-0" />
                 <span class="text-[12px] font-bold">Níveis</span>
              </router-link>
              <router-link to="/settings/acquirer" class="nav-item group text-gray-500 py-2">
                 <Zap :size="16" class="flex-shrink-0" />
                 <span class="text-[12px] font-bold">Adquirente</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Section at Bottom - Mobile only (desktop has it in navbar) -->
      <div class="lg:hidden mt-auto px-3 mb-6 pt-6 border-t border-gray-100">
        <div class="flex items-center p-2 rounded-xl transition-all duration-200" :class="isCollapsed ? 'justify-center px-0' : 'gap-3 px-4 hover:bg-gray-50'">
          <div class="w-10 h-10 rounded-full bg-[#005858] flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0">
            AD
          </div>
          <div v-if="!isCollapsed" class="flex flex-col text-left overflow-hidden">
            <span class="text-[14px] font-bold text-[#333] whitespace-nowrap">Administrador</span>
            <span class="text-[11px] text-gray-400 font-medium whitespace-nowrap">Super Admin</span>
          </div>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script>
import { 
  LayoutDashboard, Users, CheckCircle2, 
  ChevronDown, 
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  Repeat,
  Settings2, Sliders, ShieldCheck, Zap
} from 'lucide-vue-next'

export default {
  name: 'AdminSidebar',
  emits: ['toggle-sidebar'],
  components: {
    LayoutDashboard, Users, CheckCircle2, 
    ChevronDown, Wallet, ArrowDownCircle, ArrowUpCircle, Repeat,
    Settings2, Sliders, ShieldCheck, Zap
  },
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeMenu: 'finance',
      activeSubMenu: null
    }
  }
}
</script>

<style scoped>
@reference "tailwindcss";

.sidebar {
  width: 250px;
  height: calc(100vh - 80px); /* Adjust for navbar height */
  position: fixed;
  left: 0;
  top: 80px; /* Below navbar */
  z-index: 100;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.collapsed {
  width: 0;
  border-right: none;
}

@media (min-width: 1024px) {
  .collapsed {
    width: 0;
  }
}

@media (max-width: 1023px) {
  .sidebar {
    height: 100vh;
    top: 0;
    transform: translateX(-100%);
    width: 250px;
  }
  .sidebar-open.is-mobile .sidebar {
    transform: translateX(0);
  }
}

.nav-item {
  @apply flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 cursor-pointer mx-1 no-underline;
}

.router-link-active {
  @apply bg-[#f0f9f4] text-[#005858] shadow-sm;
}

.router-link-active span {
  @apply text-[#005858];
}

/* Custom transitions for icons in collapsed mode */
.sidebar.collapsed .nav-item {
  @apply px-0 mx-1;
}
</style>
