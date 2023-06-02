const request = require('request')

const forecast = (latitude, longitude, units, callback) => {
    const weatherstack_key = '8a2ab65d73b085afe6d77b05e876a281'
    const url_weatherstack = `http://api.weatherstack.com/current?access_key=${weatherstack_key}&query=${latitude},${longitude}&units=${units}`

    request({ url: url_weatherstack, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to access weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const temperature = body.current.temperature
            const feelsLike = body.current.feelslike
            const description = body.current.weather_descriptions[0]
            const data = `${description}. It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees out`
            callback(undefined, data)
        }
    })
}

module.exports = forecast