const request = require('request')

const geocode = (address, callback) => {
    const positionstack_key = '914debc462dcae2e48fc2de110970f47'
    location = encodeURIComponent(address)
    url_positionstack = `http://api.positionstack.com/v1/forward?access_key=${positionstack_key}&query=${location}`

    request({ url: url_positionstack, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services')
        } else if (body.error) {
            callback('You must provide an address!')
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].name,
                region: body.data[0].region,
                country: body.data[0].country
            })
        }
    })
}

module.exports = geocode