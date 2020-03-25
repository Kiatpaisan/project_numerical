import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './style/style.scss'

//link_pages
//Integration
import Composite_Simpson from './pages/Integration/Composite_Simpson_Rule';
import Composite_Trapezoidal from './pages/Integration/Composite_Trapezoidal_Rule';
import Simpson from './pages/Integration/Simpson';
import Trapzoidal from './pages/Integration/Trapzoidal';
//Interpolation
import Lagrange from './pages/Interpolation/Lagrange';
import Newton_Divide_Difference from './pages/Interpolation/Newton_Divide_Difference';
import Spline from './pages/Interpolation/Spline';
//Linear_Algebra
import Cholesky from './pages/Linear_Algebra/Cholesky';
import Conjugate_Gradient from './pages/Linear_Algebra/Conjugate_Gradient';
import Cramer from './pages/Linear_Algebra/Cramer';
import Gauss_Jordan_Method from './pages/Linear_Algebra/Gauss_Jordan_Method';
import Gauss_seidel from './pages/Linear_Algebra/Gauss_seidel';
import Jacobi from './pages/Linear_Algebra/Jacobi';
import Lu from './pages/Linear_Algebra/Lu';
//Ordinary_Differential_Equation
import Euler from './pages/Ordinary_Differential_Equation/Euler';
import Fw_Diff from './pages/Ordinary_Differential_Equation/Fw_Divided_Differences';
import Heun from './pages/Ordinary_Differential_Equation/Heun';
import Modifier_Euler from './pages/Ordinary_Differential_Equation/Modifier_Euler';
//Regression
import Linear_Regression from './pages/Regression/Linear_Regression';
import Multiple_Linear_Regression from './pages/Regression/Multiple_Linear_Regression';
import Polynomial_Regression from './pages/Regression/Polynomial_Regression';
//Root_of_Equation
import Bisection from './pages/Root_of_Equation/Bisection';
import False_position from './pages/Root_of_Equation/False_position';
import Newton_raphson from './pages/Root_of_Equation/Newton_raphson';
import Onepoint from './pages/Root_of_Equation/Onepoint';
import Secant from './pages/Root_of_Equation/Secant';
//Differentiation
import Backward_Divided_Differences from './pages/Differentiation/Backward_Divided_Differences';
import Central_Divided_Differences from './pages/Differentiation/Central_Divided_Differences';
import Forward_Divided_Differences from './pages/Differentiation/Forward_Divided_Differences';

import Backward_Divided_Differences2 from './pages/Differentiation/Backward_Divided_Differences2';
import Central_Divided_Differences2 from './pages/Differentiation/Central_Divided_Differences2';
import Forward_Divided_Differences2 from './pages/Differentiation/Forward_Divided_Differences2';

const { Header, Content, Footer, Sider } = Layout;

const { SubMenu } = Menu;

class App extends Component {
  state = {
    theme: 'dark',
    current: '1',
  };

