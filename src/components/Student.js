import React from 'react';
import { getStudentData, getSkillzObject,getCoursesObject } from '../api/api';

class Studendetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            studentID: 1001,
            studentData: null,
            skillsArr: null,
            coursesArr: null,
        };

    };
    componentDidMount() {
        this.loadStudentData();
        this.loadSkills();
        this.loadCourses()
    }

    async loadStudentData() {
        return await getStudentData(1001)
            .then(result =>
                this.setState({ studentData: result, isLoading: false }))

    };
    async loadSkills() {
        return await getSkillzObject()
            .then(result =>
                this.setState({skillsArr:result}) )
    }
    async loadCourses() {
        return await getCoursesObject()
            .then(result =>
                this.setState({coursesArr:result}) )
    }

    fillTextBox(key) {
        if (this.state.isLoading == true) {
            return 'Loading...'
        }
        else {
            return this.state.studentData[key]
        }


    }
    render() {
        return (
            <div>
                <h1>Student Details</h1>
                <label htmlFor='firstName'>First Name</label>
                <input type='text' id='firstName' value={this.fillTextBox('first_name')} />
                <label htmlFor='lastName'>Last Name</label>
                <input type='text' id='lastName' value={this.fillTextBox('last_name')} />
                <br />
                <label htmlFor='createdOn'>Created On</label>
                <input type='text' id='createdOn' value={this.fillTextBox('date_created')} />
                <label htmlFor='updatedOn'>Updated on</label>
                <input type='text' id='updatedOn' value={this.fillTextBox('last_updated')} />
                <br />
                <label htmlFor='ID'>student ID</label>
                <input type='text' id='ID' value={this.fillTextBox('id')} />
        {this.state.skillsArr && <h2>{this.state.skillsArr[3]}</h2>}
        {this.state.coursesArr && <h2>{this.state.coursesArr[3]}</h2>}
            </div>
        )
    };
}
export default Studendetails;