<template>
  <AdminLayout>
    <div class="flex flex-col gap-6 font-poppins text-left mb-10 pb-20">
      <div class="flex flex-col md:flex-row items-stretch md:items-end justify-between px-2 mb-2 gap-4">
        <div class="flex items-center justify-center md:justify-start gap-8 border-b border-gray-100 flex-1">
          <div 
            class="pb-4 text-lg font-black transition-all text-[#005858] border-b-2 border-[#005858]"
          >
            Configurações Gerais
          </div>
        </div>
        <button 
          @click="saveSettings"
          class="bg-[#005858] text-white px-8 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-900/10 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <Save :size="18" stroke-width="3" />
          Salvar Alterações
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 px-2">
        <!-- Site Identity Card -->
        <div class="bg-white p-6 rounded-[24px] border border-gray-200 shadow-sm">
          <h3 class="text-sm font-black text-[#333] uppercase tracking-wider mb-6 flex items-center gap-2">
            <Globe :size="18" class="text-[#005858]" />
            Identidade do Sistema
          </h3>
          
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-[11px] font-bold text-gray-400 uppercase ml-1">Nome do Sistema</label>
              <input type="text" v-model="settings.siteName" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#005858] transition-all" />
            </div>
            
            <div class="flex flex-col gap-1.5">
              <label class="text-[11px] font-bold text-gray-400 uppercase ml-1">E-mail de Suporte</label>
              <input type="email" v-model="settings.supportEmail" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#005858] transition-all" />
            </div>
          </div>
        </div>

        <!-- System Status Card -->
        <div class="bg-white p-6 rounded-[24px] border border-gray-200 shadow-sm">
          <h3 class="text-sm font-black text-[#333] uppercase tracking-wider mb-6 flex items-center gap-2">
            <Activity :size="18" class="text-[#005858]" />
            Status e Manutenção
          </h3>
          
          <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div class="flex flex-col">
                <span class="text-sm font-bold text-[#333]">Modo Manutenção</span>
                <span class="text-[11px] text-gray-400">Desativa o acesso para usuários comuns</span>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="settings.maintenanceMode" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#005858]"></div>
              </label>
            </div>

            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div class="flex flex-col">
                <span class="text-sm font-bold text-[#333]">Novos Registros</span>
                <span class="text-[11px] text-gray-400">Permitir que novos usuários se cadastrem</span>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="settings.allowRegistration" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#005858]"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from '../../components/AdminLayout.vue'
import { Save, Globe, Activity } from 'lucide-vue-next'
import { useToast } from '../../composables/useToast'

export default {
  name: 'SettingsGeneralView',
  components: {
    AdminLayout,
    Save, Globe, Activity
  },
  setup() {
    const { showToast } = useToast()
    return { showToast }
  },
  data() {
    return {
      settings: {
        siteName: 'PagueCompras',
        supportEmail: 'suporte@paguecompras.com',
        maintenanceMode: false,
        allowRegistration: true
      }
    }
  },
  methods: {
    saveSettings() {
      // Logic to save settings
      this.showToast('Configurações salvas com sucesso!', 'success')
    }
  }
}
</script>
