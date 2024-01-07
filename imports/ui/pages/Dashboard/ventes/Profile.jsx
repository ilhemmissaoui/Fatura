import React from "react";

const Profile = () => {
  $(() => {
    $("#edit-preferences").click(function () {
      $("#edit-preferences-modal").addClass("is-active");
    });
    $(".modal-card-head button.delete, .modal-save, .modal-cancel").click(
      function () {
        $("#edit-preferences-modal").removeClass("is-active");
      }
    );
  });
  return (
    <div>
      <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
        <div className="p-1">
          <div className="columns is-variable is-desktop">
            <div className="column">
              <div className="columns">
                <div className="container profile">
                  <div className="modal" id="edit-preferences-modal">
                    <div className="modal-background" />
                    <div className="modal-card">
                      <header className="modal-card-head">
                        <p className="modal-card-title">Edit Preferences</p>
                        <button className="delete" />
                      </header>
                      <section className="modal-card-body">
                        <label className="label">Name</label>
                        <p className="control">
                          <input
                            className="input"
                            placeholder="Text input"
                            type="text"
                          />
                        </p>
                        <label className="label">Username</label>
                        <p className="control has-icon has-icon-right">
                          <input
                            className="input"
                            placeholder="Text input"
                            type="text"
                            defaultValue="pmillerk"
                          />
                        </p>
                        <label className="label">Email</label>
                        <p className="control has-icon has-icon-right">
                          <input
                            className="input"
                            placeholder="Email input"
                            type="text"
                            defaultValue="hello@"
                          />
                          <i className="fa fa-warning" />
                          <span className="help is-danger">
                            This email is invalid
                          </span>
                        </p>
                        <div className="control">
                          <div className="control-label is-pulled-left">
                            <label className="label">Date of Birth</label>
                          </div>
                          <span>
                            <span className="select">
                              <select>
                                <option>Month</option>
                                <option>With options</option>
                              </select>
                            </span>
                            <span className="select">
                              <select>
                                <option>Day</option>
                                <option>With options</option>
                              </select>
                            </span>
                            <span className="select">
                              <select>
                                <option>Year</option>
                                <option>With options</option>
                              </select>
                            </span>
                          </span>
                        </div>
                        <label className="label">Description</label>
                        <p className="control">
                          <textarea
                            className="textarea"
                            placeholder="Describe Yourself!"
                            defaultValue={""}
                          />
                        </p>
                        <div className="content">
                          <h1>Optional Information</h1>
                        </div>
                        <label className="label">Phone Number</label>
                        <p className="control has-icon has-icon-right">
                          <input
                            className="input"
                            placeholder="Text input"
                            type="text"
                            defaultValue="+1 *** *** 0535"
                          />
                        </p>
                        <label className="label">Work</label>
                        <p className="control has-icon has-icon-right">
                          <input
                            className="input"
                            placeholder="Text input"
                            type="text"
                            defaultValue="Greater Washington Publishing"
                          />
                        </p>
                        <label className="label">School</label>
                        <p className="control has-icon has-icon-right">
                          <input
                            className="input"
                            placeholder="Text input"
                            type="text"
                            defaultValue="George Mason University"
                          />
                        </p>
                      </section>
                      <footer className="modal-card-foot">
                        <a className="button is-primary modal-save">
                          Save changes
                        </a>
                        <a className="button modal-cancel">Cancel</a>
                      </footer>
                    </div>
                  </div>
                  <div className="section profile-heading">
                    <div className="columns is-mobile is-multiline">
                      <div className="column is-2">
                        <span className="header-icon user-profile-image">
                          <img alt src="http://placehold.it/300x225" />
                        </span>
                      </div>
                      <div className="column is-4-tablet is-10-mobile name">
                        <p>
                          <span className="title is-bold">Paul Miller</span>
                          <br />
                          <a
                            className="button is-primary is-outlined"
                            href="#"
                            id="edit-preferences"
                            style={{ margin: "5px 0" }}
                          >
                            Edit Preferences
                          </a>
                          <br />
                        </p>
                        <p className="tagline">
                          The users profile bio would go here, of course. It
                          could be two lines or more or whatever. We should
                          probably limit the amount of characters to ~500 at
                          most though.
                        </p>
                      </div>
                      <div className="column is-2-tablet is-4-mobile has-text-centered">
                        <p className="stat-val">30</p>
                        <p className="stat-key">searches</p>
                      </div>
                      <div className="column is-2-tablet is-4-mobile has-text-centered">
                        <p className="stat-val">10</p>
                        <p className="stat-key">likes</p>
                      </div>
                      <div className="column is-2-tablet is-4-mobile has-text-centered">
                        <p className="stat-val">3</p>
                        <p className="stat-key">lists</p>
                      </div>
                    </div>
                  </div>
                  <div className="profile-options is-fullwidth">
                    <div className="tabs is-fullwidth is-medium">
                      <ul>
                        <li className="link">
                          <a>
                            <span className="icon">
                              <i className="fa fa-list" />
                            </span>
                            <span>My Lists</span>
                          </a>
                        </li>
                        <li className="link is-active">
                          <a>
                            <span className="icon">
                              <i className="fa fa-thumbs-up" />
                            </span>
                            <span>My Likes</span>
                          </a>
                        </li>
                        <li className="link">
                          <a>
                            <span className="icon">
                              <i className="fa fa-search" />
                            </span>
                            <span>My Searches</span>
                          </a>
                        </li>
                        <li className="link">
                          <a>
                            <span className="icon">
                              <i className="fa fa-balance-scale" />
                            </span>
                            <span>Compare</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="box" style={{ borderRadius: 0 }}>
                    {/* Main container */}
                    <div className="columns">
                      <div className="column is-2-tablet user-property-count has-text-centered">
                        <p className="subtitle is-5">
                          <strong />
                          123
                          <br />
                          properties
                        </p>
                      </div>
                      <div className="column is-8">
                        <p className="control has-addons">
                          <input
                            className="input"
                            placeholder="Search your liked properties"
                            style={{ width: "100% !important" }}
                            type="text"
                          />
                          <button className="button">Search</button>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="container mx-auto px-4 sm:px-8">
                    <div className="py-8">
                      <div>
                        <h2 className="text-2xl font-semibold leading-tight">
                          Users
                        </h2>
                      </div>
                      <div className="my-2 flex sm:flex-row flex-col">
                        <div className="flex flex-row mb-1 sm:mb-0">
                          <div className="relative">
                            <select className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                              <option>5</option>
                              <option>10</option>
                              <option>20</option>
                            </select>
                          </div>
                          <div className="relative">
                            <select className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                              <option>All</option>
                              <option>Active</option>
                              <option>Inactive</option>
                            </select>
                          </div>
                        </div>
                        <div className="block relative">
                          <input
                            placeholder="Search"
                            className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                          <table className="min-w-full leading-normal">
                            <thead>
                              <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                  User
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                  Rol
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                  Created at
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 w-10 h-10">
                                      <img
                                        className="w-full h-full rounded-full"
                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                        alt
                                      />
                                    </div>
                                    <div className="ml-3">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        Vera Carpenter
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    Admin
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    Jan 21, 2020
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                    <span
                                      aria-hidden
                                      className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                    />
                                    <span className="relative">Activo</span>
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 w-10 h-10">
                                      <img
                                        className="w-full h-full rounded-full"
                                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                        alt
                                      />
                                    </div>
                                    <div className="ml-3">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        Blake Bowman
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    Editor
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    Jan 01, 2020
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                    <span
                                      aria-hidden
                                      className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                    />
                                    <span className="relative">Activo</span>
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 w-10 h-10">
                                      <img
                                        className="w-full h-full rounded-full"
                                        src="https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                        alt
                                      />
                                    </div>
                                    <div className="ml-3">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        Dana Moore
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    Editor
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    Jan 10, 2020
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <span className="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
                                    <span
                                      aria-hidden
                                      className="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
                                    />
                                    <span className="relative">Suspended</span>
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-5 py-5 bg-white text-sm">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 w-10 h-10">
                                      <img
                                        className="w-full h-full rounded-full"
                                        src="https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80"
                                        alt
                                      />
                                    </div>
                                    <div className="ml-3">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        Alonzo Cox
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-5 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    Admin
                                  </p>
                                </td>
                                <td className="px-5 py-5 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    Jan 18, 2020
                                  </p>
                                </td>
                                <td className="px-5 py-5 bg-white text-sm">
                                  <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                                    <span
                                      aria-hidden
                                      className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                                    />
                                    <span className="relative">Inactive</span>
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                            <span className="text-xs xs:text-sm text-gray-900">
                              Showing 1 to 4 of 50 Entries
                            </span>
                            <div className="inline-flex mt-2 xs:mt-0">
                              <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                                Prev
                              </button>
                              <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                                Next
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
