import { Titlebar } from 'react-titlebar-osx';

const electron = window.require('electron')
const win = electron.remote.BrowserWindow.getFocusedWindow()

function App() {
  function handleClose() {
    console.log('handleClose')
    win.close();
  }

  function handleMaximize() {
    console.log('handleMax')
    if (!win.isMaximized()) {
      win.maximize();          
    } else {
      win.unmaximize();
    }
  }

  function handleMinimize() {
    console.log('handleMin')
    win.minimize(); 
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
