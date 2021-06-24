<template>
    <b-modal ref="modal"
             :no-close-on-esc="false"
             :no-close-on-backdrop="false"
             header-class=""
             body-class=""
             footer-class=""
             scrollable
             v-cloak>
        <template v-slot:modal-header>
            <div class="d-sm-flex align-items-center justify-content-between">
                <h1 class="h5 m-0">
                    Buy
                </h1>
            </div>
        </template>
        <template v-slot:modal-footer>
            <b-overlay :show="busy">
                <button @click="save()" v-bind:disabled="!formIsValid" class="btn btn-primary">
                    Save
                </button>
                <button @click="close()" class="btn btn-secondary">
                    Close
                </button>
            </b-overlay>
        </template>
        <div>
            <div class="form-group row">
                <label class="col-4 text-right col-form-label">Account</label>
                <div class="col">
                    <span class="form-control-plaintext" v-bind:class="{'is-invalid':validations.get('account')}">
                        {{account.accountName}}
                    </span>
                    <span v-if="validations.has('account')" class="text-danger">
                        {{validations.get('account')}}
                    </span>
                </div>
            </div>
            <template v-if="account.organisationName">
                <div class="form-group row">
                    <label class="col-4 text-right col-form-label">Organisation Name</label>
                    <div class="col">
                        <span class="form-control-plaintext">
                            <span>{{account.organisationName}}</span>
                        </span>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="form-group row">
                    <label class="col-4 text-right col-form-label">Name</label>
                    <div class="col">
                        <span class="form-control-plaintext">
                            <span>{{account.firstName}} {{account.lastName}}</span>
                        </span>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-4 text-right col-form-label">Address</label>
                    <div class="col">
                        <span class="form-control-plaintext">
                            <span>{{account.address}}</span>
                        </span>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-4 text-right col-form-label">Contact</label>
                    <div class="col">
                        <span class="form-control-plaintext">
                            <span>{{account.contact}}</span>
                        </span>
                    </div>
                </div>
            </template>
            <div class="form-group row">
                <label class="col-4 text-right col-form-label">Price</label>
                <div class="col">
                    <input v-model="price" type="number" class="form-control" v-bind:class="{'is-invalid':validations.get('price')}" />
                    <span v-if="validations.has('price')" class="text-danger">
                        {{validations.get('price')}}
                    </span>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-4 text-right col-form-label">Date</label>
                <div class="col">
                    <input v-model="date" type="date" class="form-control" v-bind:class="{'is-invalid':validations.get('date')}" />
                    <span v-if="validations.has('date')" class="text-danger">
                        {{validations.get('date')}}
                    </span>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-4 text-right col-form-label">Notes</label>
                <div class="col">
                    <textarea v-model="notes" class="form-control"></textarea>
                </div>
            </div>

        </div>
    </b-modal>
</template>
<script>
    import page from '../../../_Core/Mixins/pageMixin';

    export default {
        mixins: [
            page
        ],
        components: {
        },
        props: {

        },
        data() {
            return {
                isDirty: false,
                validations: new Map(),

                birdId: '',
                token: '',
                account: {},
                price: null,
                date: moment().format('YYYY-MM-DD'),
                notes: null
            };
        },
        computed: {
            formIsValid() {
                const vm = this;

                if (!vm.isDirty)
                    return true;

                const validations = new Map();

                if (!vm.account.accountId) {
                    validations.set('account', 'Account is required');
                }

                if (!vm.price || Number.parseFloat(vm.price) < 0) {
                    validations.set('price', 'Price is required.');
                }
                if (!vm.date) {
                    validations.set('date', 'Date is required.');
                }

                vm.validations = validations;

                return vm.validations.size == 0;
            },
        },
        async created() {

        },
        async mounted() {

        },
        methods: {

            async open(birdId, account, token) {
                const vm = this;

                vm.birdId = birdId;
                vm.token = token;
                vm.account = account;
                vm.price = null;
                vm.date = moment().format('YYYY-MM-DD');
                vm.notes = null;

                vm.isDirty = false;
                vm.validations.clear();

                vm.$refs.modal.show();
            },

            close() {
                const vm = this;

                vm.$refs.modal.hide();
            },

            async save() {
                const vm = this;

                if (vm.busy)
                    return;

                vm.isDirty = true;

                if (!vm.formIsValid)
                    return;

                try {
                    vm.busy = true;

                    const payload = {
                        birdId: vm.birdId,
                        accountId: vm.account.accountId,
                        price: vm.price,
                        notes: vm.notes,
                        date: moment(vm.date),
                        token: vm.token
                    };
                    
                    await vm.$util.axios.post(`api/birds/buy`, payload)
                        .then(resp => {
                            vm.$emit('bought', resp.data);
                        });
                } catch (e) {
                    vm.$util.handleError(e);
                } finally {
                    vm.busy = false;
                }
            }
        }
    }
</script>