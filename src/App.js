import DateTimeCarouselPicker from './components/DateTimeCarouselPicker';

import Info from './components/Info';
import Date from './components/Date';
import './App.css'
function App() {
  return (
    <div className="App">
      
      {/* <DateTimePicker/> */}
      <Info/>
      {/* <Date/> */}
      <hr/>
      <DateTimeCarouselPicker/>
    </div>
  );
}

export default App;
