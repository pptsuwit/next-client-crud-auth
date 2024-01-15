"use client";
import { service } from "@/services/user.service";
import { useEffect, useState } from "react";
import { getModalMessage, getPage } from "@/utils/helpers";
import TableForm from "@/components/baseComponent/Form/TableForm";

import AddIcon from "@mui/icons-material/Add";
import { useGlobalContext } from "@/context/store";
const headers: ITableHeader[] = [
  { name: "name", value: "Full Name", width: "220px" },
  { name: "email", value: "Email" },
];

export default function Page() {
  const page = getPage();
  const { setModal, setModalMessage } = useGlobalContext();
  const [items, setItems] = useState<IUserTable[]>([]);
  const [pagination, setPagination] = useState<IPagination>();

  useEffect(() => {
    gets(page);
  }, []);
  async function gets(page: IPage) {
    await service
      .gets(page)
      .then(async (item: IResponseData<IUser>) => {
        console.log(item);
        const reArrangeData = item.data.map((element) => {
          return {
            name: `${element.firstName} ${element.lastName}`,
            username: element.username,
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
    <TableForm
      createButton={true}
      createButtonIcon={<AddIcon></AddIcon>}
      createButtonName="Add User"
      size="small"
      items={items}
      headers={headers}
      pagination={pagination}
      actions={true}
      actionButton={{
        edit: true,
        delete: true,
      }}
      delete={onDelete}
      changePage={gets}
    />
  );
}
