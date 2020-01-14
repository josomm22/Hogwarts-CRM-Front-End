import React from 'react';
import { getStudentData, getSkillzObject, getCoursesObject } from '../api/api';
// import Select from 'react-select';
import { Inputboxes, Skillbox } from './studentComponents';



class Studendetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            studentID: this.props.match.params.id,
            studentData: null,
            skillsArr: null,
            coursesArr: null,
            selectedOption: null,
        };

    };
    componentDidMount() {
        // const id = this.props.match.params.id
        this.loadStudentData(this.state.studentID);
        this.loadCourses()
    }

    async loadStudentData(id) {
        return await getStudentData(id)
            .then(result =>
                this.setState({ studentData: result, isLoading: false }))
            .then(this.loadSkills())


    };
    async loadSkills() {
        return await getSkillzObject()
            .then(result =>
                this.setState({ skillsArr: result }))
    }
    async loadCourses() {
        return await getCoursesObject()
            .then(result =>
                this.setState({ coursesArr: result }))
    }

    fillTextBox(key) {
        if (this.state.isLoading == true) {
            return 'Loading...'
        }
        else {
            return this.state.studentData[key]
        }
    };
    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };
    render() {

        return (
            <div>
                <h1>Student Details</h1>
                <Inputboxes id={'firstName'} readOnly={true} nameTag={'First Name'} type={'text'} value={this.fillTextBox('first_name')} />
                <Inputboxes id={'lastName'} readOnly={true} nameTag={'Last Name'} type={'text'} value={this.fillTextBox('last_name')} />
                <br />
                <Inputboxes id={'createdOn'} readOnly={true} nameTag={'Created On'} type={'text'} value={this.fillTextBox('date_created')} />
                <Inputboxes id={'updatedOn'} readOnly={true} nameTag={'Updated on'} type={'text'} value={this.fillTextBox('last_updated')} />
                <br />
                <Inputboxes id={'ID'} readOnly={true} nameTag={'Student ID'} type={'text'} value={this.fillTextBox('id')} />

                <div>
                    <h5>Current skills</h5>
                    {this.state.skillsArr
                        &&
                        this.state.studentData
                        &&
                        <ol>

                            {this.state.studentData.existing_skillz.map(arr =>
                                <li>{this.state.skillsArr[arr[0]]} {arr[1]}/5</li>
                            )}
                        </ol>
                    }
                </div>
                <div>
                    <h5>Desired skills</h5>
                    {this.state.skillsArr
                        &&
                        this.state.studentData
                        &&
                        <ol>

                            {this.state.studentData.desired_skillz.map(arr =>
                                <li>{this.state.skillsArr[arr[0]]} {arr[1]}/5</li>
                            )}
                        </ol>
                    }
                </div>
                <div>
                    <h5>Course Interests</h5>
                    {this.state.coursesArr
                        &&
                        this.state.studentData
                        &&
                        <ol>

                            {this.state.studentData.course_interests.map(arr =>
                                <li>{this.state.coursesArr[arr]}</li>
                            )}
                        </ol>
                    }
                </div>
            </div>
        )
    };
}
export default Studendetails;