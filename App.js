// Importing the React library
import React from 'react';
// Importing the PickImage from camera.js inside screens folder
import PickImage from './screens/camera';

// Creating a component
export default class App extends React.Component {
  // Rendering the component
  render() {
    return <PickImage/>;
  }
}