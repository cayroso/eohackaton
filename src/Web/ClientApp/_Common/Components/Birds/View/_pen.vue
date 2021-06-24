<template>
    <div v-cloak>
        <b-overlay :show="busy">
            <div class="text-right p-2">
                <button @click="openModalMoveBird()" class="btn btn-primary">
                    <span class="fas fa-fw fa-exchange-alt"></span>
                </button>
                <button @click="get()" class="btn btn-primary">
                    <span class="fas fa-fw fa-sync"></span>
                </button>
            </div>
            <div class="table-responsive mb-0" v-observe-visibility="{callback: get, once: true}">
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Date</td>
                            <td>Name</td>
                            <td>Comments</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(pb,i) in items">
                            <td>{{i+1}}</td>
                            <td>
                                <div>
                                    Start: {{pb.dateStart|moment('calendar')}}
                                </div>
                                <div v-if="pb.done">
                                    End: {{pb.dateEnd|moment('calendar')}}
                                </div>
                            </td>
                            <td>
                                <div>
                                    {{pb.name}}
                                </div>
                                <div>
                                    {{pb.penTypeText}}
                                </div>

                            </td>
                            <td>{{pb.comments}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </b-overlay>

        <modalMoveBird ref="modalMoveBird" @saved="penMoved"></modalMoveBird>
    </div>
</template>
<script>
    import page from '../../../../_Core/Mixins/pageMixin'

    import modalMoveBird from '../../../../_Core/Modals/Pens/move.vue';
    export default {
        mixins: [
            page
        ],
        components: {
            modalMoveBird
        },
        props: {
            id: String,
        },
        data() {
            return {
                items: []
            };
        },
        computed: {

        },
        async created() {

        },
        async mounted() {

        },
        methods: {
            async get(visible) {
                if (visible === false) {
                    return
                }


                const vm = this;

                if (vm.busy)
                    return;

                try {

                    vm.busy = true;

                    await vm.$util.axios.get(`api/birds/${vm.id}/pen-history`)
                        .then(resp => {
                            const data = resp.data;
                            const items = data.items;

                            items.forEach(e => {
                                const ed = moment(e.dateEnd);

                                e.done = moment().isAfter(ed);

                            });

                            vm.items = data.items;



                        });
                } catch (e) {
                    vm.$util.handleError(e);
                } finally {
                    vm.busy = false;
                }
            },


            openModalMoveBird() {
                const vm = this;

                vm.$refs.modalMoveBird.open(vm.id);
            },

            async penMoved() {
                const vm = this;

                vm.closeModalMoveBird();

                await vm.getPenHistory();
            },

            closeModalMoveBird() {
                const vm = this;
                vm.$refs.modalMoveBird.close();
            },
        }
    }
</script>