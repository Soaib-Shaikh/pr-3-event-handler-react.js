import React, { useState } from 'react'
import { FaStar } from "react-icons/fa";

const Rating = ({ rating = 0, onRate }) => {


const [star, setStar] = useState(null);

return (
    <div>
        {[1,2,3,4,5].map((val, i) => (
            <FaStar 
                key={i}
                size={28}
                style={{ cursor: "pointer", marginRight: 5 }}
                onClick={() => onRate(val)}
                onMouseEnter={() => setStar(val)}
                onMouseLeave={() => setStar(null)}
                color={(star || rating) >= val ? "gold" : "#ccc"}
            />
        ))}
    </div>
)


}

export default Rating;
