<template>
    <div v-cloak>
        <b-overlay :show="busy">
            <div class="p-2 text-right">
                <button @click="showFamilyTree()" class="btn btn-primary">
                    <span class="fas fa-fw fa-sync"></span>
                </button>
            </div>
            <div class="max-height-width bg-secondary" id="div1" v-observe-visibility="{callback: showFamilyTree, once: true,}">
                <family-tree ref="family_tree1" :parentElementId="'div1'" @birdInfo="viewBirdInfo" style="background-color:dimgrey"></family-tree>
            </div>
        </b-overlay>
    </div>
</template>
<script>
    import page from '../../../../_Core/Mixins/pageMixin'

    import familyTree from '../../../../_Common/Components/FamilyTrees/family-tree.vue';

    export default {
        mixins: [
            page
        ],
        components: {
            familyTree,
        },
        props: {
            id: { type: String, required: true }
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
            async showFamilyTree(visible) {

                if (visible === false) {
                    return
                }

                const vm = this;

                if (vm.busy)
                    return;

                const familyTree = await vm.getFamilyTree();
                //const familyTree = vm.item.familyTree;
                const persons = [];

                familyTree.items.forEach(e => {

                    persons[e.id] = {
                        id: e.id,
                        name: e.name,
                        sex: e.sex,
                        dead: e.dead,
                        own_unions: e.ownUnions,
                        parent_union: e.parentUnion
                    };
                });

                const unions = [];

                familyTree.unions.forEach(e => {
                    unions[e.id] = e;
                    //unions[e.id] = {
                    //    partner: e.partner,
                    //    children: e.children
                    //};
                });

                const links = familyTree.links.map(e => {
                    return [e.start, e.end];
                });

                const dag = {
                    persons,
                    unions,
                    links,
                    start: vm.id
                };

                vm.$refs.family_tree1.refresh('div1', dag);


            },

            async getFamilyTree() {
                const vm = this;

                if (vm.busy)
                    return;
                try {

                    vm.busy = true;

                    return await vm.$util.axios.get(`/api/birds/${vm.id}/family-tree`)
                        .then(resp => {
                            return resp.data;
                        });

                } catch (e) {
                    vm.$util.handleError(e);
                } finally {
                    vm.busy = false;
                }
            },


            async viewBirdInfo(birdId) {
                const vm = this;

                if (vm.busy)
                    return;

                let found = vm.birdInfos.find(e => e.birdId == birdId);

                if (!found) {
                    try {
                        vm.busy = true;

                        await vm.$util.axios.get(`/api/birds/${birdId}/qinfo`)
                            .then(resp => {
                                const birdInfo = resp.data;
                                const m = moment(birdInfo.dateEnd);
                                birdInfo.dead = moment().diff(m) > 0;

                                vm.birdInfos.push(birdInfo)
                                found = birdInfo;
                            });
                    } catch (e) {
                        vm.$util.handleError(e);
                    } finally {
                        vm.busy = false;
                    }
                }

                vm.$refs.modalQuickViewBird.open(found);
            },

        }
    }
</script>