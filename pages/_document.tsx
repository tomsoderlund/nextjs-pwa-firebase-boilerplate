import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

import { config } from '../config/config'

export default class MyDocument extends Document {
  // this.props (Server only): __NEXT_DATA__, ampPath, assetPrefix, bodyTags, canonicalBase, dangerousAsPath, dataOnly, devFiles, dynamicImports, files, hasCssMode, head, headTags, html, htmlProps, hybridAmp, inAmpMode, isDevelopment, polyfillFiles, staticMarkup, styles
  // Page props in: this.props.__NEXT_DATA__.props.pageProps
  render (): React.ReactElement {
    const { locale } = this.props.__NEXT_DATA__
    return (
      <Html lang={locale}>
        <Head>
          <link rel='stylesheet' href={`https://fonts.googleapis.com/css2?${config.fonts?.map(([fontName, fontWeight]) => `family=${`${fontName.replace(/ /g, '+')}${fontWeight !== undefined ? ':' + fontWeight : ''}`}`).join('&') ?? ''}&display=swap`} />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {config.googleAnalyticsId !== undefined
            ? (
              <>
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId as string}`} />
                <script
                  dangerouslySetInnerHTML={{
                    __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${config.googleAnalyticsId as string}');`
                  }}
                />
              </>
              )
            : null}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
