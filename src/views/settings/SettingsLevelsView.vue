<template>
  <AdminLayout>
    <div class="flex flex-col gap-6 font-poppins text-left mb-10 pb-20">
      <div class="flex flex-col md:flex-row items-stretch md:items-end justify-between px-2 mb-2 gap-4">
        <div class="flex items-center justify-center md:justify-start gap-8 border-b border-gray-100 flex-1">
          <div 
            class="pb-4 text-lg font-black transition-all text-[#005858] border-b-2 border-[#005858]"
          >
            Configurações de Níveis
          </div>
        </div>
        <button 
          class="bg-[#005858] text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-900/10 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <Plus :size="18" stroke-width="3" />
          Adicionar Nível
        </button>
      </div>

      <div class="px-2">
        <div class="bg-white rounded-[24px] shadow-sm border border-gray-200 overflow-hidden">
          <table class="w-full border-collapse">
            <thead>
              <tr class="text-left border-b border-gray-50">
                <th class="px-6 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Nível</th>
                <th class="px-6 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Taxa de Operação</th>
                <th class="px-6 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Limite Diário</th>
                <th class="px-6 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th class="px-6 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="level in levels" :key="level.id" class="border-b border-gray-50 hover:bg-gray-50/50 transition-all">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <ShieldCheck :size="16" class="text-[#005858]" />
                    </div>
                    <span class="text-sm font-bold text-[#333]">{{ level.name }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm font-bold text-[#333]">{{ level.fee }}%</td>
                <td class="px-6 py-4 text-sm font-medium text-gray-500">R$ {{ level.limit.toLocaleString('pt-BR') }}</td>
                <td class="px-6 py-4">
                  <span class="bg-green-100 text-green-700 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider">Ativo</span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="text-gray-400 hover:text-[#005858] transition-all">
                    <Edit :size="18" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from '../../components/AdminLayout.vue'
import { ShieldCheck, Plus, Edit } from 'lucide-vue-next'

export default {
  name: 'SettingsLevelsView',
  components: {
    AdminLayout,
    ShieldCheck, Plus, Edit
  },
  data() {
    return {
      levels: [
        { id: 1, name: 'Bronze', fee: 5.0, limit: 1000 },
        { id: 2, name: 'Prata', fee: 4.5, limit: 5000 },
        { id: 3, name: 'Ouro', fee: 3.8, limit: 20000 },
        { id: 4, name: 'Diamante', fee: 3.0, limit: 100000 }
      ]
    }
  }
}
</script>
