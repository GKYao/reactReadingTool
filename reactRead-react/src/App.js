import React, { Component } from 'react';
import './App.css';
// import Sky from 'react-sky';
// import banana from './Components/Pics/banana.png';
// import duck from './Components/Pics/duck.png';
// import star from './Components/Pics/star.png';
// import mouse from './Components/Pics/mouse.png';
import Navigation from './Components/Navigation/Navigation';
import ArticleBox from './Components/ArticleBox/ArticleBox';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Article from './Components/Article/Article';
import Profile from './Components/Profile/Profile';

// const skyParam={
//     0: banana,
//     1: duck,
//     2: star,
//     3: mouse,
// };


const initialState = {
  input: '',
  route:'signin',
  isSignedIn:false,
  reading:'',
  vocab:[],
  user:{
    id:'',
    name:'',
    email:'',
    password:'',
    entries:0,
    joined:''
  }
}
class App extends Component {
  constructor(){
    super();
    this.state=initialState;
  }
  loadUser=(data)=>{
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    }
  })
  this.setState({vocab:data.vocab})
  }
  loadVocab=(vocab)=>{
    this.setState({
      vocab:vocab
    })
  }
  componentDidMount(){
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then(console.log)
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }
  onButtonSubmit = () => {
    this.setState({reading:this.state.input})
            fetch('http://localhost:3000/image',{ 
              method:'put',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({
              id:this.state.user.id,})
            })
            .then(response=>response.json())
            .then(count=>{
              this.setState(Object.assign(this.state.user,{
                entries:count})
              )
            })
      .catch(err => console.log(err));
  }
  onRouteChange = (route) => {
    if(route==='signout'){
      this.setState(initialState)
    }else if(route==='home'){
      this.setState({isSignedIn:true},
      this.setState({reading:''})
        )
    }
    this.setState({route:route});
  }
  render(){
    const{route,isSignedIn,reading} = this.state;
    if(route==='profile'){
      return(    
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        <Profile name={this.state.user.name} array={this.state.vocab} onRouteChange={this.onRouteChange}/>
      </div> 
      );
    }
    if(reading===''){
    return (
      <div className="App">
{/*         
        <Sky
          images={skyParam}
          how={150} 
          time={20} 
          size={'100px'} 
          background={'palettedvioletred'} 
        /> */}

        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home'
          ?
            <div>
              <ArticleBox  
                loadUser={this.loadUser}
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
                email={this.state.user.email}
                password={this.state.user.password}
              />
            </div>
          :(
            route ==='signin'
            ?<SignIn onRouteChange={this.onRouteChange}loadUser={this.loadUser}/>
            :<Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            )
        }
      </div>
     );}
     else{
       return(
          <div>
            <Article reading={reading} onRouteChange={this.onRouteChange} id={this.state.user.id} loadVocab={this.loadVocab}/>
          </div>
         )
     }
  }
}

export default App;
