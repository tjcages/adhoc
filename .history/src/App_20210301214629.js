import { Titlebar } from 'react-titlebar-osx';

function App() {
  function handleClose() {
    console.log('handleClose')
    window.close();
  }

  function handleMaximize() {
    console.log('handleMax')
    if (!window.isMaximized()) {
        window.maximize();          
    } else {
        window.unmaximize();
    }
  }

  function handleMinimize() {
    console.log('handleMin')
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
