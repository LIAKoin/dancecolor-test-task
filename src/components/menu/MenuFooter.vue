<template>
    <footer class="footer">

        <address class="footer__address footer__text">Москва, ул. Ленина, 12</address>

        <div class="footer__contacts">

            <span class="footer__contact">
                <img src="@/assets/icons/Phone.svg" alt="Phone" class="footer__icon">
                <a class="footer__text" href="tel:+89998888888">8 (999) 888-88-88</a>
            </span>

            <span class="footer__contact">
                <img src="@/assets/icons/Mail.svg" alt="Mail" class="footer__icon">
                <a class="footer__text"  href="mailto:8888@center.ru">8888@center.ru</a>
            </span>

        </div>

    </footer>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
    .footer {
        display: flex;
        flex-wrap: wrap;
        gap: 64px;

        min-height: 10%;
        padding: 40px 64px;
        border-top: 1px solid #fff;
        opacity: 0.6;

        flex-shrink: 0;

        @media (max-width: 1300px) {
            padding: 30px 20px;
        }

        @media (max-width: 600px) {
            flex-direction: column;
            gap: 30px;
        }

        &__text {
            font-style: normal;
            font-size: 20px;
            font-weight: 500;
            line-height: 120%;

            color: #F5F5F5;

            @media (max-width: 1300px) {
                font-size: 14px;
            }
        }

        &__contacts {
            display: flex;
            gap: 40px;

            @media (max-width: 600px) {
                flex-direction: column;
                gap: 14px;
            }
        }

        &__contact {
            display: flex;
            align-items: center;

            height: fit-content;
        }

        &__icon {
            width: 15px;
            height: 15px;

            margin-right: 10px;

            object-fit: contain;
        }
    }
</style>