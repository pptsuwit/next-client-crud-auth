"use client";
import { getModalMessage } from "@/utils/helpers";
import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

type DataType = {
  firstName: string;
};

interface ContextProps {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  data: DataType[];
  setData: Dispatch<SetStateAction<DataType[]>>;
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  modalMessage: IModalMessage;
  setModalMessage: Dispatch<SetStateAction<IModalMessage>>;
}

const GlobalContext = createContext<ContextProps>({
  userId: "",
  setUserId: (): string => "",
  data: [],
  setData: (): DataType[] => [],
  modal: false,
  setModal: (): boolean => false,
  modalMessage: { title: "", message: "", status: "" },
  setModalMessage: (): IModalMessage => ({ title: "", message: "", status: "" }),
});

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState("");
  const [data, setData] = useState<DataType[] | []>([]);
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(getModalMessage());

  return (
    <GlobalContext.Provider value={{ userId, setUserId, data, setData, modal, setModal, modalMessage, setModalMessage }}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
