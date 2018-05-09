import React from 'react';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import ProductSummarize from './ProductSummarize';



class ToOrderPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addrInfo: undefined,
            paymenyInfo: undefined,
            shouldRender: {
                AddressForm: true,
                ProductSummarize: false,
                PaymentForm: false
            }
        }
    }
    onAddressSubmitted = (addrInfo) => {
        const componentState = {
            ...this.state.shouldRender,
            AddressForm: false,
            ProductSummarize: true
        }
        this.setState({addrInfo: addrInfo, shouldRender: componentState})
    }
    onProductSummarizeNext = () => {
        const componentState = {
            ...this.state.shouldRender,
            ProductSummarize: false,
            PaymentForm: true
        }
        this.setState({shouldRender: componentState});
    }
    toggleFormByKey = (componentKey) => {
        let componentState = {
            ...this.state.shouldRender
        }
        for (let key in componentState) {
            componentState[key] = false;
        }
        componentState[componentKey] = true;
        this.setState({shouldRender: componentState});
    }
    renderAddressForm =  () => this.toggleFormByKey("AddressForm");
    renderProductSummarize = () => this.toggleFormByKey("ProductSummarize")
    renderPaymentForm = () => this.toggleFormByKey("PaymentForm")

    render() {
        return (
            <div>
                <h1 className="header__page">To Order Page</h1>
                
                <div className="div-row">
                    <div className="header_step">
                        <button className="button step_button step_complete step" onClick= { () => this.renderAddressForm()}> <a  className="check-bc">Step 1</a> <span className="step_line step_complete"> </span> <span className="step_line backline"> </span> </button>
                        <button className="button step_button step_complete step" onClick= { () => this.renderProductSummarize()}> <a className="check-bc">Step 2</a> <span className="step_line step_complete "> </span> <span className="step_line backline"> </span> </button>
                        <button className="button step_button step_complete step" onClick= { () => this.renderPaymentForm()}><a  className="check-bc">Step 3</a><span className="step_line step_complete "> </span> <span className="step_line backline"> </span></button>
                    </div>
                </div>

                {this.state.shouldRender.AddressForm
                    ? <AddressForm
                            addrInfo={this.state.addrInfo}
                            onDone=
                            { (addrInfo) => this.onAddressSubmitted(addrInfo)}/>
                    : null}
                {this.state.shouldRender.ProductSummarize
                    ? <ProductSummarize onDone= { () => this.onProductSummarizeNext()}/>
                    : null}
                {this.state.shouldRender.PaymentForm
                    ? <PaymentForm/>
                    : null}
            </div>
        )
    }
}

export default ToOrderPage;
