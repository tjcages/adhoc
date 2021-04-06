import { Titlebar } from 'react-titlebar-osx';

// const remote = require('electron').remote;

function App() {
  function handleClose() {
    // var window = remote.getCurrentWindow();
    window.close();
  }

  function handleMaximize() {
    // var window = remote.getCurrentWindow();
    if (!window.isMaximized()) {
        window.maximize();          
    } else {
        window.unmaximize();
    }
  }

  function handleMinimize() {
    // var window = remote.getCurrentWindow();
    window.minimize(); 
  }
  
  return (
    <div className="App">
      <Titlebar
      text="Awesome tool"
      draggable={true}
      onClose={() => handleClose()}
      onMaximize={() => handleMaximize()}
      onFullscreen={() => this.handleFullscreen()}
      onMinimize={() => handleMinimize()}
    />

    </div>
  );
}

export default App;
