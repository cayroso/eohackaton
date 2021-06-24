/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 6236:
/*!********************************!*\
  !*** ./ClientApp/Main/main.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Core_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_Core/core */ 915);\n/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.css */ 3541);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ 5913);\n/* harmony import */ var _Pages_Shared_app_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Pages/_Shared/app.vue */ 2642);\n/* harmony import */ var vue_observe_visibility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-observe-visibility */ 2008);\n/* harmony import */ var _Core_Plugins_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_Core/Plugins/common */ 561);\n/* provided dependency */ var $ = __webpack_require__(/*! jquery */ 1514);\n\n\n\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_4__.default.use(vue_observe_visibility__WEBPACK_IMPORTED_MODULE_3__.default);\n\nvue__WEBPACK_IMPORTED_MODULE_4__.default.use(_Core_Plugins_common__WEBPACK_IMPORTED_MODULE_5__.default);\nnew vue__WEBPACK_IMPORTED_MODULE_4__.default({\n  el: '#main',\n  //router: Router,\n  components: {\n    App: _Pages_Shared_app_vue__WEBPACK_IMPORTED_MODULE_2__.default\n  },\n\n  created() {\n    $(document).ready(function () {\n      $('.main').addClass('main-loaded');\n    });\n  }\n\n});\n\n//# sourceURL=webpack://client/./ClientApp/Main/main.js?");

/***/ }),

/***/ 8933:
/*!********************************************!*\
  !*** ./ClientApp/_Core/Mixins/appMixin.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n //import * as signalR from '@microsoft/signalr';\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  components: {},\n\n  data() {\n    return {\n      enums: {\n        orderStatus: {\n          requested: 1,\n          placed: 2,\n          accepted: 3,\n          processed: 4,\n          delivered: 5,\n          completed: 6,\n          cancelled: 7\n        }\n      },\n      bottomNavHeightStyle: null,\n      messageIds: []\n    };\n  },\n\n  async created() {\n    const vm = this; //vm.$bus.$on('event:open-notification', vm.onOpenNotification);\n    //vm.$bus.$on('event:close-notification', vm.onCloseNotification);\n    //vm.$bus.$on('event:open-chat', vm.onOpenChat);\n    //vm.$bus.$on('event:close-chat', vm.onCloseChat);\n    //vm.$bus.$on('event:send-message', vm.onSendMessage);\n    //vm.$bus.$on('event:quick-view-account', vm.onQuickViewAccount);\n    //vm.$bus.$on('event:quick-view-qb-transaction', vm.onQuickViewQbTransaction);\n    //await Promise.all([vm.connectOrderHub()]);\n  },\n\n  async mounted() {\n    const vm = this;\n    vm.getBottomNavHeight();\n\n    if (vm.uid) {//await vm.connectNotificationHub();\n      //await vm.connectChatHub();\n      //await vm.connectAppointmentHub();\n      //vm.$bus.$on('event:open-chat', vm.onOpenChat);\n      //vm.$bus.$on('event:close-chat', vm.onCloseChat);\n      //vm.$bus.$on('event:send-message', vm.onSendMessage);\n      //vm.$bus.$on('event:send-team-message', vm.onSendTeamMessage);\n    }\n  },\n\n  methods: {\n    getBottomNavHeight() {\n      const vm = this;\n      const bottomNav = vm.$refs.bottomNav;\n\n      if (bottomNav) {\n        let bottomNavHeight = bottomNav.$el.clientHeight;\n\n        if (bottomNavHeight > 0) {\n          vm.bottomNavHeightStyle = `padding-bottom:${bottomNavHeight + 10}px;`;\n        }\n      }\n    },\n\n    scrollIntoView() {\n      const topElem = document.getElementById('top');\n\n      if (topElem) {\n        topElem.scrollIntoView({\n          behavior: 'smooth'\n        }); //debugger\n      }\n    },\n\n    showHiddenElements() {\n      let vm = this;\n      if (!vm.$el.getElementsByClassName) return;\n      let elems = vm.$el.getElementsByClassName('initialHidden');\n\n      for (let i = 0; i < elems.length; i++) {\n        let el = elems[i];\n        el.classList.remove('invisible');\n        el.classList.remove('d-none');\n      }\n    },\n\n    close() {\n      //const vm = this;\n      //const href = atob(vm.rurl) || vm.durl;\n      //vm.$util.href(href);\n      const referrer = document.referrer;\n\n      if (referrer && referrer.includes('/Identity/Account/Login')) {\n        history.go(-2);\n      } else {\n        history.back();\n      }\n    },\n\n    async connectNotificationHub() {\n      const vm = this;\n      const notificationHub = new signalR.HubConnectionBuilder().withUrl('/notificationHub') //.configureLogging(signalR.LogLevel.Debug)\n      .withAutomaticReconnect().build();\n      notificationHub.on('received', function (resp) {\n        const message = resp.content || \"-no reason specified-\";\n        const h = vm.$createElement; // Create the message\n\n        let foo = [h('span', message), h('p')];\n\n        if (resp.refLink) {\n          //debugger\n          foo.push(h('a', {\n            attrs: {\n              href: resp.refLink\n            }\n          }, 'Click here to View.'));\n        } //debugger\n\n\n        const vNodesMsg = h('div', foo);\n        var route = window.location;\n        var contains = route.pathname.includes(resp.itemId);\n\n        if (!contains || contains && resp.itemEvent !== 'Post:Comment') {\n          vm.$bvToast.toast([vNodesMsg], {\n            title: `${resp.subject}`,\n            variant: 'info',\n            solid: true\n          });\n        } //  emit event\n\n\n        vm.$bus.$emit('event:notification-received', resp);\n      });\n      notificationHub.on('jobUpdated', function (resp) {\n        vm.$bus.$emit('event:job-updated', resp);\n      });\n      await notificationHub.start().then(function () {//debugger;\n      }).catch(function (err) {//debugger;\n        //vm.$util.handleError(err);\n      });\n    }\n\n  }\n});\n\n//# sourceURL=webpack://client/./ClientApp/_Core/Mixins/appMixin.js?");

/***/ }),

/***/ 136:
/*!***********************************************!*\
  !*** ./ClientApp/_Core/Mixins/navbarMixin.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  data() {\n    return {\n      notifications: [],\n      messages: []\n    };\n  },\n\n  async created() {\n    const vm = this; //  event handlers\n\n    vm.$bus.$on('event:notification-received', () => {\n      vm.getUnreadNotifications();\n    });\n    vm.$bus.$on('event:notification-marked-as-read', notificationId => {\n      let found = vm.notifications.some(p => p.notificationId === notificationId);\n\n      if (found) {\n        vm.getUnreadNotifications();\n      }\n    });\n    vm.$bus.$on('event:notification-removed', notificationId => {\n      let found = vm.notifications.some(p => p.notificationId === notificationId);\n\n      if (found) {\n        vm.getUnreadNotifications();\n      }\n    });\n    vm.$bus.$on('event:chat-marked-as-read', vm.onChatMarkedAsRead);\n    vm.$bus.$on('event:chat-message-received', vm.onChatMessageReceived);\n  },\n\n  async mounted() {\n    const vm = this; //await vm.getUnreadNotifications();\n    //await vm.getUnreadChats();\n\n    vm.showHiddenElements();\n  },\n\n  methods: {\n    async onChatMarkedAsRead(chatId) {\n      let vm = this;\n      let found = vm.messages.find(p => p.chatId === chatId);\n\n      if (found) {\n        let index = vm.messages.indexOf(found);\n        vm.messages.splice(index, 1);\n      }\n    },\n\n    async onChatMessageReceived(chat) {\n      let vm = this;\n      let found = vm.messages.find(p => p.chatId === chat.chatId);\n\n      if (!found) {\n        var item = {\n          chatId: chat.chatId,\n          isRead: false,\n          lastDateSent: chat.dateSent,\n          lastMessageText: chat.content,\n          senderFirstLastName: `${chat.sender.firstName} ${chat.sender.lastName}`,\n          senderInitials: chat.sender.initials,\n          senderProfilePicture32: chat.sender.profilePicture32,\n          urlPicture: vm.$util.getProfilePictureUrl(chat.sender.profilePicture32, chat.sender.initials)\n        };\n        vm.messages.push(item);\n      } else {\n        found.lastMessageText = chat.content;\n      }\n    },\n\n    async getUnreadNotifications() {\n      const vm = this;\n\n      try {\n        await vm.$util.axios.get(`/api/notifications/unread/?criteria=&pageIndex=1&pageSize=20`).then(resp => {\n          vm.notifications = resp.data.items;\n        });\n      } catch (e) {\n        vm.$util.handleError(e);\n      }\n    },\n\n    async getUnreadChats() {\n      const vm = this;\n\n      try {\n        await vm.$util.axios.get(`api/accounts/unread-chats`).then(resp => {\n          vm.messages = resp.data;\n\n          for (let i in vm.messages) {\n            let item = vm.messages[i];\n            vm.$set(item, 'urlPicture', vm.$util.getProfilePictureUrl(item.senderProfilePicture32, item.senderInitials));\n          }\n        });\n      } catch (e) {\n        vm.$util.handleError(e);\n      }\n    },\n\n    viewNotification(id) {\n      this.$bus.$emit('event:open-notification', id);\n    },\n\n    viewChat(id) {\n      this.$bus.$emit('event:open-chat', id);\n    },\n\n    showHiddenElements() {\n      let vm = this;\n      let elems = vm.$el.getElementsByClassName('initialHidden');\n\n      for (let i = 0; i < elems.length; i++) {\n        let el = elems[i];\n        el.classList.remove('invisible');\n      }\n    }\n\n  }\n});\n\n//# sourceURL=webpack://client/./ClientApp/_Core/Mixins/navbarMixin.js?");

/***/ }),

