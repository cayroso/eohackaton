<template>
    <div v-cloak>
        <accounts-index></accounts-index>
    </div>
</template>
<script>
    import accountsIndex from '../../../_Common/Components/Accounts/index.vue';

    export default {
        //mixins: [pageMixin],

        props: {
            uid: String,
        },
        components: {
            accountsIndex
        },
        data() {
            return {

            };
        },

        computed: {

        },

        async created() {
            const vm = this;

        },

        async mounted() {
            const vm = this;

        },

        methods: {
            //openModal() {
            //    const vm = this;
            //    vm.$refs.modalChangeTheme.open();
            //}
        }
    }
</script>