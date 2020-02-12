import axios from 'axios';
import Vue from 'vue';
export default ({
    namespaced:  true,
    state : {
        adminUsers: [],
        paginationData: {},
        isGettingAdmins: false,
        isPostingAdmin: false,
        postAdminSuccess: false,
    },
    mutations : {
        FETCH_ADMIN_SUCCESS(state, adminData) {
            state.adminUsers = adminData.data;
            state.paginationData = adminData.meta;
        },
        IS_GETTING_ADMIN(state, isgetting) {
            state.isGettingAdmins = isgetting;
        },
        IS_POSTING_ADMIN(state, isPosting) {
            state.error = {};
            state.isPostingAdmin = isPosting;
        },
        CREATE_ADMIN_SUCCESS(state, userData) {
            state.adminUsers.push(userData);
            state.postAdminSuccess = true;
        },
        EDIT_ADMIN_SUCCESS(state, data) {
            const targetIdex = state.adminUsers.findIndex(user => user.id === data.id);
            Vue.set(state.adminUsers, state.adminUsers[targetIdex], data)
            state.adminUsers[targetIdex] = data;
            state.postAdminSuccess = true;
        },
        RESET_POST_ADMIN_STATUS(state) {
            state.postAdminSuccess = false;
        },
        UPDATE_USER_STATUS(state, data) {
            const targetIdex = state.adminUsers.findIndex(user => user.id === data.userId);
            state.adminUsers[targetIdex].status = data.newStatus;
        }
    },
    actions : {
        fetchAdmins({commit}, page=null) {
            const link = page ? `creditor?page=${page}` : 'creditor';
            commit('IS_GETTING_ADMIN', true)
            axios.get(link).then((res) => {
                commit('IS_GETTING_ADMIN', false);
                commit('FETCH_ADMIN_SUCCESS', res.data);
            })
        },
        createAdmin({commit}, userData) {
            commit('IS_POSTING_ADMIN', true);
            axios.post('creditor', userData)
                .then(function (res) {
                    commit('IS_POSTING_ADMIN', false);
                    commit('CREATE_ADMIN_SUCCESS', res.data.data);
                })
                .catch(function () {
                    commit('IS_POSTING_ADMIN', false);
                });
        },
        editAdmin({commit}, userData) {
            commit('IS_POSTING_ADMIN', true);
            axios.patch('creditor/' + userData.userId, userData)
                .then(function (res) {
                    commit('IS_POSTING_ADMIN', false);
                    commit('EDIT_ADMIN_SUCCESS', res.data.data);
                })
                .catch(function () {
                    commit('IS_POSTING_ADMIN', false);
                });
        },
        resetPostingStatus({commit}) {
            commit('RESET_POST_ADMIN_STATUS');
        },
        updateUserStatus({commit}, data) {
            commit('UPDATE_USER_STATUS', {userId: data.id, newStatus: data.newStatus});
        }
    }
});