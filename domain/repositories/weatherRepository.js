const { CustomHttpClient } = require('./../../shared');
const { Weather } = require('./../value-objects');

const CWB_URI = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001';
const AUTH_TOKEN = 'CWB-C8D69614-7493-4C72-9F04-E20FE2ED3D8E';
const FBC_LID = 'IwAR26Kz5bEl1PGB6Ac5RsGnvyKyP2pXvg9c1aeGeoYOcoNv5JCMq550IYTdE';

const WEATHERS = [];

const _getAll = async () => {
    const opt = {
        uri: `${CWB_URI}?Authorization=${AUTH_TOKEN}&fbclid=${FBC_LID}`
    }
    let result = await CustomHttpClient.TryGet(opt);
    result = typeof result === 'string' ? JSON.parse(result) : result;
    // console.log(result);
    if (!result.success) {
        return Promise.reject(new Error('Query weather fail'));
    }
    if (!result.records.location || !Array.isArray(result.records.location) || result.records.location.length === 0) {
        console.log(`Query result count is zero`);
        return Promise.resolve(WEATHERS);
    }
    for (const x of result.records.location) {
        const wxSection = x.weatherElement.find(y => y.elementName === 'Wx');
        if (!wxSection) {
            continue;
        }
        const timeObject = wxSection.time && wxSection.time.length > 0 ? wxSection.time[0] : null;
        if (!timeObject) {
            console.log(`Not found time object`);
            continue;
        }

        const weatherObject = new Weather();
        weatherObject.locationName = x.locationName;
        weatherObject.description = timeObject.parameter.parameterName;


        const minTSection = x.weatherElement.find(y => y.elementName === 'MinT');
        const minTTimeObject = minTSection.time && minTSection.time.length > 0 ? minTSection.time[0] : null;

        const maxTSection = x.weatherElement.find(y => y.elementName === 'MaxT');
        const maxTTimeObject = maxTSection.time && maxTSection.time.length > 0 ? maxTSection.time[0] : null;

        const tempStr = `${minTTimeObject ? minTTimeObject.parameter.parameterName : 0} ~ ${maxTTimeObject ? maxTTimeObject.parameter.parameterName : 0}`

        weatherObject.temperature = tempStr;
        

        WEATHERS.push(weatherObject);

    }

    return Promise.resolve(WEATHERS);
}

const _findByLocation = async (locationName) => {
    if (WEATHERS.length === 0) {
        await _getAll();
    }
    const d = WEATHERS.find(x => x.locationName === locationName);

    return Promise.resolve(d);

}

exports.GetAll = _getAll;
exports.FindByLocation = _findByLocation;
