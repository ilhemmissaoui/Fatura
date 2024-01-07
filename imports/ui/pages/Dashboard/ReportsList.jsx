import React, { useState, useEffect } from "react";
import { Tracker } from "meteor/tracker";
import { Meteor } from "meteor/meteor";
import { LinksCollection } from "../../../../collections/links";
import ReportItems from "./ReportItems";

const ReportsList = (props) => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    console.log("lifecycle");
    Tracker.autorun(() => {
      Meteor.subscribe("linkPub");
      const link = LinksCollection.find().fetch();
      console.log("new  links", link);
      setLinks(link);
    });
  }, []);

  console.log(links);

  return (
    <>
      <div className="page-wrapper">
        <div className="container-xl">
          <div>Link List</div>

          <div className="card">
            <div className="table-responsive">
              <table className="table table-vcenter card-table">
                <thead>
                  <tr>
                    <th>Link</th>
                    <th class="w-1">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {links?.map((link) => (
                    <ReportItems key={link._id} url={link.url} id={link._id} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportsList;
