import React, { Component } from 'react'
import { Layout, Input, Button, Card, Table } from 'antd';
import 'antd/dist/antd.css';
import { compile } from 'mathjs';
import axios from 'axios';
var Algebrite = require('algebrite')


const { Content } = Layout;

const InputStyle = {
    background: "white",
    color: "#ffa31a",
    fontWeight: "bold",
    fontSize: "24px",
    textAlign: 'center',
    marginLeft: "40%",
};
var I, exact, error;
class Composite_Trapezoidal_Rule extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            a: 0,
            b: 0,
            n: 0,
            showOutputCard: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    API = async () => {
        var response = await axios.get('http://localhost:3001/api/users/showComposite_Trapezoidal').then(res => { return res.data })
        this.setState({
            fx: response['data'][0]['fx'],
            a: response['data'][0]['LBL'],
            b: response['data'][0]['LBH'],
            n: response['data'][0]['N'],
        }); 
        alert(
            "Fx : "+ this.state.fx+"    "+
            "Lower bound : "+ this.state.a+"    "+
            "Upper bound : "+ this.state.b+"    "+
            "N : "+ this.state.n
        );
        this.composite_trapezoidal(this.state.a, this.state.b, this.state.n) 
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    composite_trapezoidal(a, b, n) {
        var h = (b-a)/n
        I = (h / 2) * (this.func(a) + this.func(b) + 2*this.summationFunction(n, h))
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
    summationFunction(n, h) {
        var sum = 0
        var counter = h
        for (var i=1 ; i<n ; i++) {
            sum += this.func(counter)
            counter += h
        }
        return sum
    }
    func(X) {
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
                        <h2 style={{ marginLeft: "40%" }}>N</h2><Input size="large" name="n" style={InputStyle}></Input><br /><br />
                        <br /><br />
                        <Button id="submit_button" onClick={
                            () => this.composite_trapzoidal(parseInt(this.state.a), parseInt(this.state.b), parseInt(this.state.n))
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
export default Composite_Trapezoidal_Rule;




