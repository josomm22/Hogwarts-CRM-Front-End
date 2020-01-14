import React from 'react'
import { getStudentData, getSkillzObject, getCoursesObject, editStudent } from '../api/api';



export async function loadStudentData(id) {
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
        // .then(loadSkills())


};
// async function loadSkills() {
//     return await getSkillzObject()
//         .then(result => {
//             this.setState({ skillsArr: result })
//             let newOptions = [];
//             for (let [key, value] of Object.entries(result)) {
//                 let option = {};
//                 option.value = key;
//                 option.label = value;
//                 newOptions.push(option)
//             };
//             this.setState({ skillOptions: newOptions })
//         }
//         )
// }