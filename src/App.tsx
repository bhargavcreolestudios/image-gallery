import React from "react";
import "./App.css";

class App extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props)
  }
  componentDidMount = () => {
    console.log('he')
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">

        </header>
      </div>
    );
  }
}

export default App;
