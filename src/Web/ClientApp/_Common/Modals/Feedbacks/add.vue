<template>
    <b-modal ref="modal"
             :no-close-on-esc="true"
             :no-close-on-backdrop="true"
             header-class=""
             body-class=""
             footer-class=""
             scrollable
             size="lg">
        <template v-slot:modal-header>
            <div class="d-sm-flex align-items-center justify-content-between">
                <h1 class="h5 m-0">
                    Feedback
                </h1>
            </div>
        </template>
        <template v-slot:modal-footer>
            <button @click="save(false)" v-bind:disabled="!formIsValid || busy" class="btn btn-primary">
                <span class="fas fa-fw fa-save mr-1"></span>Send
            </button>
            <button @click="close()" class="btn btn-secondary">
                Close
            </button>

        </template>
        <div>
            <b-overlay :show="busy">
                <fieldset>

                    <div class="form-group">
                        <label class="col-form-label">Comment</label>
                        <textarea v-model="item.comment" class="form-control" rows="4" v-bind:class="{'is-invalid':validations.has('comment')}" />
                        <span v-if="validations.has('comment')" class="text-danger">
                            {{validations.get('comment')}}
                        </span>
                    </div>
                    <form ref="form" @submit.stop.prevent="checkImage">
                        <div class="form-group">
                            <div class="">
                                <b-form-file accept="image/*"
                                             v-model="imageFiles"
                                             @input="onImageFileChange"
                                             :state="imageFilesValid"
                                             placeholder="Choose a image or drop it here..."
                                             :capture="Boolean(0)"
                                             :multiple="Boolean(1)"
                                             drop-placeholder="Drop image here...">
                                    <template slot="file-name" slot-scope="{ files, names }">
                                        {{files.length}} file(s) selected
                                    </template>

                                </b-form-file>
                            </div>
                        </div>
                        <div v-if="imageFileUrls" class="form-group">

                            <div v-for="(imageFileUrl,index) in imageFileUrls">
                                <div class="text-center">
                                    <img :src="imageFileUrl" class="img-fluid img-thumbnail" style="width:300px;" />
                                </div>
                                <div class="d-flex flex-row justify-content-between align-items-center mb-1">
                                    <div class="d-inline-block text-truncate">
                                        <span v-if="imageFiles[index]">{{imageFiles[index].name}}</span>
                                        <span v-else>{{imageFiles.name}}</span>
                                    </div>
                                    <!--<div>
                                        <button @click="clearImageFile(index)" class="btn btn-sm btn-outline-danger align-middle">
                                            <span class="fas fa-fw fa-trash"></span>
                                        </button>
                                    </div>-->
                                </div>

                            </div>
                        </div>

                    </form>
                </fieldset>
            </b-overlay>
        </div>
    </b-modal>
</template>
<script>
    export default {
        mixins: [
        ],
        components: {
        },
        props: {

        },
        data() {
            return {
                busy: false,
                isDirty: false,
                validations: new Map(),
                item: {

                },

                imageFiles: null,
                imageFileUrls: null,
            };
        },
        computed: {
            imageFilesValid() {
                const vm = this;

                if (Array.isArray(vm.imageFiles))
                    return vm.imageFiles.length > 0;
                else
                    return vm.imageFiles != null;
            },

            formIsValid() {
                const vm = this;

                if (!vm.isDirty)
                    return true;

                const item = vm.item;
                const validations = new Map();

                if (!item.comment)
                    validations.set('comment', 'Comment is required.');

                vm.validations = validations;

                return vm.validations.size == 0;
            },
        },
        async created() {

        },
        async mounted() {

        },
        methods: {
            onImageFileChange(e) {
                const vm = this;

                var files = [];

                if (Array.isArray(e)) {
                    files = e;
                }
                else {
                    files = [e];
                }

                vm.imageFileUrls = [];

                for (var i = 0; i < files.length; i++) {
                    const file = files[i];

                    if (file) {
                        vm.imageFileUrls.push(URL.createObjectURL(file));
                    }
                }
            },
            clearImageFile(index) {
                const vm = this;

                if (Array.isArray(vm.imageFiles)) {
                    vm.imageFiles.splice(index, 1);
                    vm.imageFileUrls.splice(index, 1);
                }
                else {
                    vm.imageFiles = null;
                    vm.imageFileUrls = null;
                }
            },

            checkImage() {
                return this.imageFiles.length > 0;
            },

            async open() {
                const vm = this;

                vm.item = {
                    comment: null,
                };
                vm.imageFiles = [];
                vm.imageFileUrls = [];

                vm.isDirty = false;
                vm.validations.clear();

                vm.$refs.modal.show();
            },

            close() {
                const vm = this;

                vm.$refs.modal.hide();
            },



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

                    const obj = {
                        comment: item.comment,
                    };

                    const json = JSON.stringify(obj);
                    const blob = new Blob([json], {
                        type: 'application/json'
                    });

                    const formData = new FormData();

                    formData.append('feedback', blob);

                    if (Array.isArray(vm.imageFiles)) {
                        const max = 5;
                        let i = 0;
                        vm.imageFiles.forEach(file => {
                            if (i++ < max) {
                                formData.append('images', file);
                            }
                        });
                    }
                    else {
                        formData.append('images', vm.imageFiles);
                    }

                    await vm.$util.axios.post(`api/feedbacks`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(resp => {

                        vm.$emit('saved', resp.data);
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