import React , {useState} from 'react'
import PulseLoader from "react-spinners/PulseLoader";

function Loader({size}) {
    let [loading] = useState(true);
    return (
        <div className='text-center alignCenter my-5'>
            <div className="sweet-loading filter m-1">
                <PulseLoader
                    color='#000'
                    loading={loading}
                    size={size || 40}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    )
}

export default Loader
