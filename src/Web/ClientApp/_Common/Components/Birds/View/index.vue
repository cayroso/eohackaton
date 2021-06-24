<style>
    .max-height-width {
        max-width: 100%;
        margin: 0;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 70vh;
        display: flex;
    }
</style>
<template>
    <div v-cloak>
        <div class="row no-gutters align-items-center">
            <div class="col">
                <h1 class="h3 mb-sm-0">
                    <i class="fas fa-fw fa-tag mr-1 d-none"></i>Bird
                </h1>
            </div>
            <div class="col-auto">
                <button @click="close" class="btn btn-secondary">
                    <span class="fas fa-fw fa-times-circle"></span>
                </button>
            </div>
        </div>

        <div class="mt-2 card" v-bind:class="{'shadow-sm': toggles.information }">
            <div @click="toggle('information')" class="card-header d-flex flex-row justify-content-between align-items-center">
                <h2 class="h6 mb-0">
                    Information
                </h2>
                <div>
                    <span>
                        <span v-if="toggles.information" class="fas fa-fw fa-angle-up"></span>
                        <span v-else class="fas fa-fw fa-angle-down"></span>
                    </span>
                </div>
            </div>
            <b-collapse v-model="toggles.information">
                <b-overlay :show="busy">
                    <div class="text-right p-2">
                        <button @click="getInformation()" class="btn btn-primary">
                            <span class="fas fa-fw fa-sync"></span>
                        </button>
                    </div>
                    <p-information :id="id"></p-information>                    
                </b-overlay>
            </b-collapse>
        </div>

        <!--<div class="card mt-2" v-bind:class="{'shadow-sm': toggles.activityLogs }">
            <div @click="toggle('activityLogs')" class="card-header d-flex flex-row justify-content-between align-items-center">
                <h2 class="h6 mb-0">
                    Activity Log
                </h2>
                <div>
                    <span>
                        <span v-if="toggles.activityLogs" class="fas fa-fw fa-angle-up"></span>
                        <span v-else class="fas fa-fw fa-angle-down"></span>
                    </span>
                </div>
            </div>
            <b-collapse v-model="toggles.activityLogs">
                <b-overlay :show="busy">
                    <div class="card-body">
                        <b-tabs content-class="mt-3">
                            <b-tab title="Feeding" active>
                                <div class="text-right">
                                    <button class="btn btn-primary">
                                        <span class="fas fa-fw fa-plus"></span>
                                    </button>
                                    <button @click="getActivityLogs" class="btn btn-primary">
                                        <span class="fas fa-fw fa-sync"></span>
                                    </button>

                                </div>
                                <div>
                                    under construction
                                </div>
                            </b-tab>
                            <b-tab title="Medication">
                                <div class="text-right">
                                    <button class="btn btn-primary">
                                        <span class="fas fa-fw fa-plus"></span>
                                    </button>
                                    <button @click="getActivityLogs" class="btn btn-primary">
                                        <span class="fas fa-fw fa-sync"></span>
                                    </button>

                                </div>
                                <div>
                                    under construction
                                </div>
                            </b-tab>
                            <b-tab title="Vaccination">
                                <div class="text-right">
                                    <button class="btn btn-primary">
                                        <span class="fas fa-fw fa-plus"></span>
                                    </button>
                                    <button @click="getActivityLogs" class="btn btn-primary">
                                        <span class="fas fa-fw fa-sync"></span>
                                    </button>

                                </div>
                                <div>
                                    under construction
                                </div>
                            </b-tab>
                            <b-tab title="Training">
                                <div class="text-right">
                                    <button class="btn btn-primary">
                                        <span class="fas fa-fw fa-plus"></span>
                                    </button>
                                    <button @click="getActivityLogs" class="btn btn-primary">
                                        <span class="fas fa-fw fa-sync"></span>
                                    </button>

                                </div>
                                <div>
                                    under construction
                                </div>
                            </b-tab>
                        </b-tabs>
                    </div>
                </b-overlay>
            </b-collapse>
        </div>-->

        <div v-if="item.category === 1 && item.gender === 1" class="card mt-2" v-bind:class="{'shadow-sm': toggles.pitHistory }">
            <div @click="toggle('pitHistory')" class="card-header d-flex flex-row justify-content-between align-items-center">
                <h2 class="h6 mb-0">
                    Pit History
                </h2>
                <div>
                    <span>
                        <span v-if="toggles.pitHistory" class="fas fa-fw fa-angle-up"></span>
                        <span v-else class="fas fa-fw fa-angle-down"></span>
                    </span>
                </div>
            </div>
            <b-collapse v-model="toggles.pitHistory">
                <battle :id="id"></battle>
            </b-collapse>
        </div>

        <div class="card mt-2" v-bind:class="{'shadow-sm': toggles.breedingHistory }">
            <div @click="toggle('breedingHistory')" class="card-header d-flex flex-row justify-content-between align-items-center">
                <h2 class="h6 mb-0">
                    Breeding History
                </h2>
                <div>
                    <span>
                        <span v-if="toggles.breedingHistory" class="fas fa-fw fa-angle-up"></span>
                        <span v-else class="fas fa-fw fa-angle-down"></span>
                    </span>
                </div>
            </div>
            <b-collapse v-model="toggles.breedingHistory">
                <p-breeding :id="id" :urlView="urlView" :urlViewBreeding="urlViewBreeding"></p-breeding>
            </b-collapse>
        </div>

        <!--<div class="card mt-2" v-bind:class="{'shadow-sm': toggles.penHistory }">
            <div @click="toggle('penHistory')" class="card-header d-flex flex-row justify-content-between align-items-center">
                <h2 class="h6 mb-0">
                    Pen History
                </h2>
                <div>
                    <span>
                        <span v-if="toggles.penHistory" class="fas fa-fw fa-angle-up"></span>
                        <span v-else class="fas fa-fw fa-angle-down"></span>
                    </span>
                </div>
            </div>
            <b-collapse v-model="toggles.penHistory">
                <pen :id="id"></pen>
            </b-collapse>
        </div>-->

        <div class="card mt-2" v-bind:class="{'shadow-sm': toggles.source }">
            <div @click="toggle('source')" class="card-header d-flex flex-row justify-content-between align-items-center">
                <h2 class="h6 mb-0">
                    Buy From / Sold To
                </h2>
                <div>
                    <span>
                        <span v-if="toggles.source" class="fas fa-fw fa-angle-up"></span>
                        <span v-else class="fas fa-fw fa-angle-down"></span>
                    </span>
                </div>
            </div>
            <b-collapse v-model="toggles.source">
                <b-overlay :show="busy">
                    <div class="row row-cols-1 row-cols-sm-2">
                        NOT IMPLEMENTED
                        <!--<div class="col-sm">
                            <buyFrom :id="id" :token="item.token" :accountId="item.buyAccountId" @getInformation="getInformation()"></buyFrom>
                        </div>
                        <div class="col-sm">
                            <sellTo :id="id" :token="item.token" :accountId="item.sellAccountId" @getInformation="getInformation()"></sellTo>
                        </div>-->
                    </div>

                </b-overlay>
            </b-collapse>
        </div>

        <div class="card mt-2" v-bind:class="{'shadow-sm': toggles.familyTree }">
            <div @click="toggle('familyTree')" class="card-header d-flex flex-row justify-content-between align-items-center">
                <h2 class="h6 mb-0">
                    Family Tree
                </h2>
                <div>
                    <span>
                        <span v-if="toggles.familyTree" class="fas fa-fw fa-angle-up"></span>
                        <span v-else class="fas fa-fw fa-angle-down"></span>
                    </span>
                </div>
            </div>
            <b-collapse v-model="toggles.familyTree">
                <b-overlay :show="busy">                    
                    <p-family :id="id"></p-family>
                    <!--<div class="max-height-width bg-secondary" id="div1" v-observe-visibility="{callback: showFamilyTree, once: true,}">
                        <family-tree ref="family_tree1" :parentElementId="'div1'" @birdInfo="viewBirdInfo" style="background-color:dimgrey"></family-tree>
                    </div>-->
                </b-overlay>
            </b-collapse>
        </div>



        <modal-quick-view-bird ref="modalQuickViewBird" :urlView="urlView"></modal-quick-view-bird>
        <!--<modalAccountSearch ref="modalAccountSearch" @selected="selectedAccount"></modalAccountSearch>-->

        <!--<modalBuyBird ref="modalBuyBird" @bought="bought"></modalBuyBird>
        <modalSellBird ref="modalSellBird" @sold="sold"></modalSellBird>-->

    </div>