/***/ 2593:
/*!**************************************************!*\
  !*** ./ClientApp/_Core/Plugins/bootstrap-vue.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ 5913);\n/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap */ 2471);\n/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bootstrap__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap-vue */ 9196);\n/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap-vue */ 5982);\n/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bootstrap-vue */ 3813);\n/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bootstrap-vue */ 2829);\n/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! bootstrap-vue */ 846);\n/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! bootstrap-vue */ 4277);\n/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! bootstrap-vue */ 8351);\n/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! bootstrap-vue */ 9375);\n/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! bootstrap-vue */ 4924);\n/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! bootstrap-vue */ 2654);\n/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! bootstrap-vue */ 8170);\n/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! bootstrap-vue */ 177);\n/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! bootstrap-vue */ 4476);\n/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! bootstrap-vue */ 907);\n/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! bootstrap-vue */ 2541);\n/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! bootstrap-vue */ 2090);\n/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! bootstrap-vue */ 1930);\n/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! bootstrap-vue */ 4207);\n/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! bootstrap-vue */ 2480);\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_1__.default.use(bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__.BVToastPlugin);\nvue__WEBPACK_IMPORTED_MODULE_1__.default.use(bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__.ModalPlugin);\nvue__WEBPACK_IMPORTED_MODULE_1__.default.use(bootstrap_vue__WEBPACK_IMPORTED_MODULE_4__.SidebarPlugin);\nvue__WEBPACK_IMPORTED_MODULE_1__.default.use(bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__.OverlayPlugin);\nvue__WEBPACK_IMPORTED_MODULE_1__.default.use(bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__.PopoverPlugin);\nvue__WEBPACK_IMPORTED_MODULE_1__.default.use(bootstrap_vue__WEBPACK_IMPORTED_MODULE_7__.FormSelectPlugin);\nvue__WEBPACK_IMPORTED_MODULE_1__.default.use(bootstrap_vue__WEBPACK_IMPORTED_MODULE_8__.CollapsePlugin);\nvue__WEBPACK_IMPORTED_MODULE_1__.default.use(bootstrap_vue__WEBPACK_IMPORTED_MODULE_9__.FormCheckboxPlugin);\nvue__WEBPACK_IMPORTED_MODULE_1__.default.use(bootstrap_vue__WEBPACK_IMPORTED_MODULE_10__.PaginationPlugin);\nvue__WEBPACK_IMPORTED_MODULE_1__.default.use(bootstrap_vue__WEBPACK_IMPORTED_MODULE_11__.FormFilePlugin);\nvue__WEBPACK_IMPORTED_MODULE_1__.default.use(bootstrap_vue__WEBPACK_IMPORTED_MODULE_12__.CarouselPlugin);\nvue__WEBPACK_IMPORTED_MODULE_1__.default.use(bootstrap_vue__WEBPACK_IMPORTED_MODULE_13__.NavbarPlugin);\nvue__WEBPACK_IMPORTED_MODULE_1__.default.use(bootstrap_vue__WEBPACK_IMPORTED_MODULE_14__.TabsPlugin);\nvue__WEBPACK_IMPORTED_MODULE_1__.default.use(bootstrap_vue__WEBPACK_IMPORTED_MODULE_15__.ImagePlugin);\nvue__WEBPACK_IMPORTED_MODULE_1__.default.use(bootstrap_vue__WEBPACK_IMPORTED_MODULE_16__.FormSpinbuttonPlugin);\nvue__WEBPACK_IMPORTED_MODULE_1__.default.use(bootstrap_vue__WEBPACK_IMPORTED_MODULE_17__.AvatarPlugin);\nvue__WEBPACK_IMPORTED_MODULE_1__.default.use(bootstrap_vue__WEBPACK_IMPORTED_MODULE_18__.SkeletonPlugin);\nvue__WEBPACK_IMPORTED_MODULE_1__.default.use(bootstrap_vue__WEBPACK_IMPORTED_MODULE_19__.FormRadioPlugin);\nvue__WEBPACK_IMPORTED_MODULE_1__.default.use(bootstrap_vue__WEBPACK_IMPORTED_MODULE_20__.ProgressPlugin); //Vue.use(NavbarPlugin);\n//Vue.use(ButtonPlugin);\n//Vue.use(AlertPlugin);\n//Vue.use(TooltipPlugin);\n//Vue.use(FormInputPlugin);\n//Vue.use(ImagePlugin);\n//Vue.use(AvatarPlugin);\n//Vue.use(ListGroupPlugin);\n//import { BootstrapVue } from 'bootstrap-vue';\n//Vue.use(BootstrapVue)\n\n//# sourceURL=webpack://client/./ClientApp/_Core/Plugins/bootstrap-vue.js?");

/***/ }),

/***/ 561:
/*!*******************************************!*\
  !*** ./ClientApp/_Core/Plugins/common.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nprogress */ 7854);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ 4559);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  install(Vue, options) {\n    const instance = axios__WEBPACK_IMPORTED_MODULE_1___default().create();\n    instance.interceptors.request.use(config => {\n      nprogress__WEBPACK_IMPORTED_MODULE_0__.default.start();\n      return config;\n    });\n    instance.interceptors.response.use(response => {\n      nprogress__WEBPACK_IMPORTED_MODULE_0__.default.done();\n      return response;\n    }, error => {\n      nprogress__WEBPACK_IMPORTED_MODULE_0__.default.done();\n      throw error;\n    }); //Vue.prototype.$axios = instance;\n\n    const handle400 = function (vm, error) {\n      const response = error.response;\n      const data = response.data;\n      const h = vm.$createElement;\n      let hMsg = [];\n\n      if (data.errors) {\n        const errors = data.errors;\n        const ol = [];\n\n        for (let key in errors) {\n          ol.push(h('li', `${errors[key]}`)); //message += `${key}`;\n          //for (let vals in errors[key]) {\n          //    var foo = errors[key][vals];\n          //    debugger\n          //    //message += `${foo}`;\n          //    ol.push(h('li', `Field ${key}. ${foo}`));\n          //}\n          //message += `<br/>`;\n        }\n\n        hMsg.push(h('ul', ol));\n        const vNodesTitle = h('div', {\n          class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2', 'p-1']\n        }, [h('span', {\n          class: 'fas fa-exclamation-triangle pr-1'\n        }, ''), h('strong', {\n          class: 'mr-2'\n        }, data.title)]);\n        const vNodesContent = h('div', {}, [hMsg //h('div', message),\n        //h('hr'),\n        //h('div', 'Please contact the administrator.'),\n        ]);\n        vm.$root.$bvToast.toast([vNodesContent], {\n          title: [vNodesTitle],\n          variant: 'danger',\n          solid: true,\n          noAutoHide: true\n        });\n      } else {\n        vm.$root.$bvToast.toast(data, {\n          title: 'Unhandled Error',\n          variant: 'danger',\n          noAutoHide: true\n        });\n      }\n    };\n\n    const handle401 = function (vm) {\n      const url = `${window.location.pathname}${window.location.search}`;\n      const returnUrl = encodeURIComponent(url);\n      const redirect = `/identity/account/login/?returnUrl=${returnUrl}`; // Use a shorter name for this.$createElement\n\n      const h = vm.$createElement; // Create the message\n\n      const vNodesMsg = h('div', [h('span', 'You are not authorized to access this page.'), h('br'), h('span', 'Or your session has expired.'), h('p'), h('a', {\n        attrs: {\n          href: redirect\n        }\n      }, 'Click here to Login.')]);\n      vm.$bvToast.toast([vNodesMsg], {\n        title: 'Login Required',\n        // [vNodesTitle],\n        solid: true,\n        variant: 'danger',\n        noAutoHide: true\n      });\n    };\n\n    Vue.prototype.$util = new Vue({\n      data: {\n        axios: instance\n      },\n      methods: {\n        isMe(me, other, meAlias, youAlias) {\n          if (me === other) return meAlias;else return youAlias;\n        },\n\n        noop() {\n          return arguments;\n        },\n\n        noop2() {},\n\n        camelPad(str) {\n          return str // Look for long acronyms and filter out the last letter\n          .replace(/([A-Z]+)([A-Z][a-z])/g, ' $1 $2') // Look for lower-case letters followed by upper-case letters\n          .replace(/([a-z\\d])([A-Z])/g, '$1 $2') // Look for lower-case letters followed by numbers\n          .replace(/([a-zA-Z])(\\d)/g, '$1 $2').replace(/^./, function (str) {\n            return str.toUpperCase();\n          }) // Remove any white space left around the word\n          .trim();\n        },\n\n        getImagePlageholder(text, size) {\n          if (!size) size = \"64\";\n          return `https://via.placeholder.com/${size}/000000/FFFFFF/?text=${text}`;\n        },\n\n        getProfilePictureUrl(profilePicture32, initials) {\n          let urlPicture = profilePicture32 ? `api/files/${profilePicture32}/stream` : this.getImagePlageholder(initials);\n          return urlPicture;\n        },\n\n        pushState(data, title, url) {\n          window.history.pushState(data, title, url);\n        },\n\n        replaceState(data, title, url) {\n          window.history.replaceState(data, title, url);\n        },\n\n        href(url) {\n          window.location.href = url;\n        },\n\n        clone(instance) {\n          return JSON.parse(JSON.stringify(instance));\n        },\n\n        handleError(error) {\n          const response = error.response;\n          let message = error.toString();\n\n          if (response) {\n            switch (response.status) {\n              case 400:\n                handle400(this, error);\n                return;\n\n              case 401:\n                handle401(this);\n                return;\n\n              case 403:\n                message = `You are not authenticated`;\n                break;\n\n              case 404:\n                message = `Record or service [${response.config.url}] not found.`;\n                break;\n\n              case 500:\n                message = response.data.content || response.statusText || `Internal Server Error`;\n                break;\n\n              default:\n                message = `Status Code: ${response.status}`;\n                break;\n            }\n          }\n\n          this.$bvToast.toast(message, {\n            title: 'Unhandled Error',\n            variant: 'danger',\n            noAutoHide: true\n          });\n        },\n\n        getErrorMessageInHtml(error) {\n          let err = error;\n          let resp = err.response;\n          let errorMessage = '';\n          if (!err.response) return error.message;\n\n          if (resp.status === 500) {\n            return resp.data.content;\n          }\n\n          debugger;\n\n          if (resp.status === 401) {\n            const url = `${window.location.pathname}${window.location.search}`;\n            const returnUrl = encodeURIComponent(url);\n            const redirect = `/identity/account/login/?returnUrl=${returnUrl}`;\n            errorMessage = `You are not authorized or your session timed out. Please click <a href='${redirect}' class='btn btn-link'>here</a> to login.`;\n            debugger;\n            return errorMessage;\n          }\n\n          if (resp.status === 400) {\n            let errors = err.response.data.errors;\n            errorMessage = err.response.data.title;\n            errorMessage += '<ul>';\n\n            for (let k in errors) {\n              let key = errors[k];\n\n              for (let n in errors[k]) {\n                let val = key[n];\n                errorMessage += `<li>${val}</li>`;\n              }\n            }\n\n            errorMessage += '</ul>';\n            return errorMessage;\n          }\n\n          if (typeof resp.data === 'string') {\n            errorMessage = err.response.data;\n            return errorMessage;\n          }\n        },\n\n        setWithExpiry(key, value, ttl) {\n          const now = new Date(); // `item` is an object which contains the original value\n          // as well as the time when it's supposed to expire\n\n          const item = {\n            value: value,\n            expiry: now.getTime() + ttl\n          };\n          localStorage.setItem(key, JSON.stringify(item));\n        },\n\n        getWithExpiry(key) {\n          const itemStr = localStorage.getItem(key); // if the item doesn't exist, return null\n\n          if (!itemStr) {\n            return null;\n          }\n\n          const item = JSON.parse(itemStr);\n          const now = new Date(); // compare the expiry time of the item with the current time\n\n          if (now.getTime() > item.expiry) {\n            // If the item is expired, delete the item from storage\n            // and return null\n            localStorage.removeItem(key);\n            return null;\n          }\n\n          return item.value;\n        }\n\n      }\n    });\n    Vue.prototype.$bus = new Vue({\n      data: {},\n      methods: {\n        toggleSidebar() {\n          this.$emit('event:toggle-sidebar');\n        },\n\n        openNotification(id) {\n          this.$emit('event:open-notification', id);\n        },\n\n        openChat(id) {\n          this.$emit('event:open-chat', id);\n        },\n\n        sendMessage(accountId) {\n          this.$emit('event:send-message', accountId);\n        },\n\n        quickViewAccount(account) {\n          this.$emit('event:quick-view-account', account);\n        },\n\n        quickViewQbTransaction(id) {\n          this.$emit('event:quick-view-qb-transaction', id);\n        },\n\n        addFeedback(jobId, feedback) {\n          this.$emit('event:add-feedback', jobId, feedback);\n        },\n\n        closeFeedback(jobId) {\n          this.$emit('event:close-feedback', jobId);\n        } //requestJobStart(req) {\n        //    this.$emit('event:request-job-start', req);\n        //},\n        //responseJobStart(resp) {\n        //    this.$emit('event:response-job-start', resp);\n        //}\n\n\n      }\n    });\n  }\n\n});\n\n//# sourceURL=webpack://client/./ClientApp/_Core/Plugins/common.js?");

/***/ }),

