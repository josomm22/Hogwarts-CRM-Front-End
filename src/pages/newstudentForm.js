import React from 'react';
import { Inputbox, SkillzDropdown } from '../components/studentComponents';
import Select from 'react-select';
import { getSkillzObject, getCoursesObject } from '../api/api';
import { postNewStudent } from '../api/api'
import '../css/studentform.css'


class studentObj {
    constructor(first_name, last_name, existing_skillz, desired_skillz, course_interests, id) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.existing_skillz = existing_skillz;
        this.desired_skillz = desired_skillz;
        this.course_interests = course_interests;
    }
};

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
        const { firstName, lastName, desiredSkills, existingSkills, courseInterests, id } = this.state;
        let newStudentObject = new studentObj(firstName, lastName, existingSkills, desiredSkills, courseInterests)
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
        const { firstName, lastName, createdOn, id, isReadOnly, existingSkills, desiredSkills, courseInterests } = this.state;

        return (
            <div className='studentDetails'>
                <h1>Student Details</h1>
                <div className='textArea'>
                    <div className='firstLastName'>

                        <Inputbox
                            id={'firstName'}
                            readOnly={isReadOnly}
                            nameTag={'First Name'}
                            type={'text'}
                            value={firstName}
                            onChange={this.handleTextChange} />
                        <Inputbox
                            id={'lastName'}
                            readOnly={isReadOnly}
                            nameTag={'Last Name'}
                            type={'text'}
                            value={lastName}
                            onChange={this.handleTextChange} />
                    </div>
                    <div className='dates'>
                        <Inputbox
                            id={'createdOn'}
                            readOnly={true}
                            nameTag={'Created On'}
                            type={'text'}
                            value={createdOn} />
                    </div>                <Inputbox
                        id={'id'}
                        readOnly={true}
                        nameTag={'Student ID'}
                        type={'text'}
                        value={id} />
                    <button className='btn' type='submit' onClick={this.handleSubmit}>Submit</button>
                </div>
                <div className='skillsWrapper'>

                    <div className='existing skills'>
                        <h5>Current skills</h5>
                        {this.state.skillsArr
                            &&
                            <ol>

                                {existingSkills.map((arr, i) =>
                                    <li>
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
                            <ol>

                                {desiredSkills.map((arr, i) =>
                                    <li>
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