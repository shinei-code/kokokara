const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${query.lat},${query.lng}&language=ja&key=${config.apiSecret}`;
  const res = await fetch(url);
  const resData = await res.json();
  const formatted_address = resData.results[0].formatted_address
  const address = formatted_address.replace("日本、", "")

  return {
    address: address
  }
})