<script setup>
import { API } from 'aws-amplify'
import { createLocation } from '~/graphql/mutations'
import { locationsByDate } from '~/graphql/queries'
import { onCreateLocation } from '~/graphql/subscriptions'
import { mdiAccount, mdiMapMarker } from '@mdi/js'

const location = reactive({
  lat: null,
  lng: null,
  address: null,
  type: "Location"
});
const lastLocation = reactive({})
const { username, name } = useSharedUser()
const waitGetLatLng = ref(false);
const dialog = ref(false);

onMounted(async () => {
  await getLocations();
  subscribe();
})

definePageMeta({
  middleware: 'auth',
})

const getLatLng = () => {
  location.lat = null
  location.lng = null
  location.address = null

  waitGetLatLng.value = true
  dialog.value = true

  if (process.client) {
    if (!navigator.geolocation) {
      alert('現在地情報を取得できませんでした。お使いのブラウザでは現在地情報を利用できない可能性があります。')
      return
    }
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    }
    navigator.geolocation.getCurrentPosition(success, error, options)
  }
}

const success = async (position) => {
  location.lat = position.coords.latitude
  location.lng = position.coords.longitude
  const { data } = await useFetch(`/api/googlemapsapi?lat=${location.lat}&lng=${location.lng}`)
  location.address = data.value.address;
  waitGetLatLng.value = false;
}

const error = (error) => {
  switch (error.code) {
    case 1:   // PERMISSION_DENIED
      alert('位置情報の利用が許可されていません')
      break
    case 2:   // POSITION_UNAVAILABLE
      alert('現在位置が取得できませんでした')
      break
    case 3:   // TIMEOUT
      alert('タイムアウトになりました')
      break
    default:
      alert('現在位置が取得できませんでした')
      break 
  }
}

const saveLocation = async () => {
  dialog.value = false
  if (!location.lat || !location.lng) return false
  await API.graphql({
    query: createLocation,
    variables: { input: location },
  })

  location.lat = null
  location.lng = null
  location.address = null
}

const getLocations = async () => {
  const allLocations = await API.graphql({
    query: locationsByDate,
    variables: {type: "Location", sortDirection: "DESC"}
  });
  const [ myLocation ] = allLocations.data.locationsByDate.items;
  lastLocation.id = myLocation?.id;
  lastLocation.lat = myLocation?.lat;
  lastLocation.lng = myLocation?.lng;
  lastLocation.address = myLocation?.address;
}
const subscribe = () => {
  API.graphql({ query: onCreateLocation }).subscribe({
    next: (eventData) => {
      const myLocation = eventData.value.data.onCreateLocation
      lastLocation.id = myLocation.id;
      lastLocation.lat = myLocation.lat;
      lastLocation.lng = myLocation.lng;
      lastLocation.address = myLocation.address;
    },
  })
}
</script>

<template>
  <div>
    <Navbar />
    <v-sheet elevation="1" class="staff-info pa-3 mb-5 mx-auto">
      <div class="text-center mb-3">
        <span class="text-center"><v-icon class="account-icon" :icon="mdiAccount"></v-icon>社員情報</span>
      </div>
      <v-table density="compact">
        <tbody>
          <tr>
            <th class="head">社員番号</th>
            <td>{{ username }}</td>
          </tr>
          <tr>
            <th class="head">氏名</th>
            <td>{{ name }}</td>
          </tr>
          <tr>
            <th class="head">出勤先</th>
            <td>宮崎市役所</td>
          </tr>
          <tr>
            <th class="head">位置情報</th>
            <td class="watermelon"><b>{{ lastLocation.id ? "取得済" : "未取得" }}</b></td>
          </tr>
          <tr>
            <th class="head">補足</th>
            <td>{{ lastLocation.address ? `${lastLocation.address} （付近）` : "" }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-sheet>

    <div
      v-if="lastLocation.id"
      class="px-3 mb-5"
    >
      <GMap
        :lat="lastLocation.lat"
        :lng="lastLocation.lng"
        height="400"
      />
    </div>
    <div class="mb-3 text-center">
      <v-btn
        @click="getLatLng"
        class="mx-auto watermelon-bg"
        size="x-large"
      >
        {{ lastLocation.id ? "もう一度、現在地情報を取得する" :  "ココカラ出勤" }}
      </v-btn>
    </div>
    <p class="text-center">※ 現在の位置情報を取得します</p>
    <Footer />

    <!-- 現在地取得モーダル -->
    <v-dialog
      v-model="dialog"
      max-width="800"
    >
      <v-card>

        <div v-if="waitGetLatLng" class="px-10 py-10">
          <v-col
            class="text-subtitle-1 text-center"
            cols="12"
          >
            位置情報取得中
          </v-col>
          <v-col cols="6" class="mx-auto">
            <v-progress-linear
              color="red-accent-2"
              indeterminate
              rounded
              height="6"
            ></v-progress-linear>
          </v-col>
        </div>

        <div v-else>
          <v-card-title class="grey lighten-2">
            <v-icon class="map-marker-icon" :icon="mdiMapMarker"></v-icon><b>位置情報</b>
          </v-card-title>
          <v-divider></v-divider>

          <p class="px-4 py-2">{{ location.address }}（付近）</p>
          <v-divider></v-divider>

          <div class="px-4 py-2">
            <GMap
              :lat="location.lat"
              :lng="location.lng"
              height="300"
            />
          </div>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              class="watermelon-bg"
              block
              text
              size="x-large"
              @click="saveLocation"
            >
              ココで決定
            </v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn
              @click="getLatLng"
              class="mx-auto"
              block
            >
              もう一度取得し直す
            </v-btn>
          </v-card-actions>
        </div>

      </v-card>
    </v-dialog>

  </div>
</template>

<style lang="scss" scoped>
.staff-info {
  max-width: 500px;

  span {
    font-size: 1.2em;
    font-weight: bold;
    border-bottom: solid 5px #fa6e5990;
    padding: 2px 5px;
    .account-icon {
      font-size: 1.2em;
    }
  }

  .head {
    font-weight: bold;
    min-width: 120px
  }
}
.map-marker-icon {
  font-size: 1.2em;
  margin-top: -5px;
  margin-right: 8px;
  color: red;
}
</style>