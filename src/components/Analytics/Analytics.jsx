import React from 'react';
import { Helmet } from 'react-helmet-async';

function Analytics() {
  const id = process.env.REACT_APP_GA4_ID;
  if (!id) return null;
  return (
    <Helmet>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`}></script>
      <script>{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${id}');
      `}</script>
    </Helmet>
  );
}

export default Analytics; 