<template>
  <AdminLayout>
    <div class="flex flex-col gap-6 font-poppins text-left mb-10 pb-20">
      <div class="flex flex-col md:flex-row items-stretch md:items-end justify-between px-2 mb-2 gap-4">
        <div class="flex items-center justify-center md:justify-start gap-8 border-b border-gray-100 flex-1">
          <div 
            class="pb-4 text-lg font-black transition-all text-[#005858] border-b-2 border-[#005858]"
          >
            Configurações do Adquirente
          </div>
        </div>
        <button 
          @click="saveIntegration"
          class="bg-[#005858] text-white px-8 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-900/10 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <Zap :size="18" stroke-width="3" />
          Testar Conexão
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 px-2">
        <!-- API Credentials Card -->
        <div class="bg-white p-6 rounded-[24px] border border-gray-200 shadow-sm">
          <h3 class="text-sm font-black text-[#333] uppercase tracking-wider mb-6 flex items-center gap-2">
            <Lock :size="18" class="text-[#005858]" />
            Credenciais da API
          </h3>
          
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-[11px] font-bold text-gray-400 uppercase ml-1">Client ID</label>
              <input type="text" v-model="acquirer.clientId" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#005858] transition-all" />
            </div>
            
            <div class="flex flex-col gap-1.5">
              <label class="text-[11px] font-bold text-gray-400 uppercase ml-1">Secret Key</label>
              <div class="relative">
                <input :type="showSecret ? 'text' : 'password'" v-model="acquirer.secretKey" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#005858] transition-all pr-12" />
                <button @click="showSecret = !showSecret" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#005858]">
                   <Eye v-if="!showSecret" :size="18" />
                   <EyeOff v-else :size="18" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Integration Proxy/Webhook Card -->
        <div class="bg-white p-6 rounded-[24px] border border-gray-200 shadow-sm">
          <h3 class="text-sm font-black text-[#333] uppercase tracking-wider mb-6 flex items-center gap-2">
            <LinkIcon :size="18" class="text-[#005858]" />
            Webhooks & Callbacks
          </h3>
          
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-[11px] font-bold text-gray-400 uppercase ml-1">URL de Notificação</label>
              <input type="text" v-model="acquirer.webhookUrl" class="w-full bg-gray-100/50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 font-mono" readonly />
              <span class="text-[10px] text-gray-400 ml-1">Copie esta URL e configure no painel do adquirente</span>
            </div>

            <div class="mt-2 p-4 bg-orange-50 rounded-2xl border border-orange-100">
              <div class="flex gap-3">
                <AlertCircle :size="20" class="text-orange-500 shrink-0" />
                <div class="flex flex-col">
                  <span class="text-xs font-bold text-orange-700">Atenção</span>
                  <span class="text-[11px] text-orange-600">Certifique-se de que a Secret Key está correta para evitar falhas no processamento.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from '../../components/AdminLayout.vue'
import { Zap, Lock, Eye, EyeOff, Link as LinkIcon, AlertCircle } from 'lucide-vue-next'

export default {
  name: 'SettingsAcquirerView',
  components: {
    AdminLayout,
    Zap, Lock, Eye, EyeOff, LinkIcon, AlertCircle
  },
  data() {
    return {
      showSecret: false,
      acquirer: {
        clientId: 'pg_live_8237492374',
        secretKey: '••••••••••••••••••••••••',
        webhookUrl: 'https://api.paguecompras.com/v1/callbacks/acquirer'
      }
    }
  },
  methods: {
    saveIntegration() {
      // Mock test
      alert('Teste de conexão realizado com sucesso!')
    }
  }
}
</script>
