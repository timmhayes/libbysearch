import { Panel } from "./components/Panel"
import libraryImg from './img/library.svg';

export default function Start() {
  return(
    <>
      <h2>Search Libby Faster!</h2>
      <Panel title="Instructions">
        <p>The <a href="https://libbyapp.com/">Libby App</a> makes it easy to borrow books from your local library, but searching across multiple libraries with it can be tedious. So we built Libby Search to help out.</p>
        <p>This site requires no login to use. Just link up to all your libraries and search for the books you want. Then go directly to <a href="https://libbyapp.com/">Libby</a> to borrow like normal.</p>
        <p>Please Note: This website is not affiliated with, endorsed by, or sponsored by Libby. But Libby is a great app and if you don't have it now, go to their <a href="https://libbyapp.com/">website</a> or find it on the <a href="https://play.google.com/store/apps/details?id=com.overdrive.mobile.android.libby&hl=en_US&gl=US">Google Play</a> or Apple's <a href="https://apps.apple.com/us/app/libby-by-overdrive-labs/id1076402606">App Store</a>.</p>
        <h3>Click the "Find Libraries" tab above to get started!</h3>
        <img src={libraryImg} alt='library' className="img-responsive-center" style={{height: '256px', width: '256px'}} />
      </Panel>
    </>
  )
}