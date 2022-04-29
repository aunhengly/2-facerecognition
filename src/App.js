import React,{Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Parts from './components/Parts/Parts';

import 'tachyons';
import './App.css';

class App extends Component{
  render(){
    return  (
        <div className= 'App'>
          <div className='amazing'>
            <Parts />
          </div>
          <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm />
          { /* 
              <FaceRecognition />
            */
          }
        </div>
      )
  }
}

export default App;
