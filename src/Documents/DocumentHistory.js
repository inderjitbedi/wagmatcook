import React, { useState, useEffect } from "react";
import CommenDashHeader from "../Dashboard/CommenDashHeader";
import ROLES from "../constants/roles";
import API_URLS from "../constants/apiUrls";
import moment from "moment";
import { toast } from "react-toastify";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate, useLocation, useParams } from "react-router";
import Pagination from "@mui/material/Pagination";
import httpClient from "../api/httpClient";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import {
  DisciplinaryDiv,
  DisciplinaryHeading,
  AddNewButton,
  MenuIcon,
  MenuIconDiv,
  ActionIconDiv,
  ActionIcons,
  ModalUpperDiv,
  ModalHeading,
  ModalIcon,
  ModalUpperMid,
  Input,
  TextArea,
  InputLabel,
  InputSpan,
  InputPara,
  Select,
  Option,
  Errors,
  PendingStyle,
  ApproveStyle,
  PaginationDiv,
  FlexContaier,
} from "../Disciplinary/DisciplinaryStyles";
import { IconsEmployee } from "../Employee/ViewEmployee/ViewEmployeeStyle";
const CellHeadStyles = {
  color: "#8F9BB3",
  fontFamily: "Inter",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "1.6rem",
};

const CellStyle = {
  color: "#222B45",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "1.5rem",
};
const CellStyle2 = {
  color: "#222B45",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "1.5rem",
};

const DocumentHistory = () => {
  let API_URL = process.env.REACT_APP_API_URL;

  const Navigate = useNavigate();
  const location = useLocation();
  const { documentid } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const [Id, setId] = useState("");
  const [update, setUpdate] = useState(false);

  const [result, setResult] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [userType, setUserType] = useState("");
  const HandleChangePage = (event, value) => {
    setPage(value);
  };
  const [searchValue, setSearchValue] = useState("");
  const [historyList, setHistoryList] = useState([]);
  const HandleSearchCahnge = (data) => {
    setSearchValue(data);
  };
  const GetDocumentsDetails = () => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);

      let url = API_URLS.getDocumentDetails.replace(":id", documentid);
      httpClient({
        method: "get",
        url,
      })
        .then(({ result, error }) => {
          if (result) {
            setResult(result);
            resolve(result);
          } else {
            //toast.warn("something went wrong ");
          }
        })
        .catch((error) => {
          //console.error("Error:", error);
          toast.error("Error creating department. Please try again.");
          setIsLoading(false);
          reject(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  };
  useEffect(() => {
    GetDocumentsDetails();
  }, []);
  const BackArrowButton = styled.div`
    display: none;

    @media only screen and (max-width: 600px) {
      padding: 5px 4px 5px 6px;
      border-radius: 88px;
      border: 1px solid #8f9bb3;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;
  return (
    <>
      <CommenDashHeader
        onSearch={HandleSearchCahnge}
        text={"Document History"}
      />
      <DisciplinaryDiv>
        <FlexContaier>
          {/* <BackArrowButton onClick={() => Navigate(-1)}>
            <IconsEmployee src="/images/icons/ArrowLeft.svg" />
          </BackArrowButton> */}
          <DisciplinaryHeading>Version History</DisciplinaryHeading>
        </FlexContaier>
      </DisciplinaryDiv>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "70vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RotatingLines
            strokeColor="#279AF1"
            strokeWidth="3"
            animationDuration="0.75"
            width="52"
            visible={true}
          />
        </div>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow
                  sx={{
                    background: "#FBFBFB",
                  }}
                >
                  <TableCell
                    sx={CellHeadStyles}
                    align="left"
                    style={{ width: "1rem" }}
                  >
                    Version
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "12rem" }}
                    align="left"
                  >
                    File Name
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "15rem" }}
                    align="left"
                  >
                    Modified By
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "12rem" }}
                    align="left"
                  >
                    Modified At
                  </TableCell>
                  <TableCell
                    sx={CellHeadStyles}
                    style={{ minWidth: "9rem" }}
                    align="left"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {!result?.document?.versions?.length && (
                  <TableRow sx={{ height: "20rem" }}>
                    <TableCell align="center" sx={CellStyle2} colSpan={5}>
                      No history found
                    </TableCell>
                  </TableRow>
                )}
                {result?.document?.versions?.map((data, index) => (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                      background: "#fff",
                    }}
                    key={data._id}
                  >
                    <TableCell sx={CellStyle2} align="left">
                      <MenuIconDiv>
                        {data.version !== undefined
                          ? Number.isInteger(data.version)
                            ? data.version.toFixed(1)
                            : data.version
                          : " - "}
                      </MenuIconDiv>
                    </TableCell>
                    <TableCell sx={CellStyle} align="left">
                      {data?.file?.originalName}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {[
                        data?.modifiedBy?.personalInfo?.firstName,
                        data?.modifiedBy?.personalInfo?.lastName,
                      ].join(" ") || " - "}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      {data?.updatedAt
                        ? moment
                            .utc(data?.updatedAt)
                            .format("D MMM, YYYY hh:mm A")
                        : " - "}
                    </TableCell>
                    <TableCell sx={CellStyle2} align="left">
                      <Link
                        to={API_URL + data?.file?.path}
                        target="_blank"
                        download
                        style={{ textDecoration: "none" }}
                      >
                        <ActionIcons
                          onClick={() => {}}
                          src="/images/icons/Download.svg"
                        />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {result?.totalPages > 1 && (
            <PaginationDiv>
              <Pagination
                count={result?.totalPages}
                variant="outlined"
                shape="rounded"
                page={page}
                onChange={HandleChangePage}
              />
            </PaginationDiv>
          )}
        </>
      )}
    </>
  );
};

export default DocumentHistory;
