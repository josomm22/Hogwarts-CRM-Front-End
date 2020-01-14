import React from 'react';
import { getStudentData, getSkillzObject, getCoursesObject } from '../api/api';
import Select from 'react-select';
import { Inputboxes, Skillbox } from './studentComponents';


class Studendetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            studentID: this.props.match.params.id,
            studentData: null,
            firstName: null,
            lastName: null,
            existingSkills: null,
            desiredSkills: null,
            courseInterests: null,
            skillsArr: null,
            coursesArr: null,
            selectedOption: null,
            options: null,
        };
        this.handleChange = this.handleChange.bind(this);

    };
    componentDidMount() {
        this.loadStudentData(this.state.studentID);
        this.loadCourses()
    }

    async loadStudentData(id) {
        return await getStudentData(id)
            .then(result =>
                this.setState({
                    studentData: result,
                    firstName: result.first_name,
                    lastName: result.last_name,
                    createdOn: result.date_created,
                    updatedOn: result.last_updated,
                    existingSkills: result.existing_skillz,
                    desiredSkills: result.desired_skillz,
                    courseInterests: result.course_interests,
                    id: result.id,
                    isLoading: false
                }))
            .then(this.loadSkills())


    };
    async loadSkills() {
        return await getSkillzObject()
            .then(result => {
                this.setState({ skillsArr: result })
                let newOptions = [];
                for (let [key, value] of Object.entries(result)) {
                    let option = {};
                    option.value = key;
                    option.label = value;
                    newOptions.push(option)
                };
                this.setState({ options: newOptions })
            }
            )
    }
    convertToValueLabel(obj) {
        let option = {};
        option.value = obj[0];
        option.label = this.state.skillsArr[obj[0]];
        return option;


    }
    async loadCourses() {
        return await getCoursesObject()
            .then(result =>
                this.setState({ coursesArr: result }))
    }

    handleChange(selectedOption, i, array) {
        if (selectedOption.value) {
            console.log('index is ' + i + 'value is ' + selectedOption.value);
            let oldArr = this.state[array]
            let oldVal = oldArr[i]
            oldVal[0] = parseInt(selectedOption.value)
            oldArr[i] = oldVal
            this.setState({ array: oldArr })

        } else {
            console.log('index is ' + i + 'value is ' + selectedOption.target.value)
            let oldArr = this.state[array]
            let oldVal = oldArr[i]
            oldVal[1] = parseInt(selectedOption.target.value)
            oldArr[i] = oldVal
            this.setState({ array: oldArr })
        }

    };
    render() {
        const { firstName, lastName, createdOn, updatedOn, id, existingSkills, desiredSkills, courseInterests } = this.state;
        return (
            <div>
                <h1>Student Details</h1>
                <Inputboxes id={'firstName'} readOnly={true} nameTag={'First Name'} type={'text'} value={firstName} />
                <Inputboxes id={'lastName'} readOnly={true} nameTag={'Last Name'} type={'text'} value={lastName} />
                <br />
                <Inputboxes id={'createdOn'} readOnly={true} nameTag={'Created On'} type={'text'} value={createdOn} />
                <Inputboxes id={'updatedOn'} readOnly={true} nameTag={'Updated on'} type={'text'} value={updatedOn} />
                <br />
                <Inputboxes id={'id'} readOnly={true} nameTag={'Student ID'} type={'text'} value={id} />

                <div>
                    <h5>Current skills</h5>
                    {this.state.skillsArr
                        &&
                        this.state.studentData
                        &&
                        <ol>

                            {existingSkills.map((arr, i) =>
                                <li>
                                    <Select
                                        onChange={(event) => this.handleChange(event, i, 'existingSkills')}
                                        options={this.state.options}
                                        value={this.convertToValueLabel(arr)}
                                    />
                                    <input type={'number'} onChange={(event) => this.handleChange(event, i, 'existingSkills')} step={1} min={1} max={5} readOnly={false} value={arr[1]} index={i}
                                    />
                                </li>
                            )}
                        </ol>
                    }
                </div>
                <div>
                    <h5>Desired Skills</h5>
                    {this.state.skillsArr
                        &&
                        this.state.studentData
                        &&
                        <ol>

                            {desiredSkills.map((arr, i) =>
                                <li>
                                    <Select
                                        onChange={this.handleChange}
                                        options={this.state.options}
                                        value={this.convertToValueLabel(arr, 0)}
                                    />
                                    <input type={'number'} step={1} readOnly={true} value={arr[1]} />
                                </li>
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

                            {courseInterests.map(arr =>
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