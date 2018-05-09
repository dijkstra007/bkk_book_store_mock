import React from 'react';

const ProductListItem = (props) => {
    const {id, name, price,image, url} = props
    return (
    <div className="col-sm-4 flex">
        <div className="product-list-item">
            <div className="product__image">
                <a className="flex-center">
                <img src={image} alt="product" />
                </a>
            </div>
            <div className="caption">
                <h3>
                    <a href={url}>{name}</a>
                </h3>
                <div className="product__price">{price} Baht</div>  
            </div>           
        </div>
    </div>
    )
}

export default ProductListItem;