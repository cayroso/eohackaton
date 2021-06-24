<template>
    <div v-cloak>
        <b-overlay :show="busy">
            <div class="p-1 text-right">
                <button @click="addBattle" class="btn btn-primary">
                    <span class="fas fa-fw fa-plus"></span>
                </button>
                <button @click="get()" class="btn btn-primary">
                    <span class="fas fa-fw fa-sync"></span>
                </button>
            </div>


            <div v-observe-visibility="{callback: get, once: true}">
                <table-list :header="{key:'battleId', columns:[]}" :items="items" :getRowNumber="$util.noop2" :isSelected="$util.noop2" :setSelected="$util.noop">
                    <template #header>
                        <td>#</td>
                        <td>Date</td>
                        <td>Weight</td>
                        <td>Type</td>
                        <td>Result</td>
                    </template>

                    <template slot="table" slot-scope="row">
                        <td>{{row.index+1}}</td>
                        <td>{{row.item.date|moment('calendar')}}</td>
                        <td>{{row.item.weight}}</td>
                        <td>{{row.item.battleTypeText}}</td>
                        <td>{{row.item.resultText}}</td>
                    </template>

                    <template slot="list" slot-scope="row">
                        <div class="form-group mb-0 row no-gutters">
                            <label class="col-3 col-form-label">Date</label>
                            <div class="col">
                                <span class="form-control-plaintext">
                                    {{row.item.date|moment('calendar')}}
                                </span>
                            </div>
                        </div>
                        <div class="form-group mb-0 row no-gutters">
                            <label class="col-3 col-form-label">Weight</label>
                            <div class="col">
                                <span class="form-control-plaintext">
                                    {{row.item.weight}}
                                </span>
                            </div>
                        </div>
                        <div class="form-group mb-0 row no-gutters">
                            <label class="col-3 col-form-label">Pit Type</label>
                            <div class="col">
                                <span class="form-control-plaintext">
                                    {{row.item.battleTypeText}}
                                </span>
                            </div>
                        </div>
                        <div class="form-group mb-0 row no-gutters">
                            <label class="col-3 col-form-label">Result</label>
                            <div class="col">
                                <span class="form-control-plaintext">
                                    {{row.item.resultText}}
                                </span>
                            </div>
                        </div>
                    </template>
                </table-list>

            </div>
        </b-overlay>

        <modal-add-battle ref="modalAddBattle" @saved="battleSaved"></modal-add-battle>
    </div>
</template>
<script>
    import page from '../../../../_Core/Mixins/pageMixin'
    import modalAddBattle from '../../../../_Common/Modals/Battles/add.vue';
    //import tableList from '../../../../_Core/Components/table-list.vue';

    export default {
        mixins: [
            page
        ],
        components: {
            modalAddBattle,
            //tableList
        },
        props: {
            id: String
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
                    await vm.$util.axios.get(`/api/birds/${vm.id}/battle-history`)
                        .then(resp => {
                            vm.items = resp.data.items;
                        });
                } catch (e) {
                    vm.$util.handleError(e);
                } finally {
                    vm.busy = false;
                }
            },

            addBattle() {
                const vm = this;

                vm.$refs.modalAddBattle.open(vm.id, '');// vm.item.name);
            },

            async battleSaved() {
                const vm = this;

                vm.$refs.modalAddBattle.close();

                await vm.get();
            },


        }
    }
</script>