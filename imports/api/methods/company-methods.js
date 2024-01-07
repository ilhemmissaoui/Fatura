import { Meteor } from "meteor/meteor";
import CompanyCollection from "../../../collections/company";
import Customers from "../../../collections/customers";
import Sales from "../../../collections/sales";
import Products from "../../../collections/product";
import { UpdateCustomerSchema } from "../schemas/CustomerSchema";
import { UpdateProductSchema } from "../schemas/ProductSchema";
import SaleSchema from "../schemas/SaleSchema";
import { UpdateSupplierrSchema } from "../schemas/SupplierSchema";
import Suppliers from "../../../collections/Supplier";
import customers from "../../../collections/customers";
import Images from "../../../collections/images";
import Supplier from "../../../collections/Supplier";
import Purchases from "../../../collections/suppliers_orders";
import Conversations from "../../../collections/messages/conversation";
import Messages from "../../../collections/messages/message";
const addInfo = async function (data) {
  CompanyCollection.insert({
    ...data,
    userId: this.userId,
  });
};

const addCustomer = function (data) {
  const isNotCompany =
    Roles.getRolesForUser(this.userId)[0]?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ _id: this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  Customers.insert({
    ...data,
    userId: isNotCompany ? me.profile?.companyId : this.userId,
    creationDate: new Date(),
  });
};
const addSupplier = function (data) {
  const isNotCompany =
    Roles.getRolesForUser(this.userId)[0]?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ _id: this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  Suppliers.insert({
    ...data,
    userId: isNotCompany ? me.profile?.companyId : this.userId,
    creationDate: new Date(),
  });
};

const addCompanyUser = function (data) {
  console.log(data);
  const info = {
    email: data.email,
    password: data.password,
    profile: {
      firstName: data.firstName,
      lastName: data.lastName,
      companyId: this.userId,
      phoneNumber: data.phoneNumber,
    },
  };
  const _id = Accounts.createUser(info);
  Roles.addUsersToRoles(_id, data.role);
  return _id;
};

const deleteCompanyUser = function (id) {
  Meteor.users.remove({ _id: id });
};

const updateCompanyUser = function ({ id, data }) {
  console.log(id);
  console.log(data);
  Meteor.users.update(id, {
    $set: {
      "emails.0.address": data.email,
      "profile.firstName": data.firstName,
      "profile.lastName": data.lastName,
      "profile.phoneNumber": data.phoneNumber,
    },
  });
};

const addCustomerFromExcel = function ({ data }) {
  const isNotCompany =
    Roles.getRolesForUser(this.userId)[0]?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ _id: this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  Customers.insert({
    ...data,
    userId: isNotCompany ? me.profile?.companyId : this.userId,
    creationDate: new Date(),
  });
};

const addSpplierFromExcel = function ({ data }) {
  const isNotCompany =
    Roles.getRolesForUser(this.userId)[0]?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ _id: this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  Suppliers.insert({
    ...data,
    userId: isNotCompany ? me.profile?.companyId : this.userId,
    creationDate: new Date(),
  });
};

const getProductsName = function () {
  return Products.find({ userId: this.userId }).fetch();
};
const getMiniCustomers = function () {
  const isNotCompany =
    Roles.getRolesForUser(this.userId)[0]?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ _id: this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  return customers
    .find({ userId: isNotCompany ? me.profile?.companyId : this.userId })
    .fetch();
};
const getSingleEstimateInfo = function (id) {
  return Sales.findOne({ _id: id });
};
const getSingleDelivery = function (id) {
  return Purchases.findOne({ _id: id });
};
const getMiniSuppliers = function () {
  const isNotCompany =
    Roles.getRolesForUser(this.userId)[0]?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ _id: this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  return Supplier.find({
    userId: isNotCompany ? me.profile?.companyId : this.userId,
  }).fetch();
};

const updateSaleStatus = function (_id, status) {
  Sales.update(
    { _id: _id },
    {
      $set: {
        status: status,
      },
    }
  );
};

const updateSupplyordertatus = function (_id, status) {
  Purchases.update(
    { _id: _id },
    {
      $set: {
        status: status,
      },
    }
  );
};

const deleteSupplyOrder = function (_id) {
  const isNotCompany =
    Roles.getRolesForUser(this.userId)[0]?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ _id: this.userId });
  Purchases.remove({
    _id,
    userId: isNotCompany ? me.profile?.companyId : this.userId,
  });
};

