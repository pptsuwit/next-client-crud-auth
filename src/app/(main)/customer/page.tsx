"use client";
import { service } from "@/services/customer.service";
import { useEffect, useState } from "react";
import { getModalMessage, getPage } from "@/utils/helpers";
import TableForm from "@/components/baseComponent/Form/TableForm";

import AddIcon from "@mui/icons-material/Add";
import { useGlobalContext } from "@/context/store";
const headers: ITableHeader[] = [
  // { name: "customerId", value: "CustomerId" },
  { name: "name", value: "Full Name", width: "220px" },
  { name: "email", value: "Email" },
  { name: "phone", value: "Phone", width: "160px" },
  { name: "address", value: "Address", width: "280px" },
];

export default function Page() {
  const page = getPage();
  const { setModal, setModalMessage } = useGlobalContext();
  const [items, setItems] = useState<ICustomerTable[]>([]);
  const [pagination, setPagination] = useState<IPagination>();

  useEffect(() => {
    gets(page);
  }, []);
  async function gets(page: IPage) {
    await service
      .gets(page)
      .then(async (item: IResponseData<ICustomer>) => {
        const reArrangeData = item.data.map((element) => {
          return {
            // customerId: element.customerId,
            name: `${element.firstName} ${element.lastName}`,
            email: element.email,
            phone: element.phone,
            address: element.address,
            id: element.id,
          };
        });
        setItems(reArrangeData);
        const pagination = {
          page: item.pagination.currentPage,
          pageSize: item.pagination.recordPerPage,
          totalPage: item.pagination.totalPage,
        };
        setPagination(pagination);
      })
      .catch((err) => {
        console.log(err);
        setModal(true);
        setModalMessage(getModalMessage("error", err));
      });
  }
  async function onDelete(id: string) {
    await service
      .delete(id)
      .then(() => {
        gets(page);
        setModal(true);
        setModalMessage(getModalMessage("delete_success"));
      })
      .catch(() => {
        setModal(true);
        setModalMessage(getModalMessage("delete_error"));
      });
  }
  return (
    <div>
      <TableForm
        createButton={true}
        createButtonIcon={<AddIcon></AddIcon>}
        createButtonName="Add Customer"
        // createButtonStyle="!bg-red-300"
        size="small"
        items={items}
        headers={headers}
        pagination={pagination}
        actions={true}
        actionButton={{
          edit: true,
          delete: true,
          // view: true,
        }}
        delete={onDelete}
        changePage={gets}
      />
      {/* <DataTable
        data={items}
        headers={headers}
        pagination={pagination}
        actions={true}
        actionButton={{
          edit: true,
          delete: true,
          // view: true,
        }}
        onDelete={onDelete}
        onChangePage={gets}
      /> */}
    </div>
  );
}
