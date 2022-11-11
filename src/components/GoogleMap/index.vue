<template>
  <div class="google-map" :id="mapName"></div>
</template>
<script>
import { getClaimed } from '@/api/asset'

export default {
  name: 'googleMap',
  props: ['name'],
  data() {
    return {
      mapName: this.name + '-map',
      map: null,
      bounds: null,
      markers: [],
      markerCoordinates: []
    }
  },
  methods: {
    fetchData() {
      return getClaimed()
        .then(response => {
          return response.map(res => {
            return { latitude: res.claimed_lat, longitude: res.claimed_lng }
          })
        })
        // console.dir(this.markerCoordinates)
    }
  },
  async mounted() {
    this.markerCoordinates = await this.fetchData()
    this.bounds = new google.maps.LatLngBounds()

    const element = document.getElementById(this.mapName)
    const options = {
      zoom: 2,
      center: new google.maps.LatLng(0, 0)
    }
    this.map = new google.maps.Map(element, options)
    // console.dir(this.markerCoordinates)

    this.markerCoordinates.forEach((coord) => {
      // console.log(`latitude: ${coord.latitude}, longitude: ${coord.longitude}`)
      const position = new google.maps.LatLng(coord.latitude, coord.longitude)
      const marker = new google.maps.Marker({ position })
      this.markers.push(marker)
      this.map.fitBounds(this.bounds.extend(position))
    })

    new MarkerClusterer(this.map, this.markers, { imagePath: '/static/images/m' })
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.google-map {
  width: 100%;
  height: 600px;
  margin: 0 auto;
  background: gray;
}
</style>