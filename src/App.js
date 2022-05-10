import React,{Component} from 'react';
import Navigation from './components/Navigation/Navigation';

import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Parts from './components/Parts/Parts';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const initailState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
      id:'',
      name:'',
      password:'',
      email:'',
      entries:0,
      joined:''
  }
}
class App extends Component {
  constructor (){
    super();
    this.state = initailState;
}
/* Testing the connection server with the app:
  componentDidMount(){
    fetch('http://localhost:3001')
      .then(response => response.json())
      .then(console.log)
  }
 */

  loadUser = (data)=>{
  this.setState({user: {
    id: data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined
  }}) 
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange =(event) =>{
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('https://shielded-shelf-48162.herokuapp.com//imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.user.input
        })
      })
      .then(response => response.json())
      .then(response => {
          console.log('Hi from respons: ', response)
          if(response){
            fetch('https://shielded-shelf-48162.herokuapp.com//image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
			        body: JSON.stringify({
                id: this.state.user.id
		          })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries:count }))
            })
            .catch(console.log)
          }
          this.displayFaceBox(this.calculateFaceLocation(response))
        })
        .catch(err => console.log(err));

    }

    onRouteChange =(route) => {
      if(route === 'signout') {
        this.setState(initailState)
      } else if (route === 'home') {
          this.setState({isSignedIn: true});
      } 
      this.setState({route: route});
    }

  render(){
    const {isSignedIn, imageUrl, route, box} = this.state;
    return  (
        <div className= 'App'>
          <div className='amazing'>
            <Parts />
          </div>
          <Navigation isSignedIn ={isSignedIn} onRouteChange = {this.onRouteChange}/>
          { route === 'home'
            ? <div>
                <Logo />
                  <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                  <ImageLinkForm 
                      onInputChange={this.onInputChange}
                      onButtonSubmit={this.onButtonSubmit}
                  />
                  <FaceRecognition box={box} imageUrl={imageUrl}/>
              </div>
            : (
              route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
              : <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange} />
            )
             
            }
        </div>
      )
  }
}

export default App;
