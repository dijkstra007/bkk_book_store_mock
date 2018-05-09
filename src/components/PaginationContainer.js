import React from "react";
import PaginationButtonList from "./PaginationButtonList";
import { database } from "firebase";

const emptyComponent = () => <div>Empty Component</div>;
class PaginationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsList: [],
      currentPage: 1,
      maxPage: 1
    };
  }
  componentWillReceiveProps(nextProps) {
    const itemsPerPage = nextProps.itemsPerPage;
    const items = nextProps.items || [];
    const data = _.chunk(items, itemsPerPage);

    const maxPage =
      items.length % itemsPerPage == 0
        ? Math.floor(items.length / itemsPerPage)
        : Math.floor(items.length / itemsPerPage) + 1;
    this.setState({ itemsList: data,maxPage: maxPage });
  }
  onPaginationButtonClick = page => {
    if (page > this.state.maxPage) {
      page = this.state.maxPage;
    }
    this.setState({ currentPage: page });
  };
  getCSSPositionFromRawPosition = pos => {
    switch (pos) {
      case "left":
        return "flex-start";
      case "right":
        return "flex-end";
      case "middle":
        return "center";
      default:
        return "flex-start";
    }
  };
  render() {
    const MyComponent = this.props.Component || emptyComponent;
    console.log("MyComponent",MyComponent);
    const showPageButtonOnButtom = this.props.showBottom || true;
    const showPageButtonOnTop = this.props.showBottom || true;
    const nPage = this.state.maxPage;
    const pageButtonPosition = this.getCSSPositionFromRawPosition("right"); // 'left middle right'
    const index = this.state.currentPage - 1;
    const items = this.state.itemsList[index] || [];
    console.log("items",this.state.itemsList);
    return (
      <div >
        {showPageButtonOnTop ? (
          <div style={{ display: "flex", justifyContent: pageButtonPosition }}>
            <PaginationButtonList
              showButton={4}
              nPage={nPage}
              current={this.state.currentPage}
              onButtonClick={this.onPaginationButtonClick}
            />
          </div>
        ) : null}
        {items.map(item => {
          console.log("item----",item);
          return <MyComponent data={item} />;
        })}
        {showPageButtonOnButtom ? (
          <div style={{ display: "flex", justifyContent: pageButtonPosition }}>
            <PaginationButtonList
              showButton={4}
              nPage={nPage}
              current={this.state.currentPage}
              onButtonClick={this.onPaginationButtonClick}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default PaginationContainer;
