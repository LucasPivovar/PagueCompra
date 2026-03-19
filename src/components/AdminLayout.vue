<template>
  <div class="admin-layout" :class="{ 'sidebar-collapsed': isCollapsed, 'is-mobile': isMobile, 'sidebar-open': !isCollapsed && isMobile }">
    <div v-if="isMobile && !isCollapsed" class="sidebar-overlay" @click="toggleSidebar"></div>
    <AdminSidebar :is-collapsed="isCollapsed" @toggle-sidebar="toggleSidebar" />
    <AdminNavbar :is-collapsed="isCollapsed" :notification-count="notificationCount" @toggle-sidebar="toggleSidebar" @toggle-notifications="isNotificationsOpen = !isNotificationsOpen" />
    <NotificationDrawer :is-open="isNotificationsOpen" @close="isNotificationsOpen = false" @update:count="notificationCount = $event" />
    <div class="main-content">
      <main class="page-container">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script>
import AdminSidebar from './AdminSidebar.vue'
import AdminNavbar from './AdminNavbar.vue'
import NotificationDrawer from './NotificationDrawer.vue'

export default {
  name: 'AdminLayout',
  components: {
    AdminSidebar,
    AdminNavbar,
    NotificationDrawer
  },
  data() {
    return {
      isCollapsed: false,
      isMobile: false,
      isNotificationsOpen: false,
      notificationCount: 0
    }
  },
  mounted() {
    this.checkMobile()
    window.addEventListener('resize', this.checkMobile)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile)
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth < 1024
      if (this.isMobile) {
        this.isCollapsed = true
      }
    },
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed
    }
  }
}
</script>

<style scoped>
@reference "tailwindcss";

.admin-layout {
  display: flex;
  min-height: 100vh;
  transition: all 0.3s ease;
  overflow-x: hidden;
  width: 100vw;
  max-width: 100%;
}

.main-content {
  flex: 1;
  margin-left: 250px;
  margin-top: 80px; /* Offset for fixed navbar */
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 0;
  max-width: 100%;
}

/* Allow main content to take full width when sidebar is collapsed */
@media (min-width: 1024px) {
  .sidebar-collapsed .main-content {
    margin-left: 0;
  }
}

.is-mobile .main-content {
  margin-left: 0 !important;
}

.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  z-index: 90;
}

.page-container {
  padding: 2rem 1rem;
  flex: 1;
  background-color: #f8fafc;
  min-width: 0;
  max-width: 100%;
  overflow-x: hidden;
}

@media (max-width: 640px) {
  .page-container {
    padding: 1.5rem 0.5rem;
  }
}
</style>
