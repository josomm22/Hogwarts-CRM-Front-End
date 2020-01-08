
let baseUrl = 'https://arcane-chamber-11355.herokuapp.com'
// let baseUrl = 'http://127.0.0.1:5000'

function getTable() {
    axios.get(baseUrl + '/students', {
    }).then(response => {
        // console.log('response is : ' + response.data)
        return response.data;
    }).then(data => {
        console.log(data.students);

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
};

getTable()