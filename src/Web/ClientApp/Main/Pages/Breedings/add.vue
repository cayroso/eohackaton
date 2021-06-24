<template>
    <page :uid="uid" :urlView="urlView"></page>

</template>
<script>
    import page from '../../../_Common/Components/Breedings/add.vue'
    export default {
        mixins: [
        ],
        components: {
            page
        },
        props: {
            uid: { type: String, required: true },
            urlView: { type: String, required: true },
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