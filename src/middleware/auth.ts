import { useAuthenticator } from "@aws-amplify/ui-vue";
const auth =  useAuthenticator();
const { username, name, setUsername, setName } = useSharedUser()

export default defineNuxtRouteMiddleware( async () => {
  if (auth.authStatus == 'authenticated') {
    
    if (!(username.value && name.value)) {
      setUsername(auth.user.username)
      setName(auth.user.attributes.name)
    }
  } else {
    return navigateTo('/');
  }
})