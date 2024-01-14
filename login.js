import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  setup() {
    const user = ref({
      username: '',
      password: '',
    });

    const login = () => {
      const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
      axios.post(api, user.value)
        .then((response) => {
          // console.log("res",response)
          console.log("res",response.data)
          const token = response.data.token;
          const expired = response.data.expired;

          document.cookie = `hexToken=${token};expires=${new Date(expired)}`;
          //將token和expires存入cookie
          window.location = 'products.html';
          //跳轉至products頁面
        })
        .catch((err) => {
          console.log('err',err)
          alert(err.data.message);
        });
    };

    return {
      user,
      login,
    };
  },
}).mount('#app');