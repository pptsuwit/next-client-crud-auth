import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { IconButton, Pagination, Typography } from "@mui/material";
import PageviewIcon from "@mui/icons-material/Pageview";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.primary.main,
    // color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function DataTable(props?: ITable) {
  const router = useRouter();
  const pathname = usePathname();
  const [defaultPage] = React.useState(Number(useSearchParams().get("page")) | 1);
  let data: any = [];
  props?.data?.map((item) => {
    data.push(Object.values(item));
  });
  const headers = props?.headers;

  function onDeleteButtonClick(element: string) {
    props?.onDelete(element);
  }
  function handleChangePage(event: React.ChangeEvent<unknown> | null, newPage: number) {
    router.push(`${pathname}?page=${newPage}&pageSize=${props?.pagination?.pageSize}`);
    props?.onChangePage({
      page: newPage.toString(),
      size: props?.pagination?.pageSize,
    });
  }
  const tableCell = data.length ? (
    data.map((item: any, key: number) => {
      return (
        <StyledTableRow key={key}>
          {item.map((element: any, index: number) => {
            if (item.length === index + 1) {
              return (
                <StyledTableCell align="center" key={index}>
                  {props?.actionButton?.edit && props?.actions ? (
                    <Link href={`${pathname}/edit/${element}`}>
                      <IconButton color="primary" aria-label="edit">
                        <EditIcon />
                      </IconButton>
                    </Link>
                  ) : (
                    ""
                  )}
                  {props?.actionButton?.delete && props?.actions ? (
                    <IconButton color="error" aria-label="delete" onClick={() => onDeleteButtonClick(element)}>
                      <DeleteIcon />
                    </IconButton>
                  ) : (
                    ""
                  )}
                  {props?.actionButton?.view && props?.actions ? (
                    <Link href={`${pathname}/view/${element}`}>
                      <IconButton color="success" aria-label="view">
                        <PageviewIcon />
                      </IconButton>
                    </Link>
                  ) : (
                    ""
                  )}
                </StyledTableCell>
              );
            }
            return (
              <StyledTableCell
                sx={{
                  maxWidth: headers?.at(index)?.width,
                }}
                align={headers?.at(index)?.align || "center"}
                key={index}
              >
                {element}
              </StyledTableCell>
            );
          })}
        </StyledTableRow>
      );
    })
  ) : (
    <StyledTableRow>
      <StyledTableCell align="center" colSpan={(headers?.length || 0) + (props?.actions ? 1 : 0) || 0}>
        <Typography className="text-zinc-300 pt-4" variant="h4" gutterBottom>
          Data not found!
        </Typography>
      </StyledTableCell>
    </StyledTableRow>
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} size={props?.size || "medium"} aria-label="simple table">
          <TableHead>
            <TableRow className="">
              {props?.headers?.map((item, index) => (
                <StyledTableCell
                  key={index}
                  align={item.align || "center"}
                  sx={{
                    minWidth: item.width,
                  }}
                >
                  {item.value}
                </StyledTableCell>
              ))}
              {props?.actions ? (
                <StyledTableCell
                  align={"center"}
                  sx={{
                    minWidth: (props?.actionButton?.edit ? 60 : 0) + (props?.actionButton?.delete ? 60 : 0) + (props?.actionButton?.view ? 60 : 0),
                  }}
                >
                  Action
                </StyledTableCell>
              ) : (
                <></>
              )}
            </TableRow>
          </TableHead>
          <TableBody>{tableCell}</TableBody>
        </Table>
      </TableContainer>

      <Pagination
        onChange={handleChangePage}
        className="mt-5"
        color="primary"
        count={props?.pagination?.totalPage}
        defaultPage={defaultPage ? defaultPage : 1}
        siblingCount={1}
        boundaryCount={3}
      />
    </>
  );
}
