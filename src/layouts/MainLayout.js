import React from "react";
import stylesheet from "../styles/styles.scss";

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <style jsx global>{`
          body {
            margin: 0;
          }
        `}</style>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />

        {/* <Header pathname={this.props.pathname} query={this.props.query} /> */}
        {this.props.children}
      </div>
    );
  }
}

export default MainLayout;
