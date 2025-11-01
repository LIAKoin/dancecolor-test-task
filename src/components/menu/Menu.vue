<template>
    <div class="menu">
        <div 
            class="menu__overlay" 
            :class="{ 'menu__overlay--visible': menuStore.isOpen }"
            @click="menuStore.closeMenu"
        />
        <div 
            class="menu__content" 
            :class="{ 'menu__content--visible': menuStore.isOpen }"
            @touchstart="handleTouchStart"
            @touchmove="handleTouchMove"
            @touchend="handleTouchEnd"
        >
            <MenuMain />
            <MenuFooter />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import MenuMain from './MenuMain.vue';
    import MenuFooter from './MenuFooter.vue';
    import { menuStore } from '@/stores/useMenuStore';

    const touchStartY = ref(0);
    const touchCurrentY = ref(0);
    const isSwiping = ref(false);

    function handleTouchStart(event: TouchEvent): void {
        if (!menuStore.isOpen) return;
        
        touchStartY.value = event.touches[0].clientY;
        touchCurrentY.value = touchStartY.value;
        isSwiping.value = true;
    }

    function handleTouchMove(event: TouchEvent): void {
        if (!isSwiping.value) return;

        touchCurrentY.value = event.touches[0].clientY;
        const diff = touchCurrentY.value - touchStartY.value;

        if (diff > 0) {
            const menuContent = event.currentTarget as HTMLElement;
            const translateY = Math.min(diff, 300);
            menuContent.style.transform = `translateY(${translateY}px)`;
        }
    }

    function handleTouchEnd(event: TouchEvent): void {
        if (!isSwiping.value) return;

        const diff = touchCurrentY.value - touchStartY.value;
        const menuContent = event.currentTarget as HTMLElement;
        
        menuContent.style.transform = '';

        if (diff > 50) {
            menuStore.close();
        }

        isSwiping.value = false;
        touchStartY.value = 0;
        touchCurrentY.value = 0;
    }
</script>

<style lang="scss" scoped>
    .menu {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;

        width: 100vw;
        height: 100vh;

        &__overlay {
            position: absolute;
            top: 0;
            left: 0;

            width: 100%;
            height: 100%;

            background-color: rgba(0, 0, 0, 0);
            transition: background-color 0.3s ease-out;
            pointer-events: none;

            &--visible {
                background-color: rgba(0, 0, 0, 0.5);
                pointer-events: auto;
            }
        }

        &__content {
            display: flex;
            flex-direction: column;

            position: relative;
            top: 100%;

            width: 100%;
            height: 100%;

            background-image: url('@/assets/img/BG.jpg');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            
            transition: top 0.3s ease-out;

            &--visible {
                top: 0;
            }
        }
    }
</style>