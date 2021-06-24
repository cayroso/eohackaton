﻿'use strict';

import Vue from 'vue';
import NProgress from 'nprogress';
import axios from 'axios';


export default {
    install(Vue, options) {

        const instance = axios.create();

        instance.interceptors.request.use(config => {
            NProgress.start();
            return config;
        });
        instance.interceptors.response.use(response => {
            NProgress.done();
            return response;
        }, error => {
            NProgress.done();
            throw error;
        });

        //Vue.prototype.$axios = instance;

        const handle400 = function (vm, error) {
            const response = error.response;
            const data = response.data;

            const h = vm.$createElement;
            let hMsg = [];

            if (data.errors) {
                const errors = data.errors;

                const ol = [];

                for (let key in errors) {
                    ol.push(h('li', `${errors[key]}`));

                    //message += `${key}`;
                    //for (let vals in errors[key]) {
                    //    var foo = errors[key][vals];
                    //    debugger
                    //    //message += `${foo}`;
                    //    ol.push(h('li', `Field ${key}. ${foo}`));
                    //}
                    //message += `<br/>`;
                }
                hMsg.push(
                    h('ul', ol)
                );

                const vNodesTitle = h(
                    'div',
                    { class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2', 'p-1'] },
                    [
                        h('span', { class: 'fas fa-exclamation-triangle pr-1' }, ''),
                        h('strong', { class: 'mr-2' }, data.title)
                    ]
                );
                const vNodesContent = h(
                    'div', {}, [
                    hMsg
                    //h('div', message),
                    //h('hr'),
                    //h('div', 'Please contact the administrator.'),
                ]
                );

                vm.$root.$bvToast.toast([vNodesContent], {
                    title: [vNodesTitle],
                    variant: 'danger',
                    solid: true,
                    noAutoHide: true
                });
            }
            else {
                vm.$root.$bvToast.toast(data, { title: 'Unhandled Error', variant: 'danger', noAutoHide: true });
            }

        };

        const handle401 = function (vm) {

            const url = `${window.location.pathname}${window.location.search}`;
            const returnUrl = encodeURIComponent(url);
            const redirect = `/identity/account/login/?returnUrl=${returnUrl}`;

            // Use a shorter name for this.$createElement
            const h = vm.$createElement;
            // Create the message
            const vNodesMsg = h(
                'div',
                [
                    h('span', 'You are not authorized to access this page.'),
                    h('br'),
                    h('span', 'Or your session has expired.'),
                    h('p'),
                    h('a', { attrs: { href: redirect, } }, 'Click here to Login.')
                ]
            );

            vm.$bvToast.toast([vNodesMsg], {
                title: 'Login Required',// [vNodesTitle],
                solid: true,
                variant: 'danger',
                noAutoHide: true,
            });
        };

        Vue.prototype.$util = new Vue({
            data: {
                axios: instance
            },
            methods: {
                isMe(me, other, meAlias, youAlias) {
                    if (me === other)
                        return meAlias;
                    else
                        return youAlias;
                },

                noop() {
                    return arguments;
                },
                noop2() {
                },
                camelPad(str) {
                    return str
                        // Look for long acronyms and filter out the last letter
                        .replace(/([A-Z]+)([A-Z][a-z])/g, ' $1 $2')
                        // Look for lower-case letters followed by upper-case letters
                        .replace(/([a-z\d])([A-Z])/g, '$1 $2')
                        // Look for lower-case letters followed by numbers
                        .replace(/([a-zA-Z])(\d)/g, '$1 $2')
                        .replace(/^./, function (str) { return str.toUpperCase(); })
                        // Remove any white space left around the word
                        .trim();
                },
                getImagePlageholder(text, size) {
                    if (!size)
                        size = "64";

                    return `https://via.placeholder.com/${size}/000000/FFFFFF/?text=${text}`
                },
                getProfilePictureUrl(profilePicture32, initials) {
                    let urlPicture = profilePicture32 ? `api/files/${profilePicture32}/stream` : this.getImagePlageholder(initials);

                    return urlPicture;
                },
                pushState(data, title, url) {
                    window.history.pushState(data, title, url);
                },
                replaceState(data, title, url) {
                    window.history.replaceState(data, title, url);
                },
                href(url) {
                    window.location.href = url;
                },
                clone(instance) {
                    return JSON.parse(JSON.stringify(instance));
                },

                handleError(error) {

                    const response = error.response;
                    let message = error.toString();

                    if (response) {
                        switch (response.status) {
                            case 400:
                                handle400(this, error);
                                return;
                            case 401:
                                handle401(this);
                                return;
                            case 403:
                                message = `You are not authenticated`;
                                break;
                            case 404:
                                message = `Record or service [${response.config.url}] not found.`;
                                break;
                            case 500:
                                message = response.data.content || response.statusText || `Internal Server Error`;
                                break;
                            default:
                                message = `Status Code: ${response.status}`;
                                break;
                        }
                    }

                    this.$bvToast.toast(message, { title: 'Unhandled Error', variant: 'danger', noAutoHide: true });
                },
                getErrorMessageInHtml(error) {

                    let err = error;
                    let resp = err.response;
                    let errorMessage = '';

                    if (!err.response)
                        return error.message;


                    if (resp.status === 500) {
                        return resp.data.content;
                    }
                    debugger
                    if (resp.status === 401) {
                        const url = `${window.location.pathname}${window.location.search}`;
                        const returnUrl = encodeURIComponent(url);
                        const redirect = `/identity/account/login/?returnUrl=${returnUrl}`;
                        errorMessage = `You are not authorized or your session timed out. Please click <a href='${redirect}' class='btn btn-link'>here</a> to login.`;
                        debugger;
                        return errorMessage;
                    }

                    if (resp.status === 400) {
                        let errors = err.response.data.errors;

                        errorMessage = err.response.data.title;
                        errorMessage += '<ul>';

                        for (let k in errors) {
                            let key = errors[k];

                            for (let n in errors[k]) {
                                let val = key[n];
                                errorMessage += `<li>${val}</li>`;
                            }

                        }
                        errorMessage += '</ul>';

                        return errorMessage;
                    }

                    if (typeof resp.data === 'string') {
                        errorMessage = err.response.data;
                        return errorMessage;
                    }

                },

                setWithExpiry(key, value, ttl) {
                    const now = new Date()

                    // `item` is an object which contains the original value
                    // as well as the time when it's supposed to expire
                    const item = {
                        value: value,
                        expiry: now.getTime() + ttl
                    }
                    localStorage.setItem(key, JSON.stringify(item))
                },

                getWithExpiry(key) {
                    const itemStr = localStorage.getItem(key)

                    // if the item doesn't exist, return null
                    if (!itemStr) {
                        return null
                    }

                    const item = JSON.parse(itemStr)
                    const now = new Date()

                    // compare the expiry time of the item with the current time
                    if (now.getTime() > item.expiry) {
                        // If the item is expired, delete the item from storage
                        // and return null
                        localStorage.removeItem(key)
                        return null
                    }
                    return item.value
                }
            }
        });

        Vue.prototype.$bus = new Vue({
            data: {
            },
            methods: {
                toggleSidebar() {
                    this.$emit('event:toggle-sidebar');
                },
                openNotification(id) {
                    this.$emit('event:open-notification', id);
                },
                openChat(id) {
                    this.$emit('event:open-chat', id);
                },
                sendMessage(accountId) {
                    this.$emit('event:send-message', accountId);
                },
                quickViewAccount(account) {
                    this.$emit('event:quick-view-account', account);
                },
                quickViewQbTransaction(id) {
                    this.$emit('event:quick-view-qb-transaction', id);
                },
                addFeedback(jobId, feedback) {
                    this.$emit('event:add-feedback', jobId, feedback);
                },
                closeFeedback(jobId) {
                    this.$emit('event:close-feedback', jobId);
                }
                //requestJobStart(req) {
                //    this.$emit('event:request-job-start', req);
                //},
                //responseJobStart(resp) {
                //    this.$emit('event:response-job-start', resp);
                //}
            }
        });
    }
}