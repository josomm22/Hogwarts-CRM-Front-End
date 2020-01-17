import React from 'react';
import { getStudentData, getSkillzObject, getCoursesObject, editStudent } from '../api/api';
import Select from 'react-select';
import { Inputboxes, SkillzDropdown } from './studentComponents';
import '../css/studentform.css'
// import {loadStudentData} from '../api/loaders'

class studentObj {
    constructor(first_name, last_name, existing_skillz, desired_skillz, course_interests, id) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.existing_skillz = existing_skillz;
        this.desired_skillz = desired_skillz;
        this.course_interests = course_interests;
        this.id = id
    }
};

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
            skillOptions: null,
            courseOptions: null,
            isReadOnly: true,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.updateStudentData = this.updateStudentData.bind(this);

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
                    isLoading: false,
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
                this.setState({ skillOptions: newOptions })
            }
            )
    };
    convertToValueLabel(obj, type) {
        let option = {};
        option.value = obj[0];
        option.label = this.state[type][obj[0]];
        return option;


    };
    async loadCourses() {
        return await getCoursesObject()
            .then(result => {
                this.setState({ coursesArr: result })
                let newOptions = [];
                for (let [key, value] of Object.entries(result)) {
                    let option = {};
                    option.value = key;
                    option.label = value;
                    newOptions.push(option)
                };
                this.setState({ courseOptions: newOptions })
            }
            )
    };
    handleTextChange(event) {
        let change = {}
        change[event.target.id] = event.target.value
        this.setState(change)
    };
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
    updateStudentData() {
        const { firstName, lastName, desiredSkills, existingSkills, courseInterests, id } = this.state;
        let newStudentObject = new studentObj(firstName, lastName, existingSkills, desiredSkills, courseInterests, id)
        console.log(newStudentObject)
        editStudent(newStudentObject).then(response => {
            console.log(response)
            const details = response.student_details
            this.setState({
                updatedOn: details.last_updated,
            })

        })
    };
    render() {
        const { firstName, lastName, createdOn, updatedOn, studentID, isReadOnly, existingSkills, desiredSkills, courseInterests } = this.state;
        return (
            <div>
                <h1>Student Details</h1>
                <button onClick={
                    () => { this.setState({ isReadOnly: false }) }}>Edit</button>
                <button onClick={this.updateStudentData}>
                    Save
                </button>
                <div className='textArea'>

                    <Inputboxes
                        id={'firstName'}
                        readOnly={isReadOnly}
                        nameTag={'First Name'}
                        type={'text'}
                        value={firstName}
                        onChange={this.handleTextChange}
                    />
                    <Inputboxes
                        id={'lastName'}
                        readOnly={isReadOnly}
                        nameTag={'Last Name'}
                        type={'text'}
                        value={lastName}
                        onChange={this.handleTextChange}
                    />
                    <br />
                    <Inputboxes
                        id={'createdOn'}
                        readOnly={true}
                        nameTag={'Created On'}
                        type={'text'}
                        value={createdOn} />
                    <Inputboxes
                        id={'updatedOn'}
                        readOnly={true}
                        nameTag={'Updated on'}
                        type={'text'}
                        value={updatedOn} />
                    <br />
                    <Inputboxes
                        id={'id'}
                        readOnly={true}
                        nameTag={'Student ID'}
                        type={'text'}
                        value={studentID} />
                </div>
                <div className='skillsWrapper'>

                    <div className='existing skills'>
                        <h5>Current skills</h5>
                        {this.state.skillsArr
                            &&
                            this.state.studentData
                            &&
                            <ol>

                                {existingSkills.map((arr, i) =>
                                    <li key={i}>
                                        <SkillzDropdown
                                            index={i}
                                            isSearchable={true}
                                            isReadonly={isReadOnly}
                                            onChange={(event) => this.handleChange(event, i, 'existingSkills')}
                                            options={this.state.skillOptions}
                                            value={this.convertToValueLabel(arr, 'skillsArr')}
                                            arr={arr}
                                        />
                                    </li>
                                )}
                            </ol>
                        }
                    </div>
                    <div className='desired skills'>
                        <h5>Desired skills</h5>
                        {this.state.skillsArr
                            &&
                            this.state.studentData
                            &&
                            <ol>
                                {desiredSkills.map((arr, i) =>
                                    <li key={i}>
                                        <SkillzDropdown
                                            index={i}
                                            isSearchable={true}
                                            isReadonly={isReadOnly}
                                            onChange={(event) => this.handleChange(event, i, 'desiredSkills')}
                                            options={this.state.skillOptions}
                                            value={this.convertToValueLabel(arr, 'skillsArr')}
                                            arr={arr}
                                        />
                                    </li>
                                )}
                            </ol>
                        }
                    </div>
                </div>
                <div className='courseInterests'>
                    <h5>Course Interests</h5>
                    {this.state.coursesArr
                        &&
                        this.state.studentData
                        &&
                        <ol>

                            {courseInterests.map((arr, i) =>
                                <Select
                                    key={i}
                                    isSearchable={true}
                                    isDisabled={isReadOnly}
                                    onChange={(event) => this.handleChange(event, i, 'courseInterests')}
                                    options={this.state.courseOptions}
                                    value={this.convertToValueLabel(arr, 'coursesArr')}
                                />
                            )}
                        </ol>
                    }
                </div>
            </div>
        )
    };
}
export default Studendetails;