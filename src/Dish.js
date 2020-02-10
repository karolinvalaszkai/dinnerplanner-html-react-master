import React, { Component } from 'react';
//import './Welcome.css';
import { Link } from 'react-router-dom';
import { Location } from 'react-router-dom';
import { modelInstance } from './data/DinnerModel';
import Sidebar from './Sidebar/Sidebar';
import { withRouter } from 'react-router'
import './Dish.css';





class Dishes extends Component {
  constructor(props) {
    super(props);    
    // We create the state to store the various statuses
    // e.g. API data loading or error 
    this.state = {
      status: 'INITIAL'
    }
  }

  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    console.log("didMount")
    this.getDishDetailsFunction();
  }
  
  getDishDetailsFunction = () => {
    modelInstance.getDishDetails(this.props.match.params.id).then(dishes => {
      this.setState({
        status: 'LOADED',
        dishResults: dishes
      }) 
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
    
  }
  // log(dishes)


  render() {

    let dishDetails = this.state.dishResults;
    let ingredients = null
    

    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case 'INITIAL':
      dishDetails = <em>Loading...</em>
        break;
      case 'LOADED':
      
      //dishesList = this.state.dishes
        // dishesList = this.state.dishes.map((dish) =>
       
        // // .map((dish) =>
        
        //   <div >
        //     Ingredients: {}
        //   </div>
        // )

        //Calculate total cost
      let ingredientsss = dishDetails.extendedIngredients
      let totalCost = 0;
      ingredientsss.forEach(ingredient => {
        totalCost += ingredient.measures.metric.amount;
        
      });

      ingredients = (

      <div id="dishIngredients">

      {dishDetails.extendedIngredients.map((ingredient,i) => (

          <div key={i} className="d-flex justify-content-between">
            <div className="p-2 flex-grow-1 bd-highlight dishIngredientMeasure">
              {Math.round(ingredient.measures.metric.amount)}&nbsp;{ingredient.measures.metric.unitShort}&nbsp;{ingredient.name}
            </div>
            <div className="p-2 flex-shrink-1 bd-highlight dishIngredientPrice">
            {Math.round(ingredient.measures.metric.amount)} &nbsp; SEK
            </div>
          </div>
        

      ))}
          <div>TOTAL <p>{Math.round(totalCost)} SEK </p>
          
        </div>
      </div>
      )

    console.log(ingredients)


      // ingredientList = ingredients.map((ingredient) =>
        
      //     <div key={dish.id} className="col-md-4">
      //     <Link to={"/dish/" + dish.id}>
      //       <div className="card mb-4 box-shadow">
      //         <img className="tumnagel card-img-top" alt="Thumbnail [100%x225]" src={"https://spoonacular.com/recipeImages/"+ dish.image} data-holder-rendered="true"/>
      //         <div className="card-body">
      //             <p className="card-text">{dish.title}</p>
      //             <div className="d-flex justify-content-between align-items-center">
      //               <small className="text-muted">{dish.readyInMinutes} min</small>
      //             </div>
      //           </div>
      //       {/* <h3 key={dish.id}>{dish.title}</h3> */}

      //       </div>
      //     </Link>
      //     </div>
      //   )



        break;
      default:
      dishDetails = <b>Failed to load data, please try again</b>
        break;
    }
    // 

    
    
//     this.items = dishDetails.extendedIngredients.map((item, key) =>
//     <li key={item.id}>{item.name}</li>
// );

 
    
    return (
      <div className="d-flex bd-highlight">
        <div className="p-2 flex-fill bd-highlight">
        <Sidebar model={modelInstance}/>
        </div>
        
        

              <div className="p-2 flex-fill bd-highlight">

                <div className="button">
                  <Link to="/Search">
                    <button type="button-center" className="btn btn-warning">
                          Back to search
                      </button>
                  </Link>
                </div>
                
                <h3>{dishDetails.title}</h3>
                <img src={dishDetails.image}  />
                    <div className="smallTitle"><h5>Instructions:</h5><br/>{dishDetails.instructions}</div>
                      
              
                </div>

                <div className="p-2 w-100 bd-highlight">
                    <div className='superSmallTitle text-center'>Ingredients for {modelInstance.getNumberOfGuests()} people</div>
                    <div className="ingredients text-center">
                      {ingredients}

                    </div>
                    <div className="button text-center">
                      <button id="addDishButton" type="button-center" className="btn btn-warning regularContainer">Add to menue</button>
                    </div>

                    
                </div>
          
      </div>
    );
  }
}

export default Dishes;