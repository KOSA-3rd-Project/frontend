<template>
    <div>
        <form>
            이메일 <input type="text" v-model="signInForm.email" /> <br />
            비밀번호 <input type="text" v-model="signInForm.password" /> <br />
            <button type="submit" @click="handleSignIn">로그인</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';

const signIn = async (signInForm) => {
    const res = await axios.post('/members/signin', signInForm, {
        withCredentials: true,
    });

    return res.data;
};

export default {
    data() {
        return {
            signInForm: { email: '', password: '' },
        };
    },
    computed: {
        ...mapGetters({
            member_info: 'member/getMemberInfo',
        }),
    },
    methods: {
        handleSignIn: function (e) {
            e.preventDefault();
            signIn(this.signInForm)
                .then((result) => {
                    const memberInfo = {
                        access_token: result,
                        member_info: { member_id: this.signInForm.email, login_check: true },
                    };

                    this.login(memberInfo);

                    this.$router.push('/');
                })
                .catch((error) => {
                    console.error(error);
                    alert('저장 중 오류가 발생했습니다.');
                });
        },

        ...mapActions({ login: 'member/login', logout: 'member/logout' }),
    },
};
</script>

<style scoped>
input {
    border: 2px solid steelblue;
}
</style>
