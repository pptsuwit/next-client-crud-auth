"use client";
import { service } from "@/services/customer.service";
import { useEffect, useState } from "react";
import { getModalMessage } from "@/utils/helpers";

import Form from "@/components/baseComponent/Form/Form";

import { schema } from "@/zodSchema/customerSchema";
import * as z from "zod";
import { useGlobalContext } from "@/context/store";
type FormData = z.infer<typeof schema>;

export default function Page({ params }: { params: { slug: string } }) {
  const { setModal, setModalMessage } = useGlobalContext();
  const [data, setData] = useState<IFormData[]>([
    { type: "input", label: "First Name", name: "firstName", value: "", fieldGrid: 9, labelGrid: 3 },
    { type: "input", label: "Last Name", name: "lastName", value: "", fieldGrid: 9, labelGrid: 3 },
    { type: "input", label: "Email", name: "email", value: "", fieldGrid: 9, labelGrid: 3 },
    { type: "input", label: "Address", name: "address", value: "", fieldGrid: 9, labelGrid: 3 },
    { type: "input", label: "Phone Number", name: "phone", value: "", fieldGrid: 9, labelGrid: 3 },
    { type: "date", label: "Birth Date", name: "birthdate", value: "", fieldGrid: 9, labelGrid: 3 },
  ]);
  useEffect(() => {
    gets();
  }, []);
  async function gets() {
    await service
      .getById(params.slug)
      .then(async (response: IResponse<ICustomer>) => {
        const item = response.data;
        // const customer: IFormData[] = [
        //   { type: "input", label: "First Name", name: "firstName", value: item.firstName, fieldGrid: 9, labelGrid: 3 },
        //   { type: "input", label: "Last Name", name: "lastName", value: item.lastName, fieldGrid: 9, labelGrid: 3 },
        //   { type: "input", label: "Email", name: "email", value: item.email, fieldGrid: 9, labelGrid: 3 },
        //   { type: "input", label: "Address", name: "address", value: item.address, fieldGrid: 9, labelGrid: 3 },
        //   { type: "input", label: "Phone Number", name: "phone", value: item.phone, fieldGrid: 9, labelGrid: 3 },
        //   { type: "date", label: "Birth Date", name: "birthdate", value: item.birthdate, fieldGrid: 9, labelGrid: 3 },
        // ];
        // setData(customer);
        data[0].value = item.firstName;
        data[1].value = item.lastName;
        data[2].value = item.email;
        data[3].value = item.address;
        data[4].value = item.phone;
        data[5].value = item.birthdate;
        setData([...data]);
      })
      .catch((err) => {
        setModal(true);
        setModalMessage(getModalMessage("error", err));
      });
  }

  async function onSubmit(data: FormData) {
    const customer: ICustomer = {
      id: params.slug,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      birthdate: data.birthdate as string,
    };
    await service
      .update(customer)
      .then(async () => {
        setModal(true);
        setModalMessage(getModalMessage("update_success"));
      })
      .catch((err) => {
        setModal(true);
        setModalMessage(getModalMessage("error", err));
      });
  }
  return <Form data={data} schema={schema} onSubmit={onSubmit} />;
}
