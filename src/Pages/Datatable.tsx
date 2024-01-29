import { Card } from "@mui/material";
import { useSelector } from "react-redux";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";
import { useEffect, useRef } from "react";

const Datatable = () => {
  const listOfUser = useSelector((store: any) => {
    return store.listOfUsers;
  });
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (tableRef.current) {
      // Initialize DataTable when component mounts
      $(tableRef.current).DataTable();
    }
  }, [listOfUser]);

  return (
    <>
      {listOfUser.length > 0 && (
        <Card sx={{ width: "100%", padding: 2, marginTop: 5 }}>
          <table id="example" className="display" ref={tableRef}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age / Sex</th>
                <th>Mobile</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {listOfUser.map((lst: any) => {
                const address =
                  (lst.address != "" ? lst.address + "," : "") +
                  (lst.city != "" ? lst.city + "," : "") +
                  (lst.state != "" ? lst.state + "," : "") +
                  (lst.country != "" ? lst.country + "," : "") +
                  (lst.zip != "" ? lst.zip + "" : "");
                return (
                  <tr>
                    <td>{lst.name}</td>
                    <td>{`${lst.age} / ${lst.gender}`}</td>
                    <td>{lst.mobile}</td>
                    <td>{address}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}
    </>
  );
};

export default Datatable;
