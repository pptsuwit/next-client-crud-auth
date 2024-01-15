"use client";
import { service } from "@/services/user.service";
import { getModalMessage } from "@/utils/helpers";
import Form from "@/components/baseComponent/Form/Form";

import { schema } from "@/zodSchema/userSchema";
import * as z from "zod";
import { useGlobalContext } from "@/context/store";
type FormData = z.infer<typeof schema>;

export default function Page() {
  const { setModal, setModalMessage } = useGlobalContext();

  async function onSubmit(data: FormData) {
    const entity: IUserData = {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      password: data.password,
    };
    await service
      .create(entity)
      .then(async () => {
        setModal(true);
        setModalMessage(getModalMessage("create_success"));
      })
      .catch((err) => {
        setModal(true);
        setModalMessage(getModalMessage("error", err));
      });
  }
  const data: IFormData[] = [
    { type: "input", label: "First Name", name: "firstName", value: "", fieldGrid: 9, labelGrid: 3 },
    { type: "input", label: "Last Name", name: "lastName", value: "", fieldGrid: 9, labelGrid: 3 },
    { type: "input", label: "Username (Email)", name: "username", value: "", fieldGrid: 9, labelGrid: 3 },
    { type: "password", label: "Password", name: "password", value: "", fieldGrid: 9, labelGrid: 3 },
    { type: "password", label: "Confirm Password", name: "confirmPassword", value: "", fieldGrid: 9, labelGrid: 3 },
  ];
  return <Form data={data} schema={schema} onSubmit={onSubmit} />;
}
