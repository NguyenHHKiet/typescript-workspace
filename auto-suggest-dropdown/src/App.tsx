import { useState, ChangeEvent, ChangeEventHandler, FC, useEffect } from 'react';
import './App.css'

const names = ['Nguyen', 'Huu', 'Hoang', 'Kiet'];
interface SearchProps {
  handleClicked: (name: string) => void;
  handleSearched: ChangeEventHandler<HTMLInputElement>;
  results: string[];
  searchTern: string;
}
const useDebounce = (value: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState<string>(value);
  useEffect(() => {
    const handle = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(handle);
    }
  }, [value, delay]);
  return debounceValue;
}

const Search: FC<SearchProps> = ({ handleClicked, handleSearched, results, searchTern }) =>
(<div className='serach'>
  <span>search</span>
  <input value={searchTern} spellCheck={false} onChange={handleSearched} type="text" />
  <div className='menu'>
    <div>
      {
        results.map(
          (name) => (
            <button key={name} onClick={() => handleClicked(name)}>{name}</button>
          ))
      }
    </div>
  </div>
</div>
);

function App() {
  const [searchTern, setSearchTern] = useState<string>('');
  const [results, setResults] = useState<string[]>([]);
  const debouncedSearchTern = useDebounce(searchTern, 500);
  const handleSearched = (e: any) => setSearchTern(e.target.value);
  const handleClicked = (name: string) => setSearchTern(name);

  useEffect(() => {
    const namesCopy = [...names];
    setResults(
      namesCopy.filter(
        n => searchTern === "" || n.toLowerCase().includes(searchTern.toLowerCase())
      )
    );
  }, [debouncedSearchTern]);

  return (
    <div className="App">
      <h1>Auto Suggest Dropdown</h1>
      <div className="card">
        <Search searchTern={searchTern} handleSearched={handleSearched}
          handleClicked={handleClicked} results={ results} />
      </div>
    </div>
  )
}

export default App
