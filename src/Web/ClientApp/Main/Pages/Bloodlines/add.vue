<template>
    <page :uid="uid" :urlView="urlView"></page>
</template>
<script>
    import page from '../../../_Common/Components/Bloodlines/add.vue';

    export default {
        mixins: [
        ],
        components: {
            page
        },
        props: {
            uid: String,
            urlView: String,
        },
        data() {
            return {

            };
        },
        computed: {

        },
        async created() {

        },
        async mounted() {

        },
        methods: {

        }
    }
</script>