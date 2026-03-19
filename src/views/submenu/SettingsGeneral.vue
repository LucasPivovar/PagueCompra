<template>
  <AdminLayout>
    <div class="page-header">
      <h2 class="page-title">Configurações Gerais</h2>
    </div>
    <div class="card">
      <p>Ajustes do sistema.</p>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from '../../components/AdminLayout.vue'

export default {
  name: 'SettingsGeneralView',
  components: {
    AdminLayout
  }
}
</script>
