import React, { createContext } from 'react';
// import { Inputboxes } from '../components/studentComponents';
import Select from 'react-select';
import { getStudentData, getSkillzObject, getCoursesObject, editStudent } from '../api/api';
import { postNewStudent } from '../api/api'

class Newstudentform extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            id: '',
            createdOn: '',
            existingSkills: [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1]],
            desiredSkills: [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1]],
            courseInterests: [[1, 0], [1, 0]],
            skillsArr: null,
            coursesArr: null,
            selectedOption: null,
            skillOptions: null,
            courseOptions: null,
            isReadOnly: false,
        }
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        this.loadSkills();
        this.loadCourses();

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
        console.log(event.target.value)
        change[event.target.id] = event.target.value
        this.setState(change)
    };
    handleSelectChange(selectedOption, i, array) {
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
    handleSubmit() {
        const { firstName, lastName } = this.state;
        let newStudentObject = { firstName: firstName, lastName: lastName };
        postNewStudent(newStudentObject).then(response => {
            console.log(response)
            const newStudent = response.new_student
            this.setState({
                firstName: newStudent.first_name,
                lastName: newStudent.last_name,
                createdOn: newStudent.date_created,
                id: newStudent.id,
            })

        })
    };
    convertToValueLabel(obj, type) {
        let option = {};
        if (!obj) {
            option = { value: 0, label: 'select' }
        }
        else {
            option.value = obj[0];
            option.label = this.state[type][obj[0]];
        }
        return option;


    };
    render() {
        const { firstName, lastName, createdOn, updatedOn, id, isReadOnly, existingSkills, desiredSkills, courseInterests } = this.state;

        return (
            <div>
                <h1>Student Details</h1>
                <label for={'firstName'}>First Name: </label>
                <input type={'text'} id={'firstName'} value={firstName} onChange={this.handleTextChange.bind(this)} />
                <label for={'lastName'}>Last Name: </label>
                <input type={'text'} id={'lastName'} value={lastName} onChange={this.handleTextChange.bind(this)} />
                <br />
                <label for={'createdOn'}>Created On: </label>
                <input type={'text'} readOnly={true} id={'createdOn'} value={createdOn} onChange={this.handleTextChange.bind(this)} />
                <br />
                <label for={'id'}>Student ID: </label>
                <input type={'text'} readOnly={true} id={'id'} value={id} onChange={this.handleTextChange.bind(this)} />
                <br />
                <button type='submit' onClick={this.handleSubmit}>Submit</button>
                <div>
                    <h5>Current skills</h5>
                    {this.state.skillsArr
                        &&
                        <ol>

                            {existingSkills.map((arr, i) =>
                                <li>
                                    <Select
                                        isSearchable={true}
                                        isDisabled={isReadOnly}
                                        onChange={(event) => this.handleSelectChange(event, i, 'existingSkills')}
                                        options={this.state.skillOptions}
                                        value={this.convertToValueLabel(arr, 'skillsArr')}
                                    />
                                    <input
                                        type={'number'}
                                        onChange={(event) => this.handleSelectChange(event, i, 'existingSkills')}
                                        step={1}
                                        min={1}
                                        max={5}
                                        readOnly={isReadOnly}
                                        value={arr[1]}
                                        index={i}
                                    />
                                </li>
                            )}
                        </ol>
                    }
                </div>
                <div>
                    <h5>Desired skills</h5>
                    {this.state.skillsArr
                        &&
                        <ol>

                            {desiredSkills.map((arr, i) =>
                                <li>
                                    <Select
                                        isSearchable={true}
                                        isDisabled={isReadOnly}
                                        onChange={(event) => this.handleSelectChange(event, i, 'desiredSkills')}
                                        options={this.state.skillOptions}
                                        value={this.convertToValueLabel(arr, 'skillsArr')}
                                    />
                                    <input
                                        type={'number'}
                                        onChange={(event) => this.handleSelectChange(event, i, 'desiredSkills')}
                                        step={1}
                                        min={1}
                                        max={5}
                                        readOnly={isReadOnly}
                                        value={arr[1]}
                                        index={i}
                                    />
                                </li>
                            )}
                        </ol>
                    }
                </div>
                <div>
                    <h5>Course Interests new</h5>
                    {this.state.coursesArr
                        &&
                        <ol>

                            {courseInterests.map((arr, i) =>
                                <Select
                                    isSearchable={true}
                                    isDisabled={isReadOnly}
                                    onChange={(event) => this.handleSelectChange(event, i, 'courseInterests')}
                                    options={this.state.courseOptions}
                                    value={this.convertToValueLabel(arr, 'coursesArr')}
                                />
                            )}
                        </ol>
                    }
                </div>
            </div>
        )
    }
};

export default Newstudentform;