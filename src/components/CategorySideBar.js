import React from "react";
import SubCategorySideBar from "./SubCategorySideBar";

class CategorySideBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const name = this.props.name;
    const sub_categories = this.props.sub_categories || [];
    const img = this.props.img;
    const query = this.props.query;
    
    return (
      <div className="category_sidebar_container">
        <div className="div-row category_sidebar_name_container" style={{lineHeight: "1px"}}>
          <img src={img} style={{width:'2.6rem',height:'2.6rem'}} />
          <div className="category_sidebar_name" style={{fontFamily: "db_heavent_med"}}>{name}</div>
        </div>
        <hr width="100%"/>
        {sub_categories.map((subCat, idx) => {
          return (
            <SubCategorySideBar
              {...this.props}
              key={idx}
              title={subCat.title}
              list={subCat.list}
              query = {query}
            />
          );
        })}
      </div>
    );
  }
}

export default CategorySideBar;
