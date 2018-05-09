import React from 'react';
import Link from "next/link";
import Router from 'next/router'

class SearchProduct extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            search : ""
        }
    }
    onSearchChange = e => {
        const txt = e.target.value
        this.setState({search:txt})
      }


      onSearchClick = () => {
        const txt = this.state.search
        Router.push({
          pathname: '/productCategory',
          query: { activeSearch: txt}
        })
      }
      enterPressed(event) {
        var code = event.keyCode || event.which;
        if(code === 13) { //13 is the enter keycode
            const txt = this.state.search
            Router.push({
              pathname: '/productCategory',
              query: { activeSearch: txt}
            })
        } 
    }
    render() {
        return (
            <div className="search-product-body">
                <Link href="/productCategory">
                <button className="search-product-shop-button"> ช้อปสินค้า </button>
                </Link>
                <input className="search-product-input" placeholder="ค้นหา" onChange={this.onSearchChange} value={this.state.search} onKeyPress={this.enterPressed.bind(this)}/>
                <button className="search-product-search-button" onClick={this.onSearchClick}>
                    <img className=""
                      src={
                        "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/search-min.png"
                    } />
                  </button>
              </div>
        )
    }
}
export default  SearchProduct;