<template>
    <div v-cloak>
        <div class="row no-gutters align-items-center pb-2 border-bottom">
            <div class="col">
                <h1 class="h3 mb-0">
                    <i class="fas fa-fw fa-tag mr-1 d-none"></i>Season
                </h1>
            </div>
            <div class="col-auto">
                <button @click="close" class="btn btn-secondary">
                    <span class="fas fa-fw fa-times-circle"></span>
                </button>
            </div>
        </div>
        <div class="mt-2" v-observe-visibility="{callback: get, once: true}">
            <div class="d-flex flex-row justify-content-between align-items-center py-2">
                <h2 class="h5 mb-0">
                    Information
                </h2>
                <div>
                    <button @click="get()" class="btn btn-primary">
                        <span class="fas fa-fw fa-sync"></span>
                    </button>
                </div>
            </div>

            <b-overlay :show="busy">
                <div class="card-body">
                    <div class="form-group row">
                        <label class="col-4 text-right col-form-label">Name</label>
                        <div class="col">
                            <span class="form-control-plaintext">{{item.name}}</span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-4 text-right col-form-label">Breedings</label>
                        <div class="col">
                            <span class="form-control-plaintext">{{item.breedingCount}}</span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-4 text-right col-form-label">Date Start</label>
                        <div class="col">
                            <span class="form-control-plaintext">{{item.dateStart|moment('YYYY-MM-DD')}}</span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-4 text-right col-form-label">Date End</label>
                        <div class="col">
                            <span class="form-control-plaintext">{{item.dateEnd|moment('YYYY-MM-DD')}}</span>
                        </div>
                    </div>
                </div>


            </b-overlay>
        </div>

        <b-overlay :show="busy">

            <div>
                <div class="row no-gutters">
                    <div class="col">Fertility: {{item.fertile}}</div>
                </div>
                <b-progress :max="item.eggs" height="25px">
                    <b-progress-bar :value="item.fertile" :label="`${item.pctFertility}%`" variant="success"></b-progress-bar>
                </b-progress>

                <div class="row no-gutters">
                    <div class="col">Hatchability: {{item.hatched}}</div>
                </div>
                <b-progress :max="item.fertile" height="25px">
                    <b-progress-bar :value="item.hatched" :label="`${item.pctHatchability}%`" variant="success"></b-progress-bar>
                </b-progress>

                <div class="row no-gutters">
                    <div class="col">Cock: {{item.cocks}} / Hen: {{item.hens}}</div>
                </div>
                <b-progress :max="item.birds" height="25px">
                    <b-progress-bar :value="item.cocks" :label="`${(item.cocks/item.birds)*100}% cock`" variant="success"></b-progress-bar>
                    <b-progress-bar :value="item.hens" :label="`${(item.hens/item.birds)*100}% hen`" variant="info"></b-progress-bar>
                </b-progress>

                <div>
                    Pit
                </div>
                <b-progress :max="item.fights" height="25px">
                    <b-progress-bar :value="item.wins" :label="`${item.wins} win`" variant="success"></b-progress-bar>
                    <b-progress-bar :value="item.loses" :label="`${item.loses} lose`" variant="danger"></b-progress-bar>
                    <b-progress-bar :value="item.draws" :label="`${item.draws} draw`" variant="warning"></b-progress-bar>
                </b-progress>
            </div>

        </b-overlay>

        <modal-quick-view-bird ref="modalQuickViewBird" :urlView="urlViewBird"></modal-quick-view-bird>
    </div>
</template>
<script>
    import page from '../../../_Core/Mixins/pageMixin'

    import modalQuickViewBird from '../../Modals/Birds/quick-view.vue';

    export default {
        mixins: [
            page
        ],
        components: {
            modalQuickViewBird
        },
        props: {
            uid: { type: String, required: true },
            id: { type: String, required: true },
            urlViewBird: { type: String, required: true },
        },
        data() {
            return {
                item: {
                },

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

                    await vm.$util.axios.get(`api/seasons/${vm.id}`)
                        .then(resp => {
                            const data = resp.data;

                            vm.item = data;

                            const item = vm.item;

                            item.pctFertility = ((data.fertile / data.eggs) * 100).toFixed(0);
                            item.pctHatchability = ((data.hatched / data.fertile) * 100).toFixed(0);

                            item.birds = data.cocks + data.hens;
                            item.fights = data.wins + data.loses + data.draws;
                        });

                } catch (e) {
                    vm.$util.handleError(e);
                } finally {
                    vm.busy = false;
                }
            },

        }
    }
</script>