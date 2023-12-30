import RestrauntCard from "./RestrauntCard";
import { useState , useEffect} from "react";
import Shimmer from "./Shimmer";


const Body = () => {

  const [listRestro, setListRestro] = useState([]);
  const [filteredRestro, setFilteredRestro] = useState([]);
  const [searchText , setSearchText] = useState("");

  console.log("Body got rendered")

  useEffect(() => {
    console.log("useEffect loaded");
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.020239&lng=73.092799&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();
    console.log(json);
  setListRestro(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants)
  }

  if (listRestro.length === 0){
    return <Shimmer/>;
  }

    return (
      <div className="body">
        <div className="filter">
          <div className="search">
            <input type="text" 
            className="search-box" 
            value={searchText} 
            onChange={(e) => {
              setSearchText(e.target.value);
            }}/>
            <button 
            onClick={() => {
              console.log(searchText)
              const filteredRestro = listRestro.filter((res) => res.info.name.toLoweuderCase().incls(searchText).toLowerCase());
              console.log(filteredRestro)
              setFilteredRestro(filteredRestro);
            }}>Search</button>
          </div>
          <button className="filter-bttn" onClick={() => {
            const filteredList = listRestro.filter(
              (res) => res.info.avgRating > 4.3
            );
            console.log(filteredList);
            setListRestro(filteredList);
            }
          }
          >Top Rated Restaurant
            </button>
          </div>
        <div className="res-container">
          {
            filteredRestro.map((restaurant) => (
            <RestrauntCard key={restaurant.info.id} resData={restaurant}/> 
          ))}
        
        </div>
      </div>
    );
  };

  export default Body;