  changeTheme = value => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <Router>
        <Layout>
          <Header className="header" style={{ height: "150px" }}>
            <div className="headertext"
              style={{ marginTop: "40px" }}
            >
              <h2 style={{ marginLeft: "45%"}}> React_Numerical </h2>
            </div>
          </Header>
          <Layout style={{ minHeight: "100vh" }}>
            <Sider
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
            >
              <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="calculator" />
                      <span>Root of Equation</span>
                    </span>
                  }
                >
                  {/*<Menu.Item key="menu_graphical">Graphical <Link to="/Bisection" /></Menu.Item>*/}
                  <Menu.Item key="menu_bisection">Bisection <Link to="/Bisection" /> </Menu.Item>
                  <Menu.Item key="menu_false">False Position <Link to="/False_position" /></Menu.Item>
                  <Menu.Item key="menu_onepoint">One-Point Iteration <Link to="/Onepoint" /></Menu.Item>
                  <Menu.Item key="menu_newton">Newton-Raphson <Link to="/Newton_raphson" /></Menu.Item>
                  <Menu.Item key="menu_secant">Secant Method <Link to="/Secant" /></Menu.Item>
                </SubMenu>

                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="calculator" />
                      <span>!_Linear Algebra</span>
                    </span>
                  }
                >
                  <Menu.Item key="menu_cramer">♣ Cramer's Rule <Link to="/cramer" /> </Menu.Item>
                  <Menu.Item key="menu_gauss">♣ Cholesky <Link to="/Cholesky" /> </Menu.Item>
                  <Menu.Item key="menu_jordan">♣ Gauss Jordan Method<Link to="/Gauss_Jordan_Method" /> </Menu.Item>
                  <Menu.Item key="menu_Conjugate_Gradient">♣ Conjugate_Gradient<Link to="/Conjugate_Gradient" /> </Menu.Item>
                  <Menu.Item key="menu_seidel">♣ Gauss_seidel<Link to="/Gauss_seidel" /> </Menu.Item>
                  <Menu.Item key="menu_Jacobi">♣ Jacobi<Link to="/Jacobi" /> </Menu.Item>
                  <Menu.Item key="menu_Lu">♣ Lu <Link to="/Lu" /> </Menu.Item>

                </SubMenu>
                <SubMenu
                  key="sub3"
                  title={
                    <span>
                      <Icon type="calculator" />
                      <span>!_Interpolation</span>
                    </span>
                  }
                >
                  <Menu.Item key="menu_divide">♣ Newton Divide Difference <Link to="/Newton_Divide_Difference" /></Menu.Item>
                  <Menu.Item key="menu_lagrange">♣ Lagrange <Link to="/Lagrange" /></Menu.Item>
                  <Menu.Item key="menu_spline">♣ Spline <Link to="/Spline" /></Menu.Item>
                </SubMenu>

                <SubMenu
                  key="sub4"
                  title={
                    <span>
                      <Icon type="calculator" />
                      <span>!_Least Square Error</span>
                    </span>
                  }
                >
                  <Menu.Item key="menu_linear">♣ Linear Regression <Link to="/Linear_Regression" /></Menu.Item>
                  <Menu.Item key="menu_poly">♣ Polynomial Regression <Link to="/Polynomial_Regression" /></Menu.Item>
                  <Menu.Item key="menu_multiple">♣ Multiple Linear Regression <Link to="/Multiple_Linear_Regression" /></Menu.Item>
                </SubMenu>

                <SubMenu
                  key="sub5"
                  title={
                    <span>
                      <Icon type="calculator" />
                      <span>Integration</span>
                    </span>
                  }
                >
                  <Menu.Item key="menu_compositeTrapzoidal">Composite Trapezoidal Rule <Link to="/Composite_Trapezoidal" /> </Menu.Item>
                  <Menu.Item key="menu_compositeSimpson">Composite Simpson's Rule <Link to="/Composite_Simpson" /> </Menu.Item>

                  <Menu.Item key="menu_Simpson">Simpson <Link to="/Simpson" /> </Menu.Item>
                  <Menu.Item key="menu_Trapzoidal">Trapzoidal <Link to="/Trapzoidal" /> </Menu.Item>
                </SubMenu>

                <SubMenu
                  key="sub6"
                  title={
                    <span>
                      <Icon type="calculator" />
                      <span>Differentiation</span>
                    </span>
                  }
                >
                  <Menu.Item key="menu_forwardh">Forward Divided-Differences <Link to="/Forward_Divided_Differences" /> </Menu.Item>
                  <Menu.Item key="menu_backwardh">Backward Divided-Differences <Link to="/Backward_Divided_Differences" /> </Menu.Item>
                  <Menu.Item key="menu_centralh">Central Divided-Differences <Link to="/Central_Divided_Differences" /> </Menu.Item>
                  
                  <Menu.Item key="menu_forwardh2">Forward Divided-Differences2 <Link to="/Forward_Divided_Differences2" /> </Menu.Item>
                  <Menu.Item key="menu_backwardh2">Backward Divided-Differences2 <Link to="/Backward_Divided_Differences2" /> </Menu.Item>
                  <Menu.Item key="menu_centralh2">Central Divided-Differences2 <Link to="/Central_Divided_Differences2" /> </Menu.Item>

                </SubMenu>

                <SubMenu
                  key="sub7"
                  title={
                    <span>
                      <Icon type="calculator" />
                      <span>!_Ordinary Differential Equation</span>
                    </span>
                  }
                >
                  <Menu.Item key="de_submenu">♣ Forward Divided-Differences <Link to="/Fw_Diff" />  </Menu.Item>
                  <Menu.Item key="menu_euler">♣ Euler's Method <Link to="/Euler" />  </Menu.Item>
                  <Menu.Item key="menu_heun">♣ Heun's Method <Link to="/Heun" />  </Menu.Item>
                  <Menu.Item key="menu_modifier">♣ Modifier Euler's Method <Link to="/Modifier_Euler" />  </Menu.Item>
                </SubMenu>

              </Menu>
            </Sider>
            <Layout>

              <Content style={{ padding: 24, margin: 0, minHeight: 280,background: "#1b1b1b"}}>
                {/*Integration*/}
                <Route path="/Composite_Simpson" component={Composite_Simpson}/>
                <Route path="/Composite_Trapezoidal" component={Composite_Trapezoidal} />
                <Route path="/Simpson" component={Simpson} />
                <Route path="/Trapzoidal" component={Trapzoidal} />
                {/*Interpolation*/}
                <Route path="/Lagrange" component={Lagrange} />
                <Route path="/Newton_Divide_Difference" component={Newton_Divide_Difference} />
                <Route path="/Spline" component={Spline} />
                {/*Linear_Algebra*/}
                <Route path="/Cholesky" component={Cholesky} />
                <Route path="/Conjugate_Gradient" component={Conjugate_Gradient} />
                <Route path="/cramer" component={Cramer} />
                <Route path="/Gauss_Jordan_Method" component={Gauss_Jordan_Method} />
                <Route path="/Gauss_seidel" component={Gauss_seidel} />
                <Route path="/Jacobi" component={Jacobi} />
                <Route path="/Lu" component={Lu} />
                {/*Ordinary_Differential_Equation*/}
                <Route path="/Euler" component={Euler} />
                <Route path="/Fw_Diff" component={Fw_Diff} />
                <Route path="/Heun" component={Heun} />
                <Route path="/Modifier_Euler" component={Euler} />
                {/*Regression*/}  
                <Route path="/Linear_Regression" component={Linear_Regression} />
                <Route path="/Multiple_Linear_Regression" component={Multiple_Linear_Regression} />
                <Route path="/Polynomial_Regression" component={Polynomial_Regression} />
                {/*Root_of_Equation*/}
                <Route path="/Bisection" component={Bisection} />
                <Route path="/False_position" component={False_position} />
                <Route path="/Newton_raphson" component={Newton_raphson} />
                <Route path="/Onepoint" component={Onepoint} />
                <Route path="/Secant" component={Secant} />
                {/*Differentiation*/}
                <Route path="/Backward_Divided_Differences" component={Backward_Divided_Differences} />
                <Route path="/Central_Divided_Differences" component={Central_Divided_Differences} />
                <Route path="/Forward_Divided_Differences" component={Forward_Divided_Differences} />

                <Route path="/Backward_Divided_Differences2" component={Backward_Divided_Differences2} />
                <Route path="/Central_Divided_Differences2" component={Central_Divided_Differences2} />
                <Route path="/Forward_Divided_Differences2" component={Forward_Divided_Differences2} />
              </Content>

              <Footer style={{ textAlign: "center" }}>
                © 2020 Kiatpasian Chantra 
          </Footer>
            </Layout>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
