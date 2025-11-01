<template>
    <button 
        class="burger" 
        :class="{ 'burger--open': menuStore.isOpen }"
        @click="menuStore.toggle()"
        aria-label="Toggle menu"
        aria-expanded="menuStore.isOpen"
    >
        <span class="burger__line burger__line--top"></span>
        <span class="burger__line burger__line--middle"></span>
        <span class="burger__line burger__line--bottom"></span>
    </button>
</template>
  
<script setup lang="ts">
    import { menuStore } from '@/stores/useMenuStore';
</script>
  
<style lang="scss" scoped>
    .burger {
        $self: &;
        
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        position: relative;

        width: 60px;
        height: 60px;

        background: none;
        border: none;
        padding: 20px 4px;

        cursor: pointer;
        pointer-events: auto;

        @media (max-width: 1024px) {
            padding: 14px 2px;
            width: 48px;
            height: 48px;
        }

        @media (max-width: 768px) { 
            padding: 10px 0;
            width: 36px;
            height: 36px;
        }

        &--open {
            @media (max-width: 768px) {
                pointer-events: none;
            }
        }

        &__line {
            display: block;

            width: 100%;
            height: 2px;

            background: #011126;
            border-radius: 2px;
            
            transition: all 0.3s ease-out;
            transform-origin: center;

            #{$self}:hover & {
                transform: scale(1.1);
            }

            #{$self}--open & {
                background: #fff;
                
                @media (max-width: 768px) { 
                    background: #fff0;
                }
            }

            &--top,
            &--bottom {
                #{$self}--open & {
                    transform: translateY(9px) rotate(45deg);

                    @media (max-width: 768px) {
                        transform: translateY(7px) rotate(45deg);
                    }
                }

                #{$self}--open:hover & {
                    transform: translateY(9px) rotate(45deg) scale(1.1);

                    @media (max-width: 768px) {
                        transform: translateY(7px) rotate(45deg) scale(1.1);
                    }
                }
            }

            &--bottom {
                #{$self}--open & {
                    transform: translateY(-9px) rotate(-45deg);

                    @media (max-width: 768px) {
                        transform: translateY(-7px) rotate(-45deg);
                    }
                }

                #{$self}--open:hover & {
                    transform: translateY(-9px) rotate(-45deg) scale(1.1);

                    @media (max-width: 768px) {
                        transform: translateY(-7px) rotate(-45deg) scale(1.1);
                    }
                }
            }

            &--middle {
                #{$self}--open & {
                    opacity: 0;
                }
            }
        }
    }
</style>