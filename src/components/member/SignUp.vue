<template>
    <div>
        <form>
            이메일 <input type="text" v-model="signUpForm.email" /> <br />
            비밀번호 <input type="text" v-model="signUpForm.password" /> <br />
            비밀번호 확인 <input type="text" v-model="signUpForm.passwordCheck" /> <br />
            닉네임 <input type="text" v-model="signUpForm.nickname" /> <br />
            이름 <input type="text" v-model="signUpForm.name" /> <br />
            생년월일 <input type="text" v-model="signUpForm.birthday" /> <br />
            남/여 (m/w) <input type="text" v-model="signUpForm.sex" /> <br />
            주소 <input type="text" v-model="signUpForm.address" /> <br />

            <button type="submit" @click="handleSignUp">등록</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

const signUp = async (signUpForm) => {
    const res = await axios.post('/members/signup', signUpForm, {
        withCredentials: true,
    });

    console.log(res.data);
    return res.data;
};

export default {
    data() {
        return {
            signUpForm: { email: '', password: '', passwordCheck: '', nickname: '', name: '', sex: '', birthday: '', address: '' },
        };
    },
    methods: {
        handleSignUp: function (e) {
            e.preventDefault();
            signUp(this.signUpForm)
                .then(() => {
                    this.$router.push('/signin');
                })
                .catch((error) => {
                    console.error(error);
                    alert('오류가 발생했습니다.');
                });
        },
    },
};
</script>

<style scoped>
input {
    border: 2px solid steelblue;
}
</style>
