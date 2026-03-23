<template>
  <div class="min-h-screen flex items-center justify-center bg-[#f8fafc] font-poppins px-4 py-12">
    <div class="max-w-md w-full">
      <!-- Card -->
      <div class="bg-white rounded-[20px] sm:rounded-[24px] shadow-sm border border-gray-200 p-6 sm:p-10 transition-all hover:shadow-md">
        <!-- Logo Inside Card -->
        <div class="flex justify-center mb-6 sm:mb-8">
          <img src="../assets/logo.png" alt="PagueCompra" class="h-14 sm:h-16 w-auto object-contain" />
        </div>

        <div v-if="!isSubmitted">
          <div class="mb-6 sm:mb-8 text-center text-left">
            <h1 class="text-xl sm:text-2xl font-black text-[#333] mb-1.5 sm:mb-2">Esqueceu sua senha?</h1>
            <p class="text-[13px] sm:text-[15px] text-gray-500 font-medium leading-relaxed">Não se preocupe! Insira seu e-mail cadastrado e enviaremos as instruções para redefinir sua senha.</p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Email Field -->
            <div class="space-y-2">
              <label for="email" class="block text-sm font-bold text-[#333] ml-1">E-mail</label>
              <div class="relative">
                <Mail class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" :size="20" />
                <input 
                  id="email"
                  v-model="email"
                  type="email" 
                  placeholder="seu@email.com" 
                  class="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#005858] focus:bg-white transition-all shadow-sm placeholder:text-gray-400"
                  required
                >
              </div>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit" 
              :disabled="isLoading"
              class="w-full bg-[#005858] text-white py-3.5 sm:py-4 rounded-xl font-bold text-[14px] sm:text-[15px] shadow-lg shadow-green-900/10 hover:bg-[#004a4a] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              <Loader2 v-if="isLoading" class="animate-spin" :size="20" />
              {{ isLoading ? 'Processando...' : 'Enviar instruções' }}
            </button>
          </form>
        </div>

        <!-- Success State -->
        <div v-else class="text-center py-2 sm:py-4">
          <div class="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <CheckCircle class="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-[#333] mb-2 sm:mb-3">E-mail enviado!</h2>
          <p class="text-[13px] sm:text-[15px] text-gray-500 font-medium leading-relaxed mb-6 sm:mb-8">
            Enviamos um link de recuperação para <strong>{{ email }}</strong>. Por favor, verifique sua caixa de entrada e spam.
          </p>
          <button 
            @click="isSubmitted = false"
            class="text-[#005858] font-bold hover:underline text-sm"
          >
            Não recebeu o e-mail? Tentar novamente
          </button>
        </div>

        <!-- Back to Login -->
        <div class="mt-6 sm:mt-8 text-center pt-5 sm:pt-6 border-t border-dashed border-gray-200">
          <router-link to="/login" class="inline-flex items-center gap-2 text-[#005858] font-bold text-[14px] hover:gap-3 transition-all">
            <ArrowLeft :size="18" />
            Voltar para o login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Mail, Loader2, CheckCircle, ArrowLeft } from 'lucide-vue-next'
import { useToast } from '../composables/useToast'

export default {
  name: 'ForgotPasswordView',
  components: {
    Mail,
    Loader2,
    CheckCircle,
    ArrowLeft
  },
  setup() {
    const { showToast } = useToast()
    return { showToast }
  },
  data() {
    return {
      email: '',
      isLoading: false,
      isSubmitted: false
    }
  },
  methods: {
    handleSubmit() {
      this.isLoading = true
      
      // Simulating API call
      setTimeout(() => {
        this.isLoading = false
        this.isSubmitted = true
        this.showToast('E-mail de recuperação enviado!')
      }, 1500)
    }
  }
}
</script>

<style scoped>
@reference "tailwindcss";

input:focus {
  @apply ring-4 ring-[#005858]/10;
}
</style>
