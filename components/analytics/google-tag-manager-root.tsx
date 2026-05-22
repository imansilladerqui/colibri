import { GoogleTagManager } from "@next/third-parties/google";
import { GTM_ID, isGtmEnabled } from "@/lib/analytics/gtm";

export const GoogleTagManagerRoot = () => {
  if (!isGtmEnabled()) return null;

  return (
    <>
      <GoogleTagManager gtmId={GTM_ID} />
      <noscript>
        <iframe
          title="Google Tag Manager"
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
};