const updateDeliverySaleStatus = function (_id, status) {
  Sales.update(
    { _id: _id },
    {
      $set: {
        deliverStatus: status,
      },
    }
  );
};

const updateDeliverySupplyOrderStatus = function (_id, status) {
  Purchases.update(
    { _id: _id },
    {
      $set: {
        deliverStatus: status,
      },
    }
  );
};

const addSale = function (data) {
  const isNotCompany =
    Roles.getRolesForUser(this.userId)[0]?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ _id: this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  Sales.insert({
    ...data,
    status: "Idle",
    deliverStatus: "Idle",
    invoiceStatus: "idle",
    userId: isNotCompany ? me.profile?.companyId : this.userId,
    creationDate: new Date(),
  });
};

const updateEstimate = function (id, data, oldData) {
  // console.log(data);
  Sales.update(id, { $set: { productList: [] } });
  const isNotCompany =
    Roles.getRolesForUser(this.userId)[0]?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ _id: this.userId });
  Sales.update(id, {
    $set: {
      totalTHA: data.totalTHA,
      totalTVA: data.totalTVA,
      totaleVTA: data.totaleVTA,
      totaleTaxeIncl: data.totaleTaxeIncl,
      customer: data.customer,
      phoneNumber: data.phoneNumber,
      email: data.email,
      date: data.date,
      project: data.project,
      note: data.note,
      status: oldData.status,
      deliverStatus: oldData.deliverStatus,
      invoiceStatus: oldData.invoiceStatus,
    },
  });
  Sales.update(id, { $set: { productList: data.productList } });
  console.log(data);
};
const updateDelivery = function (id, data, oldData) {
  // console.log(data);
  Purchases.update(id, { $set: { productList: [] } });
  const isNotCompany =
    Roles.getRolesForUser(this.userId)[0]?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ _id: this.userId });
  Purchases.update(id, {
    $set: {
      totalTHA: data.totalTHA,
      totalTVA: data.totalTVA,
      totaleVTA: data.totaleVTA,
      totaleTaxeIncl: data.totaleTaxeIncl,
      supplier: data.customer,
      phoneNumber: data.phoneNumber,
      email: data.email,
      date: data.date,
      project: data.project,
      note: data.note,
      status: oldData.status,
      deliverStatus: oldData.deliverStatus,
      invoiceStatus: oldData.invoiceStatus,
    },
  });
  Purchases.update(id, { $set: { productList: data.productList } });
  console.log(data);
};

const addSupplierOrders = function (data) {
  const isNotCompany =
    Roles.getRolesForUser(this.userId)[0]?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ _id: this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  Purchases.insert({
    ...data,
    status: "Idle",
    deliverStatus: "Idle",
    invoiceStatus: "idle",
    userId: isNotCompany ? me.profile?.companyId : this.userId,
    creationDate: new Date(),
  });
};

const getEstimateInfo = function (id) {
  return Sales.findOne({ _id: id });
};
const getDeliveryeInfo = function (id) {
  return Purchases.findOne({ _id: id });
};

const getCustomers = function ({
  page,
  itemsPerPage,
  search,
  sortBy = "_id",
  sortOrder = "asc",
}) {
  const isNotCompany =
    Roles.getRolesForUser(this.userId)[0]?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ _id: this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,

  console.log(isNotCompany);
  const query = { userId: isNotCompany ? me.profile?.companyId : this.userId };
  const options = {
    skip: (page - 1) * itemsPerPage,
    limit: itemsPerPage,
    sort: {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    },
  };
  const totalCount = Customers.find({ userId: this.userId }).count();
  // IF SEARCH IS DEFINED && SEARCH LENGTH != 0 THEN WE ADD SEARCH STEP TO QUERY OBJECT
  if (search && search.length) {
    query.$or = [
      {
        fullName: {
          $regex: `.*${search}.*`,
          $options: "i",
        },
      },
      {
        _id: {
          $regex: `.*${search}.*`,
          $options: "i",
        },
      },
    ];
  }
  return { items: Customers.find(query, options).fetch(), totalCount };
};

const getCompanyUsers = function ({
  page,
  itemsPerPage,
  search,
  sortBy = "_id",
  sortOrder = "asc",
}) {
  const query = { "profile.companyId": this.userId };
  const options = {
    skip: (page - 1) * itemsPerPage,
    limit: itemsPerPage,
    sort: {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    },
  };
  const totalCount = Meteor.users
    .find({ "profile.companyId": this.userId })
    .count();
  if (search && search.length) {
    query.$or = [
      {
        fullName: {
          $regex: `.*${search}.*`,
          $options: "i",
        },
      },
      {
        _id: {
          $regex: `.*${search}.*`,
          $options: "i",
        },
      },
    ];
  }
  return { items: Meteor.users.find(query, options).fetch(), totalCount };
};