/***/ 915:
/*!*********************************!*\
  !*** ./ClientApp/_Core/core.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ 5913);\n/* harmony import */ var vue_moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-moment */ 9655);\n/* harmony import */ var vue_moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_moment__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Core_Plugins_bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_Core/Plugins/bootstrap-vue */ 2593);\n/* harmony import */ var _Core_Components_pagination_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_Core/Components/pagination.vue */ 8681);\n/* harmony import */ var _Core_Components_sortfield_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_Core/Components/sortfield.vue */ 4577);\n/* harmony import */ var _Core_Components_table_list_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_Core/Components/table-list.vue */ 5376);\n/* harmony import */ var _Core_Components_gmap_location_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_Core/Components/gmap-location.vue */ 2472);\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_1__.default.use((vue_moment__WEBPACK_IMPORTED_MODULE_0___default()));\nwindow.moment = __webpack_require__(/*! moment */ 421);\nvue__WEBPACK_IMPORTED_MODULE_1__.default.filter('formatDate', function (value) {\n  if (value) {\n    return moment(String(value)).format('YYYY-MM-DD hh:mm:ss');\n  }\n});\nvue__WEBPACK_IMPORTED_MODULE_1__.default.filter('toMoment', function (value) {\n  if (value) {\n    return moment(String(value)).calendar();\n  }\n});\nvue__WEBPACK_IMPORTED_MODULE_1__.default.filter('toCurrency', function (value) {\n  if (typeof value !== \"number\") {\n    return value;\n  } //var formatter = new Intl.NumberFormat('en-US', {\n  //    style: 'currency',\n  //    currency: 'USD',\n  //    minimumFractionDigits: 2\n  //});\n\n\n  var formatter = new Intl.NumberFormat('en-PH', {\n    style: 'currency',\n    currency: 'PHP',\n    minimumFractionDigits: 2\n  });\n  return formatter.format(value);\n});\nvue__WEBPACK_IMPORTED_MODULE_1__.default.filter('decimalToFraction', function (value) {\n  function highestCommonFactor(a, b) {\n    if (b == 0) return a;\n    return highestCommonFactor(b, a % b);\n  }\n\n  var decimal = value.toString(); //\"0.125\";\n\n  if (!decimal.includes('.')) return decimal;\n  var decimalArray = decimal.split(\".\");\n  var leftDecimalPart = decimalArray[0]; // 1\n\n  var rightDecimalPart = decimalArray[1]; // 75\n\n  var numerator = leftDecimalPart + rightDecimalPart; // 175\n\n  var denominator = Math.pow(10, rightDecimalPart.length); // 100\n\n  var factor = highestCommonFactor(numerator, denominator); // 25\n\n  denominator /= factor;\n  numerator /= factor;\n  return `${numerator}/${denominator}`;\n});\nvue__WEBPACK_IMPORTED_MODULE_1__.default.filter('prettyJson', function (value) {\n  return JSON.stringify(value, null, 1);\n});\n //  global components\n\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_1__.default.component('m-pagination', _Core_Components_pagination_vue__WEBPACK_IMPORTED_MODULE_3__.default);\nvue__WEBPACK_IMPORTED_MODULE_1__.default.component('sort-field', _Core_Components_sortfield_vue__WEBPACK_IMPORTED_MODULE_4__.default);\nvue__WEBPACK_IMPORTED_MODULE_1__.default.component('table-list', _Core_Components_table_list_vue__WEBPACK_IMPORTED_MODULE_5__.default);\nvue__WEBPACK_IMPORTED_MODULE_1__.default.component('gmap-location', _Core_Components_gmap_location_vue__WEBPACK_IMPORTED_MODULE_6__.default);\n\n//# sourceURL=webpack://client/./ClientApp/_Core/core.js?");

/***/ }),

/***/ 8492:
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ClientApp/Main/Pages/_Shared/app-bar.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Core_Mixins_navbarMixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_Core/Mixins/navbarMixin */ 136);\n/* harmony import */ var _nav_Drawer_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nav-Drawer.vue */ 2806);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  mixins: [_Core_Mixins_navbarMixin__WEBPACK_IMPORTED_MODULE_0__.default],\n  components: {\n    NavDrawer: _nav_Drawer_vue__WEBPACK_IMPORTED_MODULE_1__.default\n  },\n  props: {\n    appName: {\n      type: String,\n      required: true\n    },\n    urlProfilePicture: String,\n    menus: Array,\n    baseUrl: String\n  },\n\n  data() {\n    return {};\n  },\n\n  computed: {},\n\n  async mounted() {\n    const vm = this;\n  },\n\n  methods: {}\n});\n\n//# sourceURL=webpack://client/./ClientApp/Main/Pages/_Shared/app-bar.vue?./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options");

/***/ }),

/***/ 8462:
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ClientApp/Main/Pages/_Shared/app.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Core_Mixins_appMixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_Core/Mixins/appMixin */ 8933);\n/* harmony import */ var _app_bar_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-bar.vue */ 4146);\n/* harmony import */ var _index_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../index.vue */ 8271);\n//\n\n\n //import SystemBar from './system-bar.vue';\n\n //import NavDrawer from './nav-drawer.vue';\n//import AppFooter from './footer.vue';\n//import BottomNav from './bottom-nav.vue';\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  template: '#app',\n  mixins: [_Core_Mixins_appMixin__WEBPACK_IMPORTED_MODULE_0__.default],\n  components: {\n    //SystemBar,\n    AppBar: _app_bar_vue__WEBPACK_IMPORTED_MODULE_1__.default,\n    //NavDrawer, //AppFooter,\n    //BottomNav,\n    Index: _index_vue__WEBPACK_IMPORTED_MODULE_2__.default\n  },\n  props: {\n    appName: {\n      type: String,\n      required: true\n    },\n    urlProfilePicture: String\n  },\n\n  data() {\n    return {\n      menus: [{\n        to: '/',\n        label: 'Home',\n        icon: ''\n      }, {\n        to: '/about',\n        label: 'About',\n        icon: ''\n      }, {\n        to: '/contact-us',\n        label: 'Contact Us',\n        icon: ''\n      }, {\n        to: '/terms-of-use',\n        label: 'Terms of Use',\n        icon: ''\n      }, {\n        to: '/privacy-policy',\n        label: 'Privacy Policy',\n        icon: ''\n      }],\n      bottomNavHeightStyle: null,\n      items: []\n    };\n  },\n\n  async mounted() {},\n\n  async created() {},\n\n  methods: {}\n});\n\n//# sourceURL=webpack://client/./ClientApp/Main/Pages/_Shared/app.vue?./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options");

/***/ }),

/***/ 548:
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ClientApp/Main/Pages/_Shared/nav-Drawer.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  props: {\n    appName: {\n      type: String,\n      required: true\n    },\n    menus: {\n      type: Array,\n      required: true\n    }\n  }\n});\n\n//# sourceURL=webpack://client/./ClientApp/Main/Pages/_Shared/nav-Drawer.vue?./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options");

/***/ }),

/***/ 1954:
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ClientApp/Main/Pages/index.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mapbox-gl */ 925);\n/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mapbox_gl__WEBPACK_IMPORTED_MODULE_0__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//import page from '../../_Core/Mixins/pageMixin';\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  mixins: [//page\n  ],\n  components: {},\n  props: {},\n\n  data() {\n    return {\n      accessToken: 'pk.eyJ1IjoiY2F5ZGV2MjAxMCIsImEiOiJja3FiOGphZ3ExN2Y4Mndtdmp0NzR6dTc5In0.u97hhxcg2FKUZwbXIYRfDg',\n      map: null\n    };\n  },\n\n  computed: {\n    styles() {\n      const list = [{\n        value: 'mapbox://styles/mapbox/streets-v11',\n        text: 'Streets'\n      }, {\n        value: 'mapbox://styles/mapbox/outdoors-v11',\n        text: 'Outdoors'\n      }, {\n        value: 'mapbox://styles/mapbox/light-v10',\n        text: 'Light'\n      }, {\n        value: 'mapbox://styles/mapbox/dark-v10',\n        text: 'Dark'\n      }, {\n        value: 'mapbox://styles/mapbox/satellite-v9',\n        text: 'Satellite'\n      }, {\n        value: 'mapbox://styles/mapbox/satellite-streets-v11',\n        text: 'Satellite Streets'\n      }, {\n        value: 'mapbox://styles/mapbox/navigation-day-v1',\n        text: 'Navigation Day'\n      }, {\n        value: 'mapbox://styles/mapbox/navigation-night-v1',\n        text: 'Navigation Night'\n      }];\n      return list;\n    }\n\n  },\n\n  async mounted() {\n    const vm = this;\n    const cache = JSON.parse(localStorage.getItem(vm.dashboardKey)) || {};\n    (mapbox_gl__WEBPACK_IMPORTED_MODULE_0___default().accessToken) = vm.accessToken;\n    vm.map = new (mapbox_gl__WEBPACK_IMPORTED_MODULE_0___default().Map)({\n      container: \"mapContainer\",\n      //style: \"mapbox://styles/mapbox/streets-v11\",\n      //style: 'mapbox://styles/mapbox/satellite-streets-v10',\n      //style: 'mapbox://styles/mapbox/navigation-night-v1', // style URL\n      center: [103.811279, 1.345399],\n      zoom: 14 //maxBounds: [\n      //    [103.6, 1.1704753],\n      //    [104.1, 1.4754753],\n      //],\n\n    });\n    const nav = new (mapbox_gl__WEBPACK_IMPORTED_MODULE_0___default().NavigationControl)();\n    vm.map.addControl(nav, \"top-right\");\n    const geolocate = new (mapbox_gl__WEBPACK_IMPORTED_MODULE_0___default().GeolocateControl)({\n      positionOptions: {\n        enableHighAccuracy: true\n      },\n      trackUserLocation: true\n    });\n    vm.map.addControl(geolocate, \"top-right\");\n    vm.map.setStyle(vm.styles[0].value);\n    const marker = new (mapbox_gl__WEBPACK_IMPORTED_MODULE_0___default().Marker)().setLngLat([103.811279, 1.345399]).addTo(vm.map);\n  },\n\n  async created() {\n    const vm = this;\n    const cache = vm.$util.getWithExpiry(vm.feedbackCache); //if (cache)\n    //    vm.showFeedback = false;\n  },\n\n  methods: {\n    styleChanged(style) {\n      const vm = this;\n      vm.map.setStyle(style);\n    }\n\n  }\n});\n\n//# sourceURL=webpack://client/./ClientApp/Main/Pages/index.vue?./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options");

