import React from 'react'
import PropTypes from 'prop-types'
import { Pie, Bar as BarChart } from 'react-chartjs-2'
import { getSummaryData } from '../api/api'


export class SkillzPie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,

        };
    };
    componentDidMount() {
        this.loadData()
    }
    async loadData() {
        return await getSummaryData()
            .then(result =>
                this.setState({
                    data: result
                })

            );
    }
    render() {
        // const [dataset] = this.state
        return (
            <div>
                <h2>Average Level per Skill</h2>
                <Pie
                    data={this.state.data}
                    width={600}
                    height={400}
                    options={{ maintainAspectRatio: false }}
                />
            </div>
        )
    }
}


export const Chart = ({ datasets }) => {
    return (
        <BarChart
            data={datasets}
            width={600}
            height={400}
            options={{
                maintainAspectRatio: false
            }}
        />
    )
}

Chart.propTypes = {
    datasets: PropTypes.object,
}

Chart.defaultProps = {
    datasets: {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
        datasets: [
            {
                label: '# of Votes - A',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: '#36404D',
                borderColor: '#36404D',
                borderWidth: 2,
                hoverBackgroundColor: '#75D9FD',
                hoverBorderColor: '#75D9FD',
            },
            {
                label: '# of Votes - B',
                data: [5, 30, 3, 8, 14, 2],
                backgroundColor: '#74B649',
                borderColor: '#74B649',
                borderWidth: 2,
                hoverBackgroundColor: '#75FDB5',
                hoverBorderColor: '#75FDB5',
            }
        ]
    }
}