const getSuppliers = function ({
  page,
  itemsPerPage,
  search,
  sortBy = "_id",
  sortOrder = "asc",
}) {
  const isNotCompany =
    Roles.getRolesForUser(this.userId)[0]?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ _id: this.userId });

  console.log(isNotCompany);
  const query = { userId: !isNotCompany ? this.userId : me.profile?.companyId };
  const options = {
    skip: (page - 1) * itemsPerPage,
    limit: itemsPerPage,
    sort: {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    },
  };
  const totalCount = Suppliers.find({ userId: this.userId }).count();
  // IF SEARCH IS DEFINED && SEARCH LENGTH != 0 THEN WE ADD SEARCH STEP TO QUERY OBJECT
  if (search && search.length) {
    query.$or = [
      {
        fullName: {
          $regex: `.*${search}.*`,
          $options: "i",
        },
      },
      {
        _id: {
          $regex: `.*${search}.*`,
          $options: "i",
        },
      },
    ];
  }
  return { items: Suppliers.find(query, options).fetch(), totalCount };
};

const getSale = function ({
  page,
  itemsPerPage,
  search,
  sortBy = "_id",
  sortOrder = "asc",
}) {
  const isNotCompany =
    Roles.getRolesForUser(this.userId)[0]?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ _id: this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  const query = { userId: isNotCompany ? me.profile?.companyId : this.userId };
  const options = {
    skip: (page - 1) * itemsPerPage,
    limit: itemsPerPage,
    sort: {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    },
  };
  const totalCount = Sales.find({ userId: this.userId }).count();
  // IF SEARCH IS DEFINED && SEARCH LENGTH != 0 THEN WE ADD SEARCH STEP TO QUERY OBJECT
  if (search && search.length) {
    query.$or = [
      {
        customer: {
          $regex: `.*${search}.*`,
          $options: "i",
        },
      },
      {
        _id: {
          $regex: `.*${search}.*`,
          $options: "i",
        },
      },
    ];
  }
  return { items: Sales.find(query, options).fetch(), totalCount };
};

const getSupplyOrder = function ({
  page,
  itemsPerPage,
  search,
  sortBy = "_id",
  sortOrder = "asc",
}) {
  const isNotCompany =
    Roles.getRolesForUser(this.userId)[0]?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ _id: this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  const query = { userId: isNotCompany ? me.profile?.companyId : this.userId };
  const options = {
    skip: (page - 1) * itemsPerPage,
    limit: itemsPerPage,
    sort: {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    },
  };
  const totalCount = Sales.find({ userId: this.userId }).count();

  if (search && search.length) {
    query.$or = [
      {
        supplier: {
          $regex: `.*${search}.*`,
          $options: "i",
        },
      },
      {
        _id: {
          $regex: `.*${search}.*`,
          $options: "i",
        },
      },
    ];
  }
  return { items: Purchases.find(query, options).fetch(), totalCount };
};

const addProduct = function (data, imageId) {
  let url;
  if (imageId) {
    url = Images.findOne({ _id: imageId }).link();
  }
  console.log(url);
  const isNotCompany =
    Roles.getRolesForUser(this.userId)[0]?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ _id: this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  Products.insert({
    ...data,
    imageUrl: url ?? null,
    userId: isNotCompany ? me.profile?.companyId : this.userId,
    creationDate: new Date(),
  });
};

const getProducts = function ({
  page,
  itemsPerPage,
  search,
  sortBy = "_id",
  sortOrder = "asc",
}) {
  const isNotCompany =
    Roles.getRolesForUser(this.userId)[0]?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ _id: this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  const query = { userId: isNotCompany ? me.profile?.companyId : this.userId };
  const options = {
    skip: (page - 1) * itemsPerPage,
    limit: itemsPerPage,
    sort: {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    },
  };
  const totalCount = Sales.find({ userId: this.userId }).count();
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  // IF SEARCH IS DEFINED && SEARCH LENGTH != 0 THEN WE ADD SEARCH STEP TO QUERY OBJECT
  if (search && search.length) {
    query.$or = [
      {
        manufacturerreference: {
          $regex: `.*${search}.*`,
          $options: "i",
        },
      },
      {
        name: {
          $regex: `.*${search}.*`,
          $options: "i",
        },
      },
    ];
  }
  var data = { items: Products.find(query, options).fetch(), totalCount };
  console.log(data);
  return { items: Products.find(query, options).fetch(), totalCount };
};

const updateProduct = async function ({ id, data }) {
  console.log(data);
  const product = Products.findOne({ _id: id, userId: this.userId });
  if (!product) {
    throw new Meteor.Error("Product not found");
  }
  try {
    await UpdateProductSchema.validate(data);
  } catch (e) {
    throw new Meteor.Error(e.message);
  }
  Products.update({ _id: id }, { $set: data });
};

const deleteProduct = function (_id) {
  const isNotCompany =
    Roles.getRolesForUser(this.userId)[0]?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ _id: this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  Products.remove({
    _id,
    userId: isNotCompany ? me.profile?.companyId : this.userId,
  });
};
//*******updateProduct in the db*********
const updateCustomer = async function ({ id, data }) {
  console.log(data);
  const isNotCompany =
    Roles.getRolesForUser(this.userId)[0]?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ _id: this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  const customer = Customers.findOne({
    _id: id,
    userId: isNotCompany ? me.profile?.companyId : this.userId,
  });
  if (!customer) {
    throw new Meteor.Error("Customer not found");
  }
  try {
    await UpdateCustomerSchema.validate(data);
  } catch (e) {
    throw new Meteor.Error(e.message);
  }
  Customers.update({ _id: id }, { $set: data });
};

const updateSupplier = async function ({ id, data }) {
  console.log(data);
  const supplier = Suppliers.findOne({ _id: id, userId: this.userId });
  if (!supplier) {
    throw new Meteor.Error("Customer not found");
  }
  try {
    await UpdateSupplierrSchema.validate(data);
  } catch (e) {
    throw new Meteor.Error(e.message);
  }
  Suppliers.update({ _id: id }, { $set: data });
};

const updateSale = async function ({ id, data }) {
  console.log(data);
  const sale = Sales.findOne({ _id: id, userId: this.userId });
  if (!sale) {
    throw new Meteor.Error("Customer not found");
  }
  try {
    await SaleSchema.validate(data);
  } catch (e) {
    throw new Meteor.Error(e.message);
  }
  Sales.update({ _id: id }, { $set: data });
};

const deleteEstimate = function (_id) {
  Sales.remove({ _id });
};
const deleteSUpplierOrder = function (_id) {
  Purchases.remove({ _id });
};
const payAmount = function ({ _id, amount }) {
  let singleSale = Sales.findOne({ _id });
  let sale = parseFloat(singleSale.payedAmount ?? 0);

  if (parseFloat(singleSale.totaleTaxeIncl) - sale <= 0)
    throw new Meteor.Error("paying", "Amount Already Paid");
  if (parseFloat(singleSale.totaleTaxeIncl) - sale < amount)
    throw new Meteor.Error("paying", "Amount Bigger than the needed to pay");

  sale += parseFloat(amount);
  Sales.update({ _id }, { $set: { payedAmount: sale } });
  console.log(Sales.findOne({ _id }));
};
const paySupplierAmount = function ({ _id, amount }) {
  let singleSale = Purchases.findOne({ _id });
  let sale = parseFloat(singleSale.payedAmount ?? 0);

  if (parseFloat(singleSale.totaleTaxeIncl) - sale <= 0)
    throw new Meteor.Error("paying", "Amount Already Paid");
  if (parseFloat(singleSale.totaleTaxeIncl) - sale < amount)
    throw new Meteor.Error("paying", "Amount Bigger than the needed to pay");

  sale += parseFloat(amount);
  Purchases.update({ _id }, { $set: { payedAmount: sale } });
  console.log(Purchases.findOne({ _id }));
};
const deleteSale = function (_id) {
  const isNotCompany =
    Roles.getRolesForUser(this.userId)[0]?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ _id: this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  Sales.remove({
    _id,
    userId: isNotCompany ? me.profile?.companyId : this.userId,
  });
};
const deleteCustomer = function (_id) {
  const isNotCompany =
    Roles.getRolesForUser(this.userId)[0]?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ _id: this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  Customers.remove({
    _id,
    userId: isNotCompany ? me.profile?.companyId : this.userId,
  });
};

