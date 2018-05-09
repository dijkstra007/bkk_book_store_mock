import React from 'react';

const CartProductListItem = (props) => {
    const {id, name, price,image, url} = props
    return (
    <div classNameName="col-sm-4 flex">
        <div className="shopping-cart">
            <div className="item">
                <div className="image">
                <img src={image} alt="" />
                </div>
            
                <div className="description">
                <span> <a href={url}>{name}</a></span>
                </div>
            
                <div className="quantity">
                <button onClick = {() => { this.onAddClick(id)}} className="plus-btn" type="button" name="button">
                    <img src="https://designmodo.com/demo/shopping-cart/plus.svg" alt="" />
                </button>
                <input type="text" name="name" value="1"/>
                <button onClick = {() => { this.onRemoveClick(id)}} className="minus-btn" type="button" name="button">
                    <img src="https://designmodo.com/demo/shopping-cart/minus.svg" alt="" />
                </button>
                </div>
            
                <div className="total-price"><div classNameName="product__price">{price} Baht</div>  </div>
            </div>
    </div>
    </div>
    )
}

export default CartProductListItem;