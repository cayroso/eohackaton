<template>
    <page :uid="uid" :urlView="urlView" :urlAdd="urlAdd"></page>
</template>
<script>
    import page from '../../../_Common/Components/Pens/index.vue'

    export default {
        mixins: [
        ],
        components: {
            page
        },
        props: {
            uid: { type: String, required: true },
            urlView: { type: String, required: true },
            urlAdd: { type: String, required: true },
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