/***/ }),

/***/ 4528:
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ClientApp/_Core/Components/gmap-location.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n//\n//\n//\n//\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  props: {\n    mapName: String,\n    draggable: Boolean,\n    fixed: Boolean,\n    showLocation: Boolean,\n    cx: Number,\n    cy: Number,\n    markerClickAction: Function //items: Array,\n\n  },\n  watch: {\n    'cx': function (newValue, oldValue) {\n      const vm = this; //debugger\n\n      if (vm.map.setCenter) {\n        vm.centerPosition.lat = newValue;\n        vm.map.setCenter(vm.centerPosition);\n        vm.setMarker();\n      }\n    },\n    'cy': function (newValue, oldValue) {\n      const vm = this;\n\n      if (vm.map.setCenter) {\n        vm.centerPosition.lng = newValue;\n        vm.map.setCenter(vm.centerPosition);\n        vm.setMarker();\n      }\n    }\n  },\n\n  data() {\n    return {\n      navigator: {},\n      centerPosition: {\n        lat: 0,\n        lng: 0\n      },\n      // { lat: 13.8954684059025, lng: 120.906667412659 },\n      map: {},\n      marker: {},\n      infoWindow: {},\n      geocode: {},\n      items: [],\n      markers: []\n    };\n  },\n\n  created() {\n    const vm = this;\n  },\n\n  beforeUpdate() {\n    debugger;\n  },\n\n  updated() {\n    debugger;\n  },\n\n  async mounted() {\n    const vm = this;\n    vm.navigator = navigator;\n    vm.navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;\n    var timerId = setInterval(_ => {\n      if (google && google.maps) {\n        clearInterval(timerId);\n        vm.initMap();\n        vm.$emit('onMapReady');\n      }\n    }, 250);\n  },\n\n  methods: {\n    async initMap() {\n      const vm = this;\n      /*\n      Build list of map types.\n      You can also use var mapTypeIds = [\"roadmap\", \"satellite\", \"hybrid\", \"terrain\", \"OSM\"]\n      but static lists suck when Google updates the default list of map types.\n      */\n\n      var mapTypeIds = [];\n\n      for (var type in google.maps.MapTypeId) {\n        mapTypeIds.push(google.maps.MapTypeId[type]);\n      }\n\n      mapTypeIds.push(\"OSM\");\n      const lastZoom = Number.parseInt(localStorage.getItem('zoom')) || 15;\n      vm.map = new google.maps.Map(document.getElementById(vm.mapName), {\n        center: vm.centerPosition,\n        //{ lat: 13.948779, lng: 120.733035 }, //13.948779,120.733035\n        zoom: lastZoom,\n        //mapTypeId: \"OSM\",\n        mapTypeControl: true,\n        streetViewControl: false,\n        mapTypeControlOptions: {\n          mapTypeIds: mapTypeIds\n        }\n      });\n      vm.map.mapTypes.set(\"OSM\", new google.maps.ImageMapType({\n        getTileUrl: function (coord, zoom) {\n          // \"Wrap\" x (longitude) at 180th meridian properly\n          // NB: Don't touch coord.x: because coord param is by reference, and changing its x property breaks something in Google's lib\n          var tilesPerGlobe = 1 << zoom;\n          var x = coord.x % tilesPerGlobe;\n\n          if (x < 0) {\n            x = tilesPerGlobe + x;\n          } // Wrap y (latitude) in a like manner if you want to enable vertical infinite scrolling\n\n\n          return \"https://tile.openstreetmap.org/\" + zoom + \"/\" + x + \"/\" + coord.y + \".png\";\n        },\n        tileSize: new google.maps.Size(256, 256),\n        name: \"Open Street Map\",\n        maxZoom: 18\n      }));\n      vm.infoWindow = new google.maps.InfoWindow();\n      vm.geocoder = new google.maps.Geocoder();\n\n      if (vm.navigator.geolocation) {\n        if (vm.cx === 0 && vm.cy === 0) {\n          await vm.getCurrentLocation();\n        }\n\n        google.maps.event.addListener(vm.map, 'zoom_changed', function (arg) {\n          localStorage.setItem('zoom', this.zoom);\n        });\n      } else {\n        // Browser doesn't support Geolocation\n        vm.handleLocationError(false, vm.infoWindow, vm.map.getCenter());\n        debugger;\n      }\n    },\n\n    handleLocationError(browserHasGeolocation, infoWindow, pos) {\n      const vm = this;\n      vm.infoWindow.setPosition(pos);\n      vm.infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\\'t support geolocation.');\n      vm.infoWindow.open(map);\n    },\n\n    geocodeLatLng() {\n      const vm = this;\n      vm.geocoder.geocode({\n        'location': vm.centerPosition\n      }, function (results, status) {\n        if (status === 'OK') {\n          vm.$emit('onAddress', results[0], {\n            lat: vm.centerPosition.lat,\n            lng: vm.centerPosition.lng\n          }); //vm.$emit('onGeolocation', { lat: vm.centerPosition.lat(), lng: vm.centerPosition.lng() });\n        } else {\n          window.alert('Geocoder failed due to: ' + status);\n        }\n      });\n    },\n\n    async getCurrentLocation() {\n      const vm = this;\n      await vm.navigator.geolocation.getCurrentPosition(function (position) {\n        //if (!vm.fixed) {\n        vm.centerPosition = {\n          lat: position.coords.latitude,\n          lng: position.coords.longitude\n        }; //}\n\n        vm.map.setCenter(vm.centerPosition);\n\n        if (vm.showLocation) {\n          vm.setMarker(); //vm.marker = new google.maps.Marker({\n          //    draggable: vm.draggable,\n          //    //animation: google.maps.Animation.BOUNCE,\n          //    position: vm.centerPosition,\n          //    map: vm.map,\n          //    //title: \"Your Current Location\",\n          //    //label: {\n          //    //    text: 'You',\n          //    //    //fontFamily: 'Fontawesome',\n          //    //},\n          //});\n          ////var latlng = new google.maps.LatLng(40.748774, -73.985763);\n          //vm.marker.setPosition(vm.centerPosition);\n          //google.maps.event.addListener(vm.marker, 'dragend', function (event) {\n          //    vm.centerPosition = this.getPosition();\n          //    vm.geocodeLatLng();\n          //});\n        }\n      });\n    },\n\n    setMarker() {\n      const vm = this;\n      if (vm.marker && vm.marker.setMap) vm.marker.setMap(null);\n      vm.marker = new google.maps.Marker({\n        draggable: vm.draggable,\n        //animation: google.maps.Animation.BOUNCE,\n        position: vm.centerPosition,\n        map: vm.map //title: \"Your Current Location\",\n        //label: {\n        //    text: 'You',\n        //    //fontFamily: 'Fontawesome',\n        //},\n\n      }); //var latlng = new google.maps.LatLng(40.748774, -73.985763);\n\n      vm.marker.setPosition(vm.centerPosition);\n      google.maps.event.addListener(vm.marker, 'dragend', function (event) {\n        //vm.centerPosition = this.getPosition();\n        const pos = this.getPosition();\n        vm.centerPosition.lat = pos.lat();\n        vm.centerPosition.lng = pos.lng();\n        vm.geocodeLatLng();\n      });\n    },\n\n    placeMarkers(items, recenter) {\n      const vm = this;\n      let markers = vm.markers;\n\n      if (markers && markers.length > 0) {\n        markers.forEach(marker => marker.setMap(null));\n      }\n\n      if (items && items.length) {\n        markers = [];\n        items.forEach(item => {\n          var marker = new google.maps.Marker({\n            draggable: false,\n            //animation: google.maps.Animation.BOUNCE,\n            position: {\n              lat: item.geoX,\n              lng: item.geoY\n            },\n            map: vm.map,\n            item: item,\n            title: `${item.firstName} ${item.lastName}` //label: {\n            //    text: 'You',\n            //    //fontFamily: 'Fontawesome',\n            //},\n\n          });\n          google.maps.event.addListener(marker, 'click', function (event) {\n            if (vm.markerClickAction) vm.markerClickAction(this.item);\n          });\n          markers.push(marker);\n        });\n        vm.markers = markers;\n      } //if (recenter) {\n\n\n      vm.map.setCenter(vm.centerPosition); //}\n    }\n\n  }\n});\n\n//# sourceURL=webpack://client/./ClientApp/_Core/Components/gmap-location.vue?./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options");

/***/ }),

/***/ 8349:
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ClientApp/_Core/Components/pagination.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  props: {\n    filter: Object,\n    search: Function,\n    noRecords: String,\n    showPerPage: Boolean\n  },\n\n  data() {\n    return {};\n  },\n\n  created() {\n    const vm = this;\n    ;\n  },\n\n  methods: {\n    changePagination1() {\n      const vm = this; //if (page !== vm.filter.pageIndex)\n\n      vm.search(1);\n    },\n\n    changePagination2(page) {\n      const vm = this;\n\n      if (page !== vm.filter.query.pageIndex) {\n        vm.search(page);\n      }\n    }\n\n  }\n});\n\n//# sourceURL=webpack://client/./ClientApp/_Core/Components/pagination.vue?./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options");

/***/ }),

/***/ 3641:
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ClientApp/_Core/Components/sortfield.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  props: {\n    filter: Object,\n    field: String,\n    showSort: Boolean,\n    enabled: Boolean\n  },\n\n  data() {\n    return {};\n  },\n\n  mounted() {},\n\n  methods: {\n    currentSortField() {\n      return this.filter.sortField === this.field;\n    },\n\n    sortUp() {\n      return this.filter.sortOrder === 1;\n    },\n\n    click() {\n      let vm = this;\n      if (!vm.enabled) return;\n      let filter = vm.filter;\n\n      if (filter.sortField === vm.field) {\n        if (filter.sortOrder === 0) filter.sortField = null;else filter.sortOrder = filter.sortOrder === 0 ? 1 : 0;\n      } else {\n        filter.sortField = vm.field;\n        filter.sortOrder = 1;\n      }\n\n      vm.$emit('search');\n    }\n\n  }\n});\n\n//# sourceURL=webpack://client/./ClientApp/_Core/Components/sortfield.vue?./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options");

/***/ }),

/***/ 221:
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ClientApp/_Core/Components/table-list.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  props: {\n    items: Array,\n    header: Object,\n    getRowNumber: Function,\n    setSelected: Function,\n    isSelected: Function,\n    tableCss: String,\n    theadCss: String,\n    trCss: String\n  },\n\n  data() {\n    return {};\n  },\n\n  mounted() {},\n\n  methods: {\n    onSelectedRow(item) {\n      const vm = this;\n      vm.setSelected(item);\n      vm.$emit('onSelectedRow', item);\n    }\n\n  }\n});\n\n//# sourceURL=webpack://client/./ClientApp/_Core/Components/table-list.vue?./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options");

