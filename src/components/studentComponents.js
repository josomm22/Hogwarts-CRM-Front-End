import React from 'react';
import Select from 'react-select';


export const Inputboxes = props => {
    return (
        <div>
            <label for={props.id}>{props.nameTag}: </label>
            <input type={props.type} id={props.id} value={props.value} />
        </div>
    )
};




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

