import { CDN_URL } from "../utils/constants";



const RestrauntCard = (props) => {
    const { resData } = props;
    //optional chaining
    const {cloudinaryImageId , name ,cuisines , avgRating ,deliveryTime ,costForTwo  } = resData?.info;
    return (
      <div className="restro-card">
        <img
          className="res-logo"
          src={CDN_URL+cloudinaryImageId  }
        />
        <h3>{name}</h3>
        <h4>{cuisines.join(' ,  ')}</h4>
        <h4>{avgRating} stars</h4>
        {/* <h4>{deliveryTime} minutes</h4> */}
        <h4><b>{costForTwo}</b></h4>
      </div>
    );
  };

  export default RestrauntCard;