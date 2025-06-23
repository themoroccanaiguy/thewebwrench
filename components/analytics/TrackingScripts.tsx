'use client';

import { useEffect } from 'react';
import Script from 'next/script';

// Replace these with your actual tracking IDs
const META_PIXEL_ID = '1387677012472032';
const GA_MEASUREMENT_ID = 'G-19250J3074';

// Type definitions for the global window object
declare global {
  interface Window {
    fbq: FBQ.FacebookPixel;
    gtag: Gtag.Gtag;
    dataLayer: any[];
  }
  
  namespace FBQ {
    interface FacebookPixel {
      (command: 'init', id: string): void;
      (command: 'track', event: string, params?: Record<string, any>): void;
      push(...args: any[]): void;
      loaded?: boolean;
      version?: string;
      queue?: any[];
    }
  }
  
  namespace Gtag {
    interface Gtag {
      (command: 'config', targetId: string, config?: Record<string, any>): void;
      (command: 'event', eventName: string, eventParams?: Record<string, any>): void;
      (command: 'set', targetId: string, config: string | boolean | Record<string, any>): void;
      (command: 'get', targetId: string, fieldName: string, callback?: (field: any) => void): void;
      (command: 'consent', consentArg: string, consentParams: Record<string, any>): void;
      (command: 'js', config: Date): void;
    }
  }
}

export function TrackingScripts() {
  useEffect(() => {
    // Initialize Meta Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      try {
        window.fbq('init', META_PIXEL_ID);
        window.fbq('track', 'PageView');
      } catch (error) {
        console.error('Error initializing Meta Pixel:', error);
      }
    }

    // Initialize Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      try {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: window.location.pathname,
          send_page_view: true,
        });
      } catch (error) {
        console.error('Error initializing Google Analytics:', error);
      }
    }
  }, []);

  // Don't render anything if we're on the server
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <>
      {/* Meta Pixel Code */}
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}
