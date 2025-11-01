<template>
    <img
        :src="logoSrc"
        alt="Logo"
        :class="['logo', { 'menu-open': menuStore.isOpen }]"
    />
</template>
  
<script setup lang="ts">
    import { menuStore } from '@/stores/useMenuStore'
    import { ref, onMounted, onBeforeUnmount } from 'vue'
    
    import LogoBig from '@/assets/icons/LogoBig.svg'
    import LogoMedium from '@/assets/icons/LogoMedium.svg'
    import LogoSmall from '@/assets/icons/LogoSmall.svg'
    
    const logoSrc = ref(LogoBig);
    
    function updateLogo(): void {
        const width = window.innerWidth
    
        if (width <= 380) logoSrc.value = LogoSmall
        else if (width <= 1024) logoSrc.value = LogoMedium
        else logoSrc.value = LogoBig
    }
    
    onMounted(() => {
        updateLogo()
        window.addEventListener('resize', updateLogo)
    })
    
    onBeforeUnmount(() => {
        window.removeEventListener('resize', updateLogo)
    })
</script>
  
<style lang="scss" scoped>
    .logo {
        opacity: 1;
        transition: all .3s ease-out;
    }
    .menu-open {
        opacity: 0;
    }
</style>