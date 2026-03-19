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
    path: '/financial/create-transactions',
    name: 'CreateTransactions',
    component: () => import('../views/CreateTransactions.vue'),
    meta: { title: 'Criar Transações' }
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
    component: () => import('../views/submenu/SettingsGeneral.vue'),
    meta: { title: 'Configurações Gerais' }
  },
  {
    path: '/settings/levels',
    name: 'SettingsLevels',
    component: () => import('../views/submenu/SettingsLevels.vue'),
    meta: { title: 'Níveis' }
  },
  {
    path: '/settings/acquirer',
    name: 'SettingsAcquirer',
    component: () => import('../views/submenu/SettingsAcquirer.vue'),
    meta: { title: 'Adquirentes' }
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
