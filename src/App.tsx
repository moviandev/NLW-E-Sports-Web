import './App.css'
import './styles.css'

interface ButtonProps {
  title: string;
}

const Button = (props: ButtonProps) => (
  <button>
    {props.title}
  </button>
);

function App() {
  return (
    <div>
      <Button title="Send" />
      <Button title="Send" />
      <Button title="Send" />
      <Button title="Send" />
    </div>
  )
}

export default App
