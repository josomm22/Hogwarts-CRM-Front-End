import React, { createContext } from 'react';
// import { Inputboxes } from '../components/studentComponents';
import {postNewStudent} from '../api/api'

class Newstudentform extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            id: '',
            createdOn: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {

    };
    handleChange(event) {
        let change = {}
        console.log(event.target.value)
        change[event.target.id] = event.target.value
        this.setState(change)
    };
    handleSubmit(){
        const {firstName, lastName} = this.state;
        let newStudentObject = {firstName:firstName,lastName:lastName};
        postNewStudent(newStudentObject).then(response =>{
            console.log(response)
            const newStudent = response.new_student
            this.setState({
                firstName : newStudent.first_name,
                lastName : newStudent.last_name,
                createdOn: newStudent.date_created,
                id: newStudent.id,
            })

        })
    };
    render() {
        const { firstName, lastName, id, createdOn } = this.state;
        return (
            <div>
                <h1>Student Details</h1>
                <label for={'firstName'}>First Name: </label>
                <input type={'text'} id={'firstName'} value={firstName} onChange={this.handleChange.bind(this)} />
                <label for={'lastName'}>Last Name: </label>
                <input type={'text'} id={'lastName'} value={lastName} onChange={this.handleChange.bind(this)} />
                <br/>
                <label for={'createdOn'}>Created On: </label>
                <input type={'text'} id={'createdOn'} value={createdOn} onChange={this.handleChange.bind(this)} />
                <br/>
                <label for={'id'}>Student ID: </label>
                <input type={'text'} id={'id'} value={id} onChange={this.handleChange.bind(this)} />
                <br/>
                <button type='submit' onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
};

export default Newstudentform;