/***/ }),

/***/ 3541:
/*!*********************************!*\
  !*** ./ClientApp/Main/main.css ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://client/./ClientApp/Main/main.css?");

/***/ }),

/***/ 2760:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-3[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ClientApp/_Core/Components/table-list.vue?vue&type=style&index=0&id=231df20e&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://client/./ClientApp/_Core/Components/table-list.vue?./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-3%5B0%5D.rules%5B0%5D.use%5B1%5D!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js??vue-loader-options");

/***/ }),

/***/ 6700:
/*!***************************************************!*\
  !*** ./node_modules/moment/locale/ sync ^\.\/.*$ ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./af\": 9127,\n\t\"./af.js\": 9127,\n\t\"./ar\": 7006,\n\t\"./ar-dz\": 2633,\n\t\"./ar-dz.js\": 2633,\n\t\"./ar-kw\": 3215,\n\t\"./ar-kw.js\": 3215,\n\t\"./ar-ly\": 6968,\n\t\"./ar-ly.js\": 6968,\n\t\"./ar-ma\": 2572,\n\t\"./ar-ma.js\": 2572,\n\t\"./ar-sa\": 8319,\n\t\"./ar-sa.js\": 8319,\n\t\"./ar-tn\": 5629,\n\t\"./ar-tn.js\": 5629,\n\t\"./ar.js\": 7006,\n\t\"./az\": 6722,\n\t\"./az.js\": 6722,\n\t\"./be\": 5958,\n\t\"./be.js\": 5958,\n\t\"./bg\": 4921,\n\t\"./bg.js\": 4921,\n\t\"./bm\": 7293,\n\t\"./bm.js\": 7293,\n\t\"./bn\": 2288,\n\t\"./bn-bd\": 9907,\n\t\"./bn-bd.js\": 9907,\n\t\"./bn.js\": 2288,\n\t\"./bo\": 2127,\n\t\"./bo.js\": 2127,\n\t\"./br\": 3922,\n\t\"./br.js\": 3922,\n\t\"./bs\": 8932,\n\t\"./bs.js\": 8932,\n\t\"./ca\": 3246,\n\t\"./ca.js\": 3246,\n\t\"./cs\": 8208,\n\t\"./cs.js\": 8208,\n\t\"./cv\": 6492,\n\t\"./cv.js\": 6492,\n\t\"./cy\": 1883,\n\t\"./cy.js\": 1883,\n\t\"./da\": 2285,\n\t\"./da.js\": 2285,\n\t\"./de\": 6454,\n\t\"./de-at\": 3082,\n\t\"./de-at.js\": 3082,\n\t\"./de-ch\": 9076,\n\t\"./de-ch.js\": 9076,\n\t\"./de.js\": 6454,\n\t\"./dv\": 9016,\n\t\"./dv.js\": 9016,\n\t\"./el\": 3093,\n\t\"./el.js\": 3093,\n\t\"./en-au\": 5535,\n\t\"./en-au.js\": 5535,\n\t\"./en-ca\": 2610,\n\t\"./en-ca.js\": 2610,\n\t\"./en-gb\": 8386,\n\t\"./en-gb.js\": 8386,\n\t\"./en-ie\": 5272,\n\t\"./en-ie.js\": 5272,\n\t\"./en-il\": 3563,\n\t\"./en-il.js\": 3563,\n\t\"./en-in\": 8604,\n\t\"./en-in.js\": 8604,\n\t\"./en-nz\": 2140,\n\t\"./en-nz.js\": 2140,\n\t\"./en-sg\": 8217,\n\t\"./en-sg.js\": 8217,\n\t\"./eo\": 9823,\n\t\"./eo.js\": 9823,\n\t\"./es\": 312,\n\t\"./es-do\": 9546,\n\t\"./es-do.js\": 9546,\n\t\"./es-mx\": 9089,\n\t\"./es-mx.js\": 9089,\n\t\"./es-us\": 7781,\n\t\"./es-us.js\": 7781,\n\t\"./es.js\": 312,\n\t\"./et\": 8563,\n\t\"./et.js\": 8563,\n\t\"./eu\": 4003,\n\t\"./eu.js\": 4003,\n\t\"./fa\": 463,\n\t\"./fa.js\": 463,\n\t\"./fi\": 8941,\n\t\"./fi.js\": 8941,\n\t\"./fil\": 1742,\n\t\"./fil.js\": 1742,\n\t\"./fo\": 6,\n\t\"./fo.js\": 6,\n\t\"./fr\": 2346,\n\t\"./fr-ca\": 761,\n\t\"./fr-ca.js\": 761,\n\t\"./fr-ch\": 982,\n\t\"./fr-ch.js\": 982,\n\t\"./fr.js\": 2346,\n\t\"./fy\": 4934,\n\t\"./fy.js\": 4934,\n\t\"./ga\": 2670,\n\t\"./ga.js\": 2670,\n\t\"./gd\": 1733,\n\t\"./gd.js\": 1733,\n\t\"./gl\": 2271,\n\t\"./gl.js\": 2271,\n\t\"./gom-deva\": 5537,\n\t\"./gom-deva.js\": 5537,\n\t\"./gom-latn\": 763,\n\t\"./gom-latn.js\": 763,\n\t\"./gu\": 4125,\n\t\"./gu.js\": 4125,\n\t\"./he\": 1651,\n\t\"./he.js\": 1651,\n\t\"./hi\": 8602,\n\t\"./hi.js\": 8602,\n\t\"./hr\": 8641,\n\t\"./hr.js\": 8641,\n\t\"./hu\": 3079,\n\t\"./hu.js\": 3079,\n\t\"./hy-am\": 443,\n\t\"./hy-am.js\": 443,\n\t\"./id\": 8963,\n\t\"./id.js\": 8963,\n\t\"./is\": 1343,\n\t\"./is.js\": 1343,\n\t\"./it\": 8072,\n\t\"./it-ch\": 3115,\n\t\"./it-ch.js\": 3115,\n\t\"./it.js\": 8072,\n\t\"./ja\": 8183,\n\t\"./ja.js\": 8183,\n\t\"./jv\": 1064,\n\t\"./jv.js\": 1064,\n\t\"./ka\": 1999,\n\t\"./ka.js\": 1999,\n\t\"./kk\": 9360,\n\t\"./kk.js\": 9360,\n\t\"./km\": 3667,\n\t\"./km.js\": 3667,\n\t\"./kn\": 1882,\n\t\"./kn.js\": 1882,\n\t\"./ko\": 2401,\n\t\"./ko.js\": 2401,\n\t\"./ku\": 2583,\n\t\"./ku.js\": 2583,\n\t\"./ky\": 6751,\n\t\"./ky.js\": 6751,\n\t\"./lb\": 1193,\n\t\"./lb.js\": 1193,\n\t\"./lo\": 769,\n\t\"./lo.js\": 769,\n\t\"./lt\": 4409,\n\t\"./lt.js\": 4409,\n\t\"./lv\": 9262,\n\t\"./lv.js\": 9262,\n\t\"./me\": 7514,\n\t\"./me.js\": 7514,\n\t\"./mi\": 3434,\n\t\"./mi.js\": 3434,\n\t\"./mk\": 610,\n\t\"./mk.js\": 610,\n\t\"./ml\": 1654,\n\t\"./ml.js\": 1654,\n\t\"./mn\": 6730,\n\t\"./mn.js\": 6730,\n\t\"./mr\": 7196,\n\t\"./mr.js\": 7196,\n\t\"./ms\": 487,\n\t\"./ms-my\": 4750,\n\t\"./ms-my.js\": 4750,\n\t\"./ms.js\": 487,\n\t\"./mt\": 8856,\n\t\"./mt.js\": 8856,\n\t\"./my\": 1240,\n\t\"./my.js\": 1240,\n\t\"./nb\": 2121,\n\t\"./nb.js\": 2121,\n\t\"./ne\": 9802,\n\t\"./ne.js\": 9802,\n\t\"./nl\": 737,\n\t\"./nl-be\": 3497,\n\t\"./nl-be.js\": 3497,\n\t\"./nl.js\": 737,\n\t\"./nn\": 8153,\n\t\"./nn.js\": 8153,\n\t\"./oc-lnc\": 5173,\n\t\"./oc-lnc.js\": 5173,\n\t\"./pa-in\": 499,\n\t\"./pa-in.js\": 499,\n\t\"./pl\": 3629,\n\t\"./pl.js\": 3629,\n\t\"./pt\": 5702,\n\t\"./pt-br\": 3312,\n\t\"./pt-br.js\": 3312,\n\t\"./pt.js\": 5702,\n\t\"./ro\": 719,\n\t\"./ro.js\": 719,\n\t\"./ru\": 3778,\n\t\"./ru.js\": 3778,\n\t\"./sd\": 5545,\n\t\"./sd.js\": 5545,\n\t\"./se\": 5811,\n\t\"./se.js\": 5811,\n\t\"./si\": 2015,\n\t\"./si.js\": 2015,\n\t\"./sk\": 1587,\n\t\"./sk.js\": 1587,\n\t\"./sl\": 147,\n\t\"./sl.js\": 147,\n\t\"./sq\": 6821,\n\t\"./sq.js\": 6821,\n\t\"./sr\": 3019,\n\t\"./sr-cyrl\": 7792,\n\t\"./sr-cyrl.js\": 7792,\n\t\"./sr.js\": 3019,\n\t\"./ss\": 5078,\n\t\"./ss.js\": 5078,\n\t\"./sv\": 3593,\n\t\"./sv.js\": 3593,\n\t\"./sw\": 7655,\n\t\"./sw.js\": 7655,\n\t\"./ta\": 1553,\n\t\"./ta.js\": 1553,\n\t\"./te\": 5967,\n\t\"./te.js\": 5967,\n\t\"./tet\": 9236,\n\t\"./tet.js\": 9236,\n\t\"./tg\": 2091,\n\t\"./tg.js\": 2091,\n\t\"./th\": 4141,\n\t\"./th.js\": 4141,\n\t\"./tk\": 4204,\n\t\"./tk.js\": 4204,\n\t\"./tl-ph\": 8361,\n\t\"./tl-ph.js\": 8361,\n\t\"./tlh\": 9565,\n\t\"./tlh.js\": 9565,\n\t\"./tr\": 6075,\n\t\"./tr.js\": 6075,\n\t\"./tzl\": 1637,\n\t\"./tzl.js\": 1637,\n\t\"./tzm\": 8231,\n\t\"./tzm-latn\": 4943,\n\t\"./tzm-latn.js\": 4943,\n\t\"./tzm.js\": 8231,\n\t\"./ug-cn\": 7822,\n\t\"./ug-cn.js\": 7822,\n\t\"./uk\": 7263,\n\t\"./uk.js\": 7263,\n\t\"./ur\": 1769,\n\t\"./ur.js\": 1769,\n\t\"./uz\": 9736,\n\t\"./uz-latn\": 4725,\n\t\"./uz-latn.js\": 4725,\n\t\"./uz.js\": 9736,\n\t\"./vi\": 9562,\n\t\"./vi.js\": 9562,\n\t\"./x-pseudo\": 7219,\n\t\"./x-pseudo.js\": 7219,\n\t\"./yo\": 6195,\n\t\"./yo.js\": 6195,\n\t\"./zh-cn\": 7289,\n\t\"./zh-cn.js\": 7289,\n\t\"./zh-hk\": 1589,\n\t\"./zh-hk.js\": 1589,\n\t\"./zh-mo\": 9708,\n\t\"./zh-mo.js\": 9708,\n\t\"./zh-tw\": 3384,\n\t\"./zh-tw.js\": 3384\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = 6700;\n\n//# sourceURL=webpack://client/./node_modules/moment/locale/_sync_^\\.\\/.*$?");

/***/ }),

