<template>
    <page :uid="uid" :urlView="urlView" :urlAdd="urlAdd"></page>
</template>
<script>

    import page from '../../../_Common/Components/Bloodlines/index.vue';

    export default {
        mixins: [
        ],
        components: {
            page
        },
        props: {
            uid: String,
            urlView: String,
            urlAdd: String,
        },
        data() {
            return {};
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