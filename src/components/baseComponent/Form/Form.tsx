"use client";

import { Button, Grid } from "@mui/material";
import { useEffect } from "react";
import TextField from "@mui/material/TextField";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import "dayjs/locale/en-gb";
import dayjs from "dayjs";
import { usePathname } from "next/navigation";
export default function Form(props: IForm) {
  type FormData = z.infer<typeof props.schema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(props.schema),
  });

  const pathname = usePathname();
  const backPath = `/${pathname.split("/")[1]}`;
  useEffect(() => {
    let defaultsValue: any;
    props?.data.map((item: any, index: number) => {
      defaultsValue = { ...defaultsValue, ...{ [item.name]: item.value } };
      if (props?.data?.length === index + 1) reset(defaultsValue);
    });
  }, [props.data]);

  const form = props?.data.map((item: IFormData) => {
    let input: React.ReactNode;
    if (item.type === "input" || item.type === "password") {
      input = (
        <>
          <TextField fullWidth {...register(item.name, { required: true })} id={item.name} type={item.type} variant="outlined" size={item.size || "medium"} />
          {errors?.[item.name] && <p className="text-red-600 text-sm">{errors?.[item.name]?.message as string}</p>}
        </>
      );
    } else if (item.type === "date") {
      input = (
        <>
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            {...register(item.name, { required: true })}
            id={item.name}
            type={item.type}
            variant="outlined"
            size={item.size || "medium"}
            inputProps={{ min: "1990-01-01", max: `${dayjs().year()}-12-31` }}
          />
          {errors?.[item.name] && <p className="text-red-600 text-sm">{errors?.[item.name]?.message as string}</p>}
        </>
      );
    }
    return (
      <Grid container className="items-center mb-5" key={item.label}>
        <Grid item xs={item.labelGrid || 3}>
          <div>{item.label}</div>
        </Grid>
        <Grid item xs={item.fieldGrid || 9}>
          {input}
        </Grid>
      </Grid>
    );
  });
  return (
    <div className="flex flex-col items-start justify-between p-10">
      <Grid container spacing={2}>
        <Grid item xs={12} className=" ">
          <form onSubmit={handleSubmit(props.onSubmit)}>
            <Grid container spacing={2} className="items-center">
              <Grid item xs={12}>
                {form}
              </Grid>
            </Grid>
            <Grid container spacing={2} className="flex justify-center items-center mt-4">
              <Grid item xs={2}>
                <Button variant="contained" fullWidth className="text-xl font-bold" type="submit">
                  Submit
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button href={backPath} variant="contained" fullWidth className="text-xl font-bold">
                  Back
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