/***/ 4146:
/*!**************************************************!*\
  !*** ./ClientApp/Main/Pages/_Shared/app-bar.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _app_bar_vue_vue_type_template_id_6090cae2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-bar.vue?vue&type=template&id=6090cae2& */ 1068);\n/* harmony import */ var _app_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-bar.vue?vue&type=script&lang=js& */ 4013);\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 1900);\n\n\n\n\n\n/* normalize component */\n;\nvar component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(\n  _app_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,\n  _app_bar_vue_vue_type_template_id_6090cae2___WEBPACK_IMPORTED_MODULE_0__.render,\n  _app_bar_vue_vue_type_template_id_6090cae2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"ClientApp/Main/Pages/_Shared/app-bar.vue\"\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);\n\n//# sourceURL=webpack://client/./ClientApp/Main/Pages/_Shared/app-bar.vue?");

/***/ }),

/***/ 2642:
/*!**********************************************!*\
  !*** ./ClientApp/Main/Pages/_Shared/app.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.vue?vue&type=script&lang=js& */ 3555);\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 1900);\nvar render, staticRenderFns\n;\n\n\n\n/* normalize component */\n;\nvar component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__.default)(\n  _app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default,\n  render,\n  staticRenderFns,\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"ClientApp/Main/Pages/_Shared/app.vue\"\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);\n\n//# sourceURL=webpack://client/./ClientApp/Main/Pages/_Shared/app.vue?");

/***/ }),

/***/ 2806:
/*!*****************************************************!*\
  !*** ./ClientApp/Main/Pages/_Shared/nav-Drawer.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _nav_Drawer_vue_vue_type_template_id_68c895d0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nav-Drawer.vue?vue&type=template&id=68c895d0& */ 9705);\n/* harmony import */ var _nav_Drawer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nav-Drawer.vue?vue&type=script&lang=js& */ 1698);\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 1900);\n\n\n\n\n\n/* normalize component */\n;\nvar component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(\n  _nav_Drawer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,\n  _nav_Drawer_vue_vue_type_template_id_68c895d0___WEBPACK_IMPORTED_MODULE_0__.render,\n  _nav_Drawer_vue_vue_type_template_id_68c895d0___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"ClientApp/Main/Pages/_Shared/nav-Drawer.vue\"\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);\n\n//# sourceURL=webpack://client/./ClientApp/Main/Pages/_Shared/nav-Drawer.vue?");

/***/ }),

/***/ 8271:
/*!****************************************!*\
  !*** ./ClientApp/Main/Pages/index.vue ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _index_vue_vue_type_template_id_c3313d90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=c3313d90& */ 6453);\n/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ 4722);\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 1900);\n\n\n\n\n\n/* normalize component */\n;\nvar component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(\n  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,\n  _index_vue_vue_type_template_id_c3313d90___WEBPACK_IMPORTED_MODULE_0__.render,\n  _index_vue_vue_type_template_id_c3313d90___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"ClientApp/Main/Pages/index.vue\"\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);\n\n//# sourceURL=webpack://client/./ClientApp/Main/Pages/index.vue?");

/***/ }),

/***/ 2472:
/*!******************************************************!*\
  !*** ./ClientApp/_Core/Components/gmap-location.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gmap_location_vue_vue_type_template_id_93165ca8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gmap-location.vue?vue&type=template&id=93165ca8& */ 6436);\n/* harmony import */ var _gmap_location_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gmap-location.vue?vue&type=script&lang=js& */ 2270);\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 1900);\n\n\n\n\n\n/* normalize component */\n;\nvar component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(\n  _gmap_location_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,\n  _gmap_location_vue_vue_type_template_id_93165ca8___WEBPACK_IMPORTED_MODULE_0__.render,\n  _gmap_location_vue_vue_type_template_id_93165ca8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"ClientApp/_Core/Components/gmap-location.vue\"\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);\n\n//# sourceURL=webpack://client/./ClientApp/_Core/Components/gmap-location.vue?");

/***/ }),

/***/ 8681:
/*!***************************************************!*\
  !*** ./ClientApp/_Core/Components/pagination.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _pagination_vue_vue_type_template_id_2064282a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pagination.vue?vue&type=template&id=2064282a& */ 4819);\n/* harmony import */ var _pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pagination.vue?vue&type=script&lang=js& */ 1060);\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 1900);\n\n\n\n\n\n/* normalize component */\n;\nvar component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(\n  _pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,\n  _pagination_vue_vue_type_template_id_2064282a___WEBPACK_IMPORTED_MODULE_0__.render,\n  _pagination_vue_vue_type_template_id_2064282a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"ClientApp/_Core/Components/pagination.vue\"\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);\n\n//# sourceURL=webpack://client/./ClientApp/_Core/Components/pagination.vue?");

/***/ }),

/***/ 4577:
/*!**************************************************!*\
  !*** ./ClientApp/_Core/Components/sortfield.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _sortfield_vue_vue_type_template_id_48af28db___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sortfield.vue?vue&type=template&id=48af28db& */ 6317);\n/* harmony import */ var _sortfield_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sortfield.vue?vue&type=script&lang=js& */ 8506);\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 1900);\n\n\n\n\n\n/* normalize component */\n;\nvar component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(\n  _sortfield_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,\n  _sortfield_vue_vue_type_template_id_48af28db___WEBPACK_IMPORTED_MODULE_0__.render,\n  _sortfield_vue_vue_type_template_id_48af28db___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"ClientApp/_Core/Components/sortfield.vue\"\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);\n\n//# sourceURL=webpack://client/./ClientApp/_Core/Components/sortfield.vue?");

/***/ }),

/***/ 5376:
/*!***************************************************!*\
  !*** ./ClientApp/_Core/Components/table-list.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _table_list_vue_vue_type_template_id_231df20e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./table-list.vue?vue&type=template&id=231df20e&scoped=true& */ 2966);\n/* harmony import */ var _table_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./table-list.vue?vue&type=script&lang=js& */ 5855);\n/* harmony import */ var _table_list_vue_vue_type_style_index_0_id_231df20e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./table-list.vue?vue&type=style&index=0&id=231df20e&scoped=true&lang=css& */ 1052);\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 1900);\n\n\n\n;\n\n\n/* normalize component */\n\nvar component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(\n  _table_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,\n  _table_list_vue_vue_type_template_id_231df20e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,\n  _table_list_vue_vue_type_template_id_231df20e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,\n  false,\n  null,\n  \"231df20e\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"ClientApp/_Core/Components/table-list.vue\"\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);\n\n//# sourceURL=webpack://client/./ClientApp/_Core/Components/table-list.vue?");

/***/ }),

/***/ 4013:
/*!***************************************************************************!*\
  !*** ./ClientApp/Main/Pages/_Shared/app-bar.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./app-bar.vue?vue&type=script&lang=js& */ 8492);\n /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); \n\n//# sourceURL=webpack://client/./ClientApp/Main/Pages/_Shared/app-bar.vue?");

/***/ }),

/***/ 3555:
/*!***********************************************************************!*\
  !*** ./ClientApp/Main/Pages/_Shared/app.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./app.vue?vue&type=script&lang=js& */ 8462);\n /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); \n\n//# sourceURL=webpack://client/./ClientApp/Main/Pages/_Shared/app.vue?");

/***/ }),

/***/ 1698:
/*!******************************************************************************!*\
  !*** ./ClientApp/Main/Pages/_Shared/nav-Drawer.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_nav_Drawer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./nav-Drawer.vue?vue&type=script&lang=js& */ 548);\n /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_nav_Drawer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); \n\n//# sourceURL=webpack://client/./ClientApp/Main/Pages/_Shared/nav-Drawer.vue?");

/***/ }),

/***/ 4722:
/*!*****************************************************************!*\
  !*** ./ClientApp/Main/Pages/index.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=script&lang=js& */ 1954);\n /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); \n\n//# sourceURL=webpack://client/./ClientApp/Main/Pages/index.vue?");

/***/ }),

/***/ 2270:
/*!*******************************************************************************!*\
  !*** ./ClientApp/_Core/Components/gmap-location.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_gmap_location_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gmap-location.vue?vue&type=script&lang=js& */ 4528);\n /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_gmap_location_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); \n\n//# sourceURL=webpack://client/./ClientApp/_Core/Components/gmap-location.vue?");

/***/ }),

/***/ 1060:
/*!****************************************************************************!*\
  !*** ./ClientApp/_Core/Components/pagination.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./pagination.vue?vue&type=script&lang=js& */ 8349);\n /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_pagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); \n\n//# sourceURL=webpack://client/./ClientApp/_Core/Components/pagination.vue?");

/***/ }),

/***/ 8506:
/*!***************************************************************************!*\
  !*** ./ClientApp/_Core/Components/sortfield.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_sortfield_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./sortfield.vue?vue&type=script&lang=js& */ 3641);\n /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_sortfield_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); \n\n//# sourceURL=webpack://client/./ClientApp/_Core/Components/sortfield.vue?");

/***/ }),

/***/ 5855:
/*!****************************************************************************!*\
  !*** ./ClientApp/_Core/Components/table-list.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_table_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./table-list.vue?vue&type=script&lang=js& */ 221);\n /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_table_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); \n\n//# sourceURL=webpack://client/./ClientApp/_Core/Components/table-list.vue?");

/***/ }),

/***/ 1052:
/*!************************************************************************************************************!*\
  !*** ./ClientApp/_Core/Components/table-list.vue?vue&type=style&index=0&id=231df20e&scoped=true&lang=css& ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_3_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_table_list_vue_vue_type_style_index_0_id_231df20e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-3[0].rules[0].use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./table-list.vue?vue&type=style&index=0&id=231df20e&scoped=true&lang=css& */ 2760);\n\n\n//# sourceURL=webpack://client/./ClientApp/_Core/Components/table-list.vue?");

/***/ }),

/***/ 1068:
/*!*********************************************************************************!*\
  !*** ./ClientApp/Main/Pages/_Shared/app-bar.vue?vue&type=template&id=6090cae2& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_app_bar_vue_vue_type_template_id_6090cae2___WEBPACK_IMPORTED_MODULE_0__.render),\n/* harmony export */   \"staticRenderFns\": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_app_bar_vue_vue_type_template_id_6090cae2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_app_bar_vue_vue_type_template_id_6090cae2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./app-bar.vue?vue&type=template&id=6090cae2& */ 2162);\n\n\n//# sourceURL=webpack://client/./ClientApp/Main/Pages/_Shared/app-bar.vue?");

