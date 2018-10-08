export const loadGoogleMap = () => {
    if(!window.googleMapLoader){
      window.googleMapPromise = new Promise((resolve) => {
        window.googleMapLoader = () => {
          // Stop linter complaints 
          /* global google*/
          resolve(google);
          delete window.googleMapLoader;
        }
        loadMapScript();
      });
  }
   return window.googleMapPromise;
  }

  let loadMapScript = () => {
    const maps_script = document.createElement("script");
    const api_key = 'AIzaSyADBTO8EPakOj1iN6OtsHTLuzBOMXarVAE';
    maps_script.src = `https://maps.googleapis.com/maps/api/js?key=${api_key}&libraries=places&callback=googleMapLoader`;
    maps_script.async = true;
    maps_script.defer = true;
    document.body.appendChild(maps_script);
  }