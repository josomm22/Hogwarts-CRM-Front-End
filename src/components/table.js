import React from 'react';
import { getTable } from '../api/api'
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";


export class Students extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            students: []
        };


    }
    componentDidMount() {
        this.getStudents()
    }

    async getStudents() {
        return await getTable()
            .then(result =>
                this.setState({ students: result, isLoading: false })
            )
    }

    render() {
        const { students, isLoading } = this.state;

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>last Name</th>
                            <th>Date Created</th>
                            <th>Last Updated</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    {isLoading &&
                        <tbody>
                            <tr>
                                <td>Loading... </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                            </tr>
                        </tbody>

                    }
                    {!isLoading &&
                        students.map((obj,i) =>
                        <tbody key={i}>
                            <tr key={i}>
                                <td>{obj.firstName} </td>
                                <td>{obj.lastName} </td>
                                <td>{obj.dateCreated} </td>
                                <td>{obj.dateUpdated} </td>
                                <td><Link to={'/studentdetails/' + obj.id} >details</Link></td>
                            </tr>
                        </tbody>
                        )
                    }
                </table>

            </div>
        )
    }

}
// export default Students;