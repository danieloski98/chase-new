import PropTypes from "prop-types"
import GoogleMapReact from "google-map-react"
import { Icon } from "@iconify/react"
import locationIcon from "@iconify/icons-mdi/map-marker"
import "./map.css"

const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
)

LocationPin.propTypes = {
  text: PropTypes.string,
}

const Map = ({ location, zoomLevel }) => (
  <div className="map">
    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={`${location.location} ${location.city}`}
        />
      </GoogleMapReact>
    </div>
  </div>
)

Map.propTypes = {
  location: PropTypes.object,
  zoomLevel: PropTypes.number,
}

export default Map
