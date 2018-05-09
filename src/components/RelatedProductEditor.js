import React from 'react';
import Modal from 'react-modal';
import database from '../firebase/firebase';

class RelatedProductEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: this.props.content === undefined?[]:this.props.content,
            addingProduct: ''
        }
    }
    getProductDataFromFirebaseBy = (name) => {
        return database
            .ref('products')
            .orderByChild('name')
            .equalTo(name)
            .once('value');
    }
    onDone = () => {
        const content = {
            raw: this.state.products,
            type: 'related_product'
        }
        this.props.onDone(content, this.props.editAt, this.props.componentKey);
    }
    onCancel = () => {
        this
            .props
            .onCancel();
    }
    onAddClick = () => {
        if (this.state.addingProduct !== '') {
            const productName = this.state.addingProduct;
            this
                .getProductDataFromFirebaseBy(productName)
                .then((snapshot) => {
                    let product = {
                        id: undefined,
                        name: productName,
                        isInDB: false
                    }

                    let sv_product;

                    snapshot.forEach((childSnapshot) => {
                        product.id = childSnapshot.key
                        product.isInDB = true;
                    })

                    const products = [
                        ...this.state.products,
                        product
                    ];
                    this.setState({products: products, addingProduct: ''});

                })
                .catch((e) => {
                    console.log(e);
                })

        }
    }
    onAddingProductChange = (e) => {
        const addingProduct = e.target.value;
        this.setState({addingProduct: addingProduct});
    }
    onRemoveAt = (index) => {

        console.log(index);
        const products = this
            .state
            .products
            .filter((product, idx) => {
                return index !== idx;
            })
        this.setState({products: products})

    }
    render() {
        const products = this.state.products;

        return (
            <div style={{
                backgroundColor: 'grey'
            }}>
                <h2>ไอเทมที่ใช้ในกระทู้</h2>
                {products.map((product, idx) => {

                    return (
                        <div key={idx}>
                            <div>{idx + 1}
                            </div>
                            <div>{product.name}
                                <button onClick= { () => {this.onRemoveAt(idx)}}>Remove</button>
                            </div>
                        </div>
                    )
                })
}
                <div>
                    <div>
                        {products.length + 1}
                    </div>
                    <input
                        type="text"
                        placeholder="ใส่ชื่อ product"
                        value={this.state.addingProduct}
                        onChange={this.onAddingProductChange}/>
                    <button onClick={this.onAddClick}>
                        Add
                    </button>
                    <div></div>
                    <button onClick={this.onDone}>Done</button>
                    <button onClick={this.onCancel}>Cancel</button>
                </div>
            </div>
        )
    }

}

export default RelatedProductEditor;
