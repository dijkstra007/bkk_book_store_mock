import React from "react";
import Router from "next/router";
import { connect } from "react-redux";
import {
  sortByBestSeller,
  sortByCreatedAt,
  sortByPrice
} from "../actions/sort";

class SortList extends React.Component {
  constructor(props) {
    super(props);
  }
  onSortChange(e) {
    let sortObj = {};
    switch (e.target.value) {
      case "best_seller":
        sortObj = {
          sortBy: "soldItems",
          order: "DESC"
        };
        break;
      case "newest":
        sortObj = {
          sortBy: "createdAt",
          order: "DESC"
        };
        break;
      case "lowest_price":
        sortObj = {
          sortBy: "price",
          order: "ASC"
        };
        break;
      case "highest_price":
        sortObj = {
          sortBy: "price",
          order: "DESC"
        };
        break;
      default:
        sortObj = {
          sortBy: "createdAt",
          order: "DESC"
        };
        break;
    }
    console.log("sortObj", sortObj);

    Router.push({
      pathname: "/productCategory",
      query: {
        ...this.props,
        activeSortBy: sortObj.sortBy,
        activeSortOrder: sortObj.order,
        activePage: 1
      }
    });
  }
  render() {
    return (
      <div className="address__row">
        <div className="select form-control" style={{ width: "100%" }}>
          <select
            title="เรียงตาม"
            style={{ color: "#000000", border: "solid 1px #95989A" }}
            required
            onChange={e => {
              this.onSortChange(e);
            }}
          >
            <option value="best_seller" style={{ cursor: "pointer" }}>
              ขายดีที่สุด
            </option>
            <option value="newest" style={{ cursor: "pointer" }}>
              ใหม่ล่าสุด
            </option>
            <option value="lowest_price" style={{ cursor: "pointer" }}>
              ราคาต่ำสุด
            </option>
            <option value="highest_price" style={{ cursor: "pointer" }}>
              ราคาสูงสุด
            </option>
          </select>
        </div>
      </div>
    );
  }
}
export default connect(undefined, undefined)(SortList);
