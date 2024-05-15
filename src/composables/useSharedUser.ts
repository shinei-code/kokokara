import type { Ref } from 'vue'

export const useSharedUser = () => {
  const username = useState('username', () => null)
  const name = useState('name', () => null)

  const setUsername = (username: Ref<string>) => (value: string) => {
    username.value = value;
  }
  const setName = (name: Ref<string>) => (value: string) => {
    name.value = value;
  }

  const initUser = (username: Ref<string>) => () => {
    username.value = null;
    name.value = null;
  }

  return {
    username: readonly(username),
    name: readonly(name),
    setUsername: setUsername(username),
    setName: setName(name),
    initUser: initUser(username, name),
  }
}
