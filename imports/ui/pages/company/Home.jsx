import React, { useEffect, useState } from "react";
import Typical from "react-typical";
const Home = () => {
  
 

  

  return (
    <div>
      <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
        <div className="p-1">
          <div className="columns is-variable is-desktop">
            <div className="column">
              <h1 className="title is-1">
                <Typical
                  loop={Infinity}
                  wrapper="b"
                  steps={["  Welcome to our website", 1000]}
                />
              </h1>
            </div>
          </div>
         
          <h1 className="title is-1"> Paying invoices made easy </h1>

         
        <div className="p-1">
          <div className="columns is-variable is-desktop">
            <div className="column">
            <section class="hero is-primary">
  <div class="hero-body">
    <p class="title">
      E-Bill
    </p>
    <p class="subtitle">
      

eBill is the digital invoice for Switzerland. With eBill, you no longer receive your invoices by mail or e-mail but direct in your e-banking – where you can also pay them. With just a few clicks, you can check and pay with full control over all transactions.

Over two million Swiss invoice recipients currently use eBill. Make it easier for yourself and register for eBill here.

    </p>
  </div>
</section>
             </div> </div>
            </div>
          </div>
        </div>
      </div>

  );
};

export default Home;
