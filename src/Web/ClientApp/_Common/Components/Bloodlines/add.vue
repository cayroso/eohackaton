<template>
    <div v-cloak>
        <div class="row no-gutters align-items-center pb-2 border-bottom">
            <div class="col">
                <h1 class="h3 mb-0">
                    <i class="fas fa-fw fa-tag mr-1 d-none"></i>Add Bloodline
                </h1>
            </div>
            <div class="col-auto">
                <div class="btn-group" role="group">
                    <button v-bind:disabled="!formIsValid || busy" id="btnGroupSave" type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="fas fa-fw fa-save mr-1"></span>Save
                    </button>
                    <div class="dropdown-menu" aria-labelledby="btnGroupSave">
                        <a class="dropdown-item" href="#" @click.prevent="save(true)">Save and Add</a>
                        <a class="dropdown-item" href="#" @click.prevent="save(false)">Save and View</a>
                    </div>
                </div>

                <button @click="close" class="btn btn-secondary">
                    <span class="fas fa-fw fa-times-circle"></span>
                </button>
            </div>
        </div>

        <b-overlay :show="busy">
            <div class="mt-2">
                <div class="form-group row">
                    <label class="col-4 text-right col-form-label">Name*</label>
                    <div class="col">
                        <input v-model="item.name" type="text" v-bind:class="{'is-invalid':validations.get('name')}" class="form-control" />
                        <span v-if="validations.has('name')" class="text-danger">
                            {{validations.get('name')}}
                        </span>
                    </div>
                </div>


                <div class="form-group row">
                    <label class="col-4 text-right col-form-label">Description</label>
                    <div class="col">
                        <textarea v-model="item.description" class="form-control" />
                    </div>
                </div>
            </div>
        </b-overlay>

    </div>
</template>
<script>

    import page from '../../../_Core/Mixins/pageMixin'

    export default {
        mixins: [
            page
        ],
        components: {
        },
        props: {
            uid: { type: String, required: true },
            urlView: { type: String, required: true },
        },
        data() {
            return {
                isDirty: false,
                validations: new Map(),
                item: {
                    name: null,
                    description: null
                },
            };
        },
        computed: {
            formIsValid() {
                const vm = this;

                if (!vm.isDirty)
                    return true;

                const item = vm.item;
                const validations = new Map();

                if (!item.name)
                    validations.set('name', 'Name is required.');

                vm.validations = validations;

                return vm.validations.size == 0;
            },
        },
        async created() {

        },
        async mounted() {

        },
        methods: {
            async save(flag) {
                const vm = this;
                const item = vm.item;

                if (vm.busy)
                    return;

                vm.isDirty = true;

                if (!vm.formIsValid)
                    return;

                try {
                    vm.busy = true;

                    const payload = {
                        name: item.name,
                        description: item.description,
                    };

                    await vm.$util.axios.post(`api/bloodlines`, payload)
                        .then(resp => {
                            vm.$bvToast.toast('Bloodline created.', { title: 'Add Bloodline', variant: 'success', toaster: 'b-toaster-bottom-right' });

                            setTimeout(() => {
                                if (flag) {
                                    Object.assign(vm.$data, this.$options.data());
                                }
                                else {
                                    vm.$util.href(`${vm.urlView}${resp.data}`);
                                }
                            }, 500);
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