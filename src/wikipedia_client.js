const WIKI_API_URL = "https://en.wikipedia.org/w/api.php";

// Use Cors Anywhere to by-pass the CORS limitation on Wikipedia's Service
const CORS_ANYWHERE_API = "https://cors-anywhere.herokuapp.com"

let getGeoSearchUrlforLocation = (lat, lng, limit, thumbnailSize) => {
  //Using a package would have been great otherwise it looks ugly like this  
  return encodeURI(`${CORS_ANYWHERE_API}/${WIKI_API_URL}/?action=query&prop=coordinates|pageimages|pageterms&colimit=${limit}&piprop=thumbnail&pithumbsize=${thumbnailSize}&pilimit=${limit}&wbptterms=description&generator=geosearch&ggscoord=${lat}|${lng}&ggsradius=10000&ggslimit=${limit}&format=json`);
}

export const getPlacesInfo = (lat, lng, limit = 50, thumbnailSize = 144) => {
  let targetUrl = getGeoSearchUrlforLocation(lat, lng, limit, thumbnailSize);
  console.log(`Generating against following url ${targetUrl}`)
  return fetch(targetUrl, {
    method: 'GET',
    headers: {
      'Origin': null
    }
  }).then(res => res.json());
}

