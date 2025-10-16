import React from 'react';
import { Button } from '@shopify/polaris';

// const [count, setCount] = useState(0);  // State to keep track of the count

// // Function to handle incrementing the count
// const incrementCount = () => {
//     setCount(count + 1);  // Updates the count state
// };

const ClickCounter = ({ count, incrementCount }) => {
    return (
        <div>
            <p>Current count: {count}</p>  {/* Display the count */}
            <Button onClick={incrementCount}>Click Me!</Button>  {/* Button to trigger increment */}
        </div>
    );
}

export default ClickCounter;