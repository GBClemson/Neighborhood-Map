
// These are the places that will be shown to the user.
// Normally we'd have these in a database instead.
var locations = [
    {
        title: 'Lower Whitewater Falls',        
        location: {lat: 35.0133098, lng: -82.9980538},
        photoID: 'AF1QipO1UH7_GFoRM5EzrJajTyHQxstEeXOiaH8Vienk',
        placeID: 'ChIJ81kg6vj9WIgRgQxEy6yg2_I',
        address: 'Bad Creek Rd, Salem, SC ',
        zip: '29676',
        hikeTime: 60,
        hikeLength: 2,
        hikeDifficulty: 'Moderate'
    },{
        title: 'Spoonauger Falls',
        location: {lat: 34.9745326, lng: -83.1183495},
        photoID: 'AF1QipP014dgvT3FM87aUC-SJJ9xEw137HJQ9bUX5SrA',
        placeID: 'ChIJ8e6qbh3jWIgRuUTP6Qs-d1A',
        address: 'Burrells Ford Rd, Mountain Rest, SC ',
        zip: '29664',
        hikeTime: 20,
        hikeLength: 0.5,
        hikeDifficulty: 'Easy'

    },{
        title: 'King Creek Falls',
        location: {lat: 34.9662002, lng: -83.1112616},
        photoID: 'AF1QipMN1cYX3Py0K7pu1oi8bXlKaegdDgqtAtGZlAJ5',
        placeID: 'ChIJrfDTyhrjWIgRzVZlcEoEdtE',
        address: 'Burrells Ford Rd, Mountain Rest, SC ',
        zip: '29664',
        hikeTime: 30,
        hikeLength: 0.5,
        hikeDifficulty: 'Moderate'
    },{
        title: 'Twin Falls',
        location: {lat: 35.0095023, lng: -82.8236754},
        photoID: 'AF1QipOnWy2mLVowvMBOlgYPnZ9_CnsMTiuWNGJcG7rD',
        placeID: 'ChIJYY3j1lWrWYgRceGY6q0IJVM',
        address: 'Water Falls Rd, Sunset, SC ',
        zip: '29685',
        hikeTime: 10,
        hikeLength: 0.25,
        hikeDifficulty: 'Easy'      
    },{
        title: 'Issaqueena Falls',
        location: {lat: 34.8068906, lng: -83.1236677},
        photoID: 'AF1QipPKA4_daWWiLH0upw3K2BnnKiMTNeK-tUThCuiu',
        placeID: 'ChIJf0AH5anvWIgRj8h7b81lEAU',
        address: 'Stumphouse Tunnel Rd, Walhalla, SC ',
        zip: '29691',
        hikeTime: 10,
        hikeLength: 0.1,
        hikeDifficulty: 'Easy'
    },{
        title: 'Whitewater Falls',
        location: {lat: 35.0297152, lng: -83.0162675},
        photoID: 'AF1QipPG90kv1Yrr9SYmSCR7usGTVa4ZYoUKhA6XDvg',
        placeID: 'ChIJmYK9fWoCWYgRTW6d6Su1exE',
        address: 'Cashiers, NC ',
        zip: '28717',
        hikeTime: 60,
        hikeLength: 2,
        hikeDifficulty: 'Moderate'
    },{
        title: 'Raven Cliff Falls',
        location: {lat: 35.1056726, lng: -82.6609606},
        photoID: 'AF1QipPpGfCamQHIkCZBbPgNCeWHjrekPD5WVGyaBAx4',
        placeID: 'ChIJs4cRkdC2WYgR6AH22upq6_k',
        address: 'Greer Hwy, Cleveland, SC ',
        zip: '29635',
        hikeTime: 120,
        hikeLength: 2.2,
        hikeDifficulty: 'Moderate'
    },{
        title: 'Long Creek Falls',
        location: {lat: 34.7776277, lng: -83.3122659},
        photoID: 'AF1QipOI0jDpKC2LA_NhoyzPkoeZ-wQz06grS90xl2E',
        placeID: 'ChIJrWdaKN3DWIgRmexrzimbnwY',
        address: 'Turkey Ridge Rd, Long Creek, SC ',
        zip: '29658',
        hikeTime: 60,
        hikeLength: 1.5,
        hikeDifficulty: 'Moderate'
    },{
        title: 'Rainbow Falls',
        location: {lat: 35.1339385, lng: -82.5904839},
        photoID: 'AF1QipNC7z5UsOKeCPQuBndwZsxkkMFS60TQ8nFqEMvq', //PREVIOUS VALUE: AF1QipPiEgbLTBT9v-1bVQjdG4Hz9WlRpdVC8wtXd5WA
        placeID: 'ChIJi7lK8rm3WYgRgR-GYVbDF3c',
        address: '303 Jones Gap RD, Marietta, SC ',
        zip: '29661',
        hikeTime: 120,
        hikeLength: 2.5,
        hikeDifficulty: 'Difficult'
    },{
        title: 'Falls Creek Falls',
        location: {lat: 35.1397479, lng: -82.5398809},
        photoID: 'AF1QipPNX3DXVIYXYfLrpiKNFLGHifi-pMMGCDUaTUsz',
        placeID: 'ChIJC8CuiWrIWYgRdOvmEHJ7GLk',
        address: 'Marietta, SC ',
        zip: '29661',
        hikeTime: 60,
        hikeLength: 1.5,
        hikeDifficulty: 'Moderate'
    },{
        title: 'Reedy Branch Falls',
        location: {lat: 34.8073464, lng: -83.2811918},
        photoID: 'AF1QipOFqA7fowaGyvVpU9j_fctIogtntHbBH02V9IE7',
        placeID: 'ChIJ3w2JSFjCWIgRrTGho8rmQTA',
        address: '15760 Long Creek Hwy, Mountain Rest, SC ',
        zip: '29664',
        hikeTime: 10,
        hikeLength: 0.1,
        hikeDifficulty: 'Easy'
    },{
        title: 'Station Cove Falls',
        location: {lat: 34.8570984, lng: -83.0880399},
        photoID: 'AF1QipNYjrWa1uga8eTYEHK7w6FAP28bY8UMGQImIoWw',
        placeID: 'ChIJw8jAEU_lWIgRvwmbs4csyCQ',
        address: 'Oconee Station Rd, Walhalla, SC ',
        zip: '29691',
        hikeTime: 30,
        hikeLength: 1.0,
        hikeDifficulty: 'Easy'
    },{
        title: 'Yellow Branch Falls',
        location: {lat: 34.7950693, lng: -83.1341676},
        photoID: 'AF1QipPb2jntwPH8oiITlW8wDLFDZP6Cv4jO7Jue1b1f',
        placeID: 'ChIJMVmcXQHvWIgRt0kXIOHhPV4',
        address: '3023 SC-28, Walhalla, SC ',
        zip: '29691',
        hikeTime: 45,
        hikeLength: 1.5,
        hikeDifficulty: 'Easy'
    },{
        title: 'Brasstown Falls',
        location: {lat: 34.7181635, lng: -83.3037698},
        photoID: 'AF1QipOkCSzkrGmEG9SgzIZAVMwS8EYcEjK2fjcOCty0',
        placeID: 'ChIJifxfsfzAWIgR7qFCpA3jhe0',
        address: 'Brasstown Creek, Westminster, SC ',
        zip: '29693',
        hikeTime: 30,
        hikeLength: 0.5,
        hikeDifficulty: 'Moderate'
    }
];
