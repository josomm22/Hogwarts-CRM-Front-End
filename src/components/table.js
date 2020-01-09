import React from 'react';
import { getTable } from '../api/api'

export class Students extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            students:[]
        };


    }
    componentDidMount(){
        this.getStudents()
    }

    async getStudents(){
        return  await getTable()
        .then(result=> 
            this.setState({students: result, isLoading: false})
            )
    }
    
    render(){
        const { students, isLoading} = this.state;

        return(
            <div>
                {isLoading && <h4>Loading...</h4>}
                {!isLoading && 
    students.map(obj => <h3>{obj.firstName} {obj.lastName} {obj.dateCreated} {obj.dateUpdated}</h3>)
                }
            </div>
        )
    }

}
// export default Students;