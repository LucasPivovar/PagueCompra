<template>
  <AdminLayout>
    <div class="flex flex-col gap-6 font-poppins text-left mb-10 pb-20">
      <!-- Page Title -->
      <div class="px-2">
        <h1 class="text-2xl font-black text-[#333]">Carteiras</h1>
      </div>

      <!-- Top KPI Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
        <!-- Total em carteiras -->
        <div class="bg-white p-6 rounded-[24px] shadow-sm border border-gray-300 flex justify-between items-start hover:shadow-md transition-all h-[150px]">
          <div class="flex flex-col gap-1">
            <div class="text-[12px] text-gray-400 font-bold uppercase tracking-widest">Saldo em carteiras</div>
            <div class="text-[32px] font-black text-[#333]">R$ 17.168,21</div>
            <div class="text-[13px] font-bold text-[#166534] mt-1">+12.5% este mês</div>
          </div>
          <div class="w-14 h-14 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#166534]">
            <Wallet :size="28" stroke-width="2.5" />
          </div>
        </div>

        <!-- Total no gateway -->
        <div class="bg-white p-6 rounded-[24px] shadow-sm border border-gray-300 flex justify-between items-start hover:shadow-md transition-all h-[150px]">
          <div class="flex flex-col gap-1">
            <div class="text-[12px] text-gray-400 font-bold uppercase tracking-widest">Total no gateway</div>
            <div class="text-[32px] font-black text-[#333]">R$ 28.430,32</div>
            <div class="text-[13px] font-bold text-[#166534] mt-1">+8.4% este mês</div>
          </div>
          <div class="w-14 h-14 rounded-full bg-[#bbf7d0] flex items-center justify-center text-[#166534]">
            <CreditCard :size="28" stroke-width="2.5" />
          </div>
        </div>
      </div>

      <!-- Top 3 Section -->
      <div class="px-2">
        <div class="bg-white rounded-[24px] shadow-sm border border-gray-300 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100">
            <h2 class="text-xl font-black text-[#333]">TOP 3 com mais vendas</h2>
          </div>
          <div class="p-6">
            <div class="bg-[#f0fdf4] border border-[#d1e7dd] rounded-xl p-6 flex flex-col gap-6 md:gap-4">
              <div v-for="(user, index) in topUsers" :key="index">
                <!-- Mobile Layout (Labels on top, values below, 50/50 split) -->
                <div class="flex md:hidden items-center w-full">
                  <div class="flex-1 flex flex-col uppercase">
                    <span class="text-[11px] font-bold text-gray-400 tracking-widest mb-0.5">User:</span>
                    <span class="text-[14px] font-black text-[#166534] leading-tight">{{ user.name }}</span>
                  </div>
                  <div class="h-6 w-px bg-gray-200 mx-4"></div>
                  <div class="flex-1 flex flex-col uppercase">
                    <span class="text-[11px] font-bold text-gray-400 tracking-widest mb-0.5">Saldo:</span>
                    <span class="text-[14px] font-black text-[#166534] leading-tight">R$ {{ user.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</span>
                  </div>
                </div>

                <!-- Desktop Layout (Horizontal) -->
                <div class="hidden md:flex items-center gap-2 font-bold text-[14px]">
                  <span class="text-[#333]">User:</span>
                  <span class="text-[#166534] uppercase">{{ user.name }}</span>
                  <span class="text-gray-400 mx-1">|</span>
                  <span class="text-[#333]">Saldo:</span>
                  <span class="text-[#166534]">R$ {{ user.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</span>
                  <span class="text-gray-400 ml-1">|</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- User Report Table Section -->
      <div class="px-2">
        <div class="bg-white rounded-[24px] shadow-sm border border-gray-300 overflow-hidden flex flex-col">
          <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 class="text-xl font-black text-[#333]">Relatório de Usuários</h2>
          </div>

          <!-- Table Search and Sort -->
          <div class="px-6 py-6 flex flex-col sm:flex-row justify-between items-end gap-4 bg-gray-50/30 border-b border-gray-100">
            <div class="relative w-full sm:w-[350px]">
              <span class="text-[12px] font-bold text-gray-400 block mb-1.5 ml-1">Pesquisar</span>
              <div class="relative">
                <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" :size="18" />
                <input 
                  v-model="searchQuery"
                  type="text" 
                  placeholder="Nome, ID ou Email..."
                  class="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#005858] shadow-sm transition-all"
                >
              </div>
            </div>

            <div class="relative w-full sm:w-[220px]">
              <span class="text-[12px] font-bold text-gray-400 block mb-1.5 ml-1">Ordenar por</span>
              <select v-model="sortBy" class="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#005858] shadow-sm cursor-pointer font-medium text-gray-600 appearance-none">
                <option value="recent">Mais recentes</option>
                <option value="revenue_desc">Maior Faturamento</option>
                <option value="revenue_asc">Menor Faturamento</option>
                <option value="alphabetical">Nome (A-Z)</option>
              </select>
              <div class="absolute right-4 bottom-3 pointer-events-none text-gray-400">
                <ChevronDown :size="14" />
              </div>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="text-left border-b border-gray-100 bg-gray-50/50">
                  <th class="px-6 py-4 text-[13px] font-black text-[#333]">User ID</th>
                  <th class="px-6 py-4 text-[13px] font-black text-[#333]">Faturamento</th>
                  <th class="px-6 py-4 text-[13px] font-black text-[#333]">Email</th>
                  <th class="px-6 py-4 text-[13px] font-black text-[#333]">Telefone</th>
                  <th class="px-6 py-4 text-[13px] font-black text-[#333] text-center w-[160px]">Ação</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in paginatedUsers" :key="user.id" class="border-b border-gray-50 hover:bg-gray-50/80 transition-all text-[13px] font-medium text-[#333]">
                  <td class="px-6 py-4">{{ user.userId }}</td>
                  <td class="px-6 py-4">R$ {{ user.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</td>
                  <td class="px-6 py-4 text-gray-500">{{ user.email }}</td>
                  <td class="px-6 py-4 text-gray-500">{{ user.phone }}</td>
                  <td class="px-6 py-4 text-center">
                    <button class="bg-[#bbf7d0] text-[#166534] px-4 py-1.5 rounded-md text-[11px] font-black uppercase tracking-wider hover:bg-[#a7f3d0] transition-all cursor-pointer">
                      WHATSAPP
                    </button>
                  </td>
                </tr>
                <!-- Empty State within Table -->
                <tr v-if="filteredUsers.length === 0">
                  <td colspan="5" class="px-6 py-10 text-center text-gray-400 italic">
                    Nenhum usuário encontrado para a pesquisa.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="px-6 py-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/20">
            <span class="text-[13px] font-medium text-gray-400">Mostrando {{ paginatedUsers.length }} de {{ filteredUsers.length }} resultados</span>
            <div class="flex gap-2">
              <button 
                @click="currentPage = Math.max(1, currentPage - 1)" 
                class="px-4 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-bold text-gray-600 hover:text-[#005858] hover:border-[#005858] disabled:opacity-50 disabled:text-gray-400 transition-all cursor-pointer disabled:cursor-not-allowed"
                :disabled="currentPage === 1"
              >
                Anterior
              </button>
              <div class="flex gap-1">
                <button 
                  v-for="p in totalPages" 
                  :key="p" 
                  @click="currentPage = p"
                  :class="currentPage === p ? 'bg-[#005858] text-white border-[#005858]' : 'bg-white border-gray-200 text-gray-500'"
                  class="w-10 h-10 flex items-center justify-center border rounded-xl text-[13px] font-bold hover:border-[#005858] transition-all cursor-pointer"
                >
                  {{ p }}
                </button>
              </div>
              <button 
                @click="currentPage = Math.min(totalPages, currentPage + 1)" 
                class="px-4 py-2 bg-white border border-gray-200 rounded-xl text-[13px] font-bold text-gray-600 hover:text-[#005858] hover:border-[#005858] disabled:opacity-50 disabled:text-gray-400 transition-all cursor-pointer disabled:cursor-not-allowed"
                :disabled="currentPage === totalPages"
              >
                Próximo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from '../../components/AdminLayout.vue'
import { Wallet, CreditCard, Search, ChevronDown } from 'lucide-vue-next'

export default {
  name: 'WalletsView',
  components: {
    AdminLayout,
    Wallet,
    CreditCard,
    Search,
    ChevronDown
  },
  data() {
    return {
      searchQuery: '',
      sortBy: 'recent',
      currentPage: 1,
      itemsPerPage: 8,
      topUsers: [
        { name: 'vvv vvv', balance: 10015.00 },
        { name: 'TIAGO RIBEIRO BORGES', balance: 7705.76 },
        { name: 'GIWAGO CAVALCANTI OLIVEIRA', balance: 4874.77 }
      ],
      userData: [
        { id: 1, userId: 'leandroprivovar', revenue: 0.00, email: 'leandroprivovar@hotmail.com', phone: '41998902754' },
        { id: 2, userId: 'lpato', revenue: 0.00, email: 'lpato9766@gmail.com', phone: '11958373629' },
        { id: 3, userId: 'ellzade', revenue: 0.00, email: 'ellzadebortollladv@gmail.com', phone: '47997030202' },
        { id: 4, userId: 'ocaradoscanais', revenue: 0.00, email: 'emershow.ads@gmail.com', phone: '51994133933' },
        { id: 5, userId: 'josecmkt', revenue: 5.00, email: 'junior.jc7544@gmail.com', phone: '(49) 00000-0000' },
        { id: 6, userId: 'waytec', revenue: 0.00, email: 'lucaswallysson2003@gmail.com', phone: '41996042257' },
        { id: 7, userId: 'cristielymaria', revenue: 6.00, email: 'agriculturepatricia@gmail.com', phone: '19 98349-8335' },
        { id: 8, userId: 'leorof', revenue: 0.00, email: '3leorodrigues@gmail.com', phone: '11953561836' },
        // Extra mock data for pagination
        { id: 9, userId: 'thiago_borges', revenue: 7705.76, email: 'thiago@example.com', phone: '11988887777' },
        { id: 10, userId: 'giwago_oliveira', revenue: 4874.77, email: 'giwago@example.com', phone: '21977776666' },
        { id: 11, userId: 'vvv_user', revenue: 10015.00, email: 'vvv@example.com', phone: '31966665555' },
        { id: 12, userId: 'admin_test', revenue: 150.00, email: 'admin@paguecompras.com', phone: '11900001111' }
      ]
    }
  },
  computed: {
    filteredUsers() {
      let result = [...this.userData]
      
      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        result = result.filter(u => 
          u.userId.toLowerCase().includes(query) || 
          u.email.toLowerCase().includes(query) || 
          u.phone.includes(query)
        )
      }

      // Sort results
      switch (this.sortBy) {
        case 'revenue_desc':
          result.sort((a, b) => b.revenue - a.revenue)
          break
        case 'revenue_asc':
          result.sort((a, b) => a.revenue - b.revenue)
          break
        case 'alphabetical':
          result.sort((a, b) => a.userId.localeCompare(b.userId))
          break
        case 'recent':
          result.sort((a, b) => b.id - a.id) // Assuming ID is a proxy for recent
          break
      }

      return result
    },
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage) || 1
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredUsers.slice(start, end)
    }
  },
  watch: {
    searchQuery() {
      this.currentPage = 1
    },
    sortBy() {
      this.currentPage = 1
    }
  }
}
</script>

<style scoped>
@reference "tailwindcss";

/* Optional: Subtle row animation */
tbody tr {
  transition: all 0.2s ease;
}

/* Custom scrollbar for table on mobile */
::-webkit-scrollbar {
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
