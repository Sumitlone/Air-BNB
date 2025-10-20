// Guard against missing geometry on legacy listings
const hasCoordinates = Array.isArray(listing?.geometry?.coordinates) && listing.geometry.coordinates.length === 2;
if (!hasCoordinates) {
  console.warn("Listing has no coordinates; skipping map render", listing?._id || "unknown");
  const mapEl = document.getElementById("map");
  if (mapEl) {
    mapEl.style.display = "none";
  }
} else {
  maptilersdk.config.apiKey = mapToken;
  const map = new maptilersdk.Map({
    container: "map", // container's id or the HTML element in which the SDK will render the map
    style: maptilersdk.MapStyle.STREETS,
    center: listing.geometry.coordinates, // starting position [lng, lat]
    zoom: 12, // starting zoom
  });

  const marker = new maptilersdk.Marker({ color: "red" })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
      new maptilersdk.Popup({ offset: 25 }).setHTML(
        `<h4>${listing.title}</h4><p>Exact location will be provided after booking</p>`
      )
    )
    .addTo(map);
}
