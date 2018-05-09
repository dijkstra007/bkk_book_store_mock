import React from 'react';
import ProductList from './ProductList';
import Carousel from "./Carousel";
import FeaturingProduct from './FeaturingProduct';
import HotProduct from './HotProduct';
import Promotion from './Promotion';
import Academy from './Academy';
import ProductReccommended from './ProductReccommended';
import Footer from './Footer';



const MainProductPage = () => {
    return (
        
            <div className="col-md-8">
                
                <div className="carousel__body"> 
                    <Carousel/>
                </div>
                <FeaturingProduct />
                <HotProduct/>
                <Promotion/>
                <Academy/>
                <ProductReccommended />
            </div>
        
    )
}

export default MainProductPage;