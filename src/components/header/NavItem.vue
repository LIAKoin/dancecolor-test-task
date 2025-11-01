<template>
    <li class="nav__item">
        <a href="#!" class="nav__link">
            <slot></slot>
        </a>
    </li>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
    .menu-open {
        opacity: 0;
    }
    .nav {
        &__item {
            display: flex;
            align-items: center;

            height: 100%;

            &:first-of-type > * > * {
                display: flex;
                align-items: center;

                &::before {
                    content: "";
                    display: inline-block;
                    width: 9px;
                    height: 9px;
                    background-image: url('@/assets/icons/ServiceIcon.svg');
                    background-size: contain;
                    background-repeat: no-repeat;
                    margin-right: 6px;
                }
            }
        }

        &__link {
            display: flex;
            align-items: center;
        }
    }
</style>