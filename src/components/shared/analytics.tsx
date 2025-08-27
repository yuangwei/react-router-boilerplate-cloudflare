import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';

export default function Analystics({
  unmamiId,
  gaId,
  crispId,
  adsenseId,
}: {
  unmamiId?: string | null;
  gaId?: string | null;
  crispId?: string | null;
  adsenseId?: string | null;
}) {
  return (
    <>
      {adsenseId && <meta name="google-adsense-account" content={adsenseId} />}
      {unmamiId && (
        <Script
          id="unmami-script"
          async
          src={`https://unmami.com/script.js?id=${unmamiId}`}
        />
      )}
      {gaId && <GoogleAnalytics gaId={gaId} />}
      {crispId && (
        <Script
          id="crisp-script"
          type="text/javascript"
          strategy="afterInteractive"
        >
          {`window.$crisp=[];window.CRISP_WEBSITE_ID="${crispId}";(function(){d = document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`}
        </Script>
      )}
    </>
  );
}
