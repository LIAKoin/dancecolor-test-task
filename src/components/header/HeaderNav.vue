<template>
    <nav class="nav">
        <ul class="nav__list">
            <NavItem 
                v-for="(item, index) in items" 
                :key="index"

                :class="['nav__item', {'menu-open': menuStore.isOpen && item?.content !== 'burger'}]"
            >
                <BurgerMenu v-if="item?.content === 'burger'"/>
                <span class="nav__item-text" v-else>{{ item.text }}</span>
            </NavItem>
        </ul>
    </nav>
</template>

<script setup lang="ts">
    import BurgerMenu from './BurgerMenu.vue';
    import NavItem from './NavItem.vue';
    import { menuStore } from '@/stores/useMenuStore';

    const items = [
        { text: "Услуги", href: "#!" },
        { text: "Экскурсии", href: "#!" },
        { text: "Новости", href: "#!" },
        { text: "О центре", href: "#!" },
        { text: "Контакты", href: "#!" },
        { content: "burger" },
    ];
</script>

<style lang="scss" scoped>
    .nav {
        display: flex;

        &__list {
            display: flex;
            align-items: center;
            gap: 62px;

            @media (max-width: 1024px) {
                gap: 20px;
            }
        }

        &__item {
            opacity: 1;
            transition: all .3s ease-out;

            &.menu-open {
                opacity: 0;
            }

            &-text {
                font-weight: 700;
                font-size: 15px;
                line-height: 150%;
                text-transform: uppercase;

                @media (max-width: 1024px) {
                    font-size: 12px;
                }
    
                @media (max-width: 768px) {
                    display: none !important;
                }
            }
        }
    }
</style>