</template>
<script>
    import page from '../../../../_Core/Mixins/pageMixin'

    

    import modalQuickViewBird from '../../../../_Common/Modals/Birds/quick-view.vue';
    //import modalAccountSearch from '../../../../_Common/Modals/Accounts/search.vue';

    //import modalBuyBird from '../../../../_Common/Modals/Birds/buy.vue';
    //import modalSellBird from '../../../../_Common/Modals/Birds/sell.vue';

    import pInformation from './_information.vue';
    import pBreeding from './_breeding.vue';
    //import pen from './_pen.vue';
    import battle from './_battle.vue';
    //import buyFrom from './_buy.vue';
    //import sellTo from './_sell.vue';
    import pFamily from './_family.vue';

    export default {
        mixins: [
            page
        ],
        components: {
            
            //modalAddBattle,
            modalQuickViewBird,
            //modalAccountSearch,

            //modalBuyBird,
            //modalSellBird,

            pInformation,
            pBreeding,
            //pen,
            battle,
            //buyFrom,
            //sellTo
            pFamily
        },
        props: {
            uid: { type: String, required: true },
            id: { type: String, required: true },
            urlView: { type: String, required: true },
            urlViewBreeding: { type: String, required: true },
        },
        data() {

            return {
                togglesKey: `view-fowl/${this.uid}/toggles`,
                toggles: {
                    information: true,
                    activityLogs: false,
                    breedingHistory: false,
                    penHistory: false,

                    familyTree: false,


                    source: false
                },
                item: {
                    information: {},
                    breedingHistory: [],
                    battleHistory: [],
                    penHistory: [],
                    buyFrom: {},
                    sellTo: {}
                },
                birdInfos: [],
            };
        },
        computed: {

        },
        async created() {
            const vm = this;

            const toggles = JSON.parse(localStorage.getItem(vm.togglesKey)) || null;

            if (toggles)
                vm.toggles = toggles;


        },
        async mounted() {
            const vm = this;

            await vm.getInformation();
        },

        methods: {
            toggle(key) {
                const vm = this;

                vm.toggles[key] = !vm.toggles[key];

                localStorage.setItem(vm.togglesKey, JSON.stringify(vm.toggles));
            },
            setView(view) {
                const vm = this;
                vm.selectedView = view;
                localStorage.setItem(vm.selectedViewKey, view);
            },

            async getInformation(visible) {
                if (visible === false) {
                    return
                }

                const vm = this;

                if (visible === true && vm.item.birdId) {
                    return;
                }

                if (vm.busy)
                    return;

                try {
                    vm.busy = true;

                    await vm.$util.axios.get(`api/birds/${vm.id}`)
                        .then(resp => {
                            const data = resp.data;
                            const end = moment(data.dateEnd);

                            data.dead = moment().isAfter(end) > 0;


                            vm.item = data;
                        });

                } catch (e) {
                    vm.$util.handleError(e);
                } finally {
                    vm.busy = false;
                }
            },

            createViewLink(id) {
                const vm = this;
                //const rurl = btoa(window.location.href);
                const url = `${vm.urlView}${id}`;
                return url;
            },

            createViewBreedingLink(id) {
                const vm = this;
                //const rurl = btoa(window.location.href);
                const url = `${vm.urlViewBreeding}${id}`;
                return url;
            },

            async getActivityLogs(visible) {
                if (visible === false) {
                    return
                }

                const vm = this;

                if (vm.busy)
                    return;

                try {
                    vm.busy = true;
                    await vm.$util.axios.get(`/api/birds/${vm.id}/activity-logs`)
                        .then(resp => {
                            vm.item.activityLogs = resp.data;
                        });
                } catch (e) {
                    vm.$util.handleError(e);
                } finally {
                    vm.busy = false;
                }
            },


            searchAccount() {
                const vm = this;

                vm.$refs.modalAccountSearch.open();
            },

            selectedAccount(account) {
                const vm = this;

                vm.$refs.modalAccountSearch.close();

                vm.$refs.modalSellBird.open(vm.id, account, vm.item.information.token);
            },

            async sold() {
                const vm = this;

                vm.$bvToast.toast('Fowl updated.', { title: 'Edit Fowl', variant: 'success', toaster: 'b-toaster-bottom-right' });

                vm.$refs.modalSellBird.close();

                await vm.getInformation();
                await vm.getSellTo();
            },

            searchBuyAccount() {
                const vm = this;

                vm.$refs.modalAccountSearch.open(vm.selectedBuyAccount);
            },

            selectedBuyAccount(account) {
                const vm = this;

                vm.$refs.modalBuyBird.open(vm.id, account, vm.item.information.token);
            },

            async bought() {
                const vm = this;

                vm.$bvToast.toast('Fowl updated.', { title: 'Edit Fowl', variant: 'success', toaster: 'b-toaster-bottom-right' });

                vm.$refs.modalBuyBird.close();

                await vm.getInformation();
                await vm.getBuyFrom();
            },



        }
    }
</script>