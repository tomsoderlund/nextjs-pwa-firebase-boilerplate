import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

import { config } from 'config/config'

export default class MyDocument extends Document {
  // this.props (Server only): __NEXT_DATA__, ampPath, assetPrefix, bodyTags, canonicalBase, dangerousAsPath, dataOnly, devFiles, dynamicImports, files, hasCssMode, head, headTags, html, htmlProps, hybridAmp, inAmpMode, isDevelopment, polyfillFiles, staticMarkup, styles
  // Page props in: this.props.__NEXT_DATA__.props.pageProps
  render () {
    return (
      <Html lang={config.locale.split('_')[0]}>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {config.googleAnalyticsId
            ? (
              <>
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}`} />
                <script
                  dangerouslySetInnerHTML={{
                    __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments)}; gtag('js', new Date()); gtag('config', '${config.googleAnalyticsId}');`
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
