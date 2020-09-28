import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";
import { getCoordsFormAddress, getAddressFromCoords } from "./Utility/Location";


class PlaceFider {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");
    this.shareBtn = document.getElementById('share-btn')

    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    this.shareBtn.addEventListener('click', this.sharePlaceHandler.bind(this))
    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));

  }

  sharePlaceHandler() {
    const sharedLinkInput = document.getElementById('share-link')

    if (!navigator.clipboard) {
       sharedLinkInput.select()
      return

    }

    navigator.clipboard.writeText(sharedLinkInput.value)
    .then( ()=> {
      console.dir('Copy in buffer')

    })
    .catch( error => {
      console.log(error);
      sharedLinkInput.select()
    })

  }

  selectPlace(coordinates, address) {
    if (this.map) {
      this.map.render();
    } else {
      this.map = new Map(coordinates);
    }

    this.shareBtn.disabled = false;
    const sharedLinkInput = document.getElementById('share-link')
    sharedLinkInput.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`

  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      return;
    }

    const modal = new Modal(
      "loading-modal-content",
      "loading location please stand by!"
    );
    modal.show();

    navigator.geolocation.getCurrentPosition(
      async (successResult) => {
      
        const coordinates = {
          lat: successResult.coords.latitude + Math.random() / 50,
          lng: successResult.coords.longitude + Math.random() / 50,
        };
        const address = await getAddressFromCoords(coordinates)

        modal.hide();
           
        this.selectPlace(coordinates, address);
        
      },
      (error) => {
        modal.hide();
        console.log(error);
      }
    );
  }
  async findAddressHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector("input").value;
    if (!address || address.trim().length === 0) {
      console.log("Invalid address");
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "loading location please stand by!"
    );
    modal.show();
    try {
      const coordinates = await getCoordsFormAddress(address);
      this.selectPlace(coordinates, address);
    } catch (err) {
      console.log(err.message);
    }
    modal.hide()
  }
}

const placeFinder = new PlaceFider();
