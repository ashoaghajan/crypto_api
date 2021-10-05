import { Spin } from 'antd';
import React from 'react';

interface LoaderProps {
    
}
 
const Loader: React.FC<LoaderProps> = () => {
    return ( 
        <div className="loader">
            <Spin />
        </div>
     );
}
 
export default Loader;
