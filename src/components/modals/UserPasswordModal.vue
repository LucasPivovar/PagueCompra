<template>
  <div v-if="isOpen" @click.self="close" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 font-poppins px-2 sm:px-4 py-4 sm:py-8">
    <div class="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full sm:w-[80vw] max-w-lg overflow-hidden transition-all scale-100 active:scale-95">
      <!-- Header -->
      <div class="flex items-center justify-between p-5 sm:p-6 border-b border-gray-100">
        <h3 class="text-xl font-black text-[#333] tracking-tight">Alterar senha</h3>
        <button @click="close" class="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100">
          <X :size="24" stroke-width="2.5" />
        </button>
      </div>
      
      <!-- Body -->
      <div class="p-6 sm:p-8">
        <div class="flex flex-col gap-2">
          <label class="text-[13px] text-gray-400 font-bold uppercase tracking-wider">Nova senha</label>
          <input 
            type="password" 
            v-model="newPassword"
            placeholder="Digite a nova senha..."
            class="px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#005858] focus:bg-white transition-all shadow-sm w-full font-medium"
          >
        </div>
      </div>

      <!-- Footer -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 p-6 sm:p-8 pt-2 sm:pt-4">
        <button 
          @click="close" 
          class="px-8 py-3 bg-[#f3f4f6] text-gray-700 text-[15px] font-bold rounded-xl hover:bg-[#e5e7eb] transition-all cursor-pointer order-2 sm:order-1"
        >
          Cancelar
        </button>
        <button 
          @click="save" 
          class="px-8 py-3 bg-[#005858] text-white text-[15px] font-bold rounded-xl hover:bg-[#004747] shadow-lg shadow-green-900/10 transition-all active:scale-95 cursor-pointer order-1 sm:order-2"
        >
          Salvar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { X } from 'lucide-vue-next'

export default {
  name: 'UserPasswordModal',
  components: {
    X
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      newPassword: ''
    }
  },
  methods: {
    close() {
      this.newPassword = ''
      this.$emit('close')
    },
    save() {
      // API call to save password
      this.$emit('save', this.newPassword)
      this.close()
    }
  }
}
</script>
