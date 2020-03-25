import React, { Component } from 'react';
import { Card, Input, Button } from 'antd';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { compile, derivative } from 'mathjs';

const { Content } = Layout;
const InputStyle = {
    background: "white",
    color: "#ffa31a",
    fontWeight: "bold",
    fontSize: "24px",
    textAlign: 'center',
    marginLeft: "40%",
};
var y, error, exact;
class Central_Divided_Differences extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            x: 0,
            h: 0,
            degree: 0,
            showOutputCard: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    API = async () => {
        var response = await axios.get('http://localhost:3001/api/users/showBackward_Divided2').then(res => { return res.data })
        this.setState({
            fx: response['data'][0]['fx'],
            degree: response['data'][0]['degree'],
            x : response['data'][0]['x'],
            h: response['data'][0]['h'],
        }); 
        alert(
            "Fx : "+ this.state.fx+"    "+
            "degree : "+ this.state.degree+"    "+
            "x : "+ this.state.x+"    "+
            "h : "+ this.state.h
        );
        this.centralh(this.state.x,this.state.h,this.state.degree) 
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    centralh(x, h, degree) {
        switch (degree) {
            case 1:
                y = (this.func(x+(1*h)) - this.func(x-(1*h))) / (2*h)
                break;
            case 2:
                y = (this.func(x+(1*h)) - 2*this.func(x) + this.func(x-(1*h))) / Math.pow(h, 2)
                break;
            case 3:
                y = (this.func(x+(2*h)) - 2*this.func(x+(1*h)) + 2*this.func(x-(1*h)) - this.func(x-(2*h))) / (2*Math.pow(h, 3))
                break;
            default:
                y = (this.func(x+(2*h)) - 4*this.func(x+(1*h)) + 6*this.func(x) - 4*this.func(x-(1*h)) + this.func(x-(2*h))) / Math.pow(h, 4) 
        }
        exact = this.funcDiff(x, degree)
        error = Math.abs((y - exact) / y)*100
        this.setState({
            showOutputCard: true
        })
    }

    func(X) {
        var expr = compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }
    funcDiff(X, degree) {
        var temp = this.state.fx, expr 
        for (var i=1 ; i<=degree ; i++) {
            temp = derivative(temp, 'x')
            expr = temp
        }
        
        let scope = {x:parseFloat(X)}
        return expr.eval(scope)
    }
    render() {
        return (
            <div >
                <div
                    onChange={this.handleChange}
                    style={{
                        padding: '50px',
                        background: "#1b1b1b",
                        width: '100%',
                    }}
                >
                    <div
                        style={{
                            width: 500,
                        }}
                    >
                        <h2 style={{ marginLeft: "40%" }}>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                        <h2 style={{ marginLeft: "40%" }}>Order derivative</h2><Input size="large" name="degree" style={InputStyle}></Input>
                        <h2 style={{ marginLeft: "40%" }}>X</h2><Input size="large" name="x" style={InputStyle}></Input>
                        <h2 style={{ marginLeft: "40%" }} >H</h2><Input size="large" name="h" style={InputStyle}></Input>
                        <br/><br/>
                        <Button id="submit_button" onClick= {
                                ()=>this.centralh(parseFloat(this.state.x), parseFloat(this.state.h), parseInt(this.state.degree))
                            } 
                            style={{ background: "#ffa31a", color: "black", fontSize: "20px", marginLeft: "40%" }}>Submit <br></br></Button>

                        {/*API  */}
                        <br /><br />
                        <Button id="API" onClick={
                            () => this.API()
                        }
                            style={{ background: "#ffa31a", color: "black", fontSize: "20px", marginLeft: "40%" }}>API <br></br></Button>
                    </div>

                    <br /><br />
                    {this.state.showOutputCard &&

                        <Card
                            style={{ borderRadius: "10px" }}
                        >
                            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                                Approximate = {y}<br/>
                                Exact = {exact.toFixed(8)}<br/>
                                Error(ε) = {error.toFixed(4)}%<br/>
                            </p>
                        </Card>
                    }
                    <br /><br />
                </div>
            </div>
        );
    }
}
export default Central_Divided_Differences;

