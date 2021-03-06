const WIKI_API_URL = "https://en.wikipedia.org/w/api.php";

// Use Cors Anywhere to by-pass the CORS limitation on Wikipedia's Service
const CORS_ANYWHERE_API = "https://cors-anywhere.herokuapp.com"

let getGeoSearchUrlforLocation = (lat, lng, limit, thumbnailSize) => {
  //Using a package would have been great otherwise it looks ugly like this  
  return encodeURI(`${CORS_ANYWHERE_API}/${WIKI_API_URL}/?action=query&prop=coordinates|pageimages|pageterms&colimit=${limit}&piprop=thumbnail&pithumbsize=${thumbnailSize}&pilimit=${limit}&wbptterms=description&generator=geosearch&ggscoord=${lat}|${lng}&ggsradius=10000&ggslimit=${limit}&format=json`);
}

export const getPlacesInfo = (location, limit = 50, thumbnailSize = 400) => {
  let targetUrl = getGeoSearchUrlforLocation(location.lat, location.lng, limit, thumbnailSize);
  return fetch(targetUrl, {
    method: 'GET',
    headers: {
      'Origin': null
    }
  }).then(res => res.json());
}

export const getWikiPediaUrl = (pageId) => { return `https://en.wikipedia.org/?curid=${pageId}` }