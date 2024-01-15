"use client";
import { service } from "@/services/customer.service";
import { getModalMessage } from "@/utils/helpers";
import { useGlobalContext } from "@/context/store";
import Form from "@/components/baseComponent/Form/Form";

import { schema } from "@/zodSchema/customerSchema";
import * as z from "zod";
import { useRouter } from "next/navigation";
type FormData = z.infer<typeof schema>;

export default function Page() {
  const router = useRouter();
  const { setModal, setModalMessage } = useGlobalContext();

  async function onSubmit(data: FormData) {
    const customer: ICustomerData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      birthdate: data.birthdate as string,
    };
    await service
      .create(customer)
      .then(async () => {
        setModal(true);
        setModalMessage(getModalMessage("create_success"));
        router.push("/customer");
      })
      .catch((err) => {
        setModal(true);
        setModalMessage(getModalMessage("error", err));
      });
  }
  const data: IFormData[] = [
    { type: "input", label: "First Name", name: "firstName", value: "", fieldGrid: 9, labelGrid: 3 },
    { type: "input", label: "Last Name", name: "lastName", value: "", fieldGrid: 9, labelGrid: 3 },
    { type: "input", label: "Email", name: "email", value: "", fieldGrid: 9, labelGrid: 3 },
    { type: "input", label: "Address", name: "address", value: "", fieldGrid: 9, labelGrid: 3 },
    { type: "input", label: "Phone Number", name: "phone", value: "", fieldGrid: 9, labelGrid: 3 },
    { type: "date", label: "Birth Date", name: "birthdate", value: "", fieldGrid: 9, labelGrid: 3 },
  ];
  return <Form data={data} schema={schema} onSubmit={onSubmit} />;
}
