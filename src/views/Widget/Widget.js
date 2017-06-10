import React, { Component } from 'react';
import Select from '../../components/Select';

class App extends Component {
    
    constructor() {
        super();
        this.state = {};
	//this.marketing = {};
	this.onChange = this.onChange.bind(this);
	this.onClick = this.onClick.bind(this);
    }

    
    onChange(event){
	
//        this.setState({value: event.target.value});
	fetch(`http://api.aws.toprater.io/marketplaces/${event.target.value}?fields=marketing`)
	    .then(response => response.json())
	    .then(json => {
	
		this.setState({
		    marketing: json.data.marketing
		});


	    });
    }
    
    onClick(event){
	console.log(this.state);
    }
    
    setDeepValue(obj, path, value) {
	var a = path.split('.');
	var o = obj;
	for (var i = 0; i < a.length - 1; i++) {
	    var n = a[i];
	    if (n in o) {
		o = o[n];
	    } else {
		o[n] = {};
		o = o[n];
	    }
	}
	o[a[a.length - 1]] = value;
    }
    
    
    handleChange(event) {
	var state =  this.state;
	var path = event.target.getAttribute("data-path");
	this.setDeepValue(state, path, event.target.value);
	this.setState({
	    marketing: state.marketing
	});
    }
    

    renderParams(title, path) {
	var setting = this.state;
	path.forEach(function(p){ setting = setting[p] }); 
	
	return (
	    <div className="col-md-6">
		<div className="card">
		    <div className="card-header">
			<strong>{title}</strong>
		    </div>
		    <div className="card-block">
			<form action="" className="form-horizontal">
			    <div className="form-group row">
				<label className="col-md-3 form-control-label">Кампания</label>
				<div className="col-md-9">
				    <input type="text" 
					value={setting.campaign}
					data-path={path.join(".")+".campaign"}
					className="form-control"
					onChange={this.handleChange.bind(this)} /> 
				</div>
			    </div>

			    <div className="form-group row">
				<label className="col-md-3 form-control-label">Сценарий</label>
				<div className="col-md-9">
				<input type="text" 
				    value={setting.scenario} 
				    data-path={path.join(".")+".scenario"}
				    className="form-control" 
				    onChange={this.handleChange.bind(this)} />
				</div>
			    </div>

			    <div className="form-group row">
				<label className="col-md-3 form-control-label">Включен</label>
				<div className="col-md-9">
				    <input type="checkbox" 
					checked={setting.enabled} 
					data-path={path.join(".")+".enabled"}
					className="form-control"  
					onChange={this.handleChange.bind(this)} />
				</div>
			    </div>

			    <div className="form-group row">
				<label className="col-md-3 form-control-label">Демо</label>
				<div className="col-md-9">
				    <input type="checkbox" 
					checked={setting.demo} 
					data-path={path.join(".")+".demo"}
					className="form-control"
					onChange={this.handleChange.bind(this)} />
				</div>
			    </div>

			    <div className="form-group row">
				<label className="col-md-3 form-control-label">Сплит-тестирование</label>
				<div className="col-md-9">
				    <input type="checkbox"  
					checked={setting.splitTest} 
					data-path={path.join(".")+".splitTest"}
					className="form-control"
					onChange={this.handleChange.bind(this)} />
				</div>
			    </div>
			    
			    <div className="form-group form-actions">
				<button type="submit" className="btn btn-sm btn-success float-right">Сохранить</button>
			    </div>
			</form>
		    </div>
		</div>
	    </div>
	    
	    
	  
	);
    }
    
    render() {	

	return (
	    <div className="row">
	    <div className="col-md-12">
		<Select onChange={this.onChange} />
	    </div>
	   
            {this.state.marketing &&
		
		this.renderParams("Интернет-магазин", ["marketing", "spheres", "@hpda", "web", "partner_page"])
	    }
	    {this.state.marketing &&
		this.renderParams("Страница-разработки", ["marketing", "spheres", "@hpda", "web", "dev_page"])
	    }
		    
	    {this.state.marketing &&
		Object.keys(this.state.marketing.spheres["@hpda"].plugin).map(function(key){
		    return this.renderParams(`Плагин [${key}]`, ["marketing", "spheres", "@hpda", "plugin", key])}.bind(this))
	    }

        </div>
	);
    }
}



class Widget extends Component {
  render() {
    return (
	<div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Basic Form</strong> Elements
              </div>
              <div className="card-block">
                <form action="" method="post" encType="multipart/form-data" className="form-2orizontal ">
                 

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Text Input</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" name="text-input" className="form-control" placeholder="Text"/>
                      <span className="help-block">This is a help text</span>
                    </div>
                  </div>


		  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Disabled Select</label>
                    <div className="col-md-9">
                      <select id="disabledSelect" className="form-control">
                        <option value="0">Please select</option>
                        <option value="1">Option #1</option>
                        <option value="2">Option #2</option>
                        <option value="3">Option #3</option>
                      </select>
                    </div>
                  </div>
		  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label">Checkboxes</label>
                    <div className="col-md-9">
                      <div className="checkbox">
                        <label htmlFor="checkbox1">
                          <input type="checkbox" id="checkbox1" name="checkbox1" value="option1"/> Option 1
                        </label>
                      </div>
                      <div className="checkbox">
                        <label htmlFor="checkbox2">
                          <input type="checkbox" id="checkbox2" name="checkbox2" value="option2"/> Option 2
                        </label>
                      </div>
                      <div className="checkbox">
                        <label htmlFor="checkbox3">
                          <input type="checkbox" id="checkbox3" name="checkbox3" value="option3"/> Option 3
                        </label>
                      </div>
                    </div>
                  </div>
		  
                </form>
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-sm btn-primary"><i className="fa fa-dot-circle-o"></i> Submit</button>
                <button type="reset" className="btn btn-sm btn-danger"><i className="fa fa-ban"></i> Reset</button>
              </div>
            </div>

         
          </div>
        </div>
    )
  }
}

export default App;
