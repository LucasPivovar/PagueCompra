<template>
  <AdminLayout>
    <div class="flex flex-col gap-8 font-poppins text-left pb-10">
      
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2 sm:px-6">
        <div>
          <h2 class="text-2xl font-black text-[#333]">Níveis de Usuário</h2>
          <p class="text-[13px] text-gray-400 font-medium">Configuração de taxas, limites e permissões por nível</p>
        </div>
        <button class="bg-[#005858] hover:bg-[#004747] text-white px-6 py-2.5 rounded-xl font-bold text-[14px] transition-all flex items-center gap-2 shadow-lg shadow-green-900/10 active:scale-95 cursor-pointer">
          <Plus :size="18" /> Novo Nível
        </button>
      </div>

      <!-- Levels Comparison -->
      <div class="px-2 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="level in levels" :key="level.id" class="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden group hover:border-[#005858]/30 transition-all hover:shadow-xl hover:shadow-gray-200/50">
          <div class="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30 group-hover:bg-[#005858]/5 transition-colors">
            <h3 class="text-lg font-black text-[#333]">{{ level.name }}</h3>
            <div class="p-2 bg-white rounded-lg shadow-sm">
              <Shield :size="18" :class="level.color" />
            </div>
          </div>
          <div class="p-6 space-y-6">
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-[11px] font-bold text-gray-400 uppercase">Taxa de Saque</span>
                <span class="text-sm font-black text-[#005858]">{{ level.withdrawalFee }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-[11px] font-bold text-gray-400 uppercase">Taxa por Venda</span>
                <span class="text-sm font-black text-[#005858]">{{ level.salesFee }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-[11px] font-bold text-gray-400 uppercase">Limite Diário</span>
                <span class="text-sm font-black text-gray-600">{{ level.dailyLimit }}</span>
              </div>
            </div>
            
            <div class="pt-4 border-t border-gray-50 flex gap-2">
              <button class="flex-1 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs font-bold text-gray-600 transition-all cursor-pointer">Editar</button>
              <button class="w-10 h-10 flex items-center justify-center border border-rose-100 text-rose-500 rounded-xl hover:bg-rose-50 transition-all cursor-pointer"><Trash2 :size="16" /></button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from '../../components/AdminLayout.vue'
import { Plus, Shield, Trash2 } from 'lucide-vue-next'

export default {
  name: 'SettingsLevels',
  components: {
    AdminLayout, Plus, Shield, Trash2
  },
  data() {
    return {
      levels: [
        { id: 1, name: 'Iniciante', withdrawalFee: 'R$ 5,00', salesFee: '2.5%', dailyLimit: 'R$ 1.000,00', color: 'text-gray-400' },
        { id: 2, name: 'Profissional', withdrawalFee: 'R$ 2,00', salesFee: '1.8%', dailyLimit: 'R$ 5.000,00', color: 'text-amber-500' },
        { id: 3, name: 'Enterprise', withdrawalFee: 'Isento', salesFee: '1.2%', dailyLimit: 'Sem limite', color: 'text-[#005858]' }
      ]
    }
  }
}
</script>

<style scoped>
@reference "tailwindcss";
</style>
