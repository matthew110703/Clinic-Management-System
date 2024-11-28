import AccountOverview from "./AccountOverview";
import PatientRegistration from "./PatientRegistration";
import PatientUpdate from "./PatientUpdate";

export const renderForm = (formType) => {
  switch (formType) {
    case "accountOverview":
      return <AccountOverview />;
    case "addPatient":
      return <PatientRegistration />;
    case "updatePatient":
      return <PatientUpdate />;
    default:
      return <p>An Error Occured</p>;
  }
};
