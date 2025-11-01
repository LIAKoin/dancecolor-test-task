<template>
    <div class="main">
        <nav 
            class="main__nav main__nav--primary" 
            :class="{ nested: isNested }"
        >
            <MenuList 
                type="primary"
                :list-source="navItems"
                :active-submenu-idx="activeSubmenuIdx"
                :submenu-length="activeSubmenu.length"
                @set-active-submenu="handleSubmenuActivation"
            >
                <template 
                    v-if="isNested"
                >
                    <MenuList 
                        type="secondary--mobile"
                        :list-source="activeSubmenu"
                        :active-submenu-idx="activeSubmenuIdx"
                    />
                </template>
            </MenuList>
        </nav>

        <nav 
            v-if="!isNested"
            class="main__nav main__nav--secondary" 
            :class="{ opened: hasActiveSubmenu }"
        >
            <MenuList 
                type="secondary"
                :list-source="activeSubmenu"
                :submenu-length="activeSubmenu.length"
                :active-submenu-idx="activeSubmenuIdx"
            />
        </nav>
    </div>
</template>

<script setup lang="ts">
    import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';
    import MenuList from './MenuList.vue';
    import type { IListSource, IListSourceSub } from '@/types/menu';

    const navItems = reactive<IListSource[]>([
        {
            text: "Услуги", 
            href: "#!", 
            submenu: [
                { text: "Аренда павильонов и студий", href: "#!" }, 
                { text: "Аренда светового оборудования", href: "#!" }, 
                { text: "Декорации и сценография", href: "#!" }, 
                { text: "Монтаж видео и звука", href: "#!" }, 
                { text: "Выдача программ", href: "#!" }, 
                { text: "Дата-центр", href: "#!" }, 
                { text: "Реклама в центре", href: "#!" }, 
            ]
        },
        { text: "Экскурсии", href: "#!", submenu: [] },
        { text: "О центре", href: "#!", submenu: [] },
        { text: "Новости", href: "#!", submenu: [] },
        { text: "Контакты", href: "#!", submenu: [] },
    ]);

    const activeSubmenu = ref<IListSourceSub[]>([]);
    const activeSubmenuIdx = ref<number>(-1);
    const isNested = ref(false);

    const hasActiveSubmenu = computed(() => activeSubmenu.value.length > 0);
    const firstItemWithSubmenuIndex = computed(() => 
        navItems.findIndex(item => item.submenu.length > 0)
    );

    function updateSubmenuPosition(): void {
        isNested.value = window.innerWidth <= 768;
    }

    function handleSubmenuActivation(index: number): void {
        if (activeSubmenuIdx.value === index) {
            closeSubmenu();
        } else {
            openSubmenu(index);
        }
    }

    function openSubmenu(index: number): void {
        activeSubmenuIdx.value = index;
        activeSubmenu.value = navItems[index].submenu;
    }

    function closeSubmenu(): void {
        activeSubmenuIdx.value = -1;
        activeSubmenu.value = [];
    }

    function initializeFirstSubmenu(): void {
        const firstIndex = firstItemWithSubmenuIndex.value;
        if (firstIndex !== -1) {
            openSubmenu(firstIndex);
        }
    }

    function handleResize(): void {
        updateSubmenuPosition();
    }

    onMounted(() => {
        initializeFirstSubmenu();
        updateSubmenuPosition();
        window.addEventListener('resize', handleResize);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', handleResize);
    });
</script>

<style lang="scss" scoped>
.main {
    display: flex;
    flex: 1 1 auto;
    overflow: auto;

    &__nav {
        padding: 81px 64px;
        width: 33%;

        @media (max-width: 1300px) {
            padding: 20px;
        }

        &.nested {
            width: 100%;
        }

        &--secondary {
            border-left: 1px solid #ffffff8f;
            padding: 92px 94px;
            width: 66%;

            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease-out;

            @media (max-width: 1300px) {
                padding: 20px;
            }

            &.opened {
                opacity: 1;
                pointer-events: auto;
            }
        }
    }
}
</style>