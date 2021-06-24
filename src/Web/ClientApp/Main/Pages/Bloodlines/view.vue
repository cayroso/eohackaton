<template>
    <page :uid="uid" :id="id" :urlViewBird="urlViewBird"></page>
</template>
<script>
    import page from '../../../_Common/Components/Bloodlines/view.vue';

    export default {
        mixins: [
        ],
        components: {
            page
        },
        props: {
            uid: { type: String, required: true },
            id: { type: String, required: true },
            urlViewBird: { type: String, required: true },
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