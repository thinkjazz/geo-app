const GOOGLE_API_KEY = 'AIzaSyAQr6EPOVEeIQwiykSWmnnY2caIUuNAc1w';

export async function getAddressFromCoords(coords) {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_API_KEY}`)

  if (!response.ok) {

    throw new Error('Failed to fetch address maps data')
  }

  const data = await response.json()

  if (data.error_message) {

    throw new Error(data.error_message)
  }

  const address = data.results[0].formatted_address;
  return address
}


export async function getCoordsFormAddress(address) {
  const urlAddress = encodeURI(address);
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_KEY}`)

  if (!response.ok) {

    throw new Error('Failed to fetch coordinates maps data')
  }

  const data = await response.json()

  if (data.error_message) {

    throw new Error(data.error_message)
  }
  
  const coordinates = data.results[0].geometry.location;
  return coordinates;

}