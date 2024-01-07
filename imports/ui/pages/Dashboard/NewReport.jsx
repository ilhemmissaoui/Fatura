import React from "react";
import { useForm } from "react-hook-form";
import ReportsList from "./ReportsList";
import { yupResolver } from "@hookform/resolvers/yup";
import { LinkSchema } from "../../../api/schemas/LinkSchema";
// import ReportsList from "../Dashboard/ReportsList";

const NewReport = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(LinkSchema),
  });
  const onSubmit = (data) => {
    console.log(data);
    Meteor.call("addlinks", data, (e, r) => {
      if (e) console.log(e);
    });
  };

  return (
    <>
      <div>
        <p>Add Links </p>
        <div className="mb-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className="form-control"
              name="url"
              placeholder="URL"
              ref={register}
            />
            <div className="invalid-feedback d-block">
              {errors.url?.message}
            </div>
            <button className="btn btn-primary w-100">Add Link</button>
          </form>
        </div>
        <ReportsList />
      </div>
    </>
  );
};
export default NewReport;
