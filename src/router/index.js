import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { title: 'Dashboard admin' }
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/UsersView.vue'),
    meta: { title: 'Usuários' }
  },
  {
    path: '/withdrawals',
    name: 'Withdrawals',
    component: () => import('../views/WithdrawalsView.vue'),
    meta: { title: 'Aprovar saques' }
  },
  {
    path: '/financial/transactions/income',
    name: 'TransactionsIncome',
    component: () => import('../views/TransactionsIncomeView.vue'),
    meta: { title: 'Transações - Entradas' }
  },
  {
    path: '/financial/transactions/outcome',
    name: 'TransactionsOutcome',
    component: () => import('../views/TransactionsOutcomeView.vue'),
    meta: { title: 'Transações - Saídas' }
  },
  {
    path: '/financial/wallets',
    name: 'Wallets',
    component: () => import('../views/submenu/Wallets.vue'),
    meta: { title: 'Carteiras' }
  },
  {
    path: '/settings/general',
    name: 'SettingsGeneral',
    component: () => import('../views/settings/SettingsGeneralView.vue'),
    meta: { title: 'Configurações Gerais' }
  },
  {
    path: '/settings/levels',
    name: 'SettingsLevels',
    component: () => import('../views/settings/SettingsLevelsView.vue'),
    meta: { title: 'Configurações de Níveis' }
  },
  {
    path: '/settings/acquirer',
    name: 'SettingsAcquirer',
    component: () => import('../views/settings/SettingsAcquirerView.vue'),
    meta: { title: 'Configurações do Adquirente' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { title: 'Login' }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../views/ForgotPasswordView.vue'),
    meta: { title: 'Esqueci a Senha' }
  },
  {
    path: '/2fa',
    name: 'TwoFactor',
    component: () => import('../views/TwoFactorView.vue'),
    meta: { title: '2FA' }
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | PagueCompras`
  next()
})

export default router
