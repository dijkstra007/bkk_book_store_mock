import React from "react";
import stylesheet from "../styles/styles.scss";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import { AppWithAuthentication } from "../components/App";
import '../../env.config'
const liveChatHtml = `<!--Start of Tawk.to Script-->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/5a9e0a83d7591465c708481b/default';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
<!--End of Tawk.to Script-->`;

const googleCaptchaHtml = `<script src='https://www.google.com/recaptcha/api.js'></script>`
const googleAnaliyticsHtml = `<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-114812733-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-114812733-1');
</script>
`
class MainLayout extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    window.scrollTo(0, 0)
   }

  render() {
    return (
      <AppWithAuthentication >
        <style jsx global>{`
      body { 
        margin: 0;
      }
    `}</style>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <div dangerouslySetInnerHTML={{ __html: googleCaptchaHtml }} />
        <div dangerouslySetInnerHTML={{ __html: googleAnaliyticsHtml }} />
        {/* <style>{stylesheet}</style> */}

        <div dangerouslySetInnerHTML={{ __html: liveChatHtml }} />
        <Header pathname={this.props.pathname} query={this.props.query} />
        {this.props.children}
        <Footer />
      </AppWithAuthentication>
    );
  }
}

export default MainLayout;
