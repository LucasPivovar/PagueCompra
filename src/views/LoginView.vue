<template>
  <div class="min-h-screen flex items-center justify-center bg-[#f8fafc] font-poppins px-4 py-12">
    <div class="max-w-md w-full">
      <!-- Card -->
      <div class="bg-white rounded-[20px] sm:rounded-[24px] shadow-sm border border-gray-200 p-6 sm:p-10 transition-all hover:shadow-md">
        <!-- Logo Inside Card -->
        <div class="flex justify-center mb-6 sm:mb-8">
          <img src="../assets/logo.png" alt="PagueCompra" class="h-14 sm:h-16 w-auto object-contain" />
        </div>

        <div class="mb-6 sm:mb-8 text-center">
          <h1 class="text-xl sm:text-2xl font-black text-[#333] mb-1.5 sm:mb-2">Bem-vindo de volta!</h1>
          <p class="text-[13px] sm:text-[15px] leading-relaxed text-gray-500 font-medium">Faça login para gerenciar sua conta</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
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

          <!-- Password Field -->
          <div class="space-y-2">
            <div class="flex justify-between items-center px-1">
              <label for="password" class="block text-sm font-bold text-[#333]">Senha</label>
              <router-link to="/forgot-password" class="text-sm font-bold text-[#005858] hover:underline">
                Esqueceu a senha?
              </router-link>
            </div>
            <div class="relative">
              <Lock class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" :size="20" />
              <input 
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'" 
                placeholder="••••••••" 
                class="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#005858] focus:bg-white transition-all shadow-sm placeholder:text-gray-400"
                required
              >
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <Eye v-if="!showPassword" :size="20" />
                <EyeOff v-else :size="20" />
              </button>
            </div>
          </div>

          <!-- Login Button -->
          <button 
            type="submit" 
            :disabled="isLoading"
            class="w-full bg-[#005858] text-white py-3.5 sm:py-4 rounded-xl font-bold text-[14px] sm:text-[15px] shadow-lg shadow-green-900/10 hover:bg-[#004a4a] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            <Loader2 v-if="isLoading" class="animate-spin" :size="20" />
            {{ isLoading ? 'Entrando...' : 'Entrar na conta' }}
          </button>
        </form>

        <div class="mt-6 sm:mt-8 text-center pt-5 sm:pt-6 border-t border-dashed border-gray-200">
          <p class="text-[13px] sm:text-sm text-gray-500 font-medium">
            Não tem uma conta? 
            <a href="#" class="text-[#005858] font-bold hover:underline">Solicitar acesso</a>
          </p>
        </div>
      </div>

      <!-- Footer Tags -->
      <div class="mt-8 flex justify-center gap-6 text-[13px] font-bold text-gray-400">
        <a href="#" class="hover:text-[#005858] transition-colors">Termos</a>
        <a href="#" class="hover:text-[#005858] transition-colors">Privacidade</a>
        <a href="#" class="hover:text-[#005858] transition-colors">Suporte</a>
      </div>
    </div>
  </div>
</template>

<script>
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-vue-next'
import { useToast } from '../composables/useToast'

export default {
  name: 'LoginView',
  components: {
    Mail,
    Lock,
    Eye,
    EyeOff,
    Loader2
  },
  setup() {
    const { showToast } = useToast()
    return { showToast }
  },
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      isLoading: false
    }
  },
  methods: {
    handleLogin() {
      this.isLoading = true
      
      // Simulating API call
      setTimeout(() => {
        this.isLoading = false
        this.showToast('Login realizado com sucesso! Redirecionando...')
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          this.$router.push('/')
        }, 1500)
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