/***/ }),

/***/ 9705:
/*!************************************************************************************!*\
  !*** ./ClientApp/Main/Pages/_Shared/nav-Drawer.vue?vue&type=template&id=68c895d0& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_nav_Drawer_vue_vue_type_template_id_68c895d0___WEBPACK_IMPORTED_MODULE_0__.render),\n/* harmony export */   \"staticRenderFns\": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_nav_Drawer_vue_vue_type_template_id_68c895d0___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_nav_Drawer_vue_vue_type_template_id_68c895d0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./nav-Drawer.vue?vue&type=template&id=68c895d0& */ 3260);\n\n\n//# sourceURL=webpack://client/./ClientApp/Main/Pages/_Shared/nav-Drawer.vue?");

/***/ }),

/***/ 6453:
/*!***********************************************************************!*\
  !*** ./ClientApp/Main/Pages/index.vue?vue&type=template&id=c3313d90& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_c3313d90___WEBPACK_IMPORTED_MODULE_0__.render),\n/* harmony export */   \"staticRenderFns\": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_c3313d90___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_c3313d90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=template&id=c3313d90& */ 8632);\n\n\n//# sourceURL=webpack://client/./ClientApp/Main/Pages/index.vue?");

/***/ }),

/***/ 6436:
/*!*************************************************************************************!*\
  !*** ./ClientApp/_Core/Components/gmap-location.vue?vue&type=template&id=93165ca8& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gmap_location_vue_vue_type_template_id_93165ca8___WEBPACK_IMPORTED_MODULE_0__.render),\n/* harmony export */   \"staticRenderFns\": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gmap_location_vue_vue_type_template_id_93165ca8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gmap_location_vue_vue_type_template_id_93165ca8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gmap-location.vue?vue&type=template&id=93165ca8& */ 6682);\n\n\n//# sourceURL=webpack://client/./ClientApp/_Core/Components/gmap-location.vue?");

/***/ }),

/***/ 4819:
/*!**********************************************************************************!*\
  !*** ./ClientApp/_Core/Components/pagination.vue?vue&type=template&id=2064282a& ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_pagination_vue_vue_type_template_id_2064282a___WEBPACK_IMPORTED_MODULE_0__.render),\n/* harmony export */   \"staticRenderFns\": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_pagination_vue_vue_type_template_id_2064282a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_pagination_vue_vue_type_template_id_2064282a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./pagination.vue?vue&type=template&id=2064282a& */ 7519);\n\n\n//# sourceURL=webpack://client/./ClientApp/_Core/Components/pagination.vue?");

/***/ }),

/***/ 6317:
/*!*********************************************************************************!*\
  !*** ./ClientApp/_Core/Components/sortfield.vue?vue&type=template&id=48af28db& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_sortfield_vue_vue_type_template_id_48af28db___WEBPACK_IMPORTED_MODULE_0__.render),\n/* harmony export */   \"staticRenderFns\": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_sortfield_vue_vue_type_template_id_48af28db___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_sortfield_vue_vue_type_template_id_48af28db___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./sortfield.vue?vue&type=template&id=48af28db& */ 7729);\n\n\n//# sourceURL=webpack://client/./ClientApp/_Core/Components/sortfield.vue?");

/***/ }),

/***/ 2966:
/*!**********************************************************************************************!*\
  !*** ./ClientApp/_Core/Components/table-list.vue?vue&type=template&id=231df20e&scoped=true& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_table_list_vue_vue_type_template_id_231df20e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),\n/* harmony export */   \"staticRenderFns\": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_table_list_vue_vue_type_template_id_231df20e_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_table_list_vue_vue_type_template_id_231df20e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./table-list.vue?vue&type=template&id=231df20e&scoped=true& */ 5165);\n\n\n//# sourceURL=webpack://client/./ClientApp/_Core/Components/table-list.vue?");

/***/ }),

/***/ 2162:
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ClientApp/Main/Pages/_Shared/app-bar.vue?vue&type=template&id=6090cae2& ***!
  \************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": () => (/* binding */ render),\n/* harmony export */   \"staticRenderFns\": () => (/* binding */ staticRenderFns)\n/* harmony export */ });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"nav\",\n    {\n      staticClass:\n        \"navbar navbar-expand-md navbar-toggleable-sm navbar-dark bg-dark sticky-top shadow\"\n    },\n    [\n      _c(\n        \"div\",\n        { staticClass: \"container-xl\" },\n        [\n          _c(\"b-navbar-toggle\", { attrs: { target: \"navDrawer\" } }),\n          _vm._v(\" \"),\n          _c(\n            \"a\",\n            { staticClass: \"navbar-brand ml-2 ml-sm-0\", attrs: { href: \"/\" } },\n            [_vm._v(\"\\n            \" + _vm._s(_vm.appName) + \"\\n        \")]\n          ),\n          _vm._v(\" \"),\n          _c(\n            \"div\",\n            {\n              staticClass: \"collapse navbar-collapse\",\n              attrs: { id: \"navbarColor01\" }\n            },\n            [\n              _c(\n                \"b-navbar-nav\",\n                [\n                  _vm._l(_vm.menus, function(menu) {\n                    return [\n                      !menu.subMenus\n                        ? _c(\n                            \"b-nav-item\",\n                            {\n                              key: menu.to,\n                              attrs: { href: menu.to, type: \"dark\" }\n                            },\n                            [\n                              _c(\"span\", { class: menu.icon }),\n                              _vm._v(\n                                \" \" +\n                                  _vm._s(menu.label) +\n                                  \"\\n                    \"\n                              )\n                            ]\n                          )\n                        : _c(\n                            \"b-nav-item-dropdown\",\n                            {\n                              scopedSlots: _vm._u(\n                                [\n                                  {\n                                    key: \"button-content\",\n                                    fn: function() {\n                                      return [\n                                        _c(\"span\", { class: menu.icon }),\n                                        _vm._v(\n                                          \" \" +\n                                            _vm._s(menu.label) +\n                                            \"\\n                        \"\n                                        )\n                                      ]\n                                    },\n                                    proxy: true\n                                  }\n                                ],\n                                null,\n                                true\n                              )\n                            },\n                            [\n                              _vm._v(\" \"),\n                              _vm._l(menu.subMenus, function(mnu) {\n                                return _c(\n                                  \"b-dropdown-item\",\n                                  { key: mnu.to, attrs: { to: mnu.to } },\n                                  [\n                                    _c(\"span\", {\n                                      staticClass: \"mr-1\",\n                                      class: mnu.icon\n                                    }),\n                                    _vm._v(\n                                      _vm._s(mnu.label) +\n                                        \"\\n                        \"\n                                    )\n                                  ]\n                                )\n                              })\n                            ],\n                            2\n                          )\n                    ]\n                  })\n                ],\n                2\n              )\n            ],\n            1\n          )\n        ],\n        1\n      ),\n      _vm._v(\" \"),\n      _c(\"nav-drawer\", { attrs: { appName: _vm.appName, menus: _vm.menus } })\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack://client/./ClientApp/Main/Pages/_Shared/app-bar.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options");

/***/ }),

/***/ 3260:
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ClientApp/Main/Pages/_Shared/nav-Drawer.vue?vue&type=template&id=68c895d0& ***!
  \***************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": () => (/* binding */ render),\n/* harmony export */   \"staticRenderFns\": () => (/* binding */ staticRenderFns)\n/* harmony export */ });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"b-sidebar\",\n    {\n      attrs: { id: \"navDrawer\", title: _vm.appName, backdrop: \"\", shadow: \"\" }\n    },\n    [\n      _c(\n        \"b-nav\",\n        { attrs: { vertical: \"\", pills: \"\" } },\n        [\n          _vm._l(_vm.menus, function(menu) {\n            return [\n              !menu.subMenus\n                ? _c(\"b-nav-item\", { key: menu.to, attrs: { to: menu.to } }, [\n                    _c(\"span\", { class: menu.icon }),\n                    _vm._v(\" \" + _vm._s(menu.label) + \"\\n            \")\n                  ])\n                : _c(\n                    \"b-nav-item-dropdown\",\n                    {\n                      scopedSlots: _vm._u(\n                        [\n                          {\n                            key: \"button-content\",\n                            fn: function() {\n                              return [\n                                _c(\"span\", { class: menu.icon }),\n                                _vm._v(\n                                  \" \" +\n                                    _vm._s(menu.label) +\n                                    \"\\n                \"\n                                )\n                              ]\n                            },\n                            proxy: true\n                          }\n                        ],\n                        null,\n                        true\n                      )\n                    },\n                    [\n                      _vm._v(\" \"),\n                      _vm._l(menu.subMenus, function(mnu) {\n                        return _c(\n                          \"b-dropdown-item\",\n                          { key: mnu.to, attrs: { to: mnu.to } },\n                          [\n                            _c(\"span\", {\n                              staticClass: \"mr-1\",\n                              class: mnu.icon\n                            }),\n                            _vm._v(_vm._s(mnu.label) + \"\\n                \")\n                          ]\n                        )\n                      })\n                    ],\n                    2\n                  )\n            ]\n          })\n        ],\n        2\n      )\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack://client/./ClientApp/Main/Pages/_Shared/nav-Drawer.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options");

/***/ }),

/***/ 8632:
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ClientApp/Main/Pages/index.vue?vue&type=template&id=c3313d90& ***!
  \**************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": () => (/* binding */ render),\n/* harmony export */   \"staticRenderFns\": () => (/* binding */ staticRenderFns)\n/* harmony export */ });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", {}, [\n    _c(\n      \"div\",\n      [\n        _c(\"b-select\", {\n          attrs: { options: _vm.styles },\n          on: { change: _vm.styleChanged }\n        })\n      ],\n      1\n    ),\n    _vm._v(\" \"),\n    _c(\n      \"div\",\n      {\n        staticClass: \"basemap w-100 min-vh-100\",\n        attrs: { id: \"mapContainer\" }\n      },\n      [_vm._v(\"test\")]\n    )\n  ])\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack://client/./ClientApp/Main/Pages/index.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options");

/***/ }),

/***/ 6682:
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ClientApp/_Core/Components/gmap-location.vue?vue&type=template&id=93165ca8& ***!
  \****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": () => (/* binding */ render),\n/* harmony export */   \"staticRenderFns\": () => (/* binding */ staticRenderFns)\n/* harmony export */ });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", {\n    staticStyle: { height: \"100%\", width: \"100%\" },\n    attrs: { id: _vm.mapName }\n  })\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack://client/./ClientApp/_Core/Components/gmap-location.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options");

/***/ }),

