import React from 'react'
import RecipeSearch from './components/RecipeSearch';
import RecipeSearchWithSimilarFoods from './components/RecipeSearchWithSimilarFoods';
import './App.css';
import PageCounter from './components/PageCounter';
// useEffect to fetch API
// frontend with react
function App() {

  // const [backendData, setBackendData] = useState([{}])

  // // effect will be fetch api 
  // // already defined proxy in package.json 
  // // response from api will get response in json

  // // after getting response in json 
  // useEffect(() => {
  //   fetch("/api/flickr").then(
  //     response => response.json()
  //   ).then(
  //     data => {
  //       setBackendData(data)
  //     }
  //   )
  // }, [])

    // render backend information on frontend page
  return (
<div className="container">
    <header className="page-counter">
      <PageCounter />
    </header>
    <div className="content">
      <div className="recipe-search">
        <RecipeSearch />
      </div>
      <div className="shopping-list">
        <RecipeSearchWithSimilarFoods />
      </div>
    </div>
  </div>
  )
}

export default App
