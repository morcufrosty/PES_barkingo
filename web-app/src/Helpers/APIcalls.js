
const link = "http://10.4.41.164/api/"

export async function  getOfferImageFromServer(id) {
    return fetch( link + `offers/${id}/image`, {
        method: 'GET',
        headers: {
            Accept: '*',
            'x-access-token': localStorage.getItem("api_token")
        }
    }).then((response => { return response.text() }))

}



export async function getProfileImageFromServer( id) {
    return fetch(link + `/users/${id}/image`, {
        method: 'GET',
        headers: {
            Accept: '*',
            'x-access-token': localStorage.getItem("api_token")
        }
    }).then((response => { return response.text() }))

}



export async function getUserInfo( id) {
    return fetch(link + `/users/${id}`, {
        method: 'GET',
        headers: {
            Accept: '*',
            'x-access-token': localStorage.getItem("api_token")
        }
    }).then((response) => response.json())
    .then((responseJson) => {
        return responseJson;
    }).catch((error) => {
        console.error(error);
    });

}


  export async function getDogOffers() {
    return fetch(link + 'offers/all', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("api_token")
        }
    }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson.offers;
        }).catch((error) => {
            console.error(error);
        });
  }



  export async function getAllUsers() {
    return fetch(link + 'users/all', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("api_token")
        }
    }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson.offers;
        }).catch((error) => {
            console.error(error);
        });
  }



 
export async function deleteOffer(id) {
    return fetch(link + `/offers/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: '*',
            'x-access-token': localStorage.getItem("api_token")
        }
    }).then((response) => response.json())
    .then((responseJson) => {
        return responseJson;
    }).catch((error) => {
        console.error(error);
    });

}

