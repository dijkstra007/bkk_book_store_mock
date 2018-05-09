import React from "react";

class PaginationButtonList extends React.Component {
  onPageButtonClick = page => {
    this.props.onButtonClick(page);
  };
  getStartStopButtonPosition = (current, show, n) => {
    let start = 0;
    let stop = 0;
    if (current <= show - 1) {
      start = 1;
      stop = show;
    } else if (current >= n - show + 2) {
      start = n - show + 1;
      stop = n;
    } else {
      start = current - 1;
      stop = start + show - 1;
    }
    return { startButton: start, stopButton: stop };
  };
  render() {
    const nPage = this.props.nPage;
    const buttonList = [];
    const currentPage = this.props.current;
    const showButton = this.props.showButton;

    const { startButton, stopButton } = this.getStartStopButtonPosition(
      currentPage,
      showButton,
      nPage
    );

    for (let i = startButton; i <= stopButton && i <= nPage; i++) {
      buttonList.push(
        <button
          className={currentPage == i ? "pblb_active" : "pblb_inactive"}
          key={i}
          onClick={() => {
            this.onPageButtonClick(i);
          }}
        >
          {i}
        </button>
      );
    }
    return (
      <div>
        <button
          className="pblb_inactive"
          onClick={() => {
            this.onPageButtonClick(currentPage -1);
          }}
        >
          Previous
        </button>
        {buttonList.map(button => {
          return button;
        })}
        <button
          className="pblb_inactive"
          onClick={() => {
            this.onPageButtonClick(currentPage + 1);
          }}
        >
          Next
        </button>
      </div>
    );
  }
}
export default PaginationButtonList;
