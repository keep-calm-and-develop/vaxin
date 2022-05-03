import axios from 'axios';

const SERVER = "https://cdn-api.co-vin.in/api";

export const getStates = () => axios.get(`${SERVER}/v2/admin/location/states`)

export const getDistricts = (stateCode) => axios.get(`${SERVER}/v2/admin/location/districts/${stateCode}`);

export const findByPin = (pincode, date) => axios.get(`${SERVER}/v2/appointment/sessions/public/findByPin`, {
    params: {
        pincode,
        date,
    }
});

export const findByDistrict = (district_id, date) => axios.get(`${SERVER}/v2/appointment/sessions/public/findByDistrict`, {
    params: {
        district_id,
        date,
    }
});

export const findCalendarByDistrict = (district_id, date) => axios.get(`${SERVER}/v2/appointment/sessions/public/calendarByDistrict`, {
    params: {
        district_id,
        date,
    }
});

export const findCalendarByPin = (pincode, date) => axios.get(`${SERVER}/v2/appointment/sessions/public/calendarByPin`, {
    params: {
        pincode,
        date,
    }
});
