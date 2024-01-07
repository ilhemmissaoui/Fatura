import React, { useEffect, useState } from "react";
import Typical from "react-typical";
const StockHome = () => {
  
 

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
                  steps={["  Stock Management", 1000]}
                />
              </h1>
            </div>
          </div>

         
          <div className="p-1">
          <div className="columns is-variable is-desktop">
            <div className="column">
            <section class="hero is-primary">
  <div class="hero-body">
    <p class="title">
      let's start managing purchases
    </p>
    <p class="subtitle">
      

    opportunity management, stock forecasting, and reporting and management techniques that empower stock representatives to meet and surpass their targets.
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

export default StockHome;
