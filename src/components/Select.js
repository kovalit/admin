import React, { Component } from 'react';

class Select extends Component {
    
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    componentDidMount() {
	fetch(`http://api.aws.toprater.io/marketplaces`)
	    .then(response => response.json())
	    .then(json => {
		this.setState({
		    data: json.data,
		});

	    });
    }
    
    render() {	
	var option = this.state.data.map(function(data, index) {
	    return (
		    <option key={index} value={data.id}>{data.label}</option>
		);
	    });

	return (
	    <div className="form-group row">
		<label className="col-md-2 form-control-label" htmlFor="select">Интернет магазин</label>
		<div className="col-md-4">
		   <select onChange={this.props.onChange} className="form-control">{option}</select>
		</div>
	      </div>
		
	    
	);
    }
}

export default Select;
