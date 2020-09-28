export class Map {
  constructor(coords) {
      // this.coordinates = coords;
      this.render(coords)

  }

  render(coordinates) {
    if(!google) {
      console.log('Error in loading Google map');
      return;
    }

    const map = new google.maps.Map(document.getElementById('map'), {
      center:coordinates,
      zoom: 16
    
    });

    new google.maps.Marker({
      position:coordinates,
      map: map
    })
  }
}