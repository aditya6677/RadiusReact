import React, { Component } from 'react';
import Loader from './component/loader';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      repoName : 'https://github.com/facebook/react',
      data : null
    };
  }

  handleSubmit = (e) =>{
    this.setState({isLoading:true,data : null});
    let basicInfo = this.state.repoName;
    basicInfo = basicInfo.replace('https://github.com/','');
    let apiUrl = `http://localhost:7676/${basicInfo}`;
    console.log(apiUrl);
    fetch(apiUrl)
    .then(res => (
      res.json()
    ))
    .then(resJson => {
      this.setState({
        data:resJson,
        isLoading : false
      });
      console.log(resJson);
    })
    .catch((err) => (
      console.log("API is failing")
    ));
  }

  handleChange = (e) =>{
    let value = e.target.value;
    this.setState({
      repoName:value
    });
  }

  render() {
    let gitData = this.state.data;
    return (
      <div className="container">
        <h1 className="flow-text heading">Radius</h1>
        <div className="repobox">
            <InputField Change = {this.handleChange} value={this.state.repoName}/>
            <button onClick={(e)=>this.handleSubmit(e)} style={{float:'right'}} className="btn waves-effect waves-light" type="submit" value="Submit">Submit</button>
        </div>
        {gitData != null && Object.entries(gitData).length !== 0 ? 
        <div className="repoResult">
            <h2>Basic Informarion</h2>
            <div className="displayBlock"><h3>Repository Name : </h3><p> {gitData.repo}</p></div>
            <div className="displayBlock"><h3>Repository Description : </h3><p> {gitData.description}</p></div>
            <div className="displayBlock"><h3>Owner Name : </h3><p><a href={gitData.ownerProfile}> {gitData.owner}</a></p></div>
            <div className="displayBlock"><h3>Last 24 Hour Open Issues : </h3><p>{gitData.last24}</p></div>
            <div className="displayBlock"><h3>Last 24 Hour to 7 Days Open Issues : </h3><p> {gitData.last24to7}</p></div>
            <div className="displayBlock"><h3>More Than 7 Days Open Issues : </h3><p> {gitData.over7}</p></div>
        </div> : null}
        {this.state.isLoading ? <LoaderV1/> : null}
      </div>
    );
  }
}

const InputField = ({Change,value}) => (
  <div className="input-field">
    <input value={value} onChange={Change} name="gitRepo" type="text" className="validate" required/>
    <label>Repo Url</label>
  </div>
);

const LoaderV1 = () => (
  <div className="loaderReact">
      <Loader type='bubbles'  color='#7c52a6' />
  </div>
)

export default App;
