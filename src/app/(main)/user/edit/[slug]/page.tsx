"use client";
import { service } from "@/services/user.service";
import { useEffect, useState } from "react";
import { getModalMessage } from "@/utils/helpers";
import Form from "@/components/baseComponent/Form/Form";

import { schemaEdit } from "@/zodSchema/userSchema";
import * as z from "zod";
import { useGlobalContext } from "@/context/store";
type FormData = z.infer<typeof schemaEdit>;

export default function Page({ params }: { params: { slug: string } }) {
  const { setModal, setModalMessage } = useGlobalContext();
  const [data, setData] = useState<IFormData[]>([
    { type: "input", label: "First Name", name: "firstName", value: "", fieldGrid: 9, labelGrid: 3 },
    { type: "input", label: "Last Name", name: "lastName", value: "", fieldGrid: 9, labelGrid: 3 },
    { type: "input", label: "Username (Email)", name: "username", value: "", fieldGrid: 9, labelGrid: 3 },
    // { type: "password", label: "Password", name: "password", value: "", fieldGrid: 9, labelGrid: 3 },
    // { type: "password", label: "Confirm Password", name: "confirmPassword", value: "", fieldGrid: 9, labelGrid: 3 },
  ]);
  useEffect(() => {
    gets();
  }, []);
  async function gets() {
    await service
      .getById(params.slug)
      .then(async (response: IResponse<IUserData>) => {
        const item = response.data;
        data[0].value = item.firstName;
        data[1].value = item.lastName;
        data[2].value = item.username;
        setData([...data]);
      })
      .catch((err) => {
        setModal(true);
        setModalMessage(getModalMessage("error", err));
      });
  }

  async function onSubmit(data: FormData) {
    const entity: IUserData = {
      id: params.slug,
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      // password: data.password as string,
    };
    await service
      .update(entity)
      .then(async () => {
        setModal(true);
        setModalMessage(getModalMessage("update_success"));
      })
      .catch((err) => {
        setModal(true);
        setModalMessage(getModalMessage("error", err));
      });
  }
  return <Form data={data} schema={schemaEdit} onSubmit={onSubmit} />;
}
