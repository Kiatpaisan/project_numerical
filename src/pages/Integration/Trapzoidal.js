import React, { Component } from 'react'
import { Layout, Input, Button, Card, Table } from 'antd';
import 'antd/dist/antd.css';
import { compile } from 'mathjs';
import axios from 'axios';
var Algebrite = require('algebrite')

const InputStyle = {
    background: "white",
    color: "#ffa31a",
    fontWeight: "bold",
    fontSize: "24px",
    textAlign: 'center',
    marginLeft: "40%",
};
var I, exact, error;

class Trapzoidal extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            a: 0,
            b: 0,
            showOutputCard: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    API = async () => {
        var response = await axios.get('http://localhost:3001/api/users/showTrapzoidal').then(res => { return res.data })
        this.setState({
            fx: response['data'][0]['fx'],
            a: response['data'][0]['LBL'],
            b: response['data'][0]['LBH'],
        }); 
        alert(
            "Fx : "+ this.state.fx+"    "+
            "Lower bound : "+ this.state.a+"    "+
            "Upper bound : "+ this.state.b
        );
        this.trapzoidal(this.state.a,this.state.b) 
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    trapzoidal(a, b) {
        I = (((b-a)/ 2) * (this.funcfx(a) + this.funcfx(b)))
        exact = this.exactIntegrate(a, b)
        error = Math.abs((I-exact) / I) * 100
        this.setState({
            showOutputCard: true
        })
    }
    exactIntegrate(a, b) {
        var expr = compile(Algebrite.integral(Algebrite.eval(this.state.fx)).toString())
        return expr.eval({x:b}) - expr.eval({x:a})

    }
    funcfx(X) {
        var expr = compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
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
                        <h2 style={{ marginLeft: "40%" }}>Lower bound (A)</h2><Input size="large" name="a" style={InputStyle}></Input>
                        <h2 style={{ marginLeft: "40%" }}>Upper bound (B)</h2><Input size="large" name="b" style={InputStyle}></Input>
                        <br /><br />
                        <Button id="submit_button" onClick={
                            () => this.trapzoidal(parseInt(this.state.a), parseInt(this.state.b))
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
                                Approximate = {I}<br />
                                Exact = {exact}<br />
                                Error = {error} %
                             </p>
                        </Card>
                    }
                    <br /><br />
                </div>
            </div>
        );
    }
}
export default Trapzoidal;




