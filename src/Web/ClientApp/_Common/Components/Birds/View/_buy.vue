<template>
    <div v-cloak>
        <div class="p-2" v-observe-visibility="{callback: get, once: true}">
            <div class="d-flex flex-row justify-content-between align-items-center">
                <h2 class="h6 mb-0">
                    Buy Information
                </h2>
                <div>
                    <button @click="searchBuyAccount()" class="btn btn-primary">
                        <span class="fas fa-fw fa-shopping-cart"></span>
                    </button>
                    <button @click="get()" class="btn btn-primary">
                        <span class="fas fa-fw fa-sync"></span>
                    </button>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-4 text-right col-form-label">Name</label>
                <div class="col">
                    <span class="form-control-plaintext">{{item.name}}</span>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-4 text-right col-form-label">Contact</label>
                <div class="col">
                    <span class="form-control-plaintext">{{item.contact}}</span>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-4 text-right col-form-label">Address</label>
                <div class="col">
                    <span class="form-control-plaintext">{{item.address}}</span>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-4 text-right col-form-label">Price</label>
                <div class="col">
                    <span class="form-control-plaintext">{{item.price|toCurrency}}</span>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-4 text-right col-form-label">Date</label>
                <div class="col">
                    <span class="form-control-plaintext">{{item.date|moment('calendar')}}</span>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-4 text-right col-form-label">Notes</label>
                <div class="col">
                    <span class="form-control-plaintext">{{item.notes}}</span>
                </div>
            </div>
        </div>
        <modalAccountSearch ref="modalAccountSearch" @selected="selectedAccount"></modalAccountSearch>
        <modalBuyBird ref="modalBuyBird" @bought="bought"></modalBuyBird>
    </div>
</template>
<script>
    import page from '../../../../_Core/Mixins/pageMixin'
    import modalAccountSearch from '../../../../_Core/Modals/Accounts/search.vue';
    import modalBuyBird from '../../../../_Core/Modals/Birds/buy.vue';

    export default {
        mixins: [
            page
        ],
        components: {
            modalAccountSearch,
            modalBuyBird
        },
        props: {
            id: String,
            token: String,
            accountId: String,
        },
        data() {
            return {
                item: {}
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

                if (!vm.accountId)
                    return;

                if (vm.busy)
                    return;

                try {
                    vm.busy = true;
                    await vm.$util.axios.get(`api/birds/${vm.id}/buyfrom`)
                        .then(resp => {
                            vm.item = resp.data;
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

            searchBuyAccount() {
                const vm = this;

                vm.$refs.modalAccountSearch.open(vm.selectedBuyAccount);
            },

            selectedAccount(account) {
                const vm = this;

                vm.$refs.modalAccountSearch.close();

                vm.$refs.modalBuyBird.open(vm.id, account, vm.token);
            },

            async bought() {
                const vm = this;

                vm.$bvToast.toast('Fowl updated.', { title: 'Edit Fowl', variant: 'success', toaster: 'b-toaster-bottom-right' });

                vm.$refs.modalBuyBird.close();
                await vm.get();
                vm.$emit('getInformation');
                
            },

        }
    }
</script>