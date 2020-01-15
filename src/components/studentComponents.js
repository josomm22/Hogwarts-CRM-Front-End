import React from 'react';
import Select from 'react-select';


export const Inputboxes = props => {
    return (
        <div>
            <label for={props.id}>{props.nameTag}: </label>
            <input type={props.type} readOnly={props.readOnly} id={props.id} value={props.value} onChange={props.onChange} />
        </div>
    )
};
export const SkillzDropdown = props => {
    return (
        <div>
            <Select
            isSearchable={true}
            isDisabled={props.isReadonly}
            onChange={(event) => props.onChange(event, props.index, 'existingSkills')}
            options={props.options}
            value={props.value}
            />
            <input
            type={'number'}
            onChange={(event) => props.onChange(event, props.index, 'existingSkills')}
            step={1}
            min={1}
            max={5}
            readOnly={props.isReadonly}
            value={props.arr[1]}
            index={props.index}
            />
        </div>
    )
}




// export class Skillbox extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             selectedOption: null,
//             options: null,
//             isDisabled: false,
//         };

//     };
//     componentDidMount(){
//         this.setState({selectedOption:this.props.selected, options:this.props.options})
//     };
//     handleChange = selectedOption => {
//         this.setState({ selectedOption });
//         console.log(`Option selected:`, selectedOption);
//     };
//     render() {
//         const { selectedOption, options } = this.state;

//         return(
//             <Select
//             value={selectedOption}
//             onChange={this.handleChange}
//             options={options}
//             defaultInputValue={'popo'}
//             />
//             )
//     };
// }

