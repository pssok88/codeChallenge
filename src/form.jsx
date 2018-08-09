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
        this.onSubmitReverse = this.onSubmitReverse.bind(this);
        this.onClick = this.onClick.bind(this);
        //this.reverse = this.reverse.bind(this);

    };

    componentDidMount() {

    };

    onFieldChange(event) {
        const target = event.target;
        //console.log("type: " + target.type)
        //const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const value = target.value;

        //var display = this.state.formInput.urlText !== '' ? "visible" : "hidden";

        //console.log(name, value);
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
        switch (name) {
            case "submitString":
                this.onSubmitReverse();
                break;
            case "submitUrl":
                this.onSubmitUrl();
                break;
            default: console.log("switch error");
        }
    }

    onSubmitReverse() {
        const response = fetch('/api/reverse?text=' + this.state.stringText)
            .then(function (response) {
                // The response is a Response instance.
                // You parse the data into a useable format using `.json()`
                return response.json();
            }).then((stringText) => {
                // `data` is the parsed version of the JSON returned from the above endpoint.
                var reversed = stringText.reversed;
                //console.log(reversed);
                this.setState({ reversed, stringText: "" }, () => { console.log(this.state.reversed) })
                //return reversed;
            });

    };

    onSubmitUrl() {
        //var endpoint = this.state.method === "GET" ? '/api?text=' : '/api/post?text=';
        switch (this.state.method) {
            case "GET":
                var endpoint = '/api?text=';
                //         const response = fetch('/api?text=' + this.state.urlText)
                //             .then(function (response) {
                //                 // The response is a Response instance.
                //                 // You parse the data into a useable format using `.json()`
                //                 return response.json();
                //             }).then((text) => {
                //                 // `data` is the parsed version of the JSON returned from the above endpoint.
                //                 //var reversed = urlText;
                //                 console.log(text.newText);
                //                 this.setState({ urlResponse: text.newText, urlText: "" })
                //                 //return reversed;
                //             });
                break;
            case "POST":
                var endpoint = '/api/post?text=';
                //         const postResponse = fetch('/api/post?text=' + this.state.urlText)
                //             .then(function (response) {
                //                 // The response is a Response instance.
                //                 // You parse the data into a useable format using `.json()`
                //                 return response.json();
                //             }).then((text) => {
                //                 // `data` is the parsed version of the JSON returned from the above endpoint.
                //                 //var reversed = urlText;
                //                 console.log(text.postResponse);
                //                 this.setState({ urlResponse: text.postResponse, urlText: "" })
                //                 //return reversed;
                //             });
                break;
            default: alert("Please Select Method")
                break;


        }
        if (this.state.urlText !== "") {
            const response = fetch(endpoint + this.state.urlText)
                .then(function (response) {
                    // The response is a Response instance.
                    // You parse the data into a useable format using `.json()`
                    return response.json();
                }).then((text) => {
                    // `data` is the parsed version of the JSON returned from the above endpoint.
                    this.setState({ urlResponse: text.newText, urlText: "" })
                    //return reversed;
                });
        }
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
                        <button style={{ marginLeft: "10px", visibility: this.state.stringText === "" ? "hidden" : "visible" }} className="btn btn-primary" type="button" name="submitString" onClick={this.onClick}>Submit</button>
                    </div>
                    <div className="form-group">
                        <label>
                            URL Text:
              <input className="form-control" type="text" name="urlText" value={this.state.urlText} onChange={this.onFieldChange} />
                        </label>
                        <button style={{ marginLeft: "10px", visibility: this.state.urlText === "" ? "hidden" : "visible" }} className="btn btn-warning" type="button" name="submitUrl" onClick={this.onClick}>Submit</button>

                    </div>
                    <div>
                        <label>HTTP Method
                        <select value={this.state.method} onChange={this.onDropChange}>
                                <option defaultValue="default">Select Method</option>
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                            </select></label>
                    </div>

                </form>
                <div style={{ marginTop: "20px", visibility: this.state.urlText === "" ? "hidden" : "visible" }}>
                    <div>
                        <h4 id="reverseString">Reversed String: {this.state.reversed}</h4>
                    </div>
                    <div>
                        <h4 id="urlString">Url Response: {this.state.urlResponse}</h4>
                    </div>
                </div>
            </div>
        )
    }

}

export default WebForm;

