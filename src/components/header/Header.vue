<template>
    <header :class="['header', { 'menu-open': menuStore.isOpen }]">
        <Logo />
    
        <HeaderNav />
    </header>
</template>
  
<script setup lang="ts">
    import Logo from '../Logo.vue';
    import HeaderNav from './HeaderNav.vue';
    import { menuStore } from '@/stores/useMenuStore';
</script>
  
<style lang="scss" scoped>
    .header {
        display: flex;
        justify-content: space-between;

        padding: 30px 60px;
        width: 100%;

        position: fixed;
        top: 0;
        z-index: 1010;

        transition: all .3s ease-out;

        background-color: #fff;

        @media (max-width: 1024px) {
            padding: 12px 20px;
        }

        @media (max-width: 768px) {
            padding: 10px 20px;
        }
    }

    .menu-open {
        background-color: #fff0;
        pointer-events: none;
    }
</style>
  