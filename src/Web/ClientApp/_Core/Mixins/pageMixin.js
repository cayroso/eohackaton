'use strict';

const mixin = {
    data() {
        return {
            busy: false,
            enums: {
                combTypes: [
                    { id: 1, name: 'Cushion' },
                    { id: 2, name: 'Pea' },
                    { id: 3, name: 'Single' },
                    { id: 6, name: 'Rose' },

                ],
                penTypes: [
                    { id: 1, name: 'Breeding' },
                    { id: 2, name: 'Brooding' },
                    { id: 3, name: 'Hardening' },
                ]
            }
        };
    },
    async created() {
        //debugger;
    },
    mounted() {
        this.showHiddenElements();

    },
    methods: {
        scrollIntoView() {
            const topElem = document.getElementById('top');
            if (topElem) {
                topElem.scrollIntoView({ behavior: 'smooth' });
                //debugger
            }
        },

        showHiddenElements() {
            let vm = this;

            if (!vm.$el.getElementsByClassName)
                return;

            let elems = vm.$el.getElementsByClassName('initialHidden');

            for (let i = 0; i < elems.length; i++) {
                let el = elems[i];

                el.classList.remove('invisible');
                el.classList.remove('d-none');
            }

        },
        close() {
            //const vm = this;

            //const href = atob(vm.rurl) || vm.durl;
            //vm.$util.href(href);

            const referrer = document.referrer.toLowerCase();
            //debugger
            //if (referrer && referrer.includes('/identity/account/login')) {
                //history.go(-2);                
            //}
            //else {
                history.back();
            //}
        },

        toggle(key) {
            const vm = this;

            vm.toggles[key] = !vm.toggles[key];

            localStorage.setItem(vm.togglesKey, JSON.stringify(vm.toggles));
        },
    }
};

export default mixin;