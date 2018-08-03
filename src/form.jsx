import React from 'react';


export class WebForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stringText: "",
            urlText: "",
            reversed: "",
            urlResponse: "",
            method: ""
        }
        this.onFieldChange = this.onFieldChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClick = this.onClick.bind(this);
        //this.reverse = this.reverse.bind(this);

    };

    componentDidMount() {

    };

    onFieldChange(event) {
        const target = event.target;
        console.log("type: " + target.type)
        //const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const value = target.value;

        //var display = this.state.formInput.urlText !== '' ? "visible" : "hidden";

        console.log(name, value);
        this.setState({
            ...this.state,
            [name]: value

        });
    }

    onDropChange = (event) => {
        var method = event.target.value
        this.setState({ method })
    }

    onClick(event) {
        const target = event.target;
        const name = target.name;

        var fieldClicked = name === "submitString" ? "stringText" : "urlText";
        this.onSubmit(fieldClicked);
    }

    onSubmit = () => {

        const response = fetch('/api/reverse?text=' + this.state.stringText)
            .then(function (response) {
                // The response is a Response instance.
                // You parse the data into a useable format using `.json()`
                return response.json();
            }).then(function (stringText) {
                // `data` is the parsed version of the JSON returned from the above endpoint.
                var reversed = stringText.reversed;
                console.log(reversed);
                this.setState({ stringText: reversed })
                //return reversed;

            });
        console.log(response)
        // var request = require('request');
        // request('/api/reverse', function (error, response, body) {
        //     console.log(body);
        //     // if (!error && response.statusCode === 200) {
        //     //     console.log(body);
        //     // }
        // })
        // var request = require('request');
        // request({ url: 'api/reverse?text=' + this.state.formInput.stringText }, function (error, response, body) {
        //     if (!error && response.statusCode === 200) {
        //         var info = JSON.parse(body);
        //         console.log(info);
        //     }
        // })

        //insert api call to return url


        // this.setState({
        //     ...this.state,
        //     formInput: {
        //         ...this.state.formInput,
        //         [field]: ''
        //     }
        // });
        // field === "stringText" ? this.reverse(this.state.formInput.stringText) : this.urlResponse(field);

    };

    // reverse(text) {
    //     var reversed = [];

    //     for (var i = text.length - 1; i >= 0; i--) {
    //         reversed.push(text[i])
    //     }
    //     reversed.join("");
    //     this.setState({ reversed });
    // };

    urlResponse(field) {

        var urlResponse = field === "GET" ? "URL Posted" : "URL Retrieved";
        this.setState({ urlResponse });
    }


    render() {
        return (
            <div style={{ marginLeft: "40%" }}>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous" />

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>
                            String Text:
              <input className="form-control" type="text" name="stringText" value={this.state.stringText} onChange={this.onFieldChange} />
                        </label>
                        <button style={{ marginLeft: "10px" }} className="btn btn-primary" type="button" name="submitString" onClick={this.onClick}>Submit</button>
                    </div>
                    <div className="form-group">
                        <label>
                            URL Text:
              <input className="form-control" type="text" name="urlText" value={this.state.urlText} onChange={this.onFieldChange} />
                        </label>
                        <button style={{ marginLeft: "10px" }} className="btn btn-warning" type="button" name="submitUrl" onClick={this.onClick}>Submit</button>

                    </div>
                    <div id="methodDisplay">
                        <label>HTTP Method

                        <select value={this.state.method} onChange={this.onDropChange}>
                                <option defaultValue="default">Select Method</option>
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                            </select></label>
                    </div>

                </form>
                <div>
                    <h4 id="reverseString">Reversed String: {this.state.reversed}</h4>
                </div>
                <div>
                    <h4 id="urlString">Url Response: {this.state.urlResponse}</h4>
                </div>

            </div>
        )
    }

}

export default WebForm;