/***/ 7519:
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ClientApp/_Core/Components/pagination.vue?vue&type=template&id=2064282a& ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": () => (/* binding */ render),\n/* harmony export */   \"staticRenderFns\": () => (/* binding */ staticRenderFns)\n/* harmony export */ });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", {}, [\n    _vm.filter.items.length\n      ? _c(\"div\", [\n          _c(\n            \"div\",\n            {\n              staticClass:\n                \"d-flex flex-column-reverse flex-sm-row justify-content-center justify-content-sm-between align-items-center\"\n            },\n            [\n              _vm.showPerPage\n                ? _c(\"div\", { staticClass: \"small\" }, [\n                    _c(\"div\", { staticClass: \"d-flex flex-row\" }, [\n                      _c(\n                        \"span\",\n                        { staticClass: \"mr-1 text-nowrap align-self-center\" },\n                        [\n                          _c(\"span\", { staticClass: \"mr-1 font-weight-bold\" }, [\n                            _vm._v(_vm._s(_vm.filter.totalCount))\n                          ]),\n                          _vm._v(\n                            \"records in \" +\n                              _vm._s(_vm.filter.totalPages) +\n                              \" page(s)\\n                    \"\n                          )\n                        ]\n                      ),\n                      _vm._v(\" \"),\n                      _c(\n                        \"div\",\n                        { staticClass: \"d-flex flex-row align-items-center\" },\n                        [\n                          _c(\n                            \"select\",\n                            {\n                              directives: [\n                                {\n                                  name: \"model\",\n                                  rawName: \"v-model\",\n                                  value: _vm.filter.query.pageSize,\n                                  expression: \"filter.query.pageSize\"\n                                }\n                              ],\n                              staticClass:\n                                \"custom-select custom-select-sm mr-1\",\n                              on: {\n                                change: [\n                                  function($event) {\n                                    var $$selectedVal = Array.prototype.filter\n                                      .call($event.target.options, function(o) {\n                                        return o.selected\n                                      })\n                                      .map(function(o) {\n                                        var val =\n                                          \"_value\" in o ? o._value : o.value\n                                        return val\n                                      })\n                                    _vm.$set(\n                                      _vm.filter.query,\n                                      \"pageSize\",\n                                      $event.target.multiple\n                                        ? $$selectedVal\n                                        : $$selectedVal[0]\n                                    )\n                                  },\n                                  _vm.changePagination1\n                                ]\n                              }\n                            },\n                            [\n                              _c(\"option\", { attrs: { value: \"1\" } }, [\n                                _vm._v(\"1\")\n                              ]),\n                              _vm._v(\" \"),\n                              _c(\"option\", { attrs: { value: \"2\" } }, [\n                                _vm._v(\"2\")\n                              ]),\n                              _vm._v(\" \"),\n                              _c(\"option\", { attrs: { value: \"3\" } }, [\n                                _vm._v(\"3\")\n                              ]),\n                              _vm._v(\" \"),\n                              _c(\"option\", { attrs: { value: \"5\" } }, [\n                                _vm._v(\"5\")\n                              ]),\n                              _vm._v(\" \"),\n                              _c(\"option\", { attrs: { value: \"10\" } }, [\n                                _vm._v(\"10\")\n                              ]),\n                              _vm._v(\" \"),\n                              _c(\"option\", { attrs: { value: \"15\" } }, [\n                                _vm._v(\"15\")\n                              ]),\n                              _vm._v(\" \"),\n                              _c(\"option\", { attrs: { value: \"25\" } }, [\n                                _vm._v(\"25\")\n                              ]),\n                              _vm._v(\" \"),\n                              _c(\"option\", { attrs: { value: \"40\" } }, [\n                                _vm._v(\"40\")\n                              ])\n                            ]\n                          ),\n                          _vm._v(\" \"),\n                          _c(\"div\", { staticClass: \"text-nowrap\" }, [\n                            _vm._v(\"per page\")\n                          ])\n                        ]\n                      )\n                    ])\n                  ])\n                : _vm._e(),\n              _vm._v(\" \"),\n              _c(\n                \"div\",\n                { staticClass: \"align-self-center\" },\n                [\n                  _c(\"b-pagination\", {\n                    staticClass: \"mb-sm-0\",\n                    attrs: {\n                      \"total-rows\": _vm.filter.totalCount,\n                      \"per-page\": _vm.filter.query.pageSize,\n                      limit: \"3\"\n                    },\n                    on: { change: _vm.changePagination2 },\n                    model: {\n                      value: _vm.filter.query.pageIndex,\n                      callback: function($$v) {\n                        _vm.$set(_vm.filter.query, \"pageIndex\", $$v)\n                      },\n                      expression: \"filter.query.pageIndex\"\n                    }\n                  })\n                ],\n                1\n              )\n            ]\n          )\n        ])\n      : _c(\"div\", [\n          _c(\"div\", { staticClass: \"text-info font-weight-bold text-center\" }, [\n            _vm.noRecords\n              ? _c(\"div\", [\n                  _vm._v(\n                    \"\\n                \" +\n                      _vm._s(_vm.noRecords) +\n                      \"\\n            \"\n                  )\n                ])\n              : _c(\"div\", [_vm._v(\"No record(s) found.\")])\n          ])\n        ])\n  ])\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack://client/./ClientApp/_Core/Components/pagination.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options");

/***/ }),

/***/ 7729:
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ClientApp/_Core/Components/sortfield.vue?vue&type=template&id=48af28db& ***!
  \************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": () => (/* binding */ render),\n/* harmony export */   \"staticRenderFns\": () => (/* binding */ staticRenderFns)\n/* harmony export */ });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    {\n      staticClass: \"d-flex flex-row justify-content-start align-content-center\",\n      style: { cursor: _vm.enabled ? \"pointer\" : \"\" },\n      on: { click: _vm.click }\n    },\n    [\n      _vm._t(\"default\"),\n      _vm._v(\" \"),\n      _c(\"span\", { staticClass: \"align-self-center\" }, [\n        _vm.showSort\n          ? _c(\"span\", {\n              staticClass: \"fas fa-fw mr-1\",\n              class: {\n                \"fa-sort text-gray-500\": !_vm.currentSortField(),\n                \"fa-sort-up\": _vm.currentSortField() && _vm.sortUp(),\n                \"fa-sort-down\": _vm.currentSortField() && !_vm.sortUp()\n              }\n            })\n          : _vm._e()\n      ])\n    ],\n    2\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack://client/./ClientApp/_Core/Components/sortfield.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options");

/***/ }),

/***/ 5165:
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ClientApp/_Core/Components/table-list.vue?vue&type=template&id=231df20e&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": () => (/* binding */ render),\n/* harmony export */   \"staticRenderFns\": () => (/* binding */ staticRenderFns)\n/* harmony export */ });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", {}, [\n    _c(\"div\", { staticClass: \"table-responsive m-0\" }, [\n      _c(\n        \"table\",\n        {\n          staticClass: \"table table-hover d-none d-md-table\",\n          class: _vm.tableCss\n        },\n        [\n          _c(\n            \"thead\",\n            { class: _vm.theadCss },\n            [\n              _vm._t(\"header\", function() {\n                return [\n                  _c(\n                    \"tr\",\n                    [\n                      _c(\"th\", [_vm._v(\"#\")]),\n                      _vm._v(\" \"),\n                      _vm._l(_vm.header.columns, function(col) {\n                        return _c(\"th\", [_vm._v(_vm._s(col.title))])\n                      })\n                    ],\n                    2\n                  )\n                ]\n              })\n            ],\n            2\n          ),\n          _vm._v(\" \"),\n          _c(\n            \"tbody\",\n            [\n              _vm._l(_vm.items, function(item, i) {\n                return _vm._t(\n                  \"table\",\n                  function() {\n                    return [\n                      _c(\n                        \"tr\",\n                        {\n                          key: \"row1-\" + item[_vm.header.key],\n                          class: _vm.trCss,\n                          on: {\n                            click: function($event) {\n                              return _vm.onSelectedRow(item)\n                            }\n                          }\n                        },\n                        [\n                          _c(\"td\", [_vm._v(_vm._s(_vm.getRowNumber(i)))]),\n                          _vm._v(\" \"),\n                          _vm._l(_vm.header.columns, function(col) {\n                            return _c(\"td\", [\n                              col.href\n                                ? _c(\n                                    \"a\",\n                                    {\n                                      staticClass: \"font-weight-bold\",\n                                      attrs: {\n                                        href: col.href(item[_vm.header.key])\n                                      }\n                                    },\n                                    [\n                                      _vm._v(\n                                        \"\\n                                \" +\n                                          _vm._s(item[col.field]) +\n                                          \"\\n                            \"\n                                      )\n                                    ]\n                                  )\n                                : _c(\"span\", [\n                                    _vm._v(\n                                      \"\\n                                \" +\n                                        _vm._s(item[col.field]) +\n                                        \"\\n                            \"\n                                    )\n                                  ])\n                            ])\n                          })\n                        ],\n                        2\n                      )\n                    ]\n                  },\n                  { item: item, index: i }\n                )\n              })\n            ],\n            2\n          ),\n          _vm._v(\" \"),\n          _vm._t(\"footer\")\n        ],\n        2\n      )\n    ]),\n    _vm._v(\" \"),\n    _c(\n      \"div\",\n      { staticClass: \"d-block d-md-none\" },\n      _vm._l(_vm.items, function(item, i) {\n        return _c(\n          \"div\",\n          {\n            key: \"row2-\" + item[_vm.header.key],\n            staticClass: \"border\",\n            on: {\n              click: function($event) {\n                return _vm.onSelectedRow(item)\n              }\n            }\n          },\n          [\n            _c(\n              \"div\",\n              { staticClass: \"p-1\", class: { \"b-left\": _vm.isSelected(item) } },\n              [\n                _vm._t(\n                  \"list\",\n                  function() {\n                    return _vm._l(_vm.header.columns, function(col) {\n                      return _c(\n                        \"div\",\n                        { staticClass: \"form-group row no-gutters\" },\n                        [\n                          _c(\"label\", { staticClass: \"col-5 col-form-label\" }, [\n                            _vm._v(_vm._s(col.title))\n                          ]),\n                          _vm._v(\" \"),\n                          _c(\"div\", { staticClass: \"col align-self-center\" }, [\n                            col.href\n                              ? _c(\n                                  \"a\",\n                                  {\n                                    staticClass: \"font-weight-bold\",\n                                    attrs: {\n                                      href: col.href(item[_vm.header.key])\n                                    }\n                                  },\n                                  [\n                                    _vm._v(\n                                      \"\\n                                \" +\n                                        _vm._s(item[col.field]) +\n                                        \"\\n                            \"\n                                    )\n                                  ]\n                                )\n                              : _c(\"span\", [\n                                  _vm._v(\n                                    \"\\n                                \" +\n                                      _vm._s(item[col.field]) +\n                                      \"\\n                            \"\n                                  )\n                                ])\n                          ])\n                        ]\n                      )\n                    })\n                  },\n                  { item: item, index: i }\n                )\n              ],\n              2\n            )\n          ]\n        )\n      }),\n      0\n    )\n  ])\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack://client/./ClientApp/_Core/Components/table-list.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					result = fn();
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkclient"] = self["webpackChunkclient"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor.bootstrap-vue","vendor.moment","vendor.axios","vendor.nprogress","vendor.bootstrap","vendor.vue-loader","vendor.vue","vendor.vue-observe-visibility","vendor.vue-moment","vendor.vue-functional-data-merge","vendor.portal-vue","vendor.popper.js","vendor.mapbox-gl","vendor.jquery"], () => (__webpack_require__(6236)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;