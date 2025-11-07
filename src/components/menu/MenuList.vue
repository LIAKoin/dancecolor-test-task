<template>
    <ul
        class="list"
        :class="listClass"
    >
        <li 
            v-for="(item, index) in listSource" 
            :key="index"
            class="list__item"
            :class="itemClass"
            @click="handleItemClick(Number(index))"
        >
            <a
                :href="item.href"
                class="list__link"
                :class="linkClass"
            >
                {{ item.text }}
            </a>

            <img
                v-if="'submenu' in item && item?.submenu?.length"
                class="list__icon"
                :class="{ rotated: isSubmenuActive(Number(index)) }"
                src="@/assets/icons/ArrowRight.svg"
                alt="Expand submenu"
            />
                
            <slot
                v-if="isSubmenuActive(Number(index))"
                name="submenumobile"
                :index="index"
            />
        </li>
    </ul>
</template>

<script setup lang="ts">
    import type { IListSource, IListSourceSub } from '@/types/menu';
    import { computed } from 'vue';

    interface Props {
        type: string;
        listSource: IListSource[] | IListSourceSub[] | [];
        submenuLength: number;
        activeSubmenuIdx: number;
    }

    const props = defineProps<Props>();
    const emit = defineEmits(['setActiveSubmenu']);

    const isSecondaryType = computed(() => props.type === 'secondary');
    const isSecondaryMobileType = computed(() => props.type === 'secondary--mobile');
    
    const listClass = computed(() => ({
        'list--secondary--mobile': isSecondaryMobileType.value
    }));

    const itemClass = computed(() => ({
        'list__item--secondary--mobile': isSecondaryMobileType.value
    }));

    const linkClass = computed(() => ({
        'list__link--secondary': isSecondaryType.value,
        'list__link--secondary--mobile': isSecondaryMobileType.value
    }));

    function isSubmenuActive(index: number): boolean {
        return props.activeSubmenuIdx === index && props.submenuLength > 0;
    }

    function handleItemClick(index: number): void {
        if (isSecondaryType.value) return;
        emit('setActiveSubmenu', index);
    }
</script>

<style lang="scss" scoped>
.list {
    &--secondary--mobile {
        grid-column: 1 / 3;
        grid-row: 2;

        font-size: 24px;
        line-height: 120%;
        font-weight: 500;

        border-bottom: 1px solid #ffffff8f;
        margin-bottom: 20px;

        @media (max-width: 1300px) {
            font-size: 18px;
        }
    }

    &__icon {
        width: 15px;
        height: 15px;

        object-fit: contain;

        transform: translateY(-10px);
        transition: transform 0.3s ease;
    
        &.rotated {
            transform: translateY(-10px) rotate(90deg);
        }
    }

    &__item {
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-rows: auto 1fr;

        justify-content: space-between;
        align-items: center;

        &:last-child > .list__link--secondary--mobile {
            margin-bottom: 40px;
        }
    }

    &__link {
        line-height: 100%;
        font-size: 60px;
        letter-spacing: -1%;
        font-weight: 500;

        color: #fff;

        margin-bottom: 20px;

        @media (max-width: 1300px) {
            font-size: 30px;
        }
    
        &--secondary,
        &--secondary--mobile {
            font-size: 24px;
            line-height: 120%;
            font-weight: 500;

            @media (max-width: 1300px) {
                font-size: 18px;
            }
        }

        &--secondary--mobile {
            margin-bottom: 16px;
        }
    }
}
</style>