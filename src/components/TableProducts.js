import React from "react";
import PreviewProduct from "./PreviewProduct";

class TableProducts extends React.Component {
  render() {
    const chunckProduct = this.props.products;
    const previewSize = { width: 210, height: 210 };
    return chunckProduct? 
     (
      <div>
        {chunckProduct.map((productList, idx) => {
          return (
            <div key={idx} className="pageable_container_list_body">
              {productList.map((product, idx) => {
                return (
                  <PreviewProduct
                    key={idx}
                    product={product}
                    imgSize={previewSize}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    ) : null
  }
}

export default TableProducts;