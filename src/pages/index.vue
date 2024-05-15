<script setup>
import { Authenticator, translations, useAuthenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import { I18n, Auth } from "aws-amplify";
I18n.putVocabularies(translations);
I18n.setLanguage("ja");

// カスタマイズマニュアル https://ui.docs.amplify.aws/vue/connected-components/authenticator/customization
I18n.putVocabularies({
  ja: {
    Username: '社員番号',
    'Enter your Username': '社員番号を入力',
    'User does not exist.': '登録されてません',
    'Incorrect username or password.': '社員番号もしくはパスワードに誤りがあります'
  },
});

const auth = useAuthenticator();
const dialog = ref(false);
const { setUsername, setName } = useSharedUser()

const setUserState = (username, name) => {
  setUsername(username)
  setName(name)
}

const start = () => {
  if (auth.authStatus == 'authenticated') {
    setUserState(auth.user.username, auth.user?.attributes.name);
    return navigateTo('location');
  } else {
    dialog.value = true;
  }
}

const services = {
  async handleSignIn(formData) {
    const { username, password } = formData;
    return Auth.signIn({
        username,
        password,
      }).then((user) => {
        setUserState(user.username, user.attributes.name);
        return navigateTo('location');
      })
  },
};
</script>

<template>
  <div>
    <v-row class="box" justify="center" align-content="center">

      <v-col>
        <v-card class="brand bg-white rounded-xl elevation-2 pa-8 text-center mx-auto mb-8 mt-n10">
          <img
            alt="kokokokara"
            src="@/assets/images/favicon.png"
            width="150"
          />
          <p class="watermelon app-subtitle mt-5 mb-n3">通勤距離始点登録アプリ</p>
          <p class="watermelon app-name">ココカラ</p>
          <v-btn 
            block
            rounded="xl"
            size="x-large"
            class="watermelon-bg mt-8"
            @click="start"
            >
            始める
          </v-btn>
        </v-card>
        <p class="text-center">
          © 2023 OMC Co., Ltd.
        </p>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <Authenticator :hide-sign-up="true" :services="services">
        <template v-slot:sign-in-header>
          <h3 class="text-grey-darken-1 text-center pt-5">ログイン</h3>
        </template>
      </Authenticator>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
  .box {
    height: 100vh;
    background-image: linear-gradient(135deg, rgba(251, 213, 251, 0.15), rgba(149, 233, 243, 0.15));
  }

  .brand {
    max-width: 300px;
  }

  .start-btn {
    max-width: 300px;
  }

  .app-name {
    font-family: Murecho;
    font-size: 3em;
    font-weight: 900;
  }
  
  .app-subtitle {
    font-family: Murecho;
    font-weight: bold;
    font-size: 1.04em;
  }
</style>
