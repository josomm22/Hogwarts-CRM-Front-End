import axios from 'axios';

let baseUrl = 'https://arcane-chamber-11355.herokuapp.com'
// let baseUrl = 'http://127.0.0.1:5000'

export function getTable() {
    const data = axios.get(baseUrl + '/students', {
    }).then(response => {
        // console.log('response is : ' + response.data)
        return response.data;
    }).then(data => {
        console.log(data.students);
        return data.students;

    }).catch(function (error) {
        if (error.response) {
            console.log(error.response.headers);
        }
        else if (error.request) {
            console.log(error.request);
        }
        else {
            console.log(error.message);
        }
        console.log(error.config);
    });
    return data
};

export function getStudentData(studentID){
    const studentData = axios.get(baseUrl + '/students/' + studentID, {
    }).then(response => {
        // console.log('response is : ' + response.data)
        return response.data;
    }).then(data => {
        console.log(data.student_details);
        // return data.student_details;
        return data.student_details

    }).catch(function (error) {
        if (error.response) {
            console.log(error.response.headers);
            return error.response.headers
        }
        else if (error.request) {
            console.log(error.request);
            return error.request

        }
        else {
            console.log(error.message);
            return error.message

        }
        console.log(error.config);
        return error.config
    });
    return studentData
};

// getTable();
// getStudentData(1001);