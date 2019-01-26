const { CustomHttpClient } = require('./../../shared');
const { ParkingInfo } = require('./../value-objects');

const CALL_URI = 'https://data.tycg.gov.tw/api/v1/rest/datastore/27d2edc9-890e-4a42-bcae-6ba78dd3c331?format=json';
const ALL_PARKING_INFO = [];

const _initParkingInfomation = async () => {
    ALL_PARKING_INFO.length = 0;
    const opt = {
        uri: CALL_URI
    }
    let result = await CustomHttpClient.TryGet(opt);
    result = typeof result === 'string' ? JSON.parse(result) : result;
    if (!result.success) {
        return Promise.reject(new Error('Query parking infomation fail'));
    }
    result.result.records.map(x => {
        const p = new ParkingInfo();
        p.roadName = x.rd_name;
        p.totalParkingCount = x.rd_count
        p.usedParkingCount = x.use_cnt;
        p.paymentDescription = x.tp_name;

        ALL_PARKING_INFO.push(p);
    });

    return Promise.resolve(ALL_PARKING_INFO);
}

const _findByName = async (roadName = '') => {
    if (!roadName || roadName.length === 0) {
        return Promise.reject(new Error(`Road name must not be empty`));
    }
    if (ALL_PARKING_INFO.length === 0) {
        await _initParkingInfomation();
    }
    const p = ALL_PARKING_INFO.find(x => x.roadName === roadName);

    return Promise.resolve(p);
}

exports.initialParkingData = _initParkingInfomation;
exports.findByRoadName = _findByName;