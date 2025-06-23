// Extend the Window interface to include fbq and gtag
declare global {
  interface Window {
    fbq: any; // You can replace 'any' with a more specific type if available
    gtag: any; // You can replace 'any' with a more specific type if available
    dataLayer: any[];
  }
}

export {};
