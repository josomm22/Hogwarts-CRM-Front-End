import React from 'react';
import { getTable } from '../api/api'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation,
    useRouteMatch,
    useParams
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
                    <tr>
                        <th>First Name</th>
                        <th>last Name</th>
                        <th>Date Created</th>
                        <th>Last Updated</th>
                        <th>Details</th>
                    </tr>
                    {isLoading &&
                            <tr>
                                <td>Loading... </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                            </tr>
                        
                    }
                    {!isLoading &&
                        students.map(obj =>
                            <tr>
                                <td>{obj.firstName} </td>
                                <td>{obj.lastName} </td>
                                <td>{obj.dateCreated} </td>
                                <td>{obj.dateUpdated} </td>
                                <td><Link to={'/studentdetails/'+obj.id} >details</Link></td>
                            </tr>
                        )
                    }
                </table>

            </div>
        )
    }

}
// export default Students;