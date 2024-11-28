import { RenderActions } from "./renderActions";
import moment from "moment";
// This is the data for the table headers
// Table Actions List
export const tableActions = {
  tokenUpdate: "tokenUpdate",
  tokenCancel: "tokenCancel",
  viewPatient: "viewPatient",
  patientDetail: "patientDetail",
  generateBill: "generateBill",
  generateToken: "generateToken",
  editPatient: "editPatient",
  removeBill: "removeBill",
};

// Default column attributes(styling)
const columnConfig = {
  align: "center",
  headerAlign: "center",
  headerClassName: "text-xl font-bold",
  minWidth: 100,
};

export const columnHeaders = {
  tokensTable: [
    {
      field: "tokenNo",
      headerName: "Token No.",
      width: 150,
      ...columnConfig,
    },

    {
      field: "fullName",
      headerName: "Patient Name",
      width: 250,
      ...columnConfig,
    },
    { field: "status", headerName: "Status", width: 200, ...columnConfig },
    {
      field: "phone",
      headerName: "Ph No.",
      width: 200,
      valueGetter: (phone) => phone || "-",
      ...columnConfig,
    },
    {
      field: "createdAt",
      headerName: "Assigned",
      width: 200,
      valueGetter: (date) => moment(date).fromNow(),
      ...columnConfig,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => <RenderActions params={params} />,
      ...columnConfig,
    },
  ],
  servedTable: [
    {
      field: "tokenNo",
      headerName: "Token No.",
      ...columnConfig,
    },

    {
      field: "patientName",
      headerName: "Patient Name",
      width: 250,
      ...columnConfig,
    },
    { field: "phNo", headerName: "Ph No.", width: 200, ...columnConfig },
    {
      field: "consultedBy",
      headerName: "Consulted By",
      width: 200,
      ...columnConfig,
    },
    {
      field: "diagonsis",
      headerName: "Diagnosis",
      width: 250,
      ...columnConfig,
    },
    { field: "time", headerName: "Time", ...columnConfig },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => <RenderActions params={params} />,
      valueGetter: (params) => params,
      ...columnConfig,
    },
  ],
  patientsTable: [
    { field: "fullName", headerName: "Full Name", width: 200, ...columnConfig },
    { field: "gender", headerName: "Gender", width: 150, ...columnConfig },
    {
      field: "age",
      headerName: "Age",
      width: 100,
      valueGetter: (age) => `${age} years`,
      ...columnConfig,
    },
    { field: "phone", headerName: "Phone No.", width: 200, ...columnConfig },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      valueGetter: (email) => email || "-",
      ...columnConfig,
    },
    {
      field: "createdAt",
      headerName: "Registered On",
      width: 200,
      valueGetter: (date) => new Date(date).toDateString(),
      ...columnConfig,
    },
    {
      field: "updatedAt",
      headerName: "Last Visited On",
      width: 200,
      valueGetter: (date) => moment(date).fromNow(),
      ...columnConfig,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => <RenderActions params={params} />,
      ...columnConfig,
    },
  ],
  billsTable: [
    { field: "id", headerName: "Bill ID", ...columnConfig },
    {
      field: "dateIssued",
      headerName: "Date Issued",
      width: 250,
      ...columnConfig,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 250,
      ...columnConfig,
    },
    {
      field: "patientName",
      headerName: "Patient Name",
      width: 250,
      ...columnConfig,
    },
    { field: "phNo", headerName: "Phone No.", width: 200, ...columnConfig },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      valueGetter: (params) => params.row.patient.email || "N/A",
      ...columnConfig,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => <RenderActions params={params} />,
      ...columnConfig,
    },
  ],
};

// export const tokens = [
//   {
//     id: 1,
//     tokenNo: 1,
//     status: "Pending",
//     patientName: "John Doe",
//     phNo: "1234567890",
//     actions: [actions.removeBill, actions.generateBill],
//   },
//   {
//     id: 2,
//     tokenNo: 2,
//     status: "Pending",
//     patientName: "Jane Doe",
//     phNo: "1234567890",
//     actions: [actions.editPatient, actions.viewPatient, actions.generateToken],
//   },
//   {
//     id: 3,
//     tokenNo: 3,
//     status: "Pending",
//     patientName: "Jane Doe",
//     phNo: "1234567890",
//     actions: [actions.editPatient, actions.viewPatient, actions.generateToken],
//   },
// ];
