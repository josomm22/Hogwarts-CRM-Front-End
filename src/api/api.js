import axios from 'axios';

let baseUrl = 'https://guarded-coast-70205.herokuapp.com'
// let baseUrl = 'http://127.0.0.1:5000'

export function getTable() {
    const data = axios.get(baseUrl + '/students', {
    }).then(response => {
        // console.log('response is : ' + response.data)
        return response.data;
    }).then(data => {
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

export function getStudentData(studentID) {
    const studentData = axios.get(baseUrl + '/students/' + studentID, {
    }).then(response => {
        // console.log('response is : ' + response.data)
        return response.data;
    }).then(data => {
        // return data.student_details;
        return data.student_details

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
    return studentData
};
export function getSkillzObject() {
    const skillzObject = axios.get(baseUrl + '/curriculum/skills', {
    }).then(response => {
        // console.log('response is : ' + response.data)
        return response.data;
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
    return skillzObject
};
export function getCoursesObject() {
    const courseObject = axios.get(baseUrl + '/curriculum/courses', {
    }).then(response => {
        // console.log('response is : ' + response.data)
        return response.data;
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
    return courseObject
};

export function postNewStudent(object) {

    const studentObject = axios.post(baseUrl + '/students',
        object
    ).then(response => {
        // console.log('response is : ' + response.data)
        return response.data;
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
    return studentObject
}
export function editStudent(object) {
    console.log(object);
    const studentObject = axios.put(baseUrl + '/students/' + object.id, { object }).then(response => {
        // console.log('response is : ' + response.data)
        return response.data;
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
    return studentObject
}
export function getSummaryData() {
    const dataObject = axios.get(baseUrl + '/students/skillssummary', {
    }).then(response => {
        // console.log('response is : ' + response.data)
        return response.data;
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
    return dataObject
};

export function getTotals(dataArray, labelsObject){
    let labels = Object.values(labelsObject) 
    for (let i = 0; i < labelsObject.length;i++){

    }
}
// getTable();
// getStudentData(1001);