const deleteSupplier = function (_id) {
  const isNotCompany =
    Roles.getRolesForUser(this.userId)[0]?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ _id: this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  Suppliers.remove({
    _id,
    userId: isNotCompany ? me.profile?.companyId : this.userId,
  });
};

const getSalesStock = async function () {
  const isNotCompany =
    Roles.getRolesForUser(this.userId)[0]?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ _id: this.userId });
  const aggregation = [
    {
      $match: {
        userId: isNotCompany ? me.profile?.companyId : this.userId,
      },
    },
    {
      $unwind: {
        path: "$productList",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        productList: 1,
      },
    },
    {
      $group: {
        _id: "$productList.name",
        count: {
          $sum: 1,
        },
        quantity: {
          $sum: {
            $toInt: "$productList.quantity",
          },
        },
        total_TND: {
          $sum: "$productList.total",
        },
      },
    },
    {
      $project: {
        _id: 1,
        quantity: 1,
        total: "$total_TND",
      },
    },
  ];
  return await Sales.rawCollection().aggregate(aggregation).toArray();
};

const getPurchaseStocks = async function () {
  const isNotCompany =
    Roles.getRolesForUser(this.userId)[0]?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ _id: this.userId });
  const aggregation = [
    {
      $match: {
        userId: isNotCompany ? me.profile?.companyId : this.userId,
      },
    },
    {
      $unwind: {
        path: "$productList",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        productList: 1,
      },
    },
    {
      $group: {
        _id: "$productList.name",
        count: {
          $sum: 1,
        },
        quantity: {
          $sum: {
            $toInt: "$productList.quantity",
          },
        },
        total_TND: {
          $sum: "$productList.total",
        },
      },
    },
    {
      $project: {
        _id: 1,
        quantity: 1,
        total: "$total_TND",
      },
    },
  ];
  return await Purchases.rawCollection().aggregate(aggregation).toArray();
};

const getCustomerInfo = async function () {
  return await Customers.rawCollection()
    .aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "_id",
          foreignField: "userId",
          as: "info",
        },
      },
    ])
    .toArray();
};

const addProdutsFromExcel = function ({ data }) {
  const isNotCompany =
    Roles.getRolesForUser(this.userId)[0]?.toLowerCase() !== "company";
  const me = Meteor.users.findOne({ _id: this.userId });
  // isNotCompany ? me.profile?.companyId : this.userId,
  Products.insert({
    ...data,
    creationDate: new Date(),
    userId: isNotCompany ? me.profile?.companyId : this.userId,
  });
};

const sendMessage = function ({ message }) {
  const adminId = Meteor.users.findOne({
    "emails.0.address": "admin@mail.com",
  })._id;

  if (!adminId) throw new Meteor.Error("sendMessage", "admin not found ");

  if (!message || !message.trim().length)
    throw new Meteor.Error("sendMessage", "invalid info");

  let conversation = Conversations.findOne({
    participants: { $all: [adminId, this.userId] },
  });
  if (!conversation) {
    conversation = Conversations.findOne(
      Conversations.insert({
        participants: [adminId, this.userId],
      })
    );
  }
  Messages.insert({
    conversationId: conversation._id,
    createdAt: new Date(),
    content: message,
    sender: this.userId,
  });
};

Meteor.methods({
  addInfo,
  addCustomer,
  getCustomerInfo,
  getCustomers,
  updateCustomer,
  deleteCustomer,
  addSale,
  updateSale,
  deleteSale,
  getSale,
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  addSupplier,
  getSuppliers,
  deleteSupplier,
  updateSupplier,
  getProductsName,
  getMiniCustomers,
  updateSaleStatus,
  updateDeliverySaleStatus,
  addProdutsFromExcel,
  addCustomerFromExcel,
  getCompanyUsers,
  addCompanyUser,
  deleteCompanyUser,
  addSpplierFromExcel,
  getMiniSuppliers,
  updateCompanyUser,
  getEstimateInfo,
  addSupplierOrders,
  getSupplyOrder,
  updateSupplyordertatus,
  updateDeliverySupplyOrderStatus,
  getSalesStock,
  getPurchaseStocks,
  deleteEstimate,
  getSingleEstimateInfo,
  updateEstimate,
  sendMessage,
  payAmount,
  deleteSupplyOrder,
  getSingleDelivery,
  updateDelivery,
  deleteSUpplierOrder,
  paySupplierAmount,
  getDeliveryeInfo,
});
