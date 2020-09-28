import { Map } from './UI/Map'
class LoadedPlace {
  constructor(coordinates, address) {
      new Map(coordinates)
      const headerTitleElement = document.querySelector('header h1')
      headerTitleElement.textContent = address;
  }
}


const url = new URL(location.href)
const queryParams = url.searchParams;

// const coords = {
//   lat: +queryParams.get('lat'),
//   lng: +queryParams.get('lng')
// }
//
// const address = queryParams.get('address')

const locId = queryParams.get('location')
fetch('http://localhost:3000/location/' + locId)
    .then(response => {
        if (response.status === 404) {
            throw new Error('Could not find location!')
        }

        return response.json();
    })
    .then(data => {
        new LoadedPlace(data.coordinates, data.address)
    }).catch( error => {
        console.dir(error.message